import Image from "next/image";
import classNames from "classnames";
import { Container } from "../util/container";
import { Section } from "../util/section";
import { ImArrowUpRight2 } from "react-icons/im";
import { Carousel } from "react-responsive-carousel";
import styles from "./training.module.css";

const TrainingHeader = ({ data }) => {
    return (
        <Section
            className="h-full border-b-8 border-sswRed bg-white bg-cover bg-no-repeat"
            style={{ backgroundImage: `url(${data?.heroBackground})` }}
        >
            <Container className={"flex-1 pt-0"}>
                <div className={`px-6 pb-24 lg:flex lg:px-8 ${!data?.person ? "justify-center text-center" : "text-left"}`}>
                    <div className={`mx-auto flex max-w-2xl flex-col pt-8 lg:mx-0 lg:max-w-3xl ${!data?.person && "items-center"}`}>
                        <div className="mt-10 max-w-2xl text-4xl font-semibold text-white sm:text-6xl">
                            <h1 dangerouslySetInnerHTML={{ __html: data?.tagline }}></h1>
                        </div>
                        {data?.secondaryTagline &&
                            <p className="max-w-lg text-sm leading-8 text-gray-300">
                                {data?.secondaryTagline}
                            </p>
                        }
                        <div className="mt-10">
                            <button
                                className="flex items-center gap-2 rounded bg-sswRed px-5 py-2.5 text-sm font-normal text-white shadow-sm"
                            >
                                Apply Now
                                <ImArrowUpRight2 />
                            </button>
                        </div>
                    </div>
                </div>
            </Container>
            {data?.person &&
                <Image
                    className={classNames(styles["carouselSubject"], "absolute bottom-0 right-5 xl:right-44")}
                    src={data?.person}
                    alt="person"
                    width={700}
                    height={30}
                />
            }
        </Section>
    );
}

export const TrainingCarousel = ({ data }) => {
    return (
        <Carousel
            infiniteLoop
            // autoPlay
            showThumbs={false}
            showStatus={false}
            showArrows={false}
            stopOnHover
            renderIndicator={createCarouselIndicator}
        >
            {
                data.trainingHeaderCarouselItem.map((item, key) =>
                    <TrainingHeader key={key} data={item} />)
            }
        </Carousel>
    )
}

const createCarouselIndicator = (onClickHandler, isSelected, index, label) => {
    if (isSelected) {
        return (
            <li
                className="mx-1 mb-4 inline-block h-4 w-4 rounded-3xl bg-sswRed"
                aria-label={`Selected: ${label} ${index + 1}`}
                title={`Selected: ${label} ${index + 1}`}
            />
        );
    }
    return (
        <li
            className="mx-1 mb-4 inline-block h-4 w-4 rounded-3xl bg-gray-500"
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
                },
                {
                    type: "image",
                    label: "Person",
                    name: "person",
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
                    ]
                }
            ]
        }
    ],
};

export default TrainingCarousel;
