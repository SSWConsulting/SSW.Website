import { tinaField } from "tinacms/dist/react";

export const PillGroup = ({ data }) => {
  return (
    <div className="flex gap-2 py-2">
      {data.filledChipText && (
        <span
          data-tina-field={tinaField(data, "filledChipText")}
          className="rounded-md bg-neutral-600 px-2 py-1 text-xs font-light text-white"
        >
          {data.filledChipText}
        </span>
      )}
      {data.clearChipText && (
        <span
          data-tina-field={tinaField(data, "clearChipText")}
          className="px-2 py-1 text-xs font-light text-white"
        >
          {data.clearChipText}
        </span>
      )}
    </div>
  );
};

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
