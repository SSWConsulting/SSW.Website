"use client";

import { Blocks } from "@/components/blocks-renderer";
import { Booking } from "@/components/blocks/booking";
import { BuiltOnAzure } from "@/components/blocks/builtOnAzure";
import { ClientLogos } from "@/components/blocks/clientLogos";
import { componentRenderer } from "@/components/blocks/mdxComponentRenderer";
import { BookingButton } from "@/components/bookingButton/bookingButton";
import { CallToAction } from "@/components/callToAction/callToAction";
import MediaCards from "@/components/consulting/mediaCard/mediaCards";
import { Marketing } from "@/components/marketing/Marketing";
import TechnologyCards from "@/components/technologyCard/technologyCards";
import { TestimonialRow } from "@/components/testimonials/TestimonialRow";
import { Benefits } from "@/components/util/consulting/benefits";
import { Container } from "@/components/util/container";
import { Section } from "@/components/util/section";
import { sanitiseXSS, spanWhitelist } from "@/helpers/validator";
import { removeExtension } from "@/services/client/utils.service";
import { type default as client } from "@/tina/client";
import { Breadcrumbs } from "app/components/breadcrumb";
import { Open_Sans } from "next/font/google";
import { ReactElement } from "react";
import ReactDOMServer from "react-dom/server";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export type OldConsultingPage = Awaited<
  ReturnType<typeof client.queries.consultingContentQuery>
>;

export default function Consulting({ tinaProps, props }) {
  console.log("props", props);
  console.log("tinaProps", tinaProps);
  const { techCards, marketingData, categories, mediaCardProps } = props;
  const { data } = tinaProps;
  return (
    <>
      <Section className="mx-auto min-h-24 w-full max-w-9xl px-8 py-5 md:min-h-16">
        <Breadcrumbs
          path={removeExtension(props.variables.relativePath)}
          title={data.consulting.seo?.title}
          seoSchema={data.consulting.seo}
        />
      </Section>
      <Section className="w-full" color="black">
        <Booking {...data.consulting.booking}>
          <BookingButton />
        </Booking>
      </Section>
      <Section
        color="black"
        className={"prose-dark border-y-4 border-y-sswRed text-center"}
      >
        <a id="more" />
        <div className="w-full bg-benefits bg-cover bg-fixed bg-center bg-no-repeat py-12">
          <div
            data-tina-field={tinaField(data.consulting, "_body")}
            className="mx-auto px-8 md:max-w-3/4"
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
          {/* <TestimonialRow
            testimonialsResult={props.testimonialsResult}
            categories={categories}
            tagline={data.consulting.testimonials?.tagline}
          /> */}
          <BookingButton
            data={{
              containerClass: "mt-20",
            }}
          />
        </Container>
      </Section>
      {/* <Marketing content={marketingData} /> */}
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
      {/* {!!mediaCardProps.length && (
        <Section className="pb-40 pt-8 text-center">
          <Container size="custom">
            <MediaCards
              header={data.consulting.medias?.header}
              cardProps={mediaCardProps}
            />
          </Container>
        </Section>
      )} */}
      {data?.consulting?.callToAction?.showCallToAction && (
        <CallToAction
          buttonSubtitle={data?.consulting?.callToAction?.buttonSubtitle}
          subTitle={data?.consulting?.callToAction?.subTitle}
          animated={data?.consulting?.callToAction?.animated}
          buttonText={data?.consulting?.callToAction?.buttonText}
          tinaFields={{
            subTitle: tinaField(data.consulting?.callToAction, "subTitle"),
            buttonSubtitle: tinaField(
              data.consulting?.callToAction,
              "buttonSubtitle"
            ),
          }}
        >
          <h2
            className="callToAction"
            data-tina-field={tinaField(data.consulting.callToAction, "title")}
            dangerouslySetInnerHTML={{
              __html: parseCallToAction(
                data.consulting?.callToAction?.title,
                data.consulting?.solution?.project,
                data.consulting?.solution
              ),
            }}
          ></h2>
        </CallToAction>
      )}
      <Section>
        <BuiltOnAzure
          data={
            data.consulting?.azureBanner?.azureFooterColor
              ? data.consulting
              : {
                  azureFooterColor: "white",
                }
          }
        />
      </Section>
    </>
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
