import {
  BreadcrumbLink,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import React from "react";

/**
 * Configuration object for rendering a breadcrumb item.
 */
export interface BreadcrumbItemConfig {
  /** Whether this is the last item in the breadcrumb trail */
  isLast: boolean;
  /** The text to display for this breadcrumb item */
  displayName: string;
  /** The URL for this breadcrumb item (used only if not last) */
  href: string;
  /** CSS classes to apply to the breadcrumb item */
  className?: string;
  /** Additional props to spread onto the component */
  additionalProps?: Record<string, unknown>;
  /** React key for this element */
  key?: string;
}

/**
 * Renders a breadcrumb item, determining if it should be clickable or not.
 * The last item in the breadcrumb trail is rendered as non-clickable (BreadcrumbPage),
 * while all ancestor items are rendered as clickable links (BreadcrumbLink).
 *
 * @param config - Configuration object for the breadcrumb item
 * @returns A React node representing the breadcrumb item
 */
export function renderBreadcrumbItem(
  config: BreadcrumbItemConfig
): React.ReactNode {
  const { isLast, displayName, href, className, additionalProps, key } = config;

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

/**
 * Renders a list of breadcrumb items, automatically determining which should be clickable.
 * Maps through the breadcrumb list and renders each element.
 * The last item in the list is rendered as non-clickable (BreadcrumbPage),
 * while all other items are rendered as clickable links (BreadcrumbLink).
 *
 * @param breadcrumbs - Array of breadcrumb configurations (without isLast property)
 * @returns An array of React nodes representing the breadcrumb items
 */
export function renderBreadcrumbItems(
  breadcrumbs: Omit<BreadcrumbItemConfig, 'isLast'>[]
): React.ReactNode[] {
  return breadcrumbs.map((breadcrumb, index) => {
    const isLast = index === breadcrumbs.length - 1;
    return renderBreadcrumbItem({
      ...breadcrumb,
      isLast,
    });
  });
}
