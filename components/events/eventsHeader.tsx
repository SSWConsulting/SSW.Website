import Image, { getImageProps } from "next/image";
import { getBackgroundImage } from "../../helpers/images";
import { Section } from "../util/section";

const EventsHeader = ({ data }) => {
  const {
    props: { srcSet },
  } = getImageProps({
    src: data?.heroBackground || "/images/polygonBackground.png",
    alt: "Events header background",
    height: 724,
    width: 1728,
  });
  const backgroundImage = getBackgroundImage(srcSet);

  return (
    <Section
      className="flex h-102 items-center justify-center border-b-8 border-sswRed bg-white bg-cover bg-no-repeat"
      style={{
        backgroundImage,
      }}
    >
      {data?.imgOverlay && (
        <div className="flex max-w-2xl lg:max-w-3xl">
          <Image
            src={data.imgOverlay}
            alt={data?.altText}
            height={400}
            width={680}
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
