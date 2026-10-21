import type { ClientDisplay } from "@/components/company/clientList";
import { getYouTubeId } from "@/helpers/embeds";
import type { TinaMarkdownContent } from "tinacms/dist/rich-text";

// Embedded components (videos, buttons) have no text nodes, so they drop out.
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
  // Unset means "all".
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
