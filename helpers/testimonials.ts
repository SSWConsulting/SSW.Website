import type { TinaMarkdownContent } from "tinacms/dist/rich-text";
import type { TestimonialType } from "./getTestimonials";

type MarkdownNode = {
  type?: string;
  name?: string;
  props?: Record<string, unknown>;
  children?: MarkdownNode[];
  text?: string;
};

const root = (children: MarkdownNode[]) =>
  ({ type: "root", children }) as TinaMarkdownContent;

const nodeText = (node: MarkdownNode): string =>
  node.text ?? (node.children ?? []).map(nodeText).join("");

export type TestimonialsPage = {
  tagline: string | null;
  intro: TinaMarkdownContent;
  about: TinaMarkdownContent;
  excludedCategories: { categoryName: string }[];
  hasList: boolean;
};

// The testimonials page keeps everything in one markdown field: a tagline
// heading, the intro, an "About us" section, then the TestimonialsList.
// Split it so each part can sit in its own place on the page. Anything after
// the list stays with "About us", so no content is dropped.
export const splitTestimonialsPage = (
  content?: TinaMarkdownContent | null
): TestimonialsPage => {
  const nodes =
    (content as { children?: MarkdownNode[] } | null)?.children ?? [];
  const listIndex = nodes.findIndex(
    (node) => node?.name === "TestimonialsList"
  );
  const list = listIndex >= 0 ? nodes[listIndex] : null;
  const rest = nodes.filter((_, index) => index !== listIndex);

  const firstSection = rest.findIndex((node) => node?.type === "h2");
  const head = firstSection >= 0 ? rest.slice(0, firstSection) : rest;
  const about = firstSection >= 0 ? rest.slice(firstSection) : [];

  const taglineIndex = head.findIndex((node) =>
    ["h1", "h2", "h3", "h4"].includes(node?.type ?? "")
  );
  const tagline =
    taglineIndex >= 0 ? nodeText(head[taglineIndex]).trim() || null : null;

  return {
    tagline,
    intro: root(head.filter((_, index) => index !== taglineIndex)),
    about: root(about),
    excludedCategories:
      (list?.props?.excludedCategories as { categoryName: string }[]) ?? [],
    hasList: !!list,
  };
};

// The hero quotes one testimonial in full: the first with a photo whose quote
// is long enough to say something and short enough to read at a glance.
export const featuredTestimonial = (testimonials: TestimonialType[]) =>
  testimonials.find(
    (t) =>
      t.avatar && (t.body?.trim().length ?? 0) >= 120 && t.body.length <= 360
  ) ??
  testimonials[0] ??
  null;

export const initials = (name?: string) =>
  (name ?? "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
