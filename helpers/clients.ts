import type { ClientDisplay } from "@/helpers/clientTypes";
import { getYouTubeId } from "@/helpers/embeds";
import type { TinaMarkdownContent } from "tinacms/dist/rich-text";

const plainText = (node: unknown): string => {
  if (!node || typeof node !== "object") return "";
  const { text, children } = node as { text?: string; children?: unknown[] };
  if (typeof text === "string") return text;
  return (children ?? []).map(plainText).join(" ");
};

export const storyText = (content: TinaMarkdownContent) =>
  plainText(content).replace(/\s+/g, " ").trim();

export const clientIndustries = (client: ClientDisplay) =>
  client.categories?.map((c) => c?.category?.name).filter(Boolean) ?? [];

export const clientIndustryOptions = (
  clients: ClientDisplay[],
  categories: string[]
) =>
  categories
    .map((label) => ({
      label,
      count: clients.filter((client) =>
        clientIndustries(client).includes(label)
      ).length,
    }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, "en"));

export const clientTags = (client: ClientDisplay) =>
  [...new Set([...clientIndustries(client), client.service])].filter(Boolean);

export type StoryVideo = { id: string; caption?: string; duration?: string };

export const findVideo = (node: unknown): StoryVideo | null => {
  if (!node || typeof node !== "object") return null;
  const { name, props, children } = node as {
    name?: string;
    props?: { url?: string; caption?: string; duration?: string };
    children?: unknown[];
  };
  // A playlist URL matches the pattern too, but has no single video to play.
  const id = name === "VideoEmbed" ? getYouTubeId(props?.url) : null;
  if (id) {
    return { id, caption: props?.caption, duration: props?.duration };
  }
  for (const child of children ?? []) {
    const video = findVideo(child);
    if (video) return video;
  }
  return null;
};

// Pinned first. The sort is stable, so each group keeps its Tina order.
export const orderClients = (clients: ClientDisplay[]) =>
  [...clients].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));

export type ClientFilters = {
  industry?: string;
  service?: string;
};

export const matchesClientFilters = (
  client: ClientDisplay,
  { industry, service }: ClientFilters
) =>
  (!industry || clientIndustries(client).includes(industry)) &&
  (!service || client.service === service);

// Card logos are sized to the same visual area, so wide and square logos read
// as one size. The box is a share of the 16:9 panel, capped on both sides.
const PANEL_RATIO = 16 / 9;
const LOGO_AREA = 0.07;
const LOGO_MAX_WIDTH = 0.55;
const LOGO_MAX_HEIGHT = 0.45;

export const logoBox = (ratio?: number) => {
  const r = Number.isFinite(ratio) && ratio > 0 ? ratio : 2;
  const width = Math.min(
    Math.sqrt((LOGO_AREA * r) / PANEL_RATIO),
    LOGO_MAX_WIDTH,
    (LOGO_MAX_HEIGHT * r) / PANEL_RATIO
  );
  const height = (width * PANEL_RATIO) / r;
  return { width: `${width * 100}%`, height: `${height * 100}%` };
};

// Editors enter case study links both as absolute ssw.com.au URLs and as
// site paths, so links are compared by path alone.
const casePath = (url?: string) =>
  (url ?? "")
    .replace(/^https?:\/\/[^/]+/, "")
    .replace(/[?#].*$/, "")
    .replace(/\/+$/, "")
    .toLowerCase();

export const findClientStory = (clients: ClientDisplay[], filename: string) =>
  clients.find(
    (client) =>
      casePath(client.caseStudyUrl) ===
      `/company/clients/${filename}`.toLowerCase()
  ) ?? null;

// Other case studies, closest first: a shared service outweighs a shared
// industry, and pinned stories break ties. The sort is stable, so equal
// scores keep their Tina order.
export const relatedClientStories = (
  clients: ClientDisplay[],
  filename: string,
  count = 3
) => {
  const current = findClientStory(clients, filename);
  const industries = current ? clientIndustries(current) : [];
  const score = (client: ClientDisplay) =>
    (current?.service && client.service === current.service ? 4 : 0) +
    clientIndustries(client).filter((name) => industries.includes(name))
      .length *
      2 +
    Number(!!client.featured);

  return clients
    .filter((client) => client.caseStudyUrl && client !== current)
    .map((client) => ({ client, score: score(client) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map(({ client }) => client);
};

export const headingId = (text: string) =>
  text
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export type StoryHeading = { id: string; text: string };

// The story's h2s, for its table of contents. Ids match the ones the article
// gives its headings, since both come from the heading text.
export const storyHeadings = (content: TinaMarkdownContent): StoryHeading[] => {
  const children =
    (content as { children?: { type?: string }[] } | null)?.children ?? [];
  return children
    .filter((node) => node?.type === "h2")
    .map((node) => {
      const text = storyText(node as TinaMarkdownContent);
      return { id: headingId(text), text };
    })
    .filter((heading) => heading.id);
};
