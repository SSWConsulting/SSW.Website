import { tinaField } from "tinacms/dist/react";
import { Icon } from "../sharedTinaFields/icon";
import { IconPickerInput } from "../sharedTinaFields/iconSelector";

export const IconLabel = ({ data }) => {
  return (
    <div className="flex gap-1 align-top">
      <div className="h-full">
        {data.icon && (
          <Icon
            data={{ name: data.icon }}
            tinaField={tinaField(data, "icon")}
            className="size-6"
          />
        )}
      </div>
      <p data-tina-field={tinaField(data, "labelText")}>{data.labelText}</p>
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
