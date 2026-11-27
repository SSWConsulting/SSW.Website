"use client";

import { TestimonialCard } from "@/components/company/testimonialCard";
import { useEffect, useState } from "react";
import {
  getRandomClientTestimonial,
  getTestimonialByName,
  type TestimonialType,
} from "../../helpers/getTestimonials";

type TestimonialPanelProps = {
  testimonialName?: string;
  themed?: boolean;
};

const TestimonialPanel = ({
  testimonialName,
  themed = false,
}: TestimonialPanelProps) => {
  const [testimonial, setTestimonial] = useState<TestimonialType | null>(null);

  useEffect(() => {
    setTestimonial(
      testimonialName
        ? getTestimonialByName(testimonialName)
        : getRandomClientTestimonial({ preferAvatar: themed })
    );
  }, [testimonialName, themed]);

  if (themed) {
    if (!testimonial) return null;
    return (
      <section>
        <h3 className="mb-4 mt-0 text-xl font-semibold text-foreground">
          Testimonials
        </h3>
        <TestimonialCard key={testimonial.name} testimonial={testimonial} />
      </section>
    );
  }

  return (
    <>
      <h3>Testimonials</h3>
      {testimonial ? (
        <div className="border-2 bg-gray-100 px-4 py-3">
          {testimonial?.body}
          <p>
            <strong>{testimonial?.name}</strong> - {testimonial?.company}
          </p>
        </div>
      ) : (
        <p>No Testimonial found!</p>
      )}
    </>
  );
};

export default TestimonialPanel;
