import { Container } from "@/components/util/container";
import Image from "next/image";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { backgroundOptions } from "../sharedTinaFields/colourOptions/blockBackgroundOptions";
import { IconLabel } from "./iconLabel";
import { ListItem } from "./listItem";
import { PillGroup } from "./pillGroup";

export const ImageTextBlock = ({ data }) => {
  return (
    <section
      className={`${
        backgroundOptions.find((value) => {
          return value.reference === data.background;
        })?.classes
      } w-full`}
    >
      <Container className="mx-auto flex align-top">
        <div className="w-full">
          {data.topLabel && <IconLabel data={data.topLabel} />}
          {data.isH1 ? (
            <h1 data-tina-field={tinaField(data, "heading")}>{data.heading}</h1>
          ) : (
            <h2 data-tina-field={tinaField(data, "heading")}>{data.heading}</h2>
          )}
          <TinaMarkdown
            content={data.description}
            data-tina-field={tinaField(data, "description")}
          />
          {data.chips && <PillGroup data={data.chips} />}
          <div
            className={`grid ${data.featureColumns?.twoColumns ? "grid-cols-2" : "grid-cols-1"}`}
          >
            {data.featureColumns?.features?.map((item, index) => {
              return <ListItem key={index} data={item} />;
            })}
          </div>
        </div>
        <div className="relative w-full">
          {data.mediaConfuguration?.imageSource && (
            <Image
              src={data.mediaConfuguration?.imageSource}
              alt={data.mediaConfuguration?.altText ?? "image"}
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
