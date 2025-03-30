"use client";

import { BuiltOnAzure } from "@/components/blocks/builtOnAzure";
import {
  DownloadWhitepaperLink,
  industryRenderer,
} from "@/components/blocks/industryRenderer";
import { Container } from "@/components/util/container";
import { removeExtension } from "@/services/client/utils.service";
import { Breadcrumbs } from "app/components/breadcrumb";
import Image from "next/image";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export default function IndustryPage({ props, tinaProps }) {
  const { data } = tinaProps;
  const industry = data.industry;

  return (
    <>
      {industry.bannerImg ? (
        <div className="mx-auto max-w-9xl px-6 sm:px-8">
          <div className="size-auto">
            {industry.whitepaperFile ? (
              <DownloadWhitepaperLink whitepaperFile={industry.whitepaperFile}>
                <ImageComponent data={industry} />
              </DownloadWhitepaperLink>
            ) : (
              <ImageComponent data={industry} />
            )}
          </div>
        </div>
      ) : (
        <></>
      )}

      <Container className="pt-2">
        {industry.seo?.showBreadcrumb === null ||
        industry.seo?.showBreadcrumb ? (
          <Breadcrumbs
            path={removeExtension(props.variables.relativePath)}
            title={industry.seo.title}
          />
        ) : (
          <></>
        )}
      </Container>

      <Container className="prose flex-1" size="custom">
        <h1 className="mb-1 py-0 text-3xl">{industry?.heading}</h1>
        <h2 className="!mt-1 pt-0 text-base font-light text-sswBlack">
          {industry?.subHeading}
        </h2>
        <div
          className="mb-24 mt-15"
          data-tina-field={tinaField(industry, "_body")}
        >
          <TinaMarkdown
            components={industryRenderer}
            content={industry._body}
          />
        </div>
      </Container>
      <BuiltOnAzure data={industry.azureBanner} />
    </>
  );
}

const ImageComponent = ({ data }) => {
  return (
    <Image
      data-tina-field={tinaField(data, "bannerImg")}
      src={data.bannerImg}
      width={1312}
      height={0}
      alt="SSW Industry Banner"
      sizes="100vw"
    />
  );
};
