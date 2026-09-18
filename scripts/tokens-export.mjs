#!/usr/bin/env node
/**
 * Unseen tokens export — derives a Figma/Tokens-Studio-ready token set from
 * the CSS source of truth (`src/index.css`). This is the first step of the
 * Figma pipeline (UNSEEN-V2-ROADMAP.md §6): one design language → tokens →
 * Figma Variables + React + Tailwind + docs.
 *
 * Layers extracted (mirroring the CSS structure):
 *   :root          → primitive + semantic (light) tokens, config (accent H/C,
 *                    radius scale, border width, header height), palette, syntax
 *   .dark          → semantic (dark), palette (dark), syntax (dark)
 *   @theme inline  → type scale, radius scale, shadows + elevation, motion
 *
 * Format: design-tokens 2.0 ($type/$value) — imports into Figma via the
 * Tokens Studio plugin; light/dark semantic pairs become Figma variable modes.
 * The output is DETERMINISTIC (no timestamps) so CI can diff it.
 *
 * Usage:
 *   node scripts/tokens-export.mjs              write tokens/tokens.json + CSV
 *   node scripts/tokens-export.mjs --json       print JSON to stdout
 *   node scripts/tokens-export.mjs --check      fail if committed file drifts
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { tmpdir } from "node:os";

const ROOT = new URL("..", import.meta.url).pathname;
const CSS = join(ROOT, "src", "index.css");
const OUT_JSON = join(ROOT, "tokens", "tokens.json");
const OUT_CSV = join(ROOT, "tokens", "figma-variables.csv");

const argv = process.argv.slice(2);
const PRINT = argv.includes("--json");
const CHECK = argv.includes("--check");

const css = readFileSync(CSS, "utf8");

/* ---- CSS parsing ------------------------------------------------------ */

/** Extract the declaration body of a block, brace-matched from `re`. */
function blockBody(src, re) {
  const m = re.exec(src);
  if (!m) throw new Error(`block not found: ${re}`);
  const open = m.index + m[0].length - 1;
  let depth = 0;
  for (let i = open; i < src.length; i++) {
    if (src[i] === "{") depth++;
    else if (src[i] === "}") {
      depth--;
      if (depth === 0) return src.slice(open + 1, i);
    }
  }
  throw new Error(`unbalanced block: ${re}`);
}

