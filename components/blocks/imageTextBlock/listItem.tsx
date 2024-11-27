import { tinaField } from "tinacms/dist/react";
import { Icon } from "../sharedTinaFields/icon";
import { IconPickerInput } from "../sharedTinaFields/iconSelector";

export const ListItem = ({ data }) => {
  return (
    <div className="flex flex-wrap align-top">
      <div className="h-full">
        <Icon data={data.icon} tinaField={tinaField(data, "icon")} />
      </div>
      <div className="flex flex-row">
        <h4 data-tina-field={tinaField(data, "heading")}>{data.heading}</h4>
        <p data-tina-field={tinaField(data, "description")}>
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
