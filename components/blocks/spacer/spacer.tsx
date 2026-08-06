import { backgroundOptions } from "@/components/blocksSubtemplates/tinaFormElements/colourOptions/blockBackgroundOptions";
import V2ComponentWrapper from "@/components/layout/v2ComponentWrapper";
import { hideOnClasses } from "@/components/util/hideOn";
import { Consultingv2BlocksSpacer } from "@/tina/types";
import classNames from "classnames";

export function Spacer({ data }: { data: Consultingv2BlocksSpacer }) {
  const hideClasses = hideOnClasses(data?.hideOn);

  // A spacer renders nothing, so the wrapper's fade-in observer, bleed image,
  // glow and grid overlay have nothing to act on — only pay for the client
  // component when one of them is actually configured.
  const isDecorated = Boolean(
    data?.background?.backgroundImage ||
      data?.background?.redGlow ||
      data?.background?.gridOverlay
  );

  const spacer = isDecorated ? (
    <V2ComponentWrapper data={data} ariaHidden>
      <div
        style={{
          height: data?.spacerHeight,
          width: "100%",
        }}
      />
    </V2ComponentWrapper>
  ) : (
    <section
      aria-hidden="true"
      className={classNames(
        backgroundOptions.find(
          (value) => value.reference === data?.background?.backgroundColour
        )?.classes,
        "relative w-full overflow-visible"
      )}
      style={{ height: data?.spacerHeight }}
    />
  );

  return hideClasses ? (
    <div aria-hidden="true" className={hideClasses}>
      {spacer}
    </div>
  ) : (
    spacer
  );
}
