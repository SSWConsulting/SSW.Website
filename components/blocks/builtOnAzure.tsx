import Image from "next/image";
import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import { CustomLink } from "../customLink";
import { Container } from "../util/container";
import { Section } from "../util/section";

export const BuiltOnAzure = ({ data }) => {
  return (
    <Section color={data.backgroundColor}>
      <Container className="text-lg">
        <CustomLink
          href="/consulting/azure"
          data-tina-field={tinaField(data, builtOnAzureBlock.backgroundColor)}
          className="unstyled flex items-center justify-center hover:border-azure hover:text-azure"
        >
          <Image
            src="/images/logos/azure.png"
            alt="Microsoft Azure Logo"
            height={30}
            width={30}
          />
          <div className="ml-2 text-center uppercase tracking-widest">
            Built on the Microsoft Azure Platform
          </div>
        </CustomLink>
      </Container>
    </Section>
  );
};

export const builtOnAzureBlock = {
  backgroundColor: "backgroundColor",
};

export const builtOnAzureBlockSchema: Template = {
  name: "BuiltOnAzure",
  label: "Built on Azure",
  // Todo: Turn into util field
  fields: [
    {
      type: "string",
      label: "Background Color",
      name: "backgroundColor",
      options: [
        { label: "Default", value: "default" },
        { label: "Light Gray", value: "lightgray" },
        { label: "Red", value: "red" },
        { label: "Black", value: "black" },
      ],
    },
  ],
};
