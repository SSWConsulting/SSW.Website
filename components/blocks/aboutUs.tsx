"use client";

import classNames from "classnames";
import dayjs from "dayjs";
import { memo, useEffect, useState } from "react";
import { BiChevronRightCircle } from "react-icons/bi";

import { tinaField } from "tinacms/dist/react";
import layoutData from "../../content/global/index.json";
import { CustomLink } from "../customLink";
import { Container } from "../util/container";
import { Section } from "../util/section";
import { VideoModal } from "../videoModal";
import { aboutUsBlock } from "./aboutUs.schema";

const DAY_KEYS = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
} as const;

const WORKING_TIME = {
  Open: 9,
  Close: 18,
} as const;

const states = {
  QLD: {
    timeZone: "Australia/Brisbane",
    path: [
      "m200.3,123.9 c -11.8,-0.7 -14.8,-0.8 -22.8,-1.3 0,-8.5 0,-21 0,-21 l -16,0 c 0,0 0,-39.3 0,-60 l 6,3.5 5.2,3.5 4.4,0 6,-9.8 3.4,-24.6 2.8,-5.7 c 1.6,-3.1 3.3,-6 3.9,-6.3 l 1,-0.6 1.8,4.3 c 1,2.4 2.2,6.6 2.6,9.3 0.4,2.8 1.2,7.1 1.7,9.8 l 1,4.8 4.8,0 3.2,5 2.8,11 c 1.5,6.1 3.3,11.7 4,12.5 0.6,0.8 3.4,2.9 6.2,4.6 l 5,3.2 5,10 3.8,1 1.2,5.2 11.2,14.8 1.2,7.1 c 0.7,3.9 1.5,8.7 1.9,10.8 l 0.6,3.7 -1.3,5.1 -4.6,-1.1 -1.3,1.6 c -1.6,2 -3.7,2 -4.4,0.1 l -0.6,-1.5 -2.4,0 c -1.3,0 -4.3,0.7 -6.7,1.5 -2.3,0.8 -5.4,1.4 -6.9,1.3 -1.4,-0.1 -12.3,-0.7 -24.1,-1.4 z",
    ],
    label: {
      x: 224,
      y: 102,
    },
  },
  NSW: {
    timeZone: "Australia/Sydney",
    path: [
      "m220.5,176.4 -2.4,-2.7 -2.4,-1.5 c -2.1,-0.3 -6.2,-1.1 -9.1,-1.8 l -5.4,-1.4 -8.2,-10.4 -2.8,-0.7 -2.8,-0.7 -1,-1.9 -1,-1.9 -3.9,0 -4,1.5 0,-30.9 c 5.8,0.4 22.5,1.4 25.3,1.6 l 23.5,1.4 4.8,-1.2 c 4.6,-1.1 5.7,-2.1 8.3,-2 0,0 0.9,2.3 1.9,2.8 1.1,0.5 2.5,0.1 3.7,-0.3 1.1,-0.4 2,-2 3.1,-1.8 l 2.8,0.5 -1.3,5.1 c -0.7,2.7 -2.1,7.5 -2.9,10.9 -1.8,8.3 -3.1,11.6 -5.3,13.4 l -1.8,1.5 -4.1,12.5 c -2.2,6.9 -4.2,13.5 -4.4,14.7 l -0.3,2.2",
    ],
    label: {
      x: 218,
      y: 154,
    },
  },
  VIC: {
    timeZone: "Australia/Melbourne",
    path: [
      "m219.5,177.3 0.8,1 c 0,0.6 2.3,2.7 5,4.8 l 5,3.8 -11.4,3.4 -5.7,5.4 -6.9,-3.7 -2.8,1.4 c -1.5,0.8 -3,1.5 -3.3,1.6 -0.3,0.1 -2.3,-0.9 -4.5,-2.2 c -2.2,-1.3 -6.3,-3.1 -9,-4 l -5,-1.6 -2.3,-2 -2.1,-2.1 c 0,-9 0,-17.9 0,-26.6 l 3.9,-1.3 3.1,0 1.6,3.4 1.9,0.5 2.4,0.5 1.5,0.9 4.7,6 3.2,3.9 c 3.2,0.9 6.5,1.7 9.2,2.4 3,0.8 4.7,0.9 6.2,1 l 2.9,2.6",
    ],
    label: {
      x: 193,
      y: 188,
    },
  },
  WA: {
    timeZone: "Australia/Perth",
    path: [
      "m38.3, 168.2 c -1.9,-0.6 -3.6,-1.1 -3.8,-1.3 -0.2,-0.2 0.8,-2.5 2.25,-5.2 1.4,-2.7 2.6,-5.5 2.6,-6.2 0,-0.8 -1.8,-4.25 -4,-7.7 -2.2,-3.5 -4,-7.1 -4,-8.1 l 0,-1.8 -6.4,-10.3 -6.4,-10.3 1.8,0 -7,-14.8 0.2,-7.3 c 0.1,-4 0.1,-8.9 0.1,-10.9 l -0.1,-3.5 5.5,-6 c 3,-3.3 5.5,-6.3 5.5,-6.7 0,-0.4 0.9,-0.8 1.9,-0.8 l 1.9,0 9.8,-6.1 13.8,-2.2 4.1,-2.6 8.4,-15 -1.2,-3 3.3,-5 1.8,1.1 4,-2.5 0,-3.1 4.6,-4.3 8.5,0 3.4,3.8 c 1.9,2.1 3.4,4.3 3.4,5 l 0,1.3 2.5,-0.6 L 97.5,33.2 c 0,38.3 0,77 0,113.8 l -4.6,1.6 -4.5,2.2 -2.3,5.6 -1.6,0.5 c -0.9,0.3 -4.8,1 -8.6,1.6 l -7,1.1 -8.2,4.9 -8.2,4.9 -5.3,0 c -2.9,0 -6.9,-0.5 -8.8,-1.1 z",
    ],
  },
  SA: {
    timeZone: "Australia/Adelaide",
    path: [
      "m176,181 -6.8,-9.4 0.7,-3.7 0.7,-3.7 -5.6,-6 -2.2,0.8 0.7,-7.8 -1.1,0 c -1.1,0 -2.2,1.1 -4.6,4.5 l -1.4,2 1,-4.8 c 0.6,-2.7 0.8,-5 0.6,-5.3 -0.8,-0.8 -6.1,2.5 -7.9,4.8 -0.9,1.2 -1.9,2 -2.1,1.8 -0.2,-0.3 -1.6,-2.6 -3.1,-5.2 l -2.7,-4.7 -11.4,-2.6 -19.2,0.2 -5.8,2.6 C 102.7,146.2 99,147.2 99,147 l 0,-44 77,0 z",
    ],
  },
  NT: {
    timeZone: "Australia/Darwin",
    path: [
      "m99,33 3.9,0.4 c 2,0.2 4.4,-0.5 5.5,-1 l 1.9,-1 0,-2.5 0,-2.5 -2,0 0,-4 1.9,-1.7 c 1,-0.9 1.7,-2 1.5,-2.4 l -0.5,-0.7 6.8,-4.2 11.5,-1.4 0.8,-2.4 -5.6,-3 1.7,0 c 0.9,0 2,0.4 2.3,1 0.3,0.6 1.2,0.9 1.8,0.8 0.6,-0.1 3.4,0.8 6.2,2.1 l 5,2.4 7.5,0 0,3.7 -4.2,4 1.2,3.2 -3,5.8 17,11.2 0,60.8 -61,0 z",
      "m115,8.7 -2.8,-0.4 0.8,-2.4 4.2,0 c 2.3,0 4.2,0.2 4.2,0.5 0,0.8 -2.3,3 -2.9,2.8 -0.3,-0 -1.8,-0.3 -3.4,-0.6 z",
    ],
  },
  TAS: {
    timeZone: "Australia/Hobart",
    path: [
      "m202.7,223.9 -2.7,-3.6 -0.1,-3.4 c -0.1,-1.9 -0.4,-3.7 -0.8,-4.1 -0.4,-0.4 -0.7,-1.8 -0.7,-3.1 l 0,-2.3 1,0 c 0.6,0 2.4,0.7 4.2,1.6 l 3.1,1.6 9.6,-1.2 0,7.2 -3.4,5.8 -2.6,-1 -1.7,3 c -0.9,1.6 -2,3 -2.4,3 -0.4,0 -1.9,-1.6 -3.4,-3.6 z",
    ],
  },
  ACT: {
    timeZone: "Australia/Sydney",
    path: [
      "m222,165.7 0.1,2.8 0.4,1.4 1,1 0.4,-0.9 0.2,2.9 2.6,1.6 1,-2.2 0,-3.6 c 0,0 -0.3,-0.5 -0.6,-1.1 0.8,-0.3 1.2,0.1 1.2,0.1 l 0.1,-3.4 1.5,-2 2.4,0.3 0.5,-1 -2.7,-1.3 c 0,0 -0.7,-1.8 -1.8,-2.4 -1.6,1.1 -4,2 -5.2,3.9 -0.4,0.7 -0.5,2.3 -0.5,2.3 z",
    ],
    inland: true,
  },
} as const;

