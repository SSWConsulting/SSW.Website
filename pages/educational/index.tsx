import Image from "next/image";
import Link from "next/link";
import { useTina } from "tinacms/dist/react";
import { Components, TinaMarkdown } from "tinacms/dist/rich-text";
import { client } from "../../.tina/__generated__/client";
import { EducationalConnectionQuery } from "../../.tina/__generated__/types";
import { BuiltOnAzure } from "../../components/blocks";
import { Breadcrumbs } from "../../components/blocks/breadcrumbs";
import { HorizontalImageLayout } from "../../components/blocks/horizontalImageLayout";
import { componentRenderer } from "../../components/blocks/mdxComponentRenderer";
import { BookingForm } from "../../components/bookingForm/bookingForm";
import Button from "../../components/button/button";
import { Layout } from "../../components/layout";
import ReactPlayer from "../../components/reactPlayer/reactPlayer";
import { Container } from "../../components/util/container";
import { SEO } from "../../components/util/seo";
import { InferGetStaticPropsType } from "next";
import layoutData from "../../content/global/index.json";

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
    return (text?.endsWith(suffix) || false) ? text : text + suffix;
  }

  const node = getNode(data);
  node.seo && (node.seo.canonical = `${ensureEndsWith(layoutData.header.url, "/")}educational`);
  const PComponent = ({ children }) => <p className="mb-3">{children}</p>;
  const SolutionElements = ({ solutions }) => {
    const solutionPropsMap = ({ solutionImage, name, description }) => ({
      imageSrc: solutionImage,
      altText: name,
      height: 360,
      width: 124,
      message: (
        <>
          <h4 className="mb-2 mt-5 text-sm font-bold">{name}</h4>
          <PComponent children={description} />
        </>
      ),
    });
    return <HorizontalImageLayout images={solutions.map(solutionPropsMap)} />;
  };

  const DownloadWhitepaperLink = ({ children }) => (
    <Link href={node.whitepaperFile} passHref legacyBehavior>
      <a target="_blank">{children}</a>
    </Link>
  );
  const educationalRenderer: Components<{
    Solutions: {
      educationalSolutions: {
        solutionImage: string;
        name: string;
        description: string;
      }[];
    };
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
  }> = {
    ...componentRenderer,
    h3: ({ children }) => (
      <h3 className="mb-3 mt-10 text-sswRed">{children}</h3>
    ),
    p: PComponent,
    Solutions: ({ educationalSolutions }) => (
      <SolutionElements solutions={educationalSolutions} />
    ),
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
            <Button ripple className="done mx-2 !h-10 pl-3">
              {buttonText}
            </Button>
          </DownloadWhitepaperLink>
        </div>
      </div>
    ),
    BookingForm: () => (
      <BookingForm recaptchaKey={props.env["GOOGLE_RECAPTCHA_KEY"]} />
    ),
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
  };

  return (
    <Layout>
      <SEO seo={node.seo} />
      <Container className="flex-1" size="custom">
        <DownloadWhitepaperLink>
          <Image
            src={node.bannerImg}
            width={1312}
            height={0}
            alt="SSW Educational Banner"
            sizes="100vw"
          />
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
        <div className="mb-4 mt-15">
          <TinaMarkdown components={educationalRenderer} content={node._body} />
        </div>
      </Container>
      <BuiltOnAzure data={{ backgroundColor: "lightgray" }} />
    </Layout>
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
        GOOGLE_RECAPTCHA_KEY: process.env.GOOGLE_RECAPTCHA_KEY || null,
      },
    },
  };
};
