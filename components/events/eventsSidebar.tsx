"use client";

import { NO_SELECTION } from "@/components/filter/FilterBlock";
import type { FilterGroupProps } from "@/components/filter/FilterGroup";
import {
  StickySidebarLayout,
  sidebarNavItem,
} from "@/components/layout/stickySidebar";

// <button>s, not the <a>s /consulting uses: these filter in place rather than
// navigating, so they need the width and alignment an anchor gets by default.
const navItem = (isActive: boolean) =>
  sidebarNavItem(
    isActive,
    "w-full text-left max-md:min-h-0 max-md:w-auto max-md:shrink-0"
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
    <ul className="m-0 flex list-none flex-col gap-0.5 p-0 max-md:flex-row max-md:gap-2 max-md:overflow-x-auto max-md:whitespace-nowrap max-md:pb-0.5">
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
  // Mounted in the sidebar on desktop and at the foot of the content column on
  // mobile, both by StickySidebarLayout.
  promo?: React.ReactNode;
  children: React.ReactNode;
};

// The /events counterpart to /consulting's sticky category index. It is not
// FilterBlock: that one is shared with /clients and /opportunities, which are
// unthemed and lay the sidebar out as a plain flex column.
export const EventsSidebar = ({
  title,
  groups,
  promo,
  children,
}: EventsSidebarProps) => (
  <StickySidebarLayout
    title={title}
    promo={promo}
    sidebar={groups?.map((group, index) => (
      <FilterNav key={index} label={group.allText} {...group} />
    ))}
  >
    {children}
  </StickySidebarLayout>
);
