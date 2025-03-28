import V2ComponentWrapper from "@/components/layout/v2ComponentWrapper";
import { Consultingv2BlocksSpacer } from "@/tina/types";

export function Spacer({ data }: { data: Consultingv2BlocksSpacer }) {
  return (
    <V2ComponentWrapper data={data}>
      <div
        style={{
          height: data?.spacerHeight,
          width: "100%",
        }}
      />
    </V2ComponentWrapper>
  );
}
