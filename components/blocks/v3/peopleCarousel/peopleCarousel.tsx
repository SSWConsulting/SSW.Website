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
import type { ElementType } from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { tinaField } from "tinacms/dist/react";
import { CarouselDots } from "../shared/carouselDots";
import { CarouselMoreCard } from "../shared/carouselMoreCard";
import { PersonCardTexture } from "./personCardTexture";
import { getSideBySideLayout, PEOPLE_PER_PAGE } from "./sideBySideLayout";

const socials = [
  { key: "linkedin", label: "LinkedIn", Icon: FaLinkedinIn },
  { key: "twitter", label: "X", Icon: FaXTwitter },
  { key: "github", label: "GitHub", Icon: FaGithub },
];

// Links the photo and name to the profile, with an ::after overlay stretching
// the click target across the whole card; the social icons sit above it on
// their own z-layer. A plain <div> stands in when there's no profile to link to.
function ProfileLink({ person, className, children }) {
  if (!person?.sswPeople) {
    return <div className={className}>{children}</div>;
  }

  return (
    <Link
      href={person.sswPeople}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View ${person?.name ?? "this person"}'s SSW People profile`}
      className={cn(
        "!no-underline after:absolute after:inset-0 after:content-['']",
        className
      )}
    >
      {children}
    </Link>
  );
}

// Namespaces each card's texture ids, since one person can render in several
// layouts on the page at once (only one is visible per breakpoint).
type CardScope = "sm" | "lg" | "carousel" | "side";

