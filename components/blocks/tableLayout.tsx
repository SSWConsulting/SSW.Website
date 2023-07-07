import classNames from "classnames";
import type { Template } from "tinacms";

const tableStyles = {
  none: "",
  basicBorder:
    "descendant-table:border-1 descendant-table:border-solid descendant-table:p-2 descendant-th:border-1 descendant-th:border-solid descendant-th:p-2 descendant-td:border-1 descendant-td:border-solid descendant-td:p-2",
  styled:
    "descendant-th:border-b-sswRed [&>table>tbody>*:nth-child(even)]:bg-gray-75 descendant-th:bg-gray-75 descendant-th:border-b-sswRed descendant-table:w-full",
};

export const TableLayout = ({ data }) => {
  return (
    <div
      className={classNames(
        "not-prose child-table:border-1 descendant-th:border-1 descendant-th:border-gray-75  descendant-th:py-2 descendant-th:pl-2 descendant-td:border-y-1 descendant-td:py-1.5 descendant-td:pl-2",
        data.className,
        tableStyles[data.tableStyle]
      )}
    >
      <table>
        <thead>
          <tr>
            {data?.columns?.map((column) => (
              <th>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* {data?.rows?.map((row) => (
            <tr>
              {row?.cell?.map((cell) => (
                <td className={cell.column}>{cell.value}</td>
              ))}
            </tr>
          ))} */}
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
      type: "string",
      label: "CSS Class Name",
      name: "className",
    },
    {
      type: "string",
      label: "Columns",
      name: "columns",
      list: true,
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
        },
      ],
    },
  ],
};
