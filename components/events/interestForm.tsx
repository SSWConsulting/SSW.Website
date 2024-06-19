import { Template } from "tinacms";
import { useTina } from "tinacms/dist/react";
import { JotFormEmbed } from "../blocks";

export const InterestForm = (props) => {
  return (
    <JotFormEmbed
      jotFormId={`${eoiFormId}?pageUrl=${props.pageUrl}`}
      buttonText={props.buttonText || "I am interested"}
      containerClass=""
    />
  );
};

const eoiFormId: string = "241638083078865";

export const interestFormSchema: Template = {
  label: "Interest Form",
  name: "InterestForm",
  fields: [
    {
      type: "string",
      label: "Page URL",
      name: "pageUrl",
      required: true,
    },
    {
      type: "string",
      label: "Button Text",
      name: "buttonText",
      required: false,
    },
  ],
};
