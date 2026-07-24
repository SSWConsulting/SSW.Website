"use client";
import { cn } from "@/lib/utils";
import createGlobe, { type Arc, type Marker } from "cobe";
import {
  type CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";

type Office = {
  name?: string;
  lat?: number;
  lng?: number;
  address?: string;
};
type MarkerTagStyle = CSSProperties & { positionAnchor: string };

const isSydneyOffice = (name: string) => name.toLowerCase().includes("sydney");

const isAustralianOffice = (office?: Office) =>
  (office?.address ?? "").toLowerCase().includes("australia");

const SSW_RED_RGB: [number, number, number] = [0.8, 0.2549, 0.2549];
const LAND_DOT_RGB: [number, number, number] = [0.92, 0.92, 0.92];
const GLOBE_GLOW_RGB: [number, number, number] = [0.35, 0.35, 0.35];

const locationToAngles = (lat: number, lng: number) => [
  Math.PI - (lng * Math.PI) / 180 + Math.PI / 2,
  (lat * Math.PI) / 180,
];

const shortestAngleDistance = (from: number, to: number) => {
  const twoPi = Math.PI * 2;
  return ((((to - from) % twoPi) + Math.PI * 3) % twoPi) - Math.PI;
};

const getLocation = (office?: Office): [number, number] | null => {
  if (typeof office?.lat !== "number" || typeof office?.lng !== "number") {
    return null;
  }

  return [office.lat, office.lng];
};

const getTagOffsetClassName = (name: string) => {
  const normalizedName = name.toLowerCase();

  if (normalizedName.includes("brisbane")) {
    return "translate-x-4 -translate-y-8";
  }

  if (normalizedName.includes("newcastle")) {
    return "translate-x-4 -translate-y-1/2";
  }

  if (normalizedName.includes("sydney")) {
    return "translate-x-5 translate-y-5";
  }

  if (normalizedName.includes("melbourne")) {
    return "-translate-x-full translate-y-3";
  }

  return "translate-x-3 -translate-y-1/2";
};

export function OfficeMap({
  offices,
  selectedIndex,
  className,
}: {
  offices: Office[];
  selectedIndex: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<{ x: number; y: number } | null>(null);
  const dragOffset = useRef({ phi: 0, theta: 0 });
  const phiOffset = useRef(0);
  const thetaOffset = useRef(0);
  const targetRotation = useRef<{ phi: number; theta: number } | null>(null);
  const isSelectionFocused = useRef(false);
  const speed = useRef(1);

  const markerEntries = useMemo(
    () =>
      offices
        .map((office, index) => {
          const location = getLocation(office);
          if (!location) return null;

          return {
            index,
            name: office?.name ?? "",
            isAustralian: isAustralianOffice(office),
            marker: {
              id: `office-${index}`,
              location,
              size: index === selectedIndex ? 0.055 : 0.035,
              color: SSW_RED_RGB,
            },
          };
        })
        .filter(Boolean) as {
        index: number;
        name: string;
        isAustralian: boolean;
        marker: Marker;
      }[],
    [offices, selectedIndex]
  );

  const markers = useMemo(
    () => markerEntries.map((entry) => entry.marker),
    [markerEntries]
  );
  // Sydney is the hub: each Australian office fans out to it as a spoke, while
  // the overseas offices form a chain leading out from Sydney in listed order
  // (Sydney -> China -> France -> USA).
  const arcs = useMemo<Arc[]>(() => {
    const hub = markerEntries.find((entry) => isSydneyOffice(entry.name));
    if (!hub) return [];

    const domesticSpokes = markerEntries
      .filter((entry) => entry !== hub && entry.isAustralian)
      .map((entry) => ({
        from: entry.marker.location,
        to: hub.marker.location,
        color: SSW_RED_RGB,
      }));

    const overseasChain = [
      hub,
      ...markerEntries.filter((entry) => !entry.isAustralian),
    ];
    const internationalArcs = overseasChain
      .slice(0, -1)
      .map((entry, index) => ({
        from: entry.marker.location,
        to: overseasChain[index + 1].marker.location,
        color: SSW_RED_RGB,
      }));

    return [...domesticSpokes, ...internationalArcs];
  }, [markerEntries]);
  const markersRef = useRef(markers);
  const arcsRef = useRef(arcs);

  useEffect(() => {
    markersRef.current = markers;
  }, [markers]);

  useEffect(() => {
    arcsRef.current = arcs;
  }, [arcs]);

  useEffect(() => {
    const selectedLocation = getLocation(offices[selectedIndex]);
    if (!selectedLocation) return;

    const [phi, theta] = locationToAngles(
      selectedLocation[0],
      selectedLocation[1]
    );
    phiOffset.current = 0;
    thetaOffset.current = 0;
    dragOffset.current = { phi: 0, theta: 0 };
    isSelectionFocused.current = true;
    targetRotation.current = { phi, theta };
  }, [offices, selectedIndex]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isSelectionFocused.current = false;
    targetRotation.current = null;
    pointerInteracting.current = { x: e.clientX, y: e.clientY };
    if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
  }, []);

  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (pointerInteracting.current === null) return;

    const deltaX = e.clientX - pointerInteracting.current.x;
    const deltaY = e.clientY - pointerInteracting.current.y;
    dragOffset.current = {
      phi: deltaX / 220,
      theta: deltaY / 650,
    };
  }, []);

  const handlePointerUp = useCallback(() => {
    if (pointerInteracting.current !== null) {
      phiOffset.current += dragOffset.current.phi;
      thetaOffset.current += dragOffset.current.theta;
      dragOffset.current = { phi: 0, theta: 0 };
    }

    pointerInteracting.current = null;
    if (canvasRef.current) canvasRef.current.style.cursor = "grab";
  }, []);

  useEffect(() => {
    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [handlePointerMove, handlePointerUp]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let phi = targetRotation.current?.phi ?? 0;
    let theta = targetRotation.current?.theta ?? 0.2;
    const width = canvas.offsetWidth || 600;
    const dpr = Math.min(
      window.devicePixelRatio || 1,
      window.innerWidth < 640 ? 1.8 : 2
    );

    const globe = createGlobe(canvas, {
      devicePixelRatio: dpr,
      width,
      height: width,
      phi,
      theta,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 14,
      mapBaseBrightness: 0,
      baseColor: LAND_DOT_RGB,
      markerColor: SSW_RED_RGB,
      glowColor: GLOBE_GLOW_RGB,
      markers: markersRef.current,
      arcs: arcsRef.current,
      arcColor: SSW_RED_RGB,
      arcWidth: 0.5,
      arcHeight: 0.01,
    });

    let animationId = 0;

    const animate = () => {
      const target = targetRotation.current;

      if (target) {
        const phiDistance = shortestAngleDistance(phi, target.phi);
        const thetaDistance = target.theta - theta;

        phi += phiDistance * 0.08;
        theta += thetaDistance * 0.08;

        if (Math.abs(phiDistance) < 0.002 && Math.abs(thetaDistance) < 0.002) {
          phi = target.phi;
          theta = target.theta;
          targetRotation.current = null;
        }
      } else if (
        pointerInteracting.current === null &&
        !isSelectionFocused.current
      ) {
        phi += 0.003 * speed.current;
      }

      globe.update({
        phi: phi + phiOffset.current + dragOffset.current.phi,
        theta: theta + thetaOffset.current + dragOffset.current.theta,
        markers: markersRef.current,
        arcs: arcsRef.current,
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Pause the render loop while the globe is scrolled off-screen so it stops
    // driving the GPU when it can't be seen, and resume on the way back in.
    const observer =
      typeof IntersectionObserver === "undefined"
        ? null
        : new IntersectionObserver(
            ([entry]) => {
              if (entry.isIntersecting && !animationId) {
                animate();
              } else if (!entry.isIntersecting && animationId) {
                cancelAnimationFrame(animationId);
                animationId = 0;
              }
            },
            { threshold: 0 }
          );
    observer?.observe(canvas);

    const fadeIn = window.setTimeout(() => {
      if (canvasRef.current) canvasRef.current.style.opacity = "1";
    });

    return () => {
      observer?.disconnect();
      window.clearTimeout(fadeIn);
      cancelAnimationFrame(animationId);
      globe.destroy();
    };
  }, []);

  return (
    <div
      className={cn(
        "relative aspect-square w-full max-w-3xl cursor-grab touch-none select-none active:cursor-grabbing",
        className
      )}
      onPointerDown={handlePointerDown}
      onPointerEnter={() => {
        speed.current = 0.8;
      }}
      onPointerLeave={() => {
        speed.current = 1;
      }}
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none aspect-square size-full rounded-full opacity-0 transition-opacity duration-700"
      />
      {markerEntries.map(({ index, marker, name }) => {
        if (!marker.id || !name) return null;

        const style = {
          positionAnchor: `--cobe-${marker.id}`,
          top: "anchor(center)",
          left: "anchor(right)",
          opacity: `var(--cobe-visible-${marker.id}, 0)`,
          filter: `blur(calc((1 - var(--cobe-visible-${marker.id}, 0)) * 8px))`,
        } satisfies MarkerTagStyle;

        return (
          <div
            key={marker.id}
            className={cn(
              "pointer-events-none absolute whitespace-nowrap rounded-full px-3 py-1 text-sm font-semibold leading-tight shadow-xl transition-opacity duration-300",
              getTagOffsetClassName(name),
              index === selectedIndex
                ? "bg-sswRed text-white"
                : "bg-gray-50 text-gray-950"
            )}
            style={style}
          >
            {name}
          </div>
        );
      })}
    </div>
  );
}
