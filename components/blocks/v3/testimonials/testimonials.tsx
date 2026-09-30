"use client";
import RippleButton from "@/components/button/rippleButtonV2";
import V2ComponentWrapper from "@/components/layout/v2ComponentWrapper";
import { Container } from "@/components/util/container";
import { cn } from "@/lib/utils";
import { MotionConfig, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import { TiArrowRight } from "react-icons/ti";
import { tinaField } from "tinacms/dist/react";

// Each slide's author, portrait and CTA fade up together when the slide changes.
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

// Name + role + client logo, under the quote. The headshot joins the row only
// when the case study CTA has taken the portrait's place beside the quote.
function Attribution({ testimonial, showAvatar }) {
  const hasAvatar = showAvatar && Boolean(testimonial?.authorImage);

  return (
    <div
      className={cn(
        "flex items-center gap-4",
        // A headshot, name and logo don't fit one line on a phone, so the
        // logo drops to its own line beneath them.
        hasAvatar && "max-md:flex-wrap"
      )}
    >
      {hasAvatar && (
        <div className="relative size-14 shrink-0 overflow-hidden rounded-utility">
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
        </div>
      )}

      <div
        className={cn("flex min-w-0 flex-col", hasAvatar && "max-md:flex-1")}
      >
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

      {testimonial?.companyLogo && (
        <>
          <span
            className={cn(
              "h-10 w-px shrink-0 bg-hairline",
              hasAvatar && "max-md:hidden"
            )}
          />
          <div className={cn("shrink-0", hasAvatar && "max-md:basis-full")}>
            {/* Wide wordmarks are capped on phones so they can't crowd the name. */}
            <Image
              src={testimonial.companyLogo}
              alt={testimonial?.companyLogoAlt ?? "Company logo"}
              width={160}
              height={160}
              className="h-12 w-auto object-contain object-left brightness-0 max-md:max-w-28 dark:invert"
              data-tina-field={tinaField(testimonial, "companyLogo")}
            />
          </div>
        </>
      )}
    </div>
  );
}

function ArrowButton({ label, onClick, children }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex size-12 items-center justify-center rounded-full bg-foreground text-background transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground motion-reduce:transition-none"
    >
      {children}
    </button>
  );
}

