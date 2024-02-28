import Image from "next/image";
import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import { UtilityButton } from "../../blocks";
import { YoutubePlaylistBlock } from "../../blocks/youtubePlaylist";
import { Container } from "../../util/container";

type VideosSectionProps = {
  globalUserGroupInfo?: {
    youtubePlaylist: {
      playlistId: string;
      numberOfVideos: number;
    };
    videosButton?: {
      link?: string;
      text?: string;
    };
  };
};

export const VideosSection = (props: VideosSectionProps) => {
  const { globalUserGroupInfo } = props;
  const button = globalUserGroupInfo?.videosButton;

  const youtubePlaylistProps = {
    playlistId: globalUserGroupInfo?.youtubePlaylist.playlistId,
    numberOfVideos: globalUserGroupInfo?.youtubePlaylist.numberOfVideos,
  };

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
        <YoutubePlaylistBlock {...youtubePlaylistProps} />
        {button && button.text && button.link && (
          <div
            data-tina-field={tinaField(
              props.globalUserGroupInfo.videosButton,
              "text"
            )}
          >
            <UtilityButton
              link={button.link}
              buttonText={button.text}
              className="mx-auto text-base font-semibold"
              animated
            />
          </div>
        )}
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
