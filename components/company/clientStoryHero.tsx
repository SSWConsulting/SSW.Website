"use client";

import RippleButton from "@/components/button/rippleButtonV2";
import { productTagChip } from "@/components/products/shared";
import type { ClientDisplay } from "@/helpers/clientTypes";
import { clientIndustries, type StoryVideo } from "@/helpers/clients";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { FiArrowDown, FiArrowUpRight } from "react-icons/fi";
import { tinaField } from "tinacms/dist/react";
import { CardVideo } from "./clientCard";

export const CLIENT_STORY_ID = "story";

const eyebrow =
  "m-0 text-xs font-semibold uppercase tracking-widest text-brand";

// Each hero line rises in after the one before it. A CSS animation rather
// than framer-motion, so the server-rendered headline shows (and counts for
// LCP) before the page hydrates.
const rise = (step: number, className: string) => ({
  className: cn(className, "motion-safe:animate-rise-in"),
  style: { animationDelay: `${80 * step}ms` },
});

type ClientStoryHeroProps = {
  caseStudy: { heading?: string | null; subHeading?: string | null };
  story: ClientDisplay | null;
  video: StoryVideo | null;
};

export const ClientStoryHero = ({
  caseStudy,
  story,
  video,
}: ClientStoryHeroProps) => {
  const industries = story ? clientIndustries(story) : [];

  return (
    <section className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
      <div className="min-w-0 lg:col-span-6 xl:col-span-7">
        <p {...rise(0, eyebrow)}>
          Client story
          {story?.service && (
            <span className="text-muted-foreground"> · {story.service}</span>
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

        {industries.length > 0 && (
          <ul
            {...rise(3, "m-0 mt-6 flex list-none flex-wrap gap-1.5 p-0")}
            aria-label="Industries"
          >
            {industries.map((name) => (
              <li key={name} className={productTagChip}>
                {name}
              </li>
            ))}
          </ul>
        )}

        <div {...rise(4, "mt-8 flex flex-wrap items-center gap-x-6 gap-y-3")}>
          <RippleButton
            variant="primary"
            href={`#${CLIENT_STORY_ID}`}
            className="inline-flex text-base font-semibold"
            fontClassName="gap-3"
          >
            <span>Read the story</span>
            <FiArrowDown aria-hidden className="size-4" />
          </RippleButton>
          <RippleButton
            variant="secondary"
            href="/company/contact-us"
            className="inline-flex border-stroke-weak text-base font-semibold text-foreground hover:border-brand hover:bg-card-hover hover:text-foreground dark:border-hairline dark:hover:border-brand"
            fontClassName="gap-3"
          >
            <span>Talk to our team</span>
            <FiArrowUpRight aria-hidden className="size-4" />
          </RippleButton>
        </div>
      </div>

      <div {...rise(2, "relative lg:col-span-6 xl:col-span-5")}>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-red-radial opacity-25 blur-3xl motion-safe:animate-slight-pulse"
        />
        <HeroMedia story={story} video={video} name={caseStudy.heading} />
        {story?.logo && (video || story.image) && (
          <span className="absolute -bottom-6 right-6 flex h-16 w-36 items-center justify-center rounded-xl border-0.75 border-stroke-weak bg-white p-3 shadow-xl motion-safe:animate-badge-bounce-up dark:border-hairline">
            <Image
              src={story.logo}
              alt={`${story.name} logo`}
              width={144}
              height={64}
              data-tina-field={tinaField(story, "logo")}
              className="size-full object-contain"
            />
          </span>
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
