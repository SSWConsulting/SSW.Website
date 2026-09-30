"use client";
// PROTOTYPE — throwaway. Three options for the testimonial "Quote & case study"
// layout, switchable with ?variant=A|B|C on any page using that layout (e.g.
// /consulting/artificial-intelligence). ?variant=now (or none) shows what's on
// the PR. The switcher bar only renders outside production. Delete this file
// and its three hook-in lines in testimonials.tsx once an option is chosen.
import RippleButton from "@/components/button/rippleButtonV2";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import {
  ArrowButton,
  Attribution,
  AuthorPhoto,
  ClipTextReveal,
  withQuoteMarks,
} from "./testimonials";

const VARIANTS = [
  { key: "now", name: "On the PR now" },
  { key: "D-m1", name: "D · phone: arrows under the author" },
  { key: "D-m2", name: "D · phone: swipe + dots" },
  { key: "D-m3", name: "D · phone: peek carousel" },
  { key: "D-nophoto", name: "D · edge case: no headshot" },
  // Earlier rounds, kept for the record (not in the bar's cycle order):
  { key: "A", name: "Logo moves into the case study" },
  { key: "B", name: "Default layout + case study strip" },
  { key: "C", name: "Photo card" },
] as const;
type VariantKey = (typeof VARIANTS)[number]["key"];

const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] },
} as const;

const readVariant = (): VariantKey => {
  const v = new URLSearchParams(window.location.search).get("variant");
  return (VARIANTS.find((x) => x.key === v)?.key ?? "now") as VariantKey;
};

export function useCaseStudyPrototypeVariant(): VariantKey {
  const [variant, setVariant] = useState<VariantKey>("now");
  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;
    const sync = () => setVariant(readVariant());
    sync();
    window.addEventListener("prototype-variant", sync);
    window.addEventListener("popstate", sync);
    return () => {
      window.removeEventListener("prototype-variant", sync);
      window.removeEventListener("popstate", sync);
    };
  }, []);
  return variant;
}

