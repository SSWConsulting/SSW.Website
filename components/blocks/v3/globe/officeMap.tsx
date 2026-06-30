"use client";
import { cn } from "@/lib/utils";
// Installed via: pnpm dlx shadcn@latest add @magicui/dotted-map
import { DottedMap, type Marker } from "@/components/ui/dotted-map";

type Office = { name?: string; lat?: number; lng?: number };

export function OfficeMap({
  offices,
  selectedIndex,
  className,
}: {
  offices: Office[];
  selectedIndex: number;
  className?: string;
}) {
  const pinned = offices.filter(
    (o) => typeof o?.lat === "number" && typeof o?.lng === "number"
  );
  // Map the selected office back to its index within the pinned subset.
  const selectedPinnedIndex = pinned.indexOf(offices[selectedIndex]);
  const selectedName = offices[selectedIndex]?.name ?? "";

  const markers: Marker[] = pinned.map((o) => ({
    lat: o.lat as number,
    lng: o.lng as number,
  }));

  const MAP_W = 150;
  const MAP_H = 75;

  return (
    <DottedMap
      width={MAP_W}
      height={MAP_H}
      mapSamples={2000}
      markers={markers}
      dotColor="#3f3f46"
      markerColor="#a1a1aa"
      dotRadius={0.8}
      // Aligned grid (not the honeycomb default) to match the design.
      stagger={false}
      // Extend the northern bound past svg-dotted-map's 71° default so the top
      // of the Northern Hemisphere isn't clipped.
      region={{ lat: { min: -56, max: 78 }, lng: { min: -179, max: 179 } }}
      className={cn("h-full w-full", className)}
      renderMarkerOverlay={({ index, x, y, r }) => {
        if (index !== selectedPinnedIndex) return null;
        // Rendered inside the SVG (viewBox units), so all of this is SVG.
        const pinR = r * 1.5;
        const fs = 4.5;
        const padX = 3;
        const padY = 1.8;
        const ptr = 2.2; // pointer height
        const gap = 0.6;
        const labelH = fs + padY * 2;
        const labelW = Math.max(selectedName.length * fs * 0.58 + padX * 2, 10);
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
        const baseX = Math.min(
          Math.max(x, pillX + 3),
          pillX + labelW - 3
        );
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
  );
}
