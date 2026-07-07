import { useId } from "react";

/* Decorative shader-style backgrounds for the people cards. Four hand-built
   SVG textures (smoke, contours, aurora, grain) in the SSW red family, so the
   cards hold the brand colour while neighbouring cards get visibly different
   textures. Variants are assigned by card index, so neighbouring cards never
   match and SSR and client always agree. */

const BASE = "#cc4141";
const DARK = "#8e2c2c";
const DEEP = "#5f1b1b";
const LIGHT = "#d26e6e";
const SMOKE = "#8f8a83";

const svgProps = {
  className: "pointer-events-none absolute inset-0 size-full",
  viewBox: "0 0 400 400",
  preserveAspectRatio: "xMidYMid slice",
  "aria-hidden": true,
} as const;

/* A desaturated wisp drifting over the red: thick strokes pushed through
   turbulence displacement, then heavily blurred. */
function SmokePattern() {
  const id = useId();
  return (
    <svg {...svgProps}>
      <defs>
        <radialGradient id={`${id}-shadow`}>
          <stop offset="0" stopColor={DEEP} stopOpacity="0.9" />
          <stop offset="1" stopColor={DEEP} stopOpacity="0" />
        </radialGradient>
        <filter id={`${id}-wisp`} x="-50%" y="-50%" width="200%" height="200%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012"
            numOctaves="3"
            seed="4"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="130"
            xChannelSelector="R"
            yChannelSelector="G"
          />
          <feGaussianBlur stdDeviation="15" />
        </filter>
      </defs>
      <rect width="400" height="400" fill={BASE} />
      <circle cx="320" cy="320" r="280" fill={`url(#${id}-shadow)`} />
      <g filter={`url(#${id}-wisp)`} fill="none" strokeLinecap="round">
        <path
          d="M-60 330 C 80 230, 150 370, 250 260 S 430 60 470 120"
          stroke={SMOKE}
          strokeWidth="85"
          opacity="0.55"
        />
        <path
          d="M-40 390 C 100 330, 220 430, 460 310"
          stroke={SMOKE}
          strokeWidth="55"
          opacity="0.3"
        />
      </g>
    </svg>
  );
}

const contourLines: Array<[y: number, opacity: number]> = [
  [30, 0.1],
  [75, 0.18],
  [120, 0.24],
  [165, 0.16],
  [210, 0.22],
  [255, 0.12],
  [300, 0.2],
  [345, 0.14],
];

/* Straight horizontal lines pushed through a flow field. */
function ContoursPattern() {
  const id = useId();
  return (
    <svg {...svgProps}>
      <defs>
        <filter id={`${id}-flow`} x="-40%" y="-40%" width="180%" height="180%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.006 0.012"
            numOctaves="3"
            seed="9"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="170"
            xChannelSelector="R"
            yChannelSelector="G"
          />
          <feGaussianBlur stdDeviation="0.6" />
        </filter>
        <radialGradient id={`${id}-vig`} cx="0.5" cy="1" r="1.1">
          <stop offset="0" stopColor={DEEP} stopOpacity="0.75" />
          <stop offset="1" stopColor={DEEP} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="400" fill={DARK} />
      <g
        filter={`url(#${id}-flow)`}
        fill="none"
        stroke={LIGHT}
        strokeWidth="2.5"
      >
        {contourLines.map(([y, opacity]) => (
          <path key={y} d={`M-60 ${y} L 460 ${y}`} opacity={opacity} />
        ))}
      </g>
      <rect width="400" height="400" fill={`url(#${id}-vig)`} />
    </svg>
  );
}

/* Blurred wave bands stacking light over deep. */
function AuroraPattern() {
  const id = useId();
  return (
    <svg {...svgProps}>
      <defs>
        <filter id={`${id}-soft`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="20" />
        </filter>
      </defs>
      <rect width="400" height="400" fill={DARK} />
      <g filter={`url(#${id}-soft)`}>
        <path
          d="M-50 120 C 100 50, 240 190, 470 70 L 470 -70 L -50 -70 Z"
          fill={SMOKE}
          opacity="0.2"
        />
        <path
          d="M-50 260 C 60 160, 180 330, 300 210 S 460 120 470 170 L 470 470 L -50 470 Z"
          fill={DEEP}
          opacity="0.85"
        />
        <path
          d="M-50 310 C 80 230, 220 370, 460 230 L 460 470 L -50 470 Z"
          fill={LIGHT}
          opacity="0.22"
        />
      </g>
    </svg>
  );
}

/* Quiet diagonal gradient under fine film grain. */
function GrainPattern() {
  const id = useId();
  return (
    <svg {...svgProps}>
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={BASE} />
          <stop offset="1" stopColor={DEEP} />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="0.78" cy="0.16" r="0.7">
          <stop offset="0" stopColor={LIGHT} stopOpacity="0.45" />
          <stop offset="1" stopColor={LIGHT} stopOpacity="0" />
        </radialGradient>
        <filter id={`${id}-noise`}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            seed="3"
            stitchTiles="stitch"
            result="noise"
          />
          <feColorMatrix
            in="noise"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0.7 0.7 0.7 0 0"
          />
        </filter>
      </defs>
      <rect width="400" height="400" fill={`url(#${id}-bg)`} />
      <rect width="400" height="400" fill={`url(#${id}-glow)`} />
      <rect
        width="400"
        height="400"
        filter={`url(#${id}-noise)`}
        opacity="0.4"
      />
    </svg>
  );
}

const PATTERNS = [SmokePattern, ContoursPattern, AuroraPattern, GrainPattern];

export function CardPattern({ index }: { index: number }) {
  const Pattern = PATTERNS[index % PATTERNS.length];
  return <Pattern />;
}
