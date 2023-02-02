import * as React from "react";

import { Container } from "../util/container";
import { Section } from "../util/section";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import ReactPlayer from "react-player";

export const Marketing = (props) => {
  const content = props.content.marketing;
    console.log(content)

  if (!content) {
    return <div />
  }

  return (
    <Section style={{backgroundImage: `url(${content?.backgroundImage})`}} className="h-full bg-cover">
      <Container size="custom" className="h-full py-16 backdrop-blur-md">
        <h1 className="mt-0 pt-0 text-5xl text-white" dangerouslySetInnerHTML={{ __html: content?.title }}></h1>
        <div className="my-8 flex flex-col justify-start md:flex-row">
          <div className="relative mx-auto aspect-video w-full md:w-1/2">
            <ReactPlayer
              className="absolute top-0 left-0"
              url={content?.videoUrl}
              width={"100%"}
              height={"100%"}
            />
          </div>
          <div className="mt-16 w-full pb-0 text-left text-white md:mt-0 md:w-1/2">
          <TinaMarkdown
              content={content?.body}
              components={{
                p: ({ children: { props: { content } } }) => {
                  return (
                    <>
                      {content.map(({ text }, id: number) => (
                        <p key={id} className="mx-auto w-3/4 font-sans text-md" data-aos="fade-up">
                          {text}
                        </p>
                      ))}
                    </>
                  )
                }
              }}
            />
          </div>
        </div>
      </Container>
    </Section>
  );
};

