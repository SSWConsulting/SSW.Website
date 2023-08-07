import { default as classNames, default as cs } from "classnames";
import Link from "next/link";
import { SVGAttributes, useRef } from "react";
import { Template } from "tinacms";
import { useHover } from "usehooks-ts";

const Badge = (
  props: {
    name?: string;
    size?: number;
    cx: number;
    cy: number;
    rotate?: number;
    img?: string;
  } & SVGAttributes<SVGCircleElement>
) => {
  const { name, size, cx, cy, rotate, img, ...rest } = props;
  const edge = +Math.sqrt(2).toFixed(1) * size;

  return (
    <g
      transform={`rotate(${rotate ?? 0} ${cx} ${cy})`}
      className={cs("animate-badge-bounce cursor-pointer")}
    >
      <defs>
        <pattern
          id={`${name}-image`}
          patternContentUnits="objectBoundingBox"
          height="100%"
          width="100%"
        >
          <image height={1} width={1} xlinkHref={img}></image>
        </pattern>
      </defs>
      <circle
        id={name}
        aria-label={name}
        {...rest}
        cx={cx}
        cy={cy}
        r={size}
        fill="white"
      ></circle>
      <rect
        x={cx - edge / 2}
        y={cy - edge / 2}
        width={edge}
        height={edge}
        fill={`url(#${name}-image)`}
      />
    </g>
  );
};

export const LatestTech = ({ data }) => {
  const ref = useRef(null);
  const isHover = useHover(ref);

  return (
    <div className="relative h-70 overflow-hidden bg-gray-50 p-6">
      <span className="relative z-10 font-helvetica text-3xl font-medium text-sswRed">
        We talk about <Link href={data?.link ?? ""}>latest tech</Link>
      </span>
      <div
        className="absolute -bottom-3 -left-4 h-62 w-full select-none bg-waveBackground bg-contain bg-left bg-no-repeat"
        ref={(el: HTMLDivElement) => {
          ref.current = el;
        }}
      >
        <svg viewBox="0 0 788 248" className={classNames("h-62 max-w-3xl")}>
          <g id="badges">
            <Badge
              size={35}
              cx={35}
              cy={140}
              rotate={-11}
              name="azure"
              img={"/images/badges/Azure_Badge.png"}
            />
            <Badge
              name="powerapp"
              size={25}
              cx={114}
              cy={207}
              rotate={-8.5}
              img="/images/badges/PowerApp_Badge.png"
            />
            <Badge
              name="angular"
              size={43}
              cx={190}
              cy={135}
              rotate={-5}
              img="/images/badges/Angular_Badge.png"
            />
            <Badge name="azure-devops" size={30} cx={291} cy={215} />
            <Badge
              name="react"
              size={34}
              cx={320}
              cy={80}
              img="/images/badges/React_Badge.png"
            />
            <Badge
              name="sharepoint"
              size={31}
              cx={406}
              cy={183}
              rotate={19.5}
              img="/images/badges/Sharepoint_Badge.png"
            />
            <Badge
              name="blazor"
              size={41}
              cx={478}
              cy={60}
              img="/images/badges/Blazor_Badge.png"
            />
            <Badge name="gpt" size={38} cx={547} cy={208} />
            <Badge name="h5" size={29} cx={625} cy={119} />
            <Badge name="angular2" size={29} cx={689} cy={46} />
            <Badge name="maui" size={29} cx={737} cy={163} rotate={-12} />
          </g>
        </svg>
      </div>
    </div>
  );
};

export const latestTechSchema: Template = {
  name: "LatestTech",
  label: "Latest Tech",
  fields: [
    {
      type: "string",
      label: "Latest Tech Link",
      name: "link",
    },
    {
      type: "object",
      list: true,
      label: "Badges",
      name: "badges",
      fields: [
        {
          type: "string",
          label: "Name",
          name: "name",
        },
        {
          type: "image",
          label: "Image",
          name: "image",
        },
      ],
    },
  ],
};
