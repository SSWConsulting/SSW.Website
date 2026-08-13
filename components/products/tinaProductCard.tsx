import { CustomLink } from "@/components/customLink";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { FC } from "react";
import { tinaField } from "tinacms/dist/react";
import { ArrowCircle } from "../blocks/v3/shared/arrowCircle";
import { cardShell, destinationLabel } from "./shared";

// The llama mark on its own, used only for the watermark in the bottom-right
// corner. Same single-path artwork the mega menu uses, filled with Tina's
// official #ec4815 — which is where --brand-tina-orange's value comes from.
const LLAMA_SRC = "/images/megamenu-icons/TinaDefault.svg";

// The full TinaCms lockup (llama + wordmark), which stands in for the product
// title. Also #ec4815, so it gets the same brightness-0 + invert treatment to
// render white on the orange field.
const LOGO_SRC = "/images/company-logos/TinaCms-Logo-Full-Default.svg";

type TinaProductCardProps = {
  product: { name?: string; url?: string; description?: string };
  tinaNode?: Record<string, unknown>;
};

// TinaCMS's card, built to their media kit: a solid field of their orange with
// white type, their lockup as the title, and their llama watermarked into the
// corner.
//
// Flat fills only — no gradient anywhere on this card.
//
// Contrast: the field is --brand-tina-field (#c2360d), not the raw brand orange
// (#ec4815), because white body text on #ec4815 measures 3.82:1 and fails AA.
// On #c2360d it measures 5.49:1, and 4.92:1 on the hover shade. Note this rules
// out the muted-foreground token here too: white at 78% alpha over this field is
// only 3.89:1, so all copy on this card is pure white.
export const TinaProductCard: FC<TinaProductCardProps> = ({
  product,
  tinaNode,
}) => {
  return (
    // A plain link — the whole card is one target. It used to be a div wrapping
    // a full-bleed link overlay, because an install-command copy <button> lived
    // inside and nesting a button in an <a> is invalid. With that chip gone the
    // overlay is unnecessary, which also means the focus outline can sit on the
    // card itself again instead of on a child that overflow-hidden would clip.
    <CustomLink
      href={product.url ?? ""}
      className={cn(
        cardShell,
        "justify-between gap-4 bg-brand-tina-field p-6",
        // `dark` makes this card its own always-dark token scope (the same trick
        // the YakShaver card uses). It is needed purely so the border tokens
        // below resolve to their dark values in both themes: `--hairline` is
        // theme-dependent (#e5e7eb light / #212121 dark), and this card's field
        // is a fixed orange that does not follow the theme, so its border must
        // not either. Everything else on the card is already an explicit colour,
        // so the scope changes nothing else.
        // Corollary: any `dark:`-prefixed utility used inside this card is
        // always on.
        "dark",
        // Border matches the standard cards' dark-mode border exactly: #212121
        // at rest, brand red on hover.
        //
        // Caveat, accepted deliberately: brand red measures only 1.15:1 against
        // this orange field (1.03:1 against the hover shade), so the hover
        // border is effectively invisible here — it reads as the border simply
        // disappearing. The field brightening below is what actually signals
        // hover on this card.
        "border-hairline hover:border-brand",
        "hover:bg-brand-tina-field-hover",
        // White, because the site's brand focus colour (#cc4141) measures
        // 1.15:1 against this orange field and is effectively invisible, while
        // white measures 5.49:1. Overrides cardShell's outline-brand.
        "focus-visible:outline-white"
      )}
    >
      {/* Their llama, watermarked into the bottom-right corner. Sized by height
          (h-1/2 of the card) with w-auto so this tall artwork stays whole and
          fully inside the card rather than bleeding off the corner.
          brightness-0 turns the orange artwork black and invert then makes it
          white. A plain string, not cn(): `opacity-15` is a custom scale key
          that tailwind-merge would drop against `group-hover:opacity-25`. */}
      <Image
        src={LLAMA_SRC}
        alt=""
        aria-hidden
        width={448}
        height={621}
        loading="lazy"
        className="pointer-events-none absolute bottom-4 right-4 h-1/2 w-auto select-none opacity-15 brightness-0 invert transition-opacity duration-300 group-hover:opacity-25 motion-reduce:transition-none"
      />

      <div className="relative flex flex-col gap-3">
        {/* The lockup replaces the text title. Sized h-12 to match the
            YakShaver card's lockup, so the two brand cards carry equal visual
            weight. It contains the llama already, which is why there is no
            separate mark above it — only the watermark behind.

            self-start is load-bearing: as a stretched flex child the img box
            would span the whole card, and preserveAspectRatio would then centre
            the lockup inside it instead of left-aligning it. */}
        <Image
          src={LOGO_SRC}
          // Decorative: the accessible name comes from the sr-only <h3> below,
          // so the wordmark isn't announced twice.
          alt=""
          aria-hidden
          width={1020}
          height={254}
          className="h-12 w-auto self-start brightness-0 invert"
        />
        {/* sr-only heading: the title is now an image, so without this the
            product would have no text name in the document at all — nothing for
            a screen reader, in-page find, or SEO. */}
        <h3
          className="sr-only"
          data-tina-field={tinaNode ? tinaField(tinaNode, "name") : undefined}
        >
          {product.name}
        </h3>
        {product.description && (
          <p
            // Pure white, not an alpha-reduced white: see the contrast note in
            // this component's doc comment.
            className="m-0 max-w-2xl p-0 text-sm font-light leading-snug text-white"
            data-tina-field={
              tinaNode ? tinaField(tinaNode, "description") : undefined
            }
          >
            {product.description}
          </p>
        )}
      </div>

      {/* No divider rule above this footer — unlike the standard cards, the two
          brand cards carry their own surface and read as whole panels, so the
          line was extra furniture. pt-3 stays, to keep the footer's spacing
          from the copy above unchanged. */}
      <div className="relative flex items-center justify-between gap-3 pt-3">
        <span className="min-w-0 truncate text-sm text-white">
          {destinationLabel(product.url)}
        </span>
        {/* Everything on this card is white, including the accent — so the
            arrow fills white with an orange glyph rather than using the
            foreground/background tokens. */}
        <ArrowCircle
          className="size-9 flex-none bg-white p-2 text-brand-tina group-hover:scale-100"
          iconClassName="size-3.5"
        />
      </div>
    </CustomLink>
  );
};
