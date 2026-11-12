import { describe, expect, it } from "@jest/globals";
import { blockLayout } from "@/components/blocks/v3/testimonials/testimonialsLayout";

const values = {
  blocks: [
    { _template: "v3Hero" },
    { layout: "caseStudy", testimonials: [{ quote: "a" }, { quote: "b" }] },
  ],
};

describe("blockLayout", () => {
  it("finds the layout of the block a testimonial field belongs to", () => {
    expect(blockLayout("blocks.1.testimonials.1.caseStudyUrl", values)).toBe(
      "caseStudy"
    );
  });

  it("doesn't depend on the name of the list", () => {
    const listed = { blocks: [{ layout: "caseStudy", slides: [{}] }] };
    expect(blockLayout("blocks.0.slides.0.caseStudyUrl", listed)).toBe(
      "caseStudy"
    );
  });

  it("falls back to the default layout when none is set", () => {
    expect(
      blockLayout("blocks.0.testimonials.0.caseStudyUrl", {
        blocks: [{ testimonials: [{}] }],
      })
    ).toBe("quote");
  });

  it("falls back to the default layout for a path it can't read", () => {
    expect(blockLayout(undefined, values)).toBe("quote");
    expect(blockLayout("caseStudyUrl", values)).toBe("quote");
  });
});
