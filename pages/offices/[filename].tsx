import Image from "next/image";

import { useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { client } from "../../.tina/__generated__/client";

import { BuiltOnAzure } from "../../components/blocks";
import { Breadcrumbs } from "../../components/blocks/breadcrumbs";
import { componentRenderer } from "../../components/blocks/mdxComponentRenderer";
import { Layout } from "../../components/layout";
import ContactPanel from "../../components/offices/contactPanel";
import MicrosoftPanel from "../../components/offices/microsoftPanel";
import TestimonialPanel from "../../components/offices/testimonialPanel";
import { Container } from "../../components/util/container";
import { Section } from "../../components/util/section";
import { SEO } from "../../components/util/seo";
import { InferGetStaticPropsType } from "next";

export default function OfficePage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { data } = useTina({
    data: props.data,
    query: props.query,
    variables: props.variables,
  });

  const removeExtension = (file: string) => {
    return file.split(".")[0];
  };

  return (
    <>
      <SEO seo={data.offices.seo} />
      <Layout>
        {data.offices.coverImg ? (
          <div className="mx-auto max-w-9xl px-6 sm:px-8">
            <div className="h-auto w-auto">
              <Image
                width={1320}
                height={485}
                src={data.offices.coverImg}
                alt="Cover image"
                priority={true}
              />
            </div>
          </div>
        ) : (
          <></>
        )}

        <Container className="pt-2">
          <Breadcrumbs
            path={removeExtension(props.variables.relativePath)}
            suffix={data.global.breadcrumbSuffix}
            title={data.offices.seo.title}
          />
          <div className="mt-8 md:flex">
            <div className="grow">
              <OfficeLayout office={data.offices} />
            </div>
            <div className="md:max-w-sm md:pl-6">
              <SidePanel
                office={data.offices}
                testimonial={props.testimonial}
              />
            </div>
          </div>
        </Container>
        <Section>
          <BuiltOnAzure data={{ backgroundColor: "lightgray" }} />
        </Section>
      </Layout>
    </>
  );
}

const OfficeLayout = ({ office }) => {
  return (
    <div className="prose max-w-full">
      <h2>About Us</h2>
      <TinaMarkdown components={componentRenderer} content={office.aboutUs} />
      {office.map ? (
        <>
          <h2>SSW {office.addressLocality} Map</h2>
          <Image
            src={office.map}
            width={1920}
            height={1080}
            alt={`SSW ${office.addressLocality} Map`}
          />
        </>
      ) : (
        <></>
      )}
      <h2 id="Directions">SSW {office.addressLocality} Directions</h2>
      <TinaMarkdown
        components={componentRenderer}
        content={office.directions}
      />
      {office.parking.children.length > 0 && (
        <>
          <h2>Parking</h2>
          <TinaMarkdown
            components={componentRenderer}
            content={office.parking}
          />
        </>
      )}
      {office.publicTransport.children.length > 0 && (
        <>
          <h2>Public Transport</h2>
          <TinaMarkdown
            components={componentRenderer}
            content={office.publicTransport}
          />
        </>
      )}
      {office.team.children.length > 0 ? (
        <>
          <h2>The SSW {office.addressLocality} Team</h2>
          <TinaMarkdown components={componentRenderer} content={office.team} />
        </>
      ) : (
        <></>
      )}
      {office.photos.children.length > 0 && (
        <>
          <h2>SSW {office.addressLocality} Photos</h2>
          <TinaMarkdown
            components={componentRenderer}
            content={office.photos}
          />
        </>
      )}
      {office._body.children.length > 0 && (
        <>
          <hr />
          <TinaMarkdown components={componentRenderer} content={office._body} />
        </>
      )}
    </div>
  );
};

const SidePanel = ({ office, testimonial }) => {
  return (
    <div className="prose max-w-full">
      <ContactPanel
        phone={office.phone}
        streetAddress={office.streetAddress}
        suburb={office.suburb}
        addressLocality={office.addressLocality}
        addressRegion={office.addressRegion}
        postalCode={office.postalCode}
        addressCountry={office.addressCountry}
        sideImg={office.sideImg}
        sidebarSecondaryPlace={office.sidebarSecondaryPlace}
      />

      <MicrosoftPanel />
      <TestimonialPanel testimonial={testimonial} />
    </div>
  );
};

export const getStaticProps = async ({ params }) => {
  const tinaProps = await client.queries.officeContentQuery({
    relativePath: `${params.filename}.mdx`,
  });

  const testimonialResult = await client.queries.allTestimonialsQuery();
  const testimonials =
    testimonialResult.data.testimonialsConnection.Testimonials;
  const testimonial =
    testimonials[Math.floor(Math.random() * testimonials.length)].Testimonial;

  return {
    props: {
      data: tinaProps.data,
      query: tinaProps.query,
      variables: tinaProps.variables,
      testimonial: testimonial,
    },
  };
};

export const getStaticPaths = async () => {
  let PageListData = await client.queries.officesConnection();
  const allPagesListData = PageListData;

  while (PageListData.data.officesConnection.pageInfo.hasNextPage) {
    const lastCursor = PageListData.data.officesConnection.pageInfo.endCursor;
    PageListData = await client.queries.officesConnection({
      after: lastCursor,
    });

    allPagesListData.data.officesConnection.edges.push(
      ...PageListData.data.officesConnection.edges
    );
  }
  return {
    paths: allPagesListData.data.officesConnection.edges.map((page) => ({
      params: { filename: page.node._sys.filename },
    })),
    fallback: false,
  };
};
