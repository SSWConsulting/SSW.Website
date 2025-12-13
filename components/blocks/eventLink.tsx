import Image from "next/image";
import { Template } from "tinacms";
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";
import { CustomLink } from "../customLink";
import { flagSchema } from "./flag";
import { componentRenderer } from "./mdxComponentRenderer";

export type EventLinkProps = {
  link?: string;
  eventThumbnail?: string;
  thumbnailAlt?: string;
  content?: TinaMarkdownContent;
};

export const EventLink = ({
  link,
  eventThumbnail,
  thumbnailAlt,
  content,
}: EventLinkProps) => {
  return (
    <CustomLink href={link || ""} className="!no-underline">
      <div className="flex flex-row gap-4 rounded-lg px-4 hover:bg-gray-100">
        {eventThumbnail && (
          <Image
            src={eventThumbnail}
            alt={thumbnailAlt || "Event link thumbnail"}
            width={150}
            height={150}
          />
        )}
        <div className="children-h3:!font-semibold children-h3:!text-sswRed">
          <TinaMarkdown content={content} components={componentRenderer} />
        </div>
      </div>
    </CustomLink>
  );
};

export const eventLinkSchema: Template = {
  name: "EventLink",
  label: "Event Link",
  ui: {
    previewSrc: "/images/thumbs/tina/event-link.jpg",
  },
  fields: [
    {
      type: "rich-text",
      label: "Content",
      name: "content",
      templates: [flagSchema],
    },
    {
      type: "string",
      label: "Link",
      name: "link",
    },
    {
      type: "image",
      label: "Thumbnail",
      name: "eventThumbnail",
      uploadDir: () => "events",
    },
    {
      type: "string",
      label: "Thumbnail Alt Text",
      name: "thumbnailAlt",
    },
  ],
};
