export const NO_SELECTION = -1;

export const getFilterCount = (
  items: Record<string, string>[],
  filterOptions: {
    key: string;
    selected: number;
    options: string[];
  }[]
) => {
  const counts = filterOptions.map(({ options, key }, index) => {
    return options?.map((option) => {
      return {
        label: option,
        count: items.filter((item) => {
          const primary = item[key] === option;

          if (!primary) return false;

          let secondary = true;
          for (let i = 0; i < filterOptions.length; i++) {
            if (!secondary) break;
            if (i === index) continue;

            const key = filterOptions[i].key;
            const selected =
              filterOptions[i].options[filterOptions[i].selected];

            secondary =
              (secondary && item[key] === selected) ||
              filterOptions[i].selected === NO_SELECTION;
          }

          return primary && secondary;
        }).length,
      };
    });
  });

  return counts;
};

// const keys = ["CalendarType", "Category_f5a9cf4c_x002d_8228_x00"];

// const selected = ["format1", "category1"];
// const options = [
//   ["format1", "format2"],
//   ["category1", "category2"],
// ];

// console.log(
//   getFilterCount(
//     [
//       {
//         name: "hello there 1",
//         CalendarType: "format1",
//         Category_f5a9cf4c_x002d_8228_x00: "category1",
//       },
//       {
//         name: "hello there 2",
//         CalendarType: "format1",
//         Category_f5a9cf4c_x002d_8228_x00: "category2",
//       },
//       {
//         name: "hello there 3",
//         CalendarType: "format2",
//         Category_f5a9cf4c_x002d_8228_x00: "category1",
//       },
//       {
//         name: "hello there 4",
//         CalendarType: "format2",
//         Category_f5a9cf4c_x002d_8228_x00: "category2",
//       },
//     ],
//     keys,
//     selected,
//     options
//   )
// );
