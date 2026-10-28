import { cn } from "@/lib/utils";
import Image from "next/image";
import { tinaField } from "tinacms/dist/react";

type ProductHeroProps = {
  data: {
    logo?: string | null;
    title?: string | null;
    tagline?: string | null;
    blurb?: string | null;
  };
  /** Alt text for the logo tile - the product name, even on a sub-page. */
  logoAlt?: string;
  className?: string;
};

// Hero for both page types: a product page passes title + tagline + blurb, a
// sub-page passes the page title and its intro with no tagline.
export const ProductHero = ({ data, logoAlt, className }: ProductHeroProps) => (
  <header className={cn("flex flex-col gap-6 pt-6", className)}>
    <div className="flex flex-wrap items-center gap-6">
      {data.logo && (
        <div
          data-tina-field={tinaField(data, "logo")}
          // White in both themes: the logos are JPEGs with a baked-in white
          // background, so a themed tile would frame a white square.
          className="relative size-20 shrink-0 overflow-hidden rounded-card bg-white shadow-md"
        >
          <Image
            src={data.logo}
            alt={logoAlt ?? ""}
            fill
            sizes="80px"
            className="!my-0 object-contain"
          />
        </div>
      )}

      <div className="flex min-w-0 flex-col gap-2">
        {data.title && (
          <h1
            data-tina-field={tinaField(data, "title")}
            // m-0 p-0: styles.css gives every h1 `my-4 pb-5 pt-15`.
            className="m-0 p-0 text-4xl font-medium leading-tight tracking-tight text-foreground lg:text-5xl"
          >
            {data.title}
          </h1>
        )}
        {data.tagline && (
          <p
            data-tina-field={tinaField(data, "tagline")}
            className="m-0 max-w-screen-sm text-xl font-light text-muted-foreground"
          >
            {data.tagline}
          </p>
        )}
      </div>
    </div>

    {data.blurb && (
      <p
        data-tina-field={tinaField(data, "blurb")}
        className="m-0 max-w-3xl text-lg font-light leading-relaxed text-muted-foreground"
      >
        {data.blurb}
      </p>
    )}
  </header>
);
