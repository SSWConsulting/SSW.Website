import testimonialList from "../content/testimonials/testimonials.json";
import { extractFileName } from "./functions";
export type TestimonialType = {
  name: string;
  avatar?: string;
  company?: string;
  body?: string;
  link?: {
    url?: string;
    title?: string;
  };
};
const SSWInternalTestimonialCategories = ["internship", "brainstorming"];

export const getTestimonialsByCategories = (
  categories: string[] = []
): TestimonialType[] | [] => {
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
): Promise<TestimonialType[]> =>
  testimonialsExcludingCategories(categoryRoutePaths);

// The same list, read synchronously: the data is a bundled JSON file.
export const testimonialsExcludingCategories = (
  categoryRoutePaths: {
    categoryName: string;
  }[]
): TestimonialType[] => {
  const categoryListToExclude = categoryRoutePaths?.map((category) =>
    extractFileName(category?.categoryName)?.toLowerCase()
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
export const getRandomClientTestimonial = ({ preferAvatar = false } = {}) => {
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

  const withAvatars = preferAvatar
    ? testimonialsResult.filter((testimonial) => testimonial.avatar)
    : [];
  const pool = withAvatars.length ? withAvatars : testimonialsResult;
  return pool[Math.floor(Math.random() * pool.length)] ?? null;
};

export const testimonialToSelectOptions = () => {
  const testimonialOptions = testimonialList.testimonials.map(
    (testimonial) => ({
      value: `${testimonial.name.toLocaleLowerCase()}`,
      label: `${testimonial.name} - ${testimonial.company ?? ""}`,
    })
  );

  return testimonialOptions;
};

export const getTestimonialByName = (name: string) => {
  if (!name) return null;

  return (
    testimonialList.testimonials.find(
      (testimonial) => testimonial.name?.toLowerCase() === name
    ) ?? null
  );
};
