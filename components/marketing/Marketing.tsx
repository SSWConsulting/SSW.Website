import { Container } from "../util/container";
import { Section } from "../util/section";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { VideoModal } from "../videoModal";

export const Marketing = (props) => {
  const content = props.content.marketing;

  if (!content) {
    return <></>;
  }

  return (
    <Section
      style={{ backgroundImage: `url(${content?.backgroundImage})` }}
      className="h-full bg-cover"
    >
      <Container size="custom" className="h-full py-16 text-center">
        <h1
          className="mt-0 pt-0 text-5xl text-white"
          dangerouslySetInnerHTML={{ __html: content?.title }}
        ></h1>
        <div className="my-8 flex flex-col justify-between md:flex-row">
          <div className="mx-auto w-full md:w-1/2">
            <VideoModal url={content?.videoUrl} />
          </div>
          <div className="mt-16 w-full pb-0 text-left font-sans text-md text-white md:ml-10 md:mt-0 md:w-1/3">
            <TinaMarkdown content={content?.body} />
          </div>
        </div>
      </Container>
    </Section>
  );
};
