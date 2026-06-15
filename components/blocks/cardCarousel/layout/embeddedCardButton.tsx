import { tinaField } from "tinacms/dist/react";
import { Icon } from "../../../blocksSubtemplates/tinaFormElements/icon";
import {
  buttonColorVariants,
  DEFAULT_BUTTON_COLOUR,
} from "../../../blocksSubtemplates/tinaFormElements/colourOptions/buttonOptions";
import RippleButton from "../../../button/rippleButtonV2";

type EmbeddedButtonData = {
  buttonText?: string;
  buttonLink?: string;
  colour?: number;
  icon?: string;
};

/**
 * Renders the call-to-action on a card: an external/anchor link or a plain
 * button. The component owns its whole contract — the "no text, no button"
 * gate — so Card can render it unconditionally. Full width on mobile, content
 * width from the sm breakpoint up.
 */
export const EmbeddedCardButton = ({ data }: { data?: EmbeddedButtonData }) => {
  if (!data?.buttonText) return null;

  const variant =
    buttonColorVariants[data.colour ?? DEFAULT_BUTTON_COLOUR] ??
    buttonColorVariants[DEFAULT_BUTTON_COLOUR];
  const textTinaField = tinaField(data, "buttonText");

  return (
    <div className="flex h-full flex-col-reverse justify-between">
      <RippleButton
        href={data.buttonLink || undefined}
        variant={variant}
        className="mt-2 w-full sm:w-auto sm:self-start"
        textTinaField={textTinaField}
      >
        {data.buttonText}
        <Icon data={{ name: data.icon }} className="inline size-4" />
      </RippleButton>
    </div>
  );
};
