"use client";

import { useEffect, useState } from "react";
import {
  getRandomClientTestimonial,
  getTestimonialByName,
} from "../../helpers/getTestimonials";

type TestimonialPanelProps = {
  testimonialName?: string;
  themed?: boolean;
};

type Testimonial = {
  body?: string;
  name?: string;
  company?: string;
};

const TestimonialPanel = ({
  testimonialName,
  themed = false,
}: TestimonialPanelProps) => {
  const [testimonial, setTestimonial] = useState<Testimonial | null>(null);

  useEffect(() => {
    setTestimonial(
      testimonialName
        ? getTestimonialByName(testimonialName)
        : getRandomClientTestimonial()
    );
  }, [testimonialName]);

  if (themed && !testimonial) return null;

  return (
    <>
      <h3>Testimonials</h3>
      {testimonial ? (
        <div
          className={
            themed ? "text-muted-foreground" : "border-2 bg-gray-100 px-4 py-3"
          }
        >
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
