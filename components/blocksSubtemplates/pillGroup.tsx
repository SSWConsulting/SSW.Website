import { tinaField } from "tinacms/dist/react";

export const PillGroup = ({ data }) => {
  return (
    <div className="flex flex-wrap gap-2 py-2">
      {data?.map(
        (chip, index) =>
          chip?.chipText && (
            <span
              key={index}
              data-tina-field={tinaField(chip, "chipText")}
              className={
                chip.chipType === "filledChip"
                  ? "rounded-md bg-neutral-600 px-2 py-1 text-xs font-light text-white"
                  : "px-2 py-1 text-xs font-light text-white"
              }
            >
              {chip.chipText}
            </span>
          )
      )}
    </div>
  );
};

export const pillGroupSchema = [
  {
    type: "string",
    label: "Chip text",
    name: "chipText",
    description: "Max 30 characters.",
    ui: {
      validate: (value: string) => {
        const lenghtOfText = value?.length || 0;
        if (lenghtOfText > 30) {
          return "Chip text should be less than 30 characters.";
        }
      },
    },
  },
  {
    type: "string",
    label: "Select chip type",
    name: "chipType",
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
