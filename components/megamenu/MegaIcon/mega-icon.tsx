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
import Image from "next/image";
import React from "react";
import { AvailableIcons } from "../../../types/megamenu";
import { Flag } from "../../blocks";

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
  chinaFlag: () => <Flag country="China" />,
};

const MegaIconMapper = ({ icon }: { icon: AvailableIcons }) => {
  const Icon = iconMap[icon];

  if (!Icon) {
    return <></>;
  }

  return <Icon icon={icon} />;
};

export interface MegaIconProps extends React.ComponentPropsWithoutRef<"span"> {
  iconImg?: string;
  icon?: AvailableIcons;
}

const MegaIcon: React.FC<MegaIconProps> = ({ icon, iconImg, ...props }) => {
  //if icon is an SVGElement, just return it with props spread into it
  // if (icon instanceof SVGElement) {
  //   return <span {...props}>{icon}</span>;
  // }

  if (!iconImg) {
    return (
      <span {...props}>
        <span className="sr-only">{icon}</span>
        <MegaIconMapper aria-hidden="true" icon={icon} />
      </span>
    );
  }

  return (
    <div>
      <Image
        className="h-6 w-6"
        src={iconImg}
        alt={iconImg}
        width={20}
        height={20}
        aria-hidden="true"
      />
    </div>
  );
};

export default MegaIcon;
