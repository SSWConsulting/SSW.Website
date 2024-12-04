"use client";
import { Container } from "@/components/util/container";
import "aos/dist/aos.css";
import Image from "next/image";
import { classNames } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import V2ComponentWrapper from "./imageTextBlock/v2ComponentWrapper";

export const ImageComponentLayout = ({ data, children }) => {
  const imageIsLeftAligined = data.mediaConfiguration?.placement === "Left";

  return (
    <V2ComponentWrapper data={data} shouldFadeIn={true}>
      <Container
        className={classNames(
          "mx-auto flex flex-col gap-8 align-top md:grid md:gap-16",
          data.mediaConfiguration?.imageSource
            ? "md:grid-cols-2"
            : "md:grid-cols-1",
          data.mediaConfiguration?.mobilePlacement === "Above"
            ? "flex-col-reverse"
            : "flex-col"
        )}
      >
        <div
          className={classNames(
            "aspect-auto w-full md:aspect-4/3",
            imageIsLeftAligined && "md:order-2"
          )}
        >
          {children}
        </div>

        {data.mediaConfiguration?.imageSource && (
          <div
            className={classNames(
              "relative aspect-4/3 w-full md:aspect-auto",
              imageIsLeftAligined && "md:order-1"
            )}
          >
            {data.mediaConfiguration.verticalPlacement === "Center"}
            <Image
              objectFit="contain"
              fill={true}
              className={classNames(
                data.mediaConfiguration?.verticalPlacement === "Centered" &&
                  "my-auto",
                "!h-auto rounded-md"
              )}
              src={data.mediaConfiguration?.imageSource}
              alt={data.mediaConfiguration?.altText ?? "image"}
              data-tina-field={tinaField(data, "mediaConfiguration")}
            />
          </div>
        )}
      </Container>
    </V2ComponentWrapper>
  );
};
