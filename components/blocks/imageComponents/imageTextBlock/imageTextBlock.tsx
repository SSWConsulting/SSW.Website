"use client";
import { Button } from "@/components/button/templateButton";
import "aos/dist/aos.css";
import classNames from "classnames";
import Link from "next/link";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { IconLabel } from "../../../blocksSubtemplates/iconLabel";
import { ListItem } from "../../../blocksSubtemplates/listItem";
import { PillGroup } from "../../../blocksSubtemplates/pillGroup";
import { ImageComponentLayout } from "../ImageComponentLayout";

export const ImageTextBlock = ({ data }) => {
  const headingClasses = "my-0 py-2 dark:text-gray-200";
  const noImageCenter = data.mediaConfiguration?.imageSource
    ? ""
    : "justify-center";

  return (
    <ImageComponentLayout data={data}>
      {data.topLabel && <IconLabel data={data.topLabel} />}
      {data.isH1 ? (
        <h1
          data-tina-field={tinaField(data, "heading")}
          className={classNames(
            headingClasses,
            "text-3xl font-bold lg:text-4xl"
          )}
        >
          {data.heading}
        </h1>
      ) : (
        <h2
          data-tina-field={tinaField(data, "heading")}
          className={classNames(
            "text-2xl font-semibold lg:text-3xl",
            headingClasses
          )}
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

      {data.chips && <PillGroup data={data.chips} />}
      <div
        className={`grid ${data.featureColumns?.twoColumns ? "grid-cols-2" : "grid-cols-1"}`}
      >
        {data.featureColumns?.features?.map((item, index) => {
          return <ListItem key={index} data={item} />;
        })}
      </div>
      {data.buttons?.length > 0 && (
        <div className={classNames("mt-5 flex flex-wrap gap-3", noImageCenter)}>
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
    </ImageComponentLayout>
  );
};
