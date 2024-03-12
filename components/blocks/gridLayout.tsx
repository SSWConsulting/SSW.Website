import type { Template } from "tinacms";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { tinaField } from "tinacms/dist/react";
import Image from "next/image";

import { Section } from "../util/section";
import { Container } from "../util/container";
import { utilityButtonSchema } from "../button/utilityButton";
import { componentRenderer } from "./mdxComponentRenderer";

type GridLayoutProps = {
  data: {
    title: string;
    grids: {
      gridTitle: string;
      showGridTitle: boolean;
      centeredGridTitle: boolean;
      showHeaderDivider: boolean;
      blocks: {
        title: string;
        showTitle: boolean;
        image: string;
        relatedImage: string;
        linkContent: any;
      }[];
    }[];
  };
};

export const GridLayout = ({ data }: GridLayoutProps) => {
  return (
    <>
      {data.grids?.map((grid, i) => (
        <Container padding="pt-0" key={i}>
          {grid.showGridTitle && (
            <h2
              className={`${grid.centeredGridTitle ? "text-center text-2xl font-light" : "text-xl text-ssw-red"}`}
            >
              {grid.gridTitle}
            </h2>
          )}
          {grid.showHeaderDivider && <hr />}
          <Section className="mx-auto my-12 grid w-full grid-cols-1 gap-x-12 sm:grid-cols-2 lg:ml-0 lg:grid-cols-4">
            {grid.blocks?.map((block, i) => (
              <Section className="flex-col items-center" key={i}>
                {block.showTitle && (
                  <h3 className="text-lg font-light">{block.title}</h3>
                )}
                {block.image && (
                  <Image
                    className="align-middle"
                    src={block.image}
                    alt={`${block.title} logo`}
                    height={180}
                    width={180}
                  />
                )}
                {block.relatedImage && (
                  <Image
                    className="align-middle"
                    src={block.relatedImage}
                    alt={`${block.title} second logo`}
                    height={180}
                    width={180}
                  />
                )}
                <TinaMarkdown
                  content={block.linkContent}
                  data-tina-field={tinaField(block, "linkContent")}
                  components={componentRenderer}
                />
              </Section>
            ))}
          </Section>
        </Container>
      ))}
    </>
  );
};

export const gridLayoutSchema: Template = {
  label: "Grid Layout",
  name: "GridLayout",
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title",
    },
    {
      type: "object",
      list: true,
      label: "Grid Items",
      name: "grids",
      ui: {
        itemProps: (item) => {
          return { label: item?.gridTitle };
        },
      },
      fields: [
        {
          type: "string",
          label: "Grid Title",
          name: "gridTitle",
        },
        {
          type: "boolean",
          label: "Show Grid Title",
          name: "showGridTitle",
        },
        {
          type: "boolean",
          label: "Centered Grid Title",
          name: "centeredGridTitle",
        },
        {
          type: "boolean",
          label: "Show Header Divider",
          name: "showHeaderDivider",
        },
        {
          type: "object",
          label: "Block",
          name: "blocks",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: item?.title };
            },
          },
          fields: [
            {
              type: "string",
              label: "Title",
              name: "title",
            },
            {
              type: "boolean",
              label: "Show Title",
              name: "showTitle",
            },
            {
              type: "image",
              label: "Image",
              name: "image",
              // @ts-expect-error tinacms types are wrong
              uploadDir: () => "company-logos",
            },
            {
              type: "image",
              label: "Related Image",
              name: "relatedImage",
              // @ts-expect-error tinacms types are wrong
              uploadDir: () => "company-logos",
            },
            {
              type: "rich-text",
              name: "linkContent",
              label: "Link Content",
              templates: [utilityButtonSchema],
            },
          ],
        },
      ],
    },
  ],
};
