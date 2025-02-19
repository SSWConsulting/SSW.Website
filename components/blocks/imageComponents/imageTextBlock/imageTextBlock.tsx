"use client";
import AlternatingText from "@/components/alternating-text";
import ButtonRow from "@/components/blocksSubtemplates/buttonRow";
import { cn } from "@/lib/utils";
import "aos/dist/aos.css";
import classNames from "classnames";
import React from "react";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { IconLabel } from "../../../blocksSubtemplates/iconLabel";
import { ListItem } from "../../../blocksSubtemplates/listItem";
import { PillGroup } from "../../../blocksSubtemplates/pillGroup";

import { ImageComponentLayout } from "../ImageComponentLayout";

export const ImageTextBlock = ({ data }) => {
  const hasMedia =
    data.mediaConfiguration?.imageSource || data.mediaConfiguration?.youtubeUrl;
  const noImageCenter = hasMedia ? "xl:justify-start" : "xl:justify-center";
  const getTabletAlignment = () => {
    switch (data.tabletTextAlignment) {
      case "Left":
        return "text-left";
      default:
        return "text-center";
    }
  };
  return (
    <ImageComponentLayout data={data}>
      {data.topLabel && (data.toplabel?.icon || data.topLabel?.labelText) && (
        <IconLabel data={data.topLabel} />
      )}

      <section className={cn(getTabletAlignment(), hasMedia && "sm:text-left")}>
        {data.heading && <Heading data={data} />}

        {data.description && (
          <TinaMarkdown
            content={data.description}
            components={{
              p: (props) => (
                <p
                  {...props}
                  className={classNames(
                    "py-2 text-base font-light dark:text-gray-300"
                  )}
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
        )}
      </section>

      {data.chips && <PillGroup data={data.chips} />}
      <div
        className={`grid gap-x-3 ${data.featureColumns?.twoColumns ? "sm:grid-cols-2" : "grid-cols-1"}`}
      >
        {data.featureColumns?.features?.map((item, index) => {
          return <ListItem key={index} data={item} />;
        })}
      </div>
      <ButtonRow
        data={data}
        className={cn(
          noImageCenter,
          "mt-5 flex-wrap",
          data.tabletTextAlignment === "Left" || "justify-center"
        )}
      />
    </ImageComponentLayout>
  );
};

const Heading = ({ data }) => {
  const headingClasses = "my-0 py-2 dark:text-gray-200";
  return (
    <>
      {data.isH1 ? (
        <h1
          data-tina-field={tinaField(data, "heading")}
          className={classNames(
            headingClasses,
            "text-3xl font-bold lg:text-4xl"
          )}
        >
          <AlternatingText text={data.heading} />
        </h1>
      ) : (
        <h2
          data-tina-field={tinaField(data, "heading")}
          className={classNames(
            "text-2xl font-semibold lg:text-3xl",
            headingClasses
          )}
        >
          <AlternatingText text={data.heading} />
        </h2>
      )}
    </>
  );
};
