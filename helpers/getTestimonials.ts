import testimonialList from "../content/testimonials/testimonials.json";
import { extractFileName } from "./functions";
export type TestimonialType = {
  name: string;
  avatar?: string;
  company?: string;
  body?: string;
};
const SSWInternalTestimonialCategories = ["internship", "brainstorming"];

export const getTestimonialsByCategories = async (
  categories: string[] = []
): Promise<TestimonialType[] | []> => {
  const testimonialsResult = testimonialList.testimonials
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
    .map((testimonial) => testimonial as TestimonialType)
    .slice(0, 3);

  return testimonialsResult;
};

export const getRandomTestimonialsByCategory = async (
  categories: string[] = []
): Promise<TestimonialType[] | []> => {
  const testimonialsResult = testimonialList.testimonials
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
    .map((testimonial) => testimonial as TestimonialType)
    ?.sort(() => 0.5 - Math.random())
    ?.slice(0, 3);

  return testimonialsResult;
};

export const getTestimonialsExcludingCategories = async (
  categoryRoutePaths: {
    categoryName: string;
  }[]
): Promise<TestimonialType[]> => {
  const categoryListToExclude = categoryRoutePaths?.map(
    (category) => extractFileName(category?.categoryName)?.toLowerCase()
  );

  const testimonialsResult = testimonialList.testimonials
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
export const getRandomClientTestimonial = async () => {
  const testimonialsResult = testimonialList.testimonials
    .filter(
      (testimonial) =>
        testimonial.categories &&
        testimonial.categories.some(
          (testimonialCategory) =>
            SSWInternalTestimonialCategories.length > 0 &&
            !SSWInternalTestimonialCategories.some(
              (category) =>
                category ===
                extractFileName(testimonialCategory.category)?.toLowerCase()
            )
        )
    )
    .map((testimonial) => testimonial as TestimonialType);

  const randomTestimonial =
    testimonialsResult[Math.floor(Math.random() * testimonialsResult.length)];

  return toStringify(randomTestimonial);
};

export const testimonialToSelectOptions = () => {
  const testimonialOptions = testimonialList.testimonials.map(
    (testimonial) => ({
      value: toStringify(testimonial),
      label: `${testimonial.name} - ${testimonial.company ?? ""}`,
    })
  );

  return testimonialOptions;
};

const toStringify = (testimonial: TestimonialType) =>
  JSON.stringify({
    name: testimonial.name,
    company: testimonial.company,
    body: testimonial.body,
  });
