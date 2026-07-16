import type { ReactNode } from "react";
import { tinaField } from "tinacms/dist/react";
import { Icon } from "../../../blocksSubtemplates/tinaFormElements/icon";
import {
  buttonColorVariants,
  DEFAULT_BUTTON_COLOUR,
} from "../../../blocksSubtemplates/tinaFormElements/colourOptions/buttonOptions";
import RippleButton from "../../../button/rippleButtonV2";
import { EventbriteModalButton } from "../../../eventbrite/eventbriteModalButton";

type EmbeddedButtonData = {
  buttonText?: string;
  buttonLink?: string;
  eventbriteEventId?: string;
  displayStyle?: "link" | "button";
  colour?: number;
  icon?: string;
};

// Legacy text-link CTA, kept as the default so existing cards are unchanged.
const LINK_CLASSNAME =
  "pt-2 font-semibold text-white !decoration-gray-400 !decoration-1 hover:!decoration-sswRed";

// Card CTA: Eventbrite checkout modal, a filled button, or — the default — a plain text-link.
export const EmbeddedCardButton = ({ data }: { data?: EmbeddedButtonData }) => {
  if (!data?.buttonText) return null;

  const variant =
    buttonColorVariants[data.colour ?? DEFAULT_BUTTON_COLOUR] ??
    buttonColorVariants[DEFAULT_BUTTON_COLOUR];
  const textTinaField = tinaField(data, "buttonText");
  const buttonClassName = "mt-2 w-full sm:w-auto sm:self-start";
  const inner = (
    <>
      {data.buttonText}
      <Icon data={{ name: data.icon }} className="inline size-4" />
    </>
  );

  let button: ReactNode;
  if (data.eventbriteEventId) {
    button = (
      <EventbriteModalButton
        eventId={data.eventbriteEventId}
        variant={variant}
        className={buttonClassName}
        textTinaField={textTinaField}
      >
        {inner}
      </EventbriteModalButton>
    );
  } else if (data.displayStyle === "button") {
    button = (
      <RippleButton
        href={data.buttonLink || undefined}
        variant={variant}
        className={buttonClassName}
        textTinaField={textTinaField}
      >
        {inner}
      </RippleButton>
    );
  } else {
    button = (
      <a
        href={data.buttonLink}
        data-tina-field={textTinaField}
        className={LINK_CLASSNAME}
      >
        {inner}
      </a>
    );
  }

  return (
    <div className="flex h-full flex-col-reverse justify-between">{button}</div>
  );
};
