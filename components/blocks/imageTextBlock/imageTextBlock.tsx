import { Container } from "@/components/util/container";
import Image from "next/image";
import { backgroundOptions } from "../sharedTinaFields/colourOptions/blockBackgroundOptions";
import { IconLabel } from "./iconLabel";
import { ListItem } from "./listItem";

export const ImageTextBlock = ({ data }) => {
  return (
    <section
      className={`${
        backgroundOptions.find((value) => {
          return value.reference === data.background;
        })?.classes
      } w-full`}
    >
      <Container className="mx-auto flex align-top">
        <div className="w-full">
          {data.topLabel && <IconLabel data={data.topLabel} />}
          <div
            className={`grid ${data.twoColumns ? "grid-cols-1" : "grid-cols-2"}`}
          >
            {data.featureColumns?.features?.map((item, index) => {
              return <ListItem key={index} data={item} />;
            })}
          </div>
        </div>
        <div className="w-full">
          <Image src={data.image} alt={data.imageAlt} />
        </div>
      </Container>
    </section>
  );
};
