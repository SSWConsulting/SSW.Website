import { tinaField } from "tinacms/dist/react";
import { Section } from "../util/section";

export const companyIndexSchemaConstants = {
  value: "companyIndex",
  title: "title",
  headerImage: {
    value: "headerImage",
    heroBackground: "heroBackground",
    altText: "altText",
    txtOverlay: "txtOverlay",
  },
  _body: "_body",
  companyPages: {
    value: "companyPages",
    title: "title",
    body: "body",
    pageURL: "pageURL",
    isExternal: "isExternal",
  },
};

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
      {data?.txtOverlay && (
        <div
          className="flex max-w-2xl text-white lg:max-w-3xl"
          data-tina-field={tinaField(
            schema,
            companyIndexSchemaConstants.headerImage.txtOverlay
          )}
        >
          <h1 className="text-white">{data.txtOverlay}</h1>
        </div>
      )}
    </Section>
  );
};

export default CompanyHeader;
