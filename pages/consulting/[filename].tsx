import { useTina } from "tinacms/dist/react";
import { Components, TinaMarkdown } from "tinacms/dist/rich-text";

import ReactPlayer from "react-player";
import { client } from "../../.tina/__generated__/client";
import { Booking } from "../../components/blocks";
import { Breadcrumbs } from "../../components/blocks/breadcrumbs";
import { componentRenderer } from "../../components/blocks/mdxComponentRenderer";
import BookingButton from "../../components/bookingButton/bookingButton";
import { Layout } from "../../components/layout";
import TechnologyCards from "../../components/technologyCard/technologyCards";
import { TestimonialRow } from "../../components/testimonials/TestimonialRow";
import { Benefits } from "../../components/util/consulting/benefits";
import { Section } from "../../components/util/section";
import { SEO } from "../../components/util/seo";

const consultingComponentRenderer: Components<Record<string, unknown>> = {
  code: (data) => {
    const {
      children: {
        props: { type, text },
      },
    } = data;
    if (type === "text" && text.startsWith("youtube:")) {
      const link = text.replace("youtube:", "").trim();
      return (
        <div className="relative m-8 mx-auto aspect-video">
          <ReactPlayer
            className="absolute top-0 left-0"
            url={link}
            width={"100%"}
            height={"100%"}
          />
        </div>
      );
    }
    return <code>{data.children}</code>;
  },
};

export default function ConsultingPage(
  props: AsyncReturnType<typeof getStaticProps>["props"]
) {
  const { data } = useTina({
    data: props.data,
    query: props.query,
    variables: props.variables,
  });

  const removeExtension = (file: string) => {
    return file.split(".")[0];
  };

  const technologyCardDocs =
    props.technologyCards.data.technologiesConnection.edges.map((n) => n.node);
  const techCards =
    data.consulting.technologyCards?.map((c) => ({
      ...technologyCardDocs.find(
        (n) => !!n.name && n.name === c.technologyCard?.name
      ),
    })) || [];

  return (
    <>
      <SEO seo={data.consulting.seo} />
      <Layout>
        <Section className="mx-auto w-full max-w-7xl py-5 px-8">
          <Breadcrumbs
            path={removeExtension(props.variables.relativePath)}
            suffix={data.global.breadcrumbSuffix}
            title={data.consulting.title}
          />
        </Section>
        <Section
          className="video-mask items-center text-center font-light"
          color="black"
        >
          <Booking {...data.consulting.booking}>
            <BookingButton
              buttonText={data.consulting.booking.buttonText}
              recaptchaKey={props.env["GOOGLE_RECAPTCHA_KEY"]}
            />
          </Booking>
        </Section>
        <Section
          color="black"
          className={`
            prose-consulting
            border-y-4 border-y-sswRed
            text-center`}
        >
          <a id="more" />
          <div className="w-full bg-benefits bg-cover bg-fixed bg-center bg-no-repeat py-12">
            <div className="mx-auto max-w-8xl px-4">
              <TinaMarkdown
                components={{
                  ...componentRenderer,
                  ...consultingComponentRenderer,
                }}
                content={data.consulting._body}
              />
              <Benefits data={data.consulting.benefits} />
            </div>
          </div>
        </Section>
        <Section>
          <TestimonialRow testimonialsQueryResult={props.testimonialResult} />
        </Section>
        <Section className="pb-28 text-center">
          <div className="main-container">
            <TechnologyCards
              techHeader={data.consulting.techHeader}
              techCards={techCards}
            />
          </div>
        </Section>
      </Layout>
    </>
  );
}

export const getStaticProps = async ({ params }) => {
  const tinaProps = await client.queries.consultingContentQuery({
    relativePath: `${params.filename}.mdx`,
  });

  const testimonials = await client.queries.allTestimonialsQuery();

  const technologyCardNames =
    tinaProps.data.consulting.technologyCards?.reduce<string[]>((pre, cur) => {
      !!cur.technologyCard?.name && pre.push(cur.technologyCard.name);
      return pre;
    }, []) || [];
  const technologyCardsProps = await client.queries.technologyCardContentQuery({
    cardNames: technologyCardNames,
  });

  return {
    props: {
      data: tinaProps.data,
      query: tinaProps.query,
      variables: tinaProps.variables,
      testimonialResult: testimonials,
      technologyCards: technologyCardsProps,
      env: {
        GOOGLE_RECAPTCHA_KEY: process.env.GOOGLE_RECAPTCHA_KEY || null,
      },
    },
  };
};

export const getStaticPaths = async () => {
  const pagesListData = await client.queries.consultingConnection();
  return {
    paths: pagesListData.data.consultingConnection.edges.map((page) => ({
      params: { filename: page.node._sys.filename },
    })),
    fallback: false,
  };
};

export type AsyncReturnType<T extends (...args: any) => Promise<any>> = // eslint-disable-line @typescript-eslint/no-explicit-any
  T extends (...args: any) => Promise<infer R> ? R : any; // eslint-disable-line @typescript-eslint/no-explicit-any
