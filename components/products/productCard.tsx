import { BluredBase64Image } from "@/helpers/images";
import { cn } from "@/lib/utils";
import type { ProductsIndexProductsList } from "@/tina/types";
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
  product: ProductsIndexProductsList;
};

// The standard card — nine of the eleven products. TinaCMS and YakShaver get
// their own components for their media-kit surfaces.
export const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const domain = destinationLabel(product.url);
  const tags = visibleTags(product.tags);

  return (
    <ProductCardShell
      href={product.url}
      className={cn(
        cardShell,
        "gap-3 p-5",
        "border-stroke-weak bg-gray-50 hover:border-brand hover:bg-white",
        "dark:border-hairline dark:bg-card dark:hover:border-brand dark:hover:bg-card-hover",
        "active:bg-gray-100 dark:active:bg-card"
      )}
    >
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
        {/* h2, not h3: unlike /consulting the grid has no category headings
            above it, so the cards sit directly under the page h1. */}
        <h2
          className="m-0 p-0 text-lg font-semibold leading-tight text-foreground"
          data-tina-field={tinaField(product, "name")}
        >
          {product.name}
        </h2>
        {product.description && (
          <p
            className="m-0 line-clamp-3 p-0 text-sm font-light leading-snug text-muted-foreground"
            title={product.description}
            data-tina-field={tinaField(product, "description")}
          >
            {product.description}
          </p>
        )}
      </div>

      {tags.length > 0 && (
        <ul
          className="m-0 flex list-none flex-wrap gap-1.5 p-0"
          data-tina-field={tinaField(product, "tags")}
        >
          {tags.map((tag) => (
            <li key={tag} className={productTagChip}>
              {tag}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-auto flex items-center justify-between gap-3 border-t-0.75 border-hairline pt-3">
        {domain && (
          <span className="min-w-0 truncate text-sm text-muted-foreground">
            {domain}
          </span>
        )}
        {/* Fill overridden here rather than in ArrowCircle (used at full
            strength elsewhere) — keep its group-hover scale/rotate as-is. */}
        <ArrowCircle
          className="size-9 flex-none bg-gray-200 p-2 text-gray-900 dark:bg-gray-950 dark:text-white"
          iconClassName="size-3.5"
        />
      </div>
    </ProductCardShell>
  );
};