export function PrototypeSwitcher() {
  const variant = useCaseStudyPrototypeVariant();
  const go = useCallback(
    (by: number) => {
      const i = VARIANTS.findIndex((v) => v.key === variant);
      const next = VARIANTS[(i + by + VARIANTS.length) % VARIANTS.length].key;
      const url = new URL(window.location.href);
      url.searchParams.set("variant", next);
      window.history.replaceState(null, "", url);
      window.dispatchEvent(new Event("prototype-variant"));
    },
    [variant]
  );

  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;
    const onKey = (e: KeyboardEvent) => {
      const el = document.activeElement as HTMLElement | null;
      if (
        el &&
        (el.tagName === "INPUT" ||
          el.tagName === "TEXTAREA" ||
          el.isContentEditable)
      )
        return;
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  if (process.env.NODE_ENV === "production") return null;
  const current = VARIANTS.find((v) => v.key === variant);

  return (
    <div className="fixed inset-x-0 bottom-4 z-50 flex justify-center">
      <div className="flex items-center gap-3 rounded-full bg-yellow-300 px-3 py-2 text-sm font-semibold text-black shadow-lg ring-2 ring-black">
        <button type="button" onClick={() => go(-1)} aria-label="Previous">
          <BiLeftArrowAlt className="size-5" />
        </button>
        <span>
          PROTOTYPE {current?.key}: {current?.name}
        </span>
        <button type="button" onClick={() => go(1)} aria-label="Next">
          <BiRightArrowAlt className="size-5" />
        </button>
      </div>
    </div>
  );
}

function QuoteStack({ testimonials, activeIndex, className = "" }) {
  return (
    <div className={cn("grid", className)}>
      {testimonials.map((t, i) => (
        <blockquote
          key={`proto-quote-${i}`}
          aria-hidden={i !== activeIndex}
          className={cn(
            "col-start-1 row-start-1 text-2xl text-foreground transition-opacity duration-300 md:text-4xl",
            i === activeIndex ? "opacity-100" : "pointer-events-none opacity-0"
          )}
        >
          {i === activeIndex ? (
            <ClipTextReveal
              key={activeIndex}
              text={withQuoteMarks(t?.quote ?? "")}
            />
          ) : (
            <span>{withQuoteMarks(t?.quote ?? "").replace(/\*\*/g, "")}</span>
          )}
        </blockquote>
      ))}
    </div>
  );
}

function Arrows({ count, step, className = "" }) {
  if (count <= 1) return null;
  return (
    <div className={cn("flex justify-end gap-3", className)}>
      <ArrowButton label="Previous testimonial" onClick={() => step(-1)}>
        <BiLeftArrowAlt className="size-6" />
      </ArrowButton>
      <ArrowButton label="Next testimonial" onClick={() => step(1)}>
        <BiRightArrowAlt className="size-6" />
      </ArrowButton>
    </div>
  );
}

function CtaButton({ t, className = "" }) {
  return (
    <RippleButton
      variant="primary"
      href={t.caseStudyUrl}
      target="_blank"
      className={cn(
        "group inline-flex w-full max-w-full rounded-full px-8 py-4 sm:w-auto",
        className
      )}
      fontClassName="min-w-0 gap-3 text-sm font-semibold uppercase tracking-wider"
    >
      <span className="min-w-0 break-words">
        {t.caseStudyButtonText || "Explore the case study"}
      </span>
      <BsArrowRight className="size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
    </RippleButton>
  );
}

function Logo({ t, className = "" }) {
  if (!t?.companyLogo) return null;
  return (
    <Image
      src={t.companyLogo}
      alt={t?.companyLogoAlt ?? "Company logo"}
      width={160}
      height={160}
      className={cn(
        "w-auto object-contain object-left brightness-0 dark:invert",
        className
      )}
    />
  );
}

function NameTitle({ t }) {
  return (
    <div className="flex min-w-0 flex-col break-words">
      <span className="font-semibold text-foreground">{t?.authorName}</span>
      <span className="text-sm text-muted-foreground">{t?.authorTitle}</span>
    </div>
  );
}

// A: attribution is headshot + name only. The client's logo leads the case
// study column, so the logo sits with the story it belongs to.
function VariantA({ testimonials, activeIndex, current, step }) {
  return (
    <div className="mx-auto flex max-w-xl flex-col gap-10 xl:grid xl:max-w-6xl xl:grid-cols-testimonial-case-study xl:grid-rows-testimonial xl:items-start xl:gap-x-12 xl:gap-y-10">
      <QuoteStack
        testimonials={testimonials}
        activeIndex={activeIndex}
        className="xl:col-start-1 xl:row-start-1"
      />
      <motion.div
        key={`a-author-${activeIndex}`}
        {...fadeUp}
        className="flex items-center gap-4 xl:col-start-1 xl:row-start-2 xl:self-end"
      >
        {current?.authorImage && (
          <div className="relative size-14 shrink-0 overflow-hidden rounded-utility">
            <AuthorPhoto testimonial={current} />
          </div>
        )}
        <NameTitle t={current} />
      </motion.div>
      <motion.div
        key={`a-cta-${activeIndex}`}
        {...fadeUp}
        className="flex flex-col items-start gap-6 border-t border-hairline pt-8 xl:col-start-2 xl:row-start-1 xl:border-t-0 xl:pt-0"
      >
        <Logo t={current} className="h-10 max-w-40" />
        {current?.caseStudyLabel && (
          <p className="w-full break-words text-lg font-medium text-foreground">
            {current.caseStudyLabel}
          </p>
        )}
        <CtaButton t={current} />
      </motion.div>
      <Arrows
        count={testimonials.length}
        step={step}
        className="xl:col-start-2 xl:row-start-2 xl:place-self-end"
      />
    </div>
  );
}

// B: exactly the default layout (big portrait, name | logo, no headshot in
// the row). The case study becomes a full-width strip under it, with the
// arrows at its end.
function VariantB({ testimonials, activeIndex, current, step }) {
  return (
    <div className="mx-auto flex max-w-xl flex-col gap-10 xl:max-w-5xl">
      <div className="flex flex-col gap-10 xl:grid xl:grid-cols-testimonial xl:grid-rows-testimonial xl:items-start xl:gap-x-12 xl:gap-y-4">
        <QuoteStack
          testimonials={testimonials}
          activeIndex={activeIndex}
          className="max-w-3xl xl:col-start-1 xl:row-start-1"
        />
        <motion.div
          key={`b-author-${activeIndex}`}
          {...fadeUp}
          className="flex items-center gap-4 xl:col-start-1 xl:row-start-2 xl:self-end"
        >
          <NameTitle t={current} />
          {current?.companyLogo && (
            <>
              <span className="h-10 w-px shrink-0 bg-hairline" />
              <Logo t={current} className="h-12 shrink-0 max-md:max-w-28" />
            </>
          )}
        </motion.div>
        {current?.authorImage && (
          <motion.div
            key={`b-photo-${activeIndex}`}
            {...fadeUp}
            className="relative order-first size-48 shrink-0 overflow-hidden rounded-card xl:order-none xl:col-start-2 xl:row-start-1"
          >
            <AuthorPhoto testimonial={current} />
          </motion.div>
        )}
      </div>
      <motion.div
        key={`b-strip-${activeIndex}`}
        {...fadeUp}
        className="flex flex-col gap-6 border-t border-hairline pt-8 md:flex-row md:items-center"
      >
        {current?.caseStudyLabel && (
          <p className="min-w-0 flex-1 break-words text-lg font-medium text-foreground">
            {current.caseStudyLabel}
          </p>
        )}
        <CtaButton t={current} className="shrink-0" />
        <Arrows count={testimonials.length} step={step} className="md:ml-6" />
      </motion.div>
    </div>
  );
}

// C: logo as a small label above the quote; the author is plain text. The
// case study is a card led by the author's photo.
function VariantC({ testimonials, activeIndex, current, step }) {
  return (
    <div className="mx-auto flex max-w-xl flex-col gap-10 xl:grid xl:max-w-6xl xl:grid-cols-testimonial-case-study xl:grid-rows-testimonial xl:items-start xl:gap-x-12 xl:gap-y-10">
      <div className="flex flex-col gap-8 xl:col-start-1 xl:row-start-1">
        <motion.div key={`c-logo-${activeIndex}`} {...fadeUp}>
          <Logo t={current} className="h-8 max-w-36" />
        </motion.div>
        <QuoteStack testimonials={testimonials} activeIndex={activeIndex} />
      </div>
      <div className="flex items-end justify-between gap-6 xl:col-start-1 xl:row-start-2 xl:self-end">
        <motion.p
          key={`c-author-${activeIndex}`}
          {...fadeUp}
          className="min-w-0 break-words text-muted-foreground"
        >
          <span className="font-semibold text-foreground">
            {current?.authorName}
          </span>
          {current?.authorTitle && <>, {current.authorTitle}</>}
        </motion.p>
        <Arrows count={testimonials.length} step={step} className="shrink-0" />
      </div>
      <motion.div
        key={`c-card-${activeIndex}`}
        {...fadeUp}
        className="overflow-hidden rounded-card border border-hairline bg-card xl:col-start-2 xl:row-span-2 xl:row-start-1"
      >
        {current?.authorImage && (
          <div className="relative aspect-video w-full">
            <AuthorPhoto testimonial={current} />
          </div>
        )}
        <div className="flex flex-col items-start gap-6 p-4">
          {current?.caseStudyLabel && (
            <p className="w-full break-words text-lg font-medium text-foreground">
              {current.caseStudyLabel}
            </p>
          )}
          <CtaButton t={current} className="px-4 sm:w-full" />
        </div>
      </motion.div>
    </div>
  );
}

// D: the original quote and name | logo row, untouched. The case study is a
// card on the right (photo on top, standard p-6 padding like the homepage
// Image Cards). Desktop: the quote + author block and the card are centred on
// each other, and the author follows the quote at a fixed gap. A slide with a
// photo but no case study shows the original portrait instead of a card.
// `mobile` picks the phone treatment:
//   m1 — small arrows + "1 / 2" count under the author; swipe also works
//   m2 — no arrows on phones; tappable dots under the author; swipe
//   m3 — peek carousel: slides scroll sideways, the next one peeks in
function useSwipe(step) {
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
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy))
        step(dx < 0 ? 1 : -1);
    },
  };
}

