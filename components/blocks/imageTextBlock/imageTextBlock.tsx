import { Container } from "@/components/util/container";
import { backgroundOptions } from "../sharedTinaFields/colourOptions/blockBackgroundOptions";
import { ListItem } from "./listItem";

export const ImageTextBlock = ({ data }) => {
  return (
    <Container
      className={`${backgroundOptions[data.backgroundColor].classes} pb-16 pt-8`}
    >
      <h1>TEST TEXT</h1>
      <div
        className={`grid ${data.twoColumns ? "grid-cols-1" : "grid-cols-2"}`}
      >
        {data.featureColumns?.features?.map((item, index) => {
          return <ListItem key={index} data={item} />;
        })}
      </div>
    </Container>
  );
};
