import type { Template } from "tinacms";
import Jotform from "react-jotform";

export type InlineJotFormProps = {
  title?: string;
  jotFormId: string;
  additionalClasses?: string;
};

export const InlineJotForm = (props: InlineJotFormProps) => {
  return (
    <>
      {props.title && <h2 className="text-center">{props.title}</h2>}
      <Jotform
        className={props.additionalClasses}
        src={`https://form.jotform.com/${props.jotFormId}`}
      />
    </>
  );
};

export const inlineJotFormSchema: Template = {
  name: "InlineJotForm",
  label: "In-line JotForm",
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title",
      description: "Optional title for JotForm",
    },
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
