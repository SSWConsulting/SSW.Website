import { InferGetStaticPropsType } from "next";
import { tinaField, useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import client from "../../.tina/__generated__/client";
import {
  BuiltOnAzure,
  GoogleMapsWrapper,
  JoinAsPresenter,
  JoinGithub,
  LatestTech,
  Organizer,
} from "../../components/blocks";
import { Layout } from "../../components/layout";
import { TestimonialRow } from "../../components/testimonials/TestimonialRow";
import { UserGroupHeader } from "../../components/usergroup/sections/header";
import { SectionRenderer } from "../../components/usergroup/sections/renderer";
import { TechnologyLogos } from "../../components/usergroup/technologyLogos";
import { Container } from "../../components/util/container";
import { Section } from "../../components/util/section";
import { SEO } from "../../components/util/seo";
import { getTestimonialsByCategories } from "../../helpers/getTestimonials";
import { sanitiseXSS, spanWhitelist } from "../../helpers/validator";
import {
  getEvents,
  getSpeakersInfoFromEvent,
} from "../../services/server/events";

const ISR_TIME = 60 * 60; // 1 hour;

export default function NETUGPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { data } = useTina({
    data: props.data,
    query: props.query,
    variables: props.variables,
  });
  const speakerDescription = sanitiseXSS(
    props.speaker?.PresenterShortDescription
  );

  if (data?.userGroupPage?.__typename === "UserGroupPageLocationPage") {
    return (
      <>
        <Layout>
          <SEO seo={data.userGroupPage.seo} />
          {props.event && (
            <UserGroupHeader
              date={new Date(props.event?.StartDateTime)}
              title={props.event?.Title}
              presenter={{
                name: props.event?.Presenter,
                url: props.event?.PresenterProfileUrl?.Url,
                image: props.speaker?.TorsoImage?.Url || "",
              }}
              trailerUrl={props.event?.TrailerUrl?.Url}
              registerUrl={data.userGroupPage.registerUrl}
              city={props.city}
              online={props.city !== props.event?.City?.toLowerCase()}
            />
          )}

          <Container>
            <section className="grid-cols-3 gap-10 md:grid">
              {props.event?.Abstract && (
                <div className="col-span-2">
                  <h2 className="text-4xl font-medium text-sswRed">
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
                    <h2 className="text-4xl font-medium text-sswRed">
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
                <h2 className="text-4xl font-medium text-sswRed">
                  When & Where
                </h2>
                <div
                  className="child-p:text-lg"
                  data-tina-field={tinaField(
                    data.userGroupPage.whenAndWhere,
                    "content"
                  )}
                >
                  <TinaMarkdown
                    content={data.userGroupPage.whenAndWhere?.content}
                  />
                </div>
                {data.userGroupPage.whenAndWhere?.googleMapsEmbedUrl && (
                  <div
                    data-tina-field={tinaField(
                      data.userGroupPage.whenAndWhere,
                      "googleMapsEmbedUrl"
                    )}
                  >
                    <GoogleMapsWrapper
                      embedHeight="150px"
                      embedWidth="100%"
                      embedUrl={
                        data.userGroupPage.whenAndWhere.googleMapsEmbedUrl
                      }
                    />
                  </div>
                )}
              </div>

              <div className="col-span-1">
                <h2 className="text-4xl font-medium text-sswRed">Agenda</h2>
                <div>
                  {data.userGroupPage.agenda?.map((item, index) => (
                    <div
                      className="my-4 flex flex-row rounded-md border-1 bg-gray-50 p-2"
                      key={index}
                    >
                      <span
                        className="border-r-1 px-4 text-lg"
                        data-tina-field={tinaField(
                          // @ts-expect-error some weird typing issue (works as expected above)
                          data.userGroupPage.agenda[index],
                          "time"
                        )}
                      >
                        {item.time}
                      </span>
                      <span
                        className="px-4 text-lg"
                        data-tina-field={tinaField(
                          // @ts-expect-error some weird typing issue (works as expected above)
                          data.userGroupPage.agenda[index],
                          "label"
                        )}
                      >
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-span-1">
                <h2 className="text-4xl font-medium text-sswRed">Organizer</h2>
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

              <div
                className="col-span-2"
                data-tina-field={tinaField(data.userGroupPage, "latestTech")}
              >
                <LatestTech data={data.userGroupPage.latestTech} />
              </div>

              <div className="col-span-1">
                <JoinAsPresenter data={data.userGroupGlobal.joinUs} />
              </div>
            </section>
          </Container>

          <SectionRenderer
            prefix="UserGroupPageLocationPageSections"
            blocks={data.userGroupPage.sections}
          />

          <section className="bg-gray-900 py-8">
            <Container className="text-center">
              <h2
                className="mt-2 pb-3 text-4xl font-semibold text-white"
                dangerouslySetInnerHTML={{
                  __html: sanitiseXSS(
                    data.userGroupPage.aboutHeader,
                    spanWhitelist
                  ),
                }}
                data-tina-field={tinaField(data.userGroupPage, "aboutHeader")}
              />

              <div
                className="text-white child-p:text-lg"
                data-tina-field={tinaField(data.userGroupPage, "aboutContent")}
              >
                <TinaMarkdown content={data.userGroupPage.aboutContent} />
              </div>
            </Container>
          </section>

          <section>
            <Container>
              <TestimonialRow
                testimonialsResult={props.testimonialsResult}
                categories={["User-Group"]}
                className="child-h2:text-4xl child-h2:font-semibold"
                tagline=""
              />
            </Container>
          </section>

          <Container
            data-tina-field={tinaField(data.userGroupGlobal, "technologies")}
          >
            <TechnologyLogos logos={data.userGroupGlobal.technologies} />
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
          <TinaMarkdown
            content={data.userGroupPage._body}
            data-tina-field={tinaField(data.userGroupPage, "_body")}
          />
        </Container>
      </Layout>
    );
  }
}

export const getStaticProps = async ({ params }) => {
  const tinaProps = await client.queries.userGroupPageContentQuery({
    relativePath: `${params.filename}.mdx`,
  });

  if (!tinaProps?.data?.userGroupPage?.__typename) {
    return {
      notFound: true,
    };
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore - this is a bug in the typing
  const priorityCategory =
    tinaProps.data?.userGroupPage.testimonialCategories?.name;

  const categories = ["User Group"];

  if (priorityCategory) {
    categories.push(priorityCategory);
  }

  const testimonialsResult = await getTestimonialsByCategories(categories);

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
      city: params.filename,
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
