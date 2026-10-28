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
  imagePosition?: string | null;
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

const SectionText = ({ section }: { section: ProductSection }) => {
  const bullets = (section.list ?? []).filter(Boolean);

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

const SectionImage = ({ section }: { section: ProductSection }) =>
  section.image ? (
    <div
      data-tina-field={tinaField(section, "image")}
      className="relative aspect-4/3 overflow-hidden rounded-card border-0.75 border-hairline"
    >
      <Image
        src={section.image}
        alt={section.heading ?? ""}
        fill
        sizes="(min-width: 1024px) 33vw, 100vw"
        // object-contain, not the design's cover: real section images run from
        // a 0.56 phone screenshot to a 3.28 vendor logo, and cover would crop
        // every one of them to a band. The frame keeps its 4/3 footprint so
        // the two-column layout stays steady whatever the image.
        className="!my-0 object-contain"
      />
    </div>
  ) : null;

const Section = ({
  section,
  divided,
}: {
  section: ProductSection;
  divided?: boolean;
}) => {
  const position = section.image ? (section.imagePosition ?? "none") : "none";
  const isSplit = position === "left" || position === "right";

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
    Boolean(section?.heading || section?.body)
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