function CaseStudyCard({ t, className = "" }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-card border border-hairline bg-card",
        className
      )}
    >
      {t?.authorImage && (
        <div className="relative aspect-4/3 w-full">
          <AuthorPhoto testimonial={t} className="object-top" />
        </div>
      )}
      <div className="flex flex-col items-start gap-6 p-6">
        {t?.caseStudyLabel && (
          <p className="w-full break-words text-lg font-medium text-foreground">
            {t.caseStudyLabel}
          </p>
        )}
        {/* The site's standard button: RippleButton's own rounded-rectangle
            size, sentence-case label, icon after the text. */}
        <RippleButton
          variant="primary"
          href={t.caseStudyUrl}
          target="_blank"
          className="group max-w-full"
          fontClassName="min-w-0 gap-2"
        >
          <span className="min-w-0 break-words">
            {t?.caseStudyButtonText || "Read the case study"}
          </span>
          <BsArrowRight className="size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
        </RippleButton>
      </div>
    </div>
  );
}

function Dots({ count, activeIndex, onPick, className = "" }) {
  if (count <= 1) return null;
  return (
    <div className={cn("flex items-center", className)}>
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          aria-label={`Show testimonial ${i + 1}`}
          aria-current={i === activeIndex}
          onClick={() => onPick(i)}
          // The dot is small; the button around it is a 44px touch target.
          className="flex size-11 items-center justify-center"
        >
          <span
            className={cn(
              "h-1.5 rounded-full bg-foreground transition-all duration-300",
              i === activeIndex ? "w-6" : "w-3 opacity-30"
            )}
          />
        </button>
      ))}
    </div>
  );
}

