"use client";
import { Popover, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { Au, Cn, Fr } from "react-flags-select";
import { useLocation } from "react-use";
import { twMerge } from "tailwind-merge";

const websites = [
  {
    country: "AU",
    name: "Australia",
    url: "https://www.ssw.com.au",
  },
  {
    country: "CN",
    name: "China",
    url: "https://www.ssw.com.cn",
  },
  {
    country: "FR",
    name: "France",
    url: "https://www.ssw.fr",
  },
];

const CountryFlag = (props: { country: string; className?: string }) => {
  const countryProps = {
    height: "2rem",
    width: "2rem",
  };
  switch (props.country.toUpperCase()) {
    case "AU":
      return <Au className={props.className} {...countryProps} />;
    case "CN":
      return <Cn className={props.className} {...countryProps} />;
    case "FR":
      return <Fr className={props.className} {...countryProps} />;
    default:
      return <Au className={props.className} {...countryProps} />;
  }
};

const CountryDropdown: React.FC = () => {
  const { host } = useLocation();
  const [isOpened, setIsOpened] = useState(false);
  const [currentCountry, setCurrentCountry] = useState("AU");

  useEffect(() => {
    const website = websites.find((w) => host?.endsWith(w.url));
    if (website) {
      setCurrentCountry(website.country);
    }
  }, [host]);

  return (
    <Popover>
      <Popover.Button
        className={twMerge(
          "flex items-center justify-center gap-x-1 rounded-md py-1 px-4 text-sm font-semibold text-ssw-black outline-none",
          "hover:bg-gray-100",
          isOpened && "bg-gray-100"
        )}
        onClick={() => setIsOpened(!isOpened)}
      >
        <CountryFlag country={currentCountry} />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 -translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-1"
      >
        <Popover.Panel className="absolute z-10 bg-white text-center shadow-md shadow-gray-400">
          {websites
            .filter((w) => w.country !== currentCountry)
            .map((country) => (
              <a
                key={country.country}
                // eslint-disable-next-line tailwindcss/no-arbitrary-value
                className="block py-2 hover:bg-gray-100 lg:min-w-[80px]"
                href={country.url}
                title={country.name}
              >
                <CountryFlag
                  className="inline-block"
                  country={country.country}
                />
              </a>
            ))}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default CountryDropdown;
