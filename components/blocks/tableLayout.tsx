import classNames from "classnames";
import type { Template } from "tinacms";

const tableStyles = {
  none: "",
  basicBorder:
    "descendant-table:border-1 descendant-table:border-solid descendant-table:p-2 descendant-th:border-1 descendant-th:border-solid descendant-th:p-2 descendant-td:border-1 descendant-td:border-solid descendant-td:p-2",
  styled:
    "descendant-th:border-b-sswRed [&>table>tbody>*:nth-child(even)]:bg-gray-75 descendant-th:bg-gray-75 descendant-th:border-b-sswRed descendant-table:w-full",
  benefits:
    "descendant-table:border-1 descendant-table:border-solid descendant-table:p-2 descendant-th:border-1 descendant-th:border-solid descendant-th:p-2 descendant-td:border-1 descendant-td:border-solid descendant-td:p-2 mt-5 flex justify-center descendant-tr:align-top descendant-ul:list-disc descendant-li:ml-6",
};

export type TableLayoutProps = {
  tableStyle?: "basicBorder" | "styled" | "none";
  className?: string;
  rows: {
    cells: string[];
    isHeader: boolean;
  }[];
};

export const TableLayout = ({ data }: { data: TableLayoutProps }) => {
  return (
    <div
      className={classNames(
        "not-prose child-table:border-1 descendant-th:border-1 descendant-th:border-gray-75  descendant-th:py-2 descendant-th:pl-2 descendant-td:border-y-1 descendant-td:py-1.5 descendant-td:pl-2",
        tableStyles[data.tableStyle]
      )}
    >
      <table>
        <thead>
          <tr>
            {data?.rows
              ? data?.rows[0]?.cells?.map((column, index) => (
                  <th key={index}>{column}</th>
                ))
              : null}
          </tr>
        </thead>
        <tbody>
          {data?.rows?.map((row, index) => (
            <tr key={index}>
              {row?.cells?.map((cell, index) => (
                <td key={index}>{cell}</td>
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
      type: "string",
      label: "CSS Class Name",
      name: "className",
    },
    {
      type: "object",
      label: "Rows",
      name: "rows",
      list: true,
      fields: [
        {
          type: "string",
          label: "Cells",
          name: "cells",
          list: true,
          required: true,
        },
        {
          type: "boolean",
          label: "Is Header",
          name: "isHeader",
        },
      ],
    },
  ],
};
