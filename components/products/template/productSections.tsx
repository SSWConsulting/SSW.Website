import RippleButton from "@/components/button/rippleButtonV2";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown, type TinaMarkdownContent } from "tinacms/dist/rich-text";
import { ProductVideo, type ProductVideoData } from "./productVideo";

export type ProductSection = {
  heading?: string | null;
  body?: TinaMarkdownContent | TinaMarkdownContent[] | null;
  list?: (string | null)[] | null;
  image?: string | null;
  imageAlt?: string | null;
  imageCaption?: string | null;
  imagePosition?: string | null;
  imageFit?: string | null;
  video?: ProductVideoData | null;
  button?: { label?: string | null; href?: string | null } | null;
};

const bodyComponents = {
  p: (props) => (
    <p
      {...props}
      className="m-0 text-base font-light leading-relaxed text-muted-foreground not-first:mt-4"
    />
  ),
};

const sectionBullets = (section: ProductSection) =>
  (section.list ?? []).filter(Boolean);

// A section can carry nothing but an image - a photo that belongs under the
// section before it, say - and the full-width layout needs to know, so it can
// drop the gap above the image rather than leave an empty text block's worth
// of space.
const hasText = (section: ProductSection) =>
  Boolean(
    section.heading ||
      section.body ||
      sectionBullets(section).length ||
      (section.button?.href && section.button?.label)
  );

const SectionText = ({ section }: { section: ProductSection }) => {
  const bullets = sectionBullets(section);

  if (!hasText(section)) return null;

  return (
    <div className="min-w-0">
      {section.heading && (
        <h2
          data-tina-field={tinaField(section, "heading")}
          // m-0 p-0: styles.css gives every h2 `mb-2.5 mt-10` and a red colour.
          className="m-0 mb-4 p-0 text-2xl leading-tight text-foreground lg:text-3xl"
        >
          {section.heading}
        </h2>
      )}

      {section.body && (
        <div data-tina-field={tinaField(section, "body")}>
          <TinaMarkdown content={section.body} components={bodyComponents} />
        </div>
      )}

      {bullets.length > 0 && (
        <ul className="m-0 mt-5 grid list-none grid-cols-1 gap-x-6 gap-y-2.5 p-0 sm:grid-cols-2">
          {bullets.map((item, index) => (
            <li
              key={`product-list-item-${index}`}
              className="m-0 flex gap-3 p-0 text-base font-light text-muted-foreground"
            >
              <span aria-hidden className="mt-2 size-2 shrink-0 bg-sswRed" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}

      {section.button?.href && section.button?.label && (
        <RippleButton
          variant="primary"
          href={section.button.href}
          textTinaField={tinaField(section.button, "label")}
          className="mt-6 inline-flex min-h-12 px-5 py-3.5 text-base font-semibold"
        >
          {section.button.label}
        </RippleButton>
      )}
    </div>
  );
};

const SectionImage = ({
  section,
  full,
}: {
  section: ProductSection;
  full?: boolean;
}) => {
  if (!section.image) return null;

  // Natural is the default: the frame hugs the image. Real section images run
  // from a 0.56 phone screenshot to a 3.28 vendor logo, so forcing one ratio on
  // all of them would either crop a screenshot to a band or letterbox a logo.
  // Uniform is the opt-in for a set that has to line up - the platform logos
  // below "Built on proven platforms" are 1.01, 1.10, 2.77 and 3.28, so left to
  // their own heights they look ragged. bg-white in both themes follows
  // productCard: these are third-party logos in dark ink on transparency, which
  // all but vanish on a dark page.
  const isUniform = section.imageFit === "uniform";

  return (
    <figure className="m-0" data-tina-field={tinaField(section, "image")}>
      <div
        className={cn(
          "overflow-hidden rounded-card border-0.75 border-hairline bg-white",
          isUniform && "flex aspect-video items-center justify-center p-8"
        )}
      >
        <Image
          src={section.image}
          // The heading is the fallback, not the intent: it names the section,
          // while alt text has to describe the picture. Every image the site
          // renders through CustomImage has required alt text, so a section
          // image gets its own field rather than inheriting a title.
          alt={section.imageAlt ?? section.heading ?? ""}
          width={0}
          height={0}
          sizes={
            full
              ? "(min-width: 1024px) 66vw, 100vw"
              : "(min-width: 1024px) 33vw, 100vw"
          }
          className={cn(
            // w-full in both cases: `width={0}` means the intrinsic width is 0,
            // so `w-auto` would collapse the image - and with it the flex plate.
            // The uniform plate takes its size from aspect-video instead, and
            // object-contain scales the logo to fit without cropping it.
            "!my-0 w-full",
            isUniform ? "h-full object-contain" : "h-auto"
          )}
        />
      </div>

      {/* Authors write the "Figure:" prefix themselves, as they do everywhere
          else on the site. The styling follows ProductVideo and
          ProductCarousel, so the three kinds of caption on a product page
          read alike. */}
      {section.imageCaption && (
        <figcaption
          data-tina-field={tinaField(section, "imageCaption")}
          className="mt-4 text-sm text-muted-foreground"
        >
          {section.imageCaption}
        </figcaption>
      )}
    </figure>
  );
};

const Section = ({
  section,
  divided,
}: {
  section: ProductSection;
  divided?: boolean;
}) => {
  const position = section.image ? (section.imagePosition ?? "none") : "none";
  const isSplit = position === "left" || position === "right";
  const isFull = position === "full";

  return (
    <section
      className={cn(
        divided &&
          "not-first:border-t-0.75 not-first:border-hairline not-first:pt-8"
      )}
    >
      {isSplit ? (
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          {/* Text first in the DOM so the single-column layout leads with the
              heading; from lg up the image moves ahead of it when it belongs
              on the left. */}
          <div className="lg:col-span-7">
            <SectionText section={section} />
          </div>
          <div
            className={cn(
              "lg:col-span-5",
              position === "left" && "lg:order-first"
            )}
          >
            <SectionImage section={section} />
          </div>
        </div>
      ) : isFull ? (
        // The image runs the width of the main column, under the text. A
        // landscape photo is unreadable at the 5/12 the split layout gives it,
        // and gap rather than a margin so an image-only section has no
        // phantom space above it.
        <div className="flex flex-col gap-8">
          <SectionText section={section} />
          <SectionImage section={section} full />
        </div>
      ) : (
        <SectionText section={section} />
      )}

      <ProductVideo data={section.video} className="mt-8" />
    </section>
  );
};

export const ProductSections = ({
  sections,
  divided,
}: {
  sections?: (ProductSection | null)[] | null;
  /** Sub-pages separate their sections with a hairline rule. */
  divided?: boolean;
}) => {
  const items = (sections ?? []).filter((section): section is ProductSection =>
    Boolean(section?.heading || section?.body || section?.image)
  );

  if (!items.length) return null;

  return (
    <>
      {items.map((section, index) => (
        <Section
          key={`product-section-${index}`}
          section={section}
          divided={divided}
        />
      ))}
    </>
  );
};
