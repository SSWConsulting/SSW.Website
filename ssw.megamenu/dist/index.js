import { jsx, jsxs, Fragment as Fragment$1 } from 'react/jsx-runtime';
import { XMarkIcon, ChartPieIcon, CursorArrowRaysIcon, FingerPrintIcon, SquaresPlusIcon, Bars3Icon } from '@heroicons/react/24/outline';
import * as React from 'react';
import React__default, { createContext, useContext, useState, useEffect, Fragment, useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx$1, { clsx } from 'clsx';
import { Popover, Transition, Dialog } from '@headlessui/react';
import { isMobile } from 'react-device-detect';
import { ChevronDownIcon, ChevronLeftIcon, MagnifyingGlassIcon, PhoneIcon, PlayCircleIcon, RectangleGroupIcon } from '@heroicons/react/20/solid';
import { useHotkeys } from 'react-hotkeys-hook';

const defaultLinkComponent = ({
  href,
  className,
  children
}) => {
  return /* @__PURE__ */ jsx("a", { href, className, children });
};
const LinkContext = createContext(defaultLinkComponent);
const LinkProvider = ({
  children,
  linkComponent = defaultLinkComponent
}) => {
  return /* @__PURE__ */ jsx(LinkContext.Provider, { value: linkComponent, children });
};

const useLinkComponent = () => useContext(LinkContext);

const API_URL = "https://www.ssw.com.au/api/get-megamenu";
const refreshData = async () => {
  const res = await fetch(API_URL);
  const json = await res.json();
  const { menuGroups } = json;
  return menuGroups;
};
const useMenuItems = (menuBarItems) => {
  const [menuItems, setMenuItems] = useState(
    menuBarItems
  );
  useEffect(() => {
    refreshData().then((data) => {
      setMenuItems(data);
    }).catch((err) => {
      console.error(err);
    });
  }, []);
  useEffect(() => {
    if (menuBarItems) {
      setMenuItems(menuBarItems);
    }
  }, [menuBarItems]);
  return { menuItems: menuItems || [] };
};

const DEFAULT_URL = "https://www.ssw.com.au";
const ICON_IMAGE_SIZES = {
  small: "h-5 w-5",
  medium: "h-8 w-8"
};

const cx = (...args) => {
  return twMerge(clsx(args));
};

const australiaFlag = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20id='flag-icon-css-au'%20width='640'%20height='480'%3e%3cg%20stroke-width='1pt'%3e%3cpath%20fill='%23006'%20d='M0%200h640v480H0z'/%3e%3cpath%20fill='%23fff'%20d='M0%200v28l307%20222h38.7v-28L38.7%200H0zm345.7%200v28l-307%20222H0v-28L307%200h38.7z'/%3e%3cpath%20fill='%23fff'%20d='M144%200v250h57.6V0H144zM0%2083.3v83.4h345.7V83.3H0z'/%3e%3cpath%20fill='%23c00'%20d='M0%20100v50h345.7v-50H0zM155.6%200v250H190V0h-34.5zM0%20250l115.2-83.3H141L25.8%20250H0zM0%200l115.2%2083.3H89.5L0%2018.6V0zm204.7%2083.3L319.9%200h25.8L230.5%2083.3h-25.8zm141%20166.7l-115.2-83.3h25.7l89.5%2064.7V250z'/%3e%3cpath%20fill='%23fff'%20fill-rule='evenodd'%20d='M299.8%20392.5l-43.7%203.8%206%2043.4L232%20408l-30.1%2031.7%206-43.4-43.7-3.8%2037.7-22.3-24.3-36.5%2041%2015.5%2013.4-41.7%2013.5%2041.7%2041-15.5-24.3%2036.5m224.4%2062.3L476%20416.7l17.8%206.7%205.8-18.1%205.8%2018.1%2017.8-6.7-10.5%2015.8%2016.4%209.7-19%201.7%202.6%2018.9-13-13.9-13.2%2013.9%202.6-18.9-19-1.6m16.4-291.9L476%20134.6l17.8%206.7%205.8-18.1%205.8%2018.1%2017.8-6.7-10.5%2015.8%2016.4%209.8-19%201.6%202.6%2018.9-13-13.8-13.2%2013.7%202.6-18.8-19-1.6M380.8%20265l-10.5-15.8%2017.8%206.7%205.8-18.1%205.9%2018.1%2017.8-6.7-10.6%2015.8%2016.4%209.7-19%201.7%202.7%2018.9-13.2-13.9-13%2013.9%202.5-18.9-19-1.6m216.3-38L570%20221l17.8%206.7%205.8-18.1%205.9%2018.1%2017.8-6.7-10.5%2015.8%2016.3%209.7-19%201.7%202.6%2018.8-13-13.8-13.2%2013.8%202.6-18.8-19-1.7M542%20320l-10.3%206.5%202.9-11.9-9.3-7.8%2012.1-1%204.6-11.2%204.7%2011.3%2012.1.9-9.3%207.8%202.9%2011.9'/%3e%3c/g%3e%3c/svg%3e";

const chinaFlag = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20id='flag-icon-css-cn'%20width='640'%20height='480'%3e%3cdefs%3e%3cpath%20id='a'%20fill='%23ffde00'%20d='M-.6.8L0-1%20.6.8-1-.3h2z'/%3e%3c/defs%3e%3cpath%20fill='%23de2910'%20d='M0%200h640v480H0z'/%3e%3cuse%20width='30'%20height='20'%20transform='matrix(71.9991%200%200%2072%20120%20120)'%20xlink:href='%23a'/%3e%3cuse%20width='30'%20height='20'%20transform='matrix(-12.33562%20-20.5871%2020.58684%20-12.33577%20240.3%2048)'%20xlink:href='%23a'/%3e%3cuse%20width='30'%20height='20'%20transform='matrix(-3.38573%20-23.75998%2023.75968%20-3.38578%20288%2095.8)'%20xlink:href='%23a'/%3e%3cuse%20width='30'%20height='20'%20transform='matrix(6.5991%20-23.0749%2023.0746%206.59919%20288%20168)'%20xlink:href='%23a'/%3e%3cuse%20width='30'%20height='20'%20transform='matrix(14.9991%20-18.73557%2018.73533%2014.99929%20240%20216)'%20xlink:href='%23a'/%3e%3c/svg%3e";

const franceFlag = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20id='flag-icon-css-fr'%20width='640'%20height='480'%3e%3cg%20fill-rule='evenodd'%20stroke-width='1pt'%3e%3cpath%20fill='%23fff'%20d='M0%200h640v480H0z'/%3e%3cpath%20fill='%2300267f'%20d='M0%200h213.3v480H0z'/%3e%3cpath%20fill='%23f31830'%20d='M426.7%200H640v480H426.7z'/%3e%3c/g%3e%3c/svg%3e";

const countryMap = {
  Australia: australiaFlag,
  China: chinaFlag,
  France: franceFlag
};

const Flag = ({
  country,
  className,
  width,
  height
}) => {
  const countryFlag = countryMap[country];
  return /* @__PURE__ */ jsx(
    "img",
    {
      className: cx("my-0 inline", className),
      alt: country + "flag",
      src: countryFlag,
      width: width || 35,
      height: height || 35
    }
  );
};

const websites = [
  {
    country: "Australia",
    url: "https://www.ssw.com.au"
  },
  {
    country: "China",
    url: "https://www.ssw.cn"
  },
  {
    country: "France",
    url: "https://www.ssw.fr"
  }
];
const CountryDropdown = ({ url }) => {
  const [isOpened, setIsOpened] = useState(false);
  const [currentCountry, setCurrentCountry] = useState("Australia");
  const CustomLink = useLinkComponent();
  useEffect(() => {
    try {
      const { hostname } = new URL(url || "");
      const website = websites.find((w) => hostname?.endsWith(w.url));
      if (website) {
        setCurrentCountry(website.country);
      }
    } catch (err) {
      console.error(err);
    }
  }, [url]);
  return /* @__PURE__ */ jsxs(Popover, { children: [
    /* @__PURE__ */ jsx(
      Popover.Button,
      {
        className: cx(
          "flex items-center justify-center gap-x-1 rounded-md px-1 py-1 text-sm font-semibold text-ssw-black outline-none xs:px-4",
          "hover:scale-105"
        ),
        onClick: () => setIsOpened(!isOpened),
        children: /* @__PURE__ */ jsx(Flag, { country: currentCountry })
      }
    ),
    /* @__PURE__ */ jsx(
      Transition,
      {
        as: Fragment,
        enter: "transition ease-out duration-200",
        enterFrom: "opacity-0 -translate-y-1",
        enterTo: "opacity-100 translate-y-0",
        leave: "transition ease-in duration-150",
        leaveFrom: "opacity-100 translate-y-0",
        leaveTo: "opacity-0 -translate-y-1",
        children: /* @__PURE__ */ jsx(Popover.Panel, { className: "absolute z-10 bg-white text-center shadow-md shadow-gray-400", children: websites.filter((w) => w.country !== currentCountry).map((country) => /* @__PURE__ */ jsx(
          CustomLink,
          {
            className: "block min-w-[80px] py-2 hover:scale-105",
            href: country.url,
            title: country.country,
            children: /* @__PURE__ */ jsx(Flag, { country: country.country })
          },
          country.country
        )) })
      }
    )
  ] });
};

function getAugmentedNamespace(n) {
  if (n.__esModule) return n;
  var f = n.default;
	if (typeof f == "function") {
		var a = function a () {
			if (this instanceof a) {
        return Reflect.construct(f, arguments, this.constructor);
			}
			return f.apply(this, arguments);
		};
		a.prototype = f.prototype;
  } else a = {};
  Object.defineProperty(a, '__esModule', {value: true});
	Object.keys(n).forEach(function (k) {
		var d = Object.getOwnPropertyDescriptor(n, k);
		Object.defineProperty(a, k, d.get ? d : {
			enumerable: true,
			get: function () {
				return n[k];
			}
		});
	});
	return a;
}

var IconsManifest = [
  {
    "id": "ci",
    "name": "Circum Icons",
    "projectUrl": "https://circumicons.com/",
    "license": "MPL-2.0 license",
    "licenseUrl": "https://github.com/Klarr-Agency/Circum-Icons/blob/main/LICENSE"
  },
  {
    "id": "fa",
    "name": "Font Awesome 5",
    "projectUrl": "https://fontawesome.com/",
    "license": "CC BY 4.0 License",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0/"
  },
  {
    "id": "fa6",
    "name": "Font Awesome 6",
    "projectUrl": "https://fontawesome.com/",
    "license": "CC BY 4.0 License",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0/"
  },
  {
    "id": "io",
    "name": "Ionicons 4",
    "projectUrl": "https://ionicons.com/",
    "license": "MIT",
    "licenseUrl": "https://github.com/ionic-team/ionicons/blob/master/LICENSE"
  },
  {
    "id": "io5",
    "name": "Ionicons 5",
    "projectUrl": "https://ionicons.com/",
    "license": "MIT",
    "licenseUrl": "https://github.com/ionic-team/ionicons/blob/master/LICENSE"
  },
  {
    "id": "md",
    "name": "Material Design icons",
    "projectUrl": "http://google.github.io/material-design-icons/",
    "license": "Apache License Version 2.0",
    "licenseUrl": "https://github.com/google/material-design-icons/blob/master/LICENSE"
  },
  {
    "id": "ti",
    "name": "Typicons",
    "projectUrl": "http://s-ings.com/typicons/",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/"
  },
  {
    "id": "go",
    "name": "Github Octicons icons",
    "projectUrl": "https://octicons.github.com/",
    "license": "MIT",
    "licenseUrl": "https://github.com/primer/octicons/blob/master/LICENSE"
  },
  {
    "id": "fi",
    "name": "Feather",
    "projectUrl": "https://feathericons.com/",
    "license": "MIT",
    "licenseUrl": "https://github.com/feathericons/feather/blob/master/LICENSE"
  },
  {
    "id": "lu",
    "name": "Lucide",
    "projectUrl": "https://lucide.dev/",
    "license": "ISC",
    "licenseUrl": "https://github.com/lucide-icons/lucide/blob/main/LICENSE"
  },
  {
    "id": "gi",
    "name": "Game Icons",
    "projectUrl": "https://game-icons.net/",
    "license": "CC BY 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/3.0/"
  },
  {
    "id": "wi",
    "name": "Weather Icons",
    "projectUrl": "https://erikflowers.github.io/weather-icons/",
    "license": "SIL OFL 1.1",
    "licenseUrl": "http://scripts.sil.org/OFL"
  },
  {
    "id": "di",
    "name": "Devicons",
    "projectUrl": "https://vorillaz.github.io/devicons/",
    "license": "MIT",
    "licenseUrl": "https://opensource.org/licenses/MIT"
  },
  {
    "id": "ai",
    "name": "Ant Design Icons",
    "projectUrl": "https://github.com/ant-design/ant-design-icons",
    "license": "MIT",
    "licenseUrl": "https://opensource.org/licenses/MIT"
  },
  {
    "id": "bs",
    "name": "Bootstrap Icons",
    "projectUrl": "https://github.com/twbs/icons",
    "license": "MIT",
    "licenseUrl": "https://opensource.org/licenses/MIT"
  },
  {
    "id": "ri",
    "name": "Remix Icon",
    "projectUrl": "https://github.com/Remix-Design/RemixIcon",
    "license": "Apache License Version 2.0",
    "licenseUrl": "http://www.apache.org/licenses/"
  },
  {
    "id": "fc",
    "name": "Flat Color Icons",
    "projectUrl": "https://github.com/icons8/flat-color-icons",
    "license": "MIT",
    "licenseUrl": "https://opensource.org/licenses/MIT"
  },
  {
    "id": "gr",
    "name": "Grommet-Icons",
    "projectUrl": "https://github.com/grommet/grommet-icons",
    "license": "Apache License Version 2.0",
    "licenseUrl": "http://www.apache.org/licenses/"
  },
  {
    "id": "hi",
    "name": "Heroicons",
    "projectUrl": "https://github.com/tailwindlabs/heroicons",
    "license": "MIT",
    "licenseUrl": "https://opensource.org/licenses/MIT"
  },
  {
    "id": "hi2",
    "name": "Heroicons 2",
    "projectUrl": "https://github.com/tailwindlabs/heroicons",
    "license": "MIT",
    "licenseUrl": "https://opensource.org/licenses/MIT"
  },
  {
    "id": "si",
    "name": "Simple Icons",
    "projectUrl": "https://simpleicons.org/",
    "license": "CC0 1.0 Universal",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/"
  },
  {
    "id": "sl",
    "name": "Simple Line Icons",
    "projectUrl": "https://thesabbir.github.io/simple-line-icons/",
    "license": "MIT",
    "licenseUrl": "https://opensource.org/licenses/MIT"
  },
  {
    "id": "im",
    "name": "IcoMoon Free",
    "projectUrl": "https://github.com/Keyamoon/IcoMoon-Free",
    "license": "CC BY 4.0 License",
    "licenseUrl": "https://github.com/Keyamoon/IcoMoon-Free/blob/master/License.txt"
  },
  {
    "id": "bi",
    "name": "BoxIcons",
    "projectUrl": "https://github.com/atisawd/boxicons",
    "license": "CC BY 4.0 License",
    "licenseUrl": "https://github.com/atisawd/boxicons/blob/master/LICENSE"
  },
  {
    "id": "cg",
    "name": "css.gg",
    "projectUrl": "https://github.com/astrit/css.gg",
    "license": "MIT",
    "licenseUrl": "https://opensource.org/licenses/MIT"
  },
  {
    "id": "vsc",
    "name": "VS Code Icons",
    "projectUrl": "https://github.com/microsoft/vscode-codicons",
    "license": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0/"
  },
  {
    "id": "tb",
    "name": "Tabler Icons",
    "projectUrl": "https://github.com/tabler/tabler-icons",
    "license": "MIT",
    "licenseUrl": "https://opensource.org/licenses/MIT"
  },
  {
    "id": "tfi",
    "name": "Themify Icons",
    "projectUrl": "https://github.com/lykmapipo/themify-icons",
    "license": "MIT",
    "licenseUrl": "https://github.com/thecreation/standard-icons/blob/master/modules/themify-icons/LICENSE"
  },
  {
    "id": "rx",
    "name": "Radix Icons",
    "projectUrl": "https://icons.radix-ui.com",
    "license": "MIT",
    "licenseUrl": "https://github.com/radix-ui/icons/blob/master/LICENSE"
  },
  {
    "id": "pi",
    "name": "Phosphor Icons",
    "projectUrl": "https://github.com/phosphor-icons/core",
    "license": "MIT",
    "licenseUrl": "https://github.com/phosphor-icons/core/blob/main/LICENSE"
  },
  {
    "id": "lia",
    "name": "Icons8 Line Awesome",
    "projectUrl": "https://icons8.com/line-awesome",
    "license": "MIT",
    "licenseUrl": "https://github.com/icons8/line-awesome/blob/master/LICENSE.md"
  }
];

var DefaultContext = {
  color: undefined,
  size: undefined,
  className: undefined,
  style: undefined,
  attr: undefined
};
var IconContext = React__default.createContext && React__default.createContext(DefaultContext);

var __assign = undefined && undefined.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var __rest = undefined && undefined.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
function Tree2Element(tree) {
  return tree && tree.map(function (node, i) {
    return React__default.createElement(node.tag, __assign({
      key: i
    }, node.attr), Tree2Element(node.child));
  });
}
function GenIcon$1(data) {
  // eslint-disable-next-line react/display-name
  return function (props) {
    return React__default.createElement(IconBase, __assign({
      attr: __assign({}, data.attr)
    }, props), Tree2Element(data.child));
  };
}
function IconBase(props) {
  var elem = function (conf) {
    var attr = props.attr,
      size = props.size,
      title = props.title,
      svgProps = __rest(props, ["attr", "size", "title"]);
    var computedSize = size || conf.size || "1em";
    var className;
    if (conf.className) className = conf.className;
    if (props.className) className = (className ? className + " " : "") + props.className;
    return React__default.createElement("svg", __assign({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, conf.attr, attr, svgProps, {
      className: className,
      style: __assign(__assign({
        color: props.color || conf.color
      }, conf.style), props.style),
      height: computedSize,
      width: computedSize,
      xmlns: "http://www.w3.org/2000/svg"
    }), title && React__default.createElement("title", null, title), props.children);
  };
  return IconContext !== undefined ? React__default.createElement(IconContext.Consumer, null, function (conf) {
    return elem(conf);
  }) : elem(DefaultContext);
}

const esm = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DefaultContext,
  GenIcon: GenIcon$1,
  IconBase,
  IconContext,
  IconsManifest
}, Symbol.toStringTag, { value: 'Module' }));

