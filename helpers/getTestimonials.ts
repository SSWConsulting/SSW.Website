import client from "../.tina/__generated__/client";

export const GetTestimonialsByCategories = async (
  categories,
  defaultCategory
) => {
  const testimonials = await client.queries.testimonalsQuery({
    categories,
  });

  let testimonialsResult = testimonials.data.testimonialsConnection.edges.map(
    (t) => t.node
  );

  testimonialsResult = testimonialsResult.sort(() => 0.5 - Math.random());

  // Adds general testimonials if not filled by testimonials with matching categories
  if (testimonialsResult.length < 3) {
    const generalTestimonials = await client.queries.testimonalsQuery({
      categories: defaultCategory ?? "General",
    });

    const generalTestimonialsResult =
      generalTestimonials.data.testimonialsConnection.edges.map((t) => t.node);

    const randomGeneral = generalTestimonialsResult.sort(
      () => 0.5 - Math.random()
    );
    testimonialsResult.push(...randomGeneral);
  }

  testimonialsResult = testimonialsResult.slice(0, 3);

  return testimonialsResult;
};
