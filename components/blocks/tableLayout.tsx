import classNames from "classnames";
import MarkdownIt from "markdown-it";
import markdownItMultimdTable from "markdown-it-multimd-table";
import path from "path";
import { useEffect, useState } from "react";
import type { Template } from "tinacms";
import client from "../../.tina/__generated__/client";

const md = new MarkdownIt().use(markdownItMultimdTable, {
  multiline: true,
});

export const TableLayout = ({ data }) => {
  const [tableClasses, setTableClasses] = useState([]);
  const [mdxTableString, setMdxTableString] = useState("");

  const presetNames = data.tablePresets.map((preset) =>
    path.basename(preset.preset, ".json")
  );

  useEffect(() => {
    async function init() {
      const presets = await client.queries.presetsQuery({
        categories: ["table"],
        name: presetNames,
      });
      const presetClassNames = presets.data.presetsConnection.edges.map(
        (p) => p.node.className
      );
      setTableClasses(presetClassNames);
    }

    init();

    const html = md.render(data.mdxTable ?? "");
    setMdxTableString(html);
  }, [data]);

  return (
    <div
      className={classNames(
        "not-prose child-table:border-1 descendant-th:border-1 descendant-th:border-gray-75  descendant-th:py-2 descendant-th:pl-2 descendant-td:border-y-1 descendant-td:py-1.5 descendant-td:pl-2",
        ...tableClasses
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
      type: "object",
      label: "Table Presets",
      name: "tablePresets",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.preset };
        },
      },
      fields: [
        {
          label: "Table Preset",
          name: "preset",
          type: "reference",
          collections: ["presets"],
        },
      ],
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
