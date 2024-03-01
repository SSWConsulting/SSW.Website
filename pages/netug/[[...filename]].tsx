import classNames from "classnames";
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
import { Breadcrumbs } from "../../components/blocks/breadcrumbs";
import { componentRenderer } from "../../components/blocks/mdxComponentRenderer";
import { Layout } from "../../components/layout";
import { TestimonialRow } from "../../components/testimonials/TestimonialRow";
import { ReadMore } from "../../components/usergroup/readMore";
import { UserGroupHeader } from "../../components/usergroup/sections/header";
import { SectionRenderer } from "../../components/usergroup/sections/renderer";
import { TechnologyLogos } from "../../components/usergroup/technologyLogos";
import { Container } from "../../components/util/container";
import { Section } from "../../components/util/section";
import { SEO } from "../../components/util/seo";
import { getRandomTestimonialsByCategory } from "../../helpers/getTestimonials";
import { sanitiseXSS, spanWhitelist } from "../../helpers/validator";
import { removeExtension } from "../../services/client/utils.service";
import {
  getEvents,
  getSpeakersInfoFromEvent,
} from "../../services/server/events";

const ISR_TIME = 60 * 60; // 1 hour;

const PREVIEW_SENTENCE_COUNT = 4; // Max number of sentences to be previewed

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
    const registerUrl = data.userGroupPage.registerUrl;
    const sectionsIncludingRegisterUrl = data.userGroupPage.sections?.map(
      (section) =>
        section.__typename === "UserGroupPageLocationPageSectionsActionSection"
          ? {
              ...section,
              registerUrl: registerUrl,
            }
          : section
    );
    return (
      <>
        <Layout menu={data.megamenu}>
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
              youTubeId={props.event?.YouTubeId}
            />
          )}

          <Section className="mx-auto w-full max-w-9xl px-8 py-5">
            <Breadcrumbs
              path={removeExtension(props.variables.relativePath)}
              suffix={data.global.breadcrumbSuffix}
              title={data.userGroupPage.seo?.title}
            />
          </Section>

          <Container size="custom" className="pb-8">
            <section className="grid-cols-3 gap-10 md:grid">
              {props.event?.Abstract && (
                <div className="col-span-2">
                  <h2 className="mt-0 text-4xl font-medium text-sswRed">
                    Event Description
                  </h2>
                  <div className="whitespace-pre-wrap">
                    <ReadMore
                      text={props.event?.Abstract}
                      previewSentenceCount={PREVIEW_SENTENCE_COUNT}
                    />
                  </div>
                </div>
              )}
              <div className="col-span-1 py-4 md:py-0">
                <JoinGithub
                  data={data.userGroupPage.joinGithub}
                  className="mt-10 pt-5 md:mt-0"
                />
              </div>

              <div
                className={classNames(
                  props.speaker ? "col-span-1" : "col-span-2"
                )}
              >
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
                    className="py-4"
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
              {props.speaker && (
                <div className="col-span-1 py-4 md:py-0">
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
                </div>
              )}

              <div
                className="col-span-2"
                data-tina-field={tinaField(data.userGroupPage, "latestTech")}
              >
                <h2
                  className="text-4xl font-medium text-sswRed"
                  data-tina-field={tinaField(
                    data.userGroupGlobal,
                    "latestTechTitle"
                  )}
                >
                  {data.userGroupGlobal.latestTechTitle}
                </h2>
                <LatestTech data={data.userGroupPage.latestTech} />
              </div>

              <div className="col-span-1">
                <JoinAsPresenter data={data.userGroupGlobal.joinUs} />
              </div>
            </section>
          </Container>

          <section className="bg-ssw-black py-8 text-left text-white">
            <Container className="grid-cols-3 gap-10 text-center md:grid">
              <div className="col-span-2 text-left">
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
                  data-tina-field={tinaField(
                    data.userGroupPage,
                    "aboutContent"
                  )}
                >
                  <TinaMarkdown content={data.userGroupPage.aboutContent} />
                </div>
              </div>
              <div className="col-span-1 pl-0 pt-4 md:pl-8 md:pt-0">
                <h2 className="mt-0 py-4 text-left text-4xl font-medium text-sswRed md:pb-4 md:pt-0">
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
            </Container>
          </section>

          <SectionRenderer
            prefix="UserGroupPageLocationPageSections"
            blocks={sectionsIncludingRegisterUrl}
          />

          <section>
            <Container>
              <TestimonialRow
                testimonialsResult={props.testimonialsResult}
                categories={["User-Group"]}
                className="!md:px-8 !px-0 child-h2:text-4xl child-h2:font-semibold"
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
      <>
        <Layout menu={data.megamenu}>
          <Container className="prose py-4 prose-h1:pt-2" size="custom">
            <TinaMarkdown
              content={data.userGroupPage._body}
              components={componentRenderer}
              data-tina-field={tinaField(data.userGroupPage, "_body")}
            />
          </Container>
        </Layout>
      </>
    );
  }
}

export const getStaticProps = async ({ params }) => {
  let filename = params.filename;
  if (!filename) {
    filename = "index";
  } else {
    filename = filename.join("/");
  }

  const tinaProps = await client.queries.userGroupPageContentQuery({
    relativePath: `${filename}.mdx`,
  });

  if (!tinaProps?.data?.userGroupPage?.__typename) {
    return {
      notFound: true,
    };
  }

  let testimonialsResult = null;
  if (tinaProps.data.userGroupPage.__typename === "UserGroupPageLocationPage") {
    const priorityCategory =
      tinaProps.data?.userGroupPage?.testimonialCategories?.name;

    const categories = ["User Group"];

    if (priorityCategory) {
      categories.push(priorityCategory);
    }

    testimonialsResult = await getRandomTestimonialsByCategory(categories);
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

  return {
    props: {
      data: tinaProps.data,
      query: tinaProps.query,
      variables: tinaProps.variables,
      testimonialsResult: testimonialsResult || [],
      event: event || null,
      speaker: speakers[0] || null,
      city: filename,
    },
    revalidate: ISR_TIME,
  };
};

export const getStaticPaths = async () => {
  const userGroupPages = await client.queries.userGroupPageConnection();

  const paths = userGroupPages.data.userGroupPageConnection.edges.map(
    (page) => {
      if (page.node._sys.filename === "index") {
        return {
          params: { filename: [] },
        };
      }

      return {
        params: { filename: page.node._sys.breadcrumbs },
      };
    }
  );

  return {
    paths,
    fallback: false,
  };
};
