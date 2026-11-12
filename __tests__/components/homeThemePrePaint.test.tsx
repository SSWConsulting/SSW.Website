import { describe, expect, it } from "@jest/globals";
import { render } from "@testing-library/react";
import {
  HomeThemePrePaint,
  THEMED_ROUTES,
  THEMED_ROUTE_PREFIXES,
} from "@/components/layout/homeTheme";

const renderScript = () => {
  const { container } = render(<HomeThemePrePaint />);
  const script = container.querySelector("script");
  if (!script) throw new Error("pre-paint script did not render");
  return script;
};

describe("HomeThemePrePaint", () => {
  it("hands the route lists over as attributes, not as script source", () => {
    const script = renderScript();

    expect(JSON.parse(script.getAttribute("data-exact") ?? "null")).toEqual(
      THEMED_ROUTES
    );
    expect(JSON.parse(script.getAttribute("data-prefixes") ?? "null")).toEqual(
      THEMED_ROUTE_PREFIXES
    );
  });

  it("keeps the script a static literal with no route data baked in", () => {
    // JSON.stringify escapes for JSON, not for HTML, so a route interpolated
    // into the source could close the <script> tag early. The routes belong on
    // escaped attributes; the source must stay free of them.
    const source = renderScript().innerHTML;

    for (const route of [...THEMED_ROUTES, ...THEMED_ROUTE_PREFIXES]) {
      if (route === "/") continue; // too short to be a meaningful needle
      expect(source).not.toContain(route);
    }
  });
});
