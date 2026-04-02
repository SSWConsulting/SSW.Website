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
  carouselSchema: Record<string, unknown>;
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
        sizes="(max-width: 640px) 50vw, 100vw"
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
