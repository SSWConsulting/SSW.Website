import { Template } from "tinacms";
import globals from "../../content/global/index.json";
import { JotFormEmbed } from "../blocks";

export const InterestForm = (props) => {
  return (
    <JotFormEmbed
      jotFormId={`${eoiFormId}?pageUrl=${globals.newsletterJotFormId}`}
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
