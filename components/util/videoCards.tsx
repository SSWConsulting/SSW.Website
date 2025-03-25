"use client";

import classNames from "classnames";
import Image from "next/image";
import { FC } from "react";
import Button from "../button/rippleButton";
import { VideoModal } from "../videoModal";
import { Container } from "./container";
import { Section } from "./section";

export type VideoCardType = {
  title?: string;
  link?: string;
};

export type VideoCardProps = {
  theme: "light" | "dark";
  "data-tina-field"?: string;
} & VideoCardType;

export const VideoCard: FC<VideoCardProps> = ({ link, title, theme }) => {
  return (
    <VideoModal
      url={link}
      className={
        theme === "light" && "h-full rounded-sm border-1 border-gray-200"
      }
    >
      <div className={classNames("flex h-full justify-between bg-white p-5")}>
        <span className="w-full text-left text-lg font-bold text-black">
          {title}
        </span>
      </div>
    </VideoModal>
  );
};

type VideoCardsProps = {
  cardProps: VideoCardType[];
  channelLink: string;
  defaultChannelLink: string;
  theme?: "light" | "dark";
  className?: string;
};

const VideoCards = ({
  cardProps,
  channelLink,
  defaultChannelLink,
  theme,
  className,
}: VideoCardsProps) => {
  if (cardProps.length == 0) return null;

  const cards = cardProps.map((p, i) => (
    <VideoCard key={i} theme={theme} {...p} />
  ));

  theme ??= "dark";

  return (
    <Section
      className={classNames(
        "py-10",
        theme === "light" ? "bg-white" : "bg-polygons bg-cover bg-no-repeat",
        className
      )}
    >
      <Container size="default">
        <div className="flex flex-col items-center">
          <div className="mb-15 flex flex-col items-center">
            <div className="mb-7 items-center sm:mb-3">
              <h1 className="my-0 flex flex-col items-center py-0 text-center md:flex-row">
                <span
                  className={classNames(
                    "text-4xl",
                    theme === "light" ? "text-black" : "text-white"
                  )}
                >
                  <span className="text-sswRed">Popular</span> videos from{" "}
                </span>
                <Image
                  className="mt-2 md:ml-2 md:mt-0"
                  src={
                    theme === "light"
                      ? "/images/sswtv_logo.png"
                      : "/images/sswtv-logo.svg"
                  }
                  color={"black"}
                  alt={"SSW TV"}
                  height={50}
                  width={200}
                />
              </h1>
            </div>
            <span className="text-gray-500">
              The most popular videos from our developers
            </span>
          </div>
          <div>
            <div className="grid grid-cols-1 justify-center gap-8 lg:grid-cols-3">
              {cards}
            </div>
          </div>
          <Button
            ripple
            className="mt-15"
            data-aos="fade-up"
            onClick={() =>
              window.open(channelLink || defaultChannelLink, "_blank")
            }
          >
            <span className="px-7">Watch More Videos</span>
          </Button>
        </div>
      </Container>
    </Section>
  );
};

export default VideoCards;
