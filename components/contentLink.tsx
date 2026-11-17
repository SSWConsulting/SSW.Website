import { getLinkKind, safeHref } from "@/helpers/links";
import Link from "next/link";
import type { ReactNode } from "react";
import { FiExternalLink } from "react-icons/fi";

type ContentLinkProps = {
  url: string;
  title?: string;
  children?: ReactNode;
};

/**
 * A link written in rich-text content. Links to other sites open in a new tab
 * and get an external-link icon, as per
 * https://www.ssw.com.au/rules/indicate-external-links. Menus and buttons
 * don't render through rich text, so they are unaffected.
 */
export const ContentLink = ({ url, title, children }: ContentLinkProps) => {
  const href = safeHref(url);
  const kind = getLinkKind(href);

  if (kind === "internal") {
    // prefetch={false} keeps today's behaviour: content links were plain
    // anchors, so they never prefetched.
    return (
      <Link href={href} title={title} prefetch={false}>
        {children}
      </Link>
    );
  }

  if (kind === "other") {
    return (
      <a href={href} title={title}>
        {children}
      </a>
    );
  }

  const isExternal = kind === "external";
  return (
    <a
      href={href}
      title={title}
      target="_blank"
      rel={isExternal ? "noopener noreferrer nofollow" : "noopener"}
    >
      {children}
      {isExternal && (
        <FiExternalLink
          aria-hidden="true"
          className="content-link-icon ml-1 inline size-3.5 align-baseline"
        />
      )}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
};

/**
 * Spread into a TinaMarkdown `components` map (or pass it on its own) so the
 * rich text's links render through ContentLink.
 */
export const contentLinkComponents = {
  a: (props: ContentLinkProps) => <ContentLink {...props} />,
};
