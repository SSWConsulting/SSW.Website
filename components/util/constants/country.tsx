export const sswCountries = [
  {
    label: "Australia",
    flagUrl: "/images/logos/australia-flag.svg",
  },
  {
    label: "China",
    flagUrl: "/images/logos/china-flag.svg",
  },
  {
    label: "France",
    flagUrl: "/images/logos/france-flag.svg",
  },
];

type CityMapType = Record<
  string,
  {
    name: string;
    url: string;
    state: string;
    country: string;
  }
>;

export const CITY_MAP: CityMapType = {
  Sydney: {
    name: "SSW Chapel Sydney",
    url: "https://sswchapel.com.au/Sydney",
    state: "NSW",
    country: "Australia",
  },
  Brisbane: {
    name: "SSW Chapel Brisbane",
    url: "https://sswchapel.com.au/Brisbane",
    state: "QLD",
    country: "Australia",
  },
  Melbourne: {
    name: "SSW Chapel Melbourne",
    url: "https://sswchapel.com.au/Melbourne",
    state: "VIC",
    country: "Australia",
  },
  Newcastle: {
    name: "SSW Chapel Newcastle",
    url: "https://sswchapel.com.au/Newcastle",
    state: "NSW",
    country: "Australia",
  },
};
