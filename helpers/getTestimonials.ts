import type { TinaMarkdownContent } from "tinacms/dist/rich-text";
import client from "../.tina/__generated__/client";

export type TestimonialType = {
  name: string;
  avatar?: string;
  rating: number;
  company?: string;
  body?: TinaMarkdownContent;
};

export const getTestimonialsByCategories = async (
  categories: string[]
): Promise<TestimonialType[]> => {
  const testimonials = await client.queries.testimonalsQuery({
    categories,
  });

  let testimonialsResult = testimonials.data.testimonialsConnection.edges.map(
    (t) => t.node
  );

  // Adds default/general testimonials if not filled by any testimonial with matching categories
  if (testimonialsResult.length === 0) {
    const generalTestimonials = await client.queries.testimonalsQuery({
      categories: "General",
    });

    const generalTestimonialsResult =
      generalTestimonials.data.testimonialsConnection.edges.map((t) => t.node);

    testimonialsResult = generalTestimonialsResult;
  }

  testimonialsResult = testimonialsResult
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  return testimonialsResult;
};
