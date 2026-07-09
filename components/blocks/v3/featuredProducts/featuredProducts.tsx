import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import ButtonRow from "@/components/blocksSubtemplates/buttonRow";
import V2ComponentWrapper from "@/components/layout/v2ComponentWrapper";
import { Container } from "@/components/util/container";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { BsArrowUpRight } from "react-icons/bs";
import { tinaField } from "tinacms/dist/react";
import { CarouselMoreCard } from "../shared/carouselMoreCard";
import { SectionHeader } from "../shared/sectionHeader";

const ArrowButton = ({
  className = "size-12 md:size-16",
}: {
  className?: string;
}) => (
  <span
    className={`flex shrink-0 scale-100 items-center justify-center self-end rounded-full bg-white text-black transition-all duration-300 ease-in-out group-hover:rotate-45 group-hover:scale-125 ${className}`}
  >
    <BsArrowUpRight className="size-1/3" />
  </span>
);

const MaybeLink = ({ link, newTab, field, children }) =>
  link ? (
    <Link
      href={link}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noopener noreferrer" : undefined}
      data-tina-field={field}
      className="h-full !no-underline"
    >
      {children}
    </Link>
  ) : (
    <div data-tina-field={field} className="h-full">
      {children}
    </div>
  );

function HighlightCard({ project }) {
  const inner = (
    <div
      className={cn(
        "group relative flex min-h-[360px] w-full overflow-hidden rounded-feature md:h-[380px]"
      )}
    >
      {project?.image?.imageSource && (
        <Image
          src={project.image.imageSource}
          alt={project.image.altText ?? project?.title ?? ""}
          fill
          sizes="(min-width: 1280px) 1280px, 100vw"
          className="object-cover"
        />
      )}
      <div aria-hidden="true" className="absolute inset-0 bg-black/85" />

      <div className="relative z-10 flex w-full flex-col items-center justify-center gap-8 p-6 text-center md:flex-row md:justify-between md:px-16 md:py-12 md:text-left">
        <div className="flex max-w-xl flex-col items-center gap-4 md:items-start">
          <div className="flex flex-col items-center gap-4 md:flex-row md:gap-8">
            {project?.logo?.imageSource && (
              <div className="relative size-16 shrink-0 overflow-hidden">
                <Image
                  src={project.logo.imageSource}
                  alt={project.logo.altText ?? ""}
                  fill
                  sizes="64px"
                  className="object-contain"
                />
              </div>
            )}
            {project?.title && (
              <h3 className="text-3xl font-medium leading-snug tracking-tight text-white lg:text-4xl">
                {project.title}
              </h3>
            )}
          </div>
          {project?.description && (
            <p className="text-base font-light text-gray-300">
              {project.description}
            </p>
          )}
        </div>
        <ArrowButton className="size-16 self-center" />
      </div>
    </div>
  );

  return (
    <MaybeLink
      link={project?.link}
      newTab={project?.newTab}
      field={tinaField(project, "title")}
    >
      {inner}
    </MaybeLink>
  );
}

function ProjectCard({ project }) {
  const inner = (
    <div
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-card bg-sswBorder"
      )}
    >
      <div className="flex flex-1 flex-col gap-8 p-4 lg:p-8">
        <div className="flex flex-col gap-4">
          <h4
            className={cn(
              "text-[22px] font-medium leading-snug tracking-tight text-white"
            )}
          >
            {project?.title}
          </h4>
          {project?.description && (
            <p className="text-base font-light text-gray-300">
              {project.description}
            </p>
          )}
        </div>
        <ArrowButton className="mt-auto size-10" />
      </div>
      {project?.image?.imageSource && (
        <div className="relative aspect-video w-full">
          <Image
            src={project.image.imageSource}
            alt={project.image.altText ?? project?.title ?? ""}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-black/20" />
        </div>
      )}
    </div>
  );

  return (
    <MaybeLink
      link={project?.link}
      newTab={project?.newTab}
      field={tinaField(project, "title")}
    >
      {inner}
    </MaybeLink>
  );
}

export function V3FeaturedProducts({ data }) {
  const products = (data?.products ?? []).filter(Boolean);
  const hasHighlight =
    data?.highlighted?.title || data?.highlighted?.image?.imageSource;
  const moreLink = data?.mobilePlusMore;
  const seeMoreButtons = data?.seeMoreButton ?? [];

  return (
    <V2ComponentWrapper data={data} className="border-y-0.75 border-sswBorder">
      <Container
        size="custom"
        width="custom"
        padding="px-0 lg:px-4"
        className="flex max-w-screen-xl flex-col gap-8 py-24"
      >
        <SectionHeader data={data} />

        {hasHighlight && (
          <div className="px-4 lg:px-0">
            <HighlightCard project={data.highlighted} />
          </div>
        )}

        {products.length > 0 && (
          <>
            {/* Below lg: horizontal finite carousel with a "+ more" end cap */}
            <Carousel
              opts={{ align: "start", loop: false, dragFree: true }}
              autoplay={false}
              className="lg:hidden"
            >
              <CarouselContent className="ml-0">
                {products.map((project, index) => (
                  <CarouselItem
                    key={`v3-featured-project-${index}`}
                    className={cn(
                      "basis-4/5 pl-6 sm:basis-1/2 md:min-w-[380px] md:basis-1/3"
                    )}
                  >
                    <ProjectCard project={project} />
                  </CarouselItem>
                ))}
                {moreLink && (
                  <CarouselItem className="basis-2/3 pl-6 sm:basis-1/3 md:basis-1/4">
                    <CarouselMoreCard href={moreLink} />
                  </CarouselItem>
                )}
              </CarouselContent>
            </Carousel>

            {/* lg+ : row */}
            <div className="hidden gap-8 lg:flex">
              {products.map((project, index) => (
                <div key={`v3-featured-project-${index}`} className="lg:flex-1">
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>

            {seeMoreButtons.length > 0 && (
              <div className="flex justify-end px-4 lg:px-0">
                <ButtonRow
                  className="mt-0 hidden justify-end lg:block"
                  data={{ buttons: seeMoreButtons }}
                />
              </div>
            )}
          </>
        )}
      </Container>
    </V2ComponentWrapper>
  );
}
