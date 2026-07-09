import { useEffect, useState } from "react";

/**
 * Tracks whether a CSS media query currently matches. Starts as `false` on the
 * server / first client render and resolves after mount, so callers can gate
 * expensive client-only work (e.g. WebGL) to the viewports that actually show
 * it instead of relying on `hidden`/`lg:block`, which only toggle CSS.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handleChange = (event: MediaQueryListEvent) =>
      setMatches(event.matches);

    setMatches(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
}
