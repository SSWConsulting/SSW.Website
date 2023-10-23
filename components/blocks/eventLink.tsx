import Image from "next/image";
import Link from "next/link";
import { Template } from "tinacms";
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";

export type EventLinkProps = {
  heading?: string;
  link?: string;
  eventThumbnail?: string;
  description?: TinaMarkdownContent;
};

export const EventLink = ({ heading, link, eventThumbnail, description }) => {
  return (
    <Link href={link || ""} passHref className="!no-underline">
      <div className="flex flex-row gap-4 rounded-lg px-4 hover:bg-gray-100">
        <Image
          src={eventThumbnail || ""}
          alt={heading}
          width={150}
          height={150}
        />
        <div>
          <h3 className="font-semibold text-sswRed">{heading}</h3>
          <TinaMarkdown content={description} />
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
      type: "string",
      label: "Heading",
      name: "heading",
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
    },
    {
      type: "rich-text",
      label: "Description",
      name: "description",
    },
  ],
};
