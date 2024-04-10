import type { Template } from "tinacms";
import Jotform from "react-jotform";

export type InlineJotFormProps = {
  jotFormId: string;
  additionalClasses: string;
};

export const InlineJotForm = (props: InlineJotFormProps) => {
  return (
    <Jotform
      className={props.additionalClasses}
      src={`https://form.jotform.com/${props.jotFormId}`}
    />
    //   <iframe
    //     className="bg-subscribeBackground"
    //     id="JotFormIFrame-240991361342051"
    //     title="DRAFT Newsletter signup form"
    //     onLoad={updateTextColor}
    //     ref={iFrameRef}
    //     // allowtransparency="true"
    //     allow="geolocation; microphone; camera; fullscreen"
    //     src="https://form.jotform.com/240991361342051"
    //     // frameborder="0"
    //     scrolling="no"
    //     style={{
    //       minWidth: "100%",
    //       maxWidth: "100%",
    //       border: "none",
    //       minHeight: "300px",
    //     }}
    //   ></iframe>
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
    },
  ],
};
