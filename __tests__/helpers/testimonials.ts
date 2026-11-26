import { describe, expect, it } from "@jest/globals";
import type { TestimonialType } from "@/helpers/getTestimonials";
import {
  featuredTestimonial,
  initials,
  splitTestimonialsPage,
} from "@/helpers/testimonials";
import type { TinaMarkdownContent } from "tinacms/dist/rich-text";

const text = (t: string) => ({ type: "text", text: t });
const node = (type: string, t: string) => ({ type, children: [text(t)] });
const list = {
  type: "mdxJsxFlowElement",
  name: "TestimonialsList",
  props: {
    excludedCategories: [
      { categoryName: "content/testimonialCategories/Internship.mdx" },
    ],
  },
  children: [text("")],
};
const page = (...children: unknown[]) =>
  ({ type: "root", children }) as unknown as TinaMarkdownContent;
const kids = (content: TinaMarkdownContent) =>
  (content as unknown as { children: { type: string }[] }).children;

describe("splitTestimonialsPage", () => {
  it("splits the tagline, intro, about section and list", () => {
    const result = splitTestimonialsPage(
      page(
        node("h4", "We go the extra mile"),
        node("p", "Intro"),
        node("h2", "About us"),
        node("p", "About"),
        list
      )
    );
    expect(result.tagline).toBe("We go the extra mile");
    expect(kids(result.intro).map((n) => n.type)).toEqual(["p"]);
    expect(kids(result.about).map((n) => n.type)).toEqual(["h2", "p"]);
    expect(result.excludedCategories).toEqual(list.props.excludedCategories);
    expect(result.hasList).toBe(true);
  });

  it("keeps content that follows the list with the about section", () => {
    const result = splitTestimonialsPage(
      page(node("p", "Intro"), node("h2", "About"), list, node("p", "After"))
    );
    expect(kids(result.about).map((n) => n.type)).toEqual(["h2", "p"]);
    expect(result.tagline).toBeNull();
  });

  it("copes with an empty field", () => {
    const result = splitTestimonialsPage(null);
    expect(result.tagline).toBeNull();
    expect(kids(result.intro)).toEqual([]);
    expect(result.excludedCategories).toEqual([]);
    expect(result.hasList).toBe(false);
  });
});

describe("featuredTestimonial", () => {
  const t = (name: string, body: string, avatar?: string): TestimonialType => ({
    name,
    body,
    avatar,
  });

  it("picks the first with a photo and a quote of readable length", () => {
    const featured = featuredTestimonial([
      t("No photo", "x".repeat(200)),
      t("Too short", "Great!", "/a.jpg"),
      t("Too long", "x".repeat(500), "/b.jpg"),
      t("Just right", "x".repeat(200), "/c.jpg"),
    ]);
    expect(featured?.name).toBe("Just right");
  });

  it("falls back to the first testimonial", () => {
    expect(featuredTestimonial([t("Only", "Short")])?.name).toBe("Only");
    expect(featuredTestimonial([])).toBeNull();
  });
});

describe("initials", () => {
  it("takes the first letter of the first two names", () => {
    expect(initials("dino t bizcover")).toBe("DT");
    expect(initials("Cher")).toBe("C");
    expect(initials(undefined)).toBe("");
  });
});
