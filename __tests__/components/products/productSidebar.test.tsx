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
// nav entry is. target and rel are forwarded because the real button passes
// them through to the element it renders, and that is what these tests check.
jest.mock("@/components/button/rippleButtonV2", () => ({
  __esModule: true,
  default: ({ href, children, target, rel }) => (
    <a href={href} target={target} rel={rel}>
      {children}
    </a>
  ),
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

// The blocks this template replaced opened the YouTube and Teams links in a
// new tab (`openInNewTab={true}` on UtilityButton) and the in-site ones in the
// same tab. Keying off the href restores that, and the sidebar's outbound nav
// entries - Adam's blog post on Rewards - get the same treatment.

describe("ProductSidebar external links", () => {
  test("opens an off-site CTA in a new tab, with rel set", () => {
    mockPathname.mockReturnValue("/products/rewards");
    render(
      <ProductSidebar
        productName="SSW Rewards"
        data={{
          secondaryCta: {
            label: "Videos",
            href: "https://www.youtube.com/@sswrewards/videos",
          },
        }}
      />
    );

    const videos = screen.getByRole("link", { name: "Videos" });
    expect(videos).toHaveAttribute("target", "_blank");
    expect(videos).toHaveAttribute("rel", "noopener noreferrer");
  });

  test("leaves an in-site CTA in the same tab", () => {
    renderAt("/products/sophiebot");

    const tryIt = screen.getByRole("link", { name: "Try SophieBot" });
    expect(tryIt).not.toHaveAttribute("target");
  });

  test("opens an outbound Explore entry in a new tab", () => {
    renderAt("/products/sophiebot");

    expect(
      screen.getByRole("link", { name: /Adam's Blog Post/ })
    ).toHaveAttribute("target", "_blank");
    expect(
      screen.getByRole("link", { name: /SophieBot docs/ })
    ).not.toHaveAttribute("target");
  });
});
