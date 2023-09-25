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
import {
  getEvents,
  getSpeakersInfoFromEvent,
} from "../../services/server/events";
import { SectionRenderer } from "../../components/usergroup/sections/renderer";
import { TechnologyLogos } from "../../components/usergroup/technologyLogos";

const ISR_TIME = 60 * 60; // 1 hour;

export default function NETUGPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { data } = useTina({
    data: props.data,
    query: props.query,
    variables: props.variables,
  });

  const speakerDescription = props.speaker?.PresenterShortDescription.split(
    "<br>"
  )[0].replace("<div>​</div><div><div>", "");

  if (data?.userGroupPage?.__typename === "UserGroupPageLocationPage") {
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
              image: props.speaker?.TorsoImage?.Url || "",
            }}
            trailerUrl="https://www.youtube.com/watch?v=FNMtmBJAZ_M"
            registerUrl="https://www.meetup.com/en-AU/sydney-net-user-group/"
          />

          <Container className="font-helvetica">
            <section className="grid-cols-3 gap-10 md:grid">
              {props.event?.Abstract && (
                <div className="col-span-2">
                  <h2 className="font-helvetica text-4xl font-medium text-sswRed">
                    Event Description
                  </h2>
                  <div className="whitespace-pre-wrap text-lg">
                    {props.event?.Abstract}
                  </div>
                </div>
              )}
              <div className="col-span-1">
                {props.speaker && (
                  <>
                    <h2 className="font-helvetica text-4xl font-medium text-sswRed">
                      Presenter
                    </h2>
                    <div className="pb-3">
                      <Organizer
                        data={{
                          profileImg: props.speaker?.PresenterProfileImage?.Url,
                          name: props.speaker?.Title,
                          profileLink: props.speaker?.PresenterProfileLink,
                        }}
                        stringContent={speakerDescription}
                      />
                    </div>
                  </>
                )}

                <JoinGithub
                  data={data.userGroupPage.joinGithub}
                  className="mt-10 pt-5"
                />
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
                    embedUrl={
                      data.userGroupPage.whenAndWhere.googleMapsEmbedUrl
                    }
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
                      className="my-4 flex flex-row rounded-md border-1 bg-gray-50 p-2"
                      key={index}
                    >
                      <span className="border-r-1 px-4 text-lg">
                        {item.time}
                      </span>
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

              <div className="col-span-2 mt-10">
                <LatestTech data={data.userGroupPage.latestTech} />
              </div>

              <div className="col-span-1">
                <JoinAsPresenter data={data.userGroupPage.joinUs} />
              </div>
            </section>
          </Container>

          <SectionRenderer
            prefix="UserGroupPageLocationPageSections"
            blocks={data.userGroupPage.sections}
          />

          <section className="bg-gray-900 py-8">
            <Container className="text-center">
              <h2 className="mt-2 pb-3 font-helvetica text-4xl font-semibold text-white">
                What is the{" "}
                <span className="text-sswRed">.NET User Group?</span>
              </h2>
              <div className="text-white child-p:text-lg">
                <TinaMarkdown content={data.userGroupPage.aboutContent} />
              </div>
            </Container>
          </section>

          <section>
            <Container>
              <TestimonialRow
                testimonialsResult={props.testimonialsResult}
                categories={["User-Group"]}
                className="child:!font-helvetica child-h2:text-4xl child-h2:font-semibold"
                tagline=""
              />
            </Container>
          </section>

          <Container>
            <TechnologyLogos logos={data.global.technologies} />
          </Container>

          <Section>
            <BuiltOnAzure data={{ backgroundColor: "lightgray" }} />
          </Section>
        </Layout>
      </>
    );
  } else if (data?.userGroupPage.__typename === "UserGroupPageContentPage") {
    return (
      <Layout>
        <Container className="prose py-4 prose-h1:pt-2" size="custom">
          <TinaMarkdown content={data.userGroupPage.content} />
        </Container>
      </Layout>
    );
  }
}

export const getStaticProps = async ({ params }) => {
  const tinaProps = await client.queries.userGroupPageContentQuery({
    relativePath: `${params.filename}.mdx`,
  });

  const testimonialsResult = await getTestimonialsByCategories(["User Group"]);

  const event = await getEvents(
    `$filter=fields/Enabled ne false and fields/EndDateTime gt '${new Date().toISOString()}' and fields/CalendarType eq 'User Groups'&$orderby=fields/StartDateTime desc`
  );

  const speakers = await getSpeakersInfoFromEvent(event[0]);

  return {
    props: {
      data: tinaProps.data,
      query: tinaProps.query,
      variables: tinaProps.variables,
      filename: params.filename,
      testimonialsResult,
      event: event[0] || null,
      speaker: speakers[0] || null,
    },
    revalidate: ISR_TIME,
  };
};

export const getStaticPaths = async () => {
  const userGroupPages = await client.queries.userGroupPageConnection();

  const paths = userGroupPages.data.userGroupPageConnection.edges.map(
    (page) => {
      return {
        params: { filename: page.node._sys.filename },
      };
    }
  );

  return {
    paths,
    fallback: true,
  };
};
