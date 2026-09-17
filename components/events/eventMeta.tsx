import { cn } from "@/lib/utils";
import React from "react";

// Shared by the /events index cards (components/filter/events.tsx) and the v3
// home Upcoming Events block (components/blocks/v3/events/events.tsx), which
// had grown their own copies of both of these.

export const EventMetaItem = ({
  icon: Icon,
  label,
  tinaFieldValue,
  className,
  children,
}: {
  icon: React.ElementType;
  label?: string;
  tinaFieldValue?: string;
  className?: string;
  children: React.ReactNode;
}) => {
  if (!children) return null;

  return (
    <span
      data-tina-field={tinaFieldValue}
      className={cn("flex min-w-0 items-center gap-2", className)}
    >
      <Icon aria-hidden className="size-4 shrink-0" />
      {label && <span className="sr-only">{label}: </span>}
      <span className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
        {children}
      </span>
    </span>
  );
};

export const DaysToGoBadge = ({ children }: { children: React.ReactNode }) => {
  if (!children) return null;

  return (
    <span className="inline-flex shrink-0 items-center rounded-sm bg-sswRed px-1.5 pb-px pt-0.5 text-xs font-semibold uppercase leading-none text-white">
      {children}
    </span>
  );
};
