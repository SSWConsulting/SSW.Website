import { useMemo, useState } from "react";
import {
  EventFilterCategories,
  NO_SELECTION,
} from "../components/filter/FilterBlock";
import { FilterGroupProps, Option } from "../components/filter/FilterGroup";
import { EventCategories as EventsCategories } from "../pages/events";

export const useEvents = (categories: EventFilterCategories) => {
  const [filterControls, setFilterControls] = useState<{
    technology: number;
    format: number;
  }>({ technology: NO_SELECTION, format: NO_SELECTION });

  const filters = useMemo<FilterGroupProps[]>(() => {
    const groups: FilterGroupProps[] = [
      {
        selected: filterControls.technology,
        setSelected: (value) =>
          setFilterControls((curr) => ({ ...curr, technology: value })),
        options: getOptions(categories.technologies),
        allText: "All Technology",
      },
      {
        selected: filterControls.format,
        setSelected: (value) =>
          setFilterControls((curr) => ({ ...curr, format: value })),
        options: getOptions(categories.categories),
        allText: "All Formats",
      },
    ];

    return groups;
  }, [filterControls]);
  return { filters };
};

const getOptions = (categories: EventsCategories): Option[] => {
  return Object.entries(categories).map(([category, count]) => {
    return {
      label: category,
      count,
    };
  });
};
