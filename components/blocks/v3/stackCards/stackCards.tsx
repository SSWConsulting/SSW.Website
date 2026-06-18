import AlternatingText from "@/components/alternating-text";
import V2ComponentWrapper from "@/components/layout/v2ComponentWrapper";
import { Container } from "@/components/util/container";
import Link from "next/link";
import { BsArrowUpRight } from "react-icons/bs";
import { tinaField } from "tinacms/dist/react";

export function V3StackCards({ data }) {
  const cards = data?.cards ?? [];

  return (
    <V2ComponentWrapper
      data={data}
      className="border-y-[0.75px] border-[#212121]"
    >
      <Container
        size="custom"
        padding="px-4 sm:px-8"
        className="py-16 md:py-24"
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
            className="my-4 text-3xl text-white lg:text-4xl"
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
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((card, index) => {
              const inner = (
                <div className="group flex h-full flex-col rounded-2xl border-[0.75px] border-[#212121] bg-[#0d0d0d] p-6 transition">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-2xl font-semibold text-white">
                      {card?.title}
                    </h3>
                    <span className="flex shrink-0 scale-100 items-center justify-center rounded-full bg-white p-2 text-black transition-all duration-300 ease-in-out group-hover:rotate-45 group-hover:scale-125">
                      <BsArrowUpRight className="size-4" />
                    </span>
                  </div>
                  {card?.description && (
                    <p className="mt-10 text-base font-light text-gray-400">
                      {card.description}
                    </p>
                  )}
                </div>
              );

              return card?.link ? (
                <Link
                  key={`v3-stack-card-${index}`}
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
                  key={`v3-stack-card-${index}`}
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
