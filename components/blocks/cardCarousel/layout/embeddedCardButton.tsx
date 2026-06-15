import { tinaField } from "tinacms/dist/react";
import { Icon } from "../../../blocksSubtemplates/tinaFormElements/icon";
import { DEFAULT_BUTTON_COLOUR } from "../../../blocksSubtemplates/tinaFormElements/colourOptions/buttonOptions";
import RippleButton, {
  buttonColorVariants,
} from "../../../button/rippleButtonV2";
import { EventbriteModalButton } from "../../../eventbrite/eventbriteModalButton";

type EmbeddedButtonData = {
  buttonText?: string;
  buttonLink?: string;
  eventbriteEventId?: string;
  colour?: number;
  icon?: string;
};

/**
 * Renders the call-to-action on a card. The action is one of three, in order of
 * precedence: an Eventbrite checkout modal, an external/anchor link, or a plain
 * button. The component owns its whole contract — branch selection and the
 * "no text, no button" gate — so Card can render it unconditionally.
 */
export const EmbeddedCardButton = ({ data }: { data?: EmbeddedButtonData }) => {
  if (!data?.buttonText) return null;

  const variant =
    buttonColorVariants[data.colour ?? DEFAULT_BUTTON_COLOUR] ??
    buttonColorVariants[DEFAULT_BUTTON_COLOUR];
  const textTinaField = tinaField(data, "buttonText");
  const inner = (
    <>
      {data.buttonText}
      <Icon data={{ name: data.icon }} className="inline size-4" />
    </>
  );

  const button = data.eventbriteEventId ? (
    <EventbriteModalButton
      eventId={data.eventbriteEventId}
      variant={variant}
      className="mt-2 w-full sm:w-auto sm:self-start"
      textTinaField={textTinaField}
    >
      {inner}
    </EventbriteModalButton>
  ) : (
    <RippleButton
      href={data.buttonLink || undefined}
      variant={variant}
      className="mt-2 w-full sm:w-auto sm:self-start"
      textTinaField={textTinaField}
    >
      {inner}
    </RippleButton>
  );

  return (
    <div className="flex h-full flex-col-reverse justify-between">{button}</div>
  );
};
