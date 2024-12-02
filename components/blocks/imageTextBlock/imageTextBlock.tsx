import { Button } from "@/components/button/templateButton";
import { Container } from "@/components/util/container";
import Image from "next/image";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { backgroundOptions } from "../sharedTinaFields/colourOptions/blockBackgroundOptions";
import { IconLabel } from "./iconLabel";
import { ListItem } from "./listItem";
import { PillGroup } from "./pillGroup";

import { Consultingv2BlocksImageTextBlock } from "@/tina/types";

export const ImageTextBlock = ({
  data,
}: {
  data: Consultingv2BlocksImageTextBlock;
}) => {
  return (
    <section
      className={`${
        backgroundOptions.find((value) => {
          return value.reference === data.background;
        })?.classes
      } w-full`}
    >
      <Container
        className={classNames(
          "mx-auto flex gap-16 align-top",
          data.mediaConfiguration?.placement === "Left" && "flex-row-reverse"
        )}
      >
        <div className="w-full">
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

          <div className="mt-5 flex gap-3">
            {data.buttons?.map((button, index) => {
              return (
                <Button
                  className="font-semibold"
                  key={`image-text-button-${index}`}
                  data={button}
                />
              );
            })}
          </div>
        </div>
        <div className="relative w-full">
          {data.mediaConfiguration?.imageSource && (
            <Image
              src={data.mediaConfiguration?.imageSource}
              alt={data.mediaConfiguration?.altText ?? "image"}
              fill={true}
              objectFit="contain"
              data-tina-field={tinaField(data, "mediaConfiguration")}
            />
          )}
        </div>
      </Container>
    </section>
  );
};
