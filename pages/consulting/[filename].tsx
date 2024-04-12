import { tinaField, useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

import { client } from "@/tina/client";
import { InferGetStaticPropsType } from "next";
import { ReactElement } from "react";
import ReactDOMServer from "react-dom/server";
import { BuiltOnAzure, ClientLogos } from "../../components/blocks";
import { Blocks } from "../../components/blocks-renderer";
import { Booking } from "../../components/blocks/booking";
import { Breadcrumbs } from "../../components/blocks/breadcrumbs";
import { componentRenderer } from "../../components/blocks/mdxComponentRenderer";
import { BookingButton } from "../../components/bookingButton/bookingButton";
import { MediaCardProps } from "../../components/consulting/mediaCard/mediaCard";
import MediaCards from "../../components/consulting/mediaCard/mediaCards";
import { Layout } from "../../components/layout";
import { Marketing } from "../../components/marketing/Marketing";
import TechnologyCards from "../../components/technologyCard/technologyCards";
import { TestimonialRow } from "../../components/testimonials/TestimonialRow";
import { Benefits } from "../../components/util/consulting/benefits";
import { Container } from "../../components/util/container";
import { Section } from "../../components/util/section";
import { SEO } from "../../components/util/seo";
import { RecaptchaContext } from "../../context/RecaptchaContext";
import { getRandomTestimonialsByCategory } from "../../helpers/getTestimonials";
import { sanitiseXSS, spanWhitelist } from "../../helpers/validator";
import { removeExtension } from "../../services/client/utils.service";

export default function ConsultingPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { data } = useTina({
    data: props.data,
    query: props.query,
    variables: props.variables,
  });

  const technologyCardDocs =
    props.technologyCards.data.technologiesConnection.edges.map((n) => n.node);
  const techCards =
    data.consulting.technologies?.technologyCards?.map((c) => ({
      ...technologyCardDocs.find(
        (n) => !!n.name && n.name === c.technologyCard?.name
      ),
    })) || [];

  const mediaCardProps =
    data.consulting.medias?.mediaCards?.map<MediaCardProps>((m) => ({
      type: m.type as MediaCardProps["type"],
      content: m.content,
    })) || [];

  const bookingButtonProps = {
    buttonText: data.global.bookingButtonText,
  };

  const categories =
    data.consulting.testimonialCategories
      ?.filter((category) => !!category?.testimonialCategory)
      ?.map((category) => category.testimonialCategory.name) ?? [];

  return (
    <RecaptchaContext.Provider
      value={{
        recaptchaKey: props.env.GOOGLE_RECAPTCHA_SITE_KEY,
      }}
    >
      <SEO seo={props.seo} />
      <Layout menu={data.megamenu}>
        <Section className="mx-auto w-full max-w-9xl px-8 py-5">
          <Breadcrumbs
            path={removeExtension(props.variables.relativePath)}
            suffix={data.global.breadcrumbSuffix}
            title={data.consulting.seo?.title}
            seoSchema={data.consulting.seo}
          />
        </Section>
        <Section className="w-full" color="black">
          <Booking {...data.consulting.booking}>
            <BookingButton data={bookingButtonProps} />
          </Booking>
        </Section>
        <Section
          color="black"
          className={`
            prose-dark
            border-y-4 border-y-sswRed
            text-center`}
        >
          <a id="more" />
          <div className="w-full bg-benefits bg-cover bg-fixed bg-center bg-no-repeat py-12">
            <div
              data-tina-field={tinaField(data.consulting, "_body")}
              className="mx-auto max-w-9xl px-4"
            >
              <TinaMarkdown
                components={componentRenderer}
                content={data.consulting._body}
              />
              <Benefits data={data.consulting.benefits} />
            </div>
          </div>
        </Section>
        <Section className="mb-16">
          <Container padding="px-4" className="flex w-full flex-wrap">
            {data.consulting.afterBody ? (
              <div>
                <Blocks
                  prefix={"ConsultingAfterBody"}
                  blocks={data.consulting.afterBody}
                />
              </div>
            ) : (
              <></>
            )}
            <TestimonialRow
              testimonialsResult={props.testimonialsResult}
              categories={categories}
              tagline={data.consulting.testimonials?.tagline}
            />
            <BookingButton
              data={{ ...bookingButtonProps, containerClass: "mt-20" }}
            />
          </Container>
        </Section>
        <Marketing content={props.marketingData} />
        <Section className="!bg-gray-75 pb-40">
          <Container size="custom">
            <h1 className="text-center">Companies we have worked with</h1>
            <ClientLogos />
          </Container>
        </Section>
        {!!techCards.length && (
          <Section className="pb-16 text-center">
            <Container padding="px-4">
              <TechnologyCards {...data.consulting.technologies} />
            </Container>
          </Section>
        )}
        {!!mediaCardProps.length && (
          <Section className="pb-40 pt-8 text-center">
            <Container size="custom">
              <MediaCards
                header={data.consulting.medias?.header}
                cardProps={mediaCardProps}
              />
            </Container>
          </Section>
        )}
        <Section className="!bg-gray-75 pb-25 text-center">
          <Container size="custom" className="w-full">
            <h1
              data-tina-field={tinaField(data.consulting, "callToAction")}
              dangerouslySetInnerHTML={{
                __html: parseCallToAction(
                  data.consulting.callToAction,
                  data.consulting.solution?.project,
                  data.consulting.solution
                ),
              }}
            ></h1>
            <p className="text-lg">
              Jump on a call with one of our Account Managers to discuss how we
              can help you.
            </p>
            <BookingButton data={bookingButtonProps} />
          </Container>
        </Section>
        <Section>
          <BuiltOnAzure data={{ backgroundColor: "default" }} />
        </Section>
      </Layout>
    </RecaptchaContext.Provider>
  );
}

