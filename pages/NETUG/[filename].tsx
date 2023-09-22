import { InferGetStaticPropsType } from "next";
import {
  BuiltOnAzure,
  GoogleMapsWrapper,
  JoinAsPresenter,
  JoinGithub,
  LatestTech,
  Organizer,
} from "../../components/blocks";
import { Layout } from "../../components/layout";
import { UserGroupHeader } from "../../components/usergroup/sections/header";
import { Container } from "../../components/util/container";
import client from "../../.tina/__generated__/client";
import { useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { TestimonialRow } from "../../components/testimonials/TestimonialRow";
import { getTestimonialsByCategories } from "../../helpers/getTestimonials";
import { Section } from "../../components/util/section";
import { getEvents } from "../../services/server/events";
import { SectionRenderer } from "../../components/usergroup/sections/renderer";
import { VideosSection } from "../../components/usergroup/sections/videos";

const ISR_TIME = 60 * 60; // 1 hour;

export default function NETUGPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { data } = useTina({
    data: props.data,
    query: props.query,
    variables: props.variables,
  });

  return (
    <>
      <Layout>
        <UserGroupHeader
          className="font-helvetica"
          date={new Date(props.event?.StartDateTime)}
          title={props.event?.Title}
          presenter={{
            name: props.event?.Presenter,
            url: props.event?.PresenterProfileUrl?.Url,
            image: "/images/people/matt-g-tall.png",
          }}
          trailerUrl="https://www.youtube.com/watch?v=FNMtmBJAZ_M"
          registerUrl="https://www.meetup.com/en-AU/sydney-net-user-group/"
        />

        <Container className="font-helvetica">
          <section className="grid-cols-3 gap-10 md:grid">
            <div className="col-span-2">
              <h2 className="font-helvetica text-4xl font-medium text-sswRed">
                About the event
              </h2>
              <div className="child-p:text-lg">
                <TinaMarkdown content={data.userGroupPage.aboutContent} />
              </div>
            </div>
            <div className="col-span-1">
              <JoinGithub data={data.userGroupPage.joinGithub} />
            </div>

            <div className="col-span-1">
              <h2 className="font-helvetica text-4xl font-medium text-sswRed">
                When & Where
              </h2>
              <div className="child-p:text-lg">
                <TinaMarkdown
                  content={data.userGroupPage.whenAndWhere?.content}
                />
              </div>
              {data.userGroupPage.whenAndWhere?.googleMapsEmbedUrl && (
                <GoogleMapsWrapper
                  embedHeight="150px"
                  embedWidth="100%"
                  embedUrl={data.userGroupPage.whenAndWhere.googleMapsEmbedUrl}
                />
              )}
            </div>

            <div className="col-span-1">
              <h2 className="font-helvetica text-4xl font-medium text-sswRed">
                Agenda
              </h2>
              <div>
                {data.userGroupPage.agenda.map((item, index) => (
                  <div
                    className="my-4 flex flex-row rounded-sm bg-gray-50 p-2"
                    key={index}
                  >
                    <span className="border-r-1 px-4 text-lg">{item.time}</span>
                    <span className="px-4 text-lg">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-span-1">
              <h2 className="font-helvetica text-4xl font-medium text-sswRed">
                Organizer
              </h2>
              <Organizer
                data={{
                  profileImg: data.userGroupPage.organizer?.profileImg,
                  name: data.userGroupPage.organizer?.name,
                  profileLink: data.userGroupPage.organizer?.nameUrl,
                  position: data.userGroupPage.organizer?.position,
                  content: data.userGroupPage.organizer?.bio,
                }}
              />
            </div>

            <div className="col-span-2">
              <LatestTech data={data.userGroupPage.latestTech} />
            </div>

            <div className="col-span-1">
              <JoinAsPresenter data={data.userGroupPage.joinUs} />
            </div>
          </section>
        </Container>

        <SectionRenderer
          prefix="UserGroupPageSections"
          blocks={data.userGroupPage.sections}
        />

        <section>
          <Container>
            <TestimonialRow
              testimonialsResult={props.testimonialsResult}
              categories={["User-Group"]}
              className="child:!font-helvetica"
              tagline="SSW has made clients happy all over the world and we are proud to
              share some of these experiences with you."
            />
          </Container>
        </section>

        <section>
          <Container className="text-center">
            <h2 className="font-helvetica text-4xl font-medium text-sswRed">
              About the event
            </h2>
            <div className="child-p:text-lg">
              <TinaMarkdown content={data.userGroupPage.aboutContent} />
            </div>
          </Container>
        </section>

        <Section>
          <BuiltOnAzure data={{ backgroundColor: "lightgray" }} />
        </Section>
      </Layout>
    </>
  );
}

export const getStaticProps = async ({ params }) => {
  const tinaProps = await client.queries.userGroupPageContentQuery({
    relativePath: `${params.filename}.mdx`,
  });

  const testimonialsResult = await getTestimonialsByCategories(["User-Group"]);

  const event = await getEvents(
    "$filter=fields/Enabled ne false and fields/City eq 'Sydney' and fields/CalendarType eq 'User Groups'&$orderby=fields/StartDateTime desc"
  );
  return {
    props: {
      data: tinaProps.data,
      query: tinaProps.query,
      variables: tinaProps.variables,
      filename: params.filename,
      testimonialsResult,
      event: event[0] || null,
    },
    revalidate: ISR_TIME,
  };
};

export const getStaticPaths = async () => {
  const userGroupPages = await client.queries.userGroupPageConnection();

  const paths = userGroupPages.data.userGroupPageConnection.edges.map(
    (page) => ({
      params: { filename: page.node._sys.filename },
    })
  );

  return {
    paths,
    fallback: true,
  };
};
