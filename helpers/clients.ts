// Pure derivation for the /company/clients story index. Kept out of the
// components so the search, filter and rich-text walking rules are
// unit-testable.

import type { ClientDisplay } from "@/components/company/clientList";
import { getYouTubeId } from "@/helpers/embeds";
import type { TinaMarkdownContent } from "tinacms/dist/rich-text";

// The story's plain text, for searching and for the card summary of a client
// with no summary of its own. Embedded components (videos, buttons) carry no
// text nodes, so they drop out.
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

// The first YouTube <VideoEmbed> in the story, if any.
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

// Pinned stories first; otherwise the order editors set in Tina. The sort is
// stable, so each group keeps its Tina order.
export const orderClients = (clients: ClientDisplay[]) =>
  [...clients].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));

// Everything a search can match, lower-cased once per client.
export const clientSearchText = (client: ClientDisplay) =>
  [
    client.name,
    client.headline,
    client.summary,
    client.service,
    ...clientIndustries(client),
    storyText(client.content),
  ]
    .join(" ")
    .toLowerCase();

export type ClientFilters = {
  // Unset means "all".
  industry?: string;
  service?: string;
  query?: string;
};

export const matchesClientFilters = (
  client: ClientDisplay,
  searchText: string,
  { industry, service, query }: ClientFilters
) => {
  const q = query?.trim().toLowerCase();
  return (
    (!industry || clientIndustries(client).includes(industry)) &&
    (!service || client.service === service) &&
    (!q || searchText.includes(q))
  );
};
