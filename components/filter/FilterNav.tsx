"use client";

import { NO_SELECTION } from "./FilterBlock";
import type { FilterGroupProps } from "./FilterGroup";
import { sidebarNavItem } from "@/components/layout/stickySidebar";

const navItem = (isActive: boolean) =>
  sidebarNavItem(
    isActive,
    "w-full text-left max-md:min-h-0 max-md:w-auto max-md:shrink-0"
  );

// The themed sibling of FilterGroup, for pages using StickySidebarLayout.
// aria-pressed, not aria-current: these buttons filter the list in place, they
// do not navigate anywhere.
export const FilterNav = ({
  label,
  allText,
  options,
  selected,
  setSelected,
}: FilterGroupProps & { label: string }) => (
  <nav aria-label={label} className="not-first:mt-5 max-md:not-first:mt-2">
    <ul className="m-0 flex list-none flex-col gap-0.5 p-0 max-md:flex-row max-md:gap-2 max-md:overflow-x-auto max-md:whitespace-nowrap max-md:pb-0.5">
      <li>
        <button
          type="button"
          onClick={() => setSelected(NO_SELECTION)}
          aria-pressed={selected === NO_SELECTION}
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
            aria-pressed={selected === index}
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
