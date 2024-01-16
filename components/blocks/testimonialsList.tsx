import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import type { Template } from "tinacms";
import client from "../../.tina/__generated__/client";
import { TestimonialCard } from "./testimonialsCard";

export const TestimonialsList = ({ data: { listOfCategoriesToHide = [] } }) => {
  const [testimonials, setTestimonials] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  const categoriesToHide = listOfCategoriesToHide?.map(
    (category) => extractCategoryName(category?.categoryName)?.toLowerCase()
  );

  useEffect(() => {
    const loadTestimonials = () => {
      client.queries.testimonialsConnection().then((data) => {
        const testimonials = data.data?.testimonialsConnection?.edges?.map(
          (edge) => edge?.node
        );

        const filteredTestimonials = testimonials
          ?.filter(
            (testimonial) =>
              testimonial?.categories !== null &&
              !categoriesToHide.some(
                (category) =>
                  testimonial?.categories[0]?.category.name
                    .toLowerCase()
                    .includes(category)
              )
          )
          ?.map((testimonial) => testimonial);

        setTestimonials(filteredTestimonials);
        setHasLoaded(true);
      });
    };
    if (!hasLoaded) {
      loadTestimonials();
    }
  }, [hasLoaded, categoriesToHide]);

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

const extractCategoryName = (category) =>
  category?.split("/").pop().split(".")[0].split("-")[0];

export const testimonialsListSchema: Template = {
  name: "TestimonialsList",
  label: "Testimonials List",
  fields: [
    {
      type: "object",
      label: "List of Categories to Hide",
      name: "listOfCategoriesToHide",
      ui: {
        itemProps: (item) => {
          const CategoryName = extractCategoryName(item?.categoryName);
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
