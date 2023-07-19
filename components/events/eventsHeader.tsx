import Image from "next/image";
import { Section } from "../util/section";

const EventsHeader = ({ data }) => {
  return (
    <Section
      className="flex h-full flex-col items-center border-b-8 border-sswRed bg-white bg-cover bg-no-repeat lg:block"
      style={{
        backgroundImage: `url(${
          data?.heroBackground || "/images/polygonBackground.png"
        })`,
      }}
    >
      <div className="flex max-w-2xl ">
        <Image
          src={data?.centeredImg}
          alt={data?.altText}
          height={400}
          width={400}
        />
      </div>
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
      uploadDir: () => "/background",
    },
    {
      type: "image",
      label: "Centered Image",
      name: "centeredImg",
      uploadDir: () => "/background",
    },
  ],
};

export default EventsHeader;
