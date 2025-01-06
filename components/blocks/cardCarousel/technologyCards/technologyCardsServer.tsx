import client from "@/tina/client";
import TechnologyCardContents from "./technologyCardContents";

type TechnologyCardType = Awaited<
  ReturnType<typeof client.queries.technologiesv2Connection>
>;
async function fetchCategoryDataMap() {
  const response: TechnologyCardType =
    await client.queries.technologiesv2Connection();
  const technologyCardData = response.data.technologiesv2Connection.edges;
  const mappedTechnologyCards = technologyCardData.map((card) => {
    return {
      name: card.node.associatedGroup?.name ?? "",
      guid: card.node.associatedGroup?.name ?? "",
      image: card.node.thumbnail,
      title: card.node.name,
      altText: card.node.name,
      description: card.node.body,
      embeddedButton: {
        buttonText: "Read More",
        buttonLink: card.node.readMoreSlug,
        icon: "BiChevronRight",
      },
      icon: card.node.icon,
      contain: true,
    };
  });
  const technologyCategoryData = Object.groupBy(
    mappedTechnologyCards,
    ({ name }) => name
  );
  return technologyCategoryData;
}

const TechnologyCardServer = async () => {
  const cardMap = await fetchCategoryDataMap();
  return <TechnologyCardContents cardMap={cardMap} />;
};

export default TechnologyCardServer;
