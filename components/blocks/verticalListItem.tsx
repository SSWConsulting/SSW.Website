import Image from "next/image";
import { Template, classNames } from "tinacms";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export const VerticalListItem = ({ data }) => {
  const iconScale = data?.iconScale || 1;

  return (
    <div className="py-3">
      <div className={classNames("flex flex-row items-center")}>
        {data.icon && (
          <Image
            src={data.icon || ""}
            alt={`${data.title} icon`}
            width={65 * iconScale}
            height={65 * iconScale}
            className="pr-5"
          />
        )}
        <div className={classNames("text-left font-helvetica font-bold")}>
          <TinaMarkdown content={data.content} />
        </div>
      </div>
      <div className="pl-20 text-left marker:text-sswRed child:!list-disc">
        <TinaMarkdown content={data.afterBody} />
      </div>
    </div>
  );
};

export const verticalListItemSchema: Template = {
  label: "List Item",
  name: "VerticalListItem",
  fields: [
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
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      uploadDir: () => "/icons",
    },
    {
      type: "number",
      label: "Icon Scale",
      name: "iconScale",
    },
    {
      type: "rich-text",
      label: "After Body",
      name: "afterBody",
      required: false,
    },
  ],
};
