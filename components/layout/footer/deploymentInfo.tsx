"use client";

import { CustomLink } from "@/components/customLink";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import { useEffect, useState } from "react";

// Extended locally, not in app/layout.tsx — a layout-level extend has twice
// been stripped as unused, breaking `.fromNow()`. extend() is idempotent.
dayjs.extend(relativeTime);
dayjs.extend(utc);

const commitHash = process.env.NEXT_PUBLIC_GITHUB_SHA;
const repo = process.env.NEXT_PUBLIC_GITHUB_REPOSITORY;

// isValid() is the guard that matters, not the null check: dayjs returns a
// truthy object for unparseable input, and toISOString() on it throws. This
// sits in the root layout, so an unguarded throw fails the whole build.
const rawBuildDate = process.env.NEXT_PUBLIC_GITHUB_RUN_DATE;
const parsedBuildDate = rawBuildDate ? dayjs.utc(rawBuildDate) : null;
const buildDate = parsedBuildDate?.isValid() ? parsedBuildDate : null;
const exact = buildDate?.format("D MMM YYYY [at] HH:mm UTC") ?? null;
const iso = buildDate?.toISOString();

const LINK_CLASS =
  "font-medium text-gray-300 transition-colors hover:text-white";

export const DeploymentInfo = ({ className }: { className?: string }) => {
  // Client-side only: pages are `force-static`, so a server-rendered relative
  // time would bake "a few seconds ago" in at build and freeze there. The
  // absolute date renders first and is swapped on hydration.
  const [relative, setRelative] = useState<string | null>(null);
  useEffect(() => {
    if (!buildDate) return;
    setRelative(buildDate.fromNow());
  }, []);

  return (
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
          {/* title, not a positioned tooltip — the old one overflowed on
              mobile (#4826). */}
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
