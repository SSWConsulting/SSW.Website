"use client";
import { BuiltOnAzure } from "@/components/blocks/builtOnAzure";
import { Flag } from "@/components/blocks/flag";
import { CustomLink } from "@/components/customLink";
import MicrosoftPanel from "@/components/offices/microsoftPanel";
import TestimonialPanel from "@/components/offices/testimonialPanel";
import { Countries } from "@/components/util/constants/country";
import { Container } from "@/components/util/container";
import Image from "next/image";
import { Breadcrumbs } from "../components/breadcrumb";

export default function OfficesPage({ tinaProps }) {
  const { data } = tinaProps;
  const offices = data.officeIndex.officesIndex?.map((office) => office.office);

  return (
    <>
      {offices && (
        <>
          <Container className="flex-1 pt-2">
            <Breadcrumbs path={"/offices"} title={"Offices"} />

            <div className="md:flex">
              <div className="grow">
                <h1 className="pt-0">Our Offices</h1>
                {offices.map((office) => (
                  <div key={office.addressLocality} className="mb-10 block">
                    <span>
                      <h2 className="mt-0 text-sswRed">
                        {`${office.addressLocality} | ${office.addressCountry}`}{" "}
                        <Flag country={office.addressCountry as Countries} />
                      </h2>
                    </span>
                    {office.thumbnail ? (
                      <Image
                        className="float-left mr-4 pb-3"
                        src={office.thumbnail}
                        width={115}
                        height={115}
                        alt="Office Thumbnail"
                      />
                    ) : (
                      <></>
                    )}
                    <p className="block max-sm:clear-left">
                      {office.streetAddress}
                      <br />
                      {office.suburb}, {office.addressRegion}{" "}
                      {office.postalCode}
                    </p>
                    <p className="block max-sm:clear-left">
                      <strong>Phone: {office.phone}</strong>
                    </p>
                    <p className="block max-sm:clear-left">
                      <CustomLink
                        href={
                          office.localWebsiteLink?.url ||
                          `/offices/${office.addressLocality.toLowerCase()}`
                        }
                      >
                        Learn more about our {office.addressLocality} office
                      </CustomLink>
                    </p>
                    <p className="block max-sm:clear-left">
                      <CustomLink
                        href={`${`/offices/${office.addressLocality.toLowerCase()}`}#Directions`}
                      >
                        Directions to SSW {office.addressLocality}
                      </CustomLink>
                    </p>
                  </div>
                ))}
                <hr className="my-3" />
                <div className="border-2 bg-gray-100 px-4 py-2">
                  <p>
                    Our staff are ready to work remotely for any country
                    globally. We have worked for clients from the
                    <strong> USA, Canada, the UK</strong>, New Zealand, and even
                    European countries, such as <strong>France, Germany</strong>
                    , and as far north as <strong>Sweden</strong>.
                  </p>
                </div>
                <br />
                <p>
                  {"If you require any further information, don't hesitate to "}
                  <CustomLink href="mailto:info@ssw.com.au">
                    contact us.
                  </CustomLink>
                </p>
              </div>
              <div className="md:max-w-sm md:pl-6">
                <div className="prose max-w-full">
                  <h3>SSW Offices</h3>
                  <ul>
                    {offices.map((office) => (
                      <li key={office.addressLocality}>
                        <CustomLink
                          href={`${`/offices/${office.addressLocality.toLowerCase()}`}#Directions`}
                        >
                          {office.addressLocality}
                        </CustomLink>
                      </li>
                    ))}
                  </ul>
                  <div className="hidden sm:block">
                    <MicrosoftPanel />
                    <TestimonialPanel />
                  </div>
                </div>
              </div>
            </div>
          </Container>
          <BuiltOnAzure data={tinaProps.azureBanner} />
          {/* <PreFooter /> */}
        </>
      )}
    </>
  );
}
