// The block's layouts, as stored in the Layout field.
export const LAYOUT = { quote: "quote", caseStudy: "caseStudy" } as const;

// The layout of the testimonials block a Tina field belongs to, read from the
// form values by the field's path: "blocks.3.testimonials.0.caseStudyUrl"
// drops its last three parts (list, slide, field) to read `blocks.3.layout`.
// Unset or unreadable means the default layout.
export function blockLayout(
  fieldName: string | undefined,
  values: object
): string {
  const path = fieldName?.split(".") ?? [];
  if (path.length < 4) return LAYOUT.quote;
  const block = path
    .slice(0, -3)
    .reduce<unknown>((obj, key) => obj?.[key as keyof typeof obj], values) as
    | { layout?: string }
    | undefined;
  return block?.layout || LAYOUT.quote;
}
