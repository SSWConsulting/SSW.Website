import { tinaField } from "tinacms/dist/react";

// export const PillGroup = ({ data }) => {
//   return (
//     <div className="flex gap-2 py-2">
//       {data.filledChipText && (
//         <span
//           data-tina-field={tinaField(data, "filledChipText")}
//           className="rounded-md bg-neutral-600 px-2 py-1 text-xs font-light text-white"
//         >
//           {data.filledChipText}
//         </span>
//       )}
//       {data.clearChipText && (
//         <span
//           data-tina-field={tinaField(data, "clearChipText")}
//           className="px-2 py-1 text-xs font-light text-white"
//         >
//           {data.clearChipText}
//         </span>
//       )}
//     </div>
//   );
// };

export const pillGroupSchema = [
  {
    type: "string",
    label: "Filled Chip",
    name: "filledChipText",
    description: "Text for the filled chip.",
  },
  {
    type: "string",
    label: "Clear Chip",
    name: "clearChipText",
    description: "Text for the clear chip.",
  },
];

export const PillGroup = ({ data }) => {
  return (
    <div className="flex gap-2 py-2">
      {data.chips?.map((chip, index) => {
        <span
          key={index}
          data-tina-field={tinaField(data, `chips[${index}].chipText`)}
          className={
            chip.chipType === "filledChip"
              ? "rounded-md bg-neutral-600 px-2 py-1 text-xs font-light text-white"
              : "px-2 py-1 text-xs font-light text-white"
          }
        >
          {chip.chipText}
        </span>;
      })}
    </div>
  );
};

export const pillGroupSchemaV2 = [
  {
    type: "string",
    label: "Chip text",
    name: "chipText",
    description: "Text for the chip",
  },
  {
    type: "string",
    label: "Select chip type",
    name: "chipType",
    description: "Type of the chip (filled or clear)",
    ui: {
      component: "select",
      options: [
        {
          label: "Filled Chip",
          value: "filledChip",
        },
        {
          label: "Clear Chip",
          value: "clearChip",
        },
      ],
    },
  },
];
