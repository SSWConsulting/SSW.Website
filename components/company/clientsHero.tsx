"use client";

import { componentRenderer } from "@/components/blocks/mdxComponentRenderer";
import { ArrowCircle } from "@/components/blocks/v3/shared/arrowCircle";
import RippleButton from "@/components/button/rippleButtonV2";
import { CustomLink } from "@/components/customLink";
import Image from "next/image";
import { FiArrowDown, FiArrowUpRight, FiStar } from "react-icons/fi";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown, type TinaMarkdownContent } from "tinacms/dist/rich-text";

export const CLIENT_STORIES_ID = "client-stories";

// Outcome copy is based on content/company/case-study/fpe.mdx.
const HERO_STORY = {
  client: "French Payroll Expert",
  image: "/images/new-homepage-background-assets/fpe.png",
  headline: "From an inbox of questions to answers around the clock.",
  link: "/company/clients/fpe",
  outcome:
    "FPE's clients can now ask about French payroll law at any time, in any language, with answers drawn from official legislation.",
};

const eyebrow =
  "m-0 text-xs font-semibold uppercase tracking-widest text-brand";

const HeroTitle = ({ text }: { text?: string | null }) => {
  return (
    <>
      {(text ?? "").split(/\*\*(.*?)\*\*/).map((part, index) =>
        index % 2 ? (
          <span key={index} className="block text-brand">
            {part}
          </span>
        ) : (
          part
        )
      )}
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

        <p className="m-0 mt-10 max-w-xs border-l-2 border-sswRed pl-4 text-sm leading-relaxed text-muted-foreground">
          30+ years of building software that makes a difference.
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
        className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent"
      />
      <span className="absolute left-6 top-6 inline-flex items-center gap-1.5 rounded-full bg-sswRed px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-white shadow-lg lg:left-8 lg:top-8">
        <FiStar aria-hidden className="size-3.5 fill-current" />
        Featured story
      </span>
      <span className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-6 lg:p-8">
        <span className="text-base font-semibold text-sswRed">
          {HERO_STORY.client}
        </span>
        <span className="text-2xl font-semibold leading-tight tracking-tight text-white lg:text-3xl">
          {HERO_STORY.headline}
        </span>
      </span>
    </span>
    <span className="flex items-center gap-5 px-6 py-5 lg:px-8">
      <span className="flex-1 text-sm leading-relaxed text-muted-foreground">
        {HERO_STORY.outcome}
      </span>
      <ArrowCircle
        className="size-11 flex-none border-0.75 border-hairline bg-transparent text-foreground"
        iconClassName="size-4"
      />
    </span>
  </CustomLink>
);
