"use client";
import { Breadcrumbs } from "app/components/breadcrumb";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Booking } from "../../components/blocks/booking";

import { BuiltOnAzure } from "../../components/blocks/builtOnAzure";
import { componentRenderer } from "../../components/blocks/mdxComponentRenderer";
import {
  Opportunities,
  OpportunityType,
} from "../../components/filter/opportunities";
import { Marketing } from "../../components/marketing/Marketing";
import {
  jobStatus,
  type EmploymentType,
  type Locations,
} from "../../components/util/constants/opportunity";
import { Benefits } from "../../components/util/consulting/benefits";
import { Container } from "../../components/util/container";
import { Section } from "../../components/util/section";
import { removeExtension } from "../../services/client/utils.service";

const AVAILABLE = jobStatus[0];
const FILLED = jobStatus[1];

export default function EmploymentPage({ tinaProps, props }) {
  const { data } = tinaProps;
  // const { data } = useTina({
  //   data: props.data,
  //   query: props.query,
  //   variables: props.variables,
  // });

  const opportunities: OpportunityType[] =
    data.opportunitiesConnection?.edges.map((o) => {
      const status = data.employment.opportunities.some(
        (chosen) => chosen?.opportunityRef?.title === o?.node?.title
      )
        ? AVAILABLE
        : FILLED;

      return {
        title: o.node.title,
        employmentType: o.node.employmentType as EmploymentType,
        status,
        locations: o.node.locations as Locations,
        hideApply: o.node.hideApply,
        description: o.node._body,
      };
    });

  const chosenOpportunityOrder = data.employment.opportunities
    .map((chosen) => chosen?.opportunityRef?.title)
    .filter(Boolean); // Filter out undefined titles

  opportunities.sort((currentOpportunity, nextOpportunity) => {
    const indexOfChosenCurrentOpportunity = chosenOpportunityOrder.indexOf(
      currentOpportunity.title
    );
    const indexOfChosenNextOpportunity = chosenOpportunityOrder.indexOf(
      nextOpportunity.title
    );

    return indexOfChosenCurrentOpportunity - indexOfChosenNextOpportunity;
  });

  return (
    <>
      {/* <SEO seo={props.seo} /> */}
      <Section className="mx-auto w-full max-w-9xl px-8 py-5">
        <Breadcrumbs
          path={removeExtension(props.variables.relativePath)}
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
        className={
          "prose-dark border-y-4 border-y-sswRed text-center text-white"
        }
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
              <div data-tina-field={tinaField(data.employment, "benefitsBody")}>
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
        <Section className="prose-dark mb-16 text-center">
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
          <Container size="custom" className="prose-dark w-full text-center">
            <div
              data-tina-field={tinaField(data.employment, "opportunitiesBody")}
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
          <div data-tina-field={tinaField(data.employment, "callToActionBody")}>
            <TinaMarkdown
              content={data.employment.callToActionBody}
              components={componentRenderer}
            />
          </div>
        </Container>
      </Section>
      <Section>
        <BuiltOnAzure
          data={
            data.azureBanner?.azureFooterColor
              ? data.azureBanner
              : {
                  azureFooterColor: "white",
                }
          }
        />
      </Section>
    </>
  );
}
