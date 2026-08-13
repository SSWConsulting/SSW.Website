import { cn } from "@/lib/utils";
import Image from "next/image";
import { FC } from "react";
import { tinaField } from "tinacms/dist/react";
import { cardShell } from "./shared";
import { ProductCardShell } from "./productCardShell";

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
    <ProductCardShell
      href={product.url}
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
        "focus-visible:outline-white",
        // Extra right padding (40px vs p-6's 24px) so the copy keeps clear of
        // the llama watermark in the bottom-right corner, which is larger now
        // than the h-1/2 it was originally sized at.
        //
        // MUST stay after p-6 in this argument list: tailwind-merge treats a
        // later `p-*` as overriding an earlier `pr-*`, so ordering it before p-6
        // makes it silently disappear (verified with twMerge directly).
        "pr-10"
      )}
    >
      {/* Their llama, watermarked into the bottom-right corner. Sized by height
          (h-3/4 of the card) with w-auto so this tall 448x621 artwork scales on
          its own aspect ratio rather than being distorted.

          `-bottom-4` is intentional: the mark is pushed 16px below the card's
          bottom edge so it sits lower in the composition, and cardShell's
          overflow-hidden crops the feet rather than letting it overflow the
          card. So this is a deliberate partial crop, not an accident - if the
          whole mark is ever required again, `bottom-4` restores it.

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
        className="pointer-events-none absolute -bottom-4 right-4 h-3/4 w-auto select-none opacity-15 brightness-0 invert transition-opacity duration-300 group-hover:opacity-25 motion-reduce:transition-none"
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

      {/* Footer: a Learn More call to action instead of the destination URL.
          No divider rule above it - the brand cards carry their own surface and
          read as whole panels, so the line was extra furniture.

          It is a <span>, NOT a <button> or a nested <a>. The whole card is
          already one link (see the note on ProductCardShell above), and both a
          button and an anchor are invalid inside an <a> - which is the exact
          trap the install-command chip hit before. A span keeps the markup
          valid and the card a single tab stop, while the click still lands on
          the card's own link. */}
      <div className="relative flex items-center pt-3">
        <span
          className={cn(
            "inline-flex items-center justify-center rounded-control px-4 py-2",
            // transition-all, not transition-colors: the hover gesture is a
            // transform now, and a colour-only transition would snap it instead
            // of easing it. scale-100 states the rest value explicitly so the
            // interpolation has both ends.
            "text-sm font-medium transition-all duration-300 motion-reduce:transition-none",
            "scale-100 group-hover:scale-105",
            // White field with the darkened brand orange as the label: #c2360d
            // on white measures 5.49:1, clearing AA. The raw brand orange
            // (#ec4815) would only reach 3.82:1 and fail, which is the same
            // reason the card's own field is not the raw orange.
            "bg-white text-brand-tina-field"
            // Deliberately no group-hover colour swap. The card's own field
            // brightens to --brand-tina-field-hover on hover, so tinting this
            // element the same colour would dissolve it into the surface. A
            // white chip stays legible against both field shades, and the
            // surface change is already the hover gesture.
          )}
        >
          Learn More
        </span>
      </div>
    </ProductCardShell>
  );
};
