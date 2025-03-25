"use client";
import { YouTubeEmbed } from "@/components/embeds/youtubeEmbed";
import { Container } from "@/components/util/container";
import { VideoModal } from "@/components/videoModal";
import getYouTubeVideoId from "@/services/client/youtube.service";
import "aos/dist/aos.css";
import Image from "next/image";
import { classNames } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import V2ComponentWrapper from "../../layout/v2ComponentWrapper";

export const ImageComponentLayout = ({ data, children }) => {
  const imageIsLeftAligined = data.mediaConfiguration?.placement === "Left";

  const isYouTube = data.mediaConfiguration?.mediaType === "youtube";
  const isImage =
    !isYouTube &&
    data.mediaConfiguration?.imageSource &&
    data.mediaConfiguration?.imageWidth &&
    data.mediaConfiguration?.imageHeight;
  const hasMedia = isYouTube || isImage;
  const youtubeVideoId = getYouTubeVideoId(data.mediaConfiguration?.youtubeUrl);

  const getVerticalMediaPlacement = () => {
    switch (data.mediaConfiguration?.verticalPlacement) {
      case "Top":
        return "items-start";
      case "Bottom":
        return "items-end";
      default:
        return "items-center";
    }
  };

  const getVerticalTextPlacement = () => {
    switch (data.mediaConfiguration?.verticalPlacement) {
      case "Top":
        return "justify-start";
      case "Bottom":
        return "justify-end";
      default:
        return "justify-center";
    }
  };

  return (
    <V2ComponentWrapper data={data}>
      <Container
        size="custom"
        padding="px-4 sm:px-8"
        className={classNames(
          "mx-auto flex flex-col gap-8 py-8 align-middle sm:py-12 md:gap-16 xl:grid",
          data.mediaConfiguration?.imageSource || youtubeVideoId
            ? "md:grid-cols-2"
            : "md:grid-cols-1",
          data.mediaConfiguration?.mobilePlacement === "Above"
            ? "flex-col-reverse"
            : "flex-col"
        )}
      >
        <div
          className={classNames(
            "flex w-full flex-col",
            hasMedia && "xl:items-start xl:text-start",
            getVerticalTextPlacement(),
            imageIsLeftAligined && "xl:order-2"

            // data.mediaConfiguration?.verticalPlacement === "Bottom" && "pb-12"
          )}
        >
          {children}
        </div>

        {(data.mediaConfiguration?.imageSource || youtubeVideoId) && (
          <div
            className={classNames(
              "relative flex w-full",
              getVerticalMediaPlacement(),
              imageIsLeftAligined && "xl:order-1"
            )}
          >
            {isYouTube && youtubeVideoId ? (
              <VideoModal className="w-full" youtubeVideoId={youtubeVideoId} />
            ) : (
              isImage && (
                <Image
                  width={data.mediaConfiguration?.imageWidth}
                  loading="eager"
                  height={data.mediaConfiguration?.imageHeight}
                  className={classNames("w-full rounded-md")}
                  src={data.mediaConfiguration?.imageSource}
                  alt={data.mediaConfiguration?.altText ?? "image"}
                  data-tina-field={tinaField(data, "mediaConfiguration")}
                />
              )
            )}
          </div>
        )}
      </Container>
    </V2ComponentWrapper>
  );
};
