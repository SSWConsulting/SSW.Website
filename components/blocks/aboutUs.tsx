import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Template } from "tinacms";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import classNames from "classnames";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleDown,
  faArrowAltCircleRight,
} from "@fortawesome/free-solid-svg-icons";

import { Container } from "../util/container";
import { Section } from "../util/section";
import layoutData from "../../content/global/index.json";

dayjs.extend(timezone);
dayjs.extend(utc);

const DAY_KEYS = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

const WORKING_TIME = {
  Open: 9,
  Close: 18,
};

const States = {
  QLD: {
    timeZone: "Australia/Queensland",
    mapClass: "bg-[url('/images/map/map-qld.png')]",
  },
  NSW: {
    timeZone: "Australia/NSW",
    mapClass: "bg-[url('/images/map/map-nsw.png')]",
  },
  VIC: {
    timeZone: "Australia/Victoria",
    mapClass: "bg-[url('/images/map/map-vic.png')]",
  },
};

export const AboutUs = ({ data }) => {
  return (
    <Section color={data.backgroundColor}>
      <Container>
        <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-3">
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

      {videoClicked ? (
        <iframe
          src={layoutData.aboutUs.video.url}
          width="100%"
          allowFullScreen
        ></iframe>
      ) : (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={layoutData.aboutUs.video.thumbnailUrl}
            alt="SSW TV"
            onClick={() => setVideoClicked(true)} />
        </>
      )}
    </div>
  );
};

const ContactUsAndMap = () => {
  const [office, setOffice] = useState(null);
  const [stateBeingHovered, setStateBeingHovered] = useState(null);
  return (
    <>
      <div>
        <h2>Contact Us</h2>
        <div className="flex flex-col justify-center">
          {layoutData.offices.map((o, i) => (
            <AccordionItem
              key={i}
              office={o}
              selectedOffice={office}
              setSelectedOffice={setOffice}
              setStateBeingHovered={setStateBeingHovered}
            >
              <OfficeInfo office={o} />
            </AccordionItem>
          ))}
        </div>
      </div>

      {/* TODO: update state images to show state name */}
      {/* TODO: update state hover images to show state name with a red background */}
      {/* eslint-disable-next-line tailwindcss/no-arbitrary-value*/}
      <div className="relative hidden bg-[url('/images/map/map-bg.png')] bg-[length:100%_auto] bg-no-repeat md:block">
        <Image
          className={classNames(
            "bg-no-repeat bg-[length:100%_auto]",
            States[stateBeingHovered || office?.addressRegion]?.mapClass
          )}
          src="/images/placeholder.png"
          alt="Placeholder"
          height={402}
          width={550}
        />
      </div>
    </>
  );
};

const AccordionItem = ({
  office,
  selectedOffice,
  setSelectedOffice,
  setStateBeingHovered,
  children,
}) => {
  const currentlySelected =
    office.addressLocality === selectedOffice?.addressLocality;
  const handleSetIndex = () => {
    if (office.addressLocality === selectedOffice?.addressLocality) {
      setSelectedOffice(null);
    } else if (!currentlySelected) {
      setSelectedOffice(office);
    }
  };

  const selectedClass = "bg-sswRed";
  const unselectedClass = "bg-gray-400 hover:bg-gray-600";

  return (
    <>
      <div
        className={classNames(
          "flex group cursor-pointer justify-between items-center p-2 mb-2",
          currentlySelected ? selectedClass : unselectedClass
        )}
        onMouseEnter={() => setStateBeingHovered(office.addressRegion)}
        onMouseLeave={() => setStateBeingHovered(null)}
        onClick={() => handleSetIndex()}
      >
        <div className="group flex cursor-pointer pl-2">
          <div className="uppercase text-white">{office.addressLocality}</div>
        </div>
        <div className="flex items-center justify-center text-white">
          <FontAwesomeIcon icon={currentlySelected ? faArrowAltCircleDown : faArrowAltCircleRight} />
        </div>
      </div>
      {currentlySelected && children}
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
      <p className="py-2">
        Phone: <span className="text-sswRed">{office.phone}</span>
      </p>
      <p className="pb-2">
        Hours: <span className="text-sswRed">{office.hours}</span>{" "}
        <OpenStatus state={office.addressRegion} />
        <br />
        <span className="text-sswRed">{office.days}</span>
      </p>
    </div>
  );
};

const OpenStatus = ({ state }) => {
  const stateInfo = States[state];
  const now = dayjs().tz(stateInfo?.timeZone);
  const isWeekend = [DAY_KEYS.Saturday, DAY_KEYS.Sunday].some(
    (x) => x === now.day()
  );
  const currentHour = now.hour();

  let status, statusClass;
  if (
    isWeekend ||
    currentHour < WORKING_TIME.Open ||
    WORKING_TIME.Close < currentHour
  ) {
    statusClass = "bg-sswRed";
    status = "Closed";
  } else {
    statusClass = "bg-green-400";
    status = "Open";
  }

  return (
    <span
      className={classNames(
        statusClass,
        "ml-2 p-1 font-bold text-xxs text-white uppercase"
      )}
    >
      {status}
    </span>
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
        { label: "Red", value: "red" },
        { label: "Black", value: "black" },
      ],
    },
  ],
};
