import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import type { Template } from "tinacms";
import client from "../../.tina/__generated__/client";
import { TestimonialCard } from "./testimonialsCard";

export const TestimonialsList = ({ data: { hideInternshipTestimonials } }) => {
  const [testimonials, setTestimonials] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const loadTestimonials = () => {
      client.queries.testimonialsConnection().then((data) => {
        const testimonials = data.data?.testimonialsConnection?.edges?.map(
          (edge) => edge?.node
        );

        const sortedTestimonials = testimonials
          ?.filter(
            (testimonial) =>
              testimonial?.categories !== null &&
              testimonial?.categories[0]?.category.name !== "Internship"
          )
          ?.map((testimonial) => testimonial);

        if (hideInternshipTestimonials) {
          setTestimonials(sortedTestimonials);
        } else {
          setTestimonials(testimonials);
        }
        setHasLoaded(true);
      });
    };
    if (!hasLoaded) {
      loadTestimonials();
    }
  }, [hasLoaded, hideInternshipTestimonials]);

  return (
    <>
      {hasLoaded ? (
        <div className="mx-auto my-6 flex w-full flex-row flex-wrap items-stretch justify-center gap-6">
          {testimonials?.map((testimonial, i) => (
            <TestimonialCard key={i} testimonial={testimonial} />
          ))}
        </div>
      ) : (
        <>
          <p className="flex items-center justify-center text-xl">
            <FaSpinner className="m-icon animate-spin" />
            Loading Testimonials...
          </p>
        </>
      )}
    </>
  );
};

export const testimonialsListSchema: Template = {
  name: "TestimonialsList",
  label: "Testimonials List",
  fields: [
    {
      type: "boolean",
      label: "Hide Intership Testimonials",
      name: "hideInternshipTestimonials",
    },
  ],
};
