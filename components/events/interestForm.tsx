import { Template } from "tinacms";
import { useTina } from "tinacms/dist/react";
import { JotFormEmbed } from "../blocks";

export const InterestForm = (props) => {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });
  return (
    <JotFormEmbed
      jotFormId={`${eoiFormId}?pageUrl=${data.pageUrl}`}
      buttonText={"Let me know about the next one"}
      containerClass="mt-20"
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
  ],
};
