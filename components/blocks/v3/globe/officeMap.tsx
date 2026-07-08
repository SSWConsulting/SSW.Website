"use client";
import { cn } from "@/lib/utils";
// Installed via: pnpm dlx shadcn@latest add @magicui/dotted-map
import { DottedMap, type Marker } from "@/components/ui/dotted-map";
import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";
import { createMap } from "svg-dotted-map";

type Office = { name?: string; lat?: number; lng?: number };

const MAP_W = 150;
const MAP_H = 75;
const MAP_REGION = {
  lat: { min: -56, max: 78 },
  lng: { min: -179, max: 179 },
};
const SELECTED_ZOOM = 1.35;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function OfficeMap({
  offices,
  selectedIndex,
  className,
}: {
  offices: Office[];
  selectedIndex: number;
  className?: string;
}) {
  const pinned = useMemo(
    () =>
      offices.filter(
        (o) => typeof o?.lat === "number" && typeof o?.lng === "number"
      ),
    [offices]
  );
  // Map the selected office back to its index within the pinned subset.
  const selectedOffice = offices[selectedIndex];
  const selectedName = selectedOffice?.name ?? "";
  const shouldReduceMotion = useReducedMotion();

  const markerEntries = useMemo(
    () =>
      pinned
        .map((o) => ({
          marker: {
            lat: o.lat as number,
            lng: o.lng as number,
          },
          isSelected: o === selectedOffice,
        }))
        .sort((a, b) => Number(a.isSelected) - Number(b.isSelected)),
    [pinned, selectedOffice]
  );

  const markers: Marker[] = useMemo(
    () => markerEntries.map((entry) => entry.marker),
    [markerEntries]
  );
  const selectedMarkerIndex = markerEntries.findIndex(
    (entry) => entry.isSelected
  );

  const selectedPoint = useMemo(() => {
    if (
      typeof selectedOffice?.lat !== "number" ||
      typeof selectedOffice?.lng !== "number"
    ) {
      return null;
    }

    const { addMarkers } = createMap({
      width: MAP_W,
      height: MAP_H,
      mapSamples: 2000,
      region: MAP_REGION,
    });

    return addMarkers([
      {
        lat: selectedOffice.lat,
        lng: selectedOffice.lng,
      },
    ])[0];
  }, [selectedOffice]);

  const zoom = selectedPoint && !shouldReduceMotion ? SELECTED_ZOOM : 1;
  const maxPan = ((zoom - 1) * 100) / 2;
  const x = selectedPoint
    ? `${clamp(zoom * (50 - (selectedPoint.x / MAP_W) * 100), -maxPan, maxPan)}%`
    : "0%";
  const y = selectedPoint
    ? `${clamp(zoom * (50 - (selectedPoint.y / MAP_H) * 100), -maxPan, maxPan)}%`
    : "0%";

  return (
    <div className="size-full overflow-visible">
      <motion.div
        className="size-full origin-center"
        animate={{ scale: zoom, x, y }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <DottedMap
          width={MAP_W}
          height={MAP_H}
          mapSamples={8000}
          markers={markers}
          dotColor="#3f3f46"
          markerColor="#a1a1aa"
          dotRadius={0.35}
          // Aligned grid (not the honeycomb default) to match the design.
          stagger={false}
          // Extend the northern bound past svg-dotted-map's 71° default so the top
          // of the Northern Hemisphere isn't clipped.
          region={MAP_REGION}
          className={cn("size-full overflow-visible", className)}
          renderMarkerOverlay={({ index, x, y, r }) => {
            if (index !== selectedMarkerIndex) return null;
            // Rendered inside the SVG (viewBox units), so all of this is SVG.
            const pinR = r * 1.5;
            const fs = 3.2;
            const padX = 2;
            const padY = 1;
            const ptr = 1.3; // pointer height
            const gap = 0.6;
            const labelH = fs + padY * 2;
            const labelW = Math.max(
              selectedName.length * fs * 0.58 + padX * 2,
              7
            );
            const pointerTipY = y - pinR - gap;
            const pillBottomY = pointerTipY - ptr;
            const pillTopY = pillBottomY - labelH;
            // Keep the pill inside the viewBox (the root SVG clips), then slant the
            // pointer so it still reaches the pin when the pill is shifted.
            const edge = 1;
            const pillX = Math.min(
              Math.max(x - labelW / 2, edge),
              MAP_W - labelW - edge
            );
            const baseX = Math.min(Math.max(x, pillX + 3), pillX + labelW - 3);
            return (
              <g>
                {selectedName && (
                  <>
                    {/* Google-Maps-style label above the pin */}
                    <rect
                      x={pillX}
                      y={pillTopY}
                      width={labelW}
                      height={labelH}
                      rx={labelH / 2}
                      fill="#ffffff"
                    />
                    <path
                      d={`M ${baseX - 2} ${pillBottomY - 0.2} L ${baseX + 2} ${pillBottomY - 0.2} L ${x} ${pointerTipY} Z`}
                      fill="#ffffff"
                    />
                    <text
                      x={pillX + labelW / 2}
                      y={pillTopY + labelH / 2}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize={fs}
                      fontWeight="600"
                      fill="#111111"
                    >
                      {selectedName}
                    </text>
                  </>
                )}
                <circle cx={x} cy={y} r={pinR} fill="#cc4141" />
              </g>
            );
          }}
        />
      </motion.div>
    </div>
  );
}
