import { tinaField } from "tinacms/dist/react";
import RippleButton, {
  buttonColorVariants,
} from "../../../button/rippleButtonV2";
import { Icon } from "../../../blocksSubtemplates/tinaFormElements/icon";
import { EventbriteModalButton } from "../../eventbrite/eventbriteModalButton";

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
 * button. Keeping the branch selection here keeps the generic Card render tidy.
 */
export const EmbeddedCardButton = ({ data }: { data: EmbeddedButtonData }) => {
  const variant = buttonColorVariants[data.colour ?? 2] ?? "ghost";
  const textTinaField = tinaField(data, "buttonText");
  const inner = (
    <>
      {data.buttonText}
      <Icon data={{ name: data.icon }} className="inline size-4" />
    </>
  );

  if (data.eventbriteEventId) {
    return (
      <EventbriteModalButton
        eventId={data.eventbriteEventId}
        variant={variant}
        className="mt-2 self-start"
        textTinaField={textTinaField}
      >
        {inner}
      </EventbriteModalButton>
    );
  }

  return (
    <RippleButton
      href={data.buttonLink || undefined}
      variant={variant}
      className="mt-2 self-start"
      textTinaField={textTinaField}
    >
      {inner}
    </RippleButton>
  );
};
