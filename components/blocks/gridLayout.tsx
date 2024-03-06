import type { Template } from "tinacms";
import Image from "next/image";

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
  console.log("GridLayout", data);
  return (
    <>
      {data.grids?.map((grid, i) => (
        <div key={i}>
          <div>{grid.gridTitle}</div>
          <div>
            {grid.blocks.map((block, i) => (
              <div key={i}>
                <p>{block.title}</p>
                <Image
                  src={block.image}
                  alt={block.title}
                  width={400}
                  height={400}
                />
              </div>
            ))}
          </div>
        </div>
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
