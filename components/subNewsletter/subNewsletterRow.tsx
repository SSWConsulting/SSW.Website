import { Template } from "tinacms";
import { Container } from "../util/container";
import { SubNewsLettersForm } from "./subNewsletterForm";

export type SubNewsletterRowProps = {
  headerText?: string;
  subscribeButtonText?: string;
  subscribeSubTitle?: string;
};

export const SubNewsletterRow = (props: SubNewsletterRowProps) => {
  return (
    <div
      className={
        "flex h-80 w-full items-center bg-subscribeBackground bg-cover bg-center bg-no-repeat text-center font-light after:absolute"
      }
    >
      <Container padding="px-4" className="w-full">
        <SubNewsLettersForm
          headerText={props.headerText}
          subscribeButtonText={props.subscribeButtonText || "Sign Up"}
          subscribeSubTitle={props.subscribeSubTitle}
        />
      </Container>
    </div>
  );
};

export const subNewsletterRowSchema: Template = {
  name: "SubNewsletterRow",
  label: "Subscribe To Newsletters Row",
  fields: [
    {
      type: "string",
      label: "Override Header Text",
      name: "headerText",
      required: false,
    },
    {
      type: "string",
      label: "Override Subscribe Button Text",
      name: "subscribeButtonText",
      required: false,
    },
    {
      type: "string",
      label: "Override Subscribe Sub Title",
      name: "subscribeSubTitle",
      required: false,
    },
  ],
};
