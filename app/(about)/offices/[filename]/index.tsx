"use client";

import { componentRenderer } from "@/components/blocks/mdxComponentRenderer";
import RippleButton from "@/components/button/rippleButtonV2";
import { HomeThemeShell } from "@/components/layout/homeTheme";
import { CustomLink } from "@/components/customLink";
import ContactPanel from "@/components/offices/contactPanel";
import MicrosoftPanel from "@/components/offices/microsoftPanel";
import TestimonialPanel from "@/components/offices/testimonialPanel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
        <header className="grid items-center gap-6 pt-8 sm:pt-12 lg:grid-cols-12 lg:gap-10">
          <div className="min-w-0 lg:col-span-5 lg:only:col-span-12">
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
          </div>
          {office.coverImg && (
            <div className="overflow-hidden rounded-card border-0.75 border-stroke-weak lg:col-span-7">
              <Image
                data-tina-field={tinaField(office, "coverImg")}
                width={1476}
                height={542}
                src={office.coverImg}
                alt={`View of ${office.addressLocality}`}
                sizes="(min-width: 1024px) 58vw, 100vw"
                priority
                className="h-auto w-full"
              />
            </div>
          )}
        </header>
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
  const arrivalSections = [
    { field: "parking", label: "Parking" },
    { field: "publicTransport", label: "Public transport" },
  ].filter(({ field }) => office[field]?.children?.length);
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
      <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <strong>
          {`${office.streetAddress}, ${office.suburb}, ${office.addressRegion} ${office.postalCode}, ${office.addressCountry}`}
        </strong>
        {office.directionsUrl && (
          <CustomLink
            href={office.directionsUrl}
            data-tina-field={tinaField(office, "directionsUrl")}
          >
            Open in Google Maps
          </CustomLink>
        )}
      </p>
      <div data-tina-field={tinaField(office, "directions")}>
        <TinaMarkdown
          components={componentRenderer}
          content={office.directions}
        />
      </div>
      {arrivalSections.length > 0 && (
        <Accordion type="multiple" className="my-6 border-b border-stroke-weak">
          {arrivalSections.map(({ field, label }) => (
            <AccordionItem
              key={field}
              value={field}
              className="border-t border-stroke-weak"
            >
              <AccordionTrigger
                indicator="chevron"
                className="text-foreground hover:text-foreground data-[state=open]:text-foreground"
              >
                {label}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <div data-tina-field={tinaField(office, field)}>
                  <TinaMarkdown
                    components={componentRenderer}
                    content={office[field]}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
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
      <TestimonialPanel themed />
    </div>
  );
};
