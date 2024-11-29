import { Container } from "@/components/util/container";
import Image from "next/image";
import { backgroundOptions } from "../sharedTinaFields/colourOptions/blockBackgroundOptions";
import { IconLabel } from "./iconLabel";
import { ListItem } from "./listItem";
import { PillGroup } from "./pillGroup";

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
          {data.isH1 ? <h1>{data.heading}</h1> : <h2>{data.heading}</h2>}
          <p>{data.description}</p>
          {data.chips && <PillGroup data={data.chips} />}
          <div
            className={`grid ${data.featureColumns?.twoColumns ? "grid-cols-2" : "grid-cols-1"}`}
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
