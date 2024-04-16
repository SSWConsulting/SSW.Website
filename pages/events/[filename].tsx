import { tinaField, useTina } from "tinacms/dist/react";

import { client } from "@/tina/client";
import { InferGetStaticPropsType } from "next";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { ClientLogos } from "../../components/blocks";
import { Blocks } from "../../components/blocks-renderer";
import { Breadcrumbs } from "../../components/blocks/breadcrumbs";
import { componentRenderer } from "../../components/blocks/mdxComponentRenderer";
import EventsHeader from "../../components/events/eventsHeader";
import { Layout } from "../../components/layout";
import { TestimonialRow } from "../../components/testimonials/TestimonialRow";
import { Container } from "../../components/util/container";
import { Section } from "../../components/util/section";
import { SEO } from "../../components/util/seo";
import VideoCards, { VideoCardType } from "../../components/util/videoCards";
import { RecaptchaContext } from "../../context/RecaptchaContext";
import { getTestimonialsByCategories } from "../../helpers/getTestimonials";
import { removeExtension } from "../../services/client/utils.service";

export default function EventsPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { data } = useTina({
    data: props.data,
    query: props.query,
    variables: props.variables,
  });

  const categories =
    data.events.testimonialCategories
      ?.filter((category) => !!category?.testimonialCategory)
      .map((category) => category.testimonialCategory.name) ?? [];

  const videoCardProps =
    data?.events.videos?.videoCards?.map<VideoCardType>((m) => ({
      title: m.title,
      link: m.link,
    })) || [];

  return (
    <RecaptchaContext.Provider
      value={{
        recaptchaKey: props.env.GOOGLE_RECAPTCHA_SITE_KEY,
      }}
    >
      <SEO seo={data.events.seo} />
      <Layout menu={data.megamenu}>
        <div data-tina-field={tinaField(data.events, "eventHeader")}>
          <EventsHeader data={data.events.eventHeader} />
        </div>
        <Container padding={"md:px-8 px-0"} className="pt-2">
          {data.events.showBreadcrumb && (
            <div
              data-tina-field={tinaField(data.events.seo, "title")}
              className="px-8 md:px-8"
            >
              <Breadcrumbs
                path={removeExtension(props.variables.relativePath)}
                suffix={data.global?.breadcrumbSuffix}
                title={data.events?.seo?.title}
              />
            </div>
          )}
          {data.events.title && (
            <h1
              data-tina-field={tinaField(data.events, "title")}
              className="py-0 text-center text-5xl font-semibold text-sswRed"
            >
              {data?.events?.title}
            </h1>
          )}
          {data.events.subTitle && (
            <Container padding={"md:px-8 px-0 !py-0"}>
              <div
                data-tina-field={tinaField(data.events, "subTitle")}
                className="mx-6 py-0 text-center md:mx-0 md:text-left"
              >
                <TinaMarkdown content={data.events?.subTitle} />
              </div>
            </Container>
          )}

          <Blocks prefix="Events_body" blocks={data.events._body} />

          <div data-tina-field={tinaField(data.events, "videos")}>
            <VideoCards
              cardProps={videoCardProps}
              channelLink={data.events.videos?.channelLink}
              defaultChannelLink={data?.global?.youtubeChannelLink}
            />
          </div>

          {data.events.showTestimonials && (
            <Section color="white" className="">
              <Container padding={"md:px-8 px-2"} className={"flex-1 pt-0"}>
                <div
                  data-tina-field={tinaField(
                    data.events.testimonials,
                    "tagline"
                  )}
                  className="mx-auto flex max-w-9xl flex-col items-center"
                >
                  <TestimonialRow
                    testimonialsResult={props.testimonialResult}
                    categories={categories}
                    tagline={data.events.testimonials?.tagline}
                  />
                </div>
              </Container>
            </Section>
          )}

          <Section color="white">
            <Container padding={"md:px-8 px-4"} className={"flex-1 pt-0"}>
              <div className="flex flex-col items-center pb-15 text-center">
                <h2>
                  Trusted by more than{" "}
                  <span className="text-sswRed">1000+</span> clients in the
                  world
                </h2>
                <p className="max-w-3xl text-lg font-light text-gray-500">
                  Our software developers & consultants have delivered the best
                  in the business to more than 1,000 clients in 15 countries.
                </p>
              </div>
              <ClientLogos />
            </Container>
          </Section>
        </Container>
        <div data-tina-field={tinaField(data.events, "footer")}>
          <TinaMarkdown
            content={data.events.footer}
            components={componentRenderer}
          />
        </div>
      </Layout>
    </RecaptchaContext.Provider>
  );
}

export const getStaticProps = async ({ params }) => {
  const tinaProps = await client.queries.eventsContentQuery({
    relativePath: `${params.filename}.mdx`,
  });

  const categories =
    tinaProps.data.events?.testimonialCategories?.map(
      (category) => category.testimonialCategory.name
    ) || [];

  const testimonialsResult = await getTestimonialsByCategories(categories);

  if (tinaProps.data.events.seo && !tinaProps.data.events.seo.canonical) {
    tinaProps.data.events.seo.canonical = `${tinaProps.data.global.header.url}events/${params.filename}`;
  }

  return {
    props: {
      data: tinaProps.data,
      query: tinaProps.query,
      variables: tinaProps.variables,
      testimonialResult: testimonialsResult || [],
      env: {
        GOOGLE_RECAPTCHA_SITE_KEY:
          process.env.GOOGLE_RECAPTCHA_SITE_KEY || null,
      },
    },
  };
};

export const getStaticPaths = async () => {
  const pagesListData = await client.queries.eventsConnection();
  return {
    paths: pagesListData.data.eventsConnection.edges.map((page) => ({
      params: { filename: page.node._sys.filename },
    })),
    fallback: false,
  };
};
