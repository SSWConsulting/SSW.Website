import { FC } from "react";
import Image from "next/image";
import { FaPlayCircle } from "react-icons/fa";
import { Section } from "./section";
import { Container } from "./container";
import Button from "../button/button";
import { VideoModal } from "../videoModal";

export type VideoCardProps = {
    link: string,
    title: string,
};

const VideoCard: FC<VideoCardProps> = ({ link, title }) => {
    return (
        <VideoModal url={link}>
            <div className="flex h-full items-center justify-between bg-white p-5">
                <span className="w-3/4 text-left text-lg font-bold">{title}</span>
                <FaPlayCircle className="text-sswRed" size={40} />
            </div>
        </VideoModal>
    );
};

const VideoCards: FC<{ cardProps: VideoCardProps[], channelLink: string, defaultChannelLink: string }> = ({
    cardProps,
    channelLink,
    defaultChannelLink
}) => {
    if (cardProps.length == 0) return null;

    const cards = cardProps.map((p, i) => <VideoCard key={i} {...p} />);

    return (
        <Section
            className="bg-polygons bg-cover bg-no-repeat py-10"
        >
            <Container size="default">
                <div className="flex flex-col items-center">
                    <div className="mb-15 flex flex-col items-center">
                        <div className="mb-7 items-center sm:mb-3 ">
                            <h1 className="my-0 flex flex-col items-center py-0 text-center md:flex-row">
                                <span className="text-4xl text-white"><span className="text-sswRed">Popular</span> courses from</span>
                                <Image
                                    className="ml-2"
                                    src={"/images/sswtv-logo.svg"}
                                    alt={"SSW TV"}
                                    height={50}
                                    width={200}
                                />
                            </h1>
                        </div>
                        <span className="text-gray-500">The most popular courses from our developers</span>
                    </div>
                    <div>
                        <div className="grid grid-cols-1 justify-center gap-8 lg:grid-cols-3">{cards}</div>
                    </div>
                    <Button
                        ripple
                        className="mt-15"
                        data-aos="fade-up"
                        onClick={() => window.open(channelLink || defaultChannelLink, "_blank")}
                    >
                        <span className="px-7">Watch More Videos</span>
                    </Button>
                </div>
            </Container>
        </Section>
    );
};

export const videoCardSchema = {
    type: "object",
    label: "Videos",
    name: "videos",
    fields: [
        {
            type: "string",
            label: "Channel Link",
            name: "channelLink",
        },
        {
            type: "object",
            label: "Video Cards",
            name: "videoCards",
            list: true,
            fields: [
                {
                    type: "string",
                    label: "Title",
                    name: "title",
                },
                {
                    type: "string",
                    label: "Link",
                    name: "link",
                },
            ],
        },
    ]
}

export default VideoCards;
