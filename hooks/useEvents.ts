import { EventTrimmed } from "@/components/filter/events";
import { useMemo, useState } from "react";
import { NO_SELECTION } from "../components/filter/FilterBlock";
import { FilterGroupProps } from "../components/filter/FilterGroup";

export const useEvents = (events: EventTrimmed[]) => {
  const [filterControls, setFilterControls] = useState<{
    technology: number;
    format: number;
  }>({ technology: NO_SELECTION, format: NO_SELECTION });

  const options = useMemo(() => {
    const categoryCount: Record<string, number> = events?.reduce(
      (acc, event) => {
        acc[event.Category_f5a9cf4c_x002d_8228_x00] =
          (acc[event.Category_f5a9cf4c_x002d_8228_x00] || 0) + 1;
        return acc;
      },
      {}
    );

    const categories = Object.keys(categoryCount || {})?.sort() || [];

    const formatCount: Record<string, number> = events?.reduce((acc, event) => {
      acc[event.CalendarType] = (acc[event.CalendarType] || 0) + 1;
      return acc;
    }, {});

    const formats = Object.keys(formatCount || {}).sort();

    return { categories, categoryCount, formats, formatCount };
  }, [events]);

  const filters = useMemo<FilterGroupProps[]>(() => {
    if (!events) return [];

    const groups: FilterGroupProps[] = [
      {
        selected: filterControls.technology,
        setSelected: (value) =>
          setFilterControls((curr) => ({ ...curr, technology: value })),
        options: options.categories.map((category) => ({
          label: category,
          count: options.categoryCount[category],
        })),
        allText: "All Technology",
      },
      {
        selected: filterControls.format,
        setSelected: (value) =>
          setFilterControls((curr) => ({ ...curr, format: value })),
        options: options.formats.map((format) => ({
          label: format,
          count: options.formatCount[format],
        })),
        allText: "All Formats",
      },
    ];

    return groups;
  }, [events, filterControls, options]);

  const filteredEvents = useMemo(() => {
    return events?.filter(
      (event) =>
        (filterControls.technology === NO_SELECTION ||
          event.Category_f5a9cf4c_x002d_8228_x00 ===
            options.categories[filterControls.technology]) &&
        (filterControls.format === NO_SELECTION ||
          event.CalendarType === options.formats[filterControls.format])
    );
  }, [events, filterControls, options.categories, options.formats]);

  return { filters, filteredEvents };
};
