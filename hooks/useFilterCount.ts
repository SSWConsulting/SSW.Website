export const NO_SELECTION = -1;

const getFilterCount = (
  items: Record<string, string>[],
  keys: string[],
  selected: string[],
  options: string[][]
): number[][] => {
  const counts = options.map((option, index) => {
    return option.map((format) => {
      return items.filter((item) => {
        const primary = item[keys[index]] === format;

        let secondary = true;
        for (let i = 0; i < keys.length; i++) {
          if (i === index) continue;
          secondary = secondary && item[keys[i]] === selected[i];
        }
        return primary && secondary;
      }).length;
    });
  });

  return counts;
};

const keys = ["CalendarType", "Category_f5a9cf4c_x002d_8228_x00"];

const selected = ["format1", "category1"];
const options = [
  ["format1", "format2"],
  ["category1", "category2"],
];

console.log(
  getFilterCount(
    [
      {
        name: "hello there 1",
        CalendarType: "format1",
        Category_f5a9cf4c_x002d_8228_x00: "category1",
      },
      {
        name: "hello there 2",
        CalendarType: "format1",
        Category_f5a9cf4c_x002d_8228_x00: "category2",
      },
      {
        name: "hello there 3",
        CalendarType: "format2",
        Category_f5a9cf4c_x002d_8228_x00: "category1",
      },
      {
        name: "hello there 4",
        CalendarType: "format2",
        Category_f5a9cf4c_x002d_8228_x00: "category2",
      },
    ],
    keys,
    selected,
    options
  )
);
