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

// Resolve the theme from a saved choice, else the OS preference. On the server
// there's no way to know either, so it falls back to the SSR default; the
// pre-paint script + client seed below correct it before first paint.
const resolveTheme = (): HomeThemeMode => {
  if (typeof window === "undefined") return DEFAULT_THEME;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    /* ignore */
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

// Inline script that runs synchronously while the HTML is still parsing — before
// the browser paints the nav/hero — and sets `.dark` on its own parent wrapper.
// That makes the homepage's first paint already match the resolved theme, so
// there's no dark→light flash. Rendered inside each themed wrapper; the logic is
// kept in lockstep with resolveTheme() above. Gated to the homepage.
const PRE_PAINT_SCRIPT = `(function(){try{if(location.pathname!=='/')return;var t;try{t=localStorage.getItem('${STORAGE_KEY}')}catch(e){}if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}var el=document.currentScript&&document.currentScript.parentElement;if(el){el.classList.toggle('dark',t==='dark')}}catch(e){}})()`;

export const HomeThemePrePaint = () => (
  <script dangerouslySetInnerHTML={{ __html: PRE_PAINT_SCRIPT }} />
);

export const HomeThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Seed from the resolver so the first CLIENT render already matches the theme
  // the pre-paint script applied to the DOM (server seeds the SSR default). The
  // themed wrappers carry `suppressHydrationWarning` to allow that difference.
  const [theme, setThemeState] = React.useState<HomeThemeMode>(resolveTheme);

  // Keep following the OS preference live, but only until the user makes an
  // explicit choice (a saved choice always wins).
  React.useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      let stored: string | null = null;
      try {
        stored = window.localStorage.getItem(STORAGE_KEY);
      } catch {
        /* ignore */
      }
      if (stored !== "light" && stored !== "dark") {
        setThemeState(media.matches ? "dark" : "light");
      }
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
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
      suppressHydrationWarning
      className={cn(
        "relative isolate bg-background text-foreground",
        isDark && "dark"
      )}
    >
      <HomeThemePrePaint />
      {children}
    </div>
  );
};