const parseCallToAction = (
  content: string,
  project: string,
  data: { project?: string }
) => {
  const HTMLelement: ReactElement = (
    <span
      className="text-sswRed"
      {...(data ? { "data-tina-field": tinaField(data, "project") } : {})}
    >
      {project}
    </span>
  );

  return sanitiseXSS(
    content?.replace("{{TITLE}}", ReactDOMServer.renderToString(HTMLelement)),
    spanWhitelist
  );
};

export const getStaticProps = async ({ params }) => {
  const tinaProps = await client.queries.consultingContentQuery({
    relativePath: `${params.filename}.mdx`,
  });

  const categories =
    tinaProps.data.consulting?.testimonialCategories
      ?.map((category) => category?.testimonialCategory?.name)
      ?.filter((item) => !!item) || [];

  const testimonialsResult = await getRandomTestimonialsByCategory(categories);

  const seo = tinaProps.data.consulting.seo;
  if (seo && !seo.canonical) {
    seo.canonical = `${tinaProps.data.global.header.url}consulting/${params.filename}`;
  }

  const technologyCardNames =
    tinaProps.data.consulting.technologies?.technologyCards?.reduce<string[]>(
      (pre, cur) => {
        !!cur.technologyCard?.name && pre.push(cur.technologyCard.name);
        return pre;
      },
      []
    ) || [];
  const technologyCardsProps = await client.queries.technologyCardContentQuery({
    cardNames: technologyCardNames,
  });

  const marketingSection = await client.queries.marketing({
    relativePath: "/why-choose-ssw.mdx",
  });

  return {
    props: {
      data: tinaProps.data,
      query: tinaProps.query,
      variables: tinaProps.variables,
      testimonialsResult,
      technologyCards: technologyCardsProps,
      marketingData: marketingSection.data,
      env: {
        GOOGLE_RECAPTCHA_SITE_KEY:
          process.env.GOOGLE_RECAPTCHA_SITE_KEY || null,
      },
      seo,
    },
  };
};

export const getStaticPaths = async () => {
  let pageListData = await client.queries.consultingConnection();
  const allPagesListData = pageListData;

  while (pageListData.data.consultingConnection.pageInfo.hasNextPage) {
    const lastCursor =
      pageListData.data.consultingConnection.pageInfo.endCursor;
    pageListData = await client.queries.consultingConnection({
      after: lastCursor,
    });

    allPagesListData.data.consultingConnection.edges.push(
      ...pageListData.data.consultingConnection.edges
    );
  }

  return {
    paths: allPagesListData.data.consultingConnection.edges.map((page) => ({
      params: { filename: page.node._sys.filename },
    })),
    fallback: false,
  };
};
