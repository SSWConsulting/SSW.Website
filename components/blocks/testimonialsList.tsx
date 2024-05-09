"use client";

import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import type { Template } from "tinacms";
import { extractFileName } from "../../helpers/functions";
import { getTestimonialsExcludingCategories } from "../../helpers/getTestimonials";
import { TestimonialCard } from "./testimonialsCard";

export const TestimonialsList = ({ data: { excludedCategories = [] } }) => {
  const [testimonials, setTestimonials] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const loadTestimonials = async () => {
      const filteredTestimonials =
        await getTestimonialsExcludingCategories(excludedCategories);

      setTestimonials(filteredTestimonials);
      setHasLoaded(true);
    };
    if (!hasLoaded) {
      loadTestimonials();
    }
  }, [hasLoaded, excludedCategories]);

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
      type: "object",
      label: "Exclude Categories",
      name: "excludedCategories",
      ui: {
        itemProps: (item) => {
          const CategoryName = extractFileName(item?.categoryName);
          return {
            label: CategoryName,
          };
        },
      },
      list: true,
      fields: [
        {
          type: "reference",
          label: "Category Name",
          name: "categoryName",
          collections: ["testimonialCategories"],
        },
      ],
    },
  ],
};
