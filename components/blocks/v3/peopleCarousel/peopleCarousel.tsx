"use client";
import AlternatingText from "@/components/alternating-text";
import ButtonRow from "@/components/blocksSubtemplates/buttonRow";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
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
import { CarouselDots } from "../shared/carouselDots";
import { CarouselMoreCard } from "../shared/carouselMoreCard";
import { PersonCardTexture } from "./personCardTexture";

const SSW_PEOPLE_ICON =
  "/images/company-logos/downloads/images/ssw-logo-icon.png";

const socials = [
  { key: "linkedin", label: "LinkedIn", Icon: FaLinkedinIn },
  { key: "twitter", label: "X", Icon: FaXTwitter },
  { key: "sswPeople", label: "SSW People", image: SSW_PEOPLE_ICON },
];

function PersonCard({ person, index, scope }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-card border-0.75 border-sswBorder bg-sswCard">
      {/* Red panel frames the photo with padding on the sides and top while the
          photo stays flush to the bottom, so the person reads as standing in it. */}
      <div className="relative aspect-square w-full bg-sswRed">
        <PersonCardTexture index={index} scope={scope} />
        {person?.image?.imageSource && (
          <Image
            src={person.image.imageSource}
            alt={person.image.altText ?? person?.name ?? ""}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 80vw"
            className="object-contain object-bottom px-2 pt-2"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col items-center p-4 text-center xl:p-6">
        {person?.name && (
          <h3 className="text-xl font-semibold text-white">{person.name}</h3>
        )}
        {person?.role && (
          <p className="mt-1 text-sm font-light text-gray-400">{person.role}</p>
        )}

        <div className="mt-4 flex items-center gap-1">
          {socials.map(({ key, label, Icon, image }) =>
            person?.[key] ? (
              <Link
                key={key}
                href={person[key]}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${person?.name ?? ""} on ${label}`}
                // Keep the icon at 16px but give the link a ≥36×36px hit area
                // so it meets the minimum accessible touch-target size.
                className="flex size-9 items-center justify-center text-white transition-colors hover:text-sswRed"
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
    </div>
  );
}

function CarouselControls({ count }: { count: number }) {
  const { scrollPrev, scrollNext } = useCarousel();

  return (
    <div className="mt-10 flex items-center justify-between px-8 lg:px-0">
      <CarouselDots count={count} className="mt-0 justify-start" />

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
  const moreLink = data?.mobilePlusMore;
  const seeMoreButtons = data?.seeMoreButton ?? [];

  return (
    <V2ComponentWrapper data={data}>
      <Container
        size="custom"
        width="custom"
        padding="px-0 lg:px-8"
        className="max-w-screen-xl py-24"
      >
        {data?.brow && (
          <span
            data-tina-field={tinaField(data, "brow")}
            className="flex items-center gap-2 px-8 font-mono text-xs uppercase tracking-wider text-sswRed lg:px-0"
          >
            {data.brow}
          </span>
        )}
        {data?.heading && (
          <h2
            data-tina-field={tinaField(data, "heading")}
            className="my-4 max-w-2xl px-8 text-4xl leading-tight text-white lg:px-0 lg:text-5xl"
          >
            <AlternatingText text={data.heading} />
          </h2>
        )}
        {data?.subtitle && (
          <p
            data-tina-field={tinaField(data, "subtitle")}
            className="max-w-2xl px-8 text-base font-light text-gray-400 lg:px-0"
          >
            {data.subtitle}
          </p>
        )}

        <ButtonRow
          data={data}
          className="mt-6 hidden flex-wrap px-8 lg:block lg:px-0"
        />

        {/* 4 or fewer: swipe through them on smaller views and only settle
            into a static grid once there's room (lg+), like the image-cards
            block. Carousel when there's more than fits to scroll. */}
        {people.length > 0 && people.length <= 4 && (
          <>
            {/* Below lg: horizontal finite carousel with a "+ more" end cap */}
            <Carousel
              opts={{
                align: "start",
                loop: false,
                dragFree: true,
                containScroll: "keepSnaps",
              }}
              autoplay={false}
              className="mt-12 lg:hidden"
            >
              <CarouselContent className="ml-0">
                {people.map((person, index) => (
                  <CarouselItem
                    key={`v3-person-${index}`}
                    className={cn(
                      "basis-4/5 pl-6 sm:basis-1/2 md:min-w-[380px] md:basis-1/3"
                    )}
                    data-tina-field={tinaField(person, "name")}
                  >
                    <PersonCard person={person} index={index} scope="sm" />
                  </CarouselItem>
                ))}
                {moreLink && (
                  <CarouselItem className="basis-2/3 pl-6 sm:basis-1/3 md:basis-1/4">
                    <CarouselMoreCard href={moreLink} />
                  </CarouselItem>
                )}
              </CarouselContent>
              <CarouselDots count={people.length} />
            </Carousel>

            {/* lg+ : static grid */}
            <div className="mt-12 hidden gap-8 lg:grid lg:grid-cols-4">
              {people.map((person, index) => (
                <div
                  key={`v3-person-${index}`}
                  data-tina-field={tinaField(person, "name")}
                  className="h-full"
                >
                  <PersonCard person={person} index={index} scope="lg" />
                </div>
              ))}
            </div>
          </>
        )}

        {people.length > 4 && (
          <Carousel
            opts={{ align: "start", containScroll: "keepSnaps" }}
            className="mt-12"
          >
            <CarouselContent className="ml-0">
              {people.map((person, index) => (
                <CarouselItem
                  key={`v3-person-${index}`}
                  className="basis-4/5 pl-8 sm:basis-1/2 lg:basis-1/4"
                  data-tina-field={tinaField(person, "name")}
                >
                  <PersonCard person={person} index={index} scope="carousel" />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselControls count={people.length} />
          </Carousel>
        )}

        {seeMoreButtons.length > 0 && (
          <div className="mt-8 flex justify-end px-8 lg:px-0">
            <ButtonRow
              className="mt-0 hidden justify-end lg:block"
              data={{ buttons: seeMoreButtons }}
            />
          </div>
        )}
      </Container>
    </V2ComponentWrapper>
  );
}
