import Image from "next/image";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import type { Template } from "tinacms";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import client from "../../.tina/__generated__/client";
import { Rating } from "../util/consulting/rating";

const defaultAvatar = "/images/thumbs/avatar-thumbnail.png";

/**
 * Render a table of newsletters.
 * @param data The data for the table.
 * @returns The table component.
 */
export const TestimonialsList = ({ data: { hideInternshipTestimonials } }) => {
  const [testimonials, setTestimonials] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (!hasLoaded) {
      loadTestimonials();
    }
  }, [hasLoaded]);

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

  const TestimonialCard = (testimonial) => {
    return (
      <div
        className="flex w-full grow flex-col rounded-md border-b-4 border-b-sswRed bg-gray-100 p-8 text-center text-xl drop-shadow md:min-h-96 md:max-w-sm md:grow-0 md:p-10 md:basis_gap-96-6"
        data-aos="flip-right"
        key={testimonial?.name}
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
        <p className="mt-4 min-h-24">
          {testimonial?.name}
          {testimonial?.company && (
            <>
              {", "}
              <span className="font-semibold">{testimonial?.company}</span>
            </>
          )}
        </p>
        <div className="mt-2 text-sm text-gray-900">
          <TinaMarkdown content={testimonial?.body} />
        </div>
      </div>
    );
  };

  return (
    <>
      {hasLoaded ? (
        <div className="mx-auto my-6 flex w-3/4 flex-row flex-wrap items-stretch justify-center gap-6">
          {testimonials.map(TestimonialCard)}
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
  name: "testimonialsList",
  label: "Testimonials List",
  fields: [
    {
      type: "string",
      label: "Header text",
      name: "headerText",
    },
  ],
};
