import { BookingButton } from "../blocks"
import { Container } from "../util/container"
import { Section } from "../util/section"

export const CallToAction = ({object, animated, subTitle, buttonText, buttonSubtitle, tinaField, children}) => {
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