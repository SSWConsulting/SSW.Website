"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./themeToggle";

export type HomeThemeMode = "light" | "dark";

type HomeThemeContextValue = {
  theme: HomeThemeMode;
  isDark: boolean;
  setTheme: (mode: HomeThemeMode) => void;
  toggleTheme: () => void;
};

const STORAGE_KEY = "ssw-home-theme";
// The homepage ships dark-first. Flip this to "light" (or add prefers-color-scheme
// detection) once every v3 block has been migrated to theme tokens.
const DEFAULT_THEME: HomeThemeMode = "dark";

const HomeThemeContext = React.createContext<HomeThemeContextValue | undefined>(
  undefined
);

export const useHomeTheme = (): HomeThemeContextValue => {
  const ctx = React.useContext(HomeThemeContext);
  if (!ctx) {
    throw new Error("useHomeTheme must be used within a HomeThemeProvider");
  }
  return ctx;
};

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

  // Restore the saved choice after mount so SSR and the first client render both
  // use DEFAULT_THEME (avoids a hydration mismatch).
  React.useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "light" || stored === "dark") {
        setThemeState(stored);
      }
    } catch {
      /* ignore */
    }
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
      <ThemeToggle />
    </div>
  );
};
