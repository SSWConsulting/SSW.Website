"use client";

import { NO_SELECTION } from "@/components/filter/FilterBlock";
import type { FilterGroupProps } from "@/components/filter/FilterGroup";
import {
  StickySidebarLayout,
  sidebarNavItem,
} from "@/components/layout/stickySidebar";

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
  promo?: React.ReactNode;
  children: React.ReactNode;
};

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
