import React, { useState } from "react";
import Link from "next/link";
import type { Template } from "tinacms";
import { Disclosure } from "@headlessui/react";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { Container } from "../util/container";
import { Section } from "../util/section";
import layoutData from "../../content/global/index.json";

dayjs.extend(timezone);
dayjs.extend(utc);

export const AboutUs = ({ data }) => {
  return (
    <Section color={data.backgroundColor}>
      <Container>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mt-5">
          <TV />
          <ContactUs />
          <Map />
        </div>
      </Container>
    </Section>
  );
};

const TV = () => {
  const [videoClicked, setVideoClicked] = useState(false);
  return (
    <div>
      <h2>tv.ssw.com</h2>

      <div>
        {videoClicked ? (
          <iframe
            width="100%"
            src={layoutData.aboutUs.video.url}
            allowFullScreen
          ></iframe>
        ) : (
          <figure onClick={() => setVideoClicked(true)}>
            <img
              src={layoutData.aboutUs.video.thumbnailUrl}
              alt="SSW Tv"
            />
            <div></div>
          </figure>
        )}
      </div>
    </div>
  );
};

const ContactUs = () => {
  return (
    <div>
      <h2>Contact Us</h2>
      <div className="w-full">
        <div className="mx-auto w-full max-w-md rounded-2xl bg-white">
          {layoutData.aboutUs.offices.map((office, i) => (
            <OfficeInfo office={office} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

const OfficeInfo = ({ office, index }) => {
  return (
    <Disclosure key={index}>
      <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">{office.addressLocality}</Disclosure.Button>
      <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
        <p>
          <Link href={office.url}>{office.name}</Link>
        </p>
        <p itemProp="address" itemType="http://schema.org/PostalAddress">
          <span itemProp="streetAddress">{office.streetAddress}</span>
          <br />
          {office.suburb && <span>{office.suburb}, </span>}
          <span itemProp="addressLocality">{office.addressLocality}</span>,{" "}
          <span itemProp="addressRegion">{office.addressRegion}</span>
          <span itemProp="postalCode">{office.postalCode}</span>,{" "}
          <span itemProp="addressCountry">{office.addressCountry}</span>
        </p>
        <p>
          Phone: <strong>{office.phone}</strong>
        </p>
        <p>
          Hours:{" "}
          <strong>
            {office.hours}
            <br />
            {office.days}
          </strong>
        </p>
      </Disclosure.Panel>
    </Disclosure>
  );
};

const Map = () => {
  return (
    <div className="hidden md:block">
      <h2>Map</h2>
    </div>
  );
};

export const aboutUsBlockSchema: Template = {
  name: "AboutUs",
  label: "About Us",
  fields: [
    {
      type: "string",
      label: "Background Color",
      name: "backgroundColor",
      options: [
        { label: "Default", value: "default" },
        { label: "Light Gray", value: "lightgray" },
        { label: "Primary", value: "primary" },
      ],
    },
  ],
};
