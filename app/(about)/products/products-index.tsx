import { HomeThemeShell } from "@/components/layout/homeTheme";
import { MoreProductsPanel } from "@/components/products/moreProductsPanel";
import { ProductCard } from "@/components/products/productCard";
import { TinaProductCard } from "@/components/products/tinaProductCard";
import { YakShaverProductCard } from "@/components/products/yakShaverProductCard";
import { Container } from "@/components/util/container";
import { Breadcrumbs } from "app/components/breadcrumb";
import { tinaField } from "tinacms/dist/react";

// The two products whose owners' media kits require their own card surface.
// Matched on name rather than list position so the treatment follows the
// product if an editor reorders the CMS list.
const BRAND_CARDS = ["tinacms", "yakshaver"];
const isBrandCard = (name?: string) =>
  BRAND_CARDS.includes((name ?? "").trim().toLowerCase());

export default function ProductsIndexContent({ props }) {
  const node = props.productsIndex;
  const products = node?.productsList ?? [];

  // Each brand card occupies two grid cells at the tiers where it spans, so the
  // trailing gap the panel fills is measured in cells, not products.
  const cellCount =
    products.length + products.filter((p) => isBrandCard(p?.name)).length;

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
        {/* The CMS `subTitle` is deliberately not rendered. It still holds
            "Explore the future of enterprise development with our scalable,
            cutting-edge products", because the field is `required: true` in
            tina/collections/products.tsx and emptying it would make the document
            invalid and unsaveable for editors — so the copy is dropped here at
            the render rather than deleted from the content. */}

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
            const name = (product?.name ?? "").trim().toLowerCase();

            // Brand cards span two columns from md up. The base tier stays at
            // span 1: a col-span-2 in the single-column grid would add an
            // implicit second column and cause horizontal scroll.
            if (name === "tinacms") {
              return (
                <div key={key} className="md:col-span-2">
                  <TinaProductCard product={product} tinaNode={product} />
                </div>
              );
            }

            if (name === "yakshaver") {
              return (
                <div key={key} className="md:col-span-2">
                  <YakShaverProductCard product={product} tinaNode={product} />
                </div>
              );
            }

            return (
              <ProductCard key={key} product={product} tinaNode={product} />
            );
          })}

          <MoreProductsPanel
            cellsAtMidTier={cellCount}
            cellsAtWidestTier={cellCount}
          />
        </div>
      </Container>
    </HomeThemeShell>
  );
}
