import { InferGetStaticPropsType } from "next";
import { BsArrowRightCircle } from "react-icons/bs";
import { useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { client } from "../.tina/__generated__/client";
import { BuiltOnAzure } from "../components/blocks/builtOnAzure";
import { componentRenderer } from "../components/blocks/mdxComponentRenderer";
import { UtilityButton } from "../components/button/utilityButton";
import { Layout } from "../components/layout";
import { Container } from "../components/util/container";
import { SEO } from "../components/util/seo";
import { VideoCard } from "../components/util/videoCards";
import { googleAuth } from "../services/server/google-auth";

export default function LivePage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { data } = useTina({
    data: props.data,
    query: props.query,
    variables: props.variables,
  });

  return (
    <Layout>
      <SEO seo={data.live.seo} />
      <Container size="xsmall">
        <TinaMarkdown
          components={componentRenderer}
          content={data.live.title}
        />
      </Container>
      <Container size="xsmall">
        <span className="text-sswRed">
          <h2>{data.live.section1}</h2>
        </span>
        <div className="flex justify-center">
          <UtilityButton
            size="small"
            uncentered={false}
            link="https://www.youtube.com/channel/UCBFgwtV9lIIhvoNh0xoQ7Pg"
            buttonText={
              <>
                Visit SSW TV Channel on Youtube
                <BsArrowRightCircle className="ml-1 inline" />
              </>
            }
            noAnimate
          />
        </div>
      </Container>
      <Container size="xsmall">
        <span className="text-sswRed">
          <h2>{data.live.section2}</h2>
        </span>
        <div className="grid grid-cols-1 justify-center gap-8 lg:grid-cols-3">
          {props.playListVideosLinks.map((video, index) => (
            <div key={index}>
              <VideoCard {...video} theme="light" />
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <UtilityButton
            size="small"
            uncentered={false}
            link="https://www.youtube.com/playlist?list=PLCFF4FD4DA9AC8CFE"
            buttonText={
              <>
                Watch more on SSW TV Channel on Youtube
                <BsArrowRightCircle className="ml-1 inline" />
              </>
            }
            noAnimate
          />
        </div>
      </Container>
      <BuiltOnAzure data={{ backgroundColor: "lightgray" }} />
    </Layout>
  );
}

export const getStaticProps = async () => {
  const tinaProps = await client.queries.liveContentQuery({
    relativePath: "index.mdx",
  });
  const res = await googleAuth();

  let playListVideosLinks = [];

  if (res && res.items) {
    const playListVideosBaseUrl = "https://www.youtube.com/watch?v=";

    playListVideosLinks = res.items.map((item) => {
      const snippet = item.snippet;
      const title = snippet.title;
      const playListId = snippet.playlistId;
      const videoId = snippet.resourceId.videoId;

      return {
        title: title,
        link: `${playListVideosBaseUrl}${videoId}&list=${playListId}`,
      };
    });
  }

  return {
    props: {
      data: tinaProps.data,
      query: tinaProps.query,
      variables: tinaProps.variables,
      playListVideosLinks,
    },
  };
};
