"use client";

import { CarouselPickItem, useCarousel } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

// Clickable pill indicators for the v3 carousels — one dot per card. `count` is
// the number of content cards (do NOT include any "+ more" end-cap tile).
// Renders nothing when there's a single card. Must live inside a <Carousel>,
// and the carousel needs `containScroll: "keepSnaps"` so every card keeps its
// own scroll snap and the active dot tracks correctly.
export function CarouselDots({
  count,
  className,
}: {
  count: number;
  className?: string;
}) {
  const { selectedIndex } = useCarousel();

  if (count <= 1) return null;

  return (
    <div
      className={cn("mt-8 flex items-center justify-center gap-2", className)}
    >
      {Array.from({ length: count }).map((_, index) => (
        <CarouselPickItem
          key={`carousel-dot-${index}`}
          index={index}
          className={cn(
            "h-1.5 rounded-full transition-all duration-300",
            selectedIndex === index ? "w-6 bg-white" : "w-3 bg-white/30"
          )}
        />
      ))}
    </div>
  );
}
