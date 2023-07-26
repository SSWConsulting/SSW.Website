import classNames from "classnames";
import type { Template } from "tinacms";

const tableStyles = {
  none: "",
  basicBorder:
    "descendant-table:border-1 descendant-table:border-solid descendant-table:p-2 descendant-th:border-1 descendant-th:border-solid descendant-th:p-2 descendant-td:border-1 descendant-td:border-solid descendant-td:p-2",
  styled:
    "descendant-th:border-b-sswRed [&>table>tbody>*:nth-child(even)]:bg-gray-75 descendant-th:bg-gray-75 descendant-th:border-b-sswRed descendant-table:w-full",
  benefits:
    "descendant-table:border-1 descendant-table:border-solid descendant-table:p-2 descendant-th:border-1 descendant-th:border-solid descendant-th:p-2 descendant-td:border-1 descendant-td:border-solid descendant-td:p-2 mt-5 flex justify-center descendant-tr:align-top",
};

export type TableLayoutProps = {
  headers: string[];
  firstColBold?: boolean;
  tableStyle?: "none" | "basicBorder" | "styled" | "benefits";
  className?: string;
  rows: {
    cells: {
      cellValue: string;
    }[];
    isHeader: boolean;
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
      <table className="border-1">
        <thead>
          <tr>
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
            <tr key={index}>
              {row?.cells?.map((cell, index) => (
                <td
                  className={classNames(
                    index === 0 && data?.firstColBold
                      ? "text-left font-bold"
                      : "text-center",
                    row?.isHeader ? "font-bold" : "",
                    "whitespace-pre-wrap"
                  )}
                  key={index}
                  dangerouslySetInnerHTML={{ __html: cell?.cellValue || "" }}
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
  fields: [
    {
      label: "Table Style",
      name: "tableStyle",
      type: "string",
      options: Object.keys(tableStyles).map((key) => {
        return {
          label: key,
          value: key,
        };
      }),
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
              // @ts-expect-error This is a valid field, but Tina's type definition doesn't include it
              component: "textarea",
            },
          ],
          ui: {
            validate: (value, data) => {
              if ((value?.length || 0) <= (data?.headers?.length || 0)) {
                return "Must have at least as many cells as headers";
              }
            },
            itemProps: (item) => ({
              label: item?.cellValue || "New cell (click to enter value)",
            }),
          },
        },
      ],
      ui: {
        itemProps: (item) => ({
          label: item?.cells[0]?.cellValue || "New row (click to enter values)",
        }),
      },
    },
  ],
};
