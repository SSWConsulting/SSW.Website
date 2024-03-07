import type { Template } from "tinacms";
import Image from "next/image";
import { Section } from "../util/section";
import { Container } from "../util/container";

type GridLayoutProps = {
  data: {
    title: string;
    grids: {
      gridTitle: string;
      blocks: {
        image: string;
        title: string;
      }[];
    }[];
  };
};

export const GridLayout = ({ data }: GridLayoutProps) => {
  return (
    <>
      {data.grids?.map((grid, i) => (
        <Container padding="pt-0" key={i}>
          <h2>{grid.gridTitle}</h2>
          <Section className="grid grid-cols-2 md:grid-cols-4">
            {grid.blocks?.map((block, i) => (
              <div key={i}>
                <h3>{block.title}</h3>
                {block.image && (
                  <Image
                    src={block.image}
                    alt={block.title}
                    width={180}
                    height={180}
                  />
                )}
              </div>
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
              type: "image",
              label: "Image",
              name: "image",
              // @ts-expect-error
              uploadDir: () => "company-logos",
            },
          ],
        },
      ],
    },
  ],
};
