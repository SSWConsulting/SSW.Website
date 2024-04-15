import type { Template } from "tinacms";
import Jotform from "react-jotform";

export type InlineJotFormProps = {
  jotFormId: string;
  additionalClasses?: string;
};

export const InlineJotForm = (props: InlineJotFormProps) => {
  return (
    <Jotform
      className={props.additionalClasses}
      src={`https://form.jotform.com/${props.jotFormId}`}
    />
  );
};

export const inlineJotFormSchema: Template = {
  name: "InlineJotForm",
  label: "In-line JotForm",
  fields: [
    {
      type: "string",
      name: "jotFormId",
      label: "JotForm ID",
      required: true,
    },
    {
      type: "string",
      name: "additionalClasses",
      label: "Additional classnames",
      description: "Optional styling for iframe element only",
    },
  ],
};
