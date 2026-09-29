"use client";

// PROTOTYPE — throwaway. Checks the grilled "Side by side" People Carousel
// layout at each people count, on /events/ai-for-business-leaders via
// ?variant=1|2|4. The design is already settled; the variants are the data
// states (1 host, 2 people static, 3+ carousel bleeding to the viewport edge),
// padded out with people from the home page. Desktop (lg+) only — below lg the
// real block's stacked behaviour is unchanged. Lives on a prototype/ branch.

import AlternatingText from "@/components/alternating-text";
import ButtonRow from "@/components/blocksSubtemplates/buttonRow";
import { PrototypeSwitcher } from "@/components/prototype/prototypeSwitcher";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Container } from "@/components/util/container";
import { useSearchParams } from "next/navigation";
import home from "../../../../../content/pagesv2/home.json";
import { CarouselControls, PersonCard } from "../peopleCarousel";

const VARIANTS = [
  { key: "1", name: "1 host" },
  { key: "2", name: "2 people, static" },
  { key: "3", name: "3 people, 2 pages" },
  { key: "4", name: "4 people, 2 pages" },
  { key: "5", name: "5 people, 3 pages" },
];

const homePeople =
  home.blocks.find((b) => b._template === "v3PeopleCarousel")?.["people"] ?? [];

const PER_PAGE = 2;

function SideBySide({ data, people }) {
  return (
    <Container
      size="custom"
      width="custom"
      padding="px-0 lg:px-8"
      className="max-w-screen-xl py-24"
    >
      <div className="grid grid-cols-2 items-start gap-12">
        {/* Intro: 1/2 */}
        <div>
          {data?.brow && (
            <span className="font-mono text-xs uppercase tracking-wider text-sswRed">
              {data.brow}
            </span>
          )}
          {data?.heading && (
            <h2 className="my-4 text-4xl leading-tight text-foreground">
              <AlternatingText text={data.heading} />
            </h2>
          )}
          {data?.subtitle && (
            <p className="whitespace-pre-line text-base font-light text-muted-foreground">
              {data.subtitle}
            </p>
          )}
          <ButtonRow data={data} className="mt-6" />
        </div>

        {/* People: 1/2 */}
        <div>
          {people.length <= PER_PAGE ? (
            // 4-col grid: a pair takes 2 cols each; a lone card takes the
            // middle 2, so it's centred at exactly the paired card width
            <div className="grid grid-cols-4 gap-8">
              {people.map((person, index) => (
                <div
                  key={index}
                  className={
                    people.length === 1
                      ? "col-span-2 col-start-2"
                      : "col-span-2"
                  }
                >
                  <PersonCard person={person} index={index} scope="lg" />
                </div>
              ))}
            </div>
          ) : (
            // Paged: 2 per view, 2 per click, one dot per page. containScroll
            // off so an odd last page shows its lone card with an empty slot.
            <Carousel
              opts={{
                align: "start",
                loop: false,
                slidesToScroll: PER_PAGE,
                containScroll: false,
              }}
              autoplay={false}
            >
              <CarouselContent className="-ml-8">
                {people.map((person, index) => (
                  <CarouselItem key={index} className="basis-1/2 pl-8">
                    <PersonCard
                      person={person}
                      index={index}
                      scope="carousel"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselControls count={Math.ceil(people.length / PER_PAGE)} />
            </Carousel>
          )}
        </div>
      </div>
    </Container>
  );
}

export function SideBySidePrototypeGate({ data, children }) {
  const variant = useSearchParams().get("variant");
  const count = Number(variant);
  if (!VARIANTS.some((v) => v.key === variant)) return children;

  const host = (data?.people ?? [])[0];
  const others = homePeople.filter((p) => p?.name !== host?.name);
  // Cycle the home page people to pad out larger counts
  const people = [host];
  for (let i = 0; people.length < count; i++)
    people.push(others[i % others.length]);

  return (
    <>
      <div className="hidden lg:block">
        <SideBySide data={data} people={people} />
      </div>
      <div className="lg:hidden">{children}</div>
      <div className="fixed left-4 top-24 z-50 rounded bg-yellow-300 px-2 py-1 font-mono text-xs text-black">
        people: {people.map((p) => p?.name).join(", ")}
      </div>
      <PrototypeSwitcher variants={VARIANTS} current={variant} />
    </>
  );
}
