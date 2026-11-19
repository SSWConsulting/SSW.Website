"use client";

import { componentRenderer } from "@/components/blocks/mdxComponentRenderer";
import RippleButton from "@/components/button/rippleButtonV2";
import { HomeThemeShell } from "@/components/layout/homeTheme";
import { sidebarPageContainer } from "@/components/layout/stickySidebar";
import { testimonialsExcludingCategories } from "@/helpers/getTestimonials";
import {
  featuredTestimonial,
  splitTestimonialsPage,
} from "@/helpers/testimonials";
import { cn } from "@/lib/utils";
import { removeExtension } from "@/services/client/utils.service";
import { Breadcrumbs } from "app/components/breadcrumb";
import { MotionConfig, motion, type MotionProps } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";
import { FiArrowDown, FiArrowRight } from "react-icons/fi";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { themedProse } from "./clientStoryDialog";
import { ClientsClosing } from "./clientsClosing";
import { rise } from "./rise";
import { TestimonialAttribution, TestimonialCard } from "./testimonialCard";

const TESTIMONIALS_ID = "testimonials";

const eyebrow =
  "m-0 text-xs font-semibold uppercase tracking-widest text-brand";

// Fades a section up the first time it scrolls into view, after `delay`.
const reveal = (delay = 0): MotionProps => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "0px 0px -10% 0px" },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

