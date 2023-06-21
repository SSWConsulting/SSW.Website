import Image from "next/image";
import { FC } from "react";
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";

export type HorizontalListItemProps = {
  icon: string;
  title: string;
  content: TinaMarkdownContent | TinaMarkdownContent[];
};

const HorizontalListItem: FC<HorizontalListItemProps> = ({
  icon,
  title,
  content,
}) => {
  return (
    <div className="flex flex-col items-center">
      {icon && (
        <Image src={icon || ""} alt={`${title} icon`} width={75} height={75} />
      )}
      <div className="mt-3 flex flex-col justify-start text-center text-gray-500">
        <span className="text-xl font-semibold text-black">{title}</span>
        <TinaMarkdown content={content} />
      </div>
    </div>
  );
};

const HorizontalList: FC<{ listItemProps: HorizontalListItemProps[] }> = ({
  listItemProps,
}) => {
  const listItems = listItemProps.map((p, i) => (
    <HorizontalListItem key={i} {...p} />
  ));

  return (
    <>
      <div className="grid grid-cols-2 gap-8 md:grid-cols-3 md:gap-4 lg:grid-cols-6">
        {listItems}
      </div>
    </>
  );
};

export const horizontalListSchema = {
  type: "object",
  label: "Horizontal List Items",
  name: "horizontalListItems",
  fields: [
    {
      type: "object",
      label: "List Items",
      name: "listItems",
      list: true,
      fields: [
        {
          type: "string",
          label: "Title",
          name: "title",
        },
        {
          type: "rich-text",
          label: "Content",
          name: "content",
          isBody: true,
        },
        {
          type: "image",
          label: "Icon",
          name: "icon",
        },
      ],
    },
  ],
};

export default HorizontalList;
