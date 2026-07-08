import { tinaField } from "tinacms/dist/react";
import { Icon } from "./tinaFormElements/icon";

export const IconLabel = ({ data }) => {
  return (
    <div className="flex gap-1 py-2 align-top">
      {data.icon && (
        <div className="h-full">
          <Icon
            data={{ name: data.icon }}
            tinaField={tinaField(data, "icon")}
            className="size-5 text-sswRed dark:text-red-400"
          />
        </div>
      )}
      <p
        className="text-sm font-semibold uppercase tracking-wide text-sswRed dark:text-red-400"
        data-tina-field={tinaField(data, "labelText")}
      >
        {data.labelText}
      </p>
    </div>
  );
};