type State = keyof typeof states;

const offices = layoutData.homePageOfficeList;
const defaultOffice = offices.find((o) => o.addressLocality === "Sydney");

export const AboutUs = ({ data }) => {
  const [selectedOffice, setSelectedOffice] = useState(defaultOffice);
  const [officeBeingHovered, setOfficeBeingHovered] = useState({});
  const [stateBeingHovered, setStateBeingHovered] = useState<string>(
    defaultOffice?.addressRegion || ""
  );
  const [mapHoveredTrigger, setMapHoveredTrigger] = useState(false);
  const [mapClickedTrigger, setMapClickedTrigger] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Section color={data.backgroundColor}>
      <Container
        className="w-full"
        data-tina-field={tinaField(data, aboutUsBlock.backgroundColor)}
      >
        <div className="grid grid-cols-3 gap-6">
          {isClient && (
            <div className="hidden md:block">
              <TV className="col-span-3 md:col-span-1" />
            </div>
          )}
          <div className="col-span-3 md:col-span-2">
            <div
              className={`grid grid-cols-1 gap-6 ${!data.hideMap ? "sm:grid-cols-2" : ""}`}
            >
              <ContactUs
                className=""
                offices={offices}
                selectedOffice={selectedOffice}
                setSelectedOffice={setSelectedOffice}
                officeBeingHovered={officeBeingHovered}
                setStateBeingHovered={setStateBeingHovered}
                setMapHoveredTrigger={setMapHoveredTrigger}
                mapHoveredTrigger={mapHoveredTrigger}
                setMapClickedTrigger={setMapClickedTrigger}
                mapClickedTrigger={mapClickedTrigger}
              />
              {isClient && (data.showMap ?? true) && (
                <Map
                  className="hidden sm:block"
                  offices={offices}
                  selectedOffice={selectedOffice}
                  setSelectedOffice={setSelectedOffice}
                  stateBeingHovered={stateBeingHovered}
                  setOfficeBeingHovered={setOfficeBeingHovered}
                  setStateBeingHovered={setStateBeingHovered}
                  setMapHoveredTrigger={setMapHoveredTrigger}
                  setMapClickedTrigger={setMapClickedTrigger}
                />
              )}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

const TV = memo(function TV({ className }: { className?: string }) {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    // Set the video URL after hydration
    setVideoUrl(layoutData.aboutUs.video.url);
  }, []);

  if (!videoUrl) {
    return (
      <div className={className}>
        <h2 className="mt-0">tv.ssw.com</h2>
        <div className="aspect-video w-full animate-pulse bg-gray-200" />
      </div>
    );
  }

  return (
    <div className={className}>
      <h2 className="mt-0">tv.ssw.com</h2>
      <VideoModal url={videoUrl} />
    </div>
  );
});

