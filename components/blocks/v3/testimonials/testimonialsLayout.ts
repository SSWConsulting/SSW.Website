// The layout of the testimonials block a Tina field belongs to, read from the
// form values by the field's path, e.g. "blocks.3.testimonials.0.caseStudyUrl"
// reads `blocks.3.layout`. Unset or unreadable means the default layout.
export function blockLayout(fieldName: string | undefined, values): string {
  const [blockPath, rest] = fieldName?.split(".testimonials.") ?? [];
  if (!blockPath || rest === undefined) return "quote";
  const block = blockPath.split(".").reduce((obj, key) => obj?.[key], values);
  return block?.layout || "quote";
}
