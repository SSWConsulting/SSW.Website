"use client";
import { Container } from "@/components/util/container";
import { VideoModal } from "@/components/videoModal";
import "aos/dist/aos.css";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { tinaField } from "tinacms/dist/react";
import V2ComponentWrapper from "../../layout/v2ComponentWrapper";

export const ImageComponentLayout = ({ data, children, priority = false }) => {
  const imageIsLeftAligined = data.mediaConfiguration?.placement === "Left";
  // Editors can force priority loading via the CMS tick-box; otherwise fall back
  // to the renderer's automatic first-block rule.
  const loadWithPriority =
    data.mediaConfiguration?.loadWithPriority || priority;

  const isYouTube = data.mediaConfiguration?.mediaType === "youtube";
  const isImage =
    !isYouTube &&
    data.mediaConfiguration?.imageSource &&
    data.mediaConfiguration?.imageWidth &&
    data.mediaConfiguration?.imageHeight;
  const hasMedia = isYouTube || isImage;

  const youtubeUrl = data.mediaConfiguration?.youtubeUrl;

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
        className={cn(
          "mx-auto flex flex-col gap-8 py-8 align-middle sm:py-12 md:gap-16 xl:grid",
          data.mediaConfiguration?.imageSource || youtubeUrl
            ? "md:grid-cols-2"
            : "md:grid-cols-1",
          data.mediaConfiguration?.mobilePlacement === "Above"
            ? "flex-col-reverse"
            : "flex-col"
        )}
      >
        <div
          className={cn(
            "flex w-full flex-col",
            hasMedia && "xl:items-start xl:text-start",
            getVerticalTextPlacement(),
            imageIsLeftAligined && "xl:order-2"
          )}
        >
          {children}
        </div>

        {(data.mediaConfiguration?.imageSource || youtubeUrl) && (
          <div
            className={cn(
              "relative flex w-full",
              getVerticalMediaPlacement(),
              imageIsLeftAligined && "xl:order-1"
            )}
          >
            {isYouTube && youtubeUrl ? (
              <VideoModal
                frameClassName="rounded"
                className="w-full"
                url={youtubeUrl}
                priority={loadWithPriority}
              />
            ) : (
              isImage && (
                <Image
                  width={data.mediaConfiguration?.imageWidth}
                  priority={loadWithPriority}
                  // next/image's `priority` alone no longer emits the
                  // fetchpriority="high" hint (Next 15.5 only forwards an
                  // explicit fetchPriority prop), and Lighthouse flags the
                  // LCP image without it
                  fetchPriority={loadWithPriority ? "high" : undefined}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  height={data.mediaConfiguration?.imageHeight}
                  className={cn("w-full rounded-md")}
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
