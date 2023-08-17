import Image from "next/image";
import { tinaField } from "tinacms/dist/react";
import { companyIndexSchemaConstants } from "../../.tina/collections/company";
import { Section } from "../util/section";

const CompanyHeader = ({ data, schema }) => {
  return (
    <Section
      className="flex h-102 items-center justify-center border-b-8 border-sswRed bg-white bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(${
          data?.heroBackground || "/images/polygonBackground.png"
        })`,
      }}
      data-tina-field={tinaField(
        schema,
        companyIndexSchemaConstants.headerImage.heroBackground
      )}
    >
      {data?.imgOverlay && (
        <div
          className="flex max-w-2xl lg:max-w-3xl"
          data-tina-field={tinaField(
            schema,
            companyIndexSchemaConstants.headerImage.imgOverlay
          )}
        >
          <Image
            src={data.imgOverlay}
            alt={data?.altText}
            height={400}
            width={460}
          />
        </div>
      )}
    </Section>
  );
};

export default CompanyHeader;
