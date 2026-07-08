import { tinaField } from "tinacms/dist/react";
import { Icon } from "./tinaFormElements/icon";

export const IconLabel = ({ data }) => {
  return (
    <div className="flex gap-1 py-2 align-top text-sswRed">
      {data.icon && (
        <div className="h-full">
          <Icon
            data={{ name: data.icon }}
            tinaField={tinaField(data, "icon")}
            className="size-5"
          />
        </div>
      )}
      <p
        className="text-sm font-semibold uppercase tracking-wide"
        data-tina-field={tinaField(data, "labelText")}
      >
        {data.labelText}
      </p>
    </div>
  );
};
