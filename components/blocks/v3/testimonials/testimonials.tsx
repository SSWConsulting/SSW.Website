"use client";
import AlternatingText from "@/components/alternating-text";
import V2ComponentWrapper from "@/components/layout/v2ComponentWrapper";
import { Container } from "@/components/util/container";
import { cn } from "@/lib/utils";
import { MotionConfig, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { BiRightArrowAlt } from "react-icons/bi";
import { tinaField } from "tinacms/dist/react";
import { ProjectCard } from "../shared/projectCard";
import { LAYOUT } from "./testimonialsLayout";

// Each slide's content (author, portrait, case study) fades up when the slide
// changes.
const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] },
} as const;

// The quotation marks belong to the design, not to the copy, so editors type
// the quote plain. Any double quotes an editor wraps around it anyway (or that
// came from older content) are stripped first, so they never double up. The
// marks land outside the **red** markers, which keeps them in the body colour.
function withQuoteMarks(text: string) {
  const trimmed = text
    .trim()
    .replace(/^["“”]+\s*/, "")
    .replace(/\s*["“”]+$/, "");
  return trimmed ? `“${trimmed}”` : "";
}

type RevealToken =
  | { space: true; word?: undefined; red?: undefined }
  | { space?: false; word: string; red: boolean };

// Clip-style text reveal: words rise into view from behind a mask, staggered
// line-by-line. Lines are detected by measuring each word's rendered vertical
// position, so the stagger follows the real wrap points. Remount (via a `key`
// on the parent) re-fires the reveal on each slide switch. Preserves **red**
// emphasis (same convention as AlternatingText).
function ClipTextReveal({ text }: { text: string }) {
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [lineIndices, setLineIndices] = useState<number[] | null>(null);

  const tokens = useMemo<RevealToken[]>(() => {
    if (!text) return [];
    const out: RevealToken[] = [];
    text
      .split(/(\*\*.*?\*\*)/g)
      .filter(Boolean)
      .forEach((seg) => {
        const match = seg.match(/^\*\*(.*)\*\*$/);
        const red = Boolean(match);
        (match ? match[1] : seg).split(/(\s+)/).forEach((tok) => {
          if (tok === "") return;
          if (/^\s+$/.test(tok)) out.push({ space: true });
          else out.push({ word: tok, red });
        });
      });
    return out;
  }, [text]);

  const wordCount = tokens.filter((t) => !t.space).length;

  // After layout, group words sharing the same offsetTop into a line index.
  useEffect(() => {
    let line = -1;
    let lastTop: number | null = null;
    const indices = wordRefs.current
      .slice(0, wordCount)
      .map((el) => (el ? el.offsetTop : 0))
      .map((top) => {
        if (lastTop === null || top !== lastTop) {
          line += 1;
          lastTop = top;
        }
        return line;
      });
    setLineIndices(indices);
  }, [wordCount]);

  if (!text) return null;

  let wordIndex = -1;

  return (
    <span>
      {/* Readable copy for assistive tech; the animated words below are
          split per-word and hidden, so this carries the full quote. */}
      <span className="sr-only">{text.replace(/\*\*/g, "")}</span>
      <span aria-hidden="true">
        {tokens.map((tok, ti) => {
          if (tok.space) return <span key={`sp-${ti}`}> </span>;
          const i = ++wordIndex;
          return (
            <span
              key={`w-${ti}`}
              ref={(el) => {
                wordRefs.current[i] = el;
              }}
              className="-mb-descender inline-block overflow-hidden pb-descender align-bottom"
            >
              <motion.span
                className={`inline-block ${tok.red ? "text-sswRed" : ""}`}
                initial={{ y: "110%" }}
                animate={lineIndices ? { y: 0 } : { y: "110%" }}
                transition={{
                  duration: 1,
                  delay: lineIndices ? lineIndices[i] * 0.12 : 0,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {tok.word}
              </motion.span>
            </span>
          );
        })}
      </span>
    </span>
  );
}

// The large portrait, top-right on desktop and above the quote on phones.
function Portrait({ testimonial, activeIndex, className = "" }) {
  if (!testimonial?.authorImage) return null;
  return (
    <motion.div
      key={`author-image-${activeIndex}`}
      {...fadeUp}
      className={cn(
        "relative order-first size-48 shrink-0 overflow-hidden rounded-card xl:order-none",
        className
      )}
    >
      <Image
        src={testimonial.authorImage}
        alt={
          testimonial?.authorImageAlt ??
          testimonial?.authorName ??
          "Testimonial author"
        }
        fill
        className="object-cover"
        data-tina-field={tinaField(testimonial, "authorImage")}
      />
    </motion.div>
  );
}

// The author's name and role, stacked.
function AuthorName({ testimonial }) {
  return (
    <div className="flex min-w-0 flex-col break-words">
      {testimonial?.authorName && (
        <span
          data-tina-field={tinaField(testimonial, "authorName")}
          className="font-semibold text-foreground"
        >
          {testimonial.authorName}
        </span>
      )}
      {testimonial?.authorTitle && (
        <span
          data-tina-field={tinaField(testimonial, "authorTitle")}
          className="text-sm text-muted-foreground"
        >
          {testimonial.authorTitle}
        </span>
      )}
    </div>
  );
}

// Name + role, then the client logo behind a hairline divider.
function Attribution({ testimonial }) {
  return (
    <div className="flex items-center gap-4">
      <AuthorName testimonial={testimonial} />

      {testimonial?.companyLogo && (
        <>
          <span className="h-10 w-px shrink-0 bg-hairline" />
          {/* Wide wordmarks are capped on phones so they can't crowd the name. */}
          <Image
            src={testimonial.companyLogo}
            alt={testimonial?.companyLogoAlt ?? "Company logo"}
            width={160}
            height={160}
            className="h-12 w-auto shrink-0 object-contain object-left brightness-0 max-md:max-w-28 dark:invert"
            data-tina-field={tinaField(testimonial, "companyLogo")}
          />
        </>
      )}
    </div>
  );
}

// One arrow icon, mirrored for "previous": the icon set's left and right
// arrows differ in length.
function ArrowButton({ label, onClick, flip = false }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex size-10 items-center justify-center rounded-full bg-foreground text-background transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground motion-reduce:transition-none xl:size-12"
    >
      <BiRightArrowAlt
        className={cn("size-5 xl:size-6", flip && "-scale-x-100")}
      />
    </button>
  );
}

function Arrows({ noun, step, className = "" }) {
  return (
    <div className={cn("flex gap-3", className)}>
      <ArrowButton label={`Previous ${noun}`} onClick={() => step(-1)} flip />
      <ArrowButton label={`Next ${noun}`} onClick={() => step(1)} />
    </div>
  );
}

// Only the active slide is visible; the rest fade to opacity-0 and are
// `inert` and aria-hidden, so their links can't be tabbed to or read out.
// `className` places the slide; it goes first so its span-before-start
// order survives cn().
const slideProps = (isActive: boolean, className: string) => ({
  "aria-hidden": !isActive,
  inert: !isActive,
  className: cn(
    className,
    "transition-opacity duration-300 motion-reduce:transition-none",
    isActive ? "opacity-100" : "pointer-events-none opacity-0"
  ),
});

// All slides share one grid cell, so the cell always sizes to the tallest
// slide: switching slides never changes the block height, and the controls
// below never jump. On phones each slide's author sits right under its own
// quote, so the spare height of a short slide gathers at the bottom of the
// cell instead of above the author.
function QuoteStack({ testimonials, activeIndex }) {
  return (
    <div className="grid">
      {testimonials.map((t, i) => {
        const isActive = i === activeIndex;
        return (
          <div
            key={`v3-testimonial-slide-${i}`}
            {...slideProps(isActive, "col-start-1 row-start-1 flex flex-col")}
          >
            <blockquote
              data-tina-field={isActive ? tinaField(t, "quote") : undefined}
              className="text-2xl text-foreground md:text-4xl"
            >
              {isActive ? (
                <ClipTextReveal
                  key={activeIndex}
                  text={withQuoteMarks(t?.quote ?? "")}
                />
              ) : (
                <span>
                  {withQuoteMarks(t?.quote ?? "").replace(/\*\*/g, "")}
                </span>
              )}
            </blockquote>
            {/* Phones: the author follows its own quote. */}
            <SlideFade isActive={isActive} className="mt-10 xl:hidden">
              <Attribution testimonial={t} />
            </SlideFade>
          </div>
        );
      })}
    </div>
  );
}

// Fades a slide's content up when that slide becomes active (the switch from
// div to motion.div remounts it, so the fade replays). Inactive slides render
// the same content without the animation, so the stack still sizes to them.
function SlideFade({ isActive, className = "", children }) {
  return isActive ? (
    <motion.div {...fadeUp} className={className}>
      {children}
    </motion.div>
  ) : (
    <div className={className}>{children}</div>
  );
}

// Horizontal swipe on touch screens steps the carousel. Vertical scrolling is
// left alone: only a mostly-sideways drag of 50px or more counts.
function useSwipe(step: (by: number) => void) {
  const start = useRef<{ x: number; y: number } | null>(null);
  return {
    onTouchStart: (e: React.TouchEvent) => {
      const t = e.touches[0];
      start.current = { x: t.clientX, y: t.clientY };
    },
    onTouchEnd: (e: React.TouchEvent) => {
      if (!start.current) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - start.current.x;
      const dy = t.clientY - start.current.y;
      start.current = null;
      if (Math.abs(dx) >= 50 && Math.abs(dx) > Math.abs(dy)) {
        step(dx < 0 ? 1 : -1);
      }
    },
  };
}

// Default layout: quote top-left, attribution bottom-left, portrait top-right,
// arrows bottom-right. No case study: those belong to the case study layout,
// so a saved Case Study URL is ignored here. On phones the portrait sits
// above the quote and the attribution follows its quote, with the controls
// last.
function QuoteLayout({ testimonials, activeIndex, step, swipe }) {
  const current = testimonials[activeIndex];
  return (
    <div
      {...swipe}
      className={cn(
        "mx-auto flex max-w-xl flex-col gap-10",
        // Desktop: 2×2 grid. The top row is `1fr` so it absorbs the slack,
        // keeping the attribution (bottom-left) and controls (bottom-right)
        // on the same baseline whatever the quote length.
        "xl:grid xl:max-w-5xl xl:grid-cols-testimonial xl:grid-rows-testimonial xl:items-start xl:gap-x-12 xl:gap-y-4"
      )}
    >
      <div className="max-w-3xl xl:col-start-1 xl:row-start-1">
        <QuoteStack testimonials={testimonials} activeIndex={activeIndex} />
      </div>

      {/* Desktop: the author pins to the bottom row, level with the controls. */}
      <motion.div
        key={`author-${activeIndex}`}
        {...fadeUp}
        className="hidden xl:col-start-1 xl:row-start-2 xl:block xl:self-end"
      >
        <Attribution testimonial={current} />
      </motion.div>

      <Portrait
        testimonial={current}
        activeIndex={activeIndex}
        className="xl:col-start-2 xl:row-start-1"
      />

      {testimonials.length > 1 && (
        <Arrows
          noun="testimonial"
          step={step}
          className="justify-end xl:col-start-2 xl:row-start-2 xl:self-end"
        />
      )}
    </div>
  );
}

// The homepage Case Studies card, with the photo on top, the client logo on
// the photo, and the AI page's own card surface in dark mode (near-black with
// a fine edge). The whole card links to the case study. No photo, no logo:
// the logo lives on the photo.
function CaseStudyCard({ testimonial: t }) {
  // Without its own title the card is titled with the company name, so the
  // logo turns decorative rather than read the name out twice.
  const titledByCompany = !t?.caseStudyTitle;
  return (
    <ProjectCard
      imageFirst
      titleAs="h3"
      className="dark:border-sswBorder dark:bg-sswCard"
      logo={
        t?.companyLogo
          ? {
              src: t.companyLogo,
              alt: titledByCompany ? "" : (t?.companyLogoAlt ?? "Company logo"),
            }
          : null
      }
      project={{
        title: t?.caseStudyTitle || t?.companyLogoAlt,
        description: t?.caseStudyLabel,
        image: t?.caseStudyImage
          ? {
              imageSource: t.caseStudyImage,
              altText: t?.caseStudyImageAlt ?? "",
            }
          : null,
        link: t?.caseStudyUrl,
        newTab: true,
      }}
      tinaFields={{
        link: tinaField(t, "caseStudyUrl"),
        // The field the shown title comes from.
        title: tinaField(
          t,
          titledByCompany ? "companyLogoAlt" : "caseStudyTitle"
        ),
        description: tinaField(t, "caseStudyLabel"),
        image: tinaField(t, "caseStudyImage"),
        logo: tinaField(t, "companyLogo"),
      }}
    />
  );
}

// Desktop: the story (and the controls under it) sits right of the card, past
// the hairline, or spans the full width when there's no card. The transparent
// border matches the hairline's width, so text lines up with or without it.
const storyColumn = (besideCard: boolean) =>
  besideCard
    ? "xl:col-start-2 xl:ml-12 xl:border-l-0.75 xl:border-transparent xl:pl-12"
    : "xl:col-span-2 xl:col-start-1";

// The headline, then the quote on the section background, marked by the SSW
// red bar, with its author underneath.
function CaseStudyStory({ testimonial: t, isActive, hasControls }) {
  return (
    <div
      className={cn(
        "col-start-1 row-start-1 flex min-w-0 flex-col gap-8",
        // With controls, the rows spread to line the controls up with the
        // card's bottom. Without, the quote follows the headline and any
        // spare height gathers below it.
        hasControls && "xl:justify-between",
        storyColumn(Boolean(t?.caseStudyUrl))
      )}
    >
      {t?.caseStudyHeadline && (
        <SlideFade isActive={isActive}>
          <h2
            data-tina-field={tinaField(t, "caseStudyHeadline")}
            className="m-0 text-3xl text-foreground lg:text-4xl"
          >
            {t.caseStudyHeadline}
          </h2>
        </SlideFade>
      )}
      <SlideFade isActive={isActive}>
        <figure className="m-0 flex flex-col gap-6 border-l-2 border-sswRed pl-6">
          <blockquote
            data-tina-field={isActive ? tinaField(t, "quote") : undefined}
            className="m-0 max-w-3xl break-words text-xl leading-snug text-foreground xl:text-2xl xl:leading-snug"
          >
            <AlternatingText text={withQuoteMarks(t?.quote ?? "")} />
          </blockquote>
          <figcaption className="flex items-center gap-3">
            {t?.authorImage && (
              <Image
                src={t.authorImage}
                alt=""
                width={40}
                height={40}
                data-tina-field={tinaField(t, "authorImage")}
                className="size-10 shrink-0 rounded-full object-cover object-top"
              />
            )}
            <AuthorName testimonial={t} />
          </figcaption>
        </figure>
      </SlideFade>
      {/* Desktop: stands in for the controls row, which sits just below this
          column, so the spare height is shared equally between the headline,
          the quote and the controls. */}
      {hasControls && <div aria-hidden="true" className="hidden xl:block" />}
    </div>
  );
}

// Case study layout. Desktop: the case study card on the left; on the right,
// behind a hairline, the headline, the quote and its author, then the dots
// and arrows. The headline lines up with the card's top and the controls with
// its bottom. Phones: headline, quote, controls, then the card.
//
// Every slide is a subgrid laid over the same cells, so the rows size to the
// tallest slide: changing slide never changes the block height or moves the
// controls. The controls are shared, outside the slides.
function CaseStudyLayout({ testimonials, activeIndex, step, goTo, swipe }) {
  const hasControls = testimonials.length > 1;
  // The controls sit by the whole block, not the active slide, so a slide
  // without a case study doesn't move them.
  const anyCard = testimonials.some((t) => t?.caseStudyUrl);
  return (
    <div
      {...swipe}
      className="mx-auto grid max-w-xl grid-cols-1 gap-8 xl:max-w-6xl xl:grid-cols-testimonial-case-study xl:grid-rows-testimonial xl:gap-0"
    >
      {testimonials.map((t, i) => {
        const isActive = i === activeIndex;
        return (
          <div
            key={`v3-case-study-slide-${i}`}
            {...slideProps(
              isActive,
              cn(
                // Each span comes before its start: a span resets the start
                // in CSS, and cn() drops a start that comes before a span.
                hasControls ? "row-span-3" : "row-span-2",
                "col-start-1 row-start-1 grid grid-cols-subgrid grid-rows-subgrid xl:col-span-2 xl:col-start-1 xl:row-span-2 xl:row-start-1"
              )
            )}
          >
            <CaseStudyStory
              testimonial={t}
              isActive={isActive}
              hasControls={hasControls}
            />
            {t?.caseStudyUrl && (
              // Desktop: the hairline between the card and the story, beside
              // the controls too. It belongs to the slide, so it fades with
              // its card.
              <div
                aria-hidden="true"
                className="hidden xl:col-start-2 xl:row-span-2 xl:row-start-1 xl:ml-12 xl:block xl:border-l-0.75 xl:border-hairline"
              />
            )}
            {t?.caseStudyUrl && (
              <SlideFade
                isActive={isActive}
                className={cn(
                  "col-start-1 xl:row-span-2 xl:row-start-1",
                  hasControls ? "row-start-3" : "row-start-2"
                )}
              >
                <CaseStudyCard testimonial={t} />
              </SlideFade>
            )}
          </div>
        );
      })}

      {hasControls && (
        // After the slides, so it paints above them and takes the clicks.
        <div
          className={cn(
            "col-start-1 row-start-2 flex items-center justify-between gap-6",
            storyColumn(anyCard)
          )}
        >
          {/* The shared CarouselDots pills, as buttons. */}
          <div className="flex items-center gap-2">
            {testimonials.map((t, i) => (
              <button
                key={`v3-case-study-dot-${i}`}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show case study ${i + 1}${
                  t?.companyLogoAlt ? `: ${t.companyLogoAlt}` : ""
                }`}
                aria-current={i === activeIndex}
                className={cn(
                  "h-1.5 rounded-full bg-foreground transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground motion-reduce:transition-none",
                  i === activeIndex ? "w-6" : "w-3 opacity-30"
                )}
              />
            ))}
          </div>
          <Arrows noun="case study" step={step} />
        </div>
      )}
    </div>
  );
}

export function V3Testimonials({ data }) {
  const testimonials = data?.testimonials ?? [];
  const [active, setActive] = useState(0);

  // Guard against the stored index pointing past a shortened list while editing:
  // everything below reads `activeIndex`, never `active`, so removing the
  // selected slide falls back to the last one instead of hiding every quote.
  const activeIndex = Math.min(active, Math.max(testimonials.length - 1, 0));
  const step = (by: number) =>
    setActive((activeIndex + by + testimonials.length) % testimonials.length);
  const swipe = useSwipe(step);

  if (testimonials.length === 0) return null;

  const Layout =
    data?.layout === LAYOUT.caseStudy ? CaseStudyLayout : QuoteLayout;

  return (
    <MotionConfig reducedMotion="user">
      <V2ComponentWrapper data={data}>
        <Container size="custom" className="py-16 sm:px-8 md:py-32">
          <Layout
            testimonials={testimonials}
            activeIndex={activeIndex}
            step={step}
            goTo={setActive}
            swipe={testimonials.length > 1 ? swipe : undefined}
          />
        </Container>
      </V2ComponentWrapper>
    </MotionConfig>
  );
}
