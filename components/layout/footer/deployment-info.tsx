"use client";

import { CustomLink } from "@/components/customLink";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import { useEffect, useState } from "react";

// Extended here rather than in app/layout.tsx on purpose. The previous version
// of this component relied on the layout extending `relativeTime`, so when the
// component was removed in #4827 the plugin looked unused and was stripped in
// #4925 — leaving `.fromNow()` primed to throw if anyone restored it (see the
// original fix in #926). Owning the dependency locally keeps the two together.
// dayjs.extend is idempotent, so re-extending is safe.
dayjs.extend(relativeTime);
dayjs.extend(utc);

const commitHash = process.env.NEXT_PUBLIC_GITHUB_SHA;
const repo = process.env.NEXT_PUBLIC_GITHUB_REPOSITORY;

// Resolved once at module scope. NEXT_PUBLIC_* values are inlined at build
// time and cannot change, so there is nothing to recompute per render.
//
// isValid() is the guard that matters, not the null check: dayjs returns a
// truthy object for unparseable input, and calling toISOString() on it throws
// RangeError. This component sits in the root layout of a force-static site,
// so an unguarded throw would fail the entire build rather than one page.
const rawBuildDate = process.env.NEXT_PUBLIC_GITHUB_RUN_DATE;
const parsedBuildDate = rawBuildDate ? dayjs.utc(rawBuildDate) : null;
const buildDate = parsedBuildDate?.isValid() ? parsedBuildDate : null;
const exact = buildDate?.format("D MMM YYYY [at] HH:mm UTC") ?? null;
const iso = buildDate?.toISOString();

const LINK_CLASS =
  "font-medium text-gray-300 transition-colors hover:text-white";

export const DeploymentInfo = ({ className }: { className?: string }) => {
  // Resolved after mount, never during render. Every page is `force-static`,
  // so a relative time computed on the server would be evaluated once during
  // the Docker build that also stamps NEXT_PUBLIC_GITHUB_RUN_DATE — baking
  // "a few seconds ago" into the HTML and leaving it there until the next
  // deploy. The absolute date renders server-side and is swapped for the
  // relative one on hydration, so the first paint is correct rather than
  // merely plausible.
  const [relative, setRelative] = useState<string | null>(null);
  useEffect(() => {
    if (!buildDate) return;
    setRelative(buildDate.fromNow());
  }, []);

  return (
    // text-pretty keeps the last line from collapsing to a single orphan word,
    // which this sentence is prone to since its length shifts with the relative
    // build time ("2 days ago" vs "about a minute ago").
    <div className={cn("text-pretty text-gray-400", className)}>
      This website is under{" "}
      <CustomLink
        href="https://www.ssw.com.au/rules/rules-to-better-websites-deployment"
        className={LINK_CLASS}
      >
        continuous deployment
      </CustomLink>
      {buildDate && (
        <>
          . Last updated{" "}
          {/* <time> rather than a span so the exact instant is machine-readable
              and reaches keyboard and touch users, who never see a title
              tooltip. A positioned tooltip element is deliberately avoided —
              the old one caused horizontal overflow on mobile (#4826). */}
          <time
            dateTime={iso}
            title={exact ?? undefined}
            className={cn(
              "font-medium text-gray-300",
              relative && "cursor-help"
            )}
          >
            {relative ?? exact}
          </time>
        </>
      )}
      {commitHash && repo && (
        <>
          . Last commit{" "}
          <CustomLink
            href={`https://github.com/${repo}/commit/${commitHash}`}
            className={LINK_CLASS}
          >
            {commitHash.slice(0, 7)}
          </CustomLink>
        </>
      )}
      .
    </div>
  );
};
