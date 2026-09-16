import {
  createContext,
  useCallback,
  useContext,
  useEffect,
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

function read(): ThemeState {
  if (typeof window === "undefined") return DEFAULTS;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return DEFAULTS;
    return { ...DEFAULTS, ...(JSON.parse(raw) as Partial<ThemeState>) };
  } catch {
    return DEFAULTS;
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ThemeState>(read);

  useEffect(() => {
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
    setState((s) => ({ ...s, ...patch }));
  }, []);

  const toggleMode = useCallback(() => {
    setState((s) => ({ ...s, mode: s.mode === "dark" ? "light" : "dark" }));
  }, []);

  const reset = useCallback(() => setState(DEFAULTS), []);

  const cssExport = useMemo(
    () =>
      `:root {
  --accent-h: ${state.accentH};
  --accent-c: ${state.accentC};
  --radius-scale: ${state.radiusScale};
  --disabled-opacity: ${state.disabledOpacity};

  --accent: oklch(0.567 calc(var(--accent-c) * 1.02) var(--accent-h));
  --accent-hover: oklch(0.49 calc(var(--accent-c) * 0.92) var(--accent-h));
  --accent-foreground: oklch(0.99 0 0);
  --accent-soft: oklch(0.955 calc(var(--accent-c) * 0.26) var(--accent-h));
}

.dark {
  --accent: oklch(0.646 var(--accent-c) var(--accent-h));
  --accent-hover: oklch(0.73 calc(var(--accent-c) * 0.9) var(--accent-h));
  --accent-foreground: oklch(0.145 0.01 265);
  --accent-soft: oklch(0.29 calc(var(--accent-c) * 0.44) var(--accent-h));
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
