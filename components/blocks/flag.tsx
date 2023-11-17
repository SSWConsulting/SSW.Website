import Image from "next/image";
import type { Template } from "tinacms";
import { Countries, sswCountries } from "../util/constants/country";

type FlagProps = {
  country: Countries;
  height?: number;
  width?: number;
};

export const Flag = ({ country, height, width }: FlagProps) => {
  const countryObj = sswCountries.find((item) => item.label === country);
  const flagUrl = countryObj?.flagUrl || sswCountries[0].flagUrl;

  return (
    <>
      <Image
        className="my-0 inline"
        src={flagUrl}
        width={width || 35}
        height={height || 35}
        alt="country"
      />
    </>
  );
};

export const flagSchema: Template = {
  name: "Flag",
  label: "Flag Image",
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
