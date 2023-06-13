import { useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

import { client } from "../../.tina/__generated__/client";
import { BuiltOnAzure } from "../../components/blocks";
import { Breadcrumbs } from "../../components/blocks/breadcrumbs";
import { Booking } from "../../components/blocks/booking";
import { componentRenderer } from "../../components/blocks/mdxComponentRenderer";
import { Layout } from "../../components/layout";
import { Marketing } from "../../components/marketing/Marketing";
import { Benefits } from "../../components/util/consulting/benefits";
import { Container } from "../../components/util/container";
import { Section } from "../../components/util/section";
import { SEO } from "../../components/util/seo";
import { UtilityButton } from "../../components/button/utilityButton";
import { InferGetStaticPropsType } from "next";
import {
  Opportunities,
  OpportunityType,
} from "../../components/employment/opportunities";
import { jobStatus } from "../../components/util/constants/opportunity";

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

  const chosenOpportunities: OpportunityType[] =
    data.employment.opportunities.map((o) => {
      return {
        title: o?.opportunityRef?.title,
        employmentType: o?.opportunityRef?.employmentType,
        status: o?.opportunityRef?.status,
        locations: o?.opportunityRef?.locations,
        hideApply: o?.opportunityRef?.hideApply,
        description: o?.opportunityRef?._body,
      };
    });

  const filledOpportunities: OpportunityType[] =
    data.opportunitiesConnection?.edges
      .filter((o) => o.node.status === jobStatus[1])
      .map((o) => {
        return {
          title: o.node.title,
          employmentType: o.node.employmentType,
          status: o.node.status,
          locations: o.node.locations,
          hideApply: o.node.hideApply,
          description: o.node._body,
        };
      });

  const opportunities: OpportunityType[] =
    chosenOpportunities.concat(filledOpportunities);

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
            <UtilityButton
              buttonText="Check out our current opportunities"
              link="#available"
            />
          </Booking>
        </Section>
        <Section
          color="black"
          className={`
            prose-employment
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
              {data.employment.benefitsBody && (
                <TinaMarkdown
                  content={data.employment.benefitsBody}
                  components={componentRenderer}
                />
              )}
            </div>
          </div>
        </Section>
        {data.employment.afterBody ? (
          <Section className="prose-employment mb-16 text-center">
            <Container padding="px-4" className="w-full">
              <TinaMarkdown
                content={data.employment.afterBody}
                components={componentRenderer}
              />
            </Container>
          </Section>
        ) : (
          <></>
        )}
        <Marketing content={props.marketingData} />

        <Section className="!block" id="available">
          {data.employment.opportunitiesBody && (
            <Container
              size="custom"
              className="prose-employment w-full text-center"
            >
              <TinaMarkdown
                content={data.employment.opportunitiesBody}
                components={componentRenderer}
              />
            </Container>
          )}
          <Container size="custom" className="w-full">
            <Opportunities opportunities={opportunities} />
          </Container>
        </Section>
        <Section className="!bg-gray-75 pb-25 text-center">
          <Container size="custom" className="w-full">
            <TinaMarkdown
              content={data.employment.callToActionBody}
              components={componentRenderer}
            />
          </Container>
        </Section>
        <Section>
          <BuiltOnAzure data={{ backgroundColor: "default" }} />
        </Section>
      </Layout>
    </>
  );
}

export const getStaticProps = async () => {
  const tinaProps = await client.queries.employmentPageQuery({
    relativePath: "index.mdx",
  });

  const canonical = `${tinaProps.data.global.header.url}employment`;
  const seo = tinaProps.data.employment.seo;
  if (seo) {
    seo.canonical = canonical;
  }

  const marketingSection = await client.queries.marketing({
    relativePath: "/dressing-down.mdx",
  });

  return {
    props: {
      data: tinaProps.data,
      query: tinaProps.query,
      variables: tinaProps.variables,
      marketingData: marketingSection.data,
      seo,
    },
  };
};
