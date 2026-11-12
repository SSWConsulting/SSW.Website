import type { Template } from "tinacms";

export type TikTokEmbedProps = {
  url: string;
  caption?: string;
  duration?: string;
};

// A full TikTok video URL ends in /video/<id>, for example
// https://www.tiktok.com/@microburbs/video/7700040809642511637.
// Short share links (vt.tiktok.com/...) hide the id behind a redirect.
const TIKTOK_VIDEO_URL =
  /^https:\/\/(?:www\.)?tiktok\.com\/@[\w.-]+\/video\/(\d+)(?:[/?#]|$)/i;

const EXAMPLE_URL = "https://www.tiktok.com/@ssw_tv/video/1234567890";

export const getTikTokVideoId = (url?: string): string | undefined =>
  url?.trim().match(TIKTOK_VIDEO_URL)?.[1];

export const validateTikTokVideoUrl = (value?: string): string | undefined =>
  !value || getTikTokVideoId(value)
    ? undefined
    : `Use the full TikTok video URL, like ${EXAMPLE_URL}`;

const isHttpsUrl = (url: string) => {
  try {
    return new URL(url).protocol === "https:";
  } catch {
    return false;
  }
};

export const TikTokEmbed = ({ url, caption, duration }: TikTokEmbedProps) => {
  const videoId = getTikTokVideoId(url);
  const href = url?.trim();

  // Content edited outside TinaCMS can hold a URL the player cannot take,
  // such as a short link. Keep the video reachable with a plain link then.
  if (!videoId && !(href && isHttpsUrl(href))) {
    return null;
  }

  return (
    <figure className="mx-auto my-8 w-full max-w-tiktok">
      {videoId ? (
        // TikTok's embed player, the iframe its oEmbed API returns. It needs
        // no third-party script, unlike the blockquote embed.
        <iframe
          className="aspect-9/16 w-full rounded-md"
          src={`https://www.tiktok.com/player/v1/${videoId}?description=1&music_info=1&rel=0`}
          title={caption ? `TikTok video: ${caption}` : "TikTok video"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture; web-share"
          loading="lazy"
        />
      ) : (
        <a
          className="block text-center"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
        >
          Watch the video on TikTok
        </a>
      )}
      {caption && (
        <figcaption className="mt-2 text-center font-bold text-inherit">
          Video: {caption} {duration && <>({duration})</>}
        </figcaption>
      )}
    </figure>
  );
};

export const tikTokEmbedSchema: Template = {
  name: "TikTokEmbed",
  label: "TikTok Embed",
  ui: {
    previewSrc: "/images/thumbs/tina/tiktok-embed.jpg",
  },
  fields: [
    {
      type: "string",
      label: "TikTok video URL",
      name: "url",
      description: `The full video URL, for example ${EXAMPLE_URL}. Open a short vt.tiktok.com link in a browser to get it`,
      required: true,
      ui: {
        validate: validateTikTokVideoUrl,
      },
    },
    {
      type: "string",
      label: "Caption",
      name: "caption",
      description:
        "Shows up under the video as 'Video: {{ YOUR_INPUT }} ({{ YOUR_DURATION }})'. No full stop at the end. See https://ssw.com.au/rules/add-useful-and-concise-figure-captions",
    },
    {
      type: "string",
      label: "Duration",
      name: "duration",
      description:
        "Shows only with a caption. For example 30 sec, 4 min, 1 hr or 1 hr 26 min. See https://ssw.com.au/rules/right-format-to-write-videos-time-length",
    },
  ],
};
