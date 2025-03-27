"use client";

import { Blocks } from "@/components/blocks-renderer";
import { BuiltOnAzure } from "@/components/blocks/builtOnAzure";
import { componentRenderer } from "@/components/blocks/mdxComponentRenderer";
import EventsHeader from "@/components/events/eventsHeader";
import { Container } from "@/components/util/container";
import { Section } from "@/components/util/section";
import { removeExtension } from "@/services/client/utils.service";
import { Breadcrumbs } from "app/components/breadcrumb";
import dynamic from "next/dynamic";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
const ClientLogos = dynamic(() =>
  import("@/components/blocks/clientLogos").then((mod) => mod.ClientLogos)
);

const TestimonialRow = dynamic(() =>
  import("@/components/testimonials/TestimonialRow").then(
    (mod) => mod.TestimonialRow
  )
);

const VideoCards = dynamic(() => import("@/components/util/videoCards"));

export default function EventsPage({ props, tinaProps }) {
  const { data } = tinaProps;

  const { categories } = props;

  const { videoCardProps } = props;

  return (
    <>
      <div data-tina-field={tinaField(data.events, "eventHeader")}>
        <EventsHeader data={data.events.eventHeader} />
      </div>
      <Container padding={"md:px-8 px-0"} className="pt-2">
        {data.events.showBreadcrumb && (
          <div
            data-tina-field={tinaField(data.events.seo, "title")}
            className="px-8 md:px-8"
          >
            <Breadcrumbs
              path={removeExtension(props.variables.relativePath)}
              title={data.events?.seo?.title}
            />
          </div>
        )}
        {data.events.title && (
          <h1
            data-tina-field={tinaField(data.events, "title")}
            className="py-0 text-center text-5xl font-semibold text-sswRed"
          >
            {data?.events?.title}
          </h1>
        )}
        {data.events.subTitle && (
          <Container padding={"md:px-8 px-0 !py-0"}>
            <div
              data-tina-field={tinaField(data.events, "subTitle")}
              className="mx-6 py-0 text-center md:mx-0 md:text-left"
            >
              <TinaMarkdown content={data.events?.subTitle} />
            </div>
          </Container>
        )}

        <Blocks prefix="Events_body" blocks={data.events._body} />

        <div data-tina-field={tinaField(data.events, "videos")}>
          <VideoCards
            cardProps={videoCardProps}
            channelLink={data.events.videos?.channelLink}
            defaultChannelLink={data?.global?.youtubeChannelLink}
          />
        </div>

        {data.events.showTestimonials && (
          <Section color="default" className="">
            <Container padding={"md:px-8 px-2"} className={"flex-1 pt-0"}>
              <div
                data-tina-field={tinaField(data.events.testimonials, "tagline")}
                className="mx-auto flex max-w-9xl flex-col items-center"
              >
                <TestimonialRow
                  testimonialsResult={props.testimonialResult}
                  categories={categories}
                  tagline={data.events.testimonials?.tagline}
                />
              </div>
            </Container>
          </Section>
        )}

        <Section color="default">
          <Container padding={"md:px-8 px-4"} className={"flex-1 pt-0"}>
            <div className="flex flex-col items-center pb-15 text-center">
              <h2>
                Trusted by more than <span className="text-sswRed">1000+</span>{" "}
                clients in the world
              </h2>
              <p className="max-w-3xl text-lg font-light text-gray-500">
                Our software developers & consultants have delivered the best in
                the business to more than 1,000 clients in 15 countries.
              </p>
            </div>
            <ClientLogos />
          </Container>
        </Section>
      </Container>
      <div data-tina-field={tinaField(data.events, "footer")}>
        <TinaMarkdown
          content={data.events.footer}
          components={componentRenderer}
        />
      </div>
      <BuiltOnAzure data={data.events.azureBanner} />
    </>
  );
}
