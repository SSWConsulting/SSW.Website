import type { Template } from "tinacms";
import Image from "next/image";
import { VideoCard } from "../../util/videoCards";
import { Container } from "../../util/container";
import { UtilityButton } from "../../blocks";
import { tinaField } from "tinacms/dist/react";

type VideosSectionProps = {
  videos?: {
    link?: string;
    title?: string;
  }[];
  button?: {
    link?: string;
    text?: string;
  };
};

export const VideosSection = (props: VideosSectionProps) => {
  return (
    <section>
      <Container>
        <div>
          <div className="flex flex-col items-center">
            <div className="mb-12 flex-row items-center justify-center text-center md:flex">
              <h2 className="!my-0 text-4xl font-semibold">
                <span className="text-sswRed">Featured Videos </span> from{" "}
              </h2>{" "}
              <Image
                src="/images/sswtv_logo.png"
                alt="SSW TV logo"
                className="mx-auto shrink-0 grow-0 object-contain pl-4"
                height={50}
                width={200}
              />
            </div>
            <div className="grid grid-cols-1 justify-center gap-8 lg:grid-cols-3">
              {props.videos?.map((video, index) => (
                <div data-tina-field={tinaField(props.videos[index], "title")}>
                  <VideoCard {...video} key={index} theme="light" />
                </div>
              ))}
            </div>
            {props.button && props.button.text && props.button.link && (
              <div data-tina-field={tinaField(props.button, "text")}>
                <UtilityButton
                  link={props.button.link}
                  buttonText={props.button.text}
                  className="mx-auto text-md font-semibold"
                  noAnimate
                />
              </div>
            )}
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
    {
      type: "object",
      label: "Button options",
      name: "button",
      fields: [
        {
          type: "string",
          label: "Link",
          name: "link",
        },
        {
          type: "string",
          label: "Text",
          name: "text",
        },
      ],
    },
  ],
};
