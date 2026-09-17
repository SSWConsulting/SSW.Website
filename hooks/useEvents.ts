import { useMemo, useState } from "react";
import {
  EventFilterCategories,
  NO_SELECTION,
} from "../components/filter/FilterBlock";
import { FilterGroupProps, Option } from "../components/filter/FilterGroup";
import { EventCategories } from "./useFetchEvents";

// `allText` doubles as the button label ("All Technology"), which reads badly
// as a landmark name, so the group carries its own name for aria-label.
export type EventFilterGroup = FilterGroupProps & { label: string };

export const useEvents = (categories: EventFilterCategories) => {
  const [filterControls, setFilterControls] = useState<{
    technology: number;
    format: number;
  }>({ technology: NO_SELECTION, format: NO_SELECTION });

  const filters = useMemo<EventFilterGroup[]>(() => {
    const groups: EventFilterGroup[] = [
      {
        label: "Technology",
        selected: filterControls.technology,
        setSelected: (value) =>
          setFilterControls((curr) => ({ ...curr, technology: value })),
        options: getOptions(categories.technologies),
        allText: "All Technology",
      },
      {
        label: "Format",
        selected: filterControls.format,
        setSelected: (value) =>
          setFilterControls((curr) => ({ ...curr, format: value })),
        options: getOptions(categories.categories),
        allText: "All Formats",
      },
    ];

    return groups;
  }, [filterControls, categories.categories, categories.technologies]);
  return { filters };
};

const getOptions = (categories: EventCategories): Option[] => {
  return Object.entries(categories).map(([category, count]) => {
    return {
      label: category,
      count,
    };
  });
};