function SmallArrows({ count, activeIndex, step }) {
  if (count <= 1) return null;
  const btn =
    "flex size-10 items-center justify-center rounded-full border border-hairline text-foreground";
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm tabular-nums text-muted-foreground">
        {activeIndex + 1} / {count}
      </span>
      <div className="flex gap-2">
        <button
          type="button"
          aria-label="Previous testimonial"
          onClick={() => step(-1)}
          className={btn}
        >
          <BiLeftArrowAlt className="size-5" />
        </button>
        <button
          type="button"
          aria-label="Next testimonial"
          onClick={() => step(1)}
          className={btn}
        >
          <BiRightArrowAlt className="size-5" />
        </button>
      </div>
    </div>
  );
}

function RightColumn({ current, activeIndex }) {
  if (current?.caseStudyUrl) {
    return (
      <motion.div key={`d-card-${activeIndex}`} {...fadeUp}>
        <CaseStudyCard t={current} />
      </motion.div>
    );
  }
  if (!current?.authorImage) return null;
  return (
    <motion.div
      key={`d-photo-${activeIndex}`}
      {...fadeUp}
      className="relative size-48 overflow-hidden rounded-card"
    >
      <AuthorPhoto testimonial={current} />
    </motion.div>
  );
}

// Peek carousel for phones: every slide rendered side by side in a
// scroll-snap row; the next slide peeks in from the right edge.
function PeekCarousel({ testimonials }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const onScroll = () => {
    const row = rowRef.current;
    const first = row?.children[0] as HTMLElement | undefined;
    if (!row || !first) return;
    setIndex(Math.round(row.scrollLeft / (first.offsetWidth + 16)));
  };
  const pick = (i: number) => {
    const el = rowRef.current?.children[i] as HTMLElement | undefined;
    el?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };
  return (
    <div className="flex flex-col gap-4">
      <div
        ref={rowRef}
        onScroll={onScroll}
        className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 sm:-mx-8 sm:px-8"
      >
        {testimonials.map((t, i) => (
          <div
            key={`peek-${i}`}
            className="flex w-11/12 shrink-0 snap-center flex-col gap-8"
          >
            <blockquote className="text-2xl text-foreground">
              <ClipTextReveal text={withQuoteMarks(t?.quote ?? "")} />
            </blockquote>
            <Attribution testimonial={t} showAvatar={false} />
            {t?.caseStudyUrl && <CaseStudyCard t={t} />}
          </div>
        ))}
      </div>
      <Dots count={testimonials.length} activeIndex={index} onPick={pick} />
    </div>
  );
}

