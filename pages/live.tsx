import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import { BsArrowRightCircle } from "react-icons/bs";
import { useTina } from "tinacms/dist/react";
import { client } from "../.tina/__generated__/client";
import { Breadcrumbs } from "../components/blocks/breadcrumbs";
import { BuiltOnAzure } from "../components/blocks/builtOnAzure";
import { UtilityButton } from "../components/button/utilityButton";
import { CustomLink } from "../components/customLink";
import { Layout } from "../components/layout";
import { LiveHeader } from "../components/live/header";
import { Container } from "../components/util/container";
import { Section } from "../components/util/section";
import { SEO } from "../components/util/seo";
import { VideoCard } from "../components/util/videoCards";
import { removeExtension } from "../services/client/utils.service";
import {
  getNextEventToBeLiveStreamed,
  getSpeakersInfoFromEvent,
} from "../services/server/events";
import { getYoutubePlaylist } from "../services/server/youtube";

const VISIBLE_VIDEOS_COUNT = 6;
const ISR_TIME = 60 * 60;

export default function LivePage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { data } = useTina({
    data: props.data,
    query: props.query,
    variables: props.variables,
  });

  return (
    <Layout menu={data.megamenu}>
      <SEO seo={data.live.seo} />
      <LiveHeader title={data.live.title} />
      <Section className="mx-auto w-full max-w-9xl px-8 py-5">
        <Breadcrumbs
          path={removeExtension(props.variables.relativePath)}
          suffix={data.global.breadcrumbSuffix}
          title={data.live.seo?.title}
        />
      </Section>
      <Container size="xsmall">
        <span className="text-sswRed">
          <h2 className="mt-0">{data.live.nextEvent}</h2>
        </span>
        <div>
          {props.event?.Title && (
            <div className="col-span-2">
              <div className="whitespace-pre-wrap text-2xl font-semibold">
                {props.event?.Title}
              </div>
            </div>
          )}
        </div>
        <div>
          {props.speaker && (
            <>
              <div className="pb-3 text-lg">
                With{" "}
                <CustomLink href={props.speaker?.PresenterProfileLink}>
                  {props.speaker?.Title}
                </CustomLink>
              </div>
              <br />
            </>
          )}
        </div>
        <div className="grid grid-cols-1 justify-center gap-8 lg:grid-cols-2">
          <div className="col-span-1">
            {props.event?.Abstract && (
              <div className="whitespace-pre-wrap text-lg">
                {props.event?.Abstract}
              </div>
            )}
          </div>
          <div className="col-span-1">
            {props.event?.Url &&
              props.event?.Title &&
              (props.event?.TrailerUrl?.Url ? (
                <VideoCard
                  link={props.event.TrailerUrl.Url}
                  title={props.event.Title}
                  theme="light"
                />
              ) : (
                <VideoCard
                  link="https://www.youtube.com/watch?v=coPZ75akNYA"
                  title="SSW User Group - Trailer"
                  theme="light"
                />
              ))}
          </div>
        </div>
        <div className="flex justify-center">
          <UtilityButton
            size="small"
            uncentered={false}
            link={`https://www.youtube.com/channel/${data.live.sswTvButton.channelId}`}
            buttonText={
              <>
                {data.live.sswTvButton.name}
                <BsArrowRightCircle className="ml-1 inline" />
              </>
            }
            noAnimate
            openInNewTab={true}
          />
        </div>
      </Container>
      <Container size="xsmall">
        <span className="text-sswRed">
          <h2>{data.live.pastEvents}</h2>
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
            link={`https://www.youtube.com/playlist?list=${data.live.youtubePlaylistButton.playlistId}`}
            buttonText={
              <>
                {data.live.youtubePlaylistButton.name}
                <BsArrowRightCircle className="ml-1 inline" />
              </>
            }
            noAnimate
            openInNewTab={true}
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

  const event = await getNextEventToBeLiveStreamed();
  const speakers = await getSpeakersInfoFromEvent(event);
  const speaker = speakers[0];

  const playListVideosLinks = await getYoutubePlaylist(
    tinaProps.data.live.youtubePlaylistButton.playlistId,
    VISIBLE_VIDEOS_COUNT
  );

  return {
    props: {
      data: tinaProps.data,
      query: tinaProps.query,
      variables: tinaProps.variables,
      event: event || null,
      speaker: speaker || null,
      playListVideosLinks,
    },
    revalidate: ISR_TIME,
  };
};
