"use client";
import { Button } from "@/components/button/templateButton";
import { Container } from "@/components/util/container";
import { Consultingv2BlocksImageTextBlock } from "@/tina/types";
import "aos/dist/aos.css";
import Image from "next/image";
import Link from "next/link";
import { classNames } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { IconLabel } from "./iconLabel";
import { ListItem } from "./listItem";
import { PillGroup } from "./pillGroup";
import { default as V2ComponentWrapper } from "./v2ComponentWrapper";

export const ImageTextBlock = ({
  data,
}: {
  data: Consultingv2BlocksImageTextBlock;
}) => {
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
          className={classNames("w-full", imageIsLeftAligined && "md:order-2")}
        >
          {data.topLabel && <IconLabel data={data.topLabel} />}
          {data.isH1 ? (
            <h1
              data-tina-field={tinaField(data, "heading")}
              className="my-0 py-2 text-3xl font-bold lg:text-4xl dark:text-gray-200"
            >
              {data.heading}
            </h1>
          ) : (
            <h2
              data-tina-field={tinaField(data, "heading")}
              className="my-0 py-2 text-2xl font-bold lg:text-3xl dark:text-gray-200"
            >
              {data.heading}
            </h2>
          )}
          <TinaMarkdown
            content={data.description}
            components={{
              p: (props) => (
                <p
                  {...props}
                  className="py-2 text-base font-light dark:text-gray-300"
                  data-tina-field={tinaField(data, "description")}
                />
              ),
              h6: () => <></>,
              h5: () => <></>,
              h4: () => <></>,
              h3: () => <></>,
              h2: () => <></>,
              h1: () => <></>,
            }}
          />
          {data.chips && <PillGroup data={data.chips} />}
          <div
            className={`grid ${data.featureColumns?.twoColumns ? "grid-cols-2" : "grid-cols-1"}`}
          >
            {data.featureColumns?.features?.map((item, index) => {
              return <ListItem key={index} data={item} />;
            })}
          </div>
          {data.buttons?.length > 0 && (
            <div className="mt-5 flex gap-3">
              {data.buttons?.map((button, index) => {
                const buttonElement = (
                  <Button
                    className="text-base font-semibold"
                    key={`image-text-button-${index}`}
                    data={button}
                  />
                );

                return button.buttonLink ? (
                  <Link href={button.buttonLink} key={`link-wrapper-${index}`}>
                    {buttonElement}
                  </Link>
                ) : (
                  <>{buttonElement}</>
                );
              })}
            </div>
          )}
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
