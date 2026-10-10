"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import * as React from "react";
import { tinaField } from "tinacms/dist/react";
import { Container } from "../util/container";
import { Section } from "../util/section";

import "react-responsive-carousel/lib/styles/carousel.min.css";

import { Carousel as CarouselImplementation } from "react-responsive-carousel";
import { carouselBlock } from "./carousel.schema";

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
        className={/* eslint-disable-line */ "aspect-carousel w-full"}
        data-tina-field={tinaField(data, carouselBlock.delay)}
      >
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
            data.items.map((item, index) => (
              <CarouselItemImage
                key={index + item.label}
                imgSrc={item.imgSrc}
                label={item.label}
                index={index}
                showCaptions={data.showCaptions}
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
  /** Renders the label as a visible caption instead of screen-reader-only text. */
  showCaptions?: boolean;
  carouselSchema: Record<string, unknown>;
};

const CarouselItemImage = (props: CarouselItemImageProps) => {
  const { imgSrc, label, index, showCaptions, carouselSchema } = props;

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
        sizes="(max-width: 640px) 50vw, 100vw"
        priority={index === 0}
      />
      {/* `legend` required so that the carousel works properly. Labels read as
          alt text on most carousels, so they stay screen-reader-only unless a
          call site opts in to showing them as captions. */}
      <p
        className={
          showCaptions
            ? // `!static` drops the library's absolute offsets (left: 50%,
              // bottom: 40px) that would otherwise shift the caption off-screen.
              "legend !static !m-0 !w-full !translate-x-0 !rounded-none !bg-transparent !px-2 !pb-14 !pt-2 !text-sm !font-bold !text-current !opacity-100"
            : "legend sr-only"
        }
      >
        {label}
      </p>
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
