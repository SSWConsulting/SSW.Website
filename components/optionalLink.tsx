import Link from "next/link";
import type { ReactNode } from "react";

type OptionalLinkProps = {
  link?: string | null;
  newTab?: boolean | null;
  // The Tina field the visual editor opens when the wrapper is clicked.
  field?: string;
  children: ReactNode;
};

// Wraps its children in a link when there is one, or a plain box when there
// isn't, so a card renders the same either way. Internal paths and full URLs
// both work; `newTab` opens the link in a new tab.
export const OptionalLink = ({
  link,
  newTab,
  field,
  children,
}: OptionalLinkProps) =>
  link ? (
    <Link
      href={link}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noopener noreferrer" : undefined}
      data-tina-field={field}
      className="h-full !no-underline"
    >
      {children}
    </Link>
  ) : (
    <div data-tina-field={field} className="h-full">
      {children}
    </div>
  );
