import { FaGlobe, FaLocationArrow } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { classNames, type Template } from "tinacms";
import { locationSchemaConstants } from "../../.tina/collections/location";
import { Container } from "../util/container";

export const LocationBlock = ({ data }) => {
  return (
    <Container size="custom" id="location">
      <h4 className="py-2 text-sswRed">Location Venues</h4>
      <div className="mb-2 grid grid-cols-12">
        {data.locationList?.map((location, index) => (
          <LocationCard
            key={index}
            location={location.location}
            count={data.locationList.length}
            index={index}
            schema={data}
          />
        ))}
      </div>{" "}
      <div className="  py-1 text-center uppercase">
        <a
          href={data.chapelWebsite.URL == null ? "" : data.chapelWebsite.URL}
          className="inline-flex cursor-pointer items-center !no-underline hover:!underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGlobe className="m-icon" />
          {data.chapelWebsite.title}
        </a>
      </div>
    </Container>
  );
};

const sad = locationSchemaConstants;

const LocationCard = ({ location, count, index, schema }) => {
  return (
    <div
      className={classNames(
        "col-span-12 gap-2 border-b-8 border-white bg-gray-100  py-3 pl-5 text-lg last:border-b-0 last:border-r-0 md:col-span-3 md:border-b-0",
        addTopBorderForSecondRow(index),
        addRightBorder(index)
      )}
    >
      <div className="mb-2 grid grid-cols-12">
        <div className="col-span-12">
          <div className="inline-flex items-center text-sm">
            <MdLocationOn className="m-icon" />
            <span className="font-bold capitalize">{location.header}</span>
          </div>
          <div className=" py-0.5 text-xs uppercase text-gray-500">
            {" "}
            {location.level}
          </div>
          <div className=" py-0.5 text-xs uppercase text-gray-500">
            {location.address}
          </div>
          <div className=" py-0.5 text-xs uppercase text-gray-500">
            {location.state}
          </div>
        </div>
        <div className="col-span-12  items-center  pr-4 md:col-span-12 md:pr-0">
          <div className="py-1 md:text-start">
            <a
              href={location.directionURL == null ? "" : location.directionURL}
              className="inline-flex cursor-pointer items-center text-xl !no-underline hover:!underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLocationArrow className="m-icon" />
              Directions
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const addTopBorderForSecondRow = (index) => {
  return index > 3 ? "border-white md:border-t-8" : "";
};

const addRightBorder = (index) => {
  return (index + 1) % 4 != 0 ? "md:border-r-8" : "";
};

export const locationBlockConstant = {
  value: "LocationBlock",
  locationList: { value: "locationList", location: "location" },
  chapelWebsite: {
    value: "chapelWebsite",
    title: "title",
    URL: "URL",
  },
};

export const locationBlockSchema: Template = {
  name: locationBlockConstant.value,
  label: "Locations",
  fields: [
    {
      type: "object",
      label: "Location List",
      name: locationBlockConstant.locationList.value,
      list: true,
      ui: {
        itemProps: (item) => {
          const location = item?.location;
          if (!location) return { label: "Please Attach location" };

          const formattedLabel = location
            .split("/")[2]
            .replace(".mdx", "")
            .replace(/-/g, " ")
            .toUpperCase();

          return {
            label: formattedLabel,
          };
        },
      },
      fields: [
        {
          type: "reference",
          collections: ["locations"],
          label: "Location",
          name: locationBlockConstant.locationList.location,
        },
      ],
    },
    {
      type: "object",
      name: locationBlockConstant.chapelWebsite.value,
      label: "Chapel Website",
      fields: [
        {
          type: "string",
          name: locationBlockConstant.chapelWebsite.title,
          label: "Text",
        },
        {
          type: "string",
          name: locationBlockConstant.chapelWebsite.URL,
          label: "URL",
        },
      ],
    },
  ],
};
