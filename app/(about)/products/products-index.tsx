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

// The two products whose owners' media kits require their own card surface,
// keyed by lowercase name so the treatment follows the product if an editor
// reorders the CMS list.
const BRAND_CARD_COMPONENTS: Record<string, FC<BrandCardProps>> = {
  tinacms: TinaProductCard,
  yakshaver: YakShaverProductCard,
};

const brandCardFor = (name?: string) =>
  BRAND_CARD_COMPONENTS[(name ?? "").trim().toLowerCase()];

export default function ProductsIndexContent({ props }) {
  const node = props.productsIndex;

  // Brand cards are pinned to the front of the render order, independent of
  // where the CMS list actually puts them. `.sort` is stable, so this only
  // reorders brand cards ahead of standard ones and otherwise preserves the
  // CMS order on both sides of that split.
  const products = [...(node?.productsList ?? [])].sort(
    (a, b) => Number(!!brandCardFor(b?.name)) - Number(!!brandCardFor(a?.name))
  );

  return (
    // min-h-screen, not min-h-full: PageLayout's <main> carries an
    // unconditional bg-white, so any shortfall would show as a white band
    // beneath the themed content in dark mode.
    //
    // bg-sunken-glow is the same page background /consulting uses, so the two
    // index pages match: the sunken surface (#fafafa light, black dark) plus a
    // faint red glow bleeding in from the top-right. The flat colour is baked
    // into that token as a second gradient layer precisely so this works as a
    // single class — pairing a `bg-*` colour with a `bg-*` image in one cn()
    // makes tailwind-merge drop the colour.
    <HomeThemeShell className="min-h-screen bg-sunken-glow">
      {/* Geometry deliberately identical to /consulting's page wrapper
          (app/consulting/index.tsx): max-w-8xl, px-6 / max-md:px-3, and the same
          vertical padding, so the two index pages line their breadcrumb, title
          and content edges up exactly. size/width="custom" switch off
          Container's own defaults (max-w-9xl and py-12), which is what differed
          before — this page was 3rem wider with different gutters. */}
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
            // data-tina-field, not props-tina-field: Tina's visual editing
            // looks for the data- attribute, so the previous spelling never
            // registered a click target.
            data-tina-field={tinaField(node, "title")}
            // Type scale and box model both kept in step with /consulting's h1
            // (the `headingClass` constant in app/consulting/index.tsx), so the
            // two index pages render the title identically.
            //
            // `m-0 p-0`, not `mb-0 py-0`: styles.css gives every h1 `my-4 pb-5
            // pt-15`, and zeroing only the bottom/vertical parts left an 18px
            // top margin that /consulting does not have — enough to push this
            // title out of alignment with theirs. `leading-tight` is omitted
            // because styles.css already applies it to every h1-h5.
            //
            // `max-md:mt-2` reproduces the 9px that /consulting's title sits
            // lower by below md, where its h1 lives inside a sticky chip-row
            // wrapper carrying `max-md:pt-2`. There is no chip row here, so the
            // offset has to be stated directly to keep the two titles aligned.
            className="m-0 p-0 text-xl font-semibold text-foreground max-md:mt-2 max-md:text-lg xl:text-2xl"
          >
            {node.title}
          </h1>
        )}
        <div
          // grid-cols-N in Tailwind is already repeat(N, minmax(0, 1fr)), which
          // is what keeps a wide logo from blowing out a track.
          //
          // Breakpoints: the design asks for 4-up at 1240px and 2-up at 760px.
          // Those aren't breakpoints this theme defines, so this uses the
          // nearest ones it does — xl (1280) and md (768) — rather than adding
          // two one-off screens to the config.
          //
          // mt-8 replaces the gap the subtitle's own bottom margin used to
          // provide, so the grid doesn't butt up against the title.
          className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4"
        >
          {products.map((product, index) => {
            const key = `${product?.name ?? "product"}-${index}`;
            const BrandCard = brandCardFor(product?.name);

            // Brand cards span two columns from md up. The base tier stays at
            // span 1: a col-span-2 in the single-column grid would add an
            // implicit second column and cause horizontal scroll.
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
