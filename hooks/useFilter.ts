export const NO_SELECTION = -1;

export const getFilterCount = (
  items: Record<string, string>[],
  filterOptions: {
    key: string;
    options: string[];
  }[]
) => {
  const counts = filterOptions.map(({ options, key }) => {
    return options?.map((option) => {
      return {
        label: option,
        count: items.filter((item) => item[key] === option).length,
      };
    });
  });

  return counts;
};

// export const useFilter = (
//   items: Record<string, string>[],
//   filterKeys: string[]
// ) => {
//   const [selected, setSelected] = useState<number[]>([]);

//   const toggle = (index: number) => {
//     if (selected.includes(index)) {
//       setSelected(selected.filter((i) => i !== index));
//     } else {
//       setSelected([...selected, index]);
//     }
//   };

//   return { selected, toggle };
// };
