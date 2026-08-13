import { CustomLink } from "@/components/customLink";
import { BluredBase64Image } from "@/helpers/images";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { FC } from "react";
import { tinaField } from "tinacms/dist/react";
import { ArrowCircle } from "../blocks/v3/shared/arrowCircle";
import { cardShell, destinationLabel } from "./shared";

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
    // CustomLink, not a raw <a>: it routes the one internal product
    // (/products/rewards) through next/link and adds target/rel to the
    // genuinely external ones.
    <CustomLink
      href={product.url ?? ""}
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
          unplated; here it keeps eleven differently-shaped logos on a
          consistent ground, and stays white in both themes because several of
          these logos are dark-on-transparent. */}
      <div className="flex size-16 flex-none items-center justify-center rounded-utility bg-white">
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
        {/* Starts as a quiet outline and fills with the foreground colour on
            hover. scale-100 on hover neutralises ArrowCircle's default
            group-hover:scale-125 so the rotation is the element's only
            gesture. */}
        <ArrowCircle
          className="size-9 flex-none border-0.75 border-stroke-weak bg-transparent p-2 text-foreground group-hover:scale-100 group-hover:border-transparent group-hover:bg-foreground group-hover:text-background"
          iconClassName="size-3.5"
        />
      </div>
    </CustomLink>
  );
};
