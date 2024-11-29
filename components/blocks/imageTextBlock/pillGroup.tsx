import { tinaField } from "tinacms/dist/react";

export const PillGroup = ({ data }) => {
  return (
    <div className="flex gap-1">
      {data.filledChipText && (
        <span data-tina-field={tinaField(data, "filledChipText")}>
          {data.filledChipText}
        </span>
      )}
      {data.clearChipText && (
        <span data-tina-field={tinaField(data, "clearChipText")}>
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
