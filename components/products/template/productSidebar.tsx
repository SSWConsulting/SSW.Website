"use client";

import RippleButton from "@/components/button/rippleButtonV2";
import { TweetEmbed } from "@/components/embeds/tweetEmbed";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { BiRightArrowAlt } from "react-icons/bi";
import { FaPlay } from "react-icons/fa";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown, type TinaMarkdownContent } from "tinacms/dist/rich-text";
import { newTabProps } from "./externalLink";

// Official badge artwork is pinned here rather than being a CMS field, so an
// author can't substitute a non-compliant badge. The aspect ratios differ
// between the two stores, so each sits in a fixed-height box and scales to fit.
const APP_STORE_BADGE = "/images/products/app-store.svg";
const GOOGLE_PLAY_BADGE = "/images/products/play-store-banner.png";

type Link = { label?: string | null; href?: string | null };

const noticeComponents = {
  p: (props) => <p {...props} className="m-0 mt-1 text-muted-foreground" />,
};

export type ProductSidebarData = {
  notice?: {
    heading?: string | null;
    text?: TinaMarkdownContent | TinaMarkdownContent[] | null;
  } | null;
  primaryCta?: Link | null;
  secondaryCta?: Link | null;
  appStore?: string | null;
  googlePlay?: string | null;
  subPages?: (Link | null)[] | null;
  embed?: { type?: string | null; url?: string | null } | null;
};

type ProductSidebarProps = {
  productName: string;
  data?: ProductSidebarData | null;
};

// Nothing in the sidebar should point at the page it is being rendered on:
// a red CTA that reloads the current page looks broken, and a nav entry that
// links to itself is a dead end. Trailing slashes are normalised because the
// hrefs come from content and `usePathname` never has one.
const trimSlash = (value: string) => value.replace(/\/+$/, "") || "/";

const isCurrentPage = (href: string | null | undefined, pathname: string) =>
  Boolean(href) && trimSlash(href as string) === trimSlash(pathname);

const navItem = cn(
  "unstyled flex min-h-9 items-center justify-between gap-2 rounded-utility px-2.5 py-2",
  "text-base text-foreground no-underline transition-colors duration-300 hover:bg-gray-100 motion-reduce:transition-none dark:hover:bg-card",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
);

const StoreBadge = ({
  href,
  src,
  alt,
}: {
  href: string;
  src: string;
  alt: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="unstyled relative h-11 no-underline"
  >
    <Image
      src={src}
      alt={alt}
      fill
      sizes="160px"
      className="!my-0 object-contain"
    />
  </a>
);

export const ProductSidebar = ({ productName, data }: ProductSidebarProps) => {
  const pathname = usePathname();
  // The page you are on is left out entirely, so a sub-page whose only entry is
  // itself shows no Explore list at all.
  const subPages = (data?.subPages ?? []).filter(
    (page): page is Link =>
      Boolean(page?.label && page?.href) && !isCurrentPage(page?.href, pathname)
  );
  const hasStores = Boolean(data?.appStore || data?.googlePlay);
  const embedUrl = data?.embed?.url;
  const showPrimary =
    Boolean(data?.primaryCta?.href) &&
    !isCurrentPage(data?.primaryCta?.href, pathname);
  const showSecondary =
    Boolean(data?.secondaryCta?.href) &&
    !isCurrentPage(data?.secondaryCta?.href, pathname);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-3 rounded-card border-0.75 border-hairline bg-white p-6 shadow-md dark:bg-sswCard">
        <h2 className="m-0 p-0 text-xl font-semibold leading-tight text-foreground">
          {productName}
        </h2>

        {(data?.notice?.heading || data?.notice?.text) && (
          <div
            data-tina-field={tinaField(data.notice)}
            className="rounded-xl bg-brand-subtle p-4 text-sm leading-relaxed text-foreground"
          >
            {data.notice.heading && (
              <p className="m-0 font-semibold">{data.notice.heading}</p>
            )}
            {data.notice.text && (
              <TinaMarkdown
                content={data.notice.text}
                components={noticeComponents}
              />
            )}
          </div>
        )}

        {data?.primaryCta?.label && showPrimary && (
          <RippleButton
            variant="primary"
            href={data.primaryCta.href}
            {...newTabProps(data.primaryCta.href)}
            textTinaField={tinaField(data.primaryCta, "label")}
            className="flex min-h-12 w-full px-5 py-3.5 text-base font-semibold"
          >
            {data.primaryCta.label}
          </RippleButton>
        )}

        {data?.secondaryCta?.label && showSecondary && (
          <RippleButton
            variant="secondary"
            href={data.secondaryCta.href}
            {...newTabProps(data.secondaryCta.href)}
            textTinaField={tinaField(data.secondaryCta, "label")}
            // The shared secondary variant is tuned for dark backgrounds
            // (gray-300 on transparent), which disappears on the light card.
            className={cn(
              "flex min-h-12 w-full px-5 py-3.5 text-base font-semibold",
              "border-1.5 border-stroke-strong text-foreground",
              "hover:border-brand hover:bg-transparent hover:text-brand"
            )}
          >
            <FaPlay className="size-3" />
            {data.secondaryCta.label}
          </RippleButton>
        )}

        {hasStores && (
          <div className="grid grid-cols-2 items-center gap-3">
            {data?.appStore && (
              <StoreBadge
                href={data.appStore}
                src={APP_STORE_BADGE}
                alt={`Download ${productName} on the App Store`}
              />
            )}
            {data?.googlePlay && (
              <StoreBadge
                href={data.googlePlay}
                src={GOOGLE_PLAY_BADGE}
                alt={`Get ${productName} on Google Play`}
              />
            )}
          </div>
        )}

        {data?.googlePlay && (
          // Google's brand guidelines ask for this wherever the badge appears.
          <p className="m-0 text-xs text-muted-foreground">
            Google Play and the Google Play logo are trademarks of Google LLC.
          </p>
        )}
      </div>

      {/* Sub-pages and outbound links only - the product page itself is the
          hero above, so a self-referencing "Overview" entry earned nothing. */}
      {subPages.length > 0 && (
        <nav
          aria-label={`Explore ${productName}`}
          className="flex flex-col gap-1"
        >
          <span className="px-2.5 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Explore
          </span>
          {subPages.map((page, index) => (
            <a
              key={`product-sub-page-${index}`}
              href={page.href ?? undefined}
              {...newTabProps(page.href)}
              data-tina-field={tinaField(page, "label")}
              className={navItem}
            >
              {page.label}
              <BiRightArrowAlt className="size-5 shrink-0 opacity-70" />
            </a>
          ))}
        </nav>
      )}

      {embedUrl && (
        <div className="flex flex-col gap-3">
          <span className="px-2.5 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Social Media
          </span>
          {data?.embed?.type === "short" ? (
            <iframe
              src={embedUrl}
              title={`${productName} on YouTube Shorts`}
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              // 9/16 has no token in the scale and arbitrary values are banned,
              // so the ratio is set directly rather than through a utility.
              style={{ aspectRatio: "9 / 16" }}
              className="w-full rounded-card border-0.75 border-hairline"
            />
          ) : (
            // Reserve the frame: TweetEmbed fetches on mount and renders
            // nothing until it resolves, which would otherwise shift the
            // sticky sidebar as the page settles.
            <div className="aspect-4/3 overflow-y-auto rounded-card border-0.75 border-hairline">
              <TweetEmbed url={embedUrl} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
