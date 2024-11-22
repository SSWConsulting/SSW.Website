import React from "react";
import { wrapFieldsWithMeta } from "tinacms";

export const colorOptions = [
  "gradientLeft",
  "gradientRight",
  "gradientTop",
  "gradientBottom",
  "transparent",
  "gray",
];

export const ColorPickerInput = wrapFieldsWithMeta(({ input }) => {
  const inputClasses = {
    gradientLeft: "bgGradientDarkToLeft",
    gradientRight: "bgGradientDarkToRight",
    gradientTop: "bgGradientDarkToTop",
    gradientBottom: "bgGradientDarkToBottom",
    transparent: "bg-transparent",
    gray: "bg-gray-700",
  };

  return (
    <>
      <input type="text" id={input.name} className="hidden" {...input} />
      <div className="flex flex-wrap gap-2">
        {colorOptions.map((color) => {
          return (
            <button
              key={color}
              className={`size-9 rounded-full border shadow ${
                inputClasses[color]
              } ${
                input.value === color ? "ring ring-blue-400 ring-offset-2" : ""
              }`}
              onClick={() => {
                input.onChange(color);
              }}
            ></button>
          );
        })}
      </div>
    </>
  );
});
