import { useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

import { client } from "../../.tina/__generated__/client";
import { BuiltOnAzure, ClientLogos } from "../../components/blocks";
import { Breadcrumbs } from "../../components/blocks/breadcrumbs";
import { Booking } from "../../components/blocks/booking";
import { componentRenderer } from "../../components/blocks/mdxComponentRenderer";
import { Layout } from "../../components/layout";
import { Marketing } from "../../components/marketing/Marketing";
import TechnologyCards from "../../components/technologyCard/technologyCards";
import { Benefits } from "../../components/util/consulting/benefits";
import { Container } from "../../components/util/container";
import { Section } from "../../components/util/section";
import { SEO } from "../../components/util/seo";
import { Blocks } from "../../components/blocks-renderer";
import { HeaderButton } from "../../components/button/headerButton";
import { InferGetStaticPropsType } from "next";

export default function EmploymentPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
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
    data.employment.technologies?.technologyCards?.map((c) => ({
      ...technologyCardDocs.find(
        (n) => !!n.name && n.name === c.technologyCard?.name
      ),
    })) || [];

  return (
    <>
      <SEO seo={props.seo} />
      <Layout>
        <Section className="mx-auto w-full max-w-9xl px-8 py-5">
          <Breadcrumbs
            path={removeExtension(props.variables.relativePath)}
            suffix={data.global.breadcrumbSuffix}
            title={data.employment.seo?.title}
          />
        </Section>
        <Section className="w-full" color="black">
          <Booking {...data.employment.booking}>
            <HeaderButton>Check out our current opportunities</HeaderButton>
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
            <div className="mx-auto max-w-9xl px-4">
              <TinaMarkdown
                components={componentRenderer}
                content={data.employment._body}
              />
              <Benefits data={data.employment.benefits} />
            </div>
          </div>
        </Section>
        <Section className="mb-16">
          <Container padding="px-4" className="flex w-full flex-wrap">
            {data.employment.afterBody ? (
              <div>
                <Blocks
                  prefix={"ConsultingAfterBody"}
                  blocks={data.employment.afterBody}
                />
              </div>
            ) : (
              <></>
            )}
          </Container>
        </Section>
        {!!techCards.length && (
          <Section className="pb-16 text-center">
            <Container padding="px-4">
              <TechnologyCards
                techHeader={data.employment.technologies.header}
                techSubheading={data.employment.technologies.subheading}
                techCards={techCards}
              />
            </Container>
          </Section>
        )}
        <Marketing content={props.marketingData} />
        <Section className="!bg-gray-75 pb-25 text-center">
          <Container size="custom" className="w-full">
            <h1>Don't fit any of the available positions?</h1>
            <p className="text-lg">
              We may still be a match! Tell us why you want to join the SSW
              team.
            </p>
            {/* <BookingButton {...bookingButtonProps} /> */}
          </Container>
        </Section>
        <Section>
          <BuiltOnAzure data={{ backgroundColor: "default" }} />
        </Section>
      </Layout>
    </>
  );
}

export const getStaticProps = async ({ params }) => {
  const tinaProps = await client.queries.employmentPageQuery({
    relativePath: "index.mdx",
  });

  const canonical = `${tinaProps.data.global.header.url}employment`;
  const seo = tinaProps.data.employment.seo;
  if (seo) {
    seo.canonical = canonical;
  }

  const technologyCardNames =
    tinaProps.data.employment.technologies?.technologyCards?.reduce<string[]>(
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
    relativePath: "/dressing-down.mdx",
  });

  return {
    props: {
      data: tinaProps.data,
      query: tinaProps.query,
      variables: tinaProps.variables,
      technologyCards: technologyCardsProps,
      marketingData: marketingSection.data,
      env: {
        GOOGLE_RECAPTCHA_KEY: process.env.GOOGLE_RECAPTCHA_KEY || null,
      },
      seo,
    },
  };
};
