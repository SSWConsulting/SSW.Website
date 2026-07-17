const BASE = "#cc4141";
const DARK = "#8e2c2c";
const DEEP = "#5f1b1b";
const LIGHT = "#cc4141";
const SMOKE = "#cc4141";

const svgProps = {
  className: "pointer-events-none absolute inset-0 size-full",
  viewBox: "0 0 400 400",
  preserveAspectRatio: "xMidYMid slice",
  "aria-hidden": true,
} as const;

// SVG def ids are derived from the card index (stable + deterministic) rather
// than useId, whose tree-position-based value can differ between the server and
// client render and break hydration.
function SmokeTexture({ id }: { id: string }) {
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

function ContoursTexture({ id }: { id: string }) {
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

function AuroraTexture({ id }: { id: string }) {
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

function GrainTexture({ id }: { id: string }) {
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

const TEXTURES = [SmokeTexture, ContoursTexture, AuroraTexture, GrainTexture];

export function PersonCardTexture({ index }: { index: number }) {
  const Texture = TEXTURES[index % TEXTURES.length];
  return <Texture id={`person-texture-${index}`} />;
}
