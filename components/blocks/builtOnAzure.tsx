import classNames from "classnames";
import Image from "next/image";
import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import { CustomLink } from "../customLink";
import { Container } from "../util/container";
import { Section } from "../util/section";

export const BuiltOnAzure = ({ data }) => {
  return (
    <Section color={data.backgroundColor}>
      <Container className="grid grid-cols-1 text-lg lg:grid-cols-2">
        <Link
          data={data}
          href="/consulting/azure"
          className="hover:border-azure hover:text-azure"
          text="Built on Microsoft Azure"
          image={
            <Image
              src="/images/logos/azure.png"
              alt="Microsoft Azure Logo"
              height={30}
              width={30}
            />
          }
        />

        <Link
          data={data}
          href="https://tina.io"
          className="hover:border-tina hover:text-tina"
          text="Powered by TinaCMS"
          image={
            <Image
              src="/images/logos/tina-llama-orange.png"
              alt="TinaCMS logo"
              height={30}
              width={22}
            />
          }
        />
      </Container>
    </Section>
  );
};

const Link = ({ data, href, className, text, image }) => {
  return (
    <CustomLink
      href={href}
      data-tina-field={tinaField(data, builtOnAzureBlock.backgroundColor)}
      className={classNames(
        "unstyled flex items-center justify-center",
        className
      )}
    >
      {image}
      <div className="ml-2 text-center uppercase tracking-widest">{text}</div>
    </CustomLink>
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
