import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiFillPlayCircle } from "react-icons/ai";
import { Section } from "./section";
import { Container } from "./container";
import Button from "../button/button";

export type VideoCardProps = {
  link: string,
  thumbnail: string,
  title: string,
};

const VideoCard: FC<VideoCardProps> = ({ link, thumbnail, title }) => {
  return (
    <div
      className="flex flex-col rounded bg-white"
    >
      <div>
        <Image
          src={thumbnail || "/public/images/ssw-logo.svg"}
          alt={thumbnail ? title : "SSW Consulting"}
          height={0}
          width={500}
          className="w-full"
        />
      </div>
      <div className="flex h-full items-center justify-between p-5">
        <span className="w-3/4 text-left text-lg font-bold text-sswRed">{title}</span>
        <Link href={link || ""}>
          <AiFillPlayCircle className="text-sswRed" size={50} />
        </Link>
      </div>
    </div>
  );
};

const VideoCards: FC<{ cardProps: VideoCardProps[] }> = ({
  cardProps,
}) => {
  if (cardProps.length == 0) return null;

  const cards = cardProps.map((p, i) => <VideoCard key={i} {...p} />);

  return (
    <Section 
      className="bg-polygons bg-cover bg-no-repeat py-10"
    >
      <Container size="default">
        <div className="flex flex-col items-center">
          <div className="mb-15 flex flex-col items-center">
            <div className="mb-7 flex flex-col items-center sm:mb-3 sm:flex-row">
              <span className="text-4xl text-white"><span className="text-sswRed">Popular</span> courses from</span>
              <Image
                className="ml-2"
                src={"/images/sswtv-logo.svg"}
                alt={"SSW TV"}
                height={50}
                width={200}
              />
            </div>
            <span className="text-gray-500">The most popular courses from our developers</span>
          </div>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">{cards}</div>
          <Button
            ripple
            className="mt-15"
            href="https://www.youtube.com/@SSWTV"
            data-aos="fade-up"
          >
            <a className="unstyled px-7" href="https://www.youtube.com/@SSWTV">Watch More Videos</a>
          </Button>
        </div>
      </Container>
    </Section>
  );
};

export const videoCardSchema = {
  type: "object",
  label: "Videos",
  name: "videos",
  fields: [
    {
      type: "object",
      label: "Video Cards",
      name: "videoCards",
      list: true,
      fields: [
        {
          type: "string",
          label: "Title",
          name: "title",
        },
        {
          type: "string",
          label: "Link",
          name: "link",
        },
        {
          type: "image",
          label: "Thumbnail",
          name: "thumbnail",
        },
      ],
    },
  ]
}

export default VideoCards;
