import { HomeThemeShell } from "@/components/layout/homeTheme";
import { ProductCard } from "@/components/products/productCard";
import { TinaProductCard } from "@/components/products/tinaProductCard";
import { YakShaverProductCard } from "@/components/products/yakShaverProductCard";
import { Container } from "@/components/util/container";
import { Breadcrumbs } from "app/components/breadcrumb";
import { FC } from "react";
import { tinaField } from "tinacms/dist/react";

type BrandCardProps = {
  product: {
    name?: string;
    url?: string;
    description?: string;
    tags?: string[];
  };
  tinaNode?: Record<string, unknown>;
};

// Keyed by lowercase name so the treatment follows the product on reorder.
const BRAND_CARD_COMPONENTS: Record<string, FC<BrandCardProps>> = {
  tinacms: TinaProductCard,
  yakshaver: YakShaverProductCard,
};

const brandCardFor = (name?: string) =>
  BRAND_CARD_COMPONENTS[(name ?? "").trim().toLowerCase()];

export default function ProductsIndexContent({ props }) {
  const node = props.productsIndex;

  // Stable sort: pins brand cards first, otherwise preserves CMS order.
  const products = [...(node?.productsList ?? [])].sort(
    (a, b) => Number(!!brandCardFor(b?.name)) - Number(!!brandCardFor(a?.name))
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

        {node?.title && (
          <h1
            data-tina-field={tinaField(node, "title")}
            // m-0 p-0, not mb-0 py-0: styles.css's h1 my-4 pb-5 pt-15 would
            // otherwise leave an 18px top margin.
            className="m-0 p-0 text-xl font-semibold text-foreground max-md:mt-2 max-md:text-lg xl:text-2xl"
          >
            {node.title}
          </h1>
        )}
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4">
          {products.map((product, index) => {
            const key = `${product?.name ?? "product"}-${index}`;
            const BrandCard = brandCardFor(product?.name);

            // col-span-2 only from md up: at the base 1-column tier it would
            // add an implicit second column and cause horizontal scroll.
            if (BrandCard) {
              return (
                <div key={key} className="md:col-span-2">
                  <BrandCard product={product} tinaNode={product} />
                </div>
              );
            }

            return (
              <ProductCard key={key} product={product} tinaNode={product} />
            );
          })}
        </div>
      </Container>
    </HomeThemeShell>
  );
}
