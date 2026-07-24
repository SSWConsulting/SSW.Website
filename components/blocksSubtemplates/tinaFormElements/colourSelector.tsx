import React from "react";
import { wrapFieldsWithMeta } from "tinacms";

export interface ColorPickerOptions {
  name: string;
  classes: string;
  editorClasses?: string;
  reference: number;
  /** Dark-mode value shown in the picker */
  hex?: string;
  /** Light-mode value shown in the picker */
  lightHex?: string;
  /** Editor-only preview of the light-mode appearance */
  lightPreviewClasses?: string;
  /** Editor-only preview of the dark-mode appearance */
  darkPreviewClasses?: string;
}

// Theme-aware options render as a split pill — light appearance on the left,
// dark on the right, each with its hex — so editors see both modes at a glance.
const SplitPreview = ({ colour }: { colour: ColorPickerOptions }) => (
  <span className="flex items-stretch">
    <span
      className={`flex w-1/2 flex-col items-center justify-center gap-0.5 p-1.5 ${colour.lightPreviewClasses}`}
    >
      <span className="text-xxs font-medium leading-tight">{colour.name}</span>
      <span className="font-mono text-xxs leading-tight opacity-70">
        {colour.lightHex}
      </span>
    </span>
    <span
      className={`flex w-1/2 flex-col items-center justify-center gap-0.5 p-1.5 ${colour.darkPreviewClasses}`}
    >
      <span className="text-xxs font-medium leading-tight">{colour.name}</span>
      <span className="font-mono text-xxs leading-tight opacity-70">
        {colour.hex}
      </span>
    </span>
  </span>
);

export const ColorPickerInput = (colours: ColorPickerOptions[]) => {
  return wrapFieldsWithMeta(({ input }) => {
    return (
      <>
        <input type="number" id={input.name} className="hidden" {...input} />
        <div className="flex flex-wrap gap-2">
          {colours.map((colour) => {
            const isSelected = input.value === colour.reference;
            const hasSplitPreview =
              colour.lightPreviewClasses && colour.darkPreviewClasses;

            return (
              <button
                key={colour.name}
                type="button"
                className={`w-full overflow-hidden rounded-full border shadow ${
                  hasSplitPreview
                    ? ""
                    : `h-9 ${colour.editorClasses ?? colour.classes}`
                } ${isSelected ? "ring ring-blue-400 ring-offset-2" : ""}`}
                onClick={() => {
                  input.onChange(colour.reference);
                }}
              >
                {hasSplitPreview ? (
                  <SplitPreview colour={colour} />
                ) : (
                  <span className="inline-flex items-center gap-2">
                    {colour.name}
                    {colour.hex && (
                      <span className="font-mono text-xs opacity-70">
                        {colour.hex}
                      </span>
                    )}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </>
    );
  });
};
