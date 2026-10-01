"use client";
// PROTOTYPE (throwaway, branch prototype/testimonial-results-grid): Option C
// "Results" from the case study section prototype, shown on the AI consulting
// page. ?variant=a shows Option A (results grid) instead. The sector, headline
// and case study photos aren't Tina fields yet, so they live in this file.
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BiRightArrowAlt } from "react-icons/bi";
import { tinaField } from "tinacms/dist/react";
import { ProjectCard } from "../featuredProducts/featuredProducts";
import { ResultsGridPrototype } from "./testimonials.prototype-results-grid";

type Extra = {
  cardTitle: string;
  sector: string;
  headline: string;
  photo: string;
  focus?: string;
};

// Keyed by caseStudyUrl, as on the AI page's two testimonials.
const EXTRAS: Record<string, Extra> = {
  "/company/clients/fpe": {
    // The title the homepage's Case Studies block already uses.
    cardTitle: "AI Powered Navigation for French Payroll Expert",
    sector: "Payroll services · France",
    headline:
      "An AI chatbot that answers French payroll questions around the clock",
    photo: "/images/new-homepage-background-assets/fpe.png",
  },
  "https://www.ssw.com.au/company/clients/australian-payroll-association": {
    // The case study page's title, shortened to fit the card.
    cardTitle: "How APA Built a Compliant AI Payroll Agent",
    sector: "Payroll authority · Australia",
    headline:
      "Turning an off-the-shelf chatbot into a trustworthy payroll agent",
    photo: "/images/case-studies/apa-beryl.webp",
    focus: "20% 30%",
  },
};

const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
} as const;

function withQuoteMarks(text: string) {
  const trimmed = text
    .trim()
    .replace(/^["“”]+\s*/, "")
    .replace(/\s*["“”]+$/, "");
  return trimmed ? `“${trimmed}”` : "";
}

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

// The left card is the homepage Case Studies card (ProjectCard), with the
// photo on top like the homepage service cards: photo, title, short
// description, card arrow, and the whole card links to the case study.
function CaseStudyCard({ testimonial: t, extra }) {
  // The client logo sits bottom-left of the card's photo (signed off).
  const logo = t?.companyLogo
    ? { src: t.companyLogo, alt: t?.companyLogoAlt ?? "Company logo" }
    : null;
  return (
    <ProjectCard
      imageFirst
      logo={logo}
      // The AI page's own card surface (as on its stack cards): near-black
      // fill with a fine dark edge, so it reads as glass on the dark section.
      className="border-sswBorder dark:bg-sswCard"
      project={{
        title: extra?.cardTitle ?? t?.companyLogoAlt,
        description: t?.caseStudyLabel,
        image: extra?.photo ? { imageSource: extra.photo, altText: "" } : null,
        link: t?.caseStudyUrl,
        newTab: true,
      }}
    />
  );
}

function ResultsStoryPrototype({ testimonials }) {
  const [active, setActive] = useState(0);
  const index = Math.min(active, Math.max(testimonials.length - 1, 0));
  const t = testimonials[index];
  const extra = EXTRAS[t?.caseStudyUrl];
  const step = (by: number) =>
    setActive((index + by + testimonials.length) % testimonials.length);

  // Sideways swipe on touch screens; vertical scrolling is left alone.
  const start = useRef<{ x: number; y: number } | null>(null);
  const swipe =
    testimonials.length > 1
      ? {
          onTouchStart: (e: React.TouchEvent) => {
            start.current = {
              x: e.touches[0].clientX,
              y: e.touches[0].clientY,
            };
          },
          onTouchEnd: (e: React.TouchEvent) => {
            if (!start.current) return;
            const dx = e.changedTouches[0].clientX - start.current.x;
            const dy = e.changedTouches[0].clientY - start.current.y;
            start.current = null;
            if (Math.abs(dx) >= 50 && Math.abs(dx) > Math.abs(dy))
              step(dx < 0 ? 1 : -1);
          },
        }
      : {};

  return (
    <div
      {...swipe}
      className="mx-auto flex max-w-xl flex-col gap-8 xl:grid xl:max-w-6xl xl:grid-cols-[22rem_minmax(0,1fr)] xl:items-stretch xl:gap-0"
    >
      {/* Phones: headline, quote, controls (order-1), then the card (order-2). */}
      <motion.div
        key={`client-${index}`}
        {...fadeUp}
        className="order-2 xl:order-none"
      >
        <CaseStudyCard testimonial={t} extra={extra} />
      </motion.div>

      {/* Three rows: heading, quote, controls. One gap between them; on
          desktop the column stretches to the card's height and the spare room
          is shared equally between the rows (gap-8 is the minimum). On phones
          the column dissolves (`contents`) so its rows can sit either side of
          the card in the outer stack. */}
      <div className="contents xl:ml-12 xl:flex xl:min-w-0 xl:flex-col xl:justify-between xl:gap-8 xl:border-l-0.75 xl:border-hairline xl:pl-12">
        <motion.h2
          key={`headline-${index}`}
          {...fadeUp}
          className="m-0 text-3xl text-foreground lg:text-4xl"
        >
          {extra?.headline}
        </motion.h2>
        <motion.div key={`quote-${index}`} {...fadeUp}>
          {/* The quote on the section background, marked by the SSW red bar. */}
          <figure className="m-0 flex flex-col gap-6 border-l-2 border-sswRed pl-6">
            <blockquote
              className="m-0 max-w-3xl text-xl leading-snug text-foreground xl:text-2xl xl:leading-snug"
              data-tina-field={tinaField(t, "quote")}
            >
              <Emphasis text={withQuoteMarks(t?.quote ?? "")} />
            </blockquote>
            <figcaption className="flex items-center gap-3">
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
                <span className="font-semibold text-foreground">
                  {t?.authorName}
                </span>
                <span className="text-sm text-muted-foreground">
                  {t?.authorTitle}
                </span>
              </div>
            </figcaption>
          </figure>
        </motion.div>
        {testimonials.length > 1 && (
          // Dots on the left, arrows on the right, on one row. The dots match
          // the site's shared CarouselDots pills.
          <div className="order-1 flex items-center justify-between gap-6 xl:order-none">
            <div className="flex items-center gap-2">
              {testimonials.map((d, i) => (
                <button
                  key={`case-study-dot-${i}`}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Show case study ${i + 1}${d?.companyLogoAlt ? `: ${d.companyLogoAlt}` : ""}`}
                  aria-current={i === index}
                  className={cn(
                    "h-1.5 rounded-full bg-foreground transition-all duration-300",
                    i === index ? "w-6" : "w-3 opacity-30"
                  )}
                />
              ))}
            </div>
            <div className="flex gap-3">
              <ArrowButton
                label="Previous case study"
                onClick={() => step(-1)}
                flip
              />
              <ArrowButton label="Next case study" onClick={() => step(1)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// PROTOTYPE switch: Option C by default, ?variant=a for Option A.
export function CaseStudyPrototype({ testimonials }) {
  const [variant, setVariant] = useState("c");
  useEffect(() => {
    const v = new URLSearchParams(window.location.search).get("variant");
    if (v) setVariant(v.toLowerCase());
  }, []);
  return variant === "a" ? (
    <ResultsGridPrototype testimonials={testimonials} />
  ) : (
    <ResultsStoryPrototype testimonials={testimonials} />
  );
}
