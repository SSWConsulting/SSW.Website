import { Template } from "tinacms";
import { Container } from "../util/container";
import { SubNewsLetters } from "./subNewsLetters";

export type SubscribeProps = {
  headerText?: string;
  subscribeButtonText?: string;
  subscribeSubTitle?: string;
};

export const Subscribe = (props: SubscribeProps) => {
  return (
    <div
      className={
        "flex h-80 w-full items-center bg-subscribeBackground bg-cover bg-center bg-no-repeat text-center font-light after:absolute"
      }
    >
      <Container padding="px-4" className="w-full">
        <SubNewsLetters
          headerText={`<span class='mix-blend-difference mr-3'>${props.headerText}</span>`}
          subscribeButtonText={props.subscribeButtonText || "Sign Up"}
          subscribeSubTitle={props.subscribeSubTitle}
        />
      </Container>
    </div>
  );
};

export const subscribeSchema: Template = {
  name: "Subscribe",
  label: "Subscribe To Newsletters (Full width)",
  fields: [
    {
      type: "string",
      label: "Background",
      name: "background",
    },
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
