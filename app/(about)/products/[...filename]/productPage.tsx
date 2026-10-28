import { HomeThemeShell } from "@/components/layout/homeTheme";
import { ProductCarousel } from "@/components/products/template/productCarousel";
import { ProductFeatures } from "@/components/products/template/productFeatures";
import { ProductHero } from "@/components/products/template/productHero";
import { ProductSections } from "@/components/products/template/productSections";
import { ProductServiceCta } from "@/components/products/template/productServiceCta";
import {
  ProductShell,
  productPageContainer,
} from "@/components/products/template/productShell";
import { ProductSidebar } from "@/components/products/template/productSidebar";
import { ProductVideo } from "@/components/products/template/productVideo";
import { Breadcrumbs } from "app/components/breadcrumb";

export const ProductPage = ({ product, slug }) => {
  return (
    // min-h-screen, not min-h-full: PageLayout's <main> has an unconditional
    // bg-white, so any shortfall shows as a white band in dark mode.
    <HomeThemeShell className="min-h-screen bg-sunken-glow">
      <div className={productPageContainer}>
        <div className="min-h-12">
          {/* path + title replace the slug crumb with the product's own name,
              so the trail reads Home > Products > SSW Rewards. */}
          <Breadcrumbs
            path={slug}
            title={product?.title}
            seoSchema={product?.seo}
          />
        </div>

        <ProductShell
          hero={<ProductHero data={product} logoAlt={product?.title} />}
          sidebar={
            <ProductSidebar
              productName={product?.title}
              data={product?.sidebar}
            />
          }
        >
          <ProductVideo data={product?.mainVideo} priority />
          <ProductFeatures data={product?.features} />
          <ProductSections sections={product?.sections} />
          <ProductCarousel data={product?.carousel} />
          <ProductServiceCta data={product?.serviceCta} />
        </ProductShell>
      </div>
    </HomeThemeShell>
  );
};
