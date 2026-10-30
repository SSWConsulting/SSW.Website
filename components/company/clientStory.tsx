"use client";

import { Blocks } from "@/components/blocks-renderer";
import { componentRenderer } from "@/components/blocks/mdxComponentRenderer";
import { HomeThemeShell } from "@/components/layout/homeTheme";
import { sidebarPageContainer } from "@/components/layout/stickySidebar";
import type { ClientDisplay } from "@/helpers/clientTypes";
import {
  clientIndustries,
  findVideo,
  headingId,
  storyHeadings,
  storyText,
  type StoryVideo,
} from "@/helpers/clients";
import { getYouTubeId } from "@/helpers/embeds";
import { cn } from "@/lib/utils";
import { removeExtension } from "@/services/client/utils.service";
import { Breadcrumbs } from "app/components/breadcrumb";
import {
  MotionConfig,
  motion,
  useScroll,
  useSpring,
  type MotionProps,
} from "framer-motion";
import { isValidElement, useMemo, type ReactNode } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown, type TinaMarkdownContent } from "tinacms/dist/rich-text";
import { CustomLink } from "../customLink";
import { ClientCard } from "./clientCard";
import { ClientQuote } from "./clientQuote";
import { themedProse } from "./clientStoryDialog";
import { ClientStoryHero, CLIENT_STORY_ID } from "./clientStoryHero";
import { ClientStoryToc } from "./clientStoryToc";
import { ClientsClosing } from "./clientsClosing";

const WORDS_PER_MINUTE = 220;

// Fades a section up the first time it scrolls into view, after `delay`.
const reveal = (delay = 0): MotionProps => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "0px 0px -10% 0px" },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

// The article reads longer than the dialog, so headings, quotes and rules get
// more room and their own accent on top of the shared theme tokens.
const articleProse = cn(
  themedProse,
  "md:prose-lg",
  "prose-h2:mb-4 prose-h2:mt-16 prose-h2:scroll-mt-28 prose-h2:text-2xl prose-h2:font-semibold prose-h2:tracking-tight md:prose-h2:text-3xl",
  "prose-h3:text-foreground prose-a:underline-offset-4 prose-li:marker:text-brand",
  "prose-blockquote:rounded-r-card prose-blockquote:border-l-2 prose-blockquote:border-sswRed prose-blockquote:bg-card prose-blockquote:px-6 prose-blockquote:py-5 prose-blockquote:font-light prose-blockquote:not-italic prose-blockquote:leading-relaxed prose-blockquote:text-foreground md:prose-blockquote:px-8 md:prose-blockquote:py-7",
  "prose-hr:border-stroke-weak dark:prose-hr:border-hairline",
  "prose-figcaption:text-muted-foreground"
);

// TinaMarkdown hands a heading its text as a nested <TinaMarkdown content>,
// so the id comes from the same nodes storyHeadings reads.
const headingText = (children: ReactNode) =>
  isValidElement<{ content?: unknown[] }>(children) &&
  Array.isArray(children.props.content)
    ? storyText({
        type: "root",
        children: children.props.content,
      } as TinaMarkdownContent)
    : "";

type Block = {
  __typename?: string;
  url?: string;
  caption?: string;
  duration?: string;
};

// The first YouTube video in the page body, if any, plays in the hero.
const bodyVideo = (blocks?: Block[] | null) => {
  for (const block of blocks ?? []) {
    const id =
      block?.__typename?.endsWith("VideoEmbed") && getYouTubeId(block.url);
    if (id) {
      return {
        block,
        video: { id, caption: block.caption, duration: block.duration },
      };
    }
  }
  return null;
};

type ClientStoryProps = {
  caseStudy: {
    heading?: string | null;
    subHeading?: string | null;
    seo?: { title?: string; showBreadcrumb?: boolean | null } | null;
    _body?: Block[] | null;
    content?: TinaMarkdownContent;
  };
  story: ClientDisplay | null;
  relatedStories: ClientDisplay[];
  relativePath: string;
};

