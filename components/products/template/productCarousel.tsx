"use client";

import { CarouselDots } from "@/components/blocks/v3/shared/carouselDots";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  useCarousel,
} from "@/components/ui/carousel";
import Image from "next/image";
import { tinaField } from "tinacms/dist/react";

type CarouselImage = { src?: string | null; caption?: string | null };

export type ProductCarouselData = {
  heading?: string | null;
  images?: (CarouselImage | null)[] | null;
};

// Lives inside <Carousel> so it can follow the active slide.
const SlideCaption = ({ images }: { images: CarouselImage[] }) => {
  const { selectedIndex } = useCarousel();
  const caption = images[selectedIndex]?.caption;

  return <p className="m-0 min-w-0 text-sm text-muted-foreground">{caption}</p>;
};

const arrowClass =
  "z-1 size-11 top-1/2 -translate-y-1/2 flex items-center justify-center bg-foreground text-background transition-opacity duration-300 hover:opacity-80 disabled:opacity-40 motion-reduce:transition-none";

export const ProductCarousel = ({
  data,
}: {
  data?: ProductCarouselData | null;
}) => {
  const images = (data?.images ?? []).filter((image): image is CarouselImage =>
    Boolean(image?.src)
  );

  if (!images.length) return null;

  return (
    <section>
      {data?.heading && (
        <h2
          data-tina-field={tinaField(data, "heading")}
          // m-0 p-0: styles.css gives every h2 `mb-2.5 mt-10` and a red colour.
          className="m-0 mb-6 p-0 text-2xl leading-tight text-foreground lg:text-3xl"
        >
          {data.heading}
        </h2>
      )}

      {/* One slide at a time in a fixed 16/9 frame, so every image is cropped
          to the same size however it was shot. Wraps, never autoplays. */}
      <Carousel opts={{ loop: true }} autoplay={false}>
        <div className="relative overflow-hidden rounded-card border-0.75 border-hairline">
          <CarouselContent className="ml-0">
            {images.map((image, index) => (
              <CarouselItem
                key={`product-slide-${index}`}
                className="relative aspect-video pl-0"
              >
                <Image
                  src={image.src ?? ""}
                  alt={image.caption ?? ""}
                  fill
                  sizes="(min-width: 1024px) 66vw, 100vw"
                  className="!my-0 object-cover"
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          {images.length > 1 && (
            <>
              <CarouselPrevious className={`${arrowClass} left-4`} />
              <CarouselNext className={`${arrowClass} right-4`} />
            </>
          )}
        </div>

        <div className="mt-4 flex items-start justify-between gap-6">
          <SlideCaption images={images} />
          <CarouselDots
            count={images.length}
            className="mt-0 shrink-0 justify-end"
          />
        </div>
      </Carousel>
    </section>
  );
};
