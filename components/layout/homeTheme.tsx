"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type HomeThemeMode = "light" | "dark";

type HomeThemeContextValue = {
  theme: HomeThemeMode;
  isDark: boolean;
  setTheme: (mode: HomeThemeMode) => void;
  toggleTheme: () => void;
};

const STORAGE_KEY = "ssw-home-theme";
// Seed for SSR + the first client render only (the server can't read the OS
// preference). After mount the provider resolves the real theme from a saved
// choice or `prefers-color-scheme`.
const DEFAULT_THEME: HomeThemeMode = "dark";

// The global mega menu reads the theme on every route, including ones with no
// HomeThemeProvider ancestor (error pages, etc.), so fall back to defaults there
// instead of throwing.
const FALLBACK: HomeThemeContextValue = {
  theme: DEFAULT_THEME,
  isDark: DEFAULT_THEME === "dark",
  setTheme: () => {},
  toggleTheme: () => {},
};

const HomeThemeContext = React.createContext<HomeThemeContextValue | undefined>(
  undefined
);

export const useHomeTheme = (): HomeThemeContextValue =>
  React.useContext(HomeThemeContext) ?? FALLBACK;

const persist = (mode: HomeThemeMode) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, mode);
  } catch {
    /* localStorage unavailable — ignore */
  }
};

export const HomeThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [theme, setThemeState] = React.useState<HomeThemeMode>(DEFAULT_THEME);

  // After mount, resolve the real theme: a saved choice always wins, otherwise
  // follow the OS `prefers-color-scheme` and keep following it live until the
  // user explicitly toggles.
  React.useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const resolve = () => {
      let stored: string | null = null;
      try {
        stored = window.localStorage.getItem(STORAGE_KEY);
      } catch {
        /* ignore */
      }
      if (stored === "light" || stored === "dark") {
        setThemeState(stored);
      } else {
        setThemeState(media.matches ? "dark" : "light");
      }
    };

    resolve();
    media.addEventListener("change", resolve);
    return () => media.removeEventListener("change", resolve);
  }, []);

  const setTheme = React.useCallback((mode: HomeThemeMode) => {
    setThemeState(mode);
    persist(mode);
  }, []);

  const toggleTheme = React.useCallback(() => {
    setThemeState((prev) => {
      const next: HomeThemeMode = prev === "dark" ? "light" : "dark";
      persist(next);
      return next;
    });
  }, []);

  const value = React.useMemo<HomeThemeContextValue>(
    () => ({ theme, isDark: theme === "dark", setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme]
  );

  return (
    <HomeThemeContext.Provider value={value}>
      {children}
    </HomeThemeContext.Provider>
  );
};

// Applies the theme class to a homepage-scoped wrapper (NOT <html>) so theming
// stays contained to the v3 homepage and cannot affect other routes. Tailwind's
// `dark:` variants and the design-token CSS variables both resolve from this
// ancestor, so descendant blocks pick up the active theme automatically.
export const HomeThemeShell = ({ children }: { children: React.ReactNode }) => {
  const { isDark } = useHomeTheme();
  return (
    <div
      className={cn(
        "relative isolate bg-background text-foreground",
        isDark && "dark"
      )}
    >
      {children}
    </div>
  );
};
