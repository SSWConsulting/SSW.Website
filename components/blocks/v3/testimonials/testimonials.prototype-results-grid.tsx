"use client";
// PROTOTYPE (throwaway, branch prototype/testimonial-results-grid): Option A
// "Results grid" from the case study section prototype, shown on the AI
// consulting page in place of the case study layout so it can be judged in
// context. The heading, highlight numbers and case study photos aren't Tina
// fields yet, so they live in this file. Rebuild properly once approved.
import AlternatingText from "@/components/alternating-text";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BiRightArrowAlt } from "react-icons/bi";
import { tinaField } from "tinacms/dist/react";
import { ArrowCircle } from "../shared/arrowCircle";

type Extra = { value: string; caption: string; photo: string; focus?: string };

// Keyed by caseStudyUrl, as on the AI page's two testimonials.
const EXTRAS: Record<string, Extra> = {
  "/company/clients/fpe": {
    value: "24/7",
    caption: "Answers on French payroll law, in any language",
    photo: "/images/new-homepage-background-assets/fpe.png",
  },
  "https://www.ssw.com.au/company/clients/australian-payroll-association": {
    value: "50%",
    caption: "Cut in answer errors on complex payroll questions",
    photo: "/images/case-studies/apa-beryl.webp",
    focus: "20% 30%",
  },
};