function VariantD({ testimonials, activeIndex, current, step, mobile = "m1" }) {
  const swipe = useSwipe(step);
  const count = testimonials.length;
  const pick = (i: number) => step(i - activeIndex);

  const desktop = (
    <div className="grid grid-cols-testimonial-case-study items-center gap-x-12">
      <div className="flex flex-col gap-10">
        <QuoteStack
          testimonials={testimonials}
          activeIndex={activeIndex}
          className="max-w-3xl"
        />
        <div className="flex items-center justify-between gap-6">
          <motion.div key={`d-author-${activeIndex}`} {...fadeUp}>
            <Attribution testimonial={current} showAvatar={false} />
          </motion.div>
          <Arrows count={count} step={step} className="shrink-0" />
        </div>
      </div>
      <RightColumn current={current} activeIndex={activeIndex} />
    </div>
  );

  const phone =
    mobile === "m3" ? (
      <PeekCarousel testimonials={testimonials} />
    ) : (
      <div className="flex flex-col gap-8" {...swipe}>
        <QuoteStack testimonials={testimonials} activeIndex={activeIndex} />
        <motion.div key={`dm-author-${activeIndex}`} {...fadeUp}>
          <Attribution testimonial={current} showAvatar={false} />
        </motion.div>
        {mobile === "m1" ? (
          <SmallArrows count={count} activeIndex={activeIndex} step={step} />
        ) : (
          <Dots
            count={count}
            activeIndex={activeIndex}
            onPick={pick}
            className="-my-3 -ml-3"
          />
        )}
        {current?.caseStudyUrl ? (
          <motion.div key={`dm-card-${activeIndex}`} {...fadeUp}>
            <CaseStudyCard t={current} />
          </motion.div>
        ) : (
          current?.authorImage && (
            <motion.div
              key={`dm-photo-${activeIndex}`}
              {...fadeUp}
              className="relative order-first size-48 overflow-hidden rounded-card"
            >
              <AuthorPhoto testimonial={current} />
            </motion.div>
          )
        )}
      </div>
    );

  return (
    <div className="mx-auto max-w-xl xl:max-w-6xl">
      <div className="hidden xl:block">{desktop}</div>
      <div className="xl:hidden">{phone}</div>
    </div>
  );
}

export function CaseStudyPrototype({
  variant,
  ...props
}: {
  variant: VariantKey;
  testimonials;
  activeIndex: number;
  current;
  step: (by: number) => void;
}) {
  if (variant === "A") return <VariantA {...props} />;
  if (variant === "B") return <VariantB {...props} />;
  if (variant === "C") return <VariantC {...props} />;
  if (variant === "D-m2") return <VariantD {...props} mobile="m2" />;
  if (variant === "D-m3") return <VariantD {...props} mobile="m3" />;
  if (variant === "D-nophoto") {
    // Simulates slides whose author has no headshot.
    const strip = (t) => ({ ...t, authorImage: undefined });
    return (
      <VariantD
        {...props}
        testimonials={props.testimonials.map(strip)}
        current={strip(props.current)}
      />
    );
  }
  return <VariantD {...props} mobile="m1" />;
}