const require$$0 = /*@__PURE__*/getAugmentedNamespace(esm);

// THIS FILE IS AUTO GENERATED
var GenIcon = require$$0.GenIcon;
var FaPhoneAlt = function FaPhoneAlt (props) {
  return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 512 512"},"child":[{"tag":"path","attr":{"d":"M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z"}}]})(props);
};

const iconMap = {
  chevronDown: (props) => /* @__PURE__ */ jsx(ChevronDownIcon, { className: props.className }),
  chevronLeft: (props) => /* @__PURE__ */ jsx(ChevronLeftIcon, { className: props.className }),
  magnifyingGlass: (props) => /* @__PURE__ */ jsx(MagnifyingGlassIcon, { className: props.className }),
  phone: (props) => /* @__PURE__ */ jsx(PhoneIcon, { className: props.className }),
  phoneAlt: (props) => /* @__PURE__ */ jsx(FaPhoneAlt, { className: props.className }),
  xMark: (props) => /* @__PURE__ */ jsx(XMarkIcon, { className: props.className }),
  chartPie: (props) => /* @__PURE__ */ jsx(ChartPieIcon, { className: props.className }),
  cursorArrowRays: (props) => /* @__PURE__ */ jsx(CursorArrowRaysIcon, { className: props.className }),
  fingerPrint: (props) => /* @__PURE__ */ jsx(FingerPrintIcon, { className: props.className }),
  squaresPlus: (props) => /* @__PURE__ */ jsx(SquaresPlusIcon, { className: props.className }),
  playCircle: (props) => /* @__PURE__ */ jsx(PlayCircleIcon, { className: props.className }),
  rectangleGroup: (props) => /* @__PURE__ */ jsx(RectangleGroupIcon, { className: props.className }),
  chinaFlag: () => /* @__PURE__ */ jsx(Flag, { country: "China", className: "mr-2" })
};

