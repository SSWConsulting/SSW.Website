import type { Template } from "tinacms";
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";
import { contentCardBlockSchema } from "./contentCard";
import { customImageBlockSchema } from "./customImage";
import { eventLinkSchema } from "./eventLink";
import { componentRenderer } from "./mdxComponentRenderer";

interface FixedColumnsProps {
  data: {
    header?: string;
    firstColBody: TinaMarkdownContent;
    secondColBody: TinaMarkdownContent;
  };
}

export const FixedColumns = ({ data }: FixedColumnsProps) => {
  return (
    <>
      {data.header && <h3 className="py-4">{data.header}</h3>}
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
    </>
  );
};

export const fixedColumnsSchema: Template = {
  name: "FixedColumns",
  label: "Fixed Column Layout (2 columns)",
  fields: [
    {
      type: "string",
      label: "Header",
      name: "header",
    },
    {
      type: "rich-text",
      label: "First column text",
      name: "firstColBody",
      required: true,
      templates: [
        contentCardBlockSchema,
        customImageBlockSchema,
        eventLinkSchema,
      ],
    },
    {
      type: "rich-text",
      label: "Second column text",
      name: "secondColBody",
      required: true,
      templates: [
        contentCardBlockSchema,
        customImageBlockSchema,
        eventLinkSchema,
      ],
    },
  ],
};
