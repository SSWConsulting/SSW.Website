"use client";

import { Breadcrumbs } from "@/app/components/breadcrumb";
import { Flag } from "@/components/blocks/flag";
import { CustomLink } from "@/components/customLink";
import { HomeThemeShell } from "@/components/layout/homeTheme";
import {
  sidebarHeadingClass,
  sidebarPageContainer,
} from "@/components/layout/stickySidebar";
import type { Countries } from "@/components/util/constants/country";
import { cn } from "@/lib/utils";
import type { OfficeIndexQueryQuery } from "@/tina/types";
import { ArrowRight, Globe2, MapPin, Navigation, Phone } from "lucide-react";
import Image from "next/image";
import { tinaField } from "tinacms/dist/react";

type OfficeIndex = OfficeIndexQueryQuery["officeIndex"];
type Office = NonNullable<
  NonNullable<OfficeIndex["officesIndex"]>[number]
>["office"];

function OfficeCard({ office }: { office: Office }) {
  const { addressLocality: city, addressCountry: country } = office;
  const officePath = `/offices/${city.toLowerCase()}`;

  return (
    <article className="flex h-full flex-col rounded-card border-0.75 border-hairline bg-card">
      {office.thumbnail && (
        <div
          className="relative aspect-video overflow-hidden rounded-t-card"
          data-tina-field={tinaField(office, "thumbnail")}
        >
          <Image
            className="object-cover"
            src={office.thumbnail}
            alt=""
            fill
            sizes="(min-width: 1536px) 480px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-5">
          <p
            className="m-0 mb-1.5 flex items-center gap-2 p-0 text-sm font-medium text-muted-foreground"
            data-tina-field={tinaField(office, "addressCountry")}
          >
            <span aria-hidden="true">
              <Flag
                country={country as Countries}
                width={20}
                height={20}
                className="h-auto"
              />
            </span>
            {country}
          </p>
          <h2
            className="m-0 p-0 text-2xl font-semibold leading-tight text-foreground"
            data-tina-field={tinaField(office, "addressLocality")}
          >
            {city}
          </h2>
        </div>

        <address className="flex flex-1 flex-col gap-3 text-sm not-italic leading-relaxed text-muted-foreground">
          <div className="flex items-start gap-3">
            <MapPin
              aria-hidden="true"
              className="mt-0.5 size-4 shrink-0 text-brand"
            />
            <p className="m-0 p-0">
              <span
                className="block"
                data-tina-field={tinaField(office, "streetAddress")}
              >
                {office.streetAddress}
              </span>
              <span>
                {office.suburb}, {office.addressRegion} {office.postalCode}
              </span>
            </p>
          </div>
          <div className="mt-auto flex items-center gap-3">
            <Phone aria-hidden="true" className="size-4 shrink-0 text-brand" />
            <a
              className="unstyled rounded-sm text-foreground no-underline hover:text-brand hover:underline focus-visible:outline-brand"
              data-tina-field={tinaField(office, "phone")}
              href={`tel:${office.phone.replace(/[^\d+]/g, "")}`}
            >
              {office.phone}
            </a>
          </div>
        </address>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-4 border-t-0.75 border-hairline px-5 py-2 sm:px-6">
        <CustomLink
          className="unstyled inline-flex min-h-11 items-center gap-2 rounded-sm text-sm font-semibold text-brand no-underline hover:underline focus-visible:outline-brand"
          href={office.localWebsiteLink?.url || officePath}
          aria-label={`Office details for ${city}`}
        >
          Office details
          <ArrowRight aria-hidden="true" className="size-4" />
        </CustomLink>
        <CustomLink
          className="unstyled inline-flex min-h-11 items-center gap-2 rounded-sm text-sm font-medium text-muted-foreground no-underline hover:text-foreground hover:underline focus-visible:outline-brand"
          href={`${officePath}#Directions`}
          aria-label={`Directions to SSW ${city}`}
        >
          <Navigation aria-hidden="true" className="size-4" />
          Directions
        </CustomLink>
      </div>
    </article>
  );
}

export default function OfficesPage({
  tinaProps,
}: {
  tinaProps: { data: object };
}) {
  const { officeIndex } = tinaProps.data as OfficeIndexQueryQuery;
  const offices = (officeIndex.officesIndex ?? [])
    .map((entry) => entry?.office)
    .filter((office): office is Office => Boolean(office?.addressLocality));

  return (
    <HomeThemeShell className="min-h-screen bg-sunken-glow">
      <div className={cn("section", sidebarPageContainer)}>
        <div className="min-h-12">
          <Breadcrumbs path="/offices" title="Offices" />
        </div>

        <header className="mb-8">
          <h1
            id="offices-title"
            className={cn(
              sidebarHeadingClass,
              "m-0 p-0 text-foreground max-md:mt-2"
            )}
          >
            Our Offices
          </h1>
          <p className="m-0 mt-1 p-0 text-sm text-muted-foreground">
            Find the address, phone number and directions for your nearest SSW
            office.
          </p>
        </header>

        <ul
          aria-labelledby="offices-title"
          className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
        >
          {offices.map((office) => (
            <li key={office.addressLocality}>
              <OfficeCard office={office} />
            </li>
          ))}
        </ul>

        <div className="mt-8 grid gap-4 lg:mt-10 lg:grid-cols-3 lg:gap-6">
          <section className="rounded-card border-0.75 border-hairline bg-card p-5 sm:p-6 lg:col-span-2">
            <Globe2 aria-hidden="true" className="mb-3 size-6 text-brand" />
            <h2 className="m-0 p-0 text-xl font-semibold text-foreground">
              Work with us from anywhere
            </h2>
            <p className="m-0 mt-2 max-w-2xl p-0 text-sm leading-relaxed text-muted-foreground">
              Our teams work remotely with clients around the world, including
              in the USA, Canada, the UK, New Zealand, France, Germany and
              Sweden.
            </p>
            <a
              href="mailto:info@ssw.com.au"
              className="unstyled mt-4 inline-flex min-h-11 items-center gap-2 rounded-lg bg-sswRed px-4 py-2 text-sm font-semibold text-white no-underline hover:bg-sswDarkRed focus-visible:outline-brand"
            >
              Contact us
              <ArrowRight aria-hidden="true" className="size-4" />
            </a>
          </section>
          <section className="rounded-card border-0.75 border-hairline bg-card p-5 sm:p-6">
            <h2 className="m-0 p-0 text-xl font-semibold text-foreground">
              Microsoft Cloud Partner
            </h2>
            <p className="m-0 mt-2 p-0 text-sm leading-relaxed text-muted-foreground">
              SSW builds and deploys solutions using Microsoft technologies.
            </p>
            <div className="mt-4 w-fit rounded-lg bg-white p-2">
              <Image
                className="m-0 h-auto"
                src="/images/logos/Microsoft-Solutions-Partner.png"
                alt="Microsoft Solutions Partner"
                width={177}
                height={50}
              />
            </div>
          </section>
        </div>
      </div>
    </HomeThemeShell>
  );
}