const ContactUs = ({
  className,
  offices,
  selectedOffice,
  setSelectedOffice,
  officeBeingHovered,
  setStateBeingHovered,
  setMapHoveredTrigger,
  mapHoveredTrigger,
  setMapClickedTrigger,
  mapClickedTrigger,
}) => {
  return (
    <div className={className}>
      <h2 className="mt-0">Contact Us</h2>
      <ul className="flex flex-col">
        {offices.map((o, i) => (
          <AccordionItem
            key={i}
            office={o}
            selectedOffice={selectedOffice}
            setSelectedOffice={setSelectedOffice}
            officeBeingHovered={officeBeingHovered}
            setStateBeingHovered={setStateBeingHovered}
            setMapHoveredTrigger={setMapHoveredTrigger}
            mapHoveredTrigger={mapHoveredTrigger}
            setMapClickedTrigger={setMapClickedTrigger}
            mapClickedTrigger={mapClickedTrigger}
          >
            <OfficeInfo office={o} />
          </AccordionItem>
        ))}
      </ul>
    </div>
  );
};

const AccordionItem = ({
  office,
  selectedOffice,
  setSelectedOffice,
  officeBeingHovered,
  setStateBeingHovered,
  setMapHoveredTrigger,
  mapHoveredTrigger,
  setMapClickedTrigger,
  mapClickedTrigger,
  children,
}) => {
  const currentlySelected =
    (!mapClickedTrigger &&
      office.addressLocality === selectedOffice?.addressLocality) ||
    (mapClickedTrigger &&
      office.addressRegion === selectedOffice?.addressRegion);

  const handleSelectOffice = () => {
    setMapClickedTrigger(false);
    if (office.addressLocality === selectedOffice?.addressLocality) {
      setSelectedOffice(null);
    } else if (!currentlySelected) {
      setSelectedOffice(office);
    }
  };

  const onHover =
    (!mapHoveredTrigger && officeBeingHovered === office) ||
    (mapHoveredTrigger &&
      officeBeingHovered?.addressRegion === office?.addressRegion);

  return (
    <li>
      <div
        className={classNames(
          "group flex cursor-pointer items-center justify-between p-2 transition-all duration-500",
          currentlySelected
            ? "bg-sswRed"
            : onHover
              ? "bg-gray-600"
              : "bg-gray-400 hover:bg-gray-600"
        )}
        onMouseEnter={() => {
          setStateBeingHovered(office.addressRegion);
          setMapHoveredTrigger(false);
        }}
        onMouseLeave={() => {
          setStateBeingHovered(null);
          setMapHoveredTrigger(false);
        }}
        onClick={() => handleSelectOffice()}
      >
        <div className="group flex cursor-pointer pl-2">
          <div className="font-sans uppercase text-white">
            {office.addressLocality}
          </div>
        </div>
        <div className="flex items-center justify-center text-white">
          <BiChevronRightCircle
            className={classNames({ "rotate-90": currentlySelected })}
          />
        </div>
      </div>

      <div
        className={classNames(
          "mb-2 overflow-hidden bg-white transition-all duration-500",
          currentlySelected ? "max-h-52" : "max-h-0"
        )}
      >
        {children}
      </div>
    </li>
  );
};

