import type { Template } from "tinacms";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export const FixedColumns = ({ data }) => {
  return (
    <div className="grid md:grid-cols-2 md:gap-6">
      <div>
        <TinaMarkdown content={data.firstColBody} />
      </div>
      <div>
        <TinaMarkdown content={data.secondColBody} />
      </div>
    </div>
  );
};

export const fixedColumnsSchema: Template = {
  name: "FixedColumns",
  label: "Fixed Column Layout (2 columns)",
  fields: [
    {
      type: "rich-text",
      label: "First column text",
      name: "firstColBody",
      required: true,
    },
    {
      type: "rich-text",
      label: "Second column text",
      name: "secondColBody",
      required: true,
    },
  ],
};
