import { Template } from "tinacms";
import globals from "../../content/global/index.json";
import { JotFormEmbed } from "../blocks/jotFormEmbed";

export const InterestForm = (props) => {
  return (
    <JotFormEmbed
      jotFormId={`${globals.forms.registrationOfInterestJotFormId}`}
      buttonText={props.buttonText || "I am interested"}
      containerClass=""
    />
  );
};

export const interestFormSchema: Template = {
  label: "Interest Form",
  name: "InterestForm",
  ui: {
    previewSrc: "/images/thumbs/tina/interest-form.jpg",
  },
  fields: [
    {
      type: "string",
      label: "Button Text",
      name: "buttonText",
      required: false,
    },
  ],
};
