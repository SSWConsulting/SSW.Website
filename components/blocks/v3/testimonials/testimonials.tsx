"use client";
import V2ComponentWrapper from "@/components/layout/v2ComponentWrapper";
import { Container } from "@/components/util/container";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
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
            className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom"
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
        <div className="mx-auto flex max-w-3xl flex-col items-start justify-center gap-10 xl:max-w-none xl:flex-row xl:items-center xl:gap-20">
          {/* Quote + author */}
          <div className="flex max-w-3xl flex-col">
            {current?.quote && (
              <blockquote
                data-tina-field={tinaField(current, "quote")}
                className="text-2xl text-white md:text-4xl"
              >
                <ClipTextReveal key={active} text={current.quote} />
              </blockquote>
            )}

            <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex items-center gap-4"
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

              {/* Carousel controls */}
              {testimonials.length > 1 && (
                <div className="flex w-full justify-end gap-3 md:w-auto">
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
          </div>

          {/* Author image */}
          {current?.authorImage && (
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative order-first size-48 shrink-0 overflow-hidden rounded-2xl xl:order-none"
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
        </div>
      </Container>
    </V2ComponentWrapper>
  );
}
