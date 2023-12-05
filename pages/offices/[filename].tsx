import Image from "next/image";

import { tinaField, useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { client } from "../../.tina/__generated__/client";

import { InferGetStaticPropsType } from "next";
import { BuiltOnAzure } from "../../components/blocks";
import { Breadcrumbs } from "../../components/blocks/breadcrumbs";
import { componentRenderer } from "../../components/blocks/mdxComponentRenderer";
import { CustomLink } from "../../components/customLink";
import { Layout } from "../../components/layout";
import ContactPanel from "../../components/offices/contactPanel";
import MicrosoftPanel from "../../components/offices/microsoftPanel";
import TestimonialPanel from "../../components/offices/testimonialPanel";
import { Container } from "../../components/util/container";
import { Section } from "../../components/util/section";
import { SEO } from "../../components/util/seo";
import { removeExtension } from "../../services/client/utils.service";

export default function OfficePage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { data } = useTina({
    data: props.data,
    query: props.query,
    variables: props.variables,
  });

  return (
    <>
      <SEO seo={data.offices.seo} />
      <Layout menu={data.megamenu}>
        {data.offices.coverImg ? (
          <div className="mx-auto max-w-9xl px-6 sm:px-8">
            <div className="h-auto w-auto">
              <Image
                data-tina-field={tinaField(data.offices, "coverImg")}
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
      <div data-tina-field={tinaField(office, "aboutUs")}>
        <TinaMarkdown components={componentRenderer} content={office.aboutUs} />
      </div>
      {office.localWebsiteLink?.title && (
        <CustomLink
          href={office.localWebsiteLink.url ?? ""}
          data-tina-field={tinaField(office, "localWebsiteLink")}
        >
          {office.localWebsiteLink.title}
        </CustomLink>
      )}
      {office.map ? (
        <>
          <h2>SSW {office.addressLocality} Map</h2>
          <Image
            data-tina-field={tinaField(office, "map")}
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
      <h4>
        <CustomLink
          data-tina-field={tinaField(office, "directionsUrl")}
          href={office.directionsUrl}
        >
          <Image
            src="/images/icons/map-pin.svg"
            alt="Map pin icon"
            height={16}
            width={16}
            className="my-0 mr-1.5 inline-block"
          />
          {`${office.streetAddress}, ${office.suburb}, ${office.addressRegion} ${office.postalCode}, ${office.addressCountry}`}
        </CustomLink>
      </h4>
      <div data-tina-field={tinaField(office, "directions")}>
        <TinaMarkdown
          components={componentRenderer}
          content={office.directions}
        />
      </div>
      {office.parking.children.length > 0 && (
        <>
          <h2>Parking</h2>
          <div data-tina-field={tinaField(office, "parking")}>
            <TinaMarkdown
              components={componentRenderer}
              content={office.parking}
            />
          </div>
        </>
      )}
      {office.publicTransport.children.length > 0 && (
        <>
          <h2>Public Transport</h2>
          <div data-tina-field={tinaField(office, "publicTransport")}>
            <TinaMarkdown
              components={componentRenderer}
              content={office.publicTransport}
            />
          </div>
        </>
      )}
      {office.team.children.length > 0 ? (
        <>
          <h2>The SSW {office.addressLocality} Team</h2>
          <div data-tina-field={tinaField(office, "team")}>
            <TinaMarkdown
              components={componentRenderer}
              content={office.team}
            />
          </div>
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
          <div data-tina-field={tinaField(office, "_body")}>
            <TinaMarkdown
              components={componentRenderer}
              content={office._body}
            />
          </div>
        </>
      )}
    </div>
  );
};

const SidePanel = ({ office, testimonial }) => {
  return (
    <div className="prose max-w-full">
      <ContactPanel office={office} />
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

  if (tinaProps.data.offices.seo && !tinaProps.data.offices.seo.canonical) {
    tinaProps.data.offices.seo.canonical = `${tinaProps.data.global.header.url}offices/${params.filename}`;
  }

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
