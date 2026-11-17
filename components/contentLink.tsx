import { getLinkKind, safeHref } from "@/helpers/links";
import Link from "next/link";
import type { ReactNode } from "react";
import { FiExternalLink, FiMapPin, FiYoutube } from "react-icons/fi";

type ContentLinkProps = {
  url: string;
  title?: string;
  children?: ReactNode;
};

const ICON_CLASS = "content-link-icon inline size-3.5 align-baseline";

/**
 * A link written in rich-text content. Links to other sites open in a new tab
 * and get an icon, as per https://www.ssw.com.au/rules/indicate-external-links
 * and https://www.ssw.com.au/rules/use-icons-to-not-surprise-users: YouTube
 * and Google Maps get their own icon before the text, any other site gets an
 * external-link icon after it. Menus and buttons don't render through rich
 * text, so they are unaffected.
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

  return (
    <a
      href={href}
      title={title}
      target="_blank"
      rel={kind === "branded" ? "noopener" : "noopener noreferrer nofollow"}
    >
      {kind === "youtube" && (
        <FiYoutube aria-hidden="true" className={`${ICON_CLASS} mr-1`} />
      )}
      {kind === "maps" && (
        <FiMapPin aria-hidden="true" className={`${ICON_CLASS} mr-1`} />
      )}
      {children}
      {kind === "external" && (
        <FiExternalLink aria-hidden="true" className={`${ICON_CLASS} ml-1`} />
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
