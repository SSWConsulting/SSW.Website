import type { Template } from "tinacms";
import Image from "next/image";
import { VideoCard } from "../../util/videoCards";
import { Container } from "../../util/container";
import { UtilityButton } from "../../blocks";

type VideosSectionProps = {
  videos?: {
    link?: string;
    title?: string;
  }[];
};

export const VideosSection = (props: VideosSectionProps) => {
  return (
    <section className="child:!font-helvetica">
      <Container>
        <div>
          <div className="flex flex-col items-center">
            <div className="mb-12 flex flex-row items-center justify-center">
              <h2 className="!my-0 font-helvetica text-4xl font-semibold">
                <span className="text-sswRed">Featured Videos </span> from{" "}
              </h2>{" "}
              <Image
                src="/images/sswtv_logo.png"
                alt="SSW TV logo"
                className="shrink-0 grow-0  object-contain pl-4"
                height={50}
                width={200}
              />
            </div>
            <div className="grid grid-cols-1 justify-center gap-8 lg:grid-cols-3">
              {props.videos?.map((video, index) => (
                <VideoCard {...video} key={index} theme="light" />
              ))}
            </div>
            <UtilityButton
              link="https://www.youtube.com/channel/UCBFgwtV9lIIhvoNh0xoQ7Pg"
              buttonText="Watch more on the SSW TV YouTube channel"
              className="mx-auto text-md font-semibold"
              noAnimate
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export const videosSectionBlockSchema: Template = {
  name: "VideosSection",
  label: "Videos Section",
  fields: [
    {
      type: "object",
      list: true,
      label: "Videos",
      name: "videos",
      fields: [
        {
          type: "string",
          label: "Link",
          name: "link",
        },
        {
          type: "string",
          label: "Title",
          name: "title",
        },
      ],
      ui: {
        itemProps: (item) => ({
          label: item?.title,
        }),
      },
    },
  ],
};
