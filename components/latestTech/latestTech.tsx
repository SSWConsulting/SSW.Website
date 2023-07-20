import { default as classNames, default as cs } from "classnames";
import { memo, useRef } from "react";
import { Template } from "tinacms";
import { useElementSize, useHover } from "usehooks-ts";
import styles from "./latestTech.module.css";

const WaveBg = memo(() => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 768 170"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="bg">
        <path
          d="M-3.78906 70.6063C0.161537 79.7717 22.4745 98.2921 80.1217 99.0506C152.181 99.9988 201.01 70.6063 255.054 77.2433C309.098 83.8803 372.15 138.399 502.994 125.125C633.838 111.851 674.71 22.8191 707.793 7.08066C732.208 -4.53414 759.941 8.97695 768 13.2436"
          stroke="#F5F5F5"
          strokeWidth="4"
        />
        <path
          d="M-3.78906 90.1795C0.161537 99.3449 22.4745 117.865 80.1217 118.624C152.181 119.572 201.01 90.1795 255.054 96.8166C309.098 103.454 372.15 157.972 502.994 144.698C633.838 131.424 674.71 42.3924 707.793 26.6539C732.208 15.0391 759.941 28.5502 768 32.8168"
          stroke="#F5F5F5"
          strokeWidth="4"
        />
        <path
          d="M-3.78906 110.902C0.161537 120.068 22.4745 138.588 80.1217 139.347C152.181 140.295 201.01 110.902 255.054 117.539C309.098 124.176 372.15 178.695 502.994 165.421C633.838 152.146 674.71 63.115 707.793 47.3766C732.208 35.7618 759.941 49.2728 768 53.5395"
          stroke="#F5F5F5"
          strokeWidth="4"
        />
      </g>
    </svg>
  );
});

const Badge = ({
  name,
  size,
  cx,
  cy,
}: {
  name?: string;
  size?: number;
  cx: number;
  cy: number;
}) => {
  return (
    <g
      id={name}
      width={size}
      height={size}
      viewBox={`0 0 ${size * 2} ${size * 2}`}
      className={cs("cursor-pointer")}
    >
      <circle cx={cx} cy={cy} r={size} fill="white"></circle>
    </g>
  );
};

const FloatingBadges = () => {
  const [sizeRef, { width, height }] = useElementSize();
  const ref = useRef(null);
  const isHover = useHover(ref);

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      ref={(el: HTMLDivElement) => {
        ref.current = el;
        sizeRef(el);
      }}
    >
      <svg
        width="2600"
        height="100%"
        className={classNames(
          styles.badge,
          !isHover ? styles.start : styles.pause
        )}
      >
        <g id="badges" x={0} y={0}>
          <Badge name="azure" size={40} cx={40} cy={150} />
          <Badge name="powerapp" size={30} cx={140} cy={220} />
          <Badge name="angular" size={50} cx={240} cy={145} />
          <Badge name="azure-devops" size={35} cx={330} cy={225} />
          <Badge name="react" size={35} cx={350} cy={100} />
          <Badge name="sheet?" size={35} cx={435} cy={200} />
          <Badge name="blazor" size={40} cx={510} cy={100} />
          <Badge name="gpt" size={50} cx={610} cy={220} />
          <Badge name="h5" size={30} cx={720} cy={150} />
          <Badge name="angular2" size={30} cx={780} cy={90} />
          <Badge name="maui" size={30} cx={840} cy={200} />
          <Badge name="1" size={40} cx={950} cy={150} />
          <Badge name="2" size={30} cx={1050} cy={220} />
          <Badge name="3" size={50} cx={1150} cy={145} />
          <Badge name="4" size={35} cx={1240} cy={225} />
          <Badge name="5" size={40} cx={1260} cy={100} />
        </g>
        <use xlinkHref="#badges" x={1300} y={0} />
      </svg>
    </div>
  );
};

export const LatestTech = () => {
  return (
    <div className="relative h-64 max-w-7xl bg-gray-50">
      <WaveBg />
      <FloatingBadges />
    </div>
  );
};

export const latestTechSchema: Template = {
  name: "LatestTech",
  label: "Latest Tech",
  fields: [
    {
      type: "string",
      label: "name",
      name: "name",
      required: false,
    },
  ],
};
