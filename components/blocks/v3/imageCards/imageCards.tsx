import AlternatingText from "@/components/alternating-text";
import { backgroundOptions } from "@/components/blocksSubtemplates/tinaFormElements/colourOptions/blockBackgroundOptions";
import V2ComponentWrapper from "@/components/layout/v2ComponentWrapper";
import { Container } from "@/components/util/container";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { BsArrowUpRight } from "react-icons/bs";
import { tinaField } from "tinacms/dist/react";

export function V3ImageCards({ data }) {
  const cards = data?.cards ?? [];
  const showBorder = data?.showBorder ?? true;
  const cardBackgroundClass =
    backgroundOptions.find(
      (option) => option.reference === data?.cardBackgroundColour
    )?.classes ?? "bg-sswCard";

  // 3-up when the count divides evenly by 3 but not by 4 (e.g. 3, 6, 9),
  // otherwise keep the default 4-up grid.
  const lgColumnsClass =
    cards.length % 3 === 0 && cards.length % 4 !== 0
      ? "lg:grid-cols-3"
      : "lg:grid-cols-4";

  return (
    <V2ComponentWrapper data={data}>
      <Container
        size="custom"
        width="custom"
        padding="px-4 sm:px-8"
        className="max-w-[1280px] py-16 md:py-24"
      >
        {data?.brow && (
          <span
            data-tina-field={tinaField(data, "brow")}
            className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-sswRed"
          >
            {data.brow}
          </span>
        )}
        {data?.heading && (
          <h2
            data-tina-field={tinaField(data, "heading")}
            className="my-4 text-3xl text-white lg:text-5xl max-w-2xl"
          >
            <AlternatingText text={data.heading} />
          </h2>
        )}
        {data?.subtitle && (
          <p
            data-tina-field={tinaField(data, "subtitle")}
            className="max-w-2xl text-base font-light text-gray-400"
          >
            {data.subtitle}
          </p>
        )}

        {cards.length > 0 && (
          <div
            className={cn(
              "mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2",
              lgColumnsClass
            )}
          >
            {cards.map((card, index) => {
              const inner = (
                <div
                  className={cn(
                    "group flex h-full flex-col overflow-hidden rounded-2xl transition",
                    cardBackgroundClass,
                    showBorder && "border-0.75 border-sswBorder"
                  )}
                >
                  <div className="flex aspect-[4/3] items-center justify-center bg-sswRed p-8">
                    {card?.graphic?.imageSource && (
                      <div className="relative size-40 max-w-[70%]">
                        <Image
                          src={card.graphic.imageSource}
                          alt={card.graphic.altText ?? card?.title ?? ""}
                          fill
                          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                          className="object-contain"
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-2xl font-semibold text-white">
                      {card?.title}
                    </h3>
                    {card?.description && (
                      <p className="mt-4 text-base font-light text-gray-400">
                        {card.description}
                      </p>
                    )}
                    <span className="mt-auto flex size-10 shrink-0 scale-100 items-center justify-center self-end rounded-full bg-white p-2 text-black transition-all duration-300 ease-in-out group-hover:rotate-45 group-hover:scale-125">
                      <BsArrowUpRight className="size-4" />
                    </span>
                  </div>
                </div>
              );

              return card?.link ? (
                <Link
                  key={`v3-image-card-${index}`}
                  href={card.link}
                  target={card?.newTab ? "_blank" : undefined}
                  rel={card?.newTab ? "noopener noreferrer" : undefined}
                  data-tina-field={tinaField(card, "title")}
                  className="h-full !no-underline"
                >
                  {inner}
                </Link>
              ) : (
                <div
                  key={`v3-image-card-${index}`}
                  data-tina-field={tinaField(card, "title")}
                >
                  {inner}
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </V2ComponentWrapper>
  );
}
