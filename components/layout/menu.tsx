import { Fragment, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Dialog, Popover, Transition } from "@headlessui/react";
import {
  HiChevronDown as ChevronDownIcon,
  HiOutlineCursorClick,
  HiShieldCheck,
  HiOutlineViewGrid,
  HiRefresh,
  HiOutlineInformationCircle,
  HiOutlineUsers,
  HiOutlineLocationMarker,
  HiOutlineVideoCamera,
  HiOutlineUserAdd,
} from "react-icons/hi";
import {
  HiBars3 as Bars3Icon,
  HiOutlineXMark as XMarkIcon,
  HiOutlineChartBar,
} from "react-icons/hi2";
import { classNames } from "tinacms";

const menuHeaders = [
  {
    name: "Services",
    children: [
      {
        name: "Development",
        icon: HiOutlineChartBar,
        description:
          "Get a better understanding of where your traffic is coming from.",
        href: "/services/development",
      },
      {
        name: "Cloud and Infrastructure",
        icon: HiOutlineCursorClick,
        description:
          "Speak directly to you're customers in a more meaningful way.",
        href: "/services/development",
      },
      {
        name: "Platform Development",
        icon: HiShieldCheck,
        description: "Your customers' data will be safe and secure.",
        href: "/services/development",
      },
      {
        name: "UI/UX Design",
        icon: HiOutlineViewGrid,
        description:
          "Connect with third-party tools that you're already using.",
        href: "/services/development",
      },
      {
        name: "Automations",
        icon: HiRefresh,
        description:
          "Build strategic tunnels that will drive your customers to convert.",
        href: "/services/development",
      },
    ],
  },
  {
    name: "Events and Training",
    children: [],
  },
  {
    name: "About Us",
    children: [
      {
        name: "About SSW",
        icon: HiOutlineInformationCircle,
      },
      {
        name: "SSW People",
        icon: HiOutlineUsers,
      },
      {
        name: "Our Offices",
        icon: HiOutlineLocationMarker,
      },
      {
        name: "SSW TV",
        icon: HiOutlineVideoCamera,
      },
      {
        name: "Join Us",
        icon: HiOutlineUserAdd,
      },
    ],
    featured: {
      title: "FEATURED SSW PEOPLE",
      items: [
        {
          name: "Matt Wicks",
          href: "https://ssw.com.au/people/matt-wicks",
          image:
            "https://github.com/SSWConsulting/SSW.People.Profiles/raw/main/Matt-Wicks/Images/Matt-Wicks-Profile.jpg",
          quote:
            "I didn't want to pay DynDNS - so I wrote an Azure function to replace them",
        },
        {
          name: "Tylah Kapa",
          href: "https://ssw.com.au/people/tylah-kapa",
          image:
            "https://github.com/SSWConsulting/SSW.People.Profiles/raw/main/tylah-kapa/Images/tylah-kapa-Profile.jpg",
          quote:
            "Every great developer you know got there by solving problems they were unqualified to solve until...",
        },
        {
          name: "Adam Cogan",
          href: "https://ssw.com.au/people/adam-cogan",
          image:
            "https://github.com/SSWConsulting/SSW.People.Profiles/raw/main/adam-cogan/Images/adam-cogan-Profile.jpg",
          quote:
            "Talent can fix tricky bugs, but teamwork and brains build great software.",
        },
      ],
    },
  },
  {
    name: "SSW Rules",
    href: "https://ssw.com.au/rules",
  },
  {
    name: "Contact Us",
    href: "https://www.ssw.com.au/ssw/Company/ContactUs.aspx",
    isPrimary: true,
  },
];

const Logo = (props) => {
  // show the xmas logo for 1-25 December
  const date = new Date();
  const isXmas = date.getMonth() === 11 && date.getDate() <= 25;
  const logoPath = isXmas
    ? "/images/ssw-logo-xmas.svg"
    : "/images/ssw-logo.svg";

  return (
    <h4 className="flex items-center justify-center">
      <Link
        href="/"
        passHref
        className="flex items-center gap-1 whitespace-nowrap"
      >
        <Image
          src={logoPath}
          alt="SSW - Enterprise Software Development"
          height={100}
          width={150}
        />
      </Link>
      <div className="ml-4 hidden w-24 text-sm font-semibold uppercase leading-4 text-gray-700 sm:sr-only md:block">
        Enterprise Software Development
      </div>
      {props.children}
    </h4>
  );
};

export const Menu = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white">
      <nav
        className="mx-auto flex max-w-9xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <Logo />
        <div className="grow"></div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-4">
          {menuHeaders.map((item) => (
            <DesktopMenuItem key={item.name} item={item} />
          ))}
        </Popover.Group>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel
          focus="true"
          className="fixed inset-y-0 right-0 z-10 flex w-full flex-col justify-between overflow-y-auto bg-white sm:ring-1 sm:ring-gray-900/10"
        >
          <div className="p-6">
            <Logo>
              <div className="grow"></div>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </Logo>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};

const DesktopMenuItem = ({ item }) => {
  const itemPadding = "py-3 px-4";
  if (!item.children) {
    return (
      <div
        className={classNames(
          itemPadding,
          item.isPrimary ? "bg-sswRed text-white" : "bg-transparent",
          "rounded-md"
        )}
      >
        <Link
          href={item.href}
          className="unstyled text-sm font-semibold leading-6 !no-underline"
        >
          {item.name}
        </Link>
      </div>
    );
  }

  return (
    <Popover className="relative isolate z-50">
      <Popover.Button
        className={classNames(
          itemPadding,
          "flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 focus-visible:outline-none"
        )}
      >
        {item.name}
        <ChevronDownIcon
          className="h-5 w-5 flex-none text-gray-400"
          aria-hidden="true"
        />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel
          className={classNames(
            item.featured ? "max-w-md -left-8 top-full" : "max-w-md -left-8 top-full",
            "absolute z-10 mt-3 w-screen overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5"
          )}
        >
          <div className="p-4">
            {item.children.map((item) => (
              <div
                key={item.name}
                className="group relative flex gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
              >
                <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                  <item.icon
                    className="group-hover:text-indigo-600 h-6 w-6 text-sswRed"
                    aria-hidden="true"
                  />
                </div>
                <div className="flex flex-auto flex-col justify-center">
                  <a
                    href={item.href}
                    className="unstyled block font-semibold text-gray-900"
                  >
                    {item.name}
                    <span className="absolute inset-0" />
                  </a>
                  {item.description && (
                    <p className="mt-1 text-gray-600">{item.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
            {item.callsToAction &&
              item.callsToAction.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                >
                  <item.icon
                    className="h-5 w-5 flex-none text-gray-400"
                    aria-hidden="true"
                  />
                  {item.name}
                </a>
              ))}
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};
