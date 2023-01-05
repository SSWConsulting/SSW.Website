import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image"
import type { Template } from "tinacms";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import classNames from "classNames"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleDown, faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';

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
          <ContactUsAndMap />
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
            <img src={layoutData.aboutUs.video.thumbnailUrl} alt="SSW Tv" />
            <div></div>
          </figure>
        )}
      </div>
    </div>
  );
};

const ContactUsAndMap = () => {
  const [office, setOffice] = useState(null);
  return (
    <div>
      <h2>Contact Us</h2>
        <div className="flex flex-col justify-center">
          {layoutData.offices.map((o, i) => (
            <AccordionItem
              key={i}
              office={o}
              selectedOffice={office}
              setSelectedOffice={setOffice}>
              <OfficeInfo office={o} />
            </AccordionItem>
          ))}
        </div>
    </div>
  );
};

const AccordionItem = ({ office, selectedOffice, setSelectedOffice, children }) => {
  const currentlySelected = office.addressLocality === selectedOffice?.addressLocality
  const handleSetIndex = () => {
    if (office.addressLocality === selectedOffice?.addressLocality) {
      setSelectedOffice(null);
    } else if (!currentlySelected) {
      setSelectedOffice(office);
    }
  };

  const selectedClass = "bg-sswRed"
  const unselectedClass = "bg-gray-400"

  return (
    <>
      <div
        onClick={() => handleSetIndex()}
        className={classNames(
          'flex group cursor-pointer justify-between items-center p-2 mb-2',
          currentlySelected ? selectedClass : unselectedClass
        )}
      >
        <div className="flex group cursor-pointer pl-2">
          <div className="text-white uppercase">
            {office.addressLocality}
          </div>
        </div>
        <div className="flex items-center justify-center">
          {!currentlySelected ? (
            <FontAwesomeIcon icon={faArrowAltCircleRight} color="white" />
          ) : (
            <FontAwesomeIcon icon={faArrowAltCircleDown} color="white" />
          )}
        </div>
      </div>

      {currentlySelected && (
        <div>
          {children}
        </div>
      )}
    </>
  );
};

const OfficeInfo = ({ office }) => {
  return (
    <div className="p-4 text-sm text-black">
      <p className="pb-2">
        <Link href={office.url}>{office.name}</Link>
      </p>
      <p itemProp="address" itemType="http://schema.org/PostalAddress">
        <span itemProp="streetAddress">{office.streetAddress}</span>
        <br />
        {office.suburb && <span>{office.suburb}, </span>}
        <span itemProp="addressLocality">{office.addressLocality}</span>,{" "}
        <span itemProp="addressRegion">{office.addressRegion}</span>{" "}
        <span itemProp="postalCode">{office.postalCode}</span>,{" "}
        <span itemProp="addressCountry">{office.addressCountry}</span>
      </p>
      <p class="py-2">
        Phone: <span class="text-sswRed">{office.phone}</span>
      </p>
      <p className="pb-2">
        Hours:{" "}
        <span class="text-sswRed">{office.hours}</span>
        <br />
        <span class="text-sswRed">{office.days}</span>
      </p>
    </div>
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
