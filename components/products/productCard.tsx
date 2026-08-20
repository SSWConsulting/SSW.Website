import { BluredBase64Image } from "@/helpers/images";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { FC } from "react";
import { tinaField } from "tinacms/dist/react";
import { ArrowCircle } from "../blocks/v3/shared/arrowCircle";
import {
  cardShell,
  destinationLabel,
  productTagChip,
  visibleTags,
} from "./shared";
import { ProductCardShell } from "./productCardShell";

export type ProductCardProps = {
  product: {
    name?: string;
    url?: string;
    description?: string;
    logo?: string;
    tags?: string[];
  };
  // The Tina document node this product came from, for visual editing.
  tinaNode?: Record<string, unknown>;
};

// The standard card — nine of the eleven products. TinaCMS and YakShaver get
// their own components instead, because their media kits require their own
// surfaces.
export const ProductCard: FC<ProductCardProps> = ({ product, tinaNode }) => {
  const domain = destinationLabel(product.url);
  const tags = visibleTags(product.tags);

  return (
    // ProductCardShell, not a raw <a>: for a product that has a url it wraps
    // CustomLink, which routes the one on-site product (SSW Rewards, at
    // /products/rewards) through next/link and adds target/rel to the
    // genuinely external ones. That URL is relative, unlike every other
    // product's absolute one: customLink.tsx only treats an href as external
    // when it starts with https:// and does NOT contain ssw.com.au, or when it
    // points at the separate /people, /rules or /ssw sites, so a relative path
    // always routes internally. For a product with no url it renders this same
    // shell as a plain div, so the card keeps its chrome instead of collapsing
    // into loose grid items.
    <ProductCardShell
      href={product.url}
      className={cn(
        cardShell,
        "gap-3 p-5",
        // Surface, border and hover use the same colour tokens ConsultingCard
        // uses: gray-50 -> white in light, card -> card-hover in dark, hairline
        // border brightening to the brand colour, no shadow. The corner radius
        // differs from ConsultingCard's — this uses rounded-card (16px, see the
        // squircle note on the logo plate below), ConsultingCard uses rounded-xl
        // (12px) — so parity between the two index pages is on colour and motion
        // only, not shape.
        "border-stroke-weak bg-gray-50 hover:border-brand hover:bg-white",
        "dark:border-hairline dark:bg-card dark:hover:border-brand dark:hover:bg-card-hover",
        // Kept from the original brief's requirement that every interactive
        // element have an :active state — ConsultingCard has none. It is a
        // colour step rather than a transform, so it doesn't introduce a lift
        // or shadow that would break parity with /consulting.
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
          // only.
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

      {/* Capability tags. Sits between the copy and the footer rather than up by
          the title, so the title/description block stays the card's single
          reading unit and the footer keeps its mt-auto pin.

          flex-wrap is a safety net rather than the normal case: at two tags per
          card every current card fits one row at the 4-up tier, and this is here
          so a longer tag an editor adds later wraps instead of overflowing. A
          card that wraps ends up one row taller than its neighbours, which is
          harmless - the grid stretches every card in a row to the tallest
          (cardShell's h-full) and the footer is bottom-pinned, so the footers
          stay aligned either way.

          className is the bare `productTagChip` string rather than cn() — see the
          note on the constant for why that is kept. */}
      {tags.length > 0 && (
        <ul
          className="m-0 flex list-none flex-wrap gap-1.5 p-0"
          data-tina-field={tinaNode ? tinaField(tinaNode, "tags") : undefined}
        >
          {tags.map((tag) => (
            <li key={tag} className={productTagChip}>
              {tag}
            </li>
          ))}
        </ul>
      )}

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
            45deg turn plus the scale-up, both of which come from ArrowCircle's
            own `group-hover:rotate-45 group-hover:scale-125` defaults. Do not
            override those to a quiet outline that fills on hover, or pin
            group-hover:scale-100 — that suppresses the growth this card
            deliberately keeps.

            The FILL, though, is overridden here. ArrowCircle's default is
            `bg-foreground text-background`, a full-strength inversion: a
            rgba(0,0,0,.9) circle in light mode and a pure white one in dark.
            Against these cards that reads as the loudest thing in the footer -
            more contrast than the card's own title carries, for what is only
            an affordance. The greys below soften the disc to little more than
            a tint against the card, so it reads as a soft recess the arrow
            sits in rather than as a button competing with the copy, with the
            two themes balanced against each other.

            Softening the disc this far is only safe because the GLYPH carries
            the affordance, and it gets sharper as the disc fades. Do not
            soften the disc any further without re-checking the glyph's
            contrast against it: the disc needs to stay perceptible as a shape,
            or the arrow would need its own boundary back.

            Overridden at this call site, NOT in ArrowCircle: that component is
            used across the v3 blocks, where the strong inversion is wanted.
            The unprefixed `bg-gray-200`/`text-gray-900` are what displace the
            defaults through tailwind-merge (a `dark:`-prefixed class alone
            would not, being a different variant group), and the `dark:` pair
            then wins in dark mode on ordering. Verified with twMerge directly. */}
        <ArrowCircle
          className="size-9 flex-none bg-gray-200 p-2 text-gray-900 dark:bg-gray-950 dark:text-white"
          iconClassName="size-3.5"
        />
      </div>
    </ProductCardShell>
  );
};
