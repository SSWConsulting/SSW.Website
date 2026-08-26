import { cn } from "@/lib/utils";
import Image from "next/image";
import { FC } from "react";
import { tinaField } from "tinacms/dist/react";
import { cardShell, learnMoreChip, tinaTagChip, visibleTags } from "./shared";
import { ProductCardShell } from "./productCardShell";

const LLAMA_SRC = "/images/megamenu-icons/TinaDefault.svg";
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

// TinaCMS's card, built to their media kit: their orange field, their lockup
// as the title, their llama watermarked into the corner.
export const TinaProductCard: FC<TinaProductCardProps> = ({
  product,
  tinaNode,
}) => {
  const tags = visibleTags(product.tags);

  return (
    <ProductCardShell
      href={product.url}
      className={cn(
        cardShell,
        "justify-between gap-4 bg-brand-tina-field p-6",
        // `dark` scopes every token in this card to its dark value, since the
        // orange field doesn't follow the page theme.
        "dark",
        "border-hairline hover:border-brand",
        "hover:bg-brand-tina-field-hover",
        "focus-visible:outline-white",
        // Must stay after p-6: twMerge lets a later p-* override an earlier
        // pr-*, so reordering silently drops this (verified with twMerge).
        "pr-10"
      )}
    >
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
        <Image
          src={LOGO_SRC}
          alt=""
          aria-hidden
          width={1020}
          height={254}
          className="h-12 w-auto self-start brightness-0 invert"
        />
        {/* The title is an image, so this carries the name for a11y/SEO. */}
        <h3
          className="sr-only"
          data-tina-field={tinaNode ? tinaField(tinaNode, "name") : undefined}
        >
          {product.name}
        </h3>
        {product.description && (
          <p
            className="m-0 max-w-2xl p-0 text-sm font-light leading-snug text-white"
            data-tina-field={
              tinaNode ? tinaField(tinaNode, "description") : undefined
            }
          >
            {product.description}
          </p>
        )}
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

      <div className="relative flex items-center pt-3">
        {/* Span, not a button or nested link: the card itself is already the
            link, and both are invalid nested inside an <a>. */}
        <span className={learnMoreChip}>Learn More</span>
      </div>
    </ProductCardShell>
  );
};
