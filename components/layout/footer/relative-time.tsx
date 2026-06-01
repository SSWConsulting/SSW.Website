"use client";

import dayjs from "dayjs";
import { useEffect, useId, useState } from "react";

interface Props {
  buildDate?: string;
}

/**
 * Renders the relative deploy time (e.g. "3 days ago" / "in 2 minutes")
 * and ticks every 60s so it doesn't freeze in cached HTML. On hover or
 * keyboard focus it shows a custom tooltip with the exact UTC datetime.
 *
 * Uses dayjs (already extended globally in app/layout.tsx with utc +
 * relativeTime) so future timestamps render as "in X" — matches the
 * behaviour of the prior `dayjs.utc().fromNow()` call.
 *
 * Hydration: `now` is seeded with the build's timestamp on first render,
 * so server and client produce the same initial markup ("a few seconds
 * ago"). The useEffect then advances `now` to the real wall clock.
 *
 * Accessibility: focusable when a tooltip is present, aria-describedby
 * links the tooltip for screen readers, native `title` is a fallback.
 */
export function RelativeTime({ buildDate }: Props) {
  const buildTimestamp = buildDate ? new Date(buildDate).getTime() : Number.NaN;
  const [now, setNow] = useState<number>(buildTimestamp);
  const tooltipId = useId();

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(id);
  }, []);

  const d = buildDate ? dayjs.utc(buildDate) : null;
  if (!d?.isValid()) return <>XXX</>;

  const relative = d.from(dayjs(now));
  const tooltip = `Last updated ${d.format("D MMM YYYY [at] HH:mm UTC")}`;

  return (
    <span
      className="relative inline-block group cursor-help text-white hover:text-ssw-red focus-visible:text-ssw-red transition-all duration-300 ease-in-out"
      tabIndex={0}
      aria-describedby={tooltipId}
      title={tooltip}
    >
      {relative}
      <span
        id={tooltipId}
        role="tooltip"
        className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 px-2 py-1 bg-white text-gray-900 text-[11px] leading-none rounded whitespace-nowrap opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 pointer-events-none transition-opacity duration-150 shadow-md z-10"
      >
        {tooltip}
      </span>
    </span>
  );
}