const CustomImage = (props) => {
  return /* @__PURE__ */ jsx("img", { ...props });
};

const MegaIconMapper = ({
  icon,
  className
}) => {
  const Icon = iconMap[icon];
  if (!Icon) {
    return /* @__PURE__ */ jsx(Fragment$1, {});
  }
  return /* @__PURE__ */ jsx(Icon, { className });
};
const MegaIcon = ({
  icon,
  iconImg,
  imgSize = "small",
  className
}) => {
  if (!iconImg && icon) {
    return /* @__PURE__ */ jsxs(Fragment$1, { children: [
      /* @__PURE__ */ jsx("span", { className: "sr-only", children: icon }),
      /* @__PURE__ */ jsx(MegaIconMapper, { "aria-hidden": "true", icon, className })
    ] });
  }
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
    CustomImage,
    {
      className: ICON_IMAGE_SIZES[imgSize],
      src: iconImg,
      alt: iconImg,
      width: 20,
      height: 20,
      "aria-hidden": "true"
    }
  ) });
};

const PhoneButton = ({ className }) => {
  const CustomLink = useLinkComponent();
  const [url, setUrl] = useState("https://www.ssw.com.au/company/contact-us");
  const [text, setText] = useState("CONTACT US");
  useEffect(() => {
    if (typeof window !== "undefined" && isMobile) {
      setUrl("tel:+61299533000");
      setText("CALL US");
    }
  }, []);
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cx(className, "flex flex-grow flex-wrap gap-2 sm:flex-grow-0"),
      children: /* @__PURE__ */ jsxs(
        CustomLink,
        {
          href: url,
          className: cx(
            "flex h-12 w-full shrink-0 cursor-pointer items-center justify-center whitespace-nowrap rounded bg-ssw-red px-4 text-xl hover:opacity-70 max-sm:my-5 sm:w-fit"
          ),
          children: [
            /* @__PURE__ */ jsx(MegaIcon, { icon: "phoneAlt", className: "text-2xl text-white" }),
            /* @__PURE__ */ jsx("span", { className: "ml-2 inline text-sm font-bold text-white", children: text })
          ]
        }
      )
    }
  );
};

