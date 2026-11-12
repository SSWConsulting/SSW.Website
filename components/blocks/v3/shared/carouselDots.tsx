"use client";

import { CarouselPickItem, useCarousel } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

// Clickable pill indicators for the v3 carousels — one dot per scroll snap.
// Usually that's one per card: pass the number of content cards (do NOT include
// any "+ more" end-cap tile) and use `containScroll: "keepSnaps"` so every card
// keeps its own snap. A paged carousel (`slidesToScroll` > 1) has one snap per
// page instead, so pass the page count. Renders nothing for a single snap.
// Must live inside a <Carousel>.
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
            selectedIndex === index
              ? "w-6 bg-foreground"
              : "w-3 bg-foreground opacity-30"
          )}
        />
      ))}
    </div>
  );
}
