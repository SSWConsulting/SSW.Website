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
  chinaFlag: () => <Flag country="China" className="mr-2" />,
};

const MegaIconMapper = ({
  icon,
  className,
}: {
  icon: AvailableIcons;
  className?: string;
}) => {
  const Icon = iconMap[icon];

  if (!Icon) {
    return <></>;
  }

  return <Icon icon={icon} className={className} />;
};

export interface MegaIconProps {
  // TODO: implement below intended solution extends React.ComponentPropsWithoutRef<"span"> {
  iconImg?: string;
  icon?: AvailableIcons;
  className?: string;
}

const MegaIcon: React.FC<MegaIconProps> = ({ icon, iconImg, className }) => {
  //if icon is an SVGElement, just return it with props spread into it
  // if (icon instanceof SVGElement) {
  //   return <span {...props}>{icon}</span>;
  // }

  if (!iconImg) {
    return (
      <>
        <span className="sr-only">{icon}</span>
        <MegaIconMapper aria-hidden="true" icon={icon} className={className} />
      </>
    );
  }

  return (
    <div>
      <Image
        className="size-5"
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