// Two layouts share one frame so they read as the same component: quote
// top-left, attribution bottom-left, arrows bottom-right. Only the top-right
// cell changes — the author's portrait by default, or the case study CTA when
// the block's layout is "caseStudy" (slides without a case study keep the
// portrait, so the cell is never left empty).
export function V3Testimonials({ data }) {
  const testimonials = data?.testimonials ?? [];
  const [active, setActive] = useState(0);

  if (testimonials.length === 0) return null;

  // Guard against the stored index pointing past a shortened list while editing:
  // everything below reads `activeIndex`, never `active`, so removing the
  // selected slide falls back to the last one instead of hiding every quote.
  const activeIndex = Math.min(active, testimonials.length - 1);
  const current = testimonials[activeIndex];

  const isCaseStudyLayout = data?.layout === "caseStudy";
  const showCta = isCaseStudyLayout && Boolean(current?.caseStudyUrl);

  const step = (by: number) =>
    setActive((activeIndex + by + testimonials.length) % testimonials.length);

  return (
    <MotionConfig reducedMotion="user">
      <V2ComponentWrapper data={data}>
        <Container size="custom" className="py-16 sm:px-8 md:py-32">
          <div
            className={cn(
              "mx-auto flex max-w-xl flex-col gap-10",
              // Desktop: 2×2 grid. The top row is `1fr` so it absorbs the
              // slack, keeping the attribution (bottom-left) and arrows
              // (bottom-right) on the same baseline whatever the quote length.
              // The case study layout is wider by exactly its wider right
              // column, so the quote keeps the same measure in both layouts.
              // The portrait holds the top row open under a short quote; the
              // CTA is shorter, so a larger row gap keeps the attribution clear.
              "xl:grid xl:grid-rows-testimonial xl:items-start xl:gap-x-12",
              isCaseStudyLayout
                ? "xl:max-w-6xl xl:grid-cols-testimonial-case-study xl:gap-y-10"
                : "xl:max-w-5xl xl:grid-cols-testimonial xl:gap-y-4"
            )}
          >
            {/* Quote (+ case study link when there's no CTA column) — top-left */}
            <div className="flex max-w-3xl flex-col xl:col-start-1 xl:row-start-1">
              {/* All quotes share one grid cell so the cell always sizes to the
                  tallest quote — switching slides never changes the block height
                  (only the active quote is visible; the rest fade to opacity-0). */}
              <div className="grid">
                {testimonials.map((t, i) => (
                  <blockquote
                    key={`v3-testimonial-quote-${i}`}
                    aria-hidden={i !== activeIndex}
                    data-tina-field={
                      i === activeIndex ? tinaField(t, "quote") : undefined
                    }
                    className={cn(
                      "col-start-1 row-start-1 text-2xl text-foreground transition-opacity duration-300 motion-reduce:transition-none md:text-4xl",
                      i === activeIndex
                        ? "opacity-100"
                        : "pointer-events-none opacity-0"
                    )}
                  >
                    {i === activeIndex ? (
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
                ))}
              </div>

              {current?.caseStudyUrl && !showCta && (
                <motion.a
                  key={`case-study-link-${activeIndex}`}
                  {...fadeUp}
                  href={current.caseStudyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-tina-field={tinaField(current, "caseStudyUrl")}
                  className="group mt-6 inline-flex items-center gap-1 self-start text-sm font-semibold uppercase tracking-wide text-foreground transition hover:text-sswRed"
                >
                  See Case Study
                  <TiArrowRight className="size-5 transition group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
                </motion.a>
              )}
            </div>

            {/* Attribution — bottom-left */}
            <motion.div
              key={`author-${activeIndex}`}
              {...fadeUp}
              className="xl:col-start-1 xl:row-start-2 xl:self-end"
            >
              <Attribution testimonial={current} showAvatar={showCta} />
            </motion.div>

            {/* Top-right: case study CTA, or the author's portrait */}
            {showCta ? (
              <motion.div
                key={`case-study-${activeIndex}`}
                {...fadeUp}
                className="flex flex-col items-start gap-6 xl:col-start-2 xl:row-start-1"
              >
                {current?.caseStudyLabel && (
                  <p
                    data-tina-field={tinaField(current, "caseStudyLabel")}
                    className="text-lg font-medium text-foreground"
                  >
                    {current.caseStudyLabel}
                  </p>
                )}
                <RippleButton
                  variant="primary"
                  href={current.caseStudyUrl}
                  target="_blank"
                  data-tina-field={tinaField(current, "caseStudyUrl")}
                  className="group inline-flex w-full rounded-full px-8 py-4 sm:w-auto"
                  fontClassName="gap-3 text-sm font-semibold uppercase tracking-wider"
                >
                  <span
                    data-tina-field={tinaField(current, "caseStudyButtonText")}
                  >
                    {current.caseStudyButtonText || "Explore the case study"}
                  </span>
                  <BsArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
                </RippleButton>
              </motion.div>
            ) : (
              current?.authorImage && (
                <motion.div
                  key={`author-image-${activeIndex}`}
                  {...fadeUp}
                  className="relative order-first size-48 shrink-0 overflow-hidden rounded-card xl:order-none xl:col-start-2 xl:row-start-1"
                >
                  <Image
                    src={current.authorImage}
                    alt={
                      current?.authorImageAlt ??
                      current?.authorName ??
                      "Testimonial author"
                    }
                    fill
                    className="object-cover"
                    data-tina-field={tinaField(current, "authorImage")}
                  />
                </motion.div>
              )
            )}

            {/* Arrows — bottom-right */}
            {testimonials.length > 1 && (
              <div className="flex justify-end gap-3 xl:col-start-2 xl:row-start-2 xl:place-self-end">
                <ArrowButton
                  label="Previous testimonial"
                  onClick={() => step(-1)}
                >
                  <BiLeftArrowAlt className="size-6" />
                </ArrowButton>
                <ArrowButton label="Next testimonial" onClick={() => step(1)}>
                  <BiRightArrowAlt className="size-6" />
                </ArrowButton>
              </div>
            )}
          </div>
        </Container>
      </V2ComponentWrapper>
    </MotionConfig>
  );
}