/** `--name: value;` pairs from a declaration body (comments stripped). */
function parseVars(body) {
  const map = {};
  const clean = body.replace(/\/\*[\s\S]*?\*\//g, "");
  for (const m of clean.matchAll(/--([a-z0-9-]+)\s*:\s*([^;]+);/gi)) {
    map[m[1]] = m[2].trim();
  }
  return map;
}

/* NOTE: the real `.dark {` block — `@custom-variant dark (&:where(.dark…))`
 * contains the substring ".dark" earlier in the file. */
const light = parseVars(blockBody(css, /:root\s*\{/));
const dark = parseVars(blockBody(css, /\.dark\s*\{/));
const theme = parseVars(blockBody(css, /@theme inline\s*\{/));

/* ---- value helpers ----------------------------------------------------- */

const isHex = (v) => /^#[0-9a-fA-F]{6}$/.test(v);
const isHex8 = (v) => /^#[0-9a-fA-F]{8}$/.test(v);

/** Resolve `var(--x)` chains (max depth 4). Dark values may reference
 * light-only definitions (the accent ramp), so dark resolves against a
 * merged map. `calc(a * b)` with plain numbers is flattened. */
const merged = { ...light, ...dark };
function resolve(value, layer, depth = 0) {
  if (!value?.includes("var(--")) return flattenCalc(value);
  if (depth > 4) return value;
  return resolve(value.replace(/var\(--([a-z0-9-]+)\)/gi, (_, n) => layer[n] ?? `var(--${n})`), layer, depth + 1);
}
function flattenCalc(s) {
  return s.replace(/calc\(([\d.]+)\s*\*\s*([\d.]+)\)/g, (_, a, b) => String(Math.round(Number(a) * Number(b) * 10000) / 10000));
}

/** `rgb(r g b / a)` → 8-digit hex. */
function rgbToHex(v) {
  const m = v.match(/^rgb\(\s*(\d+)\s+(\d+)\s+(\d+)\s*\/\s*([\d.]+)\s*\)$/);
  if (!m) return null;
  const [, r, g, b, a] = m;
  const h = (n) => Number(n).toString(16).padStart(2, "0");
  return `#${h(r)}${h(g)}${h(b)}${h(Math.round(Number(a) * 255))}`.toLowerCase();
}

const toPx = (v) => (/^(?:-?\d*\.?\d+)rem$/.test(v) ? `${Number(v) * 16}px` : v.endsWith("px") ? v : `${v}px`);

/** One box-shadow part → Figma shadow object (null if it can't be flattened). */
function shadowPart(part) {
  const p = part.trim();
  const tokens = p.split(/\s+/);
  /* locate the colour: rgb()/color-mix()/oklch() contain spaces, so the
   * colour starts at the first token matching a colour fn (or hex/var). */
  let ci = -1;
  for (let i = 2; i < tokens.length; i++) {
    if (/^(rgb\(|color-mix\(|oklch\()/i.test(tokens[i]) || isHex(tokens[i]) || isHex8(tokens[i]) || /^var\(/.test(tokens[i])) {
      ci = i;
      break;
    }
  }
  if (ci < 0) return null;
  const geom = tokens.slice(0, ci);
  const colorRaw = tokens.slice(ci).join(" ");
  if (geom.length < 2 || geom.length > 5) return null;
  if (geom[0] === "inset" && geom.length < 3) return null;
  const nums = geom.filter((t) => t !== "inset").map(toPx);
  let color = null;
  if (isHex(colorRaw) || isHex8(colorRaw)) color = colorRaw;
  else if ((color = rgbToHex(colorRaw))) color = color;
  else return null; /* var()/color-mix/oklch → kept raw by the caller */
  const inset = geom[0] === "inset" ? "inset " : "";
  return {
    color,
    offsetX: inset + nums[0],
    offsetY: nums[1],
    blur: nums[2] ?? "0px",
    spread: nums[3] ?? "0px",
  };
}

/** A full box-shadow value → Figma shadow array, or a raw string. */
function shadowValue(value, layer) {
  const flat = resolve(value, layer);
  const parts = flat.split(",").map(shadowPart);
  if (parts.some((x) => x === null)) return null;
  return parts;
}

/** `oklch(L [calc(var(--accent-c) * F) | var(--accent-c)] var(--accent-h))`
 * → concrete oklch at the default accent H/C. */
function evalAccent(value) {
  const m = value.match(/^oklch\(([\d.]+) (?:calc\(var\(--accent-c\) \* ([\d.]+)\)|var\(--accent-c\)) var\(--accent-h\)\)$/);
  if (!m) return null;
  const L = m[1];
  const F = m[2] === undefined ? 1 : Number(m[2]);
  const C = Math.round(F * light["accent-c"] * 10000) / 10000;
  return `oklch(${L} ${C} ${light["accent-h"]})`;
}

const tok = (v) => ({ $value: v });
const colorTok = (v) => ({ $type: "color", $value: v });
const dimTok = (v) => ({ $type: "dimension", $value: v });
const numTok = (v) => ({ $type: "number", $value: Number(v) });
const strTok = (v, d) => ({ $type: "string", $value: v, ...(d ? { $description: d } : {}) });
const shadowTok = (parts) => ({ $type: "shadow", $value: parts });

/* ---- build the token tree ---------------------------------------------- */

const tree = {
  $meta: {
    name: "Unseen Design System",
    source: "src/index.css",
    generator: "scripts/tokens-export.mjs",
    note: "Deterministic export — do not edit by hand. `npm run tokens:export`.",
  },
  config: {
    $description: "Brand inputs. The accent ramp re-derives from these (OKLCH); radius scale multiplies the radius tokens.",
    accentH: numTok(light["accent-h"]),
    accentC: numTok(light["accent-c"]),
    radiusScale: numTok(light["radius-scale"]),
  },
  color: {
    primitive: {},
    semantic: { light: {}, dark: {} },
    palette: {},
    syntax: { light: {}, dark: {} },
  },
  typography: {
    fontFamily: {
      sans: strTok(resolve(light["font-sans"], light)),
      mono: strTok(resolve(light["font-mono"], light)),
    },
    font: {},
  },
  spacing: {
    base: dimTok(light["spacing"]),
    $description: "Numeric scale = n × base (Tailwind spacing utility). 1 = 4px, 4 = 16px, 6 = 24px, 10 = 40px …",
  },
  radius: {},
  sizing: {
    borderWidth: dimTok(light["border-width"]),
    headerHeight: dimTok(light["header-height"]),
  },
  shadow: { light: {}, dark: {}, elevation: {} },
  opacity: {
    disabled: numTok(light["disabled-opacity"]),
  },
  motion: {
    easing: {
      outQuint: strTok(resolve(light["ease-out-quint"], light)),
      spring: strTok(resolve(light["ease-spring"], light)),
    },
    duration: {
      fast: dimTok(light["duration-fast"]),
      base: dimTok(light["duration-base"]),
      slow: dimTok(light["duration-slow"]),
    },
    animation: {},
  },
};

/* primitives: white/black, accent ramp (evaluated at default H/C), neutral */
tree.color.primitive.white = colorTok(light.white);
tree.color.primitive.black = colorTok(light.black);
tree.color.primitive.accent = {};
for (const i of [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]) {
  const v = evalAccent(light[`accent-${i}`]) ?? light[`accent-${i}`];
  tree.color.primitive.accent[String(i)] = colorTok(v);
}
tree.color.primitive.neutral = {};
for (const [k, v] of Object.entries(light)) {
  if (/^neutral-\d+$/.test(k)) tree.color.primitive.neutral[k.slice(8)] = colorTok(v);
}

/* semantic: light + dark (mode pair for Figma variables) */
const isSemantic = (n) =>
  /^(background|surface|foreground|muted|subtle|disabled|link|overlay|segment|backdrop|border|separator|field)(-[\w-]+)?$/.test(n) ||
  n === "accent" ||
  /^accent-(hover|foreground|soft)(-foreground)?$/.test(n);
for (const [k, v] of Object.entries(light)) if (isSemantic(k)) tree.color.semantic.light[k] = colorTok(resolve(v, light));
for (const [k, v] of Object.entries(dark)) if (isSemantic(k)) tree.color.semantic.dark[k] = colorTok(resolve(v, merged));

/* palette (badge/state colours) + syntax, light/dark */
for (const layerName of ["light", "dark"]) {
  const layer = layerName === "light" ? light : dark;
  for (const [k, v] of Object.entries(layer)) {
    const pm = k.match(/^(gray|blue|orange|red|green|yellow|purple|sky|pink|teal)-(dark|base|light|lighter)$/);
    if (pm) tree.color.palette[pm[1]] = tree.color.palette[pm[1]] ?? {};
    const sm = k.match(/^syn-(.+)$/);
    if (sm) tree.color.syntax[layerName][sm[1]] = colorTok(resolve(v, layer));
  }
}
for (const [k, v] of Object.entries(light)) {
  const pm = k.match(/^(gray|blue|orange|red|green|yellow|purple|sky|pink|teal)-(dark|base|light|lighter)$/);
  if (pm) tree.color.palette[pm[1]][pm[2]] = { light: colorTok(v), dark: colorTok(resolve(dark[k] ?? v, dark)) };
}

/* type scale: --text-<group>-<size>[-prop] */
for (const m of Object.entries(theme).sort()) {
  const tm = m[0].match(/^text-([a-z]+)-([a-z0-9]+?)(--(line-height|letter-spacing|font-weight))?$/);
  if (!tm) continue;
  const [ , group, size, , prop ] = tm;
  const key = `${group}.${size}`;
  const node = tree.typography.font[key] ?? (tree.typography.font[key] = {});
  if (!prop) node.fontSize = dimTok(m[1]);
  else if (prop === "line-height") node.lineHeight = dimTok(m[1]);
  else if (prop === "letter-spacing") node.letterSpacing = dimTok(m[1]);
  else if (prop === "font-weight") node.fontWeight = numTok(m[1]);
}

/* radius scale (base values; --radius-scale applied at runtime) */
tree.radius.$description = "Base radii in rem. Runtime value = base × --radius-scale (presets 0 / 0.5 / 1 / 1.5 / 2.25).";
for (const [k, v] of Object.entries(theme)) {
  const rm = k.match(/^radius-(.+)$/);
  const vm = v.match(/^calc\(([\d.]+)rem \* var\(--radius-scale\)\)$/);
  if (rm && vm) tree.radius[rm[1]] = dimTok(vm[1] + "rem");
}

/* shadows + focus rings: light + dark (rings are --ring-*, bridged to
 * --shadow-ring-* in @theme; elevation aliases and raw strings below) */
for (const layerName of ["light", "dark"]) {
  const layer = layerName === "light" ? light : merged;
  for (const [k, v] of Object.entries(layerName === "light" ? light : dark)) {
    if (!/^(shadow|ring)-/.test(k)) continue;
    const name = k.startsWith("shadow-") ? k.slice(7) : k; /* keep ring-* names */
    const parts = shadowValue(v, layer);
    tree.shadow[layerName][name] = parts ? shadowTok(parts) : strTok(resolve(v, layer), "Contains var()/color-mix — kept as raw CSS.");
  }
}
for (const [k, v] of Object.entries(theme)) {
  const em = k.match(/^shadow-e(\d)$/);
  if (em) tree.shadow.elevation[`e${em[1]}`] = strTok(`alias → ${v.replace(/var\(--shadow-|\)/g, "")}`);
}
for (const [k, v] of Object.entries(theme)) {
  const am = k.match(/^animate-(.+)$/);
  if (am) tree.motion.animation[am[1]] = strTok(resolve(v, light));
}

/* ---- write / check ------------------------------------------------------ */

const json = JSON.stringify(tree, null, 2) + "\n";

if (PRINT) {
  console.log(json);
  process.exit(0);
}

/* Figma Variables CSV: the curated variable set (semantic + palette + scale) */
const csvRows = [["name", "type", "light", "dark"]];
const push = (name, type, l, d) => csvRows.push([name, type, l ?? d ?? "", d ?? l ?? ""]);
for (const [fam, steps] of Object.entries(tree.color.palette)) {
  for (const [step, v] of Object.entries(steps)) push(`color.palette.${fam}.${step}`, "color", v.light?.$value, v.dark?.$value);
}
for (const [name, v] of Object.entries(tree.color.semantic.light)) {
  push(`color.semantic.${name}`, "color", v.$value, tree.color.semantic.dark[name]?.$value ?? v.$value);
}
for (const [name, v] of Object.entries(tree.color.primitive.accent)) push(`color.primitive.accent.${name}`, "color", v.$value, v.$value);
for (const [name, v] of Object.entries(tree.radius)) if (name !== "$description") push(`radius.${name}`, "dimension", v.$value, v.$value);
push("spacing.base", "dimension", tree.spacing.base.$value, tree.spacing.base.$value);
push("sizing.borderWidth", "dimension", tree.sizing.borderWidth.$value, tree.sizing.borderWidth.$value);
push("opacity.disabled", "number", tree.opacity.disabled.$value, tree.opacity.disabled.$value);
const csv = csvRows.map((r) => r.join(",")).join("\n") + "\n";

if (CHECK) {
  const tmp = join(tmpdir(), `unseen-tokens-${process.pid}`, "tokens.json");
  mkdirSync(dirname(tmp), { recursive: true });
  writeFileSync(tmp, json);
  if (!existsSync(OUT_JSON)) {
    console.error("tokens:check — committed file missing; run `npm run tokens:export`.");
    process.exit(1);
  }
  const committed = readFileSync(OUT_JSON, "utf8");
  if (committed !== json) {
    console.error("tokens:check — drift detected. Run `npm run tokens:export` and commit the diff.");
    process.exit(1);
  }
  console.log("tokens:check — in sync with src/index.css.");
  process.exit(0);
}

mkdirSync(join(ROOT, "tokens"), { recursive: true });
writeFileSync(OUT_JSON, json);
writeFileSync(OUT_CSV, csv);

console.log(`tokens:export — wrote tokens/tokens.json (${(json.length / 1024).toFixed(1)} kB) + tokens/figma-variables.csv (${csvRows.length - 1} variables).`);
console.log(`  layers: ${Object.keys(tree).length} · semantic light ${Object.keys(tree.color.semantic.light).length} / dark ${Object.keys(tree.color.semantic.dark).length} · palette ${Object.keys(tree.color.palette).length} · type ${Object.keys(tree.typography.font).length} · radius ${Object.keys(tree.radius).filter((k) => k !== "$description").length} · shadow ${Object.keys(tree.shadow.light).length}L/${Object.keys(tree.shadow.dark).length}D`);
