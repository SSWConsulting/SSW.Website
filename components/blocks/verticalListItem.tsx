import Image from "next/image";
import type { Template } from "tinacms";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export const VerticalListItem = ({ data }) => {
  const iconScale = data?.iconScale || 1;

  return (
    <div className="py-3">
      {data.header && (
        <div className="py-3 text-left">
          <h3 className="text-sswRed">{data.header}</h3>
        </div>
      )}
      <div className="flex flex-row items-center font-helvetica">
        {data.icon ? (
          <Image
            src={data.icon || ""}
            alt={`${data.title} icon`}
            width={65 * iconScale}
            height={65 * iconScale}
            className="pr-5"
          />
        ) : data.index ? (
          <div className="relative mr-5 flex h-11 shrink-0 basis-11">
            <Image
              src={"/images/icons/circle-icon.svg"}
              alt="circle"
              fill={true}
            />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-base font-bold text-sswRed">
              {data.index}
            </div>
          </div>
        ) : null}
        <div className="text-left font-helvetica font-bold">
          <TinaMarkdown content={data.content} />
        </div>
      </div>
      <div className="pl-20 text-left marker:text-sswRed child-ul:!ml-0 descendant-ul:ml-6 descendant-ul:!list-square">
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
      type: "number",
      label: "Index number",
      name: "index",
    },
    {
      type: "image",
      label: "Icon",
      name: "icon",
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      uploadDir: () => "icons",
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
