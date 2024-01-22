import * as Testominials from "../content/testimonialsNew/testimonials.json";
import { extractFileName } from "./functions";
export type TestimonialType = {
  name: string;
  avatar?: string;
  rating?: number | undefined;
  company?: string;
  body?: string;
};

export const getTestimonialsByCategories = async (
  fetchCategories: string[]
): Promise<TestimonialType[] | []> => {
  const testimonialsResult = Testominials.testimonials
    .filter(
      (testimonial) =>
        testimonial.categories &&
        testimonial.categories.some((testimonialCategory) =>
          fetchCategories.length > 0
            ? fetchCategories.some(
                (category) =>
                  category === extractFileName(testimonialCategory.category)
              )
            : extractFileName(testimonialCategory.category) === "General"
        )
    )
    .map((testimonial) => testimonial as TestimonialType);

  return testimonialsResult.length > 0 ? testimonialsResult.slice(0, 3) : [];
};
