"use client";

import { usePathname } from "next/navigation";
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

// Single source of truth for which routes opt into home theming — read by
// isThemedRoute below, baked into PRE_PAINT_SCRIPT, and re-exported for
// MegaMenuWrapper, so the list only needs updating in one place.
export const THEMED_ROUTES = [
  "/",
  "/consulting",
  "/products",
  "/events",
  "/company/clients",
];

// Routes whose descendants are themed too. Every /products/<slug> page and its
// sub-pages use the product template, and every /company/clients/<slug> page
// uses the client story template; both are built for both themes, so those
// sections opt in wholesale. The other entries stay exact matches, leaving
// /consulting/<page> and /events/<page> untouched.
export const THEMED_ROUTE_PREFIXES = ["/products", "/company/clients"];

export const isThemedRoute = (pathname: string) =>
  THEMED_ROUTES.includes(pathname) ||
  THEMED_ROUTE_PREFIXES.some((prefix) => pathname.startsWith(`${prefix}/`));

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
// That makes a themed route's first paint already match the resolved theme, so
// there's no dark→light flash. Rendered inside each themed wrapper; the logic is
// kept in lockstep with resolveTheme() above, and its route test mirrors
// isThemedRoute (exact THEMED_ROUTES, or under a THEMED_ROUTE_PREFIXES entry) —
// if the two disagree a themed page flashes the wrong theme before hydration.
//
// The script is a static literal and reads its route lists off its own
// `data-` attributes, rather than having them interpolated into the source.
// JSON.stringify escapes for JSON, not for HTML: it leaves `<`, `>` and the
// U+2028/U+2029 line separators alone, so a route containing `</script>` would
// close the tag early and the rest would parse as markup (CodeQL
// js/bad-code-sanitization). React escapes attribute values, so the same data
// travels safely and the lists still come from the constants above.
const PRE_PAINT_SCRIPT =
  "(function(){try{var s=document.currentScript;if(!s)return;var p=location.pathname;var E=JSON.parse(s.getAttribute('data-exact')||'[]'),P=JSON.parse(s.getAttribute('data-prefixes')||'[]');var m=E.indexOf(p)!==-1;for(var i=0;!m&&i<P.length;i++){m=p.indexOf(P[i]+'/')===0}if(!m)return;var t;try{t=localStorage.getItem(s.getAttribute('data-key'))}catch(e){}if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}var el=s.parentElement;if(el){el.classList.toggle('dark',t==='dark')}}catch(e){}})()";

export const HomeThemePrePaint = () => (
  // suppressHydrationWarning: the script has already run (and mutated the DOM)
  // by the time React hydrates, so React must not re-validate its contents —
  // otherwise it flags a mismatch (#418) and regenerates the subtree.
  <script
    suppressHydrationWarning
    data-exact={JSON.stringify(THEMED_ROUTES)}
    data-prefixes={JSON.stringify(THEMED_ROUTE_PREFIXES)}
    data-key={STORAGE_KEY}
    dangerouslySetInnerHTML={{ __html: PRE_PAINT_SCRIPT }}
  />
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

export const HomeThemeBoundary = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  if (isThemedRoute(pathname)) {
    return <HomeThemeProvider>{children}</HomeThemeProvider>;
  }
  return <>{children}</>;
};

// Applies the theme class to a route-scoped wrapper (NOT <html>) so theming
// stays contained to the themed routes and cannot affect others. Tailwind's
// `dark:` variants and the design-token CSS variables both resolve from this
// ancestor, so descendant blocks pick up the active theme automatically.
export const HomeThemeShell = ({
  children,
  className,
}: {
  children: React.ReactNode;
  // Merged after the defaults via cn(), so e.g. a page-specific `bg-*` wins
  // over `bg-background` (tailwind-merge keeps the later class in a conflict).
  className?: string;
}) => {
  const { isDark } = useHomeTheme();
  return (
    <div
      suppressHydrationWarning
      className={cn(
        "relative isolate bg-background text-foreground",
        isDark && "dark",
        className
      )}
    >
      <HomeThemePrePaint />
      {children}
    </div>
  );
};