const Search = ({
  searchTerm,
  performSearch,
  setSearchTerm
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);
  useEffect(() => {
    if (isOpen && searchRef?.current) {
      const searchInput = searchRef?.current;
      searchInput?.focus();
    }
  }, [isOpen]);
  const handleSearch = (e) => {
    performSearch(e);
    setIsOpen(false);
    setSearchTerm("");
  };
  useHotkeys(
    "mod+k",
    () => {
      if (!isOpen) {
        setIsOpen(true);
      }
    },
    [isOpen],
    { preventDefault: true }
  );
  return /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        className: "rounded p-3 text-ssw-black hover:text-ssw-red",
        onClick: () => setIsOpen(true),
        children: /* @__PURE__ */ jsx(MegaIcon, { icon: "magnifyingGlass", className: "h-5 w-5" })
      }
    ),
    /* @__PURE__ */ jsx(Transition.Root, { show: isOpen, as: Fragment, appear: true, children: /* @__PURE__ */ jsxs(Dialog, { as: "div", className: "relative z-10", onClose: setIsOpen, children: [
      /* @__PURE__ */ jsx(
        Transition.Child,
        {
          as: Fragment,
          enter: "ease-out duration-300",
          enterFrom: "opacity-0",
          enterTo: "opacity-100",
          leave: "ease-in duration-200",
          leaveFrom: "opacity-100",
          leaveTo: "opacity-0",
          children: /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-gray-500/50 transition-opacity" })
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-10 overflow-y-auto p-8 sm:p-12 md:p-28", children: /* @__PURE__ */ jsx(
        Transition.Child,
        {
          as: Fragment,
          enter: "ease-out duration-300",
          enterFrom: "opacity-0 scale-95",
          enterTo: "opacity-100 scale-100",
          leave: "ease-in duration-200",
          leaveFrom: "opacity-100 scale-100",
          leaveTo: "opacity-0 scale-95",
          children: /* @__PURE__ */ jsx(Dialog.Panel, { className: "mx-auto max-w-2xl divide-y divide-gray-500 divide-opacity-10 overflow-hidden rounded-md bg-white/80 shadow-2xl backdrop-blur transition-all", children: /* @__PURE__ */ jsx(
            SearchInput,
            {
              setSearchTerm,
              searchTerm,
              performSearch: handleSearch
            }
          ) })
        }
      ) })
    ] }) })
  ] });
};
const SearchInput = ({
  className,
  performSearch,
  searchTerm,
  setSearchTerm,
  inputClassName
}) => {
  return /* @__PURE__ */ jsxs("div", { className: className ?? "relative", children: [
    /* @__PURE__ */ jsx(
      MegaIcon,
      {
        icon: "magnifyingGlass",
        className: "pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-ssw-black text-opacity-40",
        "aria-hidden": "true"
      }
    ),
    /* @__PURE__ */ jsxs(
      "form",
      {
        className: "isolate inline-flex w-full shadow-sm",
        onSubmit: (e) => performSearch(e),
        children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              className: inputClassName ?? "h-12 grow rounded-l-md bg-transparent pl-11 text-ssw-black focus:ring-0 sm:text-sm",
              value: searchTerm,
              onChange: (e) => setSearchTerm(e.target.value),
              placeholder: "Search..."
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              className: "relative -ml-px inline-flex items-center rounded-r-md bg-ssw-red px-3 py-2 text-sm font-semibold text-white hover:bg-ssw-light-red focus:z-10",
              children: "Search"
            }
          )
        ]
      }
    )
  ] });
};

