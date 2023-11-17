import {
  ChevronDownIcon,
  ChevronLeftIcon,
  MagnifyingGlassIcon,
  PhoneIcon,
  PlayCircleIcon,
  RectangleGroupIcon,
} from "@heroicons/react/20/solid";
import {
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { AvailableIcons } from "../../../types/megamenu";
import { AIDevelopment } from "./icons/AIDevelopment";
import { ApplicationDevelopment } from "./icons/ApplicationDevelopment";
import { CloudAndInfrastructure } from "./icons/CloudAndInfrastructure";
import { CodeAuditor } from "./icons/CodeAuditor";
import { DatabaseDevelopment } from "./icons/DatabaseDevelopment";
import { LinkAuditor } from "./icons/LinkAuditor";
import { MobileDevelopment } from "./icons/MobileDevelopment";
import { OtherSSWService } from "./icons/OtherSSWService";
import { PlatformDevelopment } from "./icons/PlatformDevelopment";
import { SSWRewards } from "./icons/SSWRewards";
import { SmashingBarrier } from "./icons/SmashingBarrier";
import { SophieBot } from "./icons/SophieBot";
import { SophieHub } from "./icons/SophieHub";
import { SugarLearning } from "./icons/SugarLearning";
import { TimePro } from "./icons/TimePro";
import { UIUXDesign } from "./icons/UIUXDesign";
import { VideoProduction } from "./icons/VideoProduction";
import { WebsiteDevelopment } from "./icons/WebsiteDevelopment";

type IconMapType = {
  [key in AvailableIcons]: (props: { className?: string }) => JSX.Element;
};

const iconMap: IconMapType = {
  chevronDown: (props) => <ChevronLeftIcon className={props.className} />,
  chevronLeft: (props) => <ChevronDownIcon className={props.className} />,
  magnifyingGlass: (props) => (
    <MagnifyingGlassIcon className={props.className} />
  ),
  phone: (props) => <PhoneIcon className={props.className} />,
  xMark: (props) => <XMarkIcon className={props.className} />,
  chartPie: (props) => <ChartPieIcon className={props.className} />,
  cursorArrowRays: (props) => (
    <CursorArrowRaysIcon className={props.className} />
  ),
  fingerPrint: (props) => <FingerPrintIcon className={props.className} />,
  squaresPlus: (props) => <SquaresPlusIcon className={props.className} />,
  playCircle: (props) => <PlayCircleIcon className={props.className} />,
  rectangleGroup: (props) => <RectangleGroupIcon className={props.className} />,
  websiteDevelopment: () => <WebsiteDevelopment />,
  applicationDevelopment: () => <ApplicationDevelopment />,
  mobileDevelopment: () => <MobileDevelopment />,
  aiDevelopment: () => <AIDevelopment />,
  databaseDevelopment: () => <DatabaseDevelopment />,
  platformDevelopment: () => <PlatformDevelopment />,
  videoProduction: () => <VideoProduction />,
  sugarLearning: () => <SugarLearning />,
  codeAuditor: () => <CodeAuditor />,
  linkAuditor: () => <LinkAuditor />,
  smashingBarrier: () => <SmashingBarrier />,
  timePro: () => <TimePro />,
  sophieBot: () => <SophieBot />,
  sswRewards: () => <SSWRewards />,
  sophieHub: () => <SophieHub />,
  uiUXDesign: () => <UIUXDesign />,
  cloudAndInfrastructure: () => <CloudAndInfrastructure />,
  otherSSWService: () => <OtherSSWService />,
};

export interface MegaIconProps extends React.ComponentPropsWithoutRef<"span"> {
  icon: AvailableIcons;
}

const MegaIconMapper = (props: MegaIconProps) => {
  const Icon = iconMap[props.icon];

  if (!Icon) {
    return <></>;
  }

  return <Icon {...props} />;
};

const MegaIcon: React.FC<MegaIconProps> = ({ icon, ...props }) => {
  //if icon is an SVGElement, just return it with props spread into it
  // if (icon instanceof SVGElement) {
  //   return <span {...props}>{icon}</span>;
  // }

  return (
    <>
      <span className="sr-only">{icon}</span>
      <MegaIconMapper aria-hidden="true" icon={icon} {...props} />
    </>
  );
};

export default MegaIcon;