export const ClientStory = ({
  caseStudy,
  story,
  relatedStories,
  relativePath,
}: ClientStoryProps) => {
  const fromBody = bodyVideo(caseStudy._body);
  const video: StoryVideo | null =
    fromBody?.video ?? findVideo(caseStudy.content);
  const blocks = (caseStudy._body ?? []).filter(
    (block) => block !== fromBody?.block
  );
  const headings = useMemo(
    () => storyHeadings(caseStudy.content),
    [caseStudy.content]
  );

  const components = useMemo(
    () => ({
      ...componentRenderer,
      ContentCard: (props) => <ClientQuote data={props} />,
      // The hero already plays this video.
      VideoEmbed: (props) =>
        video && getYouTubeId(props.url) === video.id
          ? null
          : componentRenderer.VideoEmbed(props),
      h2: ({ children }: { children?: ReactNode }) => (
        <motion.h2
          id={headingId(headingText(children)) || undefined}
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex items-center gap-3 before:block before:h-0.5 before:w-6 before:flex-none before:bg-sswRed"
        >
          {children}
        </motion.h2>
      ),
    }),
    [video]
  );

  const showBreadcrumb = caseStudy.seo?.showBreadcrumb !== false;

  return (
    <MotionConfig reducedMotion="user">
      {/* min-h-screen: PageLayout's <main> is bg-white and would show below. */}
      <HomeThemeShell className="min-h-screen bg-sunken-glow">
        <ReadingProgress />
        <div className={sidebarPageContainer}>
          <div className="min-h-12">
            {showBreadcrumb && (
              <Breadcrumbs
                path={removeExtension(relativePath)}
                title={caseStudy.seo?.title}
                seoSchema={caseStudy.seo}
              />
            )}
          </div>

          <div className="mt-6 md:mt-10">
            <ClientStoryHero
              caseStudy={caseStudy}
              story={story}
              video={video}
            />
          </div>

          <motion.div {...reveal()} className="mt-16 md:mt-20">
            <StoryFacts caseStudy={caseStudy} story={story} video={video} />
          </motion.div>

          <div
            id={CLIENT_STORY_ID}
            className="mt-12 grid scroll-mt-28 gap-10 md:mt-16 lg:grid-cols-12 lg:gap-12"
          >
            <aside className="max-lg:hidden lg:col-span-3">
              <div className="sticky top-28 flex flex-col gap-10">
                {headings.length > 1 && <ClientStoryToc headings={headings} />}
                <BackToStories />
              </div>
            </aside>

            <article className="min-w-0 lg:col-span-9 xl:col-span-8">
              {blocks.length > 0 && (
                <div className="mb-10">
                  <Blocks prefix="CaseStudy_body" blocks={blocks} />
                </div>
              )}
              <div
                data-tina-field={tinaField(caseStudy, "content")}
                className={articleProse}
              >
                <TinaMarkdown
                  content={caseStudy.content}
                  components={components}
                />
              </div>
              <div className="mt-12 lg:hidden">
                <BackToStories />
              </div>
            </article>
          </div>

          {relatedStories.length > 0 && (
            <RelatedStories stories={relatedStories} />
          )}

          <motion.div {...reveal()} className="mt-20">
            <ClientsClosing />
          </motion.div>
        </div>
      </HomeThemeShell>
    </MotionConfig>
  );
};

// A thin red bar along the top of the window that fills as the story is read.
const ReadingProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-sswRed"
    />
  );
};

const BackToStories = () => (
  <CustomLink
    href="/company/clients"
    className="unstyled group inline-flex items-center gap-2 text-sm font-semibold text-foreground no-underline hover:text-brand"
  >
    <FiArrowLeft
      aria-hidden
      className="size-4 transition-transform duration-300 group-hover:-translate-x-1 motion-reduce:transition-none"
    />
    All client stories
  </CustomLink>
);

const StoryFacts = ({
  caseStudy,
  story,
  video,
}: {
  caseStudy: ClientStoryProps["caseStudy"];
  story: ClientDisplay | null;
  video: StoryVideo | null;
}) => {
  const words = storyText(caseStudy.content).split(" ").length;
  const minutes = Math.max(1, Math.round(words / WORDS_PER_MINUTE));
  const industries = story ? clientIndustries(story) : [];

  const facts = [
    { label: "Client", value: story?.name || caseStudy.heading },
    { label: "Industry", value: industries.join(", ") },
    { label: "Service", value: story?.service },
    { label: "Read time", value: `${minutes} min read` },
    video?.duration && { label: "Video", value: video.duration },
  ].filter((fact): fact is { label: string; value: string } => !!fact?.value);

  return (
    // gap-px over a hairline-coloured list draws the dividers, which stay
    // right however the facts wrap.
    <dl className="m-0 flex flex-wrap gap-px overflow-hidden rounded-card border-0.75 border-stroke-weak bg-stroke-weak dark:border-hairline dark:bg-hairline">
      {facts.map(({ label, value }, index) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.08 * index }}
          className="min-w-40 flex-1 bg-card p-5 md:p-6"
        >
          <dt className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {label}
          </dt>
          <dd className="m-0 mt-2 text-base font-semibold text-foreground">
            {value}
          </dd>
        </motion.div>
      ))}
    </dl>
  );
};

const RelatedStories = ({ stories }: { stories: ClientDisplay[] }) => (
  <section aria-labelledby="related-stories" className="mt-24">
    <motion.div
      {...reveal()}
      className="flex flex-wrap items-end justify-between gap-4"
    >
      <div>
        <p className="m-0 text-xs font-semibold uppercase tracking-widest text-brand">
          Keep reading
        </p>
        <h2
          id="related-stories"
          className="m-0 mt-4 p-0 text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl"
        >
          More client stories
        </h2>
      </div>
      <BackToStories />
    </motion.div>
    <ul className="m-0 mt-8 grid list-none gap-6 p-0 md:grid-cols-2 xl:grid-cols-3">
      {stories.map((client, index) => (
        <motion.li key={client.name} {...reveal(0.1 * index)} className="flex">
          <ClientCard client={client} onOpen={() => {}} />
        </motion.li>
      ))}
    </ul>
  </section>
);
