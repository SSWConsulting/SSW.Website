import type { Template } from "tinacms";
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";

import Image from "next/image";
import * as React from "react";
import { CustomLink } from "../customLink";
import { Container } from "../util/container";

import "react-responsive-carousel/lib/styles/carousel.min.css";

import { BsArrowRightCircle, BsYoutube } from "react-icons/bs";
import { Carousel as CarouselImplementation } from "react-responsive-carousel";
import { UtilityButton } from "../button/utilityButton";

export type InternalCarouselProps = {
  items: {
    label: string;
    imgSrc: string;
  }[];
  header: string;
  paragraph?: TinaMarkdownContent;
  website?: string;
  caseStudyUrl?: string;
  videoUrl?: string;
  technologies?: {
    name: string;
  }[];
};

export const InternalCarousel = (props: InternalCarouselProps) => {
  const CarouselItems: InternalCarouselProps = props;
  return (
    <Container size="custom" className="px-0 descendant-li:!list-none md:w-3/4">
      <CarouselImplementation
        autoPlay={true}
        infiniteLoop={true}
        showArrows={false}
        showThumbs={false}
        showStatus={false}
        stopOnHover={true}
        renderIndicator={createCarouselIndicator}
      >
        {CarouselItems.items?.map((item, index) => (
          <CarouselItemImage
            key={index + item.label}
            imgSrc={item.imgSrc}
            label={item.label}
          />
        ))}
      </CarouselImplementation>
      {CarouselBody(CarouselItems)}
    </Container>
  );
};

const CarouselItemImage = ({ imgSrc, label }) => {
  return (
    <div className="cursor-pointer">
      <Image src={imgSrc} alt={label} height={0} width={0} sizes="100vw" />
      {/* `legend` required so that the carousel works properly */}
      <p className="legend sr-only">{label}</p>
    </div>
  );
};

const createCarouselIndicator = (onClickHandler, isSelected, index, label) => {
  if (isSelected) {
    return (
      <li
        className="mx-1 my-0 inline-block size-6 bg-sswRed md:size-7"
        aria-label={`Selected: ${label} ${index + 1}`}
        title={`Selected: ${label} ${index + 1}`}
      />
    );
  }
  return (
    <li
      className="mx-1 my-0 inline-block size-6 bg-gray-500 md:size-7"
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

const CarouselBody = ({
  header,
  paragraph,
  website,
  technologies,
  caseStudyUrl,
  videoUrl,
}: InternalCarouselProps) => {
  return (
    <div key={header} className={header ? "" : "hidden"}>
      <div className="mt-2 flex items-center justify-between text-left font-semibold text-sswRed prose-p:py-0">
        <h3>{header}</h3>
        <span className={website ? "" : "hidden"}>
          {website && (
            <CustomLink className="font-normal text-white" href={website}>
              Visit Website
            </CustomLink>
          )}
        </span>
      </div>
      <div className="text-left prose-p:py-2">
        <TinaMarkdown content={paragraph} />
      </div>
      <div className="flex flex-wrap">
        {technologies?.map((tech, index) => (
          <TechBlock name={tech.name} key={index} />
        ))}
      </div>
      {(caseStudyUrl || videoUrl) && (
        <div className="my-5 flex flex-row">
          {caseStudyUrl && (
            <UtilityButton
              className="clear-both mr-4 flex items-center"
              size="small"
              removeTopMargin
              link={caseStudyUrl}
              buttonText={
                <>
                  See Case Study
                  <BsArrowRightCircle className="ml-1 inline" />
                </>
              }
              animated
            />
          )}
          {videoUrl && (
            <UtilityButton
              className="clear-both mr-4 flex items-center"
              size="small"
              removeTopMargin
              link={videoUrl}
              buttonText={
                <>
                  Watch Video
                  <BsYoutube className="ml-1 inline" />
                </>
              }
              animated
            />
          )}
        </div>
      )}
      <Separator />
    </div>
  );
};

const Separator = () => (
  <div className="my-5 h-0.25 w-full bg-ssw-gray-dark"></div>
);

const TechBlock = ({ name }) => {
  return (
    <div className="my-0.5 mr-1 min-w-fit bg-sswRed px-2 py-1 text-left">
      {name}
    </div>
  );
};

export const internalCarouselBlockSchema: Template = {
  name: "InternalCarousel",
  label: "Internal Carousel",
  ui: {
    previewSrc: "/images/thumbs/tina/internal-carousel.jpg",
    itemProps: (item) => ({ label: item.items.header }),
  },
  fields: [
    {
      label: "Images",
      name: "items",
      type: "object",
      list: true,
      ui: {
        defaultItem: {
          label: "Image description",
        },
        itemProps: (item) => ({ label: item.imgSrc }),
      },
      fields: [
        {
          type: "string",
          label: "Label",
          name: "label",
        },
        {
          type: "image",
          label: "Image",
          name: "imgSrc",
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          uploadDir: () => "carousel",
        },
      ],
    },
    {
      type: "string",
      label: "Header",
      name: "header",
    },
    {
      type: "rich-text",
      label: "Text",
      name: "paragraph",
      isBody: false,
    },
    {
      type: "string",
      label: "Website",
      name: "website",
    },
    {
      type: "object",
      label: "Technologies",
      name: "technologies",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.name };
        },
      },
      fields: [
        {
          type: "string",
          label: "Name",
          name: "name",
        },
      ],
    },
    {
      type: "string",
      label: "Case Study",
      name: "caseStudyUrl",
    },
    {
      type: "string",
      label: "Video URL",
      name: "videoUrl",
    },
  ],
};
