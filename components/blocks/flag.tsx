import Image from "next/image";
import { sswCountries } from "../util/constants/country";
import { Template } from "tinacms";

export const Flag = ({ country }) => {
  const { flagUrl } = sswCountries.find((item) => item.label === country);

  return (
    <>
      <Image
        className="my-0 inline"
        src={flagUrl}
        width={35}
        height={35}
        alt="country"
      />
    </>
  );
};

export const flagSchema: Template = {
  name: "Flag",
  label: "Flag image for a given country",
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
