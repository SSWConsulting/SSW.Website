import { tinaField } from "tinacms/dist/react";
import { BookingButton, bookingButtonSchema } from "../blocks";
import { Container } from "../util/container";
import { Section } from "../util/section";
 

export const callToActionSchema = {
  name: 'callToAction',
  label: 'Call to Action',
  description: 'The call to action button for contacting SSW',
  type: 'object',
  fields: [
    {
      type: "string",
      label: "Sub Title",
      name: "subTitle",
    },
    {
      type: "boolean",
      label: "Show Call to Action",
      name: "showCallToAction"
    },
    ...bookingButtonSchema.fields],
}

export const CallToAction = ({object, animated, subTitle, buttonText, buttonSubtitle, children}) => {
  return (<Section className="!bg-gray-75 pb-25 text-center">
            <Container size="custom" className="w-full">
              {children}
              {
                subTitle &&
              <p data-tina-field={tinaField(object, "subTitle")} className="text-lg w-fit mx-auto">
                {subTitle}
              </p>
              }
              <BookingButton data={
                {
                  animated: animated,
                  buttonText: buttonText,
                  buttonSubtitle: buttonSubtitle,
                  dataTinaField: tinaField(object, "buttonSubtitle")
                }} />
              </Container>
    </Section>)
}