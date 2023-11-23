import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import { useState } from "react";
import { BsArrowRightCircle } from "react-icons/bs";
import { useTina } from "tinacms/dist/react";
import { client } from "../.tina/__generated__/client";
import { BuiltOnAzure } from "../components/blocks/builtOnAzure";
import { VideoEmbed } from "../components/blocks/videoEmbed";
import { UtilityButton } from "../components/button/utilityButton";
import { Layout } from "../components/layout";
import { LiveHeader } from "../components/live/header";
import { Container } from "../components/util/container";
import { SEO } from "../components/util/seo";
import { VideoCard } from "../components/util/videoCards";
import { getEvents, getSpeakersInfoFromEvent } from "../services/server/events";
import { getYoutubePlaylist } from "../services/server/youtube";

export default function LivePage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { data } = useTina({
    data: props.data,
    query: props.query,
    variables: props.variables,
  });
  const [visibleVideos, setVisibleVideos] = useState(9);

  return (
    <Layout>
      <SEO seo={data.live.seo} />
      <LiveHeader title={data.live.title} />
      <Container size="xsmall">
        <span className="text-sswRed">
          <h2>{data.live.nextEvent}</h2>
        </span>
        <div>
          {props.event?.Title && (
            <div className="col-span-2">
              <div className="whitespace-pre-wrap text-2xl font-bold">
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
                <Link href={props.speaker?.PresenterProfileLink}>
                  {props.speaker?.Title}
                </Link>
              </div>
              <br />
            </>
          )}
        </div>
        <div className="grid grid-cols-1 justify-center gap-8 lg:grid-cols-2">
          <div>
            {props.event?.Abstract && (
              <div className="col-span-2">
                <div className="whitespace-pre-wrap text-lg">
                  {props.event?.Abstract}
                </div>
              </div>
            )}
          </div>
          <div className="float-left">
            {props.event?.Url &&
              props.event?.Title &&
              (props.event?.TrailerUrl?.Url ? (
                <VideoCard
                  link={props.event.TrailerUrl.Url}
                  title={props.event.Title}
                  theme="light"
                />
              ) : (
                <VideoEmbed
                  data={{
                    url: "https://www.youtube.com/watch?v=coPZ75akNYA",
                    videoWidth: "w-full",
                    removeMargin: true,
                  }}
                />
              ))}
          </div>
        </div>
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
            openInNewTab={true}
          />
        </div>
      </Container>
      <Container size="xsmall">
        <span className="text-sswRed">
          <h2>{data.live.pastEvents}</h2>
        </span>
        <div className="grid grid-cols-1 justify-center gap-8 lg:grid-cols-3">
          {props.playListVideosLinks
            .slice(0, visibleVideos)
            .map((video, index) => (
              <div key={index}>
                <VideoCard {...video} theme="light" />
              </div>
            ))}
        </div>
        {props.playListVideosLinks.length > visibleVideos && (
          <div className="flex justify-center">
            <button
              onClick={() => setVisibleVideos((prevCount) => prevCount + 9)}
              className="m-8 text-sswRed underline"
            >
              See More
            </button>
          </div>
        )}
        <div className="flex justify-center">
          <UtilityButton
            size="small"
            uncentered={false}
            link={`https://www.youtube.com/playlist?list=${data.live.youtubePlaylistId}`}
            buttonText={
              <>
                Watch more on SSW TV Channel on Youtube
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
  const res = await getYoutubePlaylist(tinaProps.data.live.youtubePlaylistId);

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

  const currentDate = new Date().toISOString();

  const events = await getEvents(
    `$filter=fields/Enabled ne false and fields/EndDateTime gt '${currentDate}' and fields/CalendarType eq 'User Groups'&$orderby=fields/StartDateTime asc`
  );

  let event = events[0];

  if (!event) {
    const pastEvents = await getEvents(
      `$filter=fields/Enabled ne false and fields/EndDateTime lt '${currentDate}' and fields/CalendarType eq 'User Groups'&$orderby=fields/StartDateTime desc`
    );

    event = pastEvents[0];
  }

  const speakers = await getSpeakersInfoFromEvent(event);
  const speaker = speakers[0];

  return {
    props: {
      data: tinaProps.data,
      query: tinaProps.query,
      variables: tinaProps.variables,
      playListVideosLinks,
      event: event || null,
      speaker: speaker || null,
    },
    revalidate: 10,
  };
};
