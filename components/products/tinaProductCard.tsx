import { cn } from "@/lib/utils";
import Image from "next/image";
import { FC } from "react";
import { tinaField } from "tinacms/dist/react";
import { cardShell, learnMoreChip, tinaTagChip, visibleTags } from "./shared";
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
  product: {
    name?: string;
    url?: string;
    description?: string;
    tags?: string[];
  };
  tinaNode?: Record<string, unknown>;
};

// TinaCMS's card, built to their media kit: a solid field of their orange with
// white type, their lockup as the title, and their llama watermarked into the
// corner.
//
// Flat fills only — no gradient anywhere on this card.
//
// Contrast: the field is --brand-tina-field (#c2360d), not the raw brand orange
// (#ec4815) — white body text on the raw orange fails WCAG AA, while it passes
// on this darker field and its hover shade. This also rules out the
// muted-foreground token here: alpha-reduced white over this field falls back
// under AA, so all copy on this card is pure white.
export const TinaProductCard: FC<TinaProductCardProps> = ({
  product,
  tinaNode,
}) => {
  const tags = visibleTags(product.tags);

  return (
    // A plain link — the whole card is one target, so the focus outline sits
    // directly on the card rather than on a clipped child.
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
        // Caveat, accepted deliberately: brand red is barely visible against
        // this orange field, so the hover border effectively disappears — the
        // field brightening below is what actually signals hover on this card.
        "border-hairline hover:border-brand",
        "hover:bg-brand-tina-field-hover",
        // White, because the site's brand focus colour is barely visible
        // against this orange field, while white reads clearly. Overrides
        // cardShell's outline-brand.
        "focus-visible:outline-white",
        // Extra right padding (40px vs p-6's 24px) so the copy keeps clear of
        // the llama watermark in the bottom-right corner.
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
        {/* Capability tags, in the text column so they stay inside the padding
            that keeps this card's copy clear of the llama watermark.

            tinaTagChip, not productTagChip: this card's field is a fixed orange
            that does not follow the theme, and the red stroke the other cards'
            pills carry is barely visible against it - white is the more
            visible border here, not less. Bare string, never cn() - see the note
            on the constant. */}
        {tags.length > 0 && (
          <ul
            className="m-0 flex list-none flex-wrap gap-1.5 p-0"
            data-tina-field={tinaNode ? tinaField(tinaNode, "tags") : undefined}
          >
            {tags.map((tag) => (
              <li key={tag} className={tinaTagChip}>
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Footer: a Learn More call to action instead of the destination URL.
          No divider rule above it - the brand cards carry their own surface and
          read as whole panels, so the line was extra furniture.

          It is a <span>, NOT a <button> or a nested <a>. The whole card is
          already one link (see the note on ProductCardShell above), and both a
          button and an anchor are invalid inside an <a>. A span keeps the
          markup valid and the card a single tab stop, while the click still
          lands on the card's own link. */}
      <div className="relative flex items-center pt-3">
        {/* learnMoreChip, shared with the YakShaver card so the two cannot
            drift: a white field with a near-black label on both. */}
        <span className={learnMoreChip}>Learn More</span>
      </div>
    </ProductCardShell>
  );
};
