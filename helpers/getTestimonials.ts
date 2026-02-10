import testimonialList from "../content/testimonials/testimonials.json";
import { extractFileName } from "./functions";
export type TestimonialType = {
  name: string;
  avatar?: string;
  company?: string;
  body?: string;
  link?: {
    url: string;
    title: string;
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
        testimonial.categories.some((testimonialCategory) => {
          console.log("testimonialCategory", testimonialCategory);
          return categories.length > 0
            ? categories.some(
                (category) =>
                  category === extractFileName(testimonialCategory.category)
              )
            : extractFileName(testimonialCategory.category) === "General";
        })
    )
    .map((testimonial) => testimonial as TestimonialType)
    .slice(0, 3);
  console.log("testimonialsResult", testimonialsResult);
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
export const getRandomClientTestimonial = () => {
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

  return toTestimonialPanelObject(randomTestimonial);
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

  const testimonialResult = testimonialList.testimonials
    .filter(
      (testimonial) =>
        testimonial.name && testimonial.name.toLowerCase() === name
    )
    .map((testimonial) => testimonial as TestimonialType);

  return testimonialResult.length > 0
    ? toTestimonialPanelObject(testimonialResult[0])
    : null;
};

const toTestimonialPanelObject = (testimonial: TestimonialType) => ({
  name: testimonial.name,
  company: testimonial.company,
  body: testimonial.body,
});
