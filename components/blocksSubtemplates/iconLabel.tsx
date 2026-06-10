import { tinaField } from "tinacms/dist/react";
import { Icon } from "./tinaFormElements/dynamicIcon";

export const IconLabel = ({ data }) => {
  return (
    <div className="flex gap-1 py-2 align-top">
      {data.icon && (
        <div className="h-full">
          <Icon
            data={{ name: data.icon }}
            tinaField={tinaField(data, "icon")}
            className="size-5 text-gray-300"
          />
        </div>
      )}
      <p
        className="text-sm font-bold dark:text-gray-300"
        data-tina-field={tinaField(data, "labelText")}
      >
        {data.labelText}
      </p>
    </div>
  );
};
