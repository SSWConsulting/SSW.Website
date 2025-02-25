import {
  BookingButton,
  bookingButtonSchema,
} from "../bookingButton/bookingButton";
import { Container } from "../util/container";
import { Section } from "../util/section";

export const callToActionSchema = {
  name: "callToAction",
  label: "Call to Action",
  description: "The call to action button for contacting SSW",
  type: "object",
  fields: [
    {
      type: "string",
      label: "Sub Title",
      name: "subTitle",
    },
    {
      type: "boolean",
      label: "Show Call to Action",
      name: "showCallToAction",
    },
    ...bookingButtonSchema.fields,
  ],
};

type CallToActionProps = {
  tinaFields: {
    subTitle: string;
    buttonSubtitle: string;
  };
  animated: boolean;
  subTitle: string;
  buttonText: string;
  buttonSubtitle: string;
  children: React.ReactNode;
};
export const CallToAction: React.FC<CallToActionProps> = ({
  tinaFields,
  animated,
  subTitle,
  buttonText,
  buttonSubtitle,
  children,
}) => {
  return (
    <Section className="!bg-gray-75 pb-25 text-center">
      <Container size="custom" className="w-full">
        {children}
        {subTitle && (
          <p
            data-tina-field={tinaFields.subTitle}
            className="mx-auto w-fit text-lg"
          >
            {subTitle}
          </p>
        )}
        <BookingButton
          data={{
            animated: animated,
            buttonText: buttonText,
            buttonSubtitle: buttonSubtitle,
            tinaField: tinaFields.buttonSubtitle,
          }}
        />
      </Container>
    </Section>
  );
};

export const callToActionDefaults = {
  callToAction: {
    title: "Talk to us about your project",
    subTitle: "Connect with our Account Managers to discuss how we can help.",
    showCallToAction: true,
    ...bookingButtonSchema?.ui.defaultItem,
  },
};
