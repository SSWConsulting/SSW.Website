"use client";

import classNames from "classnames";
import * as React from "react";
import { sanitiseXSS } from "../../helpers/validator";

export const tableStyles = {
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
        "not-prose overflow-x-auto descendant-th:border-1 descendant-th:border-gray-75 descendant-th:py-2 descendant-th:pl-2 descendant-td:border-y-1 descendant-td:py-1.5 descendant-td:pl-2",
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
