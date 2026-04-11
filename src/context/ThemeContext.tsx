import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

/**
 * Theme + contrast context for Bead-In.
 *
 * Two independent pieces of state:
 * - `theme`: `"light" | "dark"` — persisted under `bead-in-theme`.
 * - `contrast`: `"normal" | "high"` — persisted under `bead-in-contrast`.
 *
 * Initial state mirrors the pre-hydration script in `index.html`:
 *   localStorage → OS preference → default.
 *
 * When the user has NOT explicitly toggled (no stored value), the context
 * listens to `matchMedia` change events so live OS-preference updates take
 * effect immediately. Once the user toggles, their choice wins and OS
 * changes stop propagating.
 */

type Theme = "light" | "dark";
type Contrast = "normal" | "high";

interface ThemeContextValue {
  theme: Theme;
  contrast: Contrast;
  toggleTheme: () => void;
  toggleContrast: () => void;
}

const THEME_KEY = "bead-in-theme";
const CONTRAST_KEY = "bead-in-contrast";

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const readStoredTheme = (): Theme | null => {
  try {
    const stored = localStorage.getItem(THEME_KEY);
    return stored === "dark" || stored === "light" ? stored : null;
  } catch {
    return null;
  }
};

const readStoredContrast = (): Contrast | null => {
  try {
    const stored = localStorage.getItem(CONTRAST_KEY);
    return stored === "high" || stored === "normal" ? stored : null;
  } catch {
    return null;
  }
};

const readMediaTheme = (): Theme =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

const readMediaContrast = (): Contrast =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-contrast: more)").matches
    ? "high"
    : "normal";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(
    () => readStoredTheme() ?? readMediaTheme(),
  );
  const [contrast, setContrast] = useState<Contrast>(
    () => readStoredContrast() ?? readMediaContrast(),
  );

  // Sync attribute + localStorage whenever theme changes.
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      /* localStorage unavailable — silently skip persistence. */
    }
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute("data-contrast", contrast);
    try {
      localStorage.setItem(CONTRAST_KEY, contrast);
    } catch {
      /* localStorage unavailable — silently skip persistence. */
    }
  }, [contrast]);

  // Live OS-preference listeners. They only apply when the user has not
  // explicitly toggled (i.e. no stored value). Once toggled, the user's
  // choice wins and OS changes are ignored until localStorage is cleared.
  useEffect(() => {
    const mqTheme = window.matchMedia("(prefers-color-scheme: dark)");
    const mqContrast = window.matchMedia("(prefers-contrast: more)");

    const onThemeChange = (e: MediaQueryListEvent) => {
      if (readStoredTheme() === null) {
        setTheme(e.matches ? "dark" : "light");
      }
    };
    const onContrastChange = (e: MediaQueryListEvent) => {
      if (readStoredContrast() === null) {
        setContrast(e.matches ? "high" : "normal");
      }
    };

    mqTheme.addEventListener("change", onThemeChange);
    mqContrast.addEventListener("change", onContrastChange);

    return () => {
      mqTheme.removeEventListener("change", onThemeChange);
      mqContrast.removeEventListener("change", onContrastChange);
    };
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  const toggleContrast = useCallback(() => {
    setContrast((prev) => (prev === "high" ? "normal" : "high"));
  }, []);

  return (
    <ThemeContext.Provider
      value={{ theme, contrast, toggleTheme, toggleContrast }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
}
