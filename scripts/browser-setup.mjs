#!/usr/bin/env node
/**
 * Browser setup for sandboxes/CI where Playwright's CDN is unreachable.
 *
 * Uses @sparticuz/chromium (an npm-hosted Chromium build, so `npm install`
 * alone provisions the browser) and extracts its bundled AL2023 shared
 * libraries (libnspr4/libnss3/… — absent on slim Debian images) so the
 * binary actually launches with LD_LIBRARY_PATH set.
 *
 * Exports (ESM): { executablePath, libPath, launchArgs }
 */
import { existsSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const mod = require("@sparticuz/chromium");
const chromium = mod.default;
const inflate = mod.inflate;

export const launchArgs = chromium.args;

/** Ensures the chromium binary + system libs are extracted; returns paths. */
export async function ensureBrowser() {
  const executablePath = await chromium.executablePath(); // → /tmp/chromium
  const libDir = "/tmp/al2023";
  if (!existsSync(`${libDir}/lib/libnss3.so`)) {
    // The package's own inflate handles its .br format and unrolls the tar.
    await inflate(new URL("../node_modules/@sparticuz/chromium/bin/al2023.tar.br", import.meta.url).pathname);
  }
  return { executablePath, libPath: `${libDir}/lib` };
}

if (process.argv[1] && process.argv[1].endsWith("browser-setup.mjs")) {
  const info = await ensureBrowser();
  console.log(`chromium: ${info.executablePath}\nlibs:     ${info.libPath}`);
}
