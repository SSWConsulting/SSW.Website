import { InferGetStaticPropsType } from "next";

import { tinaField, useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { client } from "../../../.tina/__generated__/client";

import { ReactElement } from "react";
import { BuiltOnAzure } from "../../../components/blocks";
import { Blocks } from "../../../components/blocks-renderer";
import { Booking } from "../../../components/blocks/booking";
import { Breadcrumbs } from "../../../components/blocks/breadcrumbs";
import { componentRenderer } from "../../../components/blocks/mdxComponentRenderer";
import { BookingButton } from "../../../components/bookingButton/bookingButton";
import { Layout } from "../../../components/layout";
import { Container } from "../../../components/util/container";
import { Section } from "../../../components/util/section";
import { SEO } from "../../../components/util/seo";
import { RecaptchaContext } from "../../../context/RecaptchaContext";
import { removeExtension } from "../../../services/client/utils.service";

import ReactDOMServer from "react-dom/server";
import { sanitiseXSS, spanWhitelist } from "../../../helpers/validator";

export default function VideoProductionPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { data } = useTina({
    data: props.data,
    query: props.query,
    variables: props.variables,
  });

  const bookingButtonProps = {
    buttonText: data.global.bookingButtonText,
  };

  return (
    <RecaptchaContext.Provider
      value={{ recaptchaKey: props.env.GOOGLE_RECAPTCHA_SITE_KEY }}
    >
      <SEO seo={props.seo} />
      <Layout menu={data.megamenu}>
        <Section className="mx-auto w-full max-w-9xl px-8 py-5">
          <Breadcrumbs
            path={removeExtension(props.variables.relativePath)}
            suffix={data.global.breadcrumbSuffix}
            title={data.videoProduction.seo?.title}
            seoSchema={data.videoProduction.seo}
          />
        </Section>

        <Section className="w-full" color="black">
          <Booking {...data.videoProduction.booking}>
            <BookingButton data={bookingButtonProps} />
          </Booking>
        </Section>

        <Section
          className={`
            prose-dark
            border-y-4 border-y-sswRed
            text-center`}
        >
          <a id="more" />
          <div className="w-full py-12">
            <div
              data-tina-field={tinaField(data.videoProduction, "_body")}
              className="mx-auto max-w-9xl px-4"
            >
              <TinaMarkdown
                components={componentRenderer}
                content={data.videoProduction._body}
              />
            </div>
          </div>
        </Section>

        <Section className="!bg-gray-75 pb-25 text-center">
          <Container size="custom" className="w-full">
            <h1
              data-tina-field={tinaField(data.videoProduction, "callToAction")}
              dangerouslySetInnerHTML={{
                __html: parseCallToAction(
                  data.videoProduction.callToAction,
                  data.videoProduction.solution?.project,
                  data.videoProduction.solution
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

        {data.videoProduction.afterBody ? (
          <Section className="mb-16">
            <Container padding="px-4" className="flex w-full flex-wrap">
              <div>
                <Blocks
                  prefix={"VideoProductionAfterBody"}
                  blocks={data.videoProduction.afterBody}
                />
              </div>
            </Container>
          </Section>
        ) : (
          <></>
        )}

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
  const tinaProps = await client.queries.videoProductionContentQuery({
    relativePath: `${params.filename}.mdx`,
  });

  const seo = tinaProps.data.videoProduction.seo;
  if (seo && !seo.canonical) {
    seo.canonical = `${tinaProps.data.global.header.url}consulting/video-production/${params.filename}`;
  }

  return {
    props: {
      data: tinaProps.data,
      query: tinaProps.query,
      variables: tinaProps.variables,
      env: {
        GOOGLE_RECAPTCHA_SITE_KEY:
          process.env.GOOGLE_RECAPTCHA_SITE_KEY || null,
      },
      seo,
    },
  };
};

export const getStaticPaths = async () => {
  let pageListData = await client.queries.videoProductionConnection();
  const allPagesListData = pageListData;

  while (pageListData.data.videoProductionConnection.pageInfo.hasNextPage) {
    const lastCursor =
      pageListData.data.videoProductionConnection.pageInfo.endCursor;
    pageListData = await client.queries.videoProductionConnection({
      after: lastCursor,
    });

    allPagesListData.data.videoProductionConnection.edges.push(
      ...pageListData.data.videoProductionConnection.edges
    );
  }

  return {
    paths: allPagesListData.data.videoProductionConnection.edges.map(
      (page) => ({
        params: { filename: page.node._sys.filename },
      })
    ),
    fallback: false,
  };
};
