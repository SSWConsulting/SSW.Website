import { useMemo, useState } from "react";
import { NO_SELECTION } from "../components/filter/FilterBlock";
import { FilterGroupProps } from "../components/filter/FilterGroup";
import { EventInfo } from "../services/server/events";

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

  const filters = useMemo<FilterGroupProps[]>(() => {
    if (!events) return [];

    const groups: FilterGroupProps[] = [
      {
        selected: filterControls.technology,
        setSelected: (value) =>
          setFilterControls((curr) => ({ ...curr, technology: value })),
        options: options.categories,
        allText: "All Technology",
      },
      {
        selected: filterControls.format,
        setSelected: (value) =>
          setFilterControls((curr) => ({ ...curr, format: value })),
        options: options.formats,
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
  }, [events, options.categories, options.formats, filterControls]);

  return { filters, filteredEvents };
};
