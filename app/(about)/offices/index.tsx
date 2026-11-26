"use client";

import { Breadcrumbs } from "@/app/components/breadcrumb";
import { Flag } from "@/components/blocks/flag";
import { ArrowCircle } from "@/components/blocks/v3/shared/arrowCircle";
import RippleButton from "@/components/button/rippleButtonV2";
import { CustomLink } from "@/components/customLink";
import { HomeThemeShell } from "@/components/layout/homeTheme";
import { sidebarPageContainer } from "@/components/layout/stickySidebar";
import { cardShell, destinationLabel } from "@/components/products/shared";
import type { Countries } from "@/components/util/constants/country";
import { cn } from "@/lib/utils";
import type { OfficeIndexQueryQuery } from "@/tina/types";
import { ArrowRight, ExternalLink, Globe2, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { tinaField, useEditState } from "tinacms/dist/react";

type OfficeIndex = OfficeIndexQueryQuery["officeIndex"];
type Office = NonNullable<
  NonNullable<OfficeIndex["officesIndex"]>[number]
>["office"];

function OfficeCard({
  office,
  isEditing,
}: {
  office: Office;
  isEditing: boolean;
}) {
  const { addressLocality: city, addressCountry: country } = office;
  const officePath = `/offices/${city.toLowerCase()}`;
  const regionalUrl = office.localWebsiteLink?.url;
  const domain = destinationLabel(regionalUrl).split("/")[0];

  const countryTag = (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-1.5 text-xs font-semibold",
        office.thumbnail
          ? "absolute left-3 top-3 rounded-full bg-black/80 px-2.5 py-1 text-white"
          : "mb-2 text-muted-foreground"
      )}
      data-tina-field={tinaField(office, "addressCountry")}
    >
      <span aria-hidden="true">
        <Flag
          country={country as Countries}
          width={16}
          height={16}
          className="h-auto"
        />
      </span>
      {country}
    </span>
  );

  return (
    <article
      className={cn(
        cardShell,
        "border-stroke-weak bg-gray-50 hover:border-brand hover:bg-white",
        "dark:border-hairline dark:bg-card dark:hover:border-brand dark:hover:bg-card-hover",
        "active:bg-gray-100 dark:active:bg-card"
      )}
    >
      {office.thumbnail && (
        <div
          className="relative aspect-office-banner overflow-hidden rounded-t-card"
          data-tina-field={tinaField(office, "thumbnail")}
        >
          <Image
            className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105"
            src={office.thumbnail}
            alt=""
            fill
            sizes="(min-width: 1536px) 480px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
          {countryTag}
        </div>
      )}

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-3">
          {!office.thumbnail && countryTag}
          <h2
            className="m-0 p-0 text-2xl font-semibold leading-tight text-foreground"
            data-tina-field={tinaField(office, "addressLocality")}
          >
            {city}
          </h2>
        </div>

        <div className="flex flex-1 items-start gap-3">
          <address className="flex min-w-0 flex-1 flex-col gap-3 text-sm not-italic leading-relaxed text-muted-foreground">
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
                <span className="block">
                  {office.suburb}, {office.addressRegion} {office.postalCode}
                </span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Phone
                aria-hidden="true"
                className="size-4 shrink-0 text-brand"
              />
              <a
                // Keep the phone link above the stretched office details link.
                className="unstyled relative z-20 rounded-sm text-foreground no-underline hover:text-brand hover:underline focus-visible:outline-brand"
                data-tina-field={tinaField(office, "phone")}
                href={`tel:${office.phone.replace(/[^\d+]/g, "")}`}
              >
                {office.phone}
              </a>
            </div>
            {regionalUrl && domain && (
              <CustomLink
                className="unstyled relative z-20 inline-flex w-fit items-center gap-3 rounded-sm text-foreground no-underline hover:text-brand hover:underline focus-visible:outline-brand"
                href={regionalUrl}
                target="_blank"
                aria-label={`Visit ${domain} for the ${city} office (opens in a new tab)`}
              >
                <Globe2
                  aria-hidden="true"
                  className="size-4 shrink-0 text-brand"
                />
                <span className="inline-flex items-center gap-1.5">
                  {domain}
                  <ExternalLink
                    aria-hidden="true"
                    className="size-3.5 shrink-0"
                  />
                </span>
              </CustomLink>
            )}
          </address>

          <CustomLink
            className={cn(
              "unstyled flex shrink-0 self-end no-underline",
              "after:absolute after:inset-0 after:z-10 focus-visible:outline-none focus-visible:after:rounded-card focus-visible:after:ring-2 focus-visible:after:ring-inset focus-visible:after:ring-brand",
              // Tina quick edit needs clicks to reach the actual fields.
              isEditing && "after:pointer-events-none"
            )}
            href={officePath}
            aria-label={`Office details for ${city}`}
          >
            <span aria-hidden="true">
              <ArrowCircle
                className="size-9 bg-gray-200 p-2 text-gray-900 dark:bg-gray-950 dark:text-white"
                iconClassName="size-3.5"
              />
            </span>
          </CustomLink>
        </div>
      </div>
    </article>
  );
}

export default function OfficesPage({
  tinaProps,
}: {
  tinaProps: { data: object };
}) {
  const { edit } = useEditState();
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
            className="m-0 p-0 font-semibold text-foreground max-md:mt-2"
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
              <OfficeCard office={office} isEditing={edit} />
            </li>
          ))}
        </ul>

        <div className="mt-8 grid items-start gap-4 lg:mt-10 lg:grid-cols-3 lg:gap-6">
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
            <RippleButton
              variant="primary"
              href="mailto:info@ssw.com.au"
              className="mt-4 inline-flex min-h-11 px-4 py-2 text-sm font-semibold focus-visible:outline-brand"
            >
              Contact us
              <ArrowRight aria-hidden="true" className="size-4" />
            </RippleButton>
          </section>
          <section className="rounded-card border-0.75 border-hairline bg-card p-5 sm:p-6">
            <h2 className="m-0 p-0 text-xl font-semibold text-foreground">
              Microsoft Solutions Partner
            </h2>
            <p className="m-0 mt-2 p-0 text-sm leading-relaxed text-muted-foreground">
              SSW builds and deploys solutions using Microsoft technologies.
            </p>
            <div className="mt-4 flex items-center justify-center rounded-lg bg-white">
              <Image
                className="m-0 h-20 w-auto max-w-full object-contain"
                src="/images/logos/Microsoft-Solutions-Partner.png"
                alt="Microsoft Solutions Partner"
                width={925}
                height={420}
                sizes="200px"
              />
            </div>
          </section>
        </div>
      </div>
    </HomeThemeShell>
  );
}
