"use client";

import { NO_SELECTION } from "@/components/filter/FilterBlock";
import type { FilterGroupProps } from "@/components/filter/FilterGroup";
import { cn } from "@/lib/utils";

// Matches /consulting's sidebar heading so the two pages stay in lockstep.
const headingClass =
  "text-xl font-semibold leading-tight max-md:text-lg xl:text-2xl";

// Active and inactive colours are mutually exclusive, never layered: adding
// `text-brand` on top of `dark:text-muted-foreground` loses in dark mode, since
// tailwind-merge keeps both and `.dark .dark:text-muted-foreground` outranks a
// bare `.text-brand` on specificity.
const navItem = (isActive: boolean) =>
  cn(
    "unstyled block w-full min-h-11 rounded-lg px-2.5 py-2 text-left text-base leading-tight no-underline transition-colors duration-150 motion-reduce:transition-none",
    // A ring, not `outline`: tailwind-merge drops the bare `outline` class,
    // leaving outline-style: none.
    "focus-visible:ring-2 focus-visible:ring-brand",
    "max-md:min-h-0 max-md:w-auto max-md:shrink-0 max-md:rounded-full max-md:border-0.75 max-md:border-hairline max-md:bg-gray-100 max-md:px-3 max-md:py-2.5 dark:max-md:bg-card",
    isActive
      ? "text-brand dark:text-brand"
      : "text-gray-600 hover:text-foreground dark:text-muted-foreground dark:hover:text-foreground"
  );

type FilterNavProps = FilterGroupProps & { label: string };

const FilterNav = ({
  label,
  allText,
  options,
  selected,
  setSelected,
}: FilterNavProps) => (
  <nav aria-label={label} className="not-first:mt-5 max-md:not-first:mt-2">
    <ul className="m-0 flex list-none flex-col gap-1.5 p-0 max-md:flex-row max-md:gap-2 max-md:overflow-x-auto max-md:whitespace-nowrap max-md:pb-0.5">
      <li>
        <button
          type="button"
          onClick={() => setSelected(NO_SELECTION)}
          // "location" is the ARIA value for current position within a flow,
          // which is what a selected filter expresses.
          aria-current={selected === NO_SELECTION ? "location" : undefined}
          className={navItem(selected === NO_SELECTION)}
        >
          {allText}
        </button>
      </li>
      {options?.map((option, index) => (
        <li key={`${label}-${option.label}`}>
          <button
            type="button"
            onClick={() => setSelected(index)}
            aria-current={selected === index ? "location" : undefined}
            className={navItem(selected === index)}
          >
            {option.label}{" "}
            <span className="text-sm opacity-60">({option.count})</span>
          </button>
        </li>
      ))}
    </ul>
  </nav>
);

type EventsSidebarProps = {
  title: string;
  groups: FilterGroupProps[];
  children: React.ReactNode;
  sidebarChildren?: React.ReactNode;
};

// The /events counterpart to /consulting's sticky category index. It is not
// FilterBlock: that one is shared with /clients and /opportunities, which are
// unthemed and lay the sidebar out as a plain flex column.
export const EventsSidebar = ({
  title,
  groups,
  children,
  sidebarChildren,
}: EventsSidebarProps) => (
  <div className="grid grid-cols-sidebar items-start gap-8 max-xl:grid-cols-sidebar-narrow max-md:grid-cols-1 max-md:gap-4">
    {/* A plain div, not <aside>: the <nav>s below are already their own
        landmarks, and wrapping only files the <h1> under "complementary". */}
    <div
      className={cn(
        "sticky top-headerOffset self-start",
        // top-0 on mobile: the scrim and backdrop-blur are there for cards to
        // slide underneath. Any offset leaves a gap that cards scroll through
        // in full view, above the bar rather than behind it.
        "max-md:top-0 max-md:z-15 max-md:-mx-3 max-md:border-b-0.75 max-md:border-hairline max-md:bg-sunken-scrim max-md:px-3 max-md:pb-2.5 max-md:pt-2 max-md:backdrop-blur"
      )}
    >
      <h1
        className={cn(
          headingClass,
          "m-0 whitespace-nowrap p-0 text-foreground max-md:mb-2"
        )}
      >
        {title}
      </h1>

      {groups?.length > 0 ? (
        groups.map((group, index) => (
          <FilterNav key={index} label={group.allText} {...group} />
        ))
      ) : (
        <p className="mt-5 text-muted-foreground">Loading...</p>
      )}

      {sidebarChildren && (
        <div className="mt-8 text-muted-foreground max-md:hidden">
          {sidebarChildren}
        </div>
      )}
    </div>

    <div className="min-w-0">{children}</div>
  </div>
);
