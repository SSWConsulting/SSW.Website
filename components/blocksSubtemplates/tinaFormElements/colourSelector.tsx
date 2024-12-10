import React from "react";
import { wrapFieldsWithMeta } from "tinacms";

export interface ColorPickerOptions {
  name: string;
  classes: string;
  editorClasses?: string;
  reference: number;
}

export const ColorPickerInput = (colours: ColorPickerOptions[]) => {
  return wrapFieldsWithMeta(({ input }) => {
    return (
      <>
        <input type="number" id={input.name} className="hidden" {...input} />
        <div className="flex flex-wrap gap-2">
          {colours.map((colour) => {
            return (
              <button
                key={colour.name}
                className={`h-9 w-full rounded-full border shadow ${
                  colour.editorClasses ?? colour.classes
                } ${
                  input.value === colour.reference
                    ? "ring ring-blue-400 ring-offset-2"
                    : ""
                }`}
                onClick={() => {
                  input.onChange(colour.reference);
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
