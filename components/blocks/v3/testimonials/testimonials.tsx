"use client";
import V2ComponentWrapper from "@/components/layout/v2ComponentWrapper";
import { Container } from "@/components/util/container";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import { TiArrowRight } from "react-icons/ti";
import { tinaField } from "tinacms/dist/react";

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
    <span aria-label={text.replace(/\*\*/g, "")}>
      {tokens.map((tok, ti) => {
        if (tok.space) return <span key={`sp-${ti}`}> </span>;
        const i = ++wordIndex;
        return (
          <span
            key={`w-${ti}`}
            ref={(el) => {
              wordRefs.current[i] = el;
            }}
            aria-hidden
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
  );
}

export function V3Testimonials({ data }) {
  const testimonials = data?.testimonials ?? [];
  const [active, setActive] = useState(0);

  if (testimonials.length === 0) return null;

  // Guard against the active index pointing past a shortened list while editing.
  const current = testimonials[Math.min(active, testimonials.length - 1)];

  const goPrev = () =>
    setActive((i) => (i - 1 + testimonials.length) % testimonials.length);
  const goNext = () => setActive((i) => (i + 1) % testimonials.length);

  return (
    <V2ComponentWrapper data={data}>
      <Container size="custom" className="py-16 sm:px-8 md:py-32">
        <div
          className={cn(
            "mx-auto flex max-w-xl flex-col gap-10",
            // Desktop: 2×2 grid — quote/image on top, author/buttons pinned to
            // the bottom row. The top row is `1fr` so it absorbs the slack,
            // keeping the author (bottom-left) and controls (bottom-right) on
            // the same baseline regardless of quote length. Cap the width
            // (centred via mx-auto) so the image sits beside the quote instead
            // of being flung to the far edge of a full-width section.
            "xl:grid xl:max-w-5xl xl:grid-cols-[minmax(0,1fr)_auto] xl:grid-rows-[1fr_auto] xl:items-start xl:gap-x-12 xl:gap-y-4"
          )}
        >
          {/* Quote (+ optional case study) — top-left */}
          <div className="flex max-w-3xl flex-col xl:col-start-1 xl:row-start-1">
            {/* All quotes share one grid cell so the cell always sizes to the
                tallest quote — switching slides never changes the block height
                (only the active quote is visible; the rest fade to opacity-0). */}
            <div className="grid">
              {testimonials.map((t, i) => (
                <blockquote
                  key={`v3-testimonial-quote-${i}`}
                  aria-hidden={i !== active}
                  data-tina-field={
                    i === active ? tinaField(t, "quote") : undefined
                  }
                  className={cn(
                    "col-start-1 row-start-1 text-2xl text-white transition-opacity duration-300 md:text-4xl",
                    i === active
                      ? "opacity-100"
                      : "pointer-events-none opacity-0"
                  )}
                >
                  {i === active ? (
                    <ClipTextReveal key={active} text={t?.quote ?? ""} />
                  ) : (
                    <span>{(t?.quote ?? "").replace(/\*\*/g, "")}</span>
                  )}
                </blockquote>
              ))}
            </div>

            {current?.caseStudyUrl && (
              <motion.a
                key={`case-study-${active}`}
                href={current.caseStudyUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-tina-field={tinaField(current, "caseStudyUrl")}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group mt-6 inline-flex items-center gap-1 text-sm font-semibold uppercase tracking-wide text-white transition hover:text-sswRed"
              >
                See Case Study
                <TiArrowRight className="size-5 transition group-hover:translate-x-1" />
              </motion.a>
            )}
          </div>

          {/* Author image — top-right */}
          {current?.authorImage && (
            <motion.div
              key={`author-image-${active}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative order-first size-48 shrink-0 overflow-hidden rounded-card xl:order-none xl:col-start-2 xl:row-start-1 xl:self-start"
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
          )}

          {/* Author name / role / logo — bottom-left */}
          <motion.div
            key={`author-${active}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-4 xl:col-start-1 xl:row-start-2 xl:self-end"
          >
            <div className="flex flex-col">
              {current?.authorName && (
                <span
                  data-tina-field={tinaField(current, "authorName")}
                  className="font-semibold text-white"
                >
                  {current.authorName}
                </span>
              )}
              {current?.authorTitle && (
                <span
                  data-tina-field={tinaField(current, "authorTitle")}
                  className="text-sm text-gray-400"
                >
                  {current.authorTitle}
                </span>
              )}
            </div>

            {current?.companyLogo && (
              <>
                <span className="h-10 w-px bg-gray-600" />
                <Image
                  src={current.companyLogo}
                  alt={current?.companyLogoAlt ?? "Company logo"}
                  width={160}
                  height={160}
                  className="h-12 w-auto object-contain brightness-0 invert"
                  data-tina-field={tinaField(current, "companyLogo")}
                />
              </>
            )}
          </motion.div>

          {/* Carousel controls — bottom-right, under the image */}
          {testimonials.length > 1 && (
            <div className="mt-6 flex justify-end gap-3 xl:col-start-2 xl:row-start-2 xl:mt-0 xl:place-self-end">
              <button
                type="button"
                aria-label="Previous testimonial"
                onClick={goPrev}
                className="flex size-12 items-center justify-center rounded-full bg-white text-black transition hover:bg-gray-200"
              >
                <BiLeftArrowAlt className="size-6" />
              </button>
              <button
                type="button"
                aria-label="Next testimonial"
                onClick={goNext}
                className="flex size-12 items-center justify-center rounded-full bg-white text-black transition hover:bg-gray-200"
              >
                <BiRightArrowAlt className="size-6" />
              </button>
            </div>
          )}
        </div>
      </Container>
    </V2ComponentWrapper>
  );
}
