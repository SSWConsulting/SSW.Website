"use client";

import { useReducedMotion } from "framer-motion";

/**
 * Atom composition for the React Consulting v3 hero RHS.
 *
 * Owns the full relationship between the three source SVGs:
 *  - Hero-Atom.svg     -> the three orbital rings (static base layer)
 *  - Hero-Atom-Nucleus -> the centre dot (subtle pulse)
 *  - Hero-Atom-Electron -> dots that travel along each ring (orbit)
 *
 * Everything is inlined into a single SVG so the electrons can follow the
 * real ring paths in SVG coordinate space (via <animateMotion><mpath/>),
 * which a transform-based orbit can't do for tilted ellipses.
 */

// Ring paths lifted straight from Hero-Atom.svg (viewBox 0 0 338 300).
const RINGS = [
  "M168.773 211.474C261.155 211.474 336.045 183.797 336.045 149.655C336.045 115.514 261.155 87.8371 168.773 87.8371C76.3906 87.8371 1.5 115.514 1.5 149.655C1.5 183.797 76.3906 211.474 168.773 211.474Z",
  "M115.237 180.564C161.428 260.569 222.842 311.588 252.409 294.517C281.977 277.446 268.5 198.751 222.309 118.745C176.118 38.7402 114.704 -12.2785 85.1367 4.79214C55.5696 21.8628 69.0459 100.558 115.237 180.564Z",
  "M115.237 118.745C69.0456 198.75 55.5693 277.446 85.1365 294.516C114.704 311.587 176.118 260.568 222.309 180.563C268.5 100.558 281.976 21.862 252.409 4.79133C222.842 -12.2793 161.428 38.7394 115.237 118.745Z",
];

// Atom centre within the viewBox (where the nucleus sits).
const CENTRE = { x: 168.773, y: 149.655 };

// Start point of each ring path — where electrons rest under reduced motion.
const RING_STARTS = [
  { x: 168.773, y: 211.474 },
  { x: 115.237, y: 180.564 },
  { x: 115.237, y: 118.745 },
];

const RING_COLOUR = "#CC4141";
const ELECTRON_COLOUR = "#DA7373";

export default function ReactConsultingHeroMedia() {
  const reduceMotion = useReducedMotion();

  return (
    <svg
      viewBox="0 0 338 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Animated atom illustrating React's component model"
      className="h-auto w-full max-w-[420px] overflow-visible"
    >
      {/* Static orbital rings */}
      {RINGS.map((d, i) => (
        <path
          key={i}
          id={`hero-atom-ring-${i}`}
          d={d}
          stroke={RING_COLOUR}
          strokeOpacity={0.6}
          strokeWidth={3}
        />
      ))}

      {/* Nucleus */}
      <circle cx={CENTRE.x} cy={CENTRE.y} r={20} fill={RING_COLOUR}>
        {!reduceMotion && (
          <animate
            attributeName="r"
            values="20;22.5;20"
            dur="3s"
            repeatCount="indefinite"
            calcMode="spline"
            keyTimes="0;0.5;1"
            keySplines="0.4 0 0.6 1;0.4 0 0.6 1"
          />
        )}
      </circle>

      {/* Electrons — one per ring, staggered so they don't bunch up */}
      {RINGS.map((_, i) =>
        reduceMotion ? (
          // Reduced motion: park each electron at its ring's start point.
          <circle
            key={i}
            cx={RING_STARTS[i].x}
            cy={RING_STARTS[i].y}
            r={10}
            fill={ELECTRON_COLOUR}
          />
        ) : (
          <circle key={i} r={10} fill={ELECTRON_COLOUR}>
            <animateMotion
              dur={`${6 + i}s`}
              begin={`-${i * 2}s`}
              repeatCount="indefinite"
              rotate="auto"
            >
              <mpath href={`#hero-atom-ring-${i}`} />
            </animateMotion>
          </circle>
        )
      )}
    </svg>
  );
}
