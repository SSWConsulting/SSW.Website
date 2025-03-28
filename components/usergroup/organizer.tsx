"use client";
import Image from "next/image";
import { useState } from "react";
import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import type { TinaMarkdownContent } from "tinacms/dist/rich-text";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { CustomLink } from "../customLink";
import { ReadMore } from "./readMore";

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
  const [image, setFallbackImage] = useState<string>(data.profileImg ?? "");
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row items-center gap-2">
        <div
          className="size-17 overflow-hidden rounded-full"
          data-tina-field={tinaField(data, "name")}
        >
          <Image
            alt={`Picture of ${data?.name ?? "Organizer"}`}
            src={image}
            height={68}
            width={68}
            onError={() =>
              setFallbackImage("/images/thumbs/avatar-thumbnail.png")
            }
            className="w-17"
          />
        </div>
        <div className="font-sans">
          <CustomLink
            data-tina-field={tinaField(data, "profileLink")}
            className="cursor-pointer text-2xl underline"
            href={data?.profileLink ?? "/"}
          >
            <span data-tina-field={tinaField(data, "name")}>
              {data?.name ?? ""}
            </span>
          </CustomLink>
          <div
            data-tina-field={tinaField(data, "position")}
            className="text-sm"
          >
            {data?.position ?? ""}
          </div>
        </div>
      </div>
      <div data-tina-field={tinaField(data, "content")} className="text-left">
        {data?.content && <TinaMarkdown content={data?.content} />}
        {/* Here for the case where the content comes from SharePoint */}
        {stringContent && (
          <ReadMore text={stringContent} length={200} className="text-lg" />
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
