import { useEffect, useState } from "react";
import { useEditState } from "tinacms/dist/react";
import {
  TestimonialType,
  getTestimonialsByCategories,
} from "../../helpers/getTestimonials";
import { TestimonialCard } from "../blocks/testimonialsCard";
import { Container } from "../util/container";

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
