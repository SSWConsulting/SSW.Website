import Image from "next/image";
import Link from "next/link";
import type { Template } from "tinacms";
import type { TinaMarkdownContent } from "tinacms/dist/rich-text";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export type OrganizerType = {
  name: string;
  profileImg?: string;
  profileLink?: string;
  position?: string;
  content?: TinaMarkdownContent;
};

export const Organizer = ({
  data,
  stringContent,
}: {
  data: OrganizerType;
  stringContent?: string;
}) => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row items-center gap-2">
        <div
          className="h-17 w-17 overflow-hidden rounded-full"
          data-tina-field={tinaField(data, "name")}
        >
          <Image
            alt={`Picture of ${data?.name ?? "Organizer"}`}
            src={data?.profileImg ?? ""}
            height={68}
            width={68}
          />
        </div>
        <div className="font-sans">
          <Link
            data-tina-field={tinaField(data, "profileLink")}
            className="cursor-pointer text-2xl underline"
            href={data?.profileLink ?? "/"}
          >
            <span data-tina-field={tinaField(data, "name")}>
              {data?.name ?? ""}
            </span>
          </Link>
          <div
            data-tina-field={tinaField(data, "position")}
            className="text-sm text-gray-500"
          >
            {data?.position ?? ""}
          </div>
        </div>
      </div>
      <div data-tina-field={tinaField(data, "content")} className="text-lg">
        {data?.content && <TinaMarkdown content={data?.content} />}
        {stringContent && (
          <div dangerouslySetInnerHTML={{ __html: stringContent }} />
        )}
      </div>
    </div>
  );
};

export const organizerSchema: Template = {
  label: "Organizer",
  name: "organizer",
  fields: [
    {
      type: "image",
      label: "Profile Image",
      name: "profileImg",
    },
    {
      type: "string",
      label: "Profile Link",
      name: "profileLink",
    },
    {
      type: "string",
      label: "Name",
      name: "name",
    },
    {
      type: "string",
      label: "Position",
      name: "position",
    },
    {
      type: "rich-text",
      label: "Content",
      name: "content",
    },
  ],
};
