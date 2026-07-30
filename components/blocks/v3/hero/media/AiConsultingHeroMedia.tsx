"use client";

import { useReducedMotion } from "framer-motion";

/**
 * Neural-network composition for the AI Consulting v3 hero RHS.
 *
 * Layers of nodes are fully connected; a handful of the resulting edges carry a
 * pulse that travels along the real path (via <animateMotion><mpath/>), so the
 * signal always tracks the line it belongs to.
 */

const LAYERS = [
  { x: 46, ys: [78, 150, 222] },
  { x: 169, ys: [50, 117, 183, 250] },
  { x: 292, ys: [110, 190] },
];

const EDGES = LAYERS.slice(0, -1).flatMap((layer, layerIndex) =>
  layer.ys.flatMap((y1) =>
    LAYERS[layerIndex + 1].ys.map((y2) => ({
      x1: layer.x,
      y1,
      x2: LAYERS[layerIndex + 1].x,
      y2,
    }))
  )
);

// Every third edge carries a pulse — enough movement to read as a live network
// without turning the whole graph into noise.
const PULSE_EDGES = EDGES.map((_, i) => i).filter((i) => i % 3 === 0);

const NODE_COLOUR = "#CC4141";
const PULSE_COLOUR = "#DA7373";

const glow = (colour: string) => ({ filter: `drop-shadow(0 0 8px ${colour})` });

export default function AiConsultingHeroMedia() {
  const reduceMotion = useReducedMotion();

  return (
    <svg
      viewBox="0 0 338 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Animated neural network illustrating custom AI models"
      className="h-auto w-full max-w-media overflow-visible"
    >
      {EDGES.map((edge, i) => (
        <path
          key={i}
          id={`hero-ai-edge-${i}`}
          d={`M${edge.x1} ${edge.y1}L${edge.x2} ${edge.y2}`}
          stroke={NODE_COLOUR}
          strokeOpacity={0.35}
          strokeWidth={1.5}
        />
      ))}

      {PULSE_EDGES.map((edgeIndex, i) =>
        reduceMotion ? null : (
          <circle
            key={edgeIndex}
            r={4}
            fill={PULSE_COLOUR}
            style={glow(PULSE_COLOUR)}
          >
            <animateMotion
              dur="2.8s"
              begin={`-${i * 0.45}s`}
              repeatCount="indefinite"
            >
              <mpath href={`#hero-ai-edge-${edgeIndex}`} />
            </animateMotion>
          </circle>
        )
      )}

      {LAYERS.map((layer, layerIndex) =>
        layer.ys.map((y, i) => {
          const radius = layerIndex === LAYERS.length - 1 ? 16 : 9;
          return (
            <circle
              key={`${layerIndex}-${i}`}
              cx={layer.x}
              cy={y}
              r={radius}
              fill={NODE_COLOUR}
              style={glow(NODE_COLOUR)}
            >
              {!reduceMotion && (
                <animate
                  attributeName="r"
                  values={`${radius};${radius + 2.5};${radius}`}
                  dur="3s"
                  begin={`-${(layerIndex + i) * 0.4}s`}
                  repeatCount="indefinite"
                  calcMode="spline"
                  keyTimes="0;0.5;1"
                  keySplines="0.4 0 0.6 1;0.4 0 0.6 1"
                />
              )}
            </circle>
          );
        })
      )}
    </svg>
  );
}
