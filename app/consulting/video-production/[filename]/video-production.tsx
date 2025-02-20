"use client";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

import { Blocks } from "@/components/blocks-renderer";
import { Booking } from "@/components/blocks/booking";
import { BuiltOnAzure } from "@/components/blocks/builtOnAzure";
import { componentRenderer } from "@/components/blocks/mdxComponentRenderer";
import { BookingButton } from "@/components/bookingButton/bookingButton";
import { Container } from "@/components/util/container";
import { Section } from "@/components/util/section";
import { sanitiseXSS, spanWhitelist } from "@/helpers/validator";
import { removeExtension } from "@/services/client/utils.service";
import { Breadcrumbs } from "app/components/breadcrumb";
import { ReactElement } from "react";
import ReactDOMServer from "react-dom/server";

export default function VideoProductionPage({ props, tinaProps }) {
  const { data } = tinaProps;

  const bookingButtonProps = {
    buttonText: data.global.bookingButtonText,
  };

  return (
    <>
      <Section className="mx-auto w-full max-w-9xl px-8 py-5">
        <Breadcrumbs
          path={removeExtension(props.variables.relativePath)}
          title={data.videoProduction.seo?.title}
          seoSchema={data.videoProduction.seo}
        />
      </Section>

      <Section className="w-full" color="black">
        <Booking {...data.videoProduction.booking}>
          <BookingButton data={bookingButtonProps} />
        </Booking>
      </Section>

      <Section className={"prose-dark border-y-4 border-y-sswRed text-center"}>
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
        <BuiltOnAzure
          data={
            data.videoProduction?.azureBanner?.azureFooterColor
              ? data.videoProduction.azureBanner
              : {
                  azureFooterColors: "white",
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
