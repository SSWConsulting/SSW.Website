import Image from "next/image";
import { useRouter } from "next/router";
import * as React from "react";
import { tinaField } from "tinacms/dist/react";

import type { Template } from "tinacms";

import dynamic from "next/dynamic";
import { Container } from "../util/container";
import { Section } from "../util/section";

const CarouselImplementation = dynamic(() =>
  import("react-responsive-carousel").then((module) => (module.Carousel)
));

export const Carousel = ({ data }) => {
  const router = useRouter();

  const openItem = ({ link, openIn }) => {
    if (openIn === "newWindow") {
      window.open(link, "_blank");
      return;
    } else if (openIn === "sameWindow") {
      router.push(link);
      return;
    } else if (openIn === "modal") {
      window.open(link, "_blank");
      return;
    } else {
      // eslint-disable-next-line no-console
      console.log(`unknown openIn value '${openIn}'`);
    }
  };

  return (
    <Section
      className={`${data.showOnMobileDevices ? "flex" : "hidden md:flex"}`}
      color={data.backgroundColor}
    >
      <Container
        size="custom"
        className={/* eslint-disable-line */ "aspect-[1080/388] w-full"}
        data-tina-field={tinaField(data, carouselBlock.delay)}
      >
          {/* @ts-expect-error next/dynamic */}
          <CarouselImplementation
            autoPlay={true}
            infiniteLoop={true}
            showArrows={false}
            showThumbs={false}
            showStatus={false}
            stopOnHover={true}
            interval={data.delay * 1000} // Converting it to Seconds
            onClickItem={(x) => {
              if (data.items[x].link) {
                openItem(data.items[x]);
              }
            }}
            renderIndicator={createCarouselIndicator}
          >
            {data.items &&
              data.items.map((item, index: React.Key) => (
                <CarouselItemImage
                  key={index + item.label}
                  imgSrc={item.imgSrc}
                  label={item.label}
                  index={item.index}
                  carouselSchema={item.carouselSchema}
                />
              ))}
          </CarouselImplementation>
      </Container>
    </Section>
  );
};

type CarouselItemImageProps = {
  imgSrc: string;
  label: string;
  index: number;
  // tinacms accepts any, workaround for better type safety for this component
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  carouselSchema: any;
};

const CarouselItemImage = (props: CarouselItemImageProps) => {
  const { imgSrc, label, index, carouselSchema } = props;
  return (
    <div
      data-tina-field={tinaField(
        carouselSchema,
        carouselBlock.items.value + `[${index}]`
      )}
    >
      <Image
        src={imgSrc ?? ""}
        alt={label}
        height={388}
        width={1080}
        sizes="100vw"
        priority={index === 0}
      />
      {/* `legend` required so that the carousel works properly */}
      <p className="legend sr-only">{label}</p>
    </div>
  );
};

const createCarouselIndicator = (onClickHandler, isSelected, index, label) => {
  if (isSelected) {
    return (
      <li
        className="mx-1 my-0 inline-block size-7 bg-sswRed"
        aria-label={`Selected: ${label} ${index + 1}`}
        title={`Selected: ${label} ${index + 1}`}
      />
    );
  }
  return (
    <li
      className="mx-1 my-0 inline-block size-7 bg-gray-500"
      onClick={onClickHandler}
      onKeyDown={onClickHandler}
      value={index}
      key={index}
      role="button"
      tabIndex={0}
      title={`${label} ${index + 1}`}
      aria-label={`${label} ${index + 1}`}
    />
  );
};

export const carouselBlock = {
  items: {
    value: "items",
    label: "label",
    link: "link",
    imgSrc: "imgSrc",
  },
  delay: "delay",
};

export const carouselBlockSchema: Template = {
  name: "Carousel",
  label: "Carousel",
  ui: {
    previewSrc: "/blocks/hero.png",
  },
  fields: [
    {
      label: "Items",
      name: carouselBlock.items.value,
      type: "object",
      list: true,
      ui: {
        defaultItem: {
          label: "Item description",
          link: "/",
          openIn: "sameWindow",
        },
        itemProps: (item) => ({ label: item.label }),
      },
      fields: [
        {
          type: "string",
          label: "Label",
          name: carouselBlock.items.label,
        },
        {
          type: "string",
          label: "URL",
          name: carouselBlock.items.link,
          description:
            "If link contains ssw.com.au, you can skip the full URL and just use the path. e.g. /services",
        },
        {
          type: "string",
          label: "Open in",
          name: "openIn",
          description:
            "If it is external link, please select 'New window' option.",
          options: [
            { label: "Same window", value: "sameWindow" },
            { label: "Modal", value: "modal" },
            { label: "New window", value: "newWindow" },
          ],
        },
        {
          type: "image",
          label: "Image",
          name: carouselBlock.items.imgSrc,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          uploadDir: () => "carousel",
        },
      ],
    },
    {
      type: "string",
      label: "Background Color",
      name: "backgroundColor",
      options: [
        { label: "Default", value: "default" },
        { label: "Light Gray", value: "lightgray" },
        { label: "Red", value: "red" },
        { label: "Black", value: "black" },
      ],
    },
    {
      type: "number",
      label: "Delay (Seconds)",
      name: carouselBlock.delay,
      required: true,
    },
    {
      type: "boolean",
      label: "Show on mobile devices",
      name: "showOnMobileDevices",
    },
  ],
};
