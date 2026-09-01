import { cn } from "@/lib/utils";
import type { ProductsIndexProductsList } from "@/tina/types";
import Image from "next/image";
import { FC } from "react";
import { tinaField } from "tinacms/dist/react";
import {
  brandCardPadding,
  cardShell,
  learnMoreChip,
  productTagChip,
  tinaTagChip,
  visibleTags,
} from "./shared";
import { ProductCardShell } from "./productCardShell";

type BrandImage = {
  src: string;
  width: number;
  height: number;
  className: string;
};

export type BrandCardConfig = {
  // Classes layered on top of the shared shell/surface below — each brand's
  // field colour plus its hover/focus states.
  surfaceClassName: string;
  // Rendered first and absolutely positioned by its own className, so it
  // sits behind the lockup without taking part in the flex layout.
  watermark: BrandImage;
  // Stands in for the card title — see the sr-only h2 below.
  lockup: BrandImage;
  // Wraps the lockup/name/description/tags as one flex-gap group, separate
  // from the learn-more row below. Omit to lay them out flat instead — the
  // two cards don't group this content the same way.
  contentWrapperClassName?: string;
  descriptionClassName: string;
  tagsListClassName: string;
  tagChipClassName: string;
};

type BrandProductCardProps = {
  product: ProductsIndexProductsList;
  config: BrandCardConfig;
};

// The two products whose media kits require their own card surface (TinaCMS,
// YakShaver) share this shell; only the artwork and brand classes differ,
// captured in each one's BrandCardConfig.
export const BrandProductCard: FC<BrandProductCardProps> = ({
  product,
  config,
}) => {
  const tags = visibleTags(product.tags);

  const content = (
    <>
      <Image
        src={config.lockup.src}
        alt=""
        aria-hidden
        width={config.lockup.width}
        height={config.lockup.height}
        className={config.lockup.className}
      />
      {/* The lockup is an image, so this carries the name for a11y/SEO.
          h2 to match ProductCard — the cards sit directly under the page h1. */}
      <h2 className="sr-only" data-tina-field={tinaField(product, "name")}>
        {product.name}
      </h2>
      {product.description && (
        <p
          className={config.descriptionClassName}
          data-tina-field={tinaField(product, "description")}
        >
          {product.description}
        </p>
      )}
      {tags.length > 0 && (
        <ul
          className={config.tagsListClassName}
          data-tina-field={tinaField(product, "tags")}
        >
          {tags.map((tag) => (
            <li key={tag} className={config.tagChipClassName}>
              {tag}
            </li>
          ))}
        </ul>
      )}
    </>
  );

  return (
    <ProductCardShell
      href={product.url}
      className={cn(
        cardShell,
        // `dark` scopes every token here to its dark value, since a brand
        // surface doesn't follow the page theme.
        "dark justify-between gap-4",
        "border-hairline hover:border-brand",
        config.surfaceClassName,
        brandCardPadding
      )}
    >
      <Image
        src={config.watermark.src}
        alt=""
        aria-hidden
        width={config.watermark.width}
        height={config.watermark.height}
        loading="lazy"
        className={config.watermark.className}
      />

      {config.contentWrapperClassName ? (
        <div className={config.contentWrapperClassName}>{content}</div>
      ) : (
        content
      )}

      <div className="relative flex items-center pt-3">
        {/* Span, not a button or nested link: the card itself is already the
            link, and both are invalid nested inside an <a>. */}
        <span className={learnMoreChip}>Learn More</span>
      </div>
    </ProductCardShell>
  );
};

export const TINA_CARD_CONFIG: BrandCardConfig = {
  surfaceClassName: cn(
    "bg-brand-tina-field hover:bg-brand-tina-field-hover",
    "focus-visible:outline-white"
  ),
  watermark: {
    src: "/images/megamenu-icons/TinaDefault.svg",
    width: 448,
    height: 621,
    className:
      "pointer-events-none absolute -bottom-4 right-4 h-3/4 w-auto select-none opacity-15 brightness-0 invert transition-opacity duration-300 group-hover:opacity-25 motion-reduce:transition-none",
  },
  lockup: {
    src: "/images/company-logos/TinaCms-Logo-Full-Default.svg",
    width: 1020,
    height: 254,
    className: "h-12 w-auto self-start brightness-0 invert",
  },
  contentWrapperClassName: "relative flex flex-col gap-3",
  descriptionClassName:
    "m-0 max-w-2xl p-0 text-sm font-light leading-snug text-white",
  tagsListClassName: "m-0 flex list-none flex-wrap gap-1.5 p-0",
  tagChipClassName: tinaTagChip,
};

export const YAKSHAVER_CARD_CONFIG: BrandCardConfig = {
  surfaceClassName: "bg-card hover:bg-card-hover",
  watermark: {
    src: "/images/YakShaver-Gradient-BG.png",
    width: 500,
    height: 320,
    className:
      "pointer-events-none absolute inset-y-0 right-0 h-full w-auto max-w-none select-none",
  },
  lockup: {
    src: "/images/company-logos/downloads/YakShaver-Horizontal-Color-Darkmode.svg",
    width: 212,
    height: 41,
    className: "relative h-12 w-auto self-start",
  },
  descriptionClassName:
    "relative m-0 p-0 text-sm font-light leading-snug text-muted-foreground",
  tagsListClassName: "relative m-0 flex list-none flex-wrap gap-1.5 p-0",
  tagChipClassName: productTagChip,
};
