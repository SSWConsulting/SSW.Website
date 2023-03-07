import Image from "next/image";
import { FC } from "react";
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";

export type VerticalListItemProps = {
  icon: string;
  title: string;
};

const VerticalListItem: FC<VerticalListItemProps> = ({ icon, title }) => {
  return (
    <div className="flex items-center">
      <Image
        src={icon || ""}
        alt={`${title} icon`}
        width={75}
        height={75}
      />
      <span className="text-xl font-semibold text-black">{title}</span>
    </div>
  )
}

const TrainingInformation: FC<{ listItemProps: VerticalListItemProps[], header: string }> = ({ listItemProps, header, }) => {
  const listItems = listItemProps.map((p, i) => <VerticalListItem key={i} {...p} />);

  return (
    <div>
      <h1 className="font-bold" dangerouslySetInnerHTML={{ __html: header }}></h1>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-1">{listItems}</div>
    </div>
  );
}

export const trainingInformationSchema = {
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
      label: "Apply List Items",
      name: "applyListItems",
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

export default TrainingInformation;
