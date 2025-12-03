import Jotform from "react-jotform";
import { type Template } from "tinacms";
import { useLocalStorage } from "usehooks-ts";
import { LOCAL_STORAGE_KEYS } from "../util/constants";

export type InlineJotFormProps = {
  title?: string;
  jotFormId: string;
  additionalClasses?: string;
};

export const InlineJotForm = (props: InlineJotFormProps) => {
  const [landingPage] = useLocalStorage<string | null>(
    LOCAL_STORAGE_KEYS.LANDING_PAGE,
    null
  );
  return (
    <>
      {props.title && <h2 className="text-center">{props.title}</h2>}
      <Jotform
        defaults={{
          landingPage,
        }}
        className={props.additionalClasses}
        src={`https://www.jotform.com/${props.jotFormId}`}
      />
    </>
  );
};

export const inlineJotFormSchema: Template = {
  name: "InlineJotForm",
  label: "In-line JotForm",
  ui: {
    previewSrc: "/images/thumbs/tina/inline-jot-form.jpg",
  },
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
