import Link from "next/link";
import React, { PropsWithChildren, useEffect, useState } from "react";

interface CustomLinkProps extends PropsWithChildren {
  href: string;
  target?: string;
  className?: string;
  title?: string;
}

const externalSSWSitePatterns = [
  "https://ssw.com.au/people/*",
  "https://ssw.com.au/rules/*",
  "https://ssw.com.au/ssw/*",
  "https://www.ssw.com.au/people/*",
  "https://www.ssw.com.au/rules/*",
  "https://www.ssw.com.au/ssw/*",
];
export const CustomLink: React.FC<CustomLinkProps> = ({
  href,
  target,
  className,
  children,
  title,
  ...props
}) => {
  const [isExternal, setIsExternal] = useState(false);

  const isExternalLink = (): boolean => {
    // i.e. href = https://anydomain.com.au => true | href = https://ssw.com.au/rule/* => true for SSW External Site | href = /company => false for relative path
    return (
      isExternalSSWSite() ||
      (href.startsWith("https://") && !href.includes("ssw.com.au")) // checking relative path and external domains i.e. /company
    );
  };

  const isExternalSSWSite = (): boolean => {
    return externalSSWSitePatterns.some((pattern) =>
      new RegExp(`^${pattern}`).test(href)
    );
  };

  useEffect(() => {
    console.log(href, " - ", isExternalLink());
    setIsExternal(isExternalLink());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [href]);

  return (
    <>
      {isExternal ? (
        <a
          className={className}
          href={href}
          target={target || "_blank"}
          rel="noopener noreferrer nofollow"
          title={title}
          {...props}
        >
          {children}
        </a>
      ) : (
        <Link className={className} href={href} title={title} {...props}>
          {children}
        </Link>
      )}
    </>
  );
};
