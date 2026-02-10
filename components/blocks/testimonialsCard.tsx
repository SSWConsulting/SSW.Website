"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { TestimonialType } from "../../helpers/getTestimonials";
import { CustomLink } from "../customLink";

const Image = dynamic(() => import("next/image"));

const defaultAvatar = "/images/thumbs/avatar-thumbnail.png";

type TestimonialCardProps = {
  testimonial: TestimonialType;
};

export const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  const [hasError, setHasError] = useState(false);
  const testimonialAvatar =
    hasError || !testimonial?.avatar ? defaultAvatar : testimonial?.avatar;
  return (
    <div
      className="flex w-full grow flex-col rounded-md border-b-4 border-b-sswRed bg-gray-100 p-8 text-center text-xl drop-shadow md:min-h-96 md:max-w-sm md:grow-0 md:p-10 md:basis_gap-96-6"
      data-aos="flip-right"
      key={testimonial?.name}
    >
      <div className="flex flex-col items-center">
        <Image
          alt={`Avatar of ${testimonial?.name}`}
          src={testimonialAvatar}
          height={120}
          width={120}
          quality={90}
          className="rounded-full"
          onError={() => setHasError(true)}
        />
      </div>

      <p className="mt-4 min-h-16">
        {testimonial?.name}
        {testimonial?.company && (
          <>
            {", "}
            <span className="font-semibold">{testimonial?.company}</span>
          </>
        )}
      </p>
      <div className="mt-2 flex-grow text-sm text-ssw-black">
        {testimonial?.body}
      </div>
      {testimonial?.link?.url && testimonial?.link?.title && (
        <CustomLink className="mt-4 text-sm" href={testimonial.link.url}>
          {testimonial.link.title}
        </CustomLink>
      )}
    </div>
  );
};
