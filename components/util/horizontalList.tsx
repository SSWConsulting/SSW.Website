import Image from "next/image";
import { FC } from "react";
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";

export type HorizontalListItemProps = {
  icon: string;
  title: string;
  content: TinaMarkdownContent | TinaMarkdownContent[];
};

const HorizontalListItem: FC<HorizontalListItemProps> = ({ icon, title, content }) => {
  return (
    <div className="flex items-center">
      <Image
        src={icon || ""}
        alt={`${title} icon`}
        width={75}
        height={75}
      />
      <div className="ml-3 flex flex-col justify-start text-left text-gray-500">
        <span className="text-xl font-semibold text-black">{title}</span>
        <TinaMarkdown content={content} />
      </div>
    </div>
  )
}

const HorizontalList: FC<{ header: string; listItemProps: HorizontalListItemProps[] }> = ({
  header,
  listItemProps,
}) => {
  const listItems = listItemProps.map((p, i) => <HorizontalListItem key={i} {...p} />);

  return (
    <>
      <h1 className="mb-12 font-bold" dangerouslySetInnerHTML={{ __html: header }}></h1>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">{listItems}</div>
    </>
  );
}

export const horizontalListSchema = {
  type: "object",
  label: "Horizontal List Items",
  name: "horizontalListItems",
  fields: [
    {
      type: "string",
      label: "Header",
      name: "header",
    },
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
        }
      ],
    },
  ],
};

export default HorizontalList;
