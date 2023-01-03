import * as React from "react";

import type { Template } from "tinacms";
import { TinaMarkdown } from "tinacms/dist/rich-text";

import { Container } from "../util/container";
import { Section } from "../util/section";

export const CenterAlignedContent = ({ data }) => {

  return (
    <Section className={data.backgroundColor}>
      <Container size="medium">
        <div className="text-center text-black">
          <TinaMarkdown content={data.content} />
        </div>
      </Container>
    </Section>
  );
};

export const centerAlignedContentBlockSchema: Template = {
  name: "centerAlignedContent",
  label: "CenterAlignedContent",
  ui: {
    // itemProps: (item) => ({ label: item.content }),
  },
  fields: [
    {
      type: "rich-text",
      label: "Content",
      name: "content",
    },
    {
      type: "string",
      label: "Background Color",
      name: "backgroundColor",
      options: [
        { label: "Default", value: "default" },
        { label: "Tint", value: "tint" },
        { label: "Primary", value: "primary" },
      ],
    },
  ],
};
