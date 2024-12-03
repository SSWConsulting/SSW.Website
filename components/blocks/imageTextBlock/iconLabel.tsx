import { tinaField } from "tinacms/dist/react";
import Icon from "../sharedTinaFields/icons/icon";
import { IconPickerInput } from "../sharedTinaFields/icons/iconSelector";

export const IconLabel = ({ data }) => {
  return (
    <div className="flex gap-1 py-2 align-top">
      <div className="h-full">
        {data.icon && (
          <Icon
            data={{ name: data.icon }}
            tinaField={tinaField(data, "icon")}
            className="size-4 text-gray-300"
          />
        )}
      </div>
      <p
        className="text-xs font-bold dark:text-gray-300"
        data-tina-field={tinaField(data, "labelText")}
      >
        {data.labelText}
      </p>
    </div>
  );
};

export const IconLabelSchema = [
  {
    type: "string",
    label: "Label Text",
    name: "labelText",
    description: "Text for the label.",
  },
  {
    type: "string",
    label: "Icon",
    name: "icon",
    description: "Icon to proceed the label.",
    ui: {
      component: IconPickerInput,
    },
  },
];
