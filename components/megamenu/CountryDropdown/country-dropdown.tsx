"use client";
import { Popover, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { useLocation } from "react-use";
import { twMerge } from "tailwind-merge";
import { Flag } from "../../blocks";

type Countries = (typeof websites)[number]["country"];

const websites = [
  {
    country: "Australia",
    url: "https://www.ssw.com.au",
  },
  {
    country: "China",
    url: "https://www.ssw.com.cn",
  },
  {
    country: "France",
    url: "https://www.ssw.fr",
  },
] as const;

type CountryFlagProps = {
  country: Countries;
  className?: string;
};

const CountryFlag = (props: CountryFlagProps) => {
  return <Flag {...props} height={32} width={32} />;
};

const CountryDropdown = () => {
  const { host } = useLocation();
  const [isOpened, setIsOpened] = useState(false);
  const [currentCountry, setCurrentCountry] = useState<Countries>("Australia");

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
                title={country.country}
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
