import Image from "next/image";
import { Section } from "../util/section";

const EventsHeader = ({ data }) => {
  return (
    <Section className="relative flex h-102 items-center justify-center border-b-8 border-sswRed">
      <Image
        src={data?.heroBackground || "/images/polygonBackground.png"}
        alt={data?.altText || "Events header background"}
        layout="fill"
        className="bg-contain bg-no-repeat"
        sizes="(max-width: 768px) 50vw, 1728px"
        priority
      />
      {data?.imgOverlay && (
        <div className="z-10 flex max-w-2xl lg:max-w-3xl">
          <Image
            src={data.imgOverlay}
            alt={data?.altText}
            height={400}
            width={680}
            priority
          />
        </div>
      )}
    </Section>
  );
};

export const eventsHeaderSchema = {
  type: "object",
  label: "Events Header",
  name: "eventHeader",
  fields: [
    {
      type: "image",
      label: "Hero Background",
      name: "heroBackground",
      uploadDir: () => "background",
    },
    {
      type: "string",
      label: "Alt Text",
      name: "altText",
    },
    {
      type: "image",
      label: "Image Overlay",
      name: "imgOverlay",
      uploadDir: () => "background",
    },
  ],
};

export default EventsHeader;
