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
            `flex aspect-auto w-full flex-col justify-center ${data?.mediaConfiguration?.imageSource || youtubeVideoId ? "md:aspect-4/3" : "items-center"}`,
            imageIsLeftAligined && "md:order-2",
            data.mediaConfiguration?.verticalPlacement === "Bottom" && "pb-12"
          )}
        >
          {children}
        </div>

        {(data.mediaConfiguration?.imageSource || youtubeVideoId) && (
          <div
            className={classNames(
              "relative aspect-4/3 w-full md:aspect-auto",
              imageIsLeftAligined && "md:order-1"
            )}
          >
            {isYouTube && youtubeVideoId ? (
              <iframe
                className={classNames(
                  "absolute inset-0 aspect-video w-full rounded-md",
                  data.mediaConfiguration?.verticalPlacement === "Centered" &&
                    "my-auto",
                  data.mediaConfiguration?.verticalPlacement === "Bottom" &&
                    "mt-auto"
                )}
                src={`https://www.youtube.com/embed/${youtubeVideoId}?rel=0`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                data-tina-field={tinaField(data, "mediaConfiguration")}
              />
            ) : (
              data.mediaConfiguration?.imageSource && (
                <Image
                  objectFit="contain"
                  fill={true}
                  className={classNames(
                    data.mediaConfiguration?.verticalPlacement === "Centered" &&
                      "my-auto",
                    data.mediaConfiguration?.verticalPlacement === "Bottom" &&
                      "mt-auto",
                    "!h-auto rounded-md"
                  )}
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
