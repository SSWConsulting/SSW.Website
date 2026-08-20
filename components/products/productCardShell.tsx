import { CustomLink } from "@/components/customLink";
import { FC, PropsWithChildren } from "react";

type ProductCardShellProps = PropsWithChildren<{
  href?: string;
  className?: string;
}>;

// The outer element of every product card.
//
// Why this exists rather than calling CustomLink directly: CustomLink returns a
// bare fragment when href is falsy (components/customLink.tsx), which drops this
// element *and* its className. The card's children would then fall through as
// loose grid items - logo plate, copy column and footer each becoming their own
// cell - and on the YakShaver card the absolutely-positioned artwork would lose
// its `relative` ancestor and escape to the page shell. `url` is optional on
// productsList in tina/collections/products.tsx, so an editor can produce that
// state.
//
// Guarding here rather than in CustomLink is deliberate. CustomLink has ~99 call
// sites, around twenty of which can pass a nullable href, and several sit inside
// <p> elements (components/util/consulting/benefits.tsx:93,
// components/blocks/aboutUs.tsx:312). Making it emit a <div> would put a block
// element inside a paragraph there: invalid HTML that the parser reshapes, which
// shows up as a hydration mismatch.
//
// A card with no URL is intentionally not focusable, so cardShell's
// focus-visible outline simply never applies in that case.
export const ProductCardShell: FC<ProductCardShellProps> = ({
  href,
  className,
  children,
}) =>
  href ? (
    <CustomLink href={href} className={className}>
      {children}
    </CustomLink>
  ) : (
    <div className={className}>{children}</div>
  );
