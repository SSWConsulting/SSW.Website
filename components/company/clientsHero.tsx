"use client";

import { componentRenderer } from "@/components/blocks/mdxComponentRenderer";
import { ArrowCircle } from "@/components/blocks/v3/shared/arrowCircle";
import RippleButton from "@/components/button/rippleButtonV2";
import { CustomLink } from "@/components/customLink";
import Image from "next/image";
import { FiArrowDown, FiArrowUpRight } from "react-icons/fi";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown, type TinaMarkdownContent } from "tinacms/dist/rich-text";

export const CLIENT_STORIES_ID = "client-stories";

// Set in code, not Tina: the copy is written for this layout. The stat comes
// from content/company/case-study/fpe.mdx.
const HERO_STORY = {
  client: "French Payroll Expert",
  image: "/images/new-homepage-background-assets/fpe.png",
  headline: ["From an inbox of questions.", "To answers around the clock."],
  link: "/company/clients/fpe",
  stat: "24/7",
  statLabel: ["answers on French payroll law,", "in any language"],
};

const eyebrow =
  "m-0 text-xs font-semibold uppercase tracking-widest text-brand";

// The title's **marked** part goes on its own line, in red.
const HeroTitle = ({ text }: { text?: string | null }) => {
  const [lead, accent] = (text ?? "").split(/\*\*(.*?)\*\*/);
  return (
    <>
      {lead?.trim()}
      {accent && <span className="block text-brand">{accent}</span>}
    </>
  );
};

type ClientsHeroProps = {
  company: {
    title?: string | null;
    subTitle?: TinaMarkdownContent | null;
  };
};

export const ClientsHero = ({ company }: ClientsHeroProps) => (
  <>
    <section className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
      <div className="min-w-0 lg:col-span-7">
        <p className={eyebrow}>Our clients&rsquo; stories</p>
        <h1
          data-tina-field={tinaField(company, "title")}
          className="m-0 mt-5 p-0 text-4xl font-semibold leading-none tracking-tighter text-foreground sm:text-5xl xl:text-6xl"
        >
          <HeroTitle text={company.title} />
        </h1>

        {company.subTitle?.children?.length > 0 && (
          <div
            data-tina-field={tinaField(company, "subTitle")}
            className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground [&_p]:m-0"
          >
            <TinaMarkdown
              content={company.subTitle}
              components={componentRenderer}
            />
          </div>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <RippleButton
            variant="primary"
            href={`#${CLIENT_STORIES_ID}`}
            className="inline-flex text-base font-semibold"
            fontClassName="gap-3"
          >
            <span>Explore client stories</span>
            <FiArrowDown aria-hidden className="size-4" />
          </RippleButton>
          <CustomLink
            href="/company/contact-us"
            className="unstyled inline-flex items-center gap-2 text-base font-semibold text-foreground no-underline hover:text-brand"
          >
            Talk to our team
            <FiArrowUpRight aria-hidden className="size-4" />
          </CustomLink>
        </div>

        <p className="m-0 mt-10 max-w-xs border-l-2 border-sswRed pl-4 text-sm leading-relaxed text-muted-foreground">
          Three decades of building software that makes a difference.
        </p>
      </div>

      <FeaturedStory />
    </section>
  </>
);

const FeaturedStory = () => (
  <CustomLink
    href={HERO_STORY.link}
    className="unstyled group block overflow-hidden rounded-card border-0.75 border-stroke-weak bg-card no-underline transition-colors duration-300 hover:border-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand motion-reduce:transition-none lg:col-span-5 dark:border-hairline dark:hover:border-brand"
  >
    <span className="relative block overflow-hidden">
      <Image
        src={HERO_STORY.image}
        alt=""
        width={2555}
        height={1432}
        priority
        sizes="(min-width: 1024px) 45vw, 100vw"
        className="block aspect-4/3 h-auto w-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"
      />
      <span className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-6 lg:p-8">
        <span className="text-xs font-semibold uppercase tracking-widest text-white/70">
          Featured story / {HERO_STORY.client}
        </span>
        <span className="text-2xl font-semibold leading-tight tracking-tight text-white lg:text-3xl">
          {HERO_STORY.headline.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </span>
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-white">
          Discover the {HERO_STORY.client} story
          <FiArrowUpRight aria-hidden className="size-4" />
        </span>
      </span>
    </span>
    <span className="flex items-center gap-5 px-6 py-5 lg:px-8">
      <span className="text-4xl font-semibold leading-none tracking-tight text-foreground">
        {HERO_STORY.stat}
      </span>
      <span className="flex-1 text-sm leading-snug text-muted-foreground">
        {HERO_STORY.statLabel.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </span>
      <ArrowCircle
        className="size-11 flex-none border-0.75 border-hairline bg-transparent text-foreground"
        iconClassName="size-4"
      />
    </span>
  </CustomLink>
);