function withQuoteMarks(text: string) {
  const trimmed = text
    .trim()
    .replace(/^["“”]+\s*/, "")
    .replace(/\s*["“”]+$/, "");
  return trimmed ? `“${trimmed}”` : "";
}

// **red** emphasis, same convention as the rest of the block.
function Emphasis({ text }: { text: string }) {
  return (
    <>
      {text
        .split(/(\*\*.*?\*\*)/g)
        .filter(Boolean)
        .map((seg, i) => {
          const m = seg.match(/^\*\*(.*)\*\*$/);
          return m ? (
            <span key={i} className="text-sswRed">
              {m[1]}
            </span>
          ) : (
            <span key={i}>{seg}</span>
          );
        })}
    </>
  );
}

// Hover reveals the quote on a mouse; touch screens tap to reveal instead.
function useCanHover() {
  const [canHover, setCanHover] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover)");
    const sync = () => setCanHover(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return canHover;
}

// The result leaves fast and the quote rises in just after (and the reverse on
// the way back), so the two never overlap.
const LEAVE = "duration-150 delay-0 ease-in";
const ENTER = "duration-500 delay-150 ease-out";

function ResultCard({ testimonial: t, open, onToggle, canHover }) {
  const extra = EXTRAS[t?.caseStudyUrl];
  const photo = extra?.photo;
  const label = `Read the ${t?.companyLogoAlt ?? "client"} case study`;
  const revealFront = canHover
    ? "group-hover:-translate-y-2.5 group-hover:opacity-0 group-hover:duration-150 group-hover:delay-0 group-hover:ease-in group-has-[a:focus-visible]:-translate-y-2.5 group-has-[a:focus-visible]:opacity-0"
    : open && cn("-translate-y-2.5 opacity-0", LEAVE);
  const revealBack = canHover
    ? "group-hover:translate-y-0 group-hover:opacity-100 group-hover:duration-500 group-hover:delay-150 group-hover:ease-out group-has-[a:focus-visible]:translate-y-0 group-has-[a:focus-visible]:opacity-100"
    : open && cn("translate-y-0 opacity-100", ENTER);

  return (
    <article
      className={cn(
        "group relative isolate flex min-h-[26.25rem] w-[86%] shrink-0 snap-start flex-col justify-between gap-6 overflow-hidden rounded-card p-6 xl:min-h-[32.5rem] xl:w-[calc(50%-0.5rem)] xl:p-8",
        photo
          ? "bg-black text-white"
          : "border-0.75 border-hairline bg-card text-foreground transition-colors duration-300 hover:bg-card-hover"
      )}
    >
      {photo && (
        <>
          <Image
            src={photo}
            alt=""
            fill
            sizes="(min-width: 1280px) 50vw, 86vw"
            className="-z-20 object-cover"
            style={{ objectPosition: extra.focus ?? "center top" }}
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/30 to-black/70" />
          <div
            className={cn(
              "absolute inset-0 -z-10 bg-black/60 opacity-0 transition-opacity duration-500",
              canHover
                ? "group-hover:opacity-100 group-has-[a:focus-visible]:opacity-100"
                : open && "opacity-100"
            )}
          />
        </>
      )}

      {t?.companyLogo && (
        <Image
          src={t.companyLogo}
          alt={t?.companyLogoAlt ?? "Company logo"}
          width={160}
          height={160}
          className={cn(
            "h-9 w-auto max-w-44 object-contain object-left brightness-0",
            photo ? "invert" : "dark:invert"
          )}
          data-tina-field={tinaField(t, "companyLogo")}
        />
      )}

      <div className="flex items-end justify-between gap-4">
        <div className="grid min-w-0 items-end">
          {/* Front: the result */}
          <div
            className={cn(
              "col-start-1 row-start-1 flex flex-col gap-2 transition",
              ENTER,
              revealFront
            )}
          >
            <span className="text-6xl font-semibold leading-none tracking-tighter xl:text-8xl">
              {extra?.value}
            </span>
            <p
              className={cn(
                "max-w-80 text-lg leading-snug xl:text-xl",
                photo ? "text-white/80" : "text-muted-foreground"
              )}
            >
              {extra?.caption}
            </p>
          </div>
          {/* Back: the quote and its author */}
          <div
            className={cn(
              "pointer-events-none col-start-1 row-start-1 flex translate-y-2.5 flex-col gap-5 opacity-0 transition",
              LEAVE,
              revealBack
            )}
          >
            <blockquote
              className="text-lg leading-normal xl:text-2xl xl:leading-snug"
              data-tina-field={tinaField(t, "quote")}
            >
              <Emphasis text={withQuoteMarks(t?.quote ?? "")} />
            </blockquote>
            <div className="flex items-center gap-3">
              {t?.authorImage && (
                <Image
                  src={t.authorImage}
                  alt=""
                  width={40}
                  height={40}
                  className="size-10 shrink-0 rounded-full object-cover object-top"
                />
              )}
              <div className="flex min-w-0 flex-col">
                <span className="text-sm font-semibold">{t?.authorName}</span>
                <span
                  className={cn(
                    "text-sm",
                    photo ? "text-white/80" : "text-muted-foreground"
                  )}
                >
                  {t?.authorTitle}
                </span>
              </div>
            </div>
          </div>
        </div>

        {canHover ? (
          <ArrowCircle
            className={cn("size-10 p-2", photo && "bg-white text-black")}
            iconClassName="size-4"
          />
        ) : (
          // Phones: only the arrow opens the case study.
          <a
            href={t?.caseStudyUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="unstyled relative z-20 rounded-full"
          >
            <ArrowCircle
              className={cn("size-10 p-2", photo && "bg-white text-black")}
              iconClassName="size-4"
            />
          </a>
        )}
      </div>

      {canHover ? (
        <a
          href={t?.caseStudyUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          data-tina-field={tinaField(t, "caseStudyUrl")}
          className="unstyled absolute inset-0 z-10 rounded-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
        />
      ) : (
        // Phones: tapping the card shows or hides the quote.
        <button
          type="button"
          aria-expanded={open}
          aria-label={`Show what ${t?.authorName ?? "the client"} said`}
          onClick={onToggle}
          className="absolute inset-0 z-10 rounded-card"
        />
      )}
    </article>
  );
}

function ArrowButton({ label, onClick, flip = false }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex size-10 items-center justify-center rounded-full bg-foreground text-background transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground xl:size-12"
    >
      <BiRightArrowAlt
        className={cn("size-5 xl:size-6", flip && "-scale-x-100")}
      />
    </button>
  );
}

export function ResultsGridPrototype({ testimonials }) {
  const canHover = useCanHover();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const [overflows, setOverflows] = useState(false);

  // Arrows only when there are more cards than fit.
  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const sync = () => setOverflows(row.scrollWidth > row.clientWidth + 1);
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(row);
    return () => ro.disconnect();
  }, [testimonials.length]);

  // A page of cards per click, wrapping at either end.
  const scroll = (dir: number) => {
    const row = rowRef.current;
    const card = row?.firstElementChild as HTMLElement | null;
    if (!row || !card) return;
    const gap = parseFloat(getComputedStyle(row).columnGap) || 0;
    const perPage = Math.max(
      1,
      Math.round((row.clientWidth + gap) / (card.offsetWidth + gap))
    );
    const max = row.scrollWidth - row.clientWidth;
    let left = row.scrollLeft + dir * perPage * (card.offsetWidth + gap);
    if (dir > 0 && row.scrollLeft >= max - 2) left = 0;
    else if (dir < 0 && row.scrollLeft <= 2) left = max;
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;
    row.scrollTo({ left, behavior: smooth ? "smooth" : "auto" });
  };

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8 flex items-end justify-between gap-6 xl:mb-12">
        <div>
          <span className="font-mono text-sm uppercase tracking-wider text-sswRed">
            Client results
          </span>
          <h2 className="mb-0 mt-4 text-3xl text-foreground lg:text-4xl">
            <AlternatingText text="Results from **real AI projects**" />
          </h2>
        </div>
        {overflows && (
          <div className="flex shrink-0 gap-3">
            <ArrowButton
              label="Previous case studies"
              onClick={() => scroll(-1)}
              flip
            />
            <ArrowButton label="Next case studies" onClick={() => scroll(1)} />
          </div>
        )}
      </div>
      <div
        ref={rowRef}
        className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 [scrollbar-width:none] sm:-mx-8 sm:scroll-px-8 sm:px-8 xl:mx-0 xl:scroll-px-0 xl:gap-4 xl:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {testimonials.map((t, i) => (
          <ResultCard
            key={`result-card-${i}`}
            testimonial={t}
            canHover={canHover}
            open={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>
    </div>
  );
}
