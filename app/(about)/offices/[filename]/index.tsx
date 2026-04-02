"use client";

import { BuiltOnAzure } from "@/components/blocks/builtOnAzure";
import { componentRenderer } from "@/components/blocks/mdxComponentRenderer";
import { CustomLink } from "@/components/customLink";
import ContactPanel from "@/components/offices/contactPanel";
import MicrosoftPanel from "@/components/offices/microsoftPanel";
import TestimonialPanel from "@/components/offices/testimonialPanel";
import { Container } from "@/components/util/container";
import { Section } from "@/components/util/section";
import { removeExtension } from "@/services/client/utils.service";
import { Breadcrumbs } from "app/components/breadcrumb";
import Image from "next/image";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export default function OfficePage({ props, tinaProps }) {
  const { data } = tinaProps;

  return (
    <>
      {data.offices.coverImg ? (
        <div className="mx-auto max-w-9xl px-6 sm:px-8">
          <div className="size-auto">
            <Image
              data-tina-field={tinaField(data.offices, "coverImg")}
              width={1476}
              height={542}
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
        {data.offices?.seo && (
          <Breadcrumbs
            path={removeExtension(props.variables.relativePath)}
            title={data.offices.seo.title}
          />
        )}
        <div className="mt-8 md:flex">
          <div className="grow">
            <OfficeLayout office={data.offices} />
          </div>
          <div className="md:max-w-sm md:pl-6">
            <SidePanel office={data.offices} />
          </div>
        </div>
      </Container>
      <Section>
        <BuiltOnAzure data={data.offices.azureBanner} />
      </Section>
    </>
  );
}

const OfficeLayout = ({ office }) => {
  return (
    <div className="prose max-w-full">
      {office.name && (
        <h1 className="py-0" data-tina-field={tinaField(office.name, "name")}>
          {office.name}
        </h1>
      )}
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
          href={office.directionsUrl ?? ""}
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

const SidePanel = ({ office }) => {
  return (
    <div className="prose max-w-full">
      <ContactPanel office={office} />
      <MicrosoftPanel />
      <TestimonialPanel />
    </div>
  );
};
