"use client";

import { CustomLink } from "@/components/customLink";
import { Container } from "@/components/util/container";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import Image from "next/image";
import { useEffect, useState } from "react";

dayjs.extend(utc);
dayjs.extend(relativeTime);

const DEPLOYMENT_RULE_URL =
  "https://www.ssw.com.au/rules/rules-to-better-websites-deployment";

// isValid() is the guard that matters, not the null check: dayjs returns a
// truthy object for unparseable input, so a set-but-garbage env var would
// otherwise render "Invalid Date" (and toISOString() on it throws).
const rawBuildDate = process.env.NEXT_PUBLIC_GITHUB_RUN_DATE;
const parsedBuildDate = rawBuildDate ? dayjs.utc(rawBuildDate) : null;
const buildDate = parsedBuildDate?.isValid() ? parsedBuildDate : null;
const exact = buildDate?.format("D MMM YYYY [at] HH:mm UTC") ?? null;
const iso = buildDate?.toISOString();

const commitHash = process.env.NEXT_PUBLIC_GITHUB_SHA;
const repo = process.env.NEXT_PUBLIC_GITHUB_REPOSITORY;

type PoweredByItem = {
  label?: string | null;
  url?: string | null;
  icon?: string | null;
};

type DeploymentBannerProps = {
  poweredBy?: PoweredByItem[] | null;
};

export const DeploymentBanner = ({ poweredBy }: DeploymentBannerProps) => {
  // Relative time is resolved after mount, never during render. Every page is
  // `force-static`, so a server-rendered `.fromNow()` would be evaluated once
  // during the Docker build that also stamps NEXT_PUBLIC_GITHUB_RUN_DATE —
  // baking "a few seconds ago" into the HTML and leaving it there until the
  // next deploy. The absolute date renders first and is swapped on hydration.
  const [relative, setRelative] = useState<string | null>(null);
  useEffect(() => {
    if (!buildDate) return;
    setRelative(buildDate.fromNow());
  }, []);

  return (
    <div className="bg-sswDarkGray text-xs text-gray-400">
      <Container
        width="large"
        size="custom"
        className="flex flex-col items-start gap-4 py-4 md:flex-row md:items-center md:justify-between"
      >
        <p className="text-left">
          This website is under{" "}
          <CustomLink
            href={DEPLOYMENT_RULE_URL}
            className="unstyled font-medium text-gray-100 underline underline-offset-2 transition-colors hover:text-white"
          >
            continuous deployment
          </CustomLink>
          {buildDate && (
            <>
              {". Last updated "}
              <time
                dateTime={iso}
                title={`Last updated ${exact}`}
                className={cn(
                  "font-medium text-gray-100",
                  relative && "cursor-help"
                )}
              >
                {relative ?? exact}
              </time>
            </>
          )}
          {commitHash && repo && (
            <>
              {". Last commit "}
              <CustomLink
                href={`https://github.com/${repo}/commit/${commitHash}`}
                className="unstyled font-medium text-gray-100 transition-colors hover:text-white"
              >
                {commitHash.slice(0, 7)}
              </CustomLink>
            </>
          )}
          .
        </p>

        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {poweredBy?.map((item, index) => {
            const content = (
              <>
                {item.icon && (
                  <Image
                    src={item.icon}
                    alt=""
                    width={16}
                    height={16}
                    className="size-4 shrink-0 object-contain"
                  />
                )}
                <span className="font-semibold uppercase tracking-wider">
                  {item.label}
                </span>
              </>
            );

            return (
              <li
                key={(item.url ?? item.label ?? "") + index}
                className="flex items-center gap-1"
              >
                {item.url ? (
                  <CustomLink
                    href={item.url}
                    className="unstyled flex items-center gap-1 transition-colors hover:text-white"
                  >
                    {content}
                  </CustomLink>
                ) : (
                  content
                )}
              </li>
            );
          })}
        </ul>
      </Container>
    </div>
  );
};
