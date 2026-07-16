import V2ComponentWrapper from "@/components/layout/v2ComponentWrapper";
import { hideOnClasses } from "@/components/util/hideOn";
import { Consultingv2BlocksSpacer } from "@/tina/types";

export function Spacer({ data }: { data: Consultingv2BlocksSpacer }) {
  const hideClasses = hideOnClasses(data?.hideOn);
  const spacer = (
    <V2ComponentWrapper data={data}>
      <div
        style={{
          height: data?.spacerHeight,
          width: "100%",
        }}
      />
    </V2ComponentWrapper>
  );
  return hideClasses ? <div className={hideClasses}>{spacer}</div> : spacer;
}
