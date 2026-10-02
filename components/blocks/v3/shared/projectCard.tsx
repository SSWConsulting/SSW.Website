import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { tinaField } from "tinacms/dist/react";
import { ArrowCircle } from "./arrowCircle";

export const MaybeLink = ({ link, newTab, field, children }) =>
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

type ProjectCardTinaFields = {
  link?: string;
  title?: string;
  description?: string;
  image?: string;
  logo?: string;
};

// The homepage Case Studies card (V3 Featured Products). Other blocks reuse
// it (the case study testimonials): `imageFirst` puts the photo on top,
// `className` restyles the card surface, `logo` lays a client logo in white
// over the photo's bottom-left, `titleAs` sets the title's heading level for
// the page it sits in, and `tinaFields` points each part at the reusing
// block's own Tina fields. The defaults render the homepage card.
export function ProjectCard({
  project,
  imageFirst = false,
  className = "",
  logo = null,
  titleAs: Title = "h4",
  tinaFields = {},
}: {
  project;
  imageFirst?: boolean;
  className?: string;
  logo?: { src: string; alt: string } | null;
  titleAs?: "h3" | "h4";
  tinaFields?: ProjectCardTinaFields;
}) {
  const image = project?.image?.imageSource && (
    <div
      data-tina-field={tinaFields.image}
      className="relative aspect-video w-full"
    >
      <Image
        src={project.image.imageSource}
        alt={project.image.altText ?? project?.title ?? ""}
        fill
        sizes="(min-width: 768px) 33vw, 100vw"
        className="object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-black/20" />
      {logo && (
        <>
          {/* Darkens the photo's bottom so the white logo reads on any shot. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent to-60%"
          />
          <Image
            src={logo.src}
            alt={logo.alt}
            width={160}
            height={160}
            data-tina-field={tinaFields.logo}
            className="absolute bottom-4 left-4 h-8 w-auto max-w-40 object-contain object-left brightness-0 invert lg:bottom-6 lg:left-8"
          />
        </>
      )}
    </div>
  );
  const inner = (
    <div
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-card border-0.75 border-hairline bg-white dark:bg-sswBorder",
        className
      )}
    >
      {imageFirst && image}
      <div className="flex flex-1 flex-col gap-8 p-4 lg:p-8">
        <div className="flex flex-col gap-4">
          <Title
            data-tina-field={tinaFields.title}
            // A plain string, not cn(): tailwind-merge reads the custom
            // `text-card-title` size as a colour and would drop it. `m-0`
            // because the site's global heading styles give an h3 margins.
            className="m-0 text-card-title font-medium leading-snug tracking-tight text-foreground"
          >
            {project?.title}
          </Title>
          {project?.description && (
            <p
              data-tina-field={tinaFields.description}
              className="text-base font-light text-muted-foreground"
            >
              {project.description}
            </p>
          )}
        </div>
        <ArrowCircle className="mt-auto size-10 self-end" />
      </div>
      {!imageFirst && image}
    </div>
  );

  return (
    <MaybeLink
      link={project?.link}
      newTab={project?.newTab}
      field={tinaFields.link ?? tinaField(project, "title")}
    >
      {inner}
    </MaybeLink>
  );
}
