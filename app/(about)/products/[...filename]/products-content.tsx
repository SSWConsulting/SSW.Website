import { removeExtension } from "@/services/client/utils.service";
import { ProductPage } from "./productPage";
import { ProductSubPage } from "./productSubPage";

export default function ProductsContent({ props }) {
  const { data, variables, parent } = props;

  // Page type comes from the file's depth rather than a field:
  // content/products/<slug>.mdx is a product page, and anything nested under
  // it (content/products/<slug>/<page>.mdx) is a content sub-page.
  const segments = removeExtension(variables.relativePath).split("/");

  if (segments.length > 1) {
    return (
      <ProductSubPage
        page={data?.products}
        parent={parent}
        parentSlug={segments[0]}
        slug={segments[segments.length - 1]}
      />
    );
  }

  return <ProductPage product={data?.products} slug={segments[0]} />;
}
