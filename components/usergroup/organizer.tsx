import Image from "next/image";
import { Template } from "tinacms";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export const Organizer = (organizer) => {
  return (
    <div className="flex flex-col gap-5 font-helvetica">
      <span className="text-4xl text-sswRed">Organizer</span>
      <div className="flex flex-row gap-2">
        <div className="h-17 w-17 overflow-hidden rounded-full">
          <Image
            alt={`Picture of ${organizer?.avatar} ?? "Organizer"`}
            src={organizer?.profileImg ?? ""}
            height={120}
            width={120}
            className="w-32"
          />
        </div>
        <div>
          <div>{organizer?.name ?? ""}</div>
          <div>{organizer?.position ?? ""}</div>
        </div>
      </div>
      <div>
        <TinaMarkdown content={organizer.content} />
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
