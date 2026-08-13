import { BluredBase64Image } from "@/helpers/images";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { FC } from "react";
import { tinaField } from "tinacms/dist/react";
import { ArrowCircle } from "../blocks/v3/shared/arrowCircle";
import { cardShell, destinationLabel } from "./shared";
import { ProductCardShell } from "./productCardShell";

export type ProductCardProps = {
  product: {
    name?: string;
    url?: string;
    description?: string;
    logo?: string;
  };
  // The Tina document node this product came from, for visual editing.
  tinaNode?: Record<string, unknown>;
};

// The standard card — nine of the eleven products. TinaCMS and YakShaver get
// their own components instead, because their media kits require their own
// surfaces.
export const ProductCard: FC<ProductCardProps> = ({ product, tinaNode }) => {
  const domain = destinationLabel(product.url);

  return (
    // ProductCardShell, not a raw <a>: for a product that has a url it wraps
    // CustomLink, which routes the one internal product (/products/rewards)
    // through next/link and adds target/rel to the genuinely external ones. For
    // a product with no url it renders this same shell as a plain div, so the
    // card keeps its chrome instead of collapsing into loose grid items.
    <ProductCardShell
      href={product.url}
      className={cn(
        cardShell,
        "gap-3 p-5",
        // Surface, border and hover are the same tokens ConsultingCard uses, so
        // the two index pages render identical card chrome: gray-50 -> white in
        // light, card -> card-hover in dark, hairline border brightening to the
        // brand colour. No shadow, matching /consulting.
        "border-stroke-weak bg-gray-50 hover:border-brand hover:bg-white",
        "dark:border-hairline dark:bg-card dark:hover:border-brand dark:hover:bg-card-hover",
        // Kept from the original brief's requirement that every interactive
        // element have an :active state — ConsultingCard has none. It is a
        // colour step rather than a transform, so it does not reintroduce the
        // lift that was removed to match /consulting.
        "active:bg-gray-100 dark:active:bg-card"
      )}
    >
      {/* Logo plate. The two brand cards drop this and show their mark
          unplated; here it keeps the nine remaining differently-shaped logos on
          a consistent ground, and stays white in both themes because several of
          these logos are dark-on-transparent.

          rounded-card (16px), not rounded-utility (8px): on a 64px plate that
          is a quarter of the side, which reads as a deliberate squircle and
          echoes the card's own corner radius instead of looking like a
          slightly-softened square. Both are design tokens, so this stays inside
          the scale rather than reaching for a raw Tailwind default. */}
      <div className="flex size-16 flex-none items-center justify-center rounded-card bg-white">
        {product.logo && (
          <Image
            src={product.logo}
            alt={`${product.name ?? "Product"} logo`}
            width={64}
            height={64}
            loading="lazy"
            placeholder="blur"
            blurDataURL={BluredBase64Image}
            className="size-12 object-contain"
          />
        )}
      </div>

      <div className="flex min-w-0 flex-col gap-1">
        <h3
          // No hover colour change: the title stays on text-foreground in both
          // states, so the card's hover gesture is the surface/border/arrow
          // only. The transition-colors that used to drive the red tint went
          // with it — nothing on this element animates any more.
          className="m-0 p-0 text-lg font-semibold leading-tight text-foreground"
          data-tina-field={tinaNode ? tinaField(tinaNode, "name") : undefined}
        >
          {product.name}
        </h3>
        {product.description && (
          <p
            // line-clamp keeps every card in a row the same height while the
            // descriptions vary from 5 to 30 words. title= exposes the full
            // text on hover for anything clipped.
            className="m-0 line-clamp-3 p-0 text-sm font-light leading-snug text-muted-foreground"
            title={product.description}
            data-tina-field={
              tinaNode ? tinaField(tinaNode, "description") : undefined
            }
          >
            {product.description}
          </p>
        )}
      </div>

      {/* Footer: destination + arrow. mt-auto pins it to the bottom of the card
          so the rule lines up across a row regardless of how much description
          each card has. */}
      <div className="mt-auto flex items-center justify-between gap-3 border-t-0.75 border-hairline pt-3">
        {domain && (
          <span className="min-w-0 truncate text-sm text-muted-foreground">
            {domain}
          </span>
        )}
        {/* Filled at rest and filled on hover - the only hover gesture is the
            45deg turn plus the scale-up. Deliberately passes nothing but size
            and padding so ArrowCircle's own defaults do the work:
            `bg-foreground text-background` inverts with the theme (dark circle
            with a light glyph in light mode, white circle with a dark glyph in
            dark mode) and `group-hover:rotate-45 group-hover:scale-125` supply
            the turn and the growth. An earlier revision overrode all of that to
            start as a quiet outline that filled on hover, and pinned
            group-hover:scale-100 to suppress the growth; adding any of those
            back re-breaks this. */}
        <ArrowCircle
          className="size-9 flex-none p-2"
          iconClassName="size-3.5"
        />
      </div>
    </ProductCardShell>
  );
};
