"use client";
import RippleButton from "@/components/button/rippleButtonV2";
import V2ComponentWrapper from "@/components/layout/v2ComponentWrapper";
import { Container } from "@/components/util/container";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { tinaField } from "tinacms/dist/react";

// How long each testimonial stays on screen before the carousel advances.
const AUTOPLAY_MS = 8000;

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

// Author headshot + name + role + client logo. Sits above the quote (mobile and
// desktop alike), so the reader knows who is speaking before they read it.
function AuthorRow({ testimonial }) {
  return (
    <div className="flex items-center gap-4">
      {testimonial?.authorImage && (
        <div className="relative size-14 shrink-0 overflow-hidden rounded-utility md:size-16">
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

      <div className="flex min-w-0 flex-col">
        {testimonial?.authorName && (
          <span
            data-tina-field={tinaField(testimonial, "authorName")}
            className="text-lg font-semibold text-foreground"
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
          {/* Pushed to the row's far end on mobile, where the design keeps the
              logo against the right edge; on wider screens it tucks in beside
              the name behind a hairline divider. */}
          <span className="ml-auto h-10 w-px bg-hairline max-md:hidden md:ml-2" />
          <Image
            src={testimonial.companyLogo}
            alt={testimonial?.companyLogoAlt ?? "Company logo"}
            width={160}
            height={160}
            className="h-12 w-auto shrink-0 object-contain brightness-0 max-md:ml-auto dark:invert"
            data-tina-field={tinaField(testimonial, "companyLogo")}
          />
        </>
      )}
    </div>
  );
}

export function V3Testimonials({ data }) {
  const testimonials = data?.testimonials ?? [];
  const [active, setActive] = useState(0);
  // Autoplay holds while a reader is hovering or tabbing through the block.
  const [paused, setPaused] = useState(false);

  // Advance on a timer, so the second testimonial is seen without any controls
  // being touched. `active` is a dependency so picking a dot restarts the clock
  // instead of cutting the newly chosen quote short.
  useEffect(() => {
    if (testimonials.length <= 1 || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = setTimeout(
      () => setActive((i) => (i + 1) % testimonials.length),
      AUTOPLAY_MS
    );
    return () => clearTimeout(timer);
  }, [active, paused, testimonials.length]);

  if (testimonials.length === 0) return null;

  // Guard against the stored index pointing past a shortened list while editing:
  // everything below reads `activeIndex`, never `active`, so removing the
  // selected slide falls back to the last one instead of hiding every quote.
  const activeIndex = Math.min(active, testimonials.length - 1);
  const current = testimonials[activeIndex];

  return (
    <V2ComponentWrapper data={data}>
      <Container size="custom" className="py-16 sm:px-8 md:py-32">
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          className={cn(
            "mx-auto flex max-w-xl flex-col gap-8",
            // Desktop: quote on the left, case study CTA on the right. The
            // right column is capped so a long sentence wraps to two lines
            // (as designed) instead of stretching across the section.
            "xl:grid xl:max-w-6xl xl:grid-cols-testimonial xl:items-start xl:gap-x-16"
          )}
        >
          {/* Author + quote — left column */}
          <div className="flex flex-col xl:col-start-1">
            <motion.div
              key={`author-${activeIndex}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <AuthorRow testimonial={current} />
            </motion.div>

            {/* All quotes share one grid cell so the cell always sizes to the
                tallest quote — switching slides never changes the block height
                (only the active quote is visible; the rest fade to opacity-0). */}
            <div className="mt-8 grid">
              {testimonials.map((t, i) => (
                <blockquote
                  key={`v3-testimonial-quote-${i}`}
                  aria-hidden={i !== activeIndex}
                  data-tina-field={
                    i === activeIndex ? tinaField(t, "quote") : undefined
                  }
                  className={cn(
                    "col-start-1 row-start-1 text-2xl text-foreground transition-opacity duration-300 md:text-4xl",
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
          </div>

          {/* Case study CTA — right column on desktop, below the quote on mobile */}
          {current?.caseStudyUrl && (
            <motion.div
              key={`case-study-${activeIndex}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
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
                <BsArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
              </RippleButton>
            </motion.div>
          )}

          {/* Slide picker — under the quote on desktop, last on mobile so the
              CTA still follows the quote it belongs to. */}
          {testimonials.length > 1 && (
            <div className="flex items-center gap-2 xl:col-start-1 xl:row-start-2 xl:mt-8">
              {testimonials.map((t, i) => (
                <button
                  key={`v3-testimonial-dot-${i}`}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Show testimonial ${i + 1}${
                    t?.authorName ? `: ${t.authorName}` : ""
                  }`}
                  aria-current={i === activeIndex}
                  className={cn(
                    "h-1.5 rounded-full bg-foreground transition-all duration-300",
                    i === activeIndex ? "w-6" : "w-3 opacity-30"
                  )}
                />
              ))}
            </div>
          )}
        </div>
      </Container>
    </V2ComponentWrapper>
  );
}
