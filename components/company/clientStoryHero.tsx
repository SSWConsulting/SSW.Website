"use client";

import RippleButton from "@/components/button/rippleButtonV2";
import type { ClientDisplay } from "@/helpers/clientTypes";
import { clientIndustries, type StoryVideo } from "@/helpers/clients";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { FiArrowDown, FiArrowUpRight } from "react-icons/fi";
import { tinaField } from "tinacms/dist/react";
import { CardVideo } from "./clientCard";
import { rise } from "./rise";

export const CLIENT_STORY_ID = "story";

const eyebrow =
  "m-0 text-xs font-semibold uppercase tracking-widest text-brand";

type ClientStoryHeroProps = {
  caseStudy: { heading?: string | null; subHeading?: string | null };
  story: ClientDisplay | null;
  video: StoryVideo | null;
  readMinutes: number;
};

export const ClientStoryHero = ({
  caseStudy,
  story,
  video,
  readMinutes,
}: ClientStoryHeroProps) => {
  // The eyebrow carries what the page doesn't say elsewhere: the service,
  // then the client's industries.
  const eyebrowDetail = [
    story?.service,
    story ? clientIndustries(story).join(", ") : "",
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <section className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
      <div className="min-w-0 lg:col-span-6 xl:col-span-7">
        <p {...rise(0, eyebrow)}>
          Client story
          {eyebrowDetail && (
            <span className="text-muted-foreground"> · {eyebrowDetail}</span>
          )}
        </p>
        <h1
          {...rise(
            1,
            "m-0 mt-5 p-0 text-4xl font-semibold leading-none tracking-tighter text-foreground sm:text-5xl xl:text-6xl"
          )}
          data-tina-field={tinaField(caseStudy, "heading")}
        >
          {caseStudy.heading}
        </h1>
        {caseStudy.subHeading && (
          <p
            {...rise(
              2,
              "m-0 mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl"
            )}
            data-tina-field={tinaField(caseStudy, "subHeading")}
          >
            {caseStudy.subHeading}
          </p>
        )}

        <div {...rise(3, "mt-8 flex flex-wrap items-center gap-x-6 gap-y-3")}>
          <RippleButton
            variant="primary"
            href="/company/contact-us"
            className="inline-flex text-base font-semibold"
            fontClassName="gap-3"
          >
            <span>Talk to our team</span>
            <FiArrowUpRight aria-hidden className="size-4" />
          </RippleButton>
          <RippleButton
            variant="secondary"
            href={`#${CLIENT_STORY_ID}`}
            className="inline-flex border-stroke-weak text-base font-semibold text-foreground hover:border-brand hover:bg-card-hover hover:text-foreground dark:border-hairline dark:hover:border-brand"
            fontClassName="gap-3"
          >
            <span>
              Read the story
              <span className="font-normal text-muted-foreground">
                {" "}
                · {readMinutes} min
              </span>
            </span>
            <FiArrowDown aria-hidden className="size-4" />
          </RippleButton>
        </div>
      </div>

      <div {...rise(2, "relative lg:col-span-6 xl:col-span-5")}>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-red-radial opacity-25 blur-3xl motion-safe:animate-slight-pulse"
        />
        <HeroMedia story={story} video={video} name={caseStudy.heading} />
        {video?.caption && (
          <p className="m-0 mt-4 text-sm leading-relaxed text-muted-foreground">
            {video.caption}
          </p>
        )}
      </div>
    </section>
  );
};

const mediaFrame =
  "relative aspect-video overflow-hidden rounded-card border-0.75 border-stroke-weak bg-card shadow-2xl dark:border-hairline";

const HeroMedia = ({
  story,
  video,
  name,
}: {
  story: ClientDisplay | null;
  video: StoryVideo | null;
  name?: string | null;
}) => {
  if (video) {
    return (
      <div className={mediaFrame}>
        <CardVideo video={video} poster={story?.image} name={name ?? ""} />
      </div>
    );
  }

  if (story?.image) {
    return (
      <div className={mediaFrame}>
        <Image
          src={story.image}
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 45vw, 100vw"
          data-tina-field={tinaField(story, "image")}
          className="object-cover"
        />
      </div>
    );
  }

  // White in both themes: most client logos are JPGs on white.
  return (
    <div
      className={cn(mediaFrame, "flex items-center justify-center bg-white")}
    >
      {story?.logo ? (
        <Image
          src={story.logo}
          alt={`${story.name} logo`}
          width={320}
          height={160}
          priority
          data-tina-field={tinaField(story, "logo")}
          className="h-2/5 w-3/5 object-contain"
        />
      ) : (
        <span className="px-8 text-center text-3xl font-semibold tracking-tight text-gray-900">
          {name}
        </span>
      )}
    </div>
  );
};
