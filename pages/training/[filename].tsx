import { tinaField, useTina } from "tinacms/dist/react";

import { InferGetStaticPropsType } from "next";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { client } from "../../.tina/__generated__/client";
import { ClientLogos } from "../../components/blocks";
import { Blocks } from "../../components/blocks-renderer";
import { Breadcrumbs } from "../../components/blocks/breadcrumbs";
import { componentRenderer } from "../../components/blocks/mdxComponentRenderer";
import { Layout } from "../../components/layout";
import { TestimonialRow } from "../../components/testimonials/TestimonialRow";
import { TrainingCarousel } from "../../components/training/trainingHeader";
import { Container } from "../../components/util/container";
import { Section } from "../../components/util/section";
import { SEO } from "../../components/util/seo";
import VideoCards, { VideoCardProps } from "../../components/util/videoCards";
import { removeExtension } from "../../services/client/utils.service";

export default function TrainingPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { data } = useTina({
    data: props.data,
    query: props.query,
    variables: props.variables,
  });

  const videoCardProps =
    data?.training.videos?.videoCards?.map<VideoCardProps>((m) => ({
      title: m.title,
      link: m.link,
    })) || [];

  return (
    <>
      <SEO seo={data.training.seo} />
      <Layout>
        <div
          data-tina-field={tinaField(data.training, "trainingHeaderCarousel")}
        >
          <TrainingCarousel data={data.training.trainingHeaderCarousel} />
        </div>
        <Container padding={"md:px-8 px-0"} className="pt-2">
          <div
            data-tina-field={tinaField(data.training.seo, "title")}
            className="px-8 md:px-8"
          >
            <Breadcrumbs
              path={removeExtension(props.variables.relativePath)}
              suffix={data.global.breadcrumbSuffix}
              title={data.training?.seo?.title}
            />
          </div>
          <h1
            data-tina-field={tinaField(data.training, "title")}
            className="py-0 text-center text-5xl font-semibold"
            dangerouslySetInnerHTML={{ __html: data.training.title }}
          />

          <Blocks prefix="Training_body" blocks={data.training._body} />

          <div data-tina-field={tinaField(data.training, "videos")}>
            <VideoCards
              cardProps={videoCardProps}
              channelLink={data.training.videos?.channelLink}
              defaultChannelLink={data.global.youtubeChannelLink}
            />
          </div>

          {data.training.showTestimonials && (
            <Section color="white" className="">
              <Container padding={"md:px-8 px-2"} className={"flex-1 pt-0"}>
                <div
                  data-tina-field={tinaField(
                    data.training.testimonials,
                    "tagline"
                  )}
                  className="mx-auto flex max-w-9xl flex-col items-center"
                >
                  <TestimonialRow
                    testimonialsResult={props.testimonialResult}
                    tagline={data.training.testimonials?.tagline}
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
                  <span className="text-sswRed">1400+</span> clients in the
                  world
                </h2>
                <p className="max-w-3xl text-lg font-light text-gray-500">
                  Our software developers & consultants have delivered the best
                  in the business to more than 1,400 clients in 15 countries.
                  Read more
                </p>
              </div>
              <ClientLogos />
            </Container>
          </Section>
        </Container>
        <div data-tina-field={tinaField(data.training, "footer")}>
          <TinaMarkdown
            content={data.training.footer}
            components={componentRenderer}
          />
        </div>
      </Layout>
    </>
  );
}

export const getStaticProps = async ({ params }) => {
  const tinaProps = await client.queries.trainingContentQuery({
    relativePath: `${params.filename}.mdx`,
  });

  const testimonials = await client.queries.testimonalsQuery({
    categories: "Internship",
  });

  const testimonialsResult = testimonials.data.testimonialsConnection.edges.map(
    (t) => t.node
  );

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
  const pagesListData = await client.queries.trainingConnection();
  return {
    paths: pagesListData.data.trainingConnection.edges.map((page) => ({
      params: { filename: page.node._sys.filename },
    })),
    fallback: false,
  };
};
