import { tinaField } from "tinacms/dist/react";
import { Icon } from "../sharedTinaFields/icon";
import { IconPickerInput } from "../sharedTinaFields/iconSelector";

export const ListItem = ({ data }) => {
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
      <div className="flex flex-col">
        <h4 className="w-full" data-tina-field={tinaField(data, "heading")}>
          {data.heading}
        </h4>
        <p
          className="w-full font-light"
          data-tina-field={tinaField(data, "description")}
        >
          {data.description}
        </p>
      </div>
    </div>
  );
};

export const listItemSchema = [
  {
    type: "string",
    label: "Heading",
    name: "heading",
  },
  {
    type: "string",
    label: "Description",
    name: "description",
  },
  {
    type: "string",
    label: "Icon",
    name: "icon",
    ui: {
      component: IconPickerInput,
    },
  },
];