const OfficeInfo = ({ office }) => {
  return (
    <div className="p-4 text-sm text-black">
      <p className="prose pb-2">
        <CustomLink href={office.url}>{office.name}</CustomLink>
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
      <p className="py-2">Phone: {office.phone}</p>
      <p className="pb-2">
        Hours: {office.hours}
        <OpenStatus state={office.addressRegion} />
        <br />
        {office.days}
      </p>
    </div>
  );
};

type Status = "Open" | "Closed" | "";

type OpenStatusProps = {
  state?: State;
};

const OpenStatus = ({ state }: OpenStatusProps) => {
  const [status, setStatus] = useState<Status>("");
  const timeZone = states[state]?.timeZone;

  useEffect(() => {
    const now = dayjs.utc().tz(timeZone);

    const isWeekend =
      DAY_KEYS.Saturday === now.day() || DAY_KEYS.Sunday === now.day();
    const currentHour = now.hour();

    if (
      !isWeekend &&
      currentHour >= WORKING_TIME.Open &&
      currentHour <= WORKING_TIME.Close
    ) {
      setStatus("Open");
    } else {
      setStatus("Closed");
    }
  }, [timeZone]);

  return (
    <span
      className={classNames(
        { "bg-green-400": status === "Open", "bg-sswRed": status === "Closed" },
        "text-xxxs ml-2 p-1 font-bold uppercase text-white"
      )}
    >
      {status}
    </span>
  );
};

const Map = ({
  className,
  offices,
  selectedOffice,
  setSelectedOffice,
  stateBeingHovered,
  setOfficeBeingHovered,
  setStateBeingHovered,
  setMapHoveredTrigger,
  setMapClickedTrigger,
}) => {
  return (
    <div className={className}>
      <h2 className="mt-0">&nbsp;</h2>
      <svg viewBox="0 0 250 250">
        <defs>
          <filter x="-0.05" y="-0.05" width="1.1" height="1.1" id="notSelected">
            <feFlood floodColor="#414141" result="bg" />
            <feMerge>
              <feMergeNode in="bg" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter x="-0.05" y="-0.05" width="1.1" height="1.1" id="selected">
            <feFlood floodColor="#c43f3e" result="bg" />
            <feMerge>
              <feMergeNode in="bg" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {Object.keys(states).map((stateKey) => {
          const state = states[stateKey];
          const primaryOffice = offices.find(
            (o) => o.addressRegion === stateKey
          );

          return (
            <g
              key={stateKey}
              id={stateKey}
              className={classNames(
                state.label
                  ? stateBeingHovered === stateKey
                    ? "fill-[#666666]"
                    : "fill-[#959595]"
                  : "fill-[#afafaf]"
              )}
            >
              {state.path.map((path, index) => (
                <path
                  key={index}
                  d={path}
                  className={classNames("cursor-pointer", {
                    "stroke-white stroke-1": state.inland,
                  })}
                  onClick={() => {
                    setSelectedOffice(primaryOffice);
                    setMapClickedTrigger(true);
                  }}
                  onMouseOver={() => {
                    setOfficeBeingHovered(primaryOffice);
                    setStateBeingHovered(stateKey);
                    setMapHoveredTrigger(true);
                  }}
                  onMouseLeave={() => {
                    setOfficeBeingHovered(null);
                    setStateBeingHovered(null);
                  }}
                />
              ))}
              {state.label && (
                <>
                  <text
                    filter={
                      selectedOffice?.addressRegion === stateKey
                        ? "url(#selected)"
                        : "url(#notSelected)"
                    }
                    x={state.label.x}
                    y={state.label.y}
                    className={classNames("cursor-pointer fill-white text-xxs")}
                    onClick={() => setSelectedOffice(primaryOffice)}
                    onMouseOver={() => {
                      setOfficeBeingHovered(primaryOffice);
                      setStateBeingHovered(stateKey);
                    }}
                    onMouseLeave={() => {
                      setOfficeBeingHovered(null);
                      setStateBeingHovered(null);
                    }}
                  >
                    {stateKey}
                  </text>
                </>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};
