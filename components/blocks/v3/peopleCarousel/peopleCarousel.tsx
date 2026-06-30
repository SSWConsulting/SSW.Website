"use client";
import AlternatingText from "@/components/alternating-text";
import ButtonRow from "@/components/blocksSubtemplates/buttonRow";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPickItem,
  useCarousel,
} from "@/components/ui/carousel";
import V2ComponentWrapper from "@/components/layout/v2ComponentWrapper";
import { Container } from "@/components/util/container";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { tinaField } from "tinacms/dist/react";

const SSW_PEOPLE_ICON =
  "/images/company-logos/downloads/images/ssw-logo-icon.png";

const socials = [
  { key: "linkedin", label: "LinkedIn", Icon: FaLinkedinIn },
  { key: "twitter", label: "X", Icon: FaXTwitter },
  { key: "sswPeople", label: "SSW People", image: SSW_PEOPLE_ICON },
];

function PersonCard({ person }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div
        className={cn(
          "relative aspect-square w-full max-w-[280px] overflow-hidden rounded-full"
        )}
      >
        {person?.image?.imageSource && (
          <Image
            src={person.image.imageSource}
            alt={person.image.altText ?? person?.name ?? ""}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 80vw"
            className="object-cover"
          />
        )}
      </div>

      {person?.name && (
        <h3 className="mt-6 text-xl font-semibold text-white">{person.name}</h3>
      )}
      {person?.role && (
        <p className="mt-1 text-sm font-light text-gray-400">{person.role}</p>
      )}

      <div className="mt-4 flex items-center gap-4">
        {socials.map(({ key, label, Icon, image }) =>
          person?.[key] ? (
            <Link
              key={key}
              href={person[key]}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${person?.name ?? ""} on ${label}`}
              className="text-white transition-colors hover:text-sswRed"
            >
              {image ? (
                <Image
                  src={image}
                  alt=""
                  width={16}
                  height={16}
                  className="size-4 transition-opacity hover:opacity-80"
                />
              ) : (
                <Icon className="size-4" />
              )}
            </Link>
          ) : null
        )}
      </div>
    </div>
  );
}

function CarouselControls({ count }: { count: number }) {
  const { selectedIndex, scrollPrev, scrollNext } = useCarousel();

  return (
    <div className="mt-10 flex items-center justify-between">
      <div className="flex items-center gap-2">
        {Array.from({ length: count }).map((_, index) => (
          <CarouselPickItem
            key={`v3-people-dot-${index}`}
            index={index}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              selectedIndex === index ? "w-6 bg-white" : "w-3 bg-white/30"
            )}
          />
        ))}
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Previous"
          onClick={scrollPrev}
          className="flex size-12 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:bg-white hover:text-black"
        >
          <ArrowLeft className="size-5" />
        </button>
        <button
          type="button"
          aria-label="Next"
          onClick={scrollNext}
          className="flex size-12 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:bg-white hover:text-black"
        >
          <ArrowRight className="size-5" />
        </button>
      </div>
    </div>
  );
}

export function V3PeopleCarousel({ data }) {
  const people = (data?.people ?? []).filter(Boolean);

  return (
    <V2ComponentWrapper data={data}>
      <Container
        size="custom"
        width="custom"
        padding="px-4 sm:px-8"
        className="max-w-screen-xl py-16 md:py-24"
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
            className="my-4 max-w-2xl text-4xl leading-tight text-white lg:text-5xl"
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

        <ButtonRow data={data} className="mt-6 flex-wrap" />

        {/* 4 or fewer all fit on screen, so skip the carousel UI and lay them
            out in a static grid; only carousel when there's more to scroll. */}
        {people.length > 0 && people.length <= 4 && (
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {people.map((person, index) => (
              <div
                key={`v3-person-${index}`}
                data-tina-field={tinaField(person, "name")}
              >
                <PersonCard person={person} />
              </div>
            ))}
          </div>
        )}

        {people.length > 4 && (
          <Carousel opts={{ align: "start" }} className="mt-12">
            <CarouselContent className="-ml-8">
              {people.map((person, index) => (
                <CarouselItem
                  key={`v3-person-${index}`}
                  className="basis-4/5 pl-8 sm:basis-1/2 lg:basis-1/4"
                  data-tina-field={tinaField(person, "name")}
                >
                  <PersonCard person={person} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselControls count={people.length} />
          </Carousel>
        )}
      </Container>
    </V2ComponentWrapper>
  );
}
