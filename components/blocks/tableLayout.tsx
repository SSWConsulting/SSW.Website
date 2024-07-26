"use client";

import classNames from "classnames";
import * as React from "react";
import { TextArea, wrapFieldsWithMeta, type Template } from "tinacms";
import { sanitiseXSS } from "../../helpers/validator";

const tableStyles = {
  none: "",
  basicBorder:
    "descendant-table:p-2 descendant-th:border-1 descendant-th:border-solid descendant-th:p-2 descendant-td:border-1 descendant-td:border-solid descendant-td:p-2",
  styled:
    "descendant-th:border-b-sswRed [&>table>tbody>*:nth-child(even)]:bg-gray-75 descendant-th:bg-gray-75 descendant-th:border-b-sswRed descendant-table:w-full",
  benefits:
    "descendant-table:p-2 descendant-th:border-1 descendant-th:border-solid descendant-th:p-2 descendant-td:border-1 descendant-td:border-solid descendant-td:p-2 mt-5 flex justify-center descendant-tr:align-top",
};

export type TableLayoutProps = {
  headers: string[];
  firstColBold?: boolean;
  tableStyle?: "none" | "basicBorder" | "styled" | "benefits";
  className?: string;
  rows: {
    cells: {
      cellValue?: string;
    }[];
    isHeader?: boolean;
  }[];
};

export const TableLayout = ({ data }: { data: TableLayoutProps }) => {
  return (
    <div
      className={classNames(
        "not-prose descendant-th:border-1 descendant-th:border-gray-75 descendant-th:py-2 descendant-th:pl-2 descendant-td:border-y-1 descendant-td:py-1.5 descendant-td:pl-2",
        tableStyles[data.tableStyle]
      )}
    >
      <table>
        <thead>
          <tr className="border-1 border-solid">
            {data?.headers ? (
              data?.headers?.map((cell, index) => (
                <th
                  className={
                    index === 0 && data?.firstColBold ? "text-left" : ""
                  }
                  key={index}
                >
                  {cell}
                </th>
              ))
            ) : (
              <></>
            )}
          </tr>
        </thead>
        <tbody>
          {data?.rows?.map((row, index) => (
            <tr
              className={classNames(
                row?.isHeader ? "border-0 !bg-red-100" : "border-1 border-solid"
              )}
              key={index}
            >
              {row?.cells?.map((cell, index) => (
                <td
                  className={classNames(
                    index === 0 && data?.firstColBold
                      ? "text-left"
                      : "text-center",
                    index === 0 &&
                      data?.firstColBold &&
                      !row?.isHeader &&
                      "font-semibold",
                    row?.isHeader &&
                      "border-0 !bg-white pt-8 text-lg font-bold",
                    "whitespace-pre-wrap"
                  )}
                  key={index}
                  colSpan={
                    index === row.cells.length - 1
                      ? data.headers.length - row.cells.length + 1
                      : 1
                  }
                  dangerouslySetInnerHTML={{
                    __html: sanitiseXSS(cell?.cellValue) || "",
                  }}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const tableBlockSchema: Template = {
  label: "Table Layout",
  name: "TableLayout",
  ui: {
    previewSrc: "/images/thumbs/tina/table-layout.jpg"
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
