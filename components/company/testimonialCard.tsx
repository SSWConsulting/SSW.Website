"use client";

import { CustomLink } from "@/components/customLink";
import type { TestimonialType } from "@/helpers/getTestimonials";
import { initials } from "@/helpers/testimonials";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

// A photo when there is one, otherwise the person's initials: most
// testimonials have no avatar, and a stock silhouette on each says nothing.
export const TestimonialAvatar = ({
  testimonial,
  size = 44,
}: {
  testimonial: TestimonialType;
  size?: number;
}) => {
  const [failed, setFailed] = useState(false);
  const box = size >= 56 ? "size-14 text-lg" : "size-11 text-sm";

  if (testimonial.avatar && !failed) {
    return (
      <Image
        src={testimonial.avatar}
        alt=""
        width={size}
        height={size}
        className={cn(box, "flex-none rounded-full object-cover")}
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className={cn(
        box,
        "flex flex-none items-center justify-center rounded-full bg-brand-subtle font-semibold text-brand"
      )}
    >
      {initials(testimonial.name)}
    </span>
  );
};

export const TestimonialAttribution = ({
  testimonial,
  size,
}: {
  testimonial: TestimonialType;
  size?: number;
}) => (
  <figcaption className="flex items-center gap-3">
    <TestimonialAvatar testimonial={testimonial} size={size} />
    <span className="flex min-w-0 flex-col">
      <span className="font-semibold text-foreground">{testimonial.name}</span>
      {testimonial.company && (
        <span className="text-sm text-muted-foreground">
          {testimonial.company}
        </span>
      )}
    </span>
  </figcaption>
);

export const TestimonialQuote = ({
  body,
  className,
}: {
  body?: string;
  className?: string;
}) => (
  <blockquote
    className={cn(
      "m-0 space-y-4 border-0 p-0 font-light leading-relaxed text-foreground",
      className
    )}
  >
    {body
      ?.split(/\r?\n/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean)
      .map((paragraph, index) => (
        <p key={index} className="m-0">
          {paragraph}
        </p>
      ))}
  </blockquote>
);

export const TestimonialCard = ({
  testimonial,
}: {
  testimonial: TestimonialType;
}) => (
  <figure className="m-0 flex h-full flex-col rounded-card border-0.75 border-stroke-weak bg-card p-6 transition-colors duration-300 hover:border-brand motion-reduce:transition-none md:p-7 dark:border-hairline dark:hover:border-brand">
    <span
      aria-hidden="true"
      className="block h-6 font-serif text-5xl leading-none text-brand"
    >
      &ldquo;
    </span>
    <TestimonialQuote body={testimonial.body} className="mt-2 grow text-base" />
    {testimonial.link?.url && testimonial.link.title && (
      <CustomLink
        href={testimonial.link.url}
        className="mt-4 self-start text-sm"
      >
        {testimonial.link.title}
      </CustomLink>
    )}
    <div className="mt-4 border-t-0.75 border-stroke-weak pt-4 dark:border-hairline">
      <TestimonialAttribution testimonial={testimonial} />
    </div>
  </figure>
);
