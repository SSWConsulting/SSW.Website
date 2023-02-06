import Image from "next/legacy/image";
import Link from "next/link";
import React from "react";
import type { Template } from "tinacms";
import { Container } from "../util/container";
import { Section } from "../util/section";

export const BuiltOnAzure = ({ data }) => {
  return (
    <Section color={data.backgroundColor}>
      <Container className="text-lg">
        <Link
          href="/consulting/azure"
          className="unstyled flex items-center justify-center hover:border-azure hover:text-azure"
        >
          {/* TODO: refactor with next/image */}
          <Image
            src="/images/logos/azure.png"
            alt="Microsoft Azure Logo"
            height={30}
            width={30}
          />
          <div className="ml-2 text-center uppercase tracking-widest">
            Built on the Microsoft Azure Platform
          </div>
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
