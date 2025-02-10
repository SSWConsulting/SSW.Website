import classNames from "classnames";
import dynamic from "next/dynamic";
import { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import { CustomLink } from "../customLink";
import { SectionColor } from "../util/constants/styles";
import { Container } from "../util/container";
import { Section } from "../util/section";

const Image = dynamic(() => import("next/image"));

export const azureFooterColors: Array<string> = [
  "white",
  "lightgray",
  "darkgray",
];

type AzureFooterColors = (typeof azureFooterColors)[number];

export type BuiltOnAzureProps = {
  data?: {
    showAzureFooter?: boolean;
    azureFooterColor?: AzureFooterColors;
  };
};
export const BuiltOnAzure = ({ data }: BuiltOnAzureProps) => {
  let footerColor: AzureFooterColors = data?.azureFooterColor || "lightgray";

  if (footerColor === "white") {
    footerColor = "default";
  }
  //show the azure banner by default unless it's disabled

  if (data?.showAzureFooter === false) {
    return <></>;
  }

  return (
    <Section color={footerColor as SectionColor} className="py-2">
      <Container className="grid grid-cols-1 text-base md:text-lg lg:grid-cols-2">
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
              loading="lazy"
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
              width={30}
              loading="lazy"
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
      data-tina-field={tinaField(data)}
      className={classNames(
        "unstyled flex items-center justify-center",
        className
      )}
    >
      {image}
      <div className="ml-2 whitespace-nowrap uppercase tracking-widest">
        {text}
      </div>
    </CustomLink>
  );
};

export const builtOnAzureBlock = {
  backgroundColor: "backgroundColor",
};

export const builtOnAzureBlockSchema: Template = {
  name: "BuiltOnAzure",
  label: "Built on Azure",
  ui: {
    previewSrc: "/images/thumbs/tina/built-on-azure.jpg",
  },
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
