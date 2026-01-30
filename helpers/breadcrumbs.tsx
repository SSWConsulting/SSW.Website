import {
  BreadcrumbLink,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import React from "react";

/**
 * Renders a breadcrumb item, determining if it should be clickable or not.
 * The last item in the breadcrumb trail is rendered as non-clickable (BreadcrumbPage),
 * while all ancestor items are rendered as clickable links (BreadcrumbLink).
 *
 * @param isLast - Whether this is the last item in the breadcrumb trail
 * @param displayName - The text to display for this breadcrumb item
 * @param href - The URL for this breadcrumb item (used only if not last)
 * @param className - CSS classes to apply to the breadcrumb item
 * @param additionalProps - Additional props to spread onto the component
 * @param key - React key for this element
 * @returns A React node representing the breadcrumb item
 */
export function renderBreadcrumbItem(
  isLast: boolean,
  displayName: string,
  href: string,
  className?: string,
  additionalProps?: Record<string, unknown>,
  key?: string
): React.ReactNode {
  if (isLast) {
    // Last item - not clickable
    return (
      <BreadcrumbPage key={key} className={className} {...additionalProps}>
        {displayName}
      </BreadcrumbPage>
    );
  } else {
    // Intermediate items - clickable
    return (
      <BreadcrumbLink key={key} href={href} className={className} {...additionalProps}>
        {displayName}
      </BreadcrumbLink>
    );
  }
}
