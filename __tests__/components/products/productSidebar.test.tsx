import { ProductSidebar } from "@/components/products/template/productSidebar";
import { render, screen } from "@testing-library/react";
// This repo leaves setupFilesAfterEnv commented out in jest.config.ts, so the
// jest-dom matchers are not registered globally. Import them here.
import "@testing-library/jest-dom";

const mockPathname = jest.fn();

jest.mock("next/navigation", () => ({
  usePathname: () => mockPathname(),
}));

// tinacms/dist/react is published as ESM and Jest does not transform
// node_modules, so importing it here fails to parse - mock it to keep the
// module graph resolvable.
jest.mock("tinacms/dist/react", () => ({
  tinaField: () => undefined,
}));

jest.mock("@/components/embeds/tweetEmbed", () => ({
  TweetEmbed: () => null,
}));

// An anchor, so a CTA that is rendered can be found by role the same way a
// nav entry is.
jest.mock("@/components/button/rippleButtonV2", () => ({
  __esModule: true,
  default: ({ href, children }) => <a href={href}>{children}</a>,
}));

// Nothing in the sidebar may point at the page it is rendered on. The primary
// CTA used to do exactly that on /products/sophiebot/try - a red button that
// reloaded the page you were already reading - and the Explore entry for the
// current page stayed an anchor to itself.

const data = {
  primaryCta: { label: "Try SophieBot", href: "/products/sophiebot/try" },
  subPages: [
    { label: "SophieBot docs", href: "/products/sophiebot/docs" },
    { label: "Adam's Blog Post", href: "https://adamcogan.com/post/" },
  ],
};

const renderAt = (pathname: string) => {
  mockPathname.mockReturnValue(pathname);
  return render(<ProductSidebar productName="SSW SophieBot" data={data} />);
};

describe("ProductSidebar self-links", () => {
  test("drops the primary CTA on the page it points at", () => {
    renderAt("/products/sophiebot/try");

    expect(
      screen.queryByRole("link", { name: "Try SophieBot" })
    ).not.toBeInTheDocument();
  });

  test("keeps the primary CTA everywhere else", () => {
    renderAt("/products/sophiebot");

    expect(screen.getByRole("link", { name: "Try SophieBot" })).toHaveAttribute(
      "href",
      "/products/sophiebot/try"
    );
  });

  test("ignores a trailing slash when deciding", () => {
    renderAt("/products/sophiebot/try/");

    expect(
      screen.queryByRole("link", { name: "Try SophieBot" })
    ).not.toBeInTheDocument();
  });

  test("marks the current Explore entry without linking to it", () => {
    renderAt("/products/sophiebot/docs");

    expect(
      screen.queryByRole("link", { name: /SophieBot docs/ })
    ).not.toBeInTheDocument();

    const current = screen.getByText("SophieBot docs");
    expect(current.tagName).toBe("SPAN");
    expect(current).toHaveAttribute("aria-current", "page");
  });

  test("leaves the other Explore entries as links", () => {
    renderAt("/products/sophiebot/docs");

    expect(
      screen.getByRole("link", { name: /Adam's Blog Post/ })
    ).toHaveAttribute("href", "https://adamcogan.com/post/");
  });

  test("links the docs entry when it is not the current page", () => {
    renderAt("/products/sophiebot");

    expect(
      screen.getByRole("link", { name: /SophieBot docs/ })
    ).toHaveAttribute("href", "/products/sophiebot/docs");
  });
});
