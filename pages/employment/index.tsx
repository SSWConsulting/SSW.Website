import { tinaField, useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

import { InferGetStaticPropsType } from "next";
import { client } from "../../.tina/__generated__/client";
import { BuiltOnAzure } from "../../components/blocks";
import { Booking } from "../../components/blocks/booking";
import { Breadcrumbs } from "../../components/blocks/breadcrumbs";
import { componentRenderer } from "../../components/blocks/mdxComponentRenderer";
import {
  Opportunities,
  OpportunityType,
} from "../../components/employment/opportunities";
import { Layout } from "../../components/layout";
import { Marketing } from "../../components/marketing/Marketing";
import { isrRevalidateTime } from "../../components/util/constants/config";
import { jobStatus } from "../../components/util/constants/opportunity";
import { Benefits } from "../../components/util/consulting/benefits";
import { Container } from "../../components/util/container";
import { Section } from "../../components/util/section";
import { SEO } from "../../components/util/seo";
import { getLiveStreamInfo } from "../../services/server/events";

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
      <Layout event={props.liveStreamEvent}>
        <Section className="mx-auto w-full max-w-9xl px-8 py-5">
          <Breadcrumbs
            path={removeExtension(props.variables.relativePath)}
            suffix={data.global.breadcrumbSuffix}
            title={data.employment.seo?.title}
          />
        </Section>
        <Section className="w-full" color="black">
          <Booking {...data.employment.booking}>
            <div
              data-tina-field={tinaField(
                data?.employment?.booking,
                "bookingBody"
              )}
            >
              <TinaMarkdown
                content={data?.employment?.booking?.bookingBody}
                components={componentRenderer}
              />
            </div>
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
              <div data-tina-field={tinaField(data.employment, "_body")}>
                <TinaMarkdown
                  components={componentRenderer}
                  content={data.employment._body}
                />
              </div>
              <Benefits data={data.employment.benefits} />
              {data.employment.benefitsBody && (
                <div
                  data-tina-field={tinaField(data.employment, "benefitsBody")}
                >
                  <TinaMarkdown
                    content={data.employment.benefitsBody}
                    components={componentRenderer}
                  />
                </div>
              )}
            </div>
          </div>
        </Section>
        {data.employment.afterBody ? (
          <Section className="prose-employment mb-16 text-center">
            <Container padding="px-4" className="w-full">
              <div data-tina-field={tinaField(data.employment, "afterBody")}>
                <TinaMarkdown
                  content={data.employment.afterBody}
                  components={componentRenderer}
                />
              </div>
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
              <div
                data-tina-field={tinaField(
                  data.employment,
                  "opportunitiesBody"
                )}
              >
                <TinaMarkdown
                  content={data.employment.opportunitiesBody}
                  components={componentRenderer}
                />
              </div>
            </Container>
          )}
          <Container size="custom" className="w-full">
            <Opportunities opportunities={opportunities} />
          </Container>
        </Section>
        <Section className="!bg-gray-75 pb-25 text-center">
          <Container size="custom" className="w-full">
            <div
              data-tina-field={tinaField(data.employment, "callToActionBody")}
            >
              <TinaMarkdown
                content={data.employment.callToActionBody}
                components={componentRenderer}
              />
            </div>
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
  const events = await getLiveStreamInfo();

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
      liveStreamEvent: events[0],
    },
    revalidate: isrRevalidateTime,
  };
};