export const TestimonialsIndex = ({ company, relativePath }) => {
  const page = useMemo(
    () => splitTestimonialsPage(company.subTitle),
    [company.subTitle]
  );
  const testimonials = useMemo(
    () => testimonialsExcludingCategories(page.excludedCategories),
    [page.excludedCategories]
  );
  const featured = featuredTestimonial(testimonials);
  // The hero already quotes the featured one in full.
  const wall = useMemo(
    () => testimonials.filter((testimonial) => testimonial !== featured),
    [testimonials, featured]
  );
  const wallRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const list = wallRef.current;
    if (!list || !("IntersectionObserver" in window)) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver((entries) => {
      for (const { isIntersecting, target } of entries) {
        if (!isIntersecting) continue;

        observer.unobserve(target);
        if (!reducedMotion.matches) {
          target.firstElementChild?.animate?.(
            [
              { opacity: 0.3, transform: "translateY(52px)" },
              { opacity: 1, transform: "translateY(0)" },
            ],
            { duration: 780, easing: "cubic-bezier(0.32, 0.05, 0.18, 1)" }
          );
        }
      }
    });

    // Cards already visible when hydration finishes should stay fully visible.
    for (const card of list.children) {
      const { top, bottom } = card.getBoundingClientRect();
      if (top >= window.innerHeight || bottom <= 0) observer.observe(card);
    }
    return () => observer.disconnect();
  }, [wall]);

  const showBreadcrumb = company.seo?.showBreadcrumb !== false;

  return (
    <MotionConfig reducedMotion="user">
      {/* min-h-screen: PageLayout's <main> is bg-white and would show below.
          overflow-x-clip: the hero glow spills past the window edge. */}
      <HomeThemeShell className="min-h-screen overflow-x-clip bg-sunken-glow">
        <div className={sidebarPageContainer}>
          <div className="min-h-12">
            {showBreadcrumb && (
              <Breadcrumbs
                path={removeExtension(relativePath)}
                title={company.seo?.title}
                seoSchema={company.seo}
              />
            )}
          </div>

          <section className="mt-6 grid items-center gap-12 md:mt-10 lg:grid-cols-12 lg:gap-14">
            <div className="min-w-0 lg:col-span-7">
              <p
                {...rise(0, eyebrow)}
                data-tina-field={tinaField(company, "title")}
              >
                {company.title}
              </p>
              <h1
                {...rise(
                  1,
                  "m-0 mt-5 p-0 text-4xl font-semibold leading-none tracking-tighter text-foreground sm:text-5xl xl:text-6xl"
                )}
                data-tina-field={tinaField(company, "subTitle")}
              >
                {page.tagline ?? company.title}
              </h1>
              <div
                {...rise(
                  2,
                  cn(
                    themedProse,
                    "mt-6 max-w-xl text-lg leading-relaxed prose-p:my-0 md:text-xl"
                  )
                )}
                data-tina-field={tinaField(company, "subTitle")}
              >
                <TinaMarkdown
                  content={page.intro}
                  components={componentRenderer}
                />
              </div>

              <div
                {...rise(3, "mt-8 flex flex-wrap items-center gap-x-6 gap-y-3")}
              >
                <RippleButton
                  variant="primary"
                  href="/company/contact-us"
                  className="inline-flex text-base font-semibold"
                  fontClassName="gap-3"
                >
                  <span>Talk to our team</span>
                  <FiArrowRight aria-hidden className="size-4" />
                </RippleButton>
                {wall.length > 0 && (
                  <RippleButton
                    variant="secondary"
                    href={`#${TESTIMONIALS_ID}`}
                    className="inline-flex border-stroke-weak text-base font-semibold text-foreground hover:border-brand hover:bg-card-hover hover:text-foreground dark:border-hairline dark:hover:border-brand"
                    fontClassName="gap-3"
                  >
                    <span>See all testimonials</span>
                    <FiArrowDown aria-hidden className="size-4" />
                  </RippleButton>
                )}
              </div>
            </div>

            {featured && (
              <div {...rise(2, "relative lg:col-span-5")}>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-red-radial opacity-25 blur-3xl motion-safe:animate-slight-pulse"
                />
                <figure className="m-0 rounded-card border-0.75 border-stroke-weak bg-card p-8 md:p-10 dark:border-hairline dark:shadow-2xl">
                  <span
                    aria-hidden="true"
                    className="block h-9 font-serif text-7xl leading-none text-brand"
                  >
                    &ldquo;
                  </span>
                  <blockquote className="m-0 mt-2 whitespace-pre-line border-0 p-0 text-lg font-light leading-relaxed text-foreground md:text-xl md:leading-relaxed">
                    {featured.body?.trim()}
                  </blockquote>
                  <div className="mt-8">
                    <TestimonialAttribution testimonial={featured} size={56} />
                  </div>
                </figure>
              </div>
            )}
          </section>

          {wall.length > 0 && (
            <section
              id={TESTIMONIALS_ID}
              aria-labelledby="testimonials-heading"
              className="mt-24 scroll-mt-28"
            >
              <motion.div
                {...reveal()}
                className="flex flex-wrap items-end justify-between gap-4"
              >
                <div>
                  <p className={eyebrow}>In their words</p>
                  <h2
                    id="testimonials-heading"
                    className="m-0 mt-4 p-0 text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl"
                  >
                    What our clients say
                  </h2>
                </div>
                <p className="m-0 text-sm text-muted-foreground">
                  {testimonials.length} testimonials
                </p>
              </motion.div>

              {/* Columns rather than a grid, so short and long quotes pack
                  together without leaving gaps under the short ones. */}
              <ul
                ref={wallRef}
                className="m-0 mt-8 list-none gap-6 p-0 md:columns-2 xl:columns-3"
              >
                {wall.map((testimonial, index) => (
                  <li
                    key={`${testimonial.name}-${index}`}
                    className="mb-6 inline-block w-full break-inside-avoid align-top"
                  >
                    <div>
                      <TestimonialCard testimonial={testimonial} />
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section
            className={cn(
              themedProse,
              "mt-12 rounded-card border-0.75 border-stroke-weak bg-card p-8 md:p-10 dark:border-hairline"
            )}
            data-tina-field={tinaField(company, "subTitle")}
          >
            <TinaMarkdown
              content={page.about}
              components={{
                ...componentRenderer,
                a: ({ url, children }) =>
                  url === "/company/about-us" ||
                  url === "https://www.ssw.com.au/company/about-us" ? (
                    <a
                      href={url}
                      className="not-prose unstyled inline-flex items-center gap-3 rounded-control border border-ssw-red bg-ssw-red px-6 py-3 text-base font-semibold text-white no-underline hover:bg-sswDarkRed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                    >
                      {children}
                      <FiArrowRight aria-hidden className="size-4" />
                    </a>
                  ) : (
                    <a href={url}>{children}</a>
                  ),
              }}
            />
          </section>

          <motion.div {...reveal()} className="mt-6">
            <ClientsClosing />
          </motion.div>
        </div>
      </HomeThemeShell>
    </MotionConfig>
  );
};
