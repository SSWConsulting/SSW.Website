import classNames from "classnames";
import React from "react";
import { wrapFieldsWithMeta } from "tinacms";

/**
 *
 * @param {number} max Number of characters allowed in field
 * @param {boolean} isTextArea Render the input as a text area. Default to false
 * @returns jsx component of input field with live count at bottom left to be rendered in Tina editor view
 */
export const TextInputWithCount = (max: number, isTextArea: boolean = false) =>
  wrapFieldsWithMeta(({ input }) => (
    <div className="flex flex-col gap-2">
      {isTextArea ? (
        <textarea
          className="focus:shadow-outline block min-h-40 w-full resize-y rounded-md border border-gray-200 px-3 py-2 text-base text-gray-600 shadow-inner focus:border-blue-500 focus:text-gray-900"
          {...input}
        />
      ) : (
        <input
          className="focus:shadow-outline block w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-base text-gray-600 shadow-inner transition-all duration-150 ease-out placeholder:text-gray-300 focus:border-blue-500 focus:text-gray-900 focus:outline-none"
          {...input}
        />
      )}
      <p
        className={classNames({
          "text-red-500": input.value.length > max,
        })}
      >
        {input.value.length}/{max}
      </p>
    </div>
  ));
