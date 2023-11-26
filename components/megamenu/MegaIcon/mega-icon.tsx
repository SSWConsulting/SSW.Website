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

export const iconMap = {
  chevronDown: (props) => <ChevronDownIcon className={props.className} />,
  chevronLeft: (props) => <ChevronLeftIcon className={props.className} />,
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
