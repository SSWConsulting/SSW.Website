import classNames from "classnames";
import Image from "next/image";
import type { Template } from "tinacms";
import { Countries, sswCountries } from "../util/constants/country";

type FlagProps = {
  country: Countries;
  className?: string;
  height?: number;
  width?: number;
};

export const Flag = ({ country, height, width, className = "" }: FlagProps) => {
  const countryObj = sswCountries.find((item) => item.label === country);
  const flagUrl = countryObj?.flagUrl || sswCountries[0].flagUrl;

  return (
    <>
      <Image
        className={classNames("my-0 inline", className)}
        src={flagUrl}
        width={width || 35}
        height={height || 35}
        alt="country"
        loading="lazy"
      />
    </>
  );
};

export const flagSchema: Template = {
  name: "Flag",
  label: "Flag Image",
  ui: {
    previewSrc: "/images/thumbs/tina/flag-image.jpg",
  },
  fields: [
    {
      type: "string",
      label: "Country",
      name: "country",
      options: sswCountries.map((item) => item.label),
      required: true,
    },
  ],
};
