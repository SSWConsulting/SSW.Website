import classNames from "classnames";
import { FaGlobe, FaLocationArrow } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import { locationSchemaConstants } from "../../tina/collections/location"; // TODO: Use alias - https://github.com/tinacms/tinacms/issues/4488
import { CustomLink } from "../customLink";
import { Container } from "../util/container";

const NumberOfLocationInRow = 4;

export const LocationBlock = ({ data }) => {
  return (
    <Container padding="md:px-8 px-6" size="custom" id="location">
      <h2
        className="my-6 py-2 text-center text-sswRed"
        data-tina-field={tinaField(data, locationBlockConstant.title)}
      >
        {data.title}
      </h2>
      <div className="mb-2 grid grid-cols-12">
        {data.locationList?.map((location, index) => (
          <LocationCard
            key={index}
            location={location.location}
            index={index}
            schema={data}
          />
        ))}
      </div>{" "}
      <div className="prose max-w-none py-4 text-center uppercase">
        <CustomLink
          href={!data.chapelWebsite?.URL ? "" : data.chapelWebsite.URL}
          className="inline-flex cursor-pointer items-center font-normal"
        >
          <FaGlobe className="m-icon" />
          <span
            data-tina-field={tinaField(
              data.chapelWebsite,
              locationBlockConstant.chapelWebsite.title
            )}
          >
            {data.chapelWebsite?.title}
          </span>
        </CustomLink>
      </div>
    </Container>
  );
};

const LocationCard = ({ location, index, schema }) => {
  return (
    <div
      className={classNames(
        "col-span-12 gap-2 border-b-8 border-white bg-gray-100 py-3 pl-5 text-lg last:border-b-0 last:border-r-0 md:col-span-3 md:border-b-0",
        addTopBorderForSecondRow(index),
        addRightBorder(index)
      )}
    >
      <div className="grid grid-cols-12">
        <div className="col-span-12">
          <div
            className="inline-flex items-center text-sm"
            data-tina-field={tinaField(
              schema.locationList[index].location,
              locationSchemaConstants.header
            )}
          >
            <MdLocationOn className="m-icon" />
            <span className="font-bold capitalize">{location?.header}</span>
          </div>
          <div
            className="py-0.5 text-xs capitalize text-gray-500"
            data-tina-field={tinaField(
              schema.locationList[index].location,
              locationSchemaConstants.addressLine1
            )}
          >
            {" "}
            {location?.addressLine1}
          </div>
          <div
            className="py-0.5 text-xs capitalize text-gray-500"
            data-tina-field={tinaField(
              schema.locationList[index].location,
              locationSchemaConstants.addressLine2
            )}
          >
            {location?.addressLine2}
          </div>
          <div
            className="py-0.5 text-xs capitalize text-gray-500"
            data-tina-field={tinaField(
              schema.locationList[index].location,
              locationSchemaConstants.addressLine3
            )}
          >
            {location?.addressLine3}
          </div>{" "}
        </div>

        <div className="prose py-1 text-xs">
          <CustomLink
            href={!location?.directionURL ? "" : location.directionURL}
            className="inline-flex cursor-pointer items-center font-normal"
            data-tina-field={tinaField(
              schema.locationList[index].location,
              locationSchemaConstants.directionURL
            )}
          >
            <FaLocationArrow className="m-icon" />
            Directions
          </CustomLink>
        </div>
      </div>
    </div>
  );
};

const addTopBorderForSecondRow = (index) => {
  return index > NumberOfLocationInRow - 1 ? "border-white md:border-t-8" : "";
};

const addRightBorder = (index) => {
  return (index + 1) % NumberOfLocationInRow != 0 ? "md:border-r-8" : "";
};

export const locationBlockConstant = {
  value: "LocationBlock",
  title: "title",
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
  ui: {
    previewSrc: "/images/thumbs/tina/locations.jpg",
  },
  fields: [
    {
      type: "string",
      name: locationBlockConstant.title,
      label: "Title",
    },
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