const MenuItemLink = ({ name, href }) => {
  const CustomLink = useLinkComponent();
  return /* @__PURE__ */ jsx(
    CustomLink,
    {
      href,
      className: "flex items-center justify-center rounded-md px-2 py-1 hover:text-ssw-red",
      children: name
    }
  );
};

const FeaturedCard = (props) => {
  return /* @__PURE__ */ jsxs("div", { className: "rounded bg-ssw-black px-4 py-5 text-white hover:bg-ssw-gray", children: [
    /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center font-bold", children: [
      props.icon && /* @__PURE__ */ jsx(MegaIcon, { icon: props.icon, className: "mr-2 size-8 flex-shrink-0" }),
      props.title
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-2 text-sm font-normal", children: props.children })
  ] });
};

const SubMenuWidget = ({ item }) => {
  const CustomLink = useLinkComponent();
  switch (item.widgetType) {
    case "featured": {
      return /* @__PURE__ */ jsx(CustomLink, { href: item.url, children: /* @__PURE__ */ jsx(
        FeaturedCard,
        {
          title: /* @__PURE__ */ jsxs("span", { children: [
            " ",
            item.name
          ] }),
          icon: item.icon,
          children: item.description
        }
      ) });
    }
    case "bookNow": {
      return /* @__PURE__ */ jsxs(
        CustomLink,
        {
          className: "relative flex w-full cursor-pointer items-center justify-center rounded bg-ssw-red font-semibold !text-white hover:bg-ssw-light-red",
          href: item.url,
          children: [
            /* @__PURE__ */ jsx(MegaIcon, { icon: "phoneAlt", className: "text-2xl" }),
            /* @__PURE__ */ jsx("span", { className: "ml-2 py-4", children: item.name?.toUpperCase() })
          ]
        }
      );
    }
    case "classicMenu":
    default: {
      return /* @__PURE__ */ jsx(CustomLink, { className: "block", href: item.url, children: item.name && item.description ? /* @__PURE__ */ jsxs(Fragment$1, { children: [
        /* @__PURE__ */ jsx("span", { className: "font-bold", children: item.name }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm", children: item.description })
      ] }) : /* @__PURE__ */ jsx("span", { className: "pl-4 text-sm font-normal text-ssw-black", children: item.name }) });
    }
  }
};

const SubMenuGroup = ({
  menuColumns,
  sidebarItems,
  viewAll
}) => {
  return /* @__PURE__ */ jsx(Fragment$1, { children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-9xl flex-col lg:flex-row", children: [
    /* @__PURE__ */ jsx("div", { className: "grid gap-x-4 p-4 lg:grow lg:grid-flow-col", children: menuColumns.map((column, i) => /* @__PURE__ */ jsx("div", { className: "flex grow flex-col gap-y-4", children: column.menuColumnGroups?.map((item, j) => /* @__PURE__ */ jsx(
      MenuItem,
      {
        item,
        viewAll,
        showViewAll: !!column.menuColumnGroups && i === menuColumns.length - 1 && j == column.menuColumnGroups.length - 1
      },
      "menuItem" + item.name + i
    )) }, "column" + i)) }),
    /* @__PURE__ */ jsx("div", { className: "shrink-0 overflow-x-hidden bg-gray-100 lg:relative lg:w-[350px] lg:before:absolute lg:before:inset-0 lg:before:-z-10 lg:before:w-[1000px] lg:before:bg-gray-50", children: /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-y-2 px-6 pb-8 pt-4", children: sidebarItems?.map((sideBarItem, i) => /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs(
        Heading,
        {
          className: clsx$1(
            i > 0 && "flex pt-6",
            "flex items-center gap-3"
          ),
          children: [
            sideBarItem.name,
            (sideBarItem.iconImg || sideBarItem.icon) && /* @__PURE__ */ jsx(
              MegaIcon,
              {
                imgSize: "medium",
                iconImg: sideBarItem.iconImg,
                className: ICON_IMAGE_SIZES.medium,
                icon: sideBarItem.icon
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-y-4", children: sideBarItem.items?.map((item, i2) => /* @__PURE__ */ jsx(SubMenuWidget, { item }, i2)) })
    ] }, i)) }) })
  ] }) });
};
const Heading = ({ className, children }) => {
  return /* @__PURE__ */ jsx("h3", { className: cx("pb-2 pl-2 text-lg font-bold text-ssw-black", className), children });
};
const MenuItem = ({ item: { name, menuItems }, viewAll, showViewAll }) => {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col pb-4 last:grow", children: [
    /* @__PURE__ */ jsx(Heading, { children: name }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-col", children: menuItems?.map((subItem, i) => /* @__PURE__ */ jsx(LinkItem, { link: subItem }, name + i)) }),
    showViewAll && viewAll && /* @__PURE__ */ jsx(ViewAllLink, { href: viewAll.url, name: viewAll.name })
  ] }, name);
};
const LinkItem = ({
  link: {
    name,
    url,
    description,
    icon,
    iconImg,
    youtubeLink,
    documentationLink
  }
}) => {
  const close = useContext(ClosePopoverContext);
  const CustomLink = useLinkComponent();
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs(
      CustomLink,
      {
        href: url || "",
        className: cx(
          "flex items-start gap-x-1 text-ssw-black hover:text-ssw-red focus:outline-none",
          description ? "p-4" : "p-2"
        ),
        onClick: () => {
          if (close)
            close();
        },
        children: [
          (icon || iconImg) && /* @__PURE__ */ jsx("div", { className: "flex shrink-0 items-center justify-center text-ssw-red", children: /* @__PURE__ */ jsx(
            MegaIcon,
            {
              className: "h-6 w-6",
              icon,
              iconImg
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "min-w-0 flex-1", children: /* @__PURE__ */ jsx("span", { children: name && description ? /* @__PURE__ */ jsxs(Fragment$1, { children: [
            /* @__PURE__ */ jsx("p", { className: "font-bold", children: name }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm font-normal text-ssw-gray", children: description })
          ] }) : /* @__PURE__ */ jsx("p", { className: "pl-2 text-sm font-normal text-ssw-black hover:text-ssw-red", children: name }) }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "ml-10 flex flex-row gap-x-4 text-sm font-light text-ssw-gray", children: [
      youtubeLink && /* @__PURE__ */ jsx(CustomLink, { href: youtubeLink, className: "hover:text-ssw-red", children: "YouTube" }),
      documentationLink && /* @__PURE__ */ jsx(CustomLink, { href: documentationLink, className: "hover:text-ssw-red", children: "Docs" })
    ] })
  ] });
};
const ViewAllLink = ({
  name,
  href
}) => {
  const CustomLink = useLinkComponent();
  if (!name || !href) {
    return /* @__PURE__ */ jsx(Fragment$1, {});
  }
  return /* @__PURE__ */ jsx("div", { className: "flex grow flex-col-reverse items-end self-end pt-4", children: /* @__PURE__ */ jsxs(
    CustomLink,
    {
      href,
      className: "rounded-md px-3 py-1 text-sm font-semibold leading-6 text-ssw-red hover:bg-ssw-red hover:text-white",
      children: [
        name,
        " →"
      ]
    }
  ) });
};

const MenuItemWithSubmenu = ({
  name,
  menuColumns,
  sidebarItems,
  isOpened,
  viewAll
}) => {
  return /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsxs(
      Popover.Button,
      {
        className: cx(
          "flex cursor-pointer items-center justify-center whitespace-nowrap rounded-md px-2 py-1 text-ssw-black focus:outline-none focus-visible:ring-opacity-0",
          isOpened ? "text-ssw-red" : "hover:text-ssw-red"
        ),
        children: [
          name,
          /* @__PURE__ */ jsx(MegaIcon, { icon: "chevronDown", className: "h-5 w-5 flex-none" })
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      Transition,
      {
        as: Fragment,
        enter: "transition ease-out duration-200",
        enterFrom: "opacity-0 -translate-y-1",
        enterTo: "opacity-100 translate-y-0",
        leave: "transition ease-in duration-150",
        leaveFrom: "opacity-100 translate-y-0",
        leaveTo: "opacity-0 -translate-y-1",
        children: /* @__PURE__ */ jsx(Popover.Panel, { className: "absolute inset-x-0 top-[120px] -z-10 bg-gray-50 shadow-md shadow-gray-400", children: /* @__PURE__ */ jsx(
          SubMenuGroup,
          {
            menuColumns,
            sidebarItems,
            viewAll
          }
        ) })
      }
    )
  ] });
};

const ClosePopoverContext = createContext(null);
const DesktopMenu = ({
  menuGroups,
  sideActionsOverride,
  hidePhone,
  searchUrl,
  callback,
  performSearch,
  searchTerm,
  setSearchTerm
}) => {
  const SideActions = sideActionsOverride;
  return /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsx("div", { className: "hidden flex-1 xl:block", children: /* @__PURE__ */ jsx(Popover.Group, { className: "flex items-center justify-center gap-1 text-sm font-semibold text-ssw-black outline-none", children: menuGroups.map((group) => {
      if (!!group.menuColumns && !!group.sidebarItems && group.menuColumns.length > 0 && group.sidebarItems.length > 0) {
        return /* @__PURE__ */ jsx(Popover, { children: ({ open, close }) => {
          if (!group.menuColumns || !group.sidebarItems)
            return /* @__PURE__ */ jsx(Fragment$1, {});
          return /* @__PURE__ */ jsx(ClosePopoverContext.Provider, { value: close, children: /* @__PURE__ */ jsx(
            MenuItemWithSubmenu,
            {
              name: group.name,
              menuColumns: group.menuColumns,
              sidebarItems: group.sidebarItems,
              isOpened: open,
              viewAll: group.viewAll
            }
          ) });
        } }, group.name);
      } else if (group.url) {
        return /* @__PURE__ */ jsx(
          MenuItemLink,
          {
            name: group.name,
            href: group.url
          },
          group.name
        );
      } else {
        return /* @__PURE__ */ jsx(Fragment$1, {});
      }
    }) }) }),
    /* @__PURE__ */ jsx("div", { className: "hidden shrink items-center justify-end gap-1 xl:flex", children: SideActions ? /* @__PURE__ */ jsx(SideActions, {}) : /* @__PURE__ */ jsx(
      DefaultSideActions,
      {
        searchTerm,
        setSearchTerm,
        performSearch,
        hidePhone,
        searchUrl,
        callback
      }
    ) })
  ] });
};
const DefaultSideActions = ({
  hidePhone,
  searchUrl,
  searchTerm,
  setSearchTerm,
  performSearch
}) => {
  return /* @__PURE__ */ jsxs(Fragment$1, { children: [
    !hidePhone && /* @__PURE__ */ jsx(PhoneButton, {}),
    /* @__PURE__ */ jsx(
      Search,
      {
        performSearch,
        searchTerm,
        setSearchTerm
      }
    ),
    /* @__PURE__ */ jsx(Divider$1, {}),
    /* @__PURE__ */ jsx(CountryDropdown, { url: searchUrl })
  ] });
};
const Divider$1 = () => {
  return /* @__PURE__ */ jsx("div", { className: "hidden h-5 w-px bg-gray-700/30 sm:block" });
};

