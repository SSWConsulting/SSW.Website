import Image from "next/image";
import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import {
  YoutubePlaylistBlock,
  YoutubePlaylistProps,
} from "../../blocks/youtubePlaylist";
import { Container } from "../../util/container";

type VideosSectionProps = {
  globalUserGroupInfo?: {
    youtubePlaylist: YoutubePlaylistProps;
  };
};

export const VideosSection = (props: VideosSectionProps) => {
  const youtubePlaylistProps = props.globalUserGroupInfo.youtubePlaylist;

  return (
    <Container>
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
        <section
          data-tina-field={tinaField(
            props.globalUserGroupInfo.youtubePlaylist,
            "playlistId"
          )}
        >
          {" "}
          <YoutubePlaylistBlock {...youtubePlaylistProps} />
        </section>
      </div>
    </Container>
  );
};

export const videosSectionBlockSchema: Template = {
  name: "VideosSection",
  label: "Videos Section",
  fields: [
    {
      type: "reference",
      label: "Global User Group Info",
      name: "globalUserGroupInfo",
      collections: ["userGroupGlobal"],
      required: true,
    },
  ],
};
