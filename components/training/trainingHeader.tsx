import classNames from "classnames";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Container } from "../util/container";
import { Section } from "../util/section";

type TrainingHeaderProps = {
  data: {
    tagline: string;
    secondaryTagline: string;
    heroBackground?: string;
    person: string;
    link: {
      linkText: string;
      url: string;
      icon: string;
    };
  };
};

export const TrainingHeader = ({ data }: TrainingHeaderProps) => {
  return (
    <Section
      className="flex h-full flex-col items-center border-b-8 border-sswRed bg-white bg-cover bg-no-repeat lg:block"
      style={{
        backgroundImage: `url(${
          data?.heroBackground || "/images/background/polygonBackground.png"
        })`,
      }}
    >
      {/* Tailwind shorthand breaks styling */}
      {/* eslint-disable-next-line tailwindcss/enforces-shorthand */}
      <Container className={"flex-1 pb-0 pt-0 md:pb-12"}>
        <div
          className={`px-6 lg:flex lg:px-8 lg:pb-24 ${
            !data?.person
              ? "justify-center text-center"
              : "text-center lg:text-left"
          }`}
        >
          <div
            className={`mx-auto flex max-w-2xl flex-col items-center pt-8 lg:mx-0 lg:max-w-3xl lg:items-start ${
              !data?.person && "lg:items-center"
            }`}
          >
            <div className="mt-15 flex max-w-2xl flex-col text-white sm:text-6xl">
              <span className="text-4xl font-medium">{data?.tagline}</span>
              <span className="text-5xl font-semibold text-sswRed">
                {data?.secondaryTagline}
              </span>
            </div>
            <div className={`${data?.secondaryTagline ? "mt-10" : ""}`}>
              {data.link && (
                <button
                  className="flex items-center gap-2 rounded bg-sswRed px-5 py-2.5 text-sm font-normal text-white shadow-sm"
                  onClick={() =>
                    window.open(`${data.link?.url}` || "", "_blank")
                  }
                >
                  {data.link?.linkText}
                </button>
              )}
            </div>
          </div>
        </div>
      </Container>
      {data?.person && (
        <Image
          className={classNames(
            "!block !w-[470px] max-w-screen-md sm:max-w-full lg:absolute lg:bottom-0 lg:right-5 xl:right-80"
          )}
          src={data?.person}
          alt="person"
          width={900}
          height={50}
        />
      )}
    </Section>
  );
};

export const TrainingCarousel = ({ data }) => {
  return (
    <Carousel
      infiniteLoop
      autoPlay
      showThumbs={false}
      showStatus={false}
      showArrows={false}
      swipeable={false}
      stopOnHover
      renderIndicator={
        data?.trainingHeaderCarouselItem.length > 1 && createCarouselIndicator
      }
    >
      {data?.trainingHeaderCarouselItem.map((item, key) => (
        <TrainingHeader key={key} data={item} />
      ))}
    </Carousel>
  );
};

const createCarouselIndicator = (onClickHandler, isSelected, index, label) => {
  if (isSelected) {
    return (
      <li
        className="mx-1 mb-4 inline-block size-4 rounded-3xl bg-sswRed"
        aria-label={`Selected: ${label} ${index + 1}`}
        title={`Selected: ${label} ${index + 1}`}
      />
    );
  }
  return (
    <li
      className="mx-1 mb-4 inline-block size-4 rounded-3xl bg-gray-500"
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

export const trainingHeaderSchema = {
  type: "object",
  label: "Training Header Carousel",
  name: "trainingHeaderCarousel",
  fields: [
    {
      type: "object",
      label: "Training Header Carousel Item",
      name: "trainingHeaderCarouselItem",
      list: true,
      fields: [
        {
          type: "string",
          label: "Tagline",
          name: "tagline",
          required: true,
        },
        {
          type: "string",
          label: "Secondary Tagline",
          name: "secondaryTagline",
        },
        {
          type: "image",
          label: "Hero Background",
          name: "heroBackground",
          required: true,
          uploadDir: () => "background",
        },
        {
          type: "image",
          label: "Person",
          name: "person",
          uploadDir: () => "people",
        },
        {
          type: "object",
          label: "Link",
          name: "link",
          fields: [
            {
              type: "string",
              label: "Link Text",
              name: "linkText",
              required: true,
            },
            {
              type: "string",
              label: "URL",
              name: "url",
              required: true,
            },
            {
              type: "image",
              label: "Icon",
              name: "icon",
            },
          ],
        },
      ],
    },
  ],
};

export default TrainingCarousel;
