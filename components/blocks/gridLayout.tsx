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
    showBorderBottom: boolean;
  };
};

export const GridLayout = ({ data }: GridLayoutProps) => {
  return (
    <>
      {data.grids?.map((grid, i) => (
        <Container padding="pt-0" key={i}>
          <h2 className="text-xl text-ssw-red">{grid.gridTitle}</h2>
          <Section className="mx-auto my-12 grid w-full grid-cols-1 gap-x-12 sm:grid-cols-2 lg:ml-0 lg:grid-cols-4">
            {grid.blocks?.map((block, i) => (
              <Section className="flex-col items-center" key={i}>
                <h3 className="text-lg font-light">{block.title}</h3>
                {block.image && (
                  <Image
                    className="align-middle"
                    src={block.image}
                    alt={`${block.title} logo`}
                    height={180}
                    width={180}
                  />
                )}
              </Section>
            ))}
          </Section>
          {data.showBorderBottom && <hr />}
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
              // @ts-expect-error tinacms types are wrong
              uploadDir: () => "company-logos",
            },
          ],
        },
      ],
    },
    {
      type: "boolean",
      name: "showBorderBottom",
      label: "Show Border Bottom",
    },
  ],
};
