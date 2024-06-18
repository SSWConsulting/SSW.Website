import { Template } from "tinacms";
import { InlineJotForm, JotFormEmbed } from "../blocks";

export const InterestForm = () => {
  return (
    <JotFormEmbed
      jotFormId="241638083078865"
      buttonText={"Let me know about the next one"}
      containerClass="mt-20"
    />
  );
  // return <h1>Interest Form</h1>;
};

export const interestFormSchema: Template = {
  label: "Interest Form",
  name: "interestForm",
  fields: [
    {
      type: "string",
      label: "Page URL",
      name: "pageUrl",
      required: true,
    },
  ],
};
