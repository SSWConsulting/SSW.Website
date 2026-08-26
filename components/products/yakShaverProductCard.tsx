"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { FC } from "react";
import { tinaField } from "tinacms/dist/react";
import {
  cardShell,
  learnMoreChip,
  productTagChip,
  visibleTags,
} from "./shared";
import { ProductCardShell } from "./productCardShell";

const LOCKUP_SRC =
  "/images/company-logos/downloads/YakShaver-Horizontal-Color-Darkmode.svg";
const GRADIENT_SRC = "/images/YakShaver-Gradient-BG.png";

type YakShaverProductCardProps = {
  product: {
    name?: string;
    url?: string;
    description?: string;
    tags?: string[];
  };
  tinaNode?: Record<string, unknown>;
};

// YakShaver's card: their dark-mode lockup and brand gradient artwork on the
// same surface the other nine products use in dark mode.
export const YakShaverProductCard: FC<YakShaverProductCardProps> = ({
  product,
  tinaNode,
}) => {
  const tags = visibleTags(product.tags);

  return (
    <ProductCardShell
      href={product.url}
      className={cn(
        cardShell,
        // `dark` scopes bg-card/bg-card-hover/text-foreground here to their
        // dark values regardless of page theme, so this card always renders
        // the same surface the others show in dark mode.
        "dark justify-between bg-card",
        "border-hairline hover:border-brand",
        "hover:bg-card-hover",
        "gap-4 p-6",
        // Must stay after p-6: twMerge lets a later p-* override an earlier
        // pr-*, so reordering silently drops this (verified with twMerge).
        "pr-10"
      )}
    >
      <Image
        src={GRADIENT_SRC}
        alt=""
        aria-hidden
        width={500}
        height={320}
        loading="lazy"
        className="pointer-events-none absolute inset-y-0 right-0 h-full w-auto max-w-none select-none"
      />

      <Image
        src={LOCKUP_SRC}
        alt=""
        aria-hidden
        width={212}
        height={41}
        className="relative h-12 w-auto self-start"
      />

      {/* The lockup is an image, so this carries the name for a11y/SEO. */}
      <h3
        className="sr-only"
        data-tina-field={tinaNode ? tinaField(tinaNode, "name") : undefined}
      >
        {product.name}
      </h3>

      {product.description && (
        <p
          className="relative m-0 p-0 text-sm font-light leading-snug text-muted-foreground"
          data-tina-field={
            tinaNode ? tinaField(tinaNode, "description") : undefined
          }
        >
          {product.description}
        </p>
      )}

      {tags.length > 0 && (
        <ul
          className="relative m-0 flex list-none flex-wrap gap-1.5 p-0"
          data-tina-field={tinaNode ? tinaField(tinaNode, "tags") : undefined}
        >
          {tags.map((tag) => (
            <li key={tag} className={productTagChip}>
              {tag}
            </li>
          ))}
        </ul>
      )}

      <div className="relative flex items-center pt-3">
        {/* Span, not a button or nested link: the card itself is already the
            link, and both are invalid nested inside an <a>. */}
        <span className={learnMoreChip}>Learn More</span>
      </div>
    </ProductCardShell>
  );
};
