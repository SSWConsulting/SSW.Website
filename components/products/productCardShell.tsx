import { CustomLink } from "@/components/customLink";
import { FC, PropsWithChildren } from "react";

type ProductCardShellProps = PropsWithChildren<{
  href?: string;
  className?: string;
}>;

// CustomLink renders a bare fragment when href is falsy, dropping this element
// and its className, so a product with no url falls back to a plain div here.
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
