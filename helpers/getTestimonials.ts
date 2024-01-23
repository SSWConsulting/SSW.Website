import * as Testominials from "../content/testimonials/testimonials.json";
import { extractFileName } from "./functions";
export type TestimonialType = {
  name: string;
  avatar?: string;
  rating?: number | undefined;
  company?: string;
  body?: string;
};
const SSWInternalTestimonials = ["internship", "brainstorming"];

export const getTestimonialsByCategories = async (
  categories: string[] = []
): Promise<TestimonialType[] | []> => {
  const testimonialsResult = Testominials.testimonials
    .filter(
      (testimonial) =>
        testimonial.categories &&
        testimonial.categories.some((testimonialCategory) =>
          categories.length > 0
            ? categories.some(
                (category) =>
                  category === extractFileName(testimonialCategory.category)
              )
            : extractFileName(testimonialCategory.category) === "General"
        )
    )
    .map((testimonial) => testimonial as TestimonialType);

  return testimonialsResult.length > 0 ? testimonialsResult.slice(0, 3) : [];
};

export const getFilteredTestimonials = async (
  categoryRoutePaths: {
    categoryName: string;
  }[]
): Promise<TestimonialType[]> => {
  const categoryListToExclude = categoryRoutePaths?.map(
    (category) => extractFileName(category?.categoryName)?.toLowerCase()
  );

  const testimonialsResult = Testominials.testimonials
    .filter(
      (testimonial) =>
        testimonial.categories &&
        testimonial.categories.some(
          (testimonialCategory) =>
            categoryListToExclude.length > 0 &&
            !categoryListToExclude.some(
              (category) =>
                category ===
                extractFileName(testimonialCategory.category)?.toLowerCase()
            )
        )
    )
    .map((testimonial) => testimonial as TestimonialType);

  return testimonialsResult;
};
export const getFilteredAndRandomTestimonial = async () => {
  const testimonialsResult = Testominials.testimonials
    .filter(
      (testimonial) =>
        testimonial.categories &&
        testimonial.categories.some(
          (testimonialCategory) =>
            SSWInternalTestimonials.length > 0 &&
            !SSWInternalTestimonials.some(
              (category) =>
                category ===
                extractFileName(testimonialCategory.category)?.toLowerCase()
            )
        )
    )
    .map((testimonial) => testimonial as TestimonialType);
  const shuffledTestimonials =
    testimonialsResult[Math.floor(Math.random() * testimonialsResult.length)];

  return JSON.stringify({
    name: shuffledTestimonials.name,
    company: shuffledTestimonials.company,
    body: shuffledTestimonials.body,
  });
};

export const testimonialToSelectOptions = () => {
  const testimonialOptions = Testominials.testimonials.map((testimonial) => ({
    value: JSON.stringify({
      name: testimonial.name,
      company: testimonial.company,
      body: testimonial.body,
    }),
    label: `${testimonial.name} - ${testimonial.company ?? ""}`,
  }));

  return testimonialOptions;
};
