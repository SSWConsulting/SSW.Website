import { TextArea, wrapFieldsWithMeta } from "tinacms";
import type { Template } from "tinacms";
import { tableStyles } from "./tableLayout";

// Tina admin schema for the TableLayout block. Kept separate from the component
// so the tinacms editor runtime (TextArea, wrapFieldsWithMeta) never enters the
// client bundle — this file must only be imported from the Tina config side.

const getTableFieldFromForm = (field, allValues, index: number) => {
  const pathArr = field?.name?.split(".");
  // Remove the last 3 elements in the array to get the path to the table
  pathArr?.splice(pathArr?.length - index, index);
  let currentObj = allValues;

  for (const currPath of pathArr) {
    if (currentObj && currentObj[currPath]) {
      currentObj = currentObj[currPath];
    } else {
      // eslint-disable-next-line no-console
      console.error("Invalid path for table cell value");
      return undefined;
    }
  }

  return currentObj;
};

export const tableBlockSchema: Template = {
  label: "Table Layout",
  name: "TableLayout",
  ui: {
    previewSrc: "/images/thumbs/tina/table-layout.jpg",
  },
  fields: [
    {
      label: "Table Style",
      name: "tableStyle",
      type: "string",
      options: Object.keys(tableStyles),
    },
    {
      label: "First column bolded + left aligned",
      name: "firstColBold",
      type: "boolean",
      required: false,
    },
    {
      type: "string",
      label: "Table Headers",
      name: "headers",
      list: true,
    },
    {
      type: "object",
      label: "Rows",
      name: "rows",
      list: true,
      fields: [
        {
          type: "object",
          label: "Cells",
          name: "cells",
          list: true,
          fields: [
            {
              type: "string",
              label: "Value",
              name: "cellValue",
              required: true,
              // @ts-expect-error component is a valid field, but Tina's type definition doesn't include it
              component: wrapFieldsWithMeta(({ field, input, tinaForm }) => {
                const tableObj = getTableFieldFromForm(
                  field,
                  tinaForm.finalForm.getState().values,
                  5
                );

                const pathArr = field?.name?.split(".");
                const headerIndex = parseInt(pathArr[7]);
                let headerText = undefined;
                if (!isNaN(headerIndex)) {
                  headerText = tableObj.headers[headerIndex];
                }

                return (
                  <>
                    {headerText && (
                      <p>Cell value for &quot;{headerText}&quot;:</p>
                    )}
                    <TextArea {...input} />
                  </>
                );
              }),
              //component: "textarea",
            },
          ],
          ui: {
            itemProps: (item) => {
              return {
                label: item?.cellValue || "New cell (click to enter value)",
              };
            },
            validate: (values, allValues, meta, field) => {
              const tableObj = getTableFieldFromForm(field, allValues, 3);

              if (!tableObj) {
                // eslint-disable-next-line no-console
                console.error("Invalid path for table cell value");
                return undefined;
              }

              const headerLength = tableObj.headers?.length;
              if (headerLength < values?.length) {
                return `Too many cells for the number of headers, reduce the number of cells to ${headerLength}`;
              }
            },
          },
        },
        {
          type: "boolean",
          label: "Is Heading",
          name: "isHeader",
          required: false,
        },
      ],
      ui: {
        itemProps: (item) => {
          if (item?.cells?.length) {
            return {
              label:
                item?.cells[0]?.cellValue || "New row (click to enter values)",
            };
          } else {
            return { label: "New row" };
          }
        },
      },
    },
  ],
};
