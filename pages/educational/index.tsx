import { InferGetStaticPropsType } from "next";
import Image from "next/image";
import { tinaField, useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { client } from "../../.tina/__generated__/client";
import { EducationalConnectionQuery } from "../../.tina/__generated__/types";
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
import layoutData from "../../content/global/index.json";
import { RecaptchaContext } from "../../context/RecaptchaContext";

export default function EducationalIndex(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const removeExtension = (file: string) => {
    return file.split(".")[0];
  };

  const ensureEndsWith = (text: string | undefined | null, suffix: string) => {
    return text?.endsWith(suffix) || false ? text : text + suffix;
  };

  const node = getNode(data);
  node.seo &&
    (node.seo.canonical = `${ensureEndsWith(
      layoutData.header.url,
      "/"
    )}educational`);

  return (
    <RecaptchaContext.Provider
      value={{ recaptchaKey: props.env.GOOGLE_RECAPTCHA_SITE_KEY }}
    >
      <Layout>
        <SEO seo={node.seo} />
        <Container className="flex-1" size="custom">
          <DownloadWhitepaperLink whitepaperFile={node.whitepaperFile}>
            <div data-tina-field={tinaField(node, "bannerImg")}>
              <Image
                src={node.bannerImg}
                width={1312}
                height={0}
                alt="SSW Educational Banner"
                sizes="100vw"
              />
            </div>
          </DownloadWhitepaperLink>
          <Breadcrumbs
            path={removeExtension(node._sys.relativePath)}
            suffix=""
            title={node.seo.title}
          />
          <h1 className="mb-1 py-0 text-3xl">SSW Educational</h1>
          <h2 className="!mt-1 pt-0 text-md font-light">
            Customised Technology Solutions
          </h2>
          <div
            className="mb-4 mt-15"
            data-tina-field={tinaField(node, "_body")}
          >
            <TinaMarkdown components={industryRenderer} content={node._body} />
          </div>
        </Container>
        <BuiltOnAzure data={{ backgroundColor: "lightgray" }} />
      </Layout>
      <SuccessToast />
    </RecaptchaContext.Provider>
  );
}

const getNode = (data: EducationalConnectionQuery) => {
  if (data.educationalConnection.edges.length !== 1) {
    throw new Error("Expected exactly one consulting index page");
  }

  return data.educationalConnection.edges[0].node;
};

export const getStaticProps = async () => {
  const tinaProps = await client.queries.educationalConnection();

  return {
    props: {
      ...tinaProps,
      env: {
        GOOGLE_RECAPTCHA_SITE_KEY:
          process.env.GOOGLE_RECAPTCHA_SITE_KEY || null,
      },
    },
  };
};
