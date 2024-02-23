import { useMemo, useState } from "react";
import { NO_SELECTION } from "../components/filter/FilterBlock";
import { FilterGroupProps } from "../components/filter/FilterGroup";
import { EventInfo } from "../services/server/events";
import { getFilterCount } from "./useFilterCount";

export const useEvents = (events: EventInfo[]) => {
  const [filterControls, setFilterControls] = useState<{
    technology: number;
    format: number;
  }>({ technology: NO_SELECTION, format: NO_SELECTION });

  const options = useMemo(() => {
    const categories =
      events
        ?.map((event) => event.Category_f5a9cf4c_x002d_8228_x00)
        ?.filter((value, index, self) => self.indexOf(value) === index)
        ?.sort() || [];

    const formats =
      events
        ?.map((event) => event.CalendarType)
        ?.filter((value, index, self) => self.indexOf(value) === index)
        ?.sort() || [];

    return { categories, formats };
  }, [events]);

  const filterCounts = useMemo(() => {
    return getFilterCount(
      events.map((event) => ({
        Title: event.Title,
        CalendarType: event.CalendarType,
        Category: event.Category_f5a9cf4c_x002d_8228_x00,
      })),
      [
        {
          key: "CalendarType",
          selected: filterControls.format,
          options: options.formats,
        },
        {
          key: "Category",
          selected: filterControls.technology,
          options: options.categories,
        },
      ]
    );
  }, [events, filterControls, options.formats, options.categories]);

  const filters = useMemo<FilterGroupProps[]>(() => {
    if (!events) return [];

    const groups: FilterGroupProps[] = [
      {
        selected: filterControls.technology,
        setSelected: (value) =>
          setFilterControls((curr) => ({ ...curr, technology: value })),
        options: filterCounts[1],
        allText: "All Technology",
      },
      {
        selected: filterControls.format,
        setSelected: (value) =>
          setFilterControls((curr) => ({ ...curr, format: value })),
        options: filterCounts[0],
        allText: "All Formats",
      },
    ];

    return groups;
  }, [events, filterControls, filterCounts]);

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

  return { filters, filteredEvents, filterCounts };
};
