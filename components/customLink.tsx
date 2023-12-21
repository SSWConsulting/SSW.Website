import Link from "next/link";
import React, { PropsWithChildren } from "react";

interface CustomLinkProps extends PropsWithChildren {
  href: string;
  target?: string;
  className?: string;
  title?: string;
  style?: React.CSSProperties;
}

const externalSSWSitePatterns =
  /^(https:\/\/(?:www\.)?ssw\.com\.au\/(?:people|rules|ssw)(?:\/|$))/i;

const isExternalLink = (href: string): boolean => {
  // i.e. href = https://anydomain.com.au => true | href = https://ssw.com.au/rule/* => true for SSW External Site | href = /company => false for relative path
  return (
    isExternalSSWSite(href) ||
    (href.startsWith("https://") && !href.includes("ssw.com.au")) // checking relative path and external domains i.e. /company
  );
};

const isExternalSSWSite = (href: string): boolean => {
  return externalSSWSitePatterns.test(href);
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

  const rel =
    isExternal && !href.includes("ssw") ? "noopener noreferrer nofollow" : "";

  return (
    <>
      {isExternal ? (
        <a
          className={className}
          href={href}
          target={target || "_blank"}
          rel={rel}
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
        >
          {children}
        </Link>
      )}
    </>
  );
};
