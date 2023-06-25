import { Template } from "tinacms";
import { Container } from "../util/container";
import { SubNewsLetters } from "./subNewsLetters";

export const Subscribe = () => {
  return (
    <div
      // eslint-disable-next-line tailwindcss/no-arbitrary-value
      className={
        "flex h-80 w-full items-center bg-[url('/images/thumbs/subscribeBackground.png')] bg-cover bg-center bg-no-repeat text-center font-light after:absolute"
      }
    >
      <Container padding="px-4" className="w-full z-content">
        <SubNewsLetters
          headerText="Subscribe to the <span class='font-bold text-sswRed'>SSW Newsletter</span>"
          subscribeButtonText="Sign Up"
          subscribeSubTitle="Stay tuned for SSW News & upcoming events."
        />
      </Container>
    </div>
  );
};

export const subscribeSchema: Template = {
  name: "Subscribe",
  label: "Subscribe To NewsLetters",
  fields: [
    {
      type: "string",
      label: "Background",
      name: "background",
    },
  ],
};