const Logo = () => {
  const date = /* @__PURE__ */ new Date();
  const isXmas = date.getMonth() === 11 && date.getDate() <= 25;
  const logoPath = isXmas ? "https://www.ssw.com.au/images/ssw-logo-xmas.svg" : "https://www.ssw.com.au/images/ssw-logo.svg";
  return /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsx(
      CustomImage,
      {
        src: logoPath,
        alt: "SSW - Enterprise Software Development",
        height: 60,
        width: 100,
        className: "h-full"
      }
    ),
    /* @__PURE__ */ jsx("span", { className: "sr-only", children: "SSW" })
  ] });
};

function ChevronRightIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /*#__PURE__*/React.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/React.createElement("title", {
    id: titleId
  }, title) : null, /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    d: "M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z",
    clipRule: "evenodd"
  }));
}
const ForwardRef = React.forwardRef(ChevronRightIcon);
const ChevronRightIcon$1 = ForwardRef;

const MobileMenu = ({
  isMobileMenuOpen,
  menuBarItems,
  closeMobileMenu,
  setSearchTerm,
  searchTerm,
  performSearch
}) => {
  const [selectedMenuItem, setSelectedMenuItem] = React__default.useState(null);
  const onCloseMobileMenu = () => {
    setSelectedMenuItem(null);
    closeMobileMenu();
  };
  return /* @__PURE__ */ jsxs(
    Dialog,
    {
      as: "div",
      open: isMobileMenuOpen,
      onClose: () => onCloseMobileMenu(),
      children: [
        /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-10" }),
        /* @__PURE__ */ jsxs(Dialog.Panel, { className: "fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white sm:max-w-sm sm:ring-1 sm:ring-ssw-black/10", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex h-16 flex-row-reverse", children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                className: "p-4 text-gray-700",
                onClick: () => onCloseMobileMenu(),
                children: [
                  /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close menu" }),
                  /* @__PURE__ */ jsx(MegaIcon, { icon: "xMark", className: "h-6 w-6" })
                ]
              }
            ),
            selectedMenuItem && /* @__PURE__ */ jsx("div", { className: "my-auto flex grow items-center pl-2", children: /* @__PURE__ */ jsxs(
              "button",
              {
                className: "text-sm font-semibold leading-4 text-ssw-black",
                onClick: () => setSelectedMenuItem(null),
                children: [
                  /* @__PURE__ */ jsx(MegaIcon, { className: "mb-1 inline h-5 w-5", icon: "chevronLeft" }),
                  /* @__PURE__ */ jsx("span", { className: "ml-2", children: selectedMenuItem.name })
                ]
              }
            ) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flow-root", children: selectedMenuItem && selectedMenuItem.menuColumns && selectedMenuItem.sidebarItems ? /* @__PURE__ */ jsx(
            SubMenuGroup,
            {
              menuColumns: selectedMenuItem.menuColumns,
              sidebarItems: selectedMenuItem.sidebarItems
            }
          ) : /* @__PURE__ */ jsx(
            MenuBarItems,
            {
              setSearchTerm,
              searchTerm,
              performSearch,
              menuBarItems,
              setSelectedMenuItem
            }
          ) })
        ] })
      ]
    }
  );
};
const MenuBarItems = ({
  menuBarItems,
  setSelectedMenuItem,
  performSearch,
  setSearchTerm,
  searchTerm
}) => {
  const CustomLink = useLinkComponent();
  return /* @__PURE__ */ jsxs("div", { className: "-my-6 flex flex-col gap-4 pl-6", children: [
    /* @__PURE__ */ jsx("div", { className: "space-y-2", children: menuBarItems.map((item) => {
      return item.url ? /* @__PURE__ */ jsx(
        CustomLink,
        {
          href: item.url,
          className: "-mx-3 flex w-full items-center px-3 py-2 text-left text-lg leading-7 text-ssw-black hover:text-ssw-red",
          children: item.name
        },
        item.name
      ) : /* @__PURE__ */ jsxs(
        "button",
        {
          className: "-mx-3 flex w-full items-center px-3 py-2 text-left text-lg leading-7 text-ssw-black hover:text-ssw-red",
          onClick: () => setSelectedMenuItem(item),
          children: [
            item.name,
            /* @__PURE__ */ jsx(
              ChevronRightIcon$1,
              {
                className: "ml-2 inline h-4 w-4 text-ssw-black",
                "aria-hidden": "true"
              }
            )
          ]
        },
        item.name
      );
    }) }),
    /* @__PURE__ */ jsx(
      SearchInput,
      {
        performSearch,
        setSearchTerm,
        searchTerm,
        className: "relative pr-6",
        inputClassName: "border-radius h-12 grow rounded-l-md border bg-transparent pl-11 text-ssw-black focus:ring-0 sm:text-sm"
      }
    )
  ] });
};

