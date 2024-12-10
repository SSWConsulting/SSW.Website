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
  const pageData = data.industry;

  return (
    <>
      <Container className="prose flex-1" size="custom">
        {pageData.whitepaperFile ? (
          <DownloadWhitepaperLink whitepaperFile={pageData.whitepaperFile}>
            <div data-tina-field={tinaField(pageData, "bannerImg")}>
              <Image
                src={pageData.bannerImg}
                width={1312}
                height={0}
                alt="SSW Industry Banner"
                sizes="100vw"
              />
            </div>
          </DownloadWhitepaperLink>
        ) : (
          <Image
            src={pageData.bannerImg}
            width={1312}
            height={0}
            alt="SSW Industry Banner"
            sizes="100vw"
          />
        )}
        {pageData.seo?.showBreadcrumb === null ||
        pageData.seo?.showBreadcrumb ? (
          <Breadcrumbs
            path={removeExtension(props.variables.relativePath)}
            title={pageData.seo.title}
          />
        ) : (
          <></>
        )}
        <h1 className="mb-1 py-0 text-3xl">{pageData?.heading}</h1>
        <h2 className="!mt-1 pt-0 text-base font-light text-sswBlack">
          {pageData?.subHeading}
        </h2>
        <div
          className="mb-24 mt-15"
          data-tina-field={tinaField(pageData, "_body")}
        >
          <TinaMarkdown
            components={industryRenderer}
            content={pageData._body}
          />
        </div>
      </Container>
      <BuiltOnAzure data={{ backgroundColor: "lightgray" }} />
    </>
  );
}
