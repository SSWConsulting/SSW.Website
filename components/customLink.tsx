"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
    isExternalSSWSite(href) ||
    (href?.startsWith("https://") && !href.includes("ssw.com.au")) // checking relative path and external domains i.e. /company
  );
};

const isExternalSSWSite = (href: string): boolean => {
  const externalSSWSitePatterns =
    /^(https:\/\/(?:www\.)?ssw\.com\.au\/(?:people|rules|ssw)(?:\/|$))/i;
  return externalSSWSitePatterns.test(href);
};

const isTinaSite = (href: string): boolean => {
  const tinaSitePatterns = /^(https:\/\/(?:www\.)?tina\.io(?:\/|$))/i;
  return tinaSitePatterns.test(href);
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
  const isAnSSWBrandedSite = isExternalSSWSite(href) || isTinaSite(href);

  const path = usePathname();
  const isHomePage = path === "/"; // Check if current page is the homepage

  if (!href) return <>{children}</>;
  return (
    <>
      {isExternal ? (
        <a
          className={className}
          href={href}
          target={target || "_blank"}
          rel={isAnSSWBrandedSite ? "" : "noopener noreferrer nofollow"}
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
          prefetch={!isHomePage}
        >
          {children}
        </Link>
      )}
    </>
  );
};
