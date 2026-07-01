import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import V2ComponentWrapper from "@/components/layout/v2ComponentWrapper";
import { Container } from "@/components/util/container";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { BsArrowUpRight } from "react-icons/bs";
import { tinaField } from "tinacms/dist/react";
import { SectionHeader } from "../shared/sectionHeader";

const ArrowButton = ({ className = "size-16" }: { className?: string }) => (
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
        "group relative flex min-h-[360px] w-full overflow-hidden rounded-[45px] md:h-[446px]"
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
      <div aria-hidden="true" className="absolute inset-0 bg-black/80" />

      <div className="relative z-10 flex w-full flex-col items-end justify-between gap-6 p-4 md:flex-row md:px-16 md:py-20">
        <div className="flex max-w-xl flex-col gap-4">
          {project?.logo?.imageSource && (
            <div className="relative size-16 overflow-hidden rounded-full">
              <Image
                src={project.logo.imageSource}
                alt={project.logo.altText ?? ""}
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
          )}
          {project?.title && (
            <h3 className="text-3xl font-medium leading-snug tracking-tight text-white lg:text-4xl">
              {project.title}
            </h3>
          )}
          {project?.description && (
            <p className="text-base font-light text-gray-300">
              {project.description}
            </p>
          )}
        </div>
        <ArrowButton className="size-16" />
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
        "group flex h-full flex-col overflow-hidden rounded-[15px] bg-sswBorder"
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

  // Repeat the cards until there are enough slides for embla's loop to engage
  // (it won't loop a short list when ~3 are visible on md).
  const MIN_CAROUSEL_SLIDES = 6;
  const carouselProducts =
    products.length > 0 && products.length < MIN_CAROUSEL_SLIDES
      ? Array.from(
          { length: Math.ceil(MIN_CAROUSEL_SLIDES / products.length) },
          () => products
        ).flat()
      : products;

  return (
    <V2ComponentWrapper data={data} className="border-y-0.75 border-sswBorder">
      <Container
        size="custom"
        width="custom"
        padding="px-0 lg:px-4"
        className="flex max-w-screen-xl flex-col gap-8 py-16 md:py-24"
      >
        <SectionHeader data={data} />

        {hasHighlight && (
          <div className="px-4 lg:px-0">
            <HighlightCard project={data.highlighted} />
          </div>
        )}

        {products.length > 0 && (
          <>
            {/* Below lg: horizontal infinite-scroll carousel */}
            <Carousel
              opts={{ align: "start", loop: true, dragFree: true }}
              autoplay={false}
              className="lg:hidden"
            >
              <CarouselContent className="ml-0">
                {carouselProducts.map((project, index) => (
                  <CarouselItem
                    key={`v3-featured-project-${index}`}
                    className={cn(
                      "basis-4/5 pl-6 sm:basis-1/2 md:min-w-[380px] md:basis-1/3"
                    )}
                  >
                    <ProjectCard project={project} />
                  </CarouselItem>
                ))}
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
          </>
        )}
      </Container>
    </V2ComponentWrapper>
  );
}
