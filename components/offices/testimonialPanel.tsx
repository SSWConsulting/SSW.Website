"use client";

import { useEffect, useState } from "react";
import {
  getRandomClientTestimonial,
  getTestimonialByName,
} from "../../helpers/getTestimonials";

type TestimonialPanelProps = {
  testimonialName?: string;
};

type Testimonial = {
  body?: string;
  name?: string;
  company?: string;
};

const TestimonialPanel = ({ testimonialName }: TestimonialPanelProps) => {
  const [testimonial, setTestimonial] = useState<Testimonial | null>(null);

  useEffect(() => {
    setTestimonial(
      testimonialName
        ? getTestimonialByName(testimonialName)
        : getRandomClientTestimonial()
    );
  }, [testimonialName]);

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
