import Image from "next/image";
import { Template, classNames } from "tinacms";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export const VerticalListItem = ({ data }) => {
  const iconScale = data?.iconScale || 1;

  return (
    <div className="py-3">
      <div
        className={classNames(
          "flex flex-row items-center"
          // data.isSubItem ? "py-1 pl-10" : "py-3"
        )}
      >
        {data.icon && (
          <Image
            src={data.icon || ""}
            alt={`${data.title} icon`}
            width={65 * iconScale}
            height={65 * iconScale}
            className="pr-5"
          />
        )}
        <div
          className={classNames(
            "font-helvetica font-bold"
            // data.isSubItem && "text-sm"
          )}
        >
          <TinaMarkdown content={data.content} />
        </div>
      </div>
      <ul className="list-disc pl-20 marker:text-sswRed">
        {data.subListItems?.map((item) => (
          <li className="pb-1">{item}</li>
        ))}
      </ul>
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
      uploadDir: () => "icons",
    },
    {
      type: "number",
      label: "Icon Scale",
      name: "iconScale",
    },
    {
      type: "string",
      list: true,
      label: "Sub-list items",
      name: "subListItems",
    },
  ],
};
