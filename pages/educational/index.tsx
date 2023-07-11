import { InferGetStaticPropsType } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaFileDownload } from "react-icons/fa";
import { toast } from "react-toastify";
import { tinaField, useTina } from "tinacms/dist/react";
import { Components, TinaMarkdown } from "tinacms/dist/rich-text";
import { client } from "../../.tina/__generated__/client";
import { EducationalConnectionQuery } from "../../.tina/__generated__/types";
import { BuiltOnAzure } from "../../components/blocks";
import { Breadcrumbs } from "../../components/blocks/breadcrumbs";
import { componentRenderer } from "../../components/blocks/mdxComponentRenderer";
import { SolutionsRow } from "../../components/blocks/solutionsRow";
import { BookingForm } from "../../components/bookingForm/bookingForm";
import Button from "../../components/button/button";
import { Layout } from "../../components/layout";
import ReactPlayer from "../../components/reactPlayer/reactPlayer";
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

  const showSuccessToast = () => {
    toast.success(
      <div className="text-left">
        Form submitted. We'll be in contact as soon as possible.
      </div>
    );
  };

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
  const PComponent = ({ children }) => <p className="mb-3">{children}</p>;

  const DownloadWhitepaperLink = ({ children }) => (
    <Link href={node.whitepaperFile} passHref legacyBehavior>
      <a target="_blank">{children}</a>
    </Link>
  );
  const educationalRenderer: Components<{
    VideoEmbed: {
      url: string;
    };
    Whitepaper: {
      title: string;
      description: string;
      buttonText: string;
    };
    BookingForm: Record<string, never>;
    ContactUs: {
      buttonText: string;
      link: string;
    };
    SolutionsRow: {
      imgSrc1: string;
      header1: string;
      body1: string;
      imgSrc2: string;
      header2: string;
      body2: string;
      imgSrc3: string;
      header3: string;
      body3: string;
    };
  }> = {
    ...componentRenderer,
    h3: ({ children }) => (
      <h3 className="mb-3 mt-10 text-sswRed">{children}</h3>
    ),
    p: PComponent,
    VideoEmbed: ({ url }) => (
      <div className="relative h-0 overflow-hidden pb-9/16">
        <div className="absolute h-full w-full">
          <ReactPlayer url={url} width="100%" height="100%" controls={true} />
        </div>
      </div>
    ),
    Whitepaper: ({ title, description, buttonText }) => (
      <div className="mt-4 border-1 border-gray-300 bg-gray-125 px-6 py-4">
        <h4 className="mb-3 mt-6">{title}</h4>
        <p className="mb-4">{description}</p>
        <div className="flex justify-center">
          <DownloadWhitepaperLink>
            <Button ripple className="done mx-2 inline-flex !h-10 pl-3">
              <FaFileDownload className="m-icon" />
              {buttonText}
            </Button>
          </DownloadWhitepaperLink>
        </div>
      </div>
    ),
    BookingForm: () => <BookingForm showSuccessToast={showSuccessToast} />,
    ContactUs: ({ buttonText, link }) => (
      <div className="mb-16 flex justify-center">
        <a href={link}>
          <Button
            ripple
            className="!h-10 !bg-gray-900 bg-arrow-right bg-right bg-no-repeat pl-3 pr-8 text-sm"
          >
            {buttonText}
          </Button>
        </a>
      </div>
    ),
    SolutionsRow: (props) => <SolutionsRow {...props} />,
  };

  return (
    <RecaptchaContext.Provider
      value={{ recaptchaKey: props.env.GOOGLE_RECAPTCHA_SITE_KEY }}
    >
      <Layout>
        <SEO seo={node.seo} />
        <Container className="flex-1" size="custom">
          <DownloadWhitepaperLink>
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
            <TinaMarkdown
              components={educationalRenderer}
              content={node._body}
            />
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
