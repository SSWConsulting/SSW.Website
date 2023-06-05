import { useTina } from "tinacms/dist/react";

import { client } from "../../.tina/__generated__/client";
import { Layout } from "../../components/layout";
import { SEO } from "../../components/util/seo";
import { Section } from "../../components/util/section";
import { ClientLogos } from "../../components/blocks";
import { Container } from "../../components/util/container";
import VideoCards, { VideoCardProps } from "../../components/util/videoCards";
import { TrainingCarousel } from "../../components/training/trainingHeader";
import { Blocks } from "../../components/blocks-renderer";
import { Breadcrumbs } from "../../components/blocks/breadcrumbs";
import { removeExtension } from "../../services/utils.service";

export default function TrainingPage(
  props: AsyncReturnType<typeof getStaticProps>["props"]
) {
  const { data } = useTina({
    data: props.data,
    query: props.query,
    variables: props.variables,
  });

  const videoCardProps =
    data.training.videos?.videoCards?.map<VideoCardProps>((m) => ({
      title: m.title,
      link: m.link,
    })) || [];

  return (
    <>
      <SEO seo={data.training.seo} />
      <Layout>
        <TrainingCarousel data={data.training.trainingHeaderCarousel} />
        <Container className="pt-2">
          <Breadcrumbs
            path={removeExtension(props.variables.relativePath)}
            suffix={data.global.breadcrumbSuffix}
            title={data.training.seo.title}
          />

          <Blocks prefix="Training_body" blocks={data.training._body} />

          <VideoCards
            cardProps={videoCardProps}
            channelLink={data.training.videos?.channelLink}
            defaultChannelLink={data.global.youtubeChannelLink}
          />

          {/*
                    Blocked while waiting for testimonials

                <Section color="white" className="">
                    <Container className={"flex-1 pt-0"}>
                        <div className="mx-auto flex max-w-9xl flex-col items-center">
                            <TestimonialRow testimonialsResult={props.testimonialResult} />
                        </div>
                    </Container>
                </Section> */}

          <Section color="white">
            <Container className={"flex-1 pt-0"}>
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

          {/*
                    Blocked by: https://github.com/SSWConsulting/SSW.Website/issues/282

                    <Section
                    color="darkgray"
                    style={{ backgroundImage: "url(/images/polygonBackground.png)" }}
                >
                    <Container className={"flex flex-1 flex-col items-center pt-15 text-center"}>
                        <p className="text-3xl font-light text-white">Subscribe to get notified about <span className="text-sswRed">SSW training programs</span></p>
                        <p className="text-base text-gray-500">Get the most popular courses from our developers</p>

                        <div className="flex flex-col items-center pb-12 pt-8 md:flex-row">
                            <input type="text" className="mr-5 w-96 bg-gray-800 px-5 py-3 text-white" placeholder="Enter your email" />
                            <button className="mt-5 flex w-36 items-center bg-sswRed px-5 py-3 text-white md:mt-0">
                                <HiMail color="white" />
                                <span className="ml-2">Subscribe</span>
                            </button>
                        </div>
                    </Container>
            </Section>*/}
        </Container>
      </Layout>
    </>
  );
}

export const getStaticProps = async ({ params }) => {
  const tinaProps = await client.queries.trainingContentQuery({
    relativePath: `${params.filename}.mdx`,
  });

  const testimonials = await client.queries.testimonalsQuery();

  let testimonialsResult = testimonials.data.testimonialsConnection.edges.map(
    (t) => t.node
  );

  testimonialsResult = testimonialsResult.sort(() => 0.5 - Math.random());

  // Adds general testimonials if not filled by testimonials with matching categories
  if (testimonialsResult.length < 3) {
    const generalTestimonials = await client.queries.testimonalsQuery({
      categories: "General",
    });

    const generalTestimonialsResult =
      generalTestimonials.data.testimonialsConnection.edges.map((t) => t.node);

    const randomGeneral = generalTestimonialsResult.sort(
      () => 0.5 - Math.random()
    );
    testimonialsResult.push(...randomGeneral);
  }

  testimonialsResult = testimonialsResult.slice(0, 3);
  testimonialsResult.map((testimonial) => (testimonial.rating = 5));

  return {
    props: {
      data: tinaProps.data,
      query: tinaProps.query,
      variables: tinaProps.variables,
      testimonialResult: testimonialsResult,
      env: {
        GOOGLE_RECAPTCHA_KEY: process.env.GOOGLE_RECAPTCHA_KEY || null,
      },
    },
    revalidate: 10,
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

export type AsyncReturnType<T extends (...args: any) => Promise<any>> = // eslint-disable-line @typescript-eslint/no-explicit-any
  T extends (...args: any) => Promise<infer R> ? R : any; // eslint-disable-line @typescript-eslint/no-explicit-any
