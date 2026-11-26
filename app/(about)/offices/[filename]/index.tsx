"use client";

import { componentRenderer } from "@/components/blocks/mdxComponentRenderer";
import RippleButton from "@/components/button/rippleButtonV2";
import { HomeThemeShell } from "@/components/layout/homeTheme";
import { CustomLink } from "@/components/customLink";
import ContactPanel from "@/components/offices/contactPanel";
import MicrosoftPanel from "@/components/offices/microsoftPanel";
import TestimonialPanel from "@/components/offices/testimonialPanel";
import { Container } from "@/components/util/container";
import { removeExtension } from "@/services/client/utils.service";
import { Breadcrumbs } from "app/components/breadcrumb";
import Image from "next/image";
import { FiMapPin, FiPhone } from "react-icons/fi";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export default function OfficePage({ props, tinaProps }) {
  const { data } = tinaProps;

  const office = data.offices;
  const openingHours = [office.days, office.hours].filter(Boolean).join(", ");
  return (
    <HomeThemeShell className="min-h-screen">
      <Container size="custom" className="pb-16 pt-4">
        {office.seo && (
          <Breadcrumbs
            path={removeExtension(props.variables.relativePath)}
            title={office.seo.title}
          />
        )}
        <header className="py-8 sm:py-12">
          <p className="m-0 text-xs font-semibold uppercase tracking-widest text-brand dark:text-muted-foreground">
            Our offices · {office.addressCountry}
          </p>
          <h1
            className="m-0 mt-3 p-0 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl"
            data-tina-field={tinaField(office, "name")}
          >
            {office.name}
          </h1>
          {office.streetAddress && (
            <p className="mb-0 mt-3 text-muted-foreground">
              {[office.streetAddress, office.suburb, office.addressRegion]
                .filter(Boolean)
                .join(", ")}
            </p>
          )}
          {openingHours && (
            <p className="mb-0 mt-1 text-muted-foreground">
              Opening hours: {openingHours}
            </p>
          )}
          <div className="mt-5 flex flex-wrap gap-3">
            <RippleButton
              variant="primary"
              href="#Directions"
              className="inline-flex"
            >
              <FiMapPin aria-hidden className="size-4" />
              Get directions
            </RippleButton>
            {office.phone && (
              <RippleButton
                variant="secondary"
                href={`tel:${office.phone.replace(/[^+\d]/g, "")}`}
                className="inline-flex border-stroke-weak text-foreground hover:border-brand hover:bg-card-hover hover:text-foreground"
              >
                <FiPhone aria-hidden className="size-4" />
                Call our office
              </RippleButton>
            )}
          </div>
        </header>
        {office.coverImg && (
          <div className="overflow-hidden rounded-card border-0.75 border-stroke-weak">
            <Image
              data-tina-field={tinaField(office, "coverImg")}
              width={1476}
              height={542}
              src={office.coverImg}
              alt={`View of ${office.addressLocality}`}
              priority
              className="h-auto w-full"
            />
          </div>
        )}
        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-8">
            <OfficeLayout office={office} />
          </div>
          <aside className="min-w-0 lg:col-span-4">
            <SidePanel office={office} />
          </aside>
        </div>
      </Container>
    </HomeThemeShell>
  );
}

const OfficeLayout = ({ office }) => {
  return (
    <div className="prose max-w-none dark:prose-invert prose-headings:text-foreground prose-h2:mt-12 prose-h2:scroll-mt-28 prose-h2:first:mt-0 prose-p:text-muted-foreground prose-a:text-foreground prose-strong:text-foreground prose-li:text-muted-foreground prose-img:rounded-control">
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
      {office.parking?.children?.length > 0 && (
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
      {office.publicTransport?.children?.length > 0 && (
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
      {office.team?.children?.length > 0 ? (
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
      {office.photos?.children?.length > 0 && (
        <>
          <h2>SSW {office.addressLocality} Photos</h2>
          <TinaMarkdown
            components={componentRenderer}
            content={office.photos}
          />
        </>
      )}
      {office._body?.children?.length > 0 && (
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
    <div className="space-y-6">
      <div className="prose max-w-none rounded-card border-0.75 border-stroke-weak bg-card p-6 dark:prose-invert prose-headings:text-foreground prose-h3:first:mt-0 prose-p:text-muted-foreground prose-a:text-foreground prose-strong:text-foreground prose-img:rounded-control">
        <ContactPanel office={office} />
      </div>
      <div className="prose max-w-none rounded-card border-0.75 border-stroke-weak bg-card p-6 dark:prose-invert prose-headings:text-foreground prose-h3:first:mt-0 prose-p:text-muted-foreground prose-strong:text-foreground">
        <MicrosoftPanel themed />
      </div>
      <div className="prose max-w-none rounded-card border-0.75 border-stroke-weak bg-card p-6 dark:prose-invert prose-headings:text-foreground prose-h3:first:mt-0 prose-p:text-muted-foreground prose-strong:text-foreground">
        <TestimonialPanel themed />
      </div>
    </div>
  );
};