const MegaMenuContents = ({
  className = "",
  tagline,
  title,
  url,
  subtitle,
  searchUrl = DEFAULT_URL,
  menuBarItems,
  rightSideActionsOverride,
  callback
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const performSearch = (e) => {
    e.preventDefault();
    if (searchTerm) {
      if (callback) {
        callback(searchTerm);
      } else {
        const queryUrl = `https://www.google.com.au/search?q=site:${searchUrl}%20${encodeURIComponent(
          searchTerm
        )}`;
        window.open(queryUrl, "_blank");
      }
    }
  };
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { menuItems } = useMenuItems(menuBarItems);
  const CustomLink = useLinkComponent();
  const RightSideActions = rightSideActionsOverride;
  return /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: cx(
          className,
          "relative z-10 flex w-full items-center justify-center sm:h-[120px]"
        ),
        children: [
          /* @__PURE__ */ jsxs(
            "nav",
            {
              className: "flex h-full w-full items-center justify-between gap-x-1 overflow-hidden px-0 xs:gap-x-2",
              "aria-label": "Global",
              children: [
                /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsxs(CustomLink, { href: url || "/", className: "gap-1 whitespace-nowrap", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex min-w-[4rem] max-w-[14rem] items-center justify-center", children: [
                    /* @__PURE__ */ jsx(Logo, {}),
                    tagline && /* @__PURE__ */ jsx("div", { className: "w-fit whitespace-break-spaces text-xs font-semibold uppercase leading-3 text-gray-700", children: /* @__PURE__ */ jsx("span", { className: "ml-3 hidden xl:block", children: tagline }) }),
                    title && /* @__PURE__ */ jsx("div", { className: "mb-3 ml-2 mt-2 text-4xl leading-5", children: title })
                  ] }),
                  subtitle && /* @__PURE__ */ jsx("p", { className: "relative text-xs text-ssw-black opacity-70", children: subtitle })
                ] }) }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center xl:hidden", children: [
                  RightSideActions ? /* @__PURE__ */ jsx("div", { className: "max-sm:hidden", children: /* @__PURE__ */ jsx(RightSideActions, {}) }) : /* @__PURE__ */ jsx(PhoneButton, { className: "max-sm:hidden" }),
                  /* @__PURE__ */ jsx(CountryDropdown, {}),
                  /* @__PURE__ */ jsx(Divider, {}),
                  /* @__PURE__ */ jsxs(
                    "button",
                    {
                      type: "button",
                      className: "inline-flex items-center justify-center rounded-md px-1 text-gray-700 xs:px-4",
                      onClick: () => setMobileMenuOpen(true),
                      children: [
                        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Open main menu" }),
                        /* @__PURE__ */ jsx(Bars3Icon, { className: "h-6 w-6", "aria-hidden": "true" })
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx(
                  DesktopMenu,
                  {
                    setSearchTerm,
                    searchTerm,
                    performSearch,
                    searchUrl,
                    menuGroups: menuItems,
                    sideActionsOverride: rightSideActionsOverride,
                    callback
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            MobileMenu,
            {
              searchTerm,
              setSearchTerm,
              performSearch,
              isMobileMenuOpen,
              menuBarItems: menuItems,
              closeMobileMenu: () => setMobileMenuOpen(false)
            }
          )
        ]
      }
    ),
    RightSideActions ? /* @__PURE__ */ jsx("div", { className: "sm:hidden", children: /* @__PURE__ */ jsx(RightSideActions, {}) }) : /* @__PURE__ */ jsx(PhoneButton, { className: "flex-grow pb-4 sm:hidden" })
  ] });
};
const Divider = () => {
  return /* @__PURE__ */ jsx("div", { className: "h-4 w-px bg-gray-700/30 sm:block" });
};
const MegaMenuLayout = ({
  children,
  ...props
}) => {
  return /* @__PURE__ */ jsx(LinkProvider, { linkComponent: props.linkComponent, children: /* @__PURE__ */ jsx(MegaMenuContents, { ...props, children }) });
};

const availableWidgets = [
  "standardLink",
  "featured",
  "bookNow"
];

export { MegaMenuLayout, availableWidgets, countryMap, iconMap };