function PersonCard({
  person,
  index,
  scope,
}: {
  person;
  index: number;
  scope: CardScope;
}) {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-card border-0.75 border-hairline bg-white transition-colors duration-300 hover:border-sswRed dark:border-sswBorder dark:bg-sswCard">
      <ProfileLink person={person} className="block">
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

        <div className="px-4 pt-4 text-center xl:px-6 xl:pt-6">
          {person?.name && (
            <h3 className="text-xl font-semibold text-foreground transition-colors group-hover:text-sswRed">
              {person.name}
            </h3>
          )}
          {person?.role && (
            <p className="mt-1 text-sm font-light text-muted-foreground">
              {person.role}
            </p>
          )}
        </div>
      </ProfileLink>

      {/* flex-1 keeps the icon rows aligned when names wrap to two lines. */}
      <div className="flex flex-1 items-start justify-center gap-1 p-4 xl:px-6 xl:pb-6">
        {socials.map(({ key, label, Icon }) =>
          person?.[key] ? (
            <Link
              key={key}
              href={person[key]}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${person?.name ?? ""} on ${label}`}
              // Keep the icon at 16px but give the link a ≥36×36px hit area
              // so it meets the minimum accessible touch-target size.
              // z-10 lifts it above the stretched profile-link overlay.
              className="relative z-10 flex size-9 items-center justify-center text-foreground transition-colors hover:text-sswRed"
            >
              <Icon className="size-4" />
            </Link>
          ) : null
        )}
      </div>
    </div>
  );
}

const arrowButton =
  "flex size-12 items-center justify-center rounded-full border border-hairline text-foreground transition-colors hover:bg-foreground hover:text-background disabled:pointer-events-none disabled:opacity-30 dark:border-white/40";

// A finite carousel disables the arrow it can't go any further with
function CarouselControls({ count }: { count: number }) {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } =
    useCarousel();

  return (
    <div className="mt-10 flex items-center justify-between px-8 lg:px-0">
      <CarouselDots count={count} className="mt-0 justify-start" />

      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Previous"
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          className={arrowButton}
        >
          <ArrowLeft className="size-5" />
        </button>
        <button
          type="button"
          aria-label="Next"
          onClick={scrollNext}
          disabled={!canScrollNext}
          className={arrowButton}
        >
          <ArrowRight className="size-5" />
        </button>
      </div>
    </div>
  );
}

// One card per person, each in the given wrapper (grid cell or carousel slide)
function PersonSlots({
  people,
  scope,
  as: Slot,
  className,
}: {
  people;
  scope: CardScope;
  as: ElementType;
  className?: string;
}) {
  return people.map((person, index) => (
    <Slot
      key={`v3-person-${index}`}
      className={className}
      data-tina-field={tinaField(person, "name")}
    >
      <PersonCard person={person} index={index} scope={scope} />
    </Slot>
  ));
}

// Desktop half of the "Side by side" layout: people two to a page. A lone
// person is centred at the width of a paired card (middle 2 of 4 columns).
function SideBySidePeople({ people }) {
  const layout = getSideBySideLayout(people.length);

  if (layout.mode === "none") return null;

  if (layout.mode !== "paged") {
    return (
      <div className="grid grid-cols-4 gap-8">
        <PersonSlots
          people={people}
          scope="side"
          as="div"
          className={cn(
            "col-span-2",
            layout.mode === "single" && "col-start-2"
          )}
        />
      </div>
    );
  }

  return (
    // containScroll off so an odd last page shows its lone card, rather than
    // shifting back to repeat the previous person
    <Carousel
      opts={{
        align: "start",
        loop: false,
        slidesToScroll: PEOPLE_PER_PAGE,
        containScroll: false,
      }}
      autoplay={false}
    >
      <CarouselContent className="-ml-8">
        <PersonSlots
          people={people}
          scope="side"
          as={CarouselItem}
          className="basis-1/2 pl-8"
        />
      </CarouselContent>
      <CarouselControls count={layout.pages} />
    </Carousel>
  );
}

// The stacked layout's static grid holds up to this many; more use a carousel
const GRID_MAX_PEOPLE = 4;

export function V3PeopleCarousel({ data }) {
  const people = (data?.people ?? []).filter(Boolean);
  const moreLink = data?.mobilePlusMore;
  const seeMoreButtons = data?.seeMoreButton ?? [];
  const isSideBySide = data?.layout === "sideBySide";

  const intro = (
    <>
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
          className={cn(
            "my-4 max-w-2xl px-8 text-4xl leading-tight text-foreground lg:px-0",
            !isSideBySide && "lg:text-5xl"
          )}
        >
          <AlternatingText text={data.heading} />
        </h2>
      )}
      {data?.subtitle && (
        <p
          data-tina-field={tinaField(data, "subtitle")}
          className="max-w-2xl whitespace-pre-line px-8 text-base font-light text-muted-foreground lg:px-0"
        >
          {data.subtitle}
        </p>
      )}

      <ButtonRow
        data={data}
        className="mt-6 hidden flex-wrap px-8 lg:block lg:px-0"
      />
    </>
  );

  // Up to GRID_MAX_PEOPLE swipe on smaller views and settle into a static grid
  // at lg+, like the image-cards block. More use a full carousel.
  const fitsGrid = people.length > 0 && people.length <= GRID_MAX_PEOPLE;

  // Below lg: horizontal finite carousel with a "+ more" end cap
  const swipeCarousel = (
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
        <PersonSlots
          people={people}
          scope="sm"
          as={CarouselItem}
          className={cn(
            "basis-4/5 pl-6 sm:basis-1/2 md:min-w-[380px] md:basis-1/3"
          )}
        />
        {moreLink && (
          <CarouselItem className="basis-2/3 pl-6 sm:basis-1/3 md:basis-1/4">
            <CarouselMoreCard href={moreLink} />
          </CarouselItem>
        )}
      </CarouselContent>
      <CarouselDots count={people.length} />
    </Carousel>
  );

  // lg+ : static grid
  const staticGrid = (
    <div className="mt-12 hidden gap-8 lg:grid lg:grid-cols-4">
      <PersonSlots people={people} scope="lg" as="div" className="h-full" />
    </div>
  );

  const fullCarousel = people.length > GRID_MAX_PEOPLE && (
    <Carousel
      opts={{ align: "start", containScroll: "keepSnaps" }}
      className="mt-12"
    >
      <CarouselContent className="ml-0">
        <PersonSlots
          people={people}
          scope="carousel"
          as={CarouselItem}
          className="basis-4/5 pl-8 sm:basis-1/2 lg:basis-1/4"
        />
      </CarouselContent>
      <CarouselControls count={people.length} />
    </Carousel>
  );

  // What shows below lg in both layouts (the full carousel shows at every size)
  const carousel = fitsGrid ? swipeCarousel : fullCarousel;

  const seeMore = seeMoreButtons.length > 0 && (
    <div className="mt-8 flex justify-end px-8 lg:px-0">
      <ButtonRow
        className="mt-0 hidden justify-end lg:block"
        data={{ buttons: seeMoreButtons }}
      />
    </div>
  );

  return (
    <V2ComponentWrapper data={data}>
      <Container
        size="custom"
        width="custom"
        padding="px-0 lg:px-8"
        className="max-w-screen-xl py-24"
      >
        {isSideBySide ? (
          // Intro left, people right (lg+), tops aligned. Below lg it stacks
          // exactly like the stacked layout.
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-12">
            <div>{intro}</div>
            <div>
              <div className="lg:hidden">{carousel}</div>
              <div className="hidden lg:block">
                <SideBySidePeople people={people} />
              </div>
              {seeMore}
            </div>
          </div>
        ) : (
          <>
            {intro}
            {carousel}
            {fitsGrid && staticGrid}
            {seeMore}
          </>
        )}
      </Container>
    </V2ComponentWrapper>
  );
}
