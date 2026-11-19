import { getLinkKind, opensInNewTab, safeHref } from "@/helpers/links";
import type { ReactNode } from "react";
import { FiExternalLink, FiMail, FiMapPin, FiYoutube } from "react-icons/fi";

type ContentLinkProps = {
  url: string;
  title?: string;
  children?: ReactNode;
};

// Sized in em (see styles.css), so the icon scales with the text around it,
// including large headings.
const ICON_CLASS = "content-link-icon";

// A word joiner: no line break is allowed on either side of it. Together with
// the nowrap span it keeps an icon on the same line as the word next to it,
// whatever the link text is.
const WORD_JOINER = "⁠";

/**
 * A link written in rich-text content. Links to outside sites open in a new
 * tab and get an icon, as per https://www.ssw.com.au/rules/indicate-external-links
 * and https://www.ssw.com.au/rules/use-icons-to-not-surprise-users: YouTube,
 * Google Maps and email links get their own icon before the text, any other
 * outside site gets an external-link icon after it. SSW's own sites stay in
 * the same tab with no icon. Menus and buttons don't render through rich
 * text, so they are unaffected.
 */
export const ContentLink = ({ url, title, children }: ContentLinkProps) => {
  const href = safeHref(url);
  const kind = getLinkKind(href);

  const LeadingIcon =
    kind === "youtube"
      ? FiYoutube
      : kind === "maps"
        ? FiMapPin
        : kind === "email"
          ? FiMail
          : null;

  const content = (
    <>
      {LeadingIcon && (
        <span className="whitespace-nowrap">
          <LeadingIcon aria-hidden="true" className={`${ICON_CLASS} mr-1`} />
          {WORD_JOINER}
        </span>
      )}
      {children}
      {kind === "external" && (
        <span className="whitespace-nowrap">
          {WORD_JOINER}
          <FiExternalLink aria-hidden="true" className={`${ICON_CLASS} ml-1`} />
        </span>
      )}
    </>
  );

  // A plain anchor, as before: content can link to paths this Next.js app
  // doesn't serve (files, other SSW apps), which client-side routing can't
  // handle.
  if (!opensInNewTab(kind)) {
    return (
      <a href={href} title={title}>
        {content}
      </a>
    );
  }

  return (
    <a href={href} title={title} target="_blank" rel="noopener">
      {content}
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
