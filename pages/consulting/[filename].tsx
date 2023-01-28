import { useTina } from "tinacms/dist/react";
import { Components, TinaMarkdown } from "tinacms/dist/rich-text";

import ReactPlayer from "react-player";
import { client } from "../../.tina/__generated__/client";
import { Booking } from "../../components/blocks";
import { componentRenderer } from "../../components/blocks/mdxComponentRenderer";
import { Layout } from "../../components/layout";
import { TestimonialRow } from "../../components/testimonials/TestimonialRow";
import { Section } from "../../components/util/section";
import { SEO } from "../../components/util/seo";
// import { Blocks } from "../../components/blocks-renderer";
import React from "react";
import TechnologyCards from "../../components/technologyCard/technologyCards";

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

export type ConsultingEnv = {
  env: { recaptchaKey?: string };
};
export const ConsultingContext = React.createContext<ConsultingEnv>({
  env: {},
});

export default function ConsultingPage(
  props: AsyncReturnType<typeof getStaticProps>["props"]
) {
  const { data } = useTina({
    data: props.data,
    query: props.query,
    variables: props.variables,
  });

  const technologyCardDocs =
    props.technologyCards.data.technologiesConnection.edges.map((n) => n.node);
  const techCards =
    data.consulting.technologyCards?.map((c) => ({
      ...technologyCardDocs.find(
        (n) => !!n.name && n.name === c.technologyCard?.name
      ),
    })) || [];

  return (
      <ConsultingContext.Provider
          value={{
              env: {
                  recaptchaKey: props.env["GOOGLE_RECAPTCHA_KEY"],
              },
          }}
      >
      <SEO seo={data.consulting.seo} />
      <Layout>
      <Section className="video-mask items-center text-center font-light" color="black">
          <Booking {...data.consulting.booking}></Booking>
      </Section>
        <Section
          color="black"
          className={`prose-consulting border-y-4
                    border-y-sswRed 
                    bg-benefits bg-cover bg-fixed bg-center bg-no-repeat
                    py-24 text-center`}
        >
          <a id="more" />
          <div className="mx-auto max-w-8xl px-4">
            <TinaMarkdown
              components={{
                ...componentRenderer,
                ...consultingComponentRenderer,
              }}
              content={data.consulting._body}
            />
            <TestimonialRow testimonialsQueryResult={props.testimonialResult} />
            <TechnologyCards
              techHeader={data.consulting.techHeader}
              techCards={techCards}
            />
          </div>
        </Section>
      </Layout>
    </ConsultingContext.Provider>
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
