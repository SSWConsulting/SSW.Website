import {
  BrandCardConfig,
  BrandProductCard,
  TINA_CARD_CONFIG,
  YAKSHAVER_CARD_CONFIG,
} from "@/components/products/brandProductCard";
import { HomeThemeShell } from "@/components/layout/homeTheme";
import { ProductCard } from "@/components/products/productCard";
import { Container } from "@/components/util/container";
import type { ProductsIndexQueryQuery } from "@/tina/types";
import { Breadcrumbs } from "app/components/breadcrumb";
import { tinaField } from "tinacms/dist/react";

// Keyed by lowercase name so the treatment follows the product on reorder.
const BRAND_CARD_CONFIGS = {
  tinacms: TINA_CARD_CONFIG,
  yakshaver: YAKSHAVER_CARD_CONFIG,
} satisfies Record<string, BrandCardConfig>;

// hasOwn, not a bare lookup: the map is an object literal, so a product named
// e.g. "constructor" would otherwise resolve to a truthy prototype member and
// then throw on config.lockup.src.
const brandConfigFor = (name?: string): BrandCardConfig | undefined => {
  const key = (name ?? "").trim().toLowerCase();
  return Object.hasOwn(BRAND_CARD_CONFIGS, key)
    ? BRAND_CARD_CONFIGS[key as keyof typeof BRAND_CARD_CONFIGS]
    : undefined;
};

export default function ProductsIndexContent({
  data,
}: {
  data: ProductsIndexQueryQuery;
}) {
  const productsIndex = data.productsIndex;

  // Stable sort: pins brand cards first, otherwise preserves CMS order.
  const products = [...(productsIndex?.productsList ?? [])].sort(
    (a, b) =>
      Number(!!brandConfigFor(b?.name)) - Number(!!brandConfigFor(a?.name))
  );

  return (
    // min-h-screen, not min-h-full: PageLayout's <main> has an unconditional
    // bg-white, so any shortfall shows as a white band in dark mode.
    <HomeThemeShell className="min-h-screen bg-sunken-glow">
      <Container
        size="custom"
        width="custom"
        padding="px-6 max-md:px-3"
        className="max-w-8xl pb-16 pt-4 max-md:pb-12 max-md:pt-3"
      >
        <div className="min-h-12">
          <Breadcrumbs path={"/products"} title={"Products"} />
        </div>

        {productsIndex?.title && (
          <h1
            data-tina-field={tinaField(productsIndex, "title")}
            // m-0 p-0, not mb-0 py-0: styles.css's h1 my-4 pb-5 pt-15 would
            // otherwise leave an 18px top margin.
            className="m-0 p-0 text-xl font-semibold text-foreground max-md:mt-2 max-md:text-lg xl:text-2xl"
          >
            {productsIndex.title}
          </h1>
        )}
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4">
          {products.map((product, index) => {
            const key = `${product?.name ?? "product"}-${index}`;
            const brandConfig = brandConfigFor(product?.name);

            // col-span-2 only from md up: at the base 1-column tier it would
            // add an implicit second column and cause horizontal scroll.
            if (brandConfig) {
              return (
                <div key={key} className="md:col-span-2">
                  <BrandProductCard product={product} config={brandConfig} />
                </div>
              );
            }

            return <ProductCard key={key} product={product} />;
          })}
        </div>
      </Container>
    </HomeThemeShell>
  );
}
