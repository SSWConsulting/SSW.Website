"use client";
import { Container } from "@/components/util/container";
import getYouTubeVideoId from "@/services/client/youtube.service";
import "aos/dist/aos.css";
import Image from "next/image";
import { classNames } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import V2ComponentWrapper from "../../layout/v2ComponentWrapper";

export const ImageComponentLayout = ({ data, children }) => {
  const imageIsLeftAligined = data.mediaConfiguration?.placement === "Left";
  const isYouTube = data.mediaConfiguration?.mediaType === "youtube";
  const youtubeVideoId = getYouTubeVideoId(data.mediaConfiguration?.youtubeUrl);
  const getVerticalImagePlacement = () => {
    switch (data.mediaConfiguration?.verticalPlacement) {
      case "Top":
        return "mb-auto";
      case "Bottom":
        return "mt-auto";
      default:
        return "my-auto";
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
        className={classNames(
          "mx-auto flex flex-col gap-8 align-middle md:grid md:gap-16",
          data.mediaConfiguration?.imageSource || youtubeVideoId
            ? "md:grid-cols-2"
            : "md:grid-cols-1",
          data.mediaConfiguration?.mobilePlacement === "Above"
            ? "flex-col-reverse"
            : "flex-col",
          data.mediaConfiguration?.verticalPlacement === "Bottom"
            ? "pt-12"
            : "py-12"
        )}
      >
        <div
          className={classNames(
            "flex w-full flex-col",
            (data?.mediaConfiguration?.imageSource || youtubeVideoId) &&
              "md:items-start",
            getVerticalTextPlacement(),
            imageIsLeftAligined && "md:order-2"

            // data.mediaConfiguration?.verticalPlacement === "Bottom" && "pb-12"
          )}
        >
          {children}
        </div>

        {(data.mediaConfiguration?.imageSource || youtubeVideoId) && (
          <div
            className={classNames(
              "relative flex w-full md:aspect-auto",
              imageIsLeftAligined && "md:order-1"
            )}
          >
            {isYouTube && youtubeVideoId ? (
              <iframe
                className={classNames(
                  "absolute inset-0 aspect-video w-full rounded-md"
                )}
                src={`https://www.youtube.com/embed/${youtubeVideoId}?rel=0`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                data-tina-field={tinaField(data, "mediaConfiguration")}
              />
            ) : (
              !isYouTube &&
              data.mediaConfiguration?.imageSource &&
              data.mediaConfiguration?.imageWidth &&
              data.mediaConfiguration?.imageHeight && (
                <Image
                  width={data.mediaConfiguration?.imageWidth}
                  height={data.mediaConfiguration?.imageHeight}
                  className={classNames(getVerticalImagePlacement())}
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
