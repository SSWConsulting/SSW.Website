import { client } from "@/tina/client";
import { TODAY } from "hooks/useFetchEvents";
import { InferGetStaticPropsType } from "next";
import Image from "next/image";
import { tinaField, useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { BuiltOnAzure } from "../../components/blocks";
import { Breadcrumbs } from "../../components/blocks/breadcrumbs";
import {
  DownloadWhitepaperLink,
  industryRenderer,
} from "../../components/blocks/industryRenderer";
import { Layout } from "../../components/layout";
import SuccessToast from "../../components/successToast/successToast";
import { Container } from "../../components/util/container";
import { SEO } from "../../components/util/seo";
import { RecaptchaContext } from "../../context/RecaptchaContext";
import { removeExtension } from "../../services/client/utils.service";

export default function IndustryPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { data } = useTina({
    data: props.data,
    query: props.query,
    variables: props.variables,
  });

  const pageData = data.industry;

  return (
    <RecaptchaContext.Provider
      value={{ recaptchaKey: props.env.GOOGLE_RECAPTCHA_SITE_KEY }}
    >
      <Layout liveStreamData={props.data.userGroup} menu={data.megamenu}>
        <SEO seo={pageData.seo} />
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
              suffix=""
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
      </Layout>
      <SuccessToast />
    </RecaptchaContext.Provider>
  );
}

export const getStaticProps = async ({ params }) => {
  const tinaProps = await client.queries.industryContentQuery({
    date: TODAY.toISOString(),
    relativePath: `${params.filename}.mdx`,
  });

  if (tinaProps.data.industry.seo && !tinaProps.data.industry.seo.canonical) {
    tinaProps.data.industry.seo.canonical = `${tinaProps.data.global.header.url}industry/${params.filename}`;
  }

  return {
    props: {
      data: tinaProps.data,
      query: tinaProps.query,
      variables: tinaProps.variables,
      env: {
        GOOGLE_RECAPTCHA_SITE_KEY:
          process.env.GOOGLE_RECAPTCHA_SITE_KEY || null,
      },
    },
  };
};

export const getStaticPaths = async () => {
  const pagesListData = await client.queries.industryConnection();
  return {
    paths: pagesListData.data.industryConnection.edges.map((page) => ({
      params: { filename: page.node._sys.filename },
    })),
    fallback: false,
  };
};
