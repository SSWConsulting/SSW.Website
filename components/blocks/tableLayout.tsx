import classNames from "classnames";
import MarkdownIt from "markdown-it";
import markdownItMultimdTable from "markdown-it-multimd-table";
import { useEffect, useState } from "react";
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

export const TableLayout = ({ data }) => {
  const [mdxTableString, setMdxTableString] = useState("");

  useEffect(() => {
    const md = new MarkdownIt().use(markdownItMultimdTable, {
      multiline: true,
    });
    const html = md.render(data.mdxTable);
    setMdxTableString(html);
  }, [data]);

  return (
    <div
      className={classNames(
        "not-prose child-table:border-1 descendant-th:border-1 descendant-th:border-gray-75  descendant-th:py-2 descendant-th:pl-2 descendant-td:border-y-1 descendant-td:py-1.5 descendant-td:pl-2",
        tableStyles[data.tableStyle]
      )}
      dangerouslySetInnerHTML={{ __html: mdxTableString }}
    />
  );
};

export const tableBlockSchema: Template = {
  label: "Table Layout",
  name: "TableLayout",
  ui: {
    itemProps: (item) => {
      return { label: item?.mdxTable };
    },
  },
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
      label: "Table",
      name: "mdxTable",
      ui: {
        component: "textarea",
      },
    },
  ],
};
