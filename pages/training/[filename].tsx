 
import { useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

import { client } from "../../.tina/__generated__/client";
import { Layout } from "../../components/layout";
import { SEO } from "../../components/util/seo";
import { ImArrowUpRight2 } from "react-icons/im";
import Image from "next/image";
import { TestimonialRow } from "../../components/testimonials/TestimonialRow";
import { Section } from "../../components/util/section";
import { ClientLogos } from "../../components/blocks";
import { Container } from "../../components/util/container";

export default function TrainingPage(
  props: AsyncReturnType<typeof getStaticProps>["props"]
) {
  const { data } = useTina({
    data: props.data,
    query: props.query,
    variables: props.variables,
  });

  return (
    <>
      <SEO seo={data.training.seo} />
      <Layout>
        <Section 
          className="bg-white bg-cover bg-no-repeat"
          style={{ backgroundImage: `url(${data.training.heroBackground})` }}
        >
          <Container className={"flex-1 pt-0"}>
            <div className="px-6 pb-24 sm:pb-32 lg:flex lg:px-8">
              <div className="mx-auto max-w-2xl pt-8 lg:mx-0 lg:max-w-3xl">
                <Image
                  src="/images/internshipLogo.png"
                  alt="SSW Internship Program logo"
                  width={250}
                  height={30}
                />
                <div className="mt-10 max-w-2xl text-4xl font-black text-white sm:text-6xl">
                  <h1 dangerouslySetInnerHTML={{ __html: data.training.tagline }}></h1>
                </div>
                <p className="max-w-lg text-sm leading-8 text-gray-300">
                  {data.training.secondaryTagline}
                </p>
                <div className="mt-10">
                  <button
                    className="flex items-center gap-2 bg-sswRed px-5 py-2.5 text-sm font-normal text-white shadow-sm"
                  >
                    Apply Now
                    <ImArrowUpRight2 />
                  </button>
                </div>
              </div>
            </div>
          </Container>
          <Image
            className="absolute bottom-0 right-0 hidden lg:block"
            src={data.training.person}
            alt="person"
            width={900}
            height={30}
          />
        </Section>

        <Section className="bg-gray-75 pb-40">
          <Container className={"flex-1"}>
            <div className="mx-auto flex max-w-9xl flex-col items-center">
              <h1>What do people <span className="text-sswRed">say</span>?</h1>
              <p className="text-lg font-light text-gray-500">Review from members who has taken our programs</p>
              <TestimonialRow testimonialsQueryResult={props.testimonialResult} />
            </div>
          </Container>
        </Section>

        <Section className="bg-white pb-40">
          <Container className={"flex-1 pt-4"}>
            <div className="flex flex-col items-center pb-15 text-center">
              <h1>Trusted by more than <span className="text-sswRed">1400+</span> clients in the world</h1>
              <p className="max-w-3xl text-lg font-light text-gray-500">Our software developers & consultants have delivered the best in the business to more than 1,400 clients in 15 countries. Read more</p>
            </div>
            <ClientLogos />
          </Container>
        </Section>

        <Section className="bg-gray-900">
          <Container className={"flex-1 pt-4"}>
            <p className="">Subscribe to get notified about SSW training programs</p>
            <p>Subscribe to get notified about SSW training programs</p>

            <div>
              <input type="text" placeholder="Enter your email" />
              <button>Subscribe</button>
            </div>
      
             
          </Container>
        </Section>
      </Layout>
    </>
  );
}

export const getStaticProps = async ({ params }) => {
  const tinaProps = await client.queries.trainingContentQuery({
    relativePath: `${params.filename}.mdx`,
  });

  const testimonials = await client.queries.allTestimonialsQuery();

  return {
    props: {
      data: tinaProps.data,
      query: tinaProps.query,
      variables: tinaProps.variables,
      testimonialResult: testimonials,
      env: {
        GOOGLE_RECAPTCHA_KEY: process.env.GOOGLE_RECAPTCHA_KEY || null,
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

export type AsyncReturnType<T extends (...args: any) => Promise<any>> = // eslint-disable-line @typescript-eslint/no-explicit-any
  T extends (...args: any) => Promise<infer R> ? R : any; // eslint-disable-line @typescript-eslint/no-explicit-any
