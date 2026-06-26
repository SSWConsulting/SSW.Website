import V2ComponentWrapper from "@/components/layout/v2ComponentWrapper";
import { Container } from "@/components/util/container";
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
    <div className="group relative flex min-h-[360px] w-full overflow-hidden rounded-[45px] md:h-[446px]">
      {project?.image?.imageSource && (
        <Image
          src={project.image.imageSource}
          alt={project.image.altText ?? project?.title ?? ""}
          fill
          sizes="(min-width: 1280px) 1280px, 100vw"
          className="object-cover"
        />
      )}
      <div aria-hidden="true" className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 flex w-full items-end justify-between gap-6 p-8 md:px-16 md:py-20">
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
    <div className="group flex h-full flex-col overflow-hidden rounded-[15px] bg-[#212121]">
      <div className="flex flex-1 flex-col gap-8 p-8">
        <div className="flex flex-col gap-4">
          <h4 className="text-[22px] font-medium leading-snug tracking-tight text-white">
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

  return (
    <V2ComponentWrapper data={data} className="border-y-0.75 border-sswBorder">
      <Container
        size="custom"
        width="custom"
        padding="px-4 sm:px-8"
        className="flex max-w-[1280px] flex-col gap-12 py-16 md:gap-20 md:py-24"
      >
        <SectionHeader data={data} />

        {hasHighlight && <HighlightCard project={data.highlighted} />}

        {products.length > 0 && (
          <div className="flex flex-col gap-8 md:flex-row">
            {products.map((project, index) => (
              <div key={`v3-featured-project-${index}`} className="md:flex-1">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </V2ComponentWrapper>
  );
}
