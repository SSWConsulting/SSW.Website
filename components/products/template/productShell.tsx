import { cn } from "@/lib/utils";

// Padded, centred container for the product template and its breadcrumbs.
export const productPageContainer =
  "mx-auto max-w-8xl px-8 pb-16 pt-4 max-md:px-3 max-md:pb-12 max-md:pt-3";

// Vertical rhythm between the main column's sections.
export const productSectionStack = "flex flex-col gap-16";

type ProductShellProps = {
  hero: React.ReactNode;
  sidebar: React.ReactNode;
  children: React.ReactNode;
};

// Two-column shell: content on the left, sticky sidebar on the right.
//
// grid-cols-3 with a 2/1 span rather than a bespoke column template, so the
// layout stays on the standard scale. It stacks below lg, not at the design's
// 860px, because a third of a narrower viewport leaves the sidebar too tight
// for the CTA card and the two store badges side by side; at lg the sidebar is
// still 288px.
//
// The hero is a separate slot from the body so that the single-column order is
// hero, sidebar, body - the sidebar reads as part of the hero on a phone,
// rather than being stranded under the whole page. Explicit row and column
// placement restores the two-column arrangement from lg up.
export const ProductShell = ({
  hero,
  sidebar,
  children,
}: ProductShellProps) => (
  <div className="grid grid-cols-1 items-start gap-x-12 gap-y-8 lg:grid-cols-3">
    <div className="min-w-0 lg:col-span-2 lg:col-start-1 lg:row-start-1">
      {hero}
    </div>

    <aside
      className={cn(
        "min-w-0 lg:col-start-3 lg:row-span-2 lg:row-start-1",
        "lg:sticky lg:top-headerOffset lg:self-start"
      )}
    >
      {sidebar}
    </aside>

    <div
      className={cn(
        "min-w-0 lg:col-span-2 lg:col-start-1 lg:row-start-2",
        productSectionStack
      )}
    >
      {children}
    </div>
  </div>
);
