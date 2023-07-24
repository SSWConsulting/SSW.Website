import { isNumber } from "lodash";
import Image from "next/image";
import { Template, classNames } from "tinacms";
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
      <div className={classNames("flex flex-row items-center font-helvetica")}>
        {data.icon && isNumber(data.icon) ? (
          <svg
            width="45"
            height="45"
            viewBox="0 0 42 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-5 text-sswRed"
          >
            <g>
              <circle
                cx="21"
                cy="21"
                r="21"
                fill="currentColor"
                fillOpacity="0.1"
              />
              <text
                x="50%"
                y="50%"
                height="19"
                fontSize="20"
                fontWeight="700"
                textAnchor="middle"
                fill="currentColor"
                fontFamily="helvetica"
                dominantBaseline="central"
              >
                {data.icon}
              </text>
            </g>
          </svg>
        ) : (
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
