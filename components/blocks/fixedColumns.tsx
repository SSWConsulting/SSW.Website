import type { Template } from "tinacms";
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";
import { componentRenderer } from "./mdxComponentRenderer";

import * as Schemas from "../../components/blocks";

interface FixedColumnsProps {
  data: {
    firstColBody: TinaMarkdownContent;
    secondColBody: TinaMarkdownContent;
  };
}

export const FixedColumns = ({ data }: FixedColumnsProps) => {
  return (
    <div className="grid md:grid-cols-2 md:gap-6">
      <div>
        <TinaMarkdown
          content={data.firstColBody}
          components={componentRenderer}
        />
      </div>
      <div>
        <TinaMarkdown
          content={data.secondColBody}
          components={componentRenderer}
        />
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
      templates: [...Schemas.pageBlocks],
    },
    {
      type: "rich-text",
      label: "Second column text",
      name: "secondColBody",
      required: true,
      templates: [...Schemas.pageBlocks],
    },
  ],
};
