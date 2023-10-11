import Image from "next/image";
import { useEffect, useState } from "react";
import { useEditState } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import {
  getTestimonialsByCategories,
  TestimonialType,
} from "../../helpers/getTestimonials";
import { Rating } from "../util/consulting/rating";
import { Container } from "../util/container";
import classNames from "classnames";

const defaultAvatar = "/images/thumbs/avatar-thumbnail.png";

type TestimonialRowProps = {
  testimonialsResult: TestimonialType[];
  tagline: string;
  categories: string[];
  className?: string;
};

export const TestimonialRow = ({
  testimonialsResult,
  tagline,
  categories = [],
  className = "",
}: TestimonialRowProps) => {
  const [testimonialResult, setTestimonialResult] =
    useState<TestimonialType[]>(testimonialsResult);

  const { edit } = useEditState();

  useEffect(() => {
    async function getTestimonials() {
      const testimonials = await getTestimonialsByCategories(categories);

      setTestimonialResult(testimonials);
    }
    if (edit) {
      getTestimonials();
    }
  }, [edit, categories]);

  return (
    <Container size="custom" className={className}>
      <h2 className="mb-2 text-center">
        What do people <span className="text-sswRed">say</span>?
      </h2>
      <p className="mb-8 text-center">{tagline}</p>
      <div className="flex w-full flex-row flex-wrap items-stretch justify-center gap-6">
        {testimonialResult?.map((testimonial, i) => (
          <TestimonialCard key={i} testimonial={testimonial} />
        ))}
      </div>
    </Container>
  );
};

type TestimonialCardProps = {
  testimonial: TestimonialType;
};

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  return (
    <div
      className="flex w-full grow flex-col rounded-md border-b-4 border-b-sswRed bg-gray-100 p-8 text-center text-xl drop-shadow md:min-h-96 md:max-w-sm md:grow-0 md:p-10 md:basis_gap-96-6"
      data-aos="flip-right"
    >
      <div className="flex flex-col items-center">
        <Image
          alt={`Picture of ${testimonial?.name} as an avatar`}
          src={testimonial?.avatar ?? defaultAvatar}
          height={120}
          width={120}
          quality={90}
          className="rounded-full"
        />
      </div>
      <Rating className="mx-auto mt-8" rating={testimonial?.rating} />
      <p className={classNames("mt-4", testimonial?.company && "min-h-24")}>
        {testimonial?.name}
        {testimonial?.company && (
          <>
            {", "}
            <span className="mb-2 font-semibold">{testimonial?.company}</span>
          </>
        )}
      </p>
      <div className="text-sm text-gray-900">
        <TinaMarkdown content={testimonial?.body} />
      </div>
    </div>
  );
};

export const testimonialRowSchema = {
  type: "object",
  label: "Testimonials",
  name: "testimonials",
  fields: [
    {
      type: "string",
      label: "Tagline",
      name: "tagline",
    },
  ],
};
