"use client";

import { ArrowCircle } from "@/components/blocks/v3/shared/arrowCircle";
import { YouTubeEmbed } from "@/components/embeds/youtubeEmbed";
import {
  cardFooter,
  cardShell,
  productTagChip,
} from "@/components/products/shared";
import {
  clientTags,
  findVideo,
  logoBox,
  storyText,
  type StoryVideo,
} from "@/helpers/clients";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { FaPlay } from "react-icons/fa";
import { tinaField } from "tinacms/dist/react";
import { CustomLink } from "../customLink";
import type { ClientDisplay } from "@/helpers/clientTypes";

type ClientCardProps = {
  client: ClientDisplay;
  onOpen: () => void;
};

export const ClientCard = ({ client, onOpen }: ClientCardProps) => {
  const tags = clientTags(client);
  const summary = client.summary || storyText(client.content);
  const video = findVideo(client.content);

  const actionClassName = cn(
    "unstyled text-left text-sm font-semibold text-foreground no-underline",
    cardFooter,
    "border-hairline",
    "after:absolute after:inset-0 after:rounded-card focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-inset focus-visible:after:ring-brand"
  );
  const actionLabel = (
    <>
      <span>
        {client.caseStudyUrl ? "Explore the case study" : "Read more"}
        <span className="sr-only"> about {client.name}</span>
      </span>
      <ArrowCircle
        className="size-9 flex-none bg-gray-200 p-2 text-gray-900 dark:bg-gray-950 dark:text-white"
        iconClassName="size-3.5"
      />
    </>
  );

  return (
    <article
      className={cn(
        cardShell,
        "w-full",
        "border-stroke-weak bg-card hover:border-brand hover:bg-card-hover dark:border-hairline dark:hover:border-brand"
      )}
    >
      <div className="relative aspect-video overflow-hidden border-b-0.75 border-stroke-weak dark:border-hairline">
        {video ? (
          <CardVideo video={video} poster={client.image} name={client.name} />
        ) : client.image ? (
          <Image
            src={client.image}
            alt=""
            fill
            sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
            data-tina-field={tinaField(client, "image")}
            className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
          />
        ) : (
          client.logo && (
            // White in both themes: most client logos are JPGs on white.
            <span className="absolute inset-0 bg-white">
              <CardLogo
                src={client.logo}
                tinaFieldName={tinaField(client, "logo")}
              />
            </span>
          )
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 lg:p-6">
        <p
          data-tina-field={tinaField(client, "name")}
          className="m-0 text-sm font-semibold text-brand"
        >
          {client.name}
        </p>
        {client.headline && (
          <h3
            data-tina-field={tinaField(client, "headline")}
            className="m-0 mt-2 p-0 text-xl font-semibold leading-snug tracking-tight text-foreground"
          >
            {client.headline}
          </h3>
        )}
        {summary && (
          <p
            data-tina-field={tinaField(
              client,
              client.summary ? "summary" : "content"
            )}
            className="m-0 mt-3 line-clamp-3 text-sm font-light leading-relaxed text-muted-foreground"
          >
            {summary}
          </p>
        )}
        {tags.length > 0 && (
          <ul className="m-0 mt-4 flex list-none flex-wrap gap-1.5 p-0">
            {tags.map((tag) => (
              <li key={tag} className={productTagChip}>
                {tag}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex flex-col pt-6">
          {client.caseStudyUrl ? (
            <CustomLink href={client.caseStudyUrl} className={actionClassName}>
              {actionLabel}
            </CustomLink>
          ) : (
            <button
              type="button"
              onClick={onOpen}
              aria-haspopup="dialog"
              className={actionClassName}
            >
              {actionLabel}
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

// Hidden until loaded: its size depends on the image's aspect ratio.
const CardLogo = ({
  src,
  tinaFieldName,
}: {
  src: string;
  tinaFieldName: string;
}) => {
  const [ratio, setRatio] = useState<number>();
  const box = logoBox(ratio);

  return (
    <span
      className={cn(
        "absolute inset-0 m-auto transition-opacity duration-300",
        !ratio && "opacity-0"
      )}
      style={box}
    >
      <Image
        src={src}
        alt=""
        fill
        sizes="(min-width: 1280px) 17vw, (min-width: 768px) 25vw, 55vw"
        data-tina-field={tinaFieldName}
        onLoad={(event) =>
          setRatio(
            event.currentTarget.naturalWidth / event.currentTarget.naturalHeight
          )
        }
        className="object-contain transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
      />
    </span>
  );
};

// z-10 lifts it above the card's stretched link, so a click plays the video.
const CardVideo = ({
  video,
  poster,
  name,
}: {
  video: StoryVideo;
  poster?: string;
  name: string;
}) => {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <YouTubeEmbed
        id={video.id}
        autoplay
        width="100%"
        height="100%"
        className="relative z-10 size-full"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Watch the ${name} video${video.caption ? `: ${video.caption}` : ""}${video.duration ? ` (${video.duration})` : ""}`}
      className="unstyled group/video relative z-10 block size-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand"
    >
      <Image
        src={poster || `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
        alt=""
        fill
        sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
        className="object-cover transition-transform duration-500 group-hover/video:scale-105 motion-reduce:transition-none"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/10"
      />
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-sswRed text-white shadow-lg transition-transform duration-300 group-hover/video:scale-110 motion-reduce:transition-none"
      >
        <FaPlay className="ml-1 size-5" />
      </span>
      <span
        aria-hidden="true"
        className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-black/60 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm"
      >
        <FaPlay className="size-2.5" />
        Watch video{video.duration && ` · ${video.duration}`}
      </span>
    </button>
  );
};
