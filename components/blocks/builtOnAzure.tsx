import Image from "next/image";
import Link from "next/link";
import React from "react";
import type { Template } from "tinacms";
import { Container } from "../util/container";
import { Section } from "../util/section";

export const BuiltOnAzure = ({ data }) => {
  return (
    <Section color={data.backgroundColor}>
      <Container>
        <Link href="/consulting/azure">
          <a className="flex items-center justify-center unstyled hover:text-azure hover:border-azure">
            <Image
              src="/images/logos/azure.png"
              alt="Microsoft Azure Logo"
              height={30}
              width={30}
            />
            <div className="ml-2 text-center tracking-widest uppercase">
              Built on the Microsoft Azure Platform
            </div>
          </a>
        </Link>
      </Container>
    </Section>
  );
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
