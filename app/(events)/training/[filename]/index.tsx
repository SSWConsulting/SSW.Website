"use client";

import { Breadcrumbs } from "@/app/components/breadcrumb";
import { Blocks } from "@/components/blocks-renderer";
import { BuiltOnAzure } from "@/components/blocks/builtOnAzure";
import { ClientLogos } from "@/components/blocks/clientLogos";
import { componentRenderer } from "@/components/blocks/mdxComponentRenderer";
import { TestimonialRow } from "@/components/testimonials/TestimonialRow";
import TrainingCarousel from "@/components/training/trainingHeader";
import { Container } from "@/components/util/container";
import { Section } from "@/components/util/section";
import VideoCards, { VideoCardType } from "@/components/util/videoCards";
import { sanitiseXSS, spanWhitelist } from "@/helpers/validator";
import { removeExtension } from "@/services/client/utils.service";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export default function TrainingPage({ props, tinaProps }) {
  const { data } = tinaProps;
  const videoCardProps: VideoCardType[] =
    data?.training.videos?.videoCards?.map((video) => ({
      title: video.title,
      link: video.link,
    })) || [];

  return (
    <>
      <div data-tina-field={tinaField(data.training, "trainingHeaderCarousel")}>
        <TrainingCarousel data={data.training.trainingHeaderCarousel} />
      </div>
      <Container padding={"md:px-8 px-0"} className="pt-2">
        {(data.training.seo?.showBreadcrumb === null ||
          data.training.seo?.showBreadcrumb) && (
          <div
            data-tina-field={tinaField(data.training.seo, "title")}
            className="px-8 md:px-8"
          >
            <Breadcrumbs
              path={removeExtension(props.variables.relativePath)}
              title={data.training?.seo?.title}
            />
          </div>
        )}
        <h1
          data-tina-field={tinaField(data.training, "title")}
          className="py-0 text-center text-5xl font-semibold"
          dangerouslySetInnerHTML={{
            __html: sanitiseXSS(data.training.title, spanWhitelist),
          }}
        />

        <Blocks prefix="Training_body" blocks={data.training._body} />

        <div data-tina-field={tinaField(data.training, "videos")}>
          <VideoCards
            cardProps={videoCardProps}
            channelLink={data.training.videos?.channelLink}
            defaultChannelLink={data.global.youtubeChannelLink}
          />
        </div>

        {data.training.showTestimonials && (
          <Section color="default" className="">
            <Container padding={"md:px-8 px-2"} className={"flex-1 pt-0"}>
              <div
                data-tina-field={tinaField(
                  data.training.testimonials,
                  "tagline"
                )}
                className="mx-auto flex max-w-9xl flex-col items-center"
              >
                <TestimonialRow
                  testimonialsResult={props.testimonialResult}
                  categories={["Internship"]}
                  tagline={data.training.testimonials?.tagline}
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
      <div data-tina-field={tinaField(data.training, "footer")}>
        <TinaMarkdown
          content={data.training.footer}
          components={componentRenderer}
        />
      </div>
      <BuiltOnAzure data={data.training.azureBanner} />
    </>
  );
}
