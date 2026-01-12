import { MediaCardProps } from "@/components/consulting/mediaCard/mediaCard";
import client from "@/tina/client";
import { ConsultingContentQueryQuery } from "@/tina/types";
import { json } from "stream/consumers";
import { getRandomTestimonialsByCategory } from "./getTestimonials";

const getConsultingPageMetadata = async ({
  data,
  variables,
}: Awaited<ReturnType<typeof client.queries.consultingContentQuery>>) => {
  console.log("variables", variables);
  const categories =
    data.consulting?.testimonialCategories
      ?.map((category) => category?.testimonialCategory?.name)
      ?.filter((item) => !!item) || [];

  const testimonialsResult = await getRandomTestimonialsByCategory(categories);

  const technologyCardNames =
    data.consulting.technologies?.technologyCards?.reduce<string[]>(
      (pre, cur) => {
        !!cur.technologyCard?.name && pre.push(cur.technologyCard.name);
        return pre;
      },
      []
    ) || [];

  const technologyCardsProps = await client.queries.technologyCardContentQuery({
    cardNames: technologyCardNames,
  });

  const technologyCardDocs =
    technologyCardsProps?.data.technologiesConnection.edges.map((n) => n.node);
  const techCards =
    data.consulting.technologies?.technologyCards?.map((c) => ({
      ...technologyCardDocs?.find(
        (n) => !!n.name && n.name === c.technologyCard?.name
      ),
    })) || [];

  const categoriesData =
    data.consulting.testimonialCategories
      ?.filter((category) => !!category?.testimonialCategory)
      ?.map((category) => category.testimonialCategory.name) ?? [];

  const mediaCardProps =
    data.consulting?.medias?.mediaCards?.map(
      (m): MediaCardProps => ({
        type: m.type as MediaCardProps["type"],
        content: m.content,
      })
    ) || [];
  const marketingSection = await client.queries.marketing({
    relativePath: "/why-choose-ssw.mdx",
  });

  return {
    categories: categoriesData,
    mediaCardProps: mediaCardProps,
    techCards,
    testimonialsResult,
    marketingData: marketingSection.data,
    variables,
  };
};

export default getConsultingPageMetadata;
