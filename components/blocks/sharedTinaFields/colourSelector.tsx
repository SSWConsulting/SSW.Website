import React from "react";
import { wrapFieldsWithMeta } from "tinacms";

export interface ColorPickerOptions {
  name: string;
  classes: string;
}

export const ColorPickerInput = (colours: ColorPickerOptions[]) => {
  return wrapFieldsWithMeta(({ input }) => {
    return (
      <>
        <input type="text" id={input.name} className="hidden" {...input} />
        <div className="flex flex-wrap gap-2">
          {colours.map((colour) => {
            return (
              <button
                key={colour.name}
                className={`h-9 w-full rounded-full border text-white shadow ${
                  colour.classes
                } ${
                  input.value === colour.name
                    ? "ring ring-blue-400 ring-offset-2"
                    : ""
                }`}
                onClick={() => {
                  input.onChange(colour.name);
                }}
              >
                {colour.name}
              </button>
            );
          })}
        </div>
      </>
    );
  });
};
