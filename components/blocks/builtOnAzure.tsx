import React from 'react';
import type { Template } from 'tinacms';
import { Container } from '../util/container';
import { Section } from '../util/section';

export const BuiltOnAzure = ({ data }) => {
  return (
    <Section color={data.backgroundColor}>
      <Container>
        <span>Built on the Microsoft Azure Platform</span>
      </Container>
    </Section>
  );
}

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
    } 
  ]
}
