import { ProductSections } from "@/components/products/template/productSections";
import { render, screen } from "@testing-library/react";
// This repo leaves setupFilesAfterEnv commented out in jest.config.ts, so the
// jest-dom matchers are not registered globally. Import them here.
import "@testing-library/jest-dom";

// tinacms/dist/react is published as ESM and Jest does not transform
// node_modules, so importing it here fails to parse - mock it to keep the
// module graph resolvable.
jest.mock("tinacms/dist/react", () => ({
  tinaField: () => undefined,
}));

jest.mock("tinacms/dist/rich-text", () => ({
  TinaMarkdown: () => null,
}));

// Neither is under test here, and both drag in the video modal and the ripple
// button's client-side machinery.
jest.mock("@/components/products/template/productVideo", () => ({
  ProductVideo: () => null,
}));

// Mirrors the real button: an anchor when it has an href, a button otherwise,
// forwarding the target and rel these tests assert on.
jest.mock("@/components/button/rippleButtonV2", () => ({
  __esModule: true,
  default: ({ href, children, target, rel }) =>
    href ? (
      <a href={href} target={target} rel={rel}>
        {children}
      </a>
    ) : (
      <button>{children}</button>
    ),
}));

// The migration to this template dropped the "Figure:" captions and the alt
// text that every image on the old pages carried through CustomImage, where
// altText is a required field. These pin both back on, along with the
// full-width layout the restored landscape photos need - `imagePosition` had
// only none/left/right, and a 1903x861 photo is unreadable in the 5/12 column
// the split layout gives it.

const image = "/images/products/sophiehub/hero.jpg";

describe("ProductSections image", () => {
  test("describes the picture with imageAlt rather than the heading", () => {
    render(
      <ProductSections
        sections={[
          {
            heading: "See Sophie in the office",
            image,
            imagePosition: "full",
            imageAlt: "The SophieHub display greeting a staff member by name",
          },
        ]}
      />
    );

    expect(
      screen.getByAltText(
        "The SophieHub display greeting a staff member by name"
      )
    ).toBeInTheDocument();
  });

  test("falls back to the heading when there is no imageAlt", () => {
    render(
      <ProductSections
        sections={[
          { heading: "Microsoft Azure", image, imagePosition: "right" },
        ]}
      />
    );

    expect(screen.getByAltText("Microsoft Azure")).toBeInTheDocument();
  });

  test("renders imageCaption as the figure's caption", () => {
    const { container } = render(
      <ProductSections
        sections={[
          {
            heading: "Make sure the private address is disabled",
            image,
            imagePosition: "right",
            imageCaption: "Figure: Disable Private Address",
          },
        ]}
      />
    );

    const caption = container.querySelector("figcaption");
    expect(caption).toHaveTextContent("Figure: Disable Private Address");
  });

  test("shows the image for the full position and hides it for none", () => {
    const { container: full } = render(
      <ProductSections
        sections={[{ heading: "Full", image, imagePosition: "full" }]}
      />
    );
    expect(full.querySelector("img")).toBeInTheDocument();

    const { container: none } = render(
      <ProductSections
        sections={[{ heading: "None", image, imagePosition: "none" }]}
      />
    );
    expect(none.querySelector("img")).not.toBeInTheDocument();
  });

  test("keeps a section that carries nothing but a captioned image", () => {
    const { container } = render(
      <ProductSections
        sections={[
          {
            image,
            imagePosition: "full",
            imageAlt: "A visitor looking at the SophieHub display",
            imageCaption: "Figure: Sophie greets visitors by name",
          },
        ]}
      />
    );

    expect(container.querySelector("img")).toBeInTheDocument();
    expect(container.querySelector("figcaption")).toHaveTextContent(
      "Figure: Sophie greets visitors by name"
    );
  });
});

// `/products/sophiebot/try` launches a Teams deep link, which opened in a new
// tab before the migration.

describe("ProductSections button", () => {
  test("opens an off-site button in a new tab, with rel set", () => {
    render(
      <ProductSections
        sections={[
          {
            heading: "Launch SophieBot on Microsoft Teams",
            button: {
              label: "Launch SophieBot on Teams",
              href: "https://teams.microsoft.com/dl/launcher/launcher.html",
            },
          },
        ]}
      />
    );

    const launch = screen.getByRole("link", {
      name: "Launch SophieBot on Teams",
    });
    expect(launch).toHaveAttribute("target", "_blank");
    expect(launch).toHaveAttribute("rel", "noopener noreferrer");
  });

  test("leaves an in-site button in the same tab", () => {
    render(
      <ProductSections
        sections={[
          {
            heading: "Read the docs",
            button: {
              label: "SophieBot docs",
              href: "/products/sophiebot/docs",
            },
          },
        ]}
      />
    );

    expect(
      screen.getByRole("link", { name: "SophieBot docs" })
    ).not.toHaveAttribute("target");
  });
});
