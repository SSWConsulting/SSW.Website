"use client";

import { isSswOwnedUrl, isSswSubsiteUrl } from "@/helpers/links";
import Link from "next/link";
import React, { PropsWithChildren } from "react";

interface CustomLinkProps extends PropsWithChildren {
  href: string;
  target?: string;
  className?: string;
  title?: string;
  style?: React.CSSProperties;
}

const isExternalLink = (href: string): boolean => {
  // i.e. href = https://anydomain.com.au => true | href = https://www.ssw.com.au/rule/* => true for SSW External Site | href = /company => false for relative path
  return (
    isSswSubsiteUrl(href) ||
    (href?.startsWith("https://") && !href.includes("ssw.com.au")) // checking relative path and external domains i.e. /company
  );
};

export const CustomLink: React.FC<CustomLinkProps> = ({
  href,
  target,
  className,
  children,
  title,
  style,
  ...props
}) => {
  const isExternal = isExternalLink(href);
  // The same list of SSW-owned domains that content links use.
  const isAnSSWBrandedSite = isSswOwnedUrl(href);

  if (!href) return <>{children}</>;
  return (
    <>
      {isExternal ? (
        <a
          className={className}
          href={href}
          target={target || "_blank"}
          rel={isAnSSWBrandedSite ? "" : "noopener"}
          title={title}
          style={style}
          {...props}
        >
          {children}
        </a>
      ) : (
        <Link
          className={className}
          target={target}
          href={href}
          title={title}
          {...props}
          style={style}
          prefetch={true}
        >
          {children}
        </Link>
      )}
    </>
  );
};
