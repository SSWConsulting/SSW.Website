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
    location: "top-[34%] left-[90%]",
    mapClass: "bg-[url('/images/map/map-qld.png')]",
  },
  NSW: {
    timeZone: "Australia/NSW",
    location: "top-[47%] left-[90%]",
    mapClass: "bg-[url('/images/map/map-nsw.png')]",
  },
  VIC: {
    timeZone: "Australia/Victoria",
    location: "top-[53%] left-[87%]",
    mapClass: "bg-[url('/images/map/map-vic.png')]",
  },
};

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
            <img src={layoutData.aboutUs.video.thumbnailUrl} alt="SSW TV" />
            <div></div>
          </figure>
        )}
      </div>
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
                {/* Render state names over images */}
                <div className="hidden-xs">
                  <div
                    className={classNames(
                      'block absolute cursor-pointer transition duration-[2000ms] z-10',
                      States[o.addressRegion]?.location
                    )}
                    onMouseEnter={() => setStateBeingHovered(o.addressRegion)}
                    onMouseLeave={() => setStateBeingHovered(null)}
                    onClick={() => setOffice(o.addressRegion) }
                  >
                    <h6 className={
                      classNames(
                        'py-0.5 px-1.5 text-[0.7rem] text-white uppercase',
                        office?.addressRegion === o.addressRegion ? 'bg-sswRed' : 'bg-gray-900'
                      )
                    }>
                      {o.addressRegion}
                    </h6>
                  </div>
                </div>
              </AccordionItem>
          ))}
        </div>
      </div>

      <div>
        <Map state={stateBeingHovered || office?.addressRegion} />
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
  const unselectedClass = "bg-gray-400";

  return (
    <>
      <div
        onMouseEnter={() => setStateBeingHovered(office.addressRegion)}
        onMouseLeave={() => setStateBeingHovered(null)}
        onClick={() => handleSetIndex()}
        className={classNames(
          "flex group cursor-pointer justify-between items-center p-2 mb-2",
          currentlySelected ? selectedClass : unselectedClass
        )}
      >
        <div className="flex group cursor-pointer pl-2">
          <div className="text-white uppercase">{office.addressLocality}</div>
        </div>
        <div className="flex items-center justify-center">
          {!currentlySelected ? (
            <FontAwesomeIcon icon={faArrowAltCircleRight} color="white" />
          ) : (
            <FontAwesomeIcon icon={faArrowAltCircleDown} color="white" />
          )}
        </div>
      </div>

      {currentlySelected && <div>{children}</div>}
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
        Hours: <span class="text-sswRed">{office.hours}</span>{" "}
        <OpenStatus state={office.addressRegion} />
        <br />
        <span class="text-sswRed">{office.days}</span>
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

const Map = ({ state }) => {
  return (
    <div
      id="mapWrap"
      className="hidden md:block max-h-[350px] bg-no-repeat bg-[length:100%_auto] bg-[url('/images/map/map-bg.png')]"
    >
      <div id="locationMap">
        <Image
          className={classNames(
            "bg-no-repeat bg-[length:100%_auto]",
            States[state]?.mapClass
          )}
          src="/images/placeholder.png"
          alt="Placeholder"
          height={402}
          width={350}
          useMap="#map"
          id="map-img"
        />
      </div>
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
        { label: "Red", value: "red" },
        { label: "Black", value: "black" },
      ],
    },
  ],
};
