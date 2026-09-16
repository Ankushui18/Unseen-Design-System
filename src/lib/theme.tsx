import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Mode = "light" | "dark";

export type ThemeState = {
  mode: Mode;
  accentH: number;
  accentC: number;
  radiusScale: number;
  disabledOpacity: number;
};

export const ACCENT_PRESETS = [
  { name: "Blue", h: 265, c: 0.225 },
  { name: "Iris", h: 285, c: 0.2 },
  { name: "Azure", h: 240, c: 0.17 },
  { name: "Cyan", h: 205, c: 0.13 },
  { name: "Teal", h: 178, c: 0.12 },
  { name: "Emerald", h: 152, c: 0.15 },
  { name: "Lime", h: 128, c: 0.16 },
  { name: "Amber", h: 72, c: 0.16 },
  { name: "Orange", h: 48, c: 0.18 },
  { name: "Rose", h: 15, c: 0.2 },
  { name: "Magenta", h: 345, c: 0.19 },
  { name: "Grape", h: 305, c: 0.18 },
] as const;

export const RADIUS_PRESETS = [
  { name: "Sharp", value: 0 },
  { name: "Tight", value: 0.5 },
  { name: "Base", value: 1 },
  { name: "Soft", value: 1.5 },
  { name: "Round", value: 2.25 },
] as const;

const DEFAULTS: ThemeState = {
  mode: "light",
  accentH: 265,
  accentC: 0.225,
  radiusScale: 1,
  disabledOpacity: 0.5,
};

const KEY = "aperture-theme-v2";

type Ctx = ThemeState & {
  set: (patch: Partial<ThemeState>) => void;
  toggleMode: () => void;
  reset: () => void;
  cssExport: string;
};

const ThemeCtx = createContext<Ctx | null>(null);

function normalize(state: Partial<ThemeState>): ThemeState {
  const clamp = (value: unknown, fallback: number, min: number, max: number) => typeof value === "number" && Number.isFinite(value) ? Math.min(max, Math.max(min, value)) : fallback;
  return {
    mode: state.mode === "dark" ? "dark" : "light",
    accentH: clamp(state.accentH, DEFAULTS.accentH, 0, 360),
    accentC: clamp(state.accentC, DEFAULTS.accentC, 0.02, 0.3),
    radiusScale: clamp(state.radiusScale, DEFAULTS.radiusScale, 0, 2.5),
    disabledOpacity: clamp(state.disabledOpacity, DEFAULTS.disabledOpacity, 0.2, 0.9),
  };
}

function read(): ThemeState {
  if (typeof window === "undefined") return DEFAULTS;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return DEFAULTS;
    return normalize({ ...DEFAULTS, ...(JSON.parse(raw) as Partial<ThemeState>) });
  } catch {
    return DEFAULTS;
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ThemeState>(read);

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", state.mode === "dark");
    root.style.setProperty("--accent-h", String(state.accentH));
    root.style.setProperty("--accent-c", String(state.accentC));
    root.style.setProperty("--radius-scale", String(state.radiusScale));
    root.style.setProperty("--disabled-opacity", String(state.disabledOpacity));
    try {
      window.localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* noop */
    }
  }, [state]);

  const set = useCallback((patch: Partial<ThemeState>) => {
    setState((s) => normalize({ ...s, ...patch }));
  }, []);

  const toggleMode = useCallback(() => {
    setState((s) => ({ ...s, mode: s.mode === "dark" ? "light" : "dark" }));
  }, []);

  const reset = useCallback(() => setState(DEFAULTS), []);

  const cssExport = useMemo(
    () =>
      `/* Add after Aperture's token stylesheet. */
:root {
  --accent-h: ${state.accentH};
  --accent-c: ${state.accentC};
  --radius-scale: ${state.radiusScale};
  --disabled-opacity: ${state.disabledOpacity};

  /* Semantic colors derive from these values in both modes. */
}`,
    [state],
  );

  const value = useMemo<Ctx>(
    () => ({ ...state, set, toggleMode, reset, cssExport }),
    [state, set, toggleMode, reset, cssExport],
  );

  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
