import { ProductCard } from "@/components/products/productCard";
import { render, screen } from "@testing-library/react";
// This repo leaves setupFilesAfterEnv commented out in jest.config.ts, so the
// jest-dom matchers are not registered globally. Import them here.
import "@testing-library/jest-dom";

// tinacms/dist/react is published as ESM and Jest does not transform
// node_modules, so importing it here fails to parse. These tests pass no
// tinaNode, which means tinaField is never actually called - the mock exists
// only to keep the module graph resolvable.
jest.mock("tinacms/dist/react", () => ({
  tinaField: () => undefined,
}));

// Regression guard for the card shell.
//
// CustomLink returns a bare fragment when href is falsy, which drops the element
// carrying the card's chrome classes. Because `url` is optional on productsList
// in tina/collections/products.tsx, an editor can save a product without one,
// and the card's children would then be emitted as siblings - becoming loose
// grid items in the products grid instead of one card. ProductCardShell renders
// a plain div in that case; these tests pin both halves of that behaviour.

const withUrl = {
  name: "SugarLearning",
  url: "https://sugarlearning.com/",
  description: "Induction and onboarding.",
};

const withoutUrl = {
  name: "SugarLearning",
  description: "Induction and onboarding.",
};

// The chrome that must land on the card's single root element either way.
const SHELL_CLASSES = ["flex", "h-full", "flex-col", "rounded-card"];

describe("ProductCard shell", () => {
  test("renders an anchor carrying the card chrome when the product has a url", () => {
    const { container } = render(<ProductCard product={withUrl} />);

    const root = container.firstElementChild as HTMLElement;
    expect(root.tagName).toBe("A");
    expect(root).toHaveAttribute("href", withUrl.url);
    SHELL_CLASSES.forEach((c) => expect(root).toHaveClass(c));
  });

  test("still renders ONE root element carrying the card chrome when url is missing", () => {
    const { container } = render(<ProductCard product={withoutUrl} />);

    // The regression this guards against was the children being emitted as
    // siblings, so assert on the child count before anything else.
    expect(container.children).toHaveLength(1);

    const root = container.firstElementChild as HTMLElement;
    expect(root.tagName).toBe("DIV");
    expect(root).not.toHaveAttribute("href");
    SHELL_CLASSES.forEach((c) => expect(root).toHaveClass(c));
  });

  test("keeps the name and description inside that root element", () => {
    const { container } = render(<ProductCard product={withoutUrl} />);
    const root = container.firstElementChild as HTMLElement;

    expect(root).toContainElement(
      screen.getByRole("heading", { name: withoutUrl.name })
    );
    expect(root).toContainElement(screen.getByText(withoutUrl.description));
  });

  test("shows the destination hostname only when there is a url", () => {
    const { unmount } = render(<ProductCard product={withUrl} />);
    expect(screen.getByText("sugarlearning.com")).toBeInTheDocument();
    unmount();

    // destinationLabel returns "" for a missing url and the footer only renders
    // the label when truthy, so no hostname should appear.
    render(<ProductCard product={withoutUrl} />);
    expect(screen.queryByText("sugarlearning.com")).toBeNull();
  });
});
