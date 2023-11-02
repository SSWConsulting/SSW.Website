import Image from "next/image";
import Link from "next/link";
import { Template } from "tinacms";
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";
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
    <Link href={link || ""} passHref className="!no-underline">
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
    </Link>
  );
};

export const eventLinkSchema: Template = {
  name: "EventLink",
  label: "Event Link",
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
      // @ts-expect-error tinacms types are wrong
      uploadDir: () => "events",
    },
    {
      type: "string",
      label: "Thumbnail Alt Text",
      name: "thumbnailAlt",
    },
  ],
};
