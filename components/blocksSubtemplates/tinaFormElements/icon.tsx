"use client";
import React from "react";
import {
  BiAbacus,
  BiAddToQueue,
  BiAlarm,
  BiAnalyse,
  BiArrowFromLeft,
  BiArrowToTop,
  BiAtom,
  BiBarChart,
  BiBarChartAlt2,
  BiBookOpen,
  BiBot,
  BiBrain,
  BiBuildings,
  BiBulb,
  BiBuoy,
  BiCalendar,
  BiCheck,
  BiCheckDouble,
  BiCheckShield,
  BiChevronRight,
  BiChip,
  BiCloud,
  BiCloudLightning,
  BiCloudUpload,
  BiCodeCurly,
  BiCog,
  BiCoinStack,
  BiCollapse,
  BiColor,
  BiCommentCheck,
  BiCrosshair,
  BiCurrentLocation,
  BiData,
  BiDesktop,
  BiDiamond,
  BiDirections,
  BiDollar,
  BiDollarCircle,
  BiDoorOpen,
  BiExpand,
  BiFingerprint,
  BiGitBranch,
  BiGitPullRequest,
  BiGlobe,
  BiGrid,
  BiHdd,
  BiLineChart,
  BiLogoDocker,
  BiLogoGithub,
  BiLogoKubernetes,
  BiLogoMicrosoft,
  BiLogoMongodb,
  BiLogoPostgresql,
  BiLogoReact,
  BiMapPin,
  BiMoneyWithdraw,
  BiNetworkChart,
  BiPaperPlane,
  BiPhone,
  BiRecycle,
  BiRocket,
  BiSearch,
  BiServer,
  BiShieldAlt2,
  BiShuffle,
  BiSkipNext,
  BiSolidBarChartAlt2,
  BiSolidBolt,
  BiSolidBong,
  BiSolidBookBookmark,
  BiSolidBookContent,
  BiSolidBrain,
  BiSolidBuildings,
  BiSolidBulb,
  BiSolidCheckShield,
  BiSolidCloud,
  BiSolidCog,
  BiSolidContact,
  BiSolidCustomize,
  BiSolidData,
  BiSolidDollarCircle,
  BiSolidError,
  BiSolidFileJs,
  BiSolidGroup,
  BiSolidHelpCircle,
  BiSolidHide,
  BiSolidLock,
  BiSolidLockAlt,
  BiSolidMedal,
  BiSolidQuoteAltLeft,
  BiSolidQuoteLeft,
  BiSolidReport,
  BiSolidRocket,
  BiSolidShieldAlt2,
  BiSolidStar,
  BiSolidUserCheck,
  BiSolidWrench,
  BiStore,
  BiSupport,
  BiTachometer,
  BiUserVoice,
} from "react-icons/bi";
import { SiAudiobookshelf } from "react-icons/si";
import { VscCommentDiscussion, VscDashboard } from "react-icons/vsc";

