import { ReadMore } from "@/components/usergroup/readMore";
import { client } from "@/tina/client";
import { TODAY } from "hooks/useFetchEvents";
import { InferGetStaticPropsType } from "next";
import { FaYoutube } from "react-icons/fa";
import { useTina } from "tinacms/dist/react";
import { Breadcrumbs } from "../components/blocks/breadcrumbs";
import { BuiltOnAzure } from "../components/blocks/builtOnAzure";
import { YoutubePlaylistBlock } from "../components/blocks/youtubePlaylist";
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
  convertEventDatesToStrings,
  getNextEventToBeLiveStreamed,
} from "../services/server/events";

const ISR_TIME = 60 * 60;

const PREVIEW_SENTENCE_COUNT = 9; // Max number of sentences to be previewed to match the Video height

export default function LivePage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { data } = useTina({
    data: props.data,
    query: props.query,
    variables: props.variables,
  });

  return (
    <Layout liveStreamData={data.userGroup} menu={data.megamenu}>
      <SEO seo={data.live.seo} />
      <LiveHeader title={data.live.title} subtitle={data.live.subtitle} />
      <Section className="mx-auto w-full max-w-9xl px-8 py-5">
        <Breadcrumbs
          path={removeExtension(props.variables.relativePath)}
          suffix={data.global.breadcrumbSuffix}
          title={data.live.seo?.title}
        />
      </Section>
      <Container size="xsmall">
        <div className="flex flex-col justify-between py-4 md:flex-row md:items-center">
          <h2 className="mt-0 text-sswRed">{data.live.nextEvent}</h2>
          <UtilityButton
            className="mx-20 my-3 md:my-0"
            size="small"
            uncentered={false}
            removeTopMargin={true}
            link={`https://www.youtube.com/channel/${data.live.sswTvButton.channelId}`}
            buttonText={
              <span className="flex flex-row items-center gap-2">
                <FaYoutube size={25} />
                {data.live.sswTvButton.name}
              </span>
            }
            animated
            openInNewTab={true}
          />
        </div>
        {props.event?.title && (
          <div className="pb-10 pt-4">
            <div className="whitespace-pre-wrap text-2xl font-semibold">
              {props.event?.title}
            </div>
            {props.event?.presenterName && (
              <div className="py-1 text-lg">
                With
                <CustomLink
                  href={props.event?.presenterProfileUrl}
                  className="ml-2"
                >
                  {props.event?.presenterName}
                </CustomLink>
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 justify-center gap-8 lg:grid-cols-2">
          <div className="col-span-1">
            {props.event?.abstract && (
              <div className="whitespace-pre-wrap text-lg">
                <ReadMore
                  text={props.event?.abstract}
                  previewSentenceCount={PREVIEW_SENTENCE_COUNT}
                />
              </div>
            )}
          </div>
          <div className="col-span-1">
            {props.event?.url &&
              props.event?.title &&
              (props.event?.trailerUrl ? (
                <VideoCard
                  link={props.event.trailerUrl}
                  title={props.event.title}
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
      </Container>
      <Container size="xsmall">
        <YoutubePlaylistBlock {...data.live.youtubePlaylist} />
      </Container>
      <BuiltOnAzure data={data.live.azureBanner} />
    </Layout>
  );
}

export const getStaticProps = async () => {
  const tinaProps = await client.queries.liveContentQuery({
    relativePath: "index.mdx",
    date: TODAY.toISOString(),
  });

  const event = await getNextEventToBeLiveStreamed();
  const eventWithStaticProperties = convertEventDatesToStrings(event);
  return {
    props: {
      data: tinaProps.data,
      query: tinaProps.query,
      variables: tinaProps.variables,
      event: eventWithStaticProperties || null,
    },
    revalidate: ISR_TIME,
  };
};
