import { HomeThemeShell } from "@/components/layout/homeTheme";
import { ProductHero } from "@/components/products/template/productHero";
import { ProductSections } from "@/components/products/template/productSections";
import {
  ProductShell,
  productPageContainer,
} from "@/components/products/template/productShell";
import { ProductSidebar } from "@/components/products/template/productSidebar";
import { Breadcrumbs } from "app/components/breadcrumb";

// Module-level so Breadcrumbs' memo keeps a stable dependency between renders.
const NO_REPLACEMENTS: { from: string; to: string }[] = [];

export const ProductSubPage = ({ page, parent, parentSlug, slug }) => {
  const productName = parent?.title ?? page?.title;

  return (
    <HomeThemeShell className="min-h-screen bg-sunken-glow">
      <div className={productPageContainer}>
        <div className="min-h-12">
          {/* The parent crumb is named from the product document rather than a
              hardcoded slug list, so a new product needs no code change. */}
          <Breadcrumbs
            path={slug}
            title={page?.title}
            seoSchema={page?.seo}
            additionalReplacements={
              parent?.title
                ? [{ from: parentSlug, to: parent.title }]
                : NO_REPLACEMENTS
            }
          />
        </div>

        <ProductShell
          hero={
            <ProductHero
              // The logo belongs to the product, not the sub-page.
              data={{
                logo: parent?.logo,
                title: page?.title,
                blurb: page?.blurb,
              }}
              logoAlt={productName}
            />
          }
          sidebar={
            // Sub-pages inherit the product's sidebar, so the nav can show
            // which page is active without duplicating the CTAs per page.
            <ProductSidebar productName={productName} data={parent?.sidebar} />
          }
        >
          <ProductSections sections={page?.sections} divided />
        </ProductShell>
      </div>
    </HomeThemeShell>
  );
};
