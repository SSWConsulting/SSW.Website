import * as React from "react";

import { Container } from "../util/container";
import { Section } from "../util/section";
import Image from "next/image";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import ReactPlayer from "react-player";
import styles from "./TestimonialRow.module.css";

export const Marketing = (props) => {
  const { title, backgroundImage, videoUrl, body } = props.content.marketing;

  console.log(backgroundImage)
  let test = "/images/sswMarketingBackground.jpg"

  return (
    <Section className={"h-full bg-cover " + `bg-[url('/images/sswMarketingBackground.jpg')]`}>
      <Container size="custom" className="h-full py-16 backdrop-blur-md">
          <h1 className="text-5xl text-white pt-0">{title}</h1>
          <div className="flex flex-col md:flex-row my-8 justify-start">
              <div className="relative mx-auto aspect-video w-full md:w-1/2">
                  <ReactPlayer
                    className="absolute top-0 left-0"
                    url={videoUrl}
                    width={"100%"}
                    height={"100%"}
                  />
              </div>
              <div className="text-white text-left pb-0 w-full mt-16 md:mt-0 md:w-1/2">
                  <TinaMarkdown content={body} />
              </div>
          </div>
      </Container>
    </Section>
  );
};

