"use client";
import { BlurFade } from "@/components/ui/fade-in";
import { tinaField } from "tinacms/dist/react";
import { Icon } from "../sharedTinaFields/icon";
export const ListItem = ({ data }) => {
  const { key } = data;
  let xOffset = -10;
  if (data.twoColumns && key % 2 === 0) {
    xOffset *= -1;
  }
  return (
    <BlurFade xOffset={xOffset}>
      <div className="flex gap-1 align-top">
        <div className="h-full p-1">
          {data.icon && (
            <Icon
              data={{ name: data.icon }}
              tinaField={tinaField(data, "icon")}
              className="size-6 text-white"
            />
          )}
        </div>
        <div className="flex flex-col">
          <h6
            className="w-full p-1 text-base font-semibold dark:text-white"
            data-tina-field={tinaField(data, "heading")}
          >
            {data.heading}
          </h6>
          <p
            className="w-full p-1 text-sm font-light dark:text-gray-200"
            data-tina-field={tinaField(data, "description")}
          >
            {data.description}
          </p>
        </div>
      </div>
    </BlurFade>
  );
};