// Icons are imported by name — never `import * as X` + spread. The lookup
// below (`IconOptions[name]`) is a dynamic string access, so a namespace
// import forces the bundler to retain every icon in the set: that shipped
// all ~3,300 Simple Icons (4.76 MB) to serve the single one this site uses.
// Only icons referenced in `content/` belong here — picking a new icon in
// the CMS means adding its named import above.
export const IconOptions = {
  Tina: (props) => (
    <svg
      {...props}
      viewBox="0 0 66 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Tina</title>
      <path
        d="M39.4615 36.1782C42.763 33.4475 44.2259 17.3098 45.6551 11.5091C47.0843 5.70828 52.995 6.0025 52.995 6.0025C52.995 6.0025 51.4605 8.67299 52.0864 10.6658C52.7123 12.6587 57 14.4401 57 14.4401L56.0752 16.8781C56.0752 16.8781 54.1441 16.631 52.995 18.9297C51.8459 21.2283 53.7336 43.9882 53.7336 43.9882C53.7336 43.9882 46.8271 57.6106 46.8271 63.3621C46.8271 69.1136 49.5495 73.9338 49.5495 73.9338H45.7293C45.7293 73.9338 40.1252 67.2648 38.9759 63.9318C37.8266 60.5988 38.2861 57.2658 38.2861 57.2658C38.2861 57.2658 32.1946 56.921 26.7931 57.2658C21.3915 57.6106 17.7892 62.2539 17.1391 64.8512C16.4889 67.4486 16.2196 73.9338 16.2196 73.9338H13.1991C11.3606 68.2603 9.90043 66.2269 10.6925 63.3621C12.8866 55.4269 12.4557 50.9263 11.9476 48.9217C11.4396 46.9172 8 45.1676 8 45.1676C9.68492 41.7349 11.4048 40.0854 18.8029 39.9133C26.201 39.7413 36.1599 38.9088 39.4615 36.1782Z"
        fill="currentColor"
      />
      <path
        d="M20.25 63.03C20.25 63.03 21.0305 70.2533 25.1773 73.9342H28.7309C25.1773 69.9085 24.7897 59.415 24.7897 59.415C22.9822 60.0035 20.4799 62.1106 20.25 63.03Z"
        fill="currentColor"
      />
    </svg>
  ),
  BiAbacus,
  BiAddToQueue,
  BiAlarm,
  BiAnalyse,
  BiArrowFromLeft,
  BiArrowToTop,
  BiAtom,
  BiBarChart,
  BiBarChartAlt2,
  BiBookOpen,
  BiBot,
  BiBrain,
  BiBuildings,
  BiBulb,
  BiBuoy,
  BiCalendar,
  BiCheck,
  BiCheckDouble,
  BiCheckShield,
  BiChevronRight,
  BiChip,
  BiCloud,
  BiCloudLightning,
  BiCloudUpload,
  BiCodeCurly,
  BiCog,
  BiCoinStack,
  BiCollapse,
  BiColor,
  BiCommentCheck,
  BiCrosshair,
  BiCurrentLocation,
  BiData,
  BiDesktop,
  BiDiamond,
  BiDirections,
  BiDollar,
  BiDollarCircle,
  BiDoorOpen,
  BiExpand,
  BiFingerprint,
  BiGitBranch,
  BiGitPullRequest,
  BiGlobe,
  BiGrid,
  BiHdd,
  BiLineChart,
  BiLogoDocker,
  BiLogoGithub,
  BiLogoKubernetes,
  BiLogoMicrosoft,
  BiLogoMongodb,
  BiLogoPostgresql,
  BiLogoReact,
  BiMapPin,
  BiMoneyWithdraw,
  BiNetworkChart,
  BiPaperPlane,
  BiPhone,
  BiRecycle,
  BiRocket,
  BiSearch,
  BiServer,
  BiShieldAlt2,
  BiShuffle,
  BiSkipNext,
  BiSolidBarChartAlt2,
  BiSolidBolt,
  BiSolidBong,
  BiSolidBookBookmark,
  BiSolidBookContent,
  BiSolidBrain,
  BiSolidBuildings,
  BiSolidBulb,
  BiSolidCheckShield,
  BiSolidCloud,
  BiSolidCog,
  BiSolidContact,
  BiSolidCustomize,
  BiSolidData,
  BiSolidDollarCircle,
  BiSolidError,
  BiSolidFileJs,
  BiSolidGroup,
  BiSolidHelpCircle,
  BiSolidHide,
  BiSolidLock,
  BiSolidLockAlt,
  BiSolidMedal,
  BiSolidQuoteAltLeft,
  BiSolidQuoteLeft,
  BiSolidReport,
  BiSolidRocket,
  BiSolidShieldAlt2,
  BiSolidStar,
  BiSolidUserCheck,
  BiSolidWrench,
  BiStore,
  BiSupport,
  BiTachometer,
  BiUserVoice,
  SiAudiobookshelf,
  VscCommentDiscussion,
  VscDashboard,
};

// `label` opts an icon into being announced (role="img"); without it the icon
// is decorative and hidden from assistive tech, since every icon here sits
// beside its own visible text label.
export const Icon = ({ data, className = "", tinaField = "", label = "" }) => {
  if (IconOptions[data.name] === null || IconOptions[data.name] === undefined) {
    return <></>;
  }

  const { name } = data;

  const IconSVG = IconOptions[name];

  return (
    <IconSVG
      data-tina-field={tinaField}
      className={`${className} shrink-0`}
      focusable="false"
      {...(label
        ? {
            role: "img",
            "aria-label": label,
            "aria-hidden": "false",
            title: label,
          }
        : { "aria-hidden": "true" })}
    />
  );
};
