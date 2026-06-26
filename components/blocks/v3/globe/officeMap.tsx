"use client";
import { cn } from "@/lib/utils";
// Installed via: pnpm dlx shadcn@latest add @magicui/dotted-map
import { DottedMap, type Marker } from "@/components/ui/dotted-map";

type Office = { lat?: number; lng?: number };

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

  const markers: Marker[] = pinned.map((o) => ({
    lat: o.lat as number,
    lng: o.lng as number,
  }));

  return (
    <DottedMap
      width={150}
      height={75}
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
      renderMarkerOverlay={({ index, x, y, r }) =>
        index === selectedPinnedIndex ? (
          // Rendered inside the SVG, so this must be an SVG element.
          <circle cx={x} cy={y} r={r * 1.5} fill="#cc4141" />
        ) : null
      }
    />
  );
}
