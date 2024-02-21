import { useMemo } from "react";

export const useFilterCount = (items: string[], keys: string[]): number[] => {
  return [];
};

const getFilterCount = (
  items: string[],
  itemLists: string[][],
  keys: string[],
  selected: number[]
): number[] => {
  keys.forEach((key, index) => {
    console.log(key);
  });

  return [
    opportunities.filter(
      (o) =>
        o.locations.includes(location) &&
        o.employmentType == employmentType[selectedType] &&
        o.status === jobStatus[selectedStatus]
    ).length,
    opportunities.filter(
      (o) =>
        o.locations.includes(locations[selectedLocation]) &&
        o.employmentType === type &&
        o.status === jobStatus[selectedStatus]
    ).length,
    opportunities.filter(
      (o) =>
        o.locations.includes(locations[selectedLocation]) &&
        o.employmentType == employmentType[selectedType] &&
        o.status === status
    ).length,
  ];
};
