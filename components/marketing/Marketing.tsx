import { getImageProps } from "next/image";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { getBackgroundImage } from "../../helpers/images";
import { sanitiseXSS, spanWhitelist } from "../../helpers/validator";
import { componentRenderer } from "../blocks/mdxComponentRenderer";
import { Container } from "../util/container";
import { Section } from "../util/section";

export const sides = ["left", "right"];

export const Marketing = (props) => {
  const content = props.content.marketing;

  if (!content) {
    return <></>;
  }

  const {
    props: { srcSet },
  } = getImageProps({
    src: content?.backgroundImage,
    alt: "Marketing background",
    height: 537,
    width: 1920,
  });

  const backgroundImage = getBackgroundImage(srcSet);

  return (
    <Section style={{ backgroundImage }} className="h-full bg-cover">
      <Container size="custom" className="h-full py-16 text-center text-white">
        <h1
          className="mt-0 pt-0 text-5xl text-white"
          dangerouslySetInnerHTML={{
            __html: sanitiseXSS(content?.title, spanWhitelist),
          }}
        ></h1>
        <div className="my-8 flex flex-col justify-between md:flex-row">
          {content.textSide === sides[0] && <TextCol body={content?.body} />}
          <div className="mx-auto w-full md:w-1/2">
            <TinaMarkdown
              content={content?.mediaComponent}
              components={componentRenderer}
            />
          </div>
          {content.textSide === sides[1] && <TextCol body={content?.body} />}
        </div>
      </Container>
    </Section>
  );
};

const TextCol = ({ body }) => {
  return (
    <div className="mt-16 w-full pb-0 text-left font-sans text-base text-white md:ml-10 md:mt-0 md:w-1/3">
      <TinaMarkdown content={body} />
    </div>
  );
};
