import { BuiltOnAzure } from "@/components/blocks";
import { Section } from "@/components/util/section";

export const PreFooter = ({ backgroundColor }) => {
  return (
    <Section className="w-full flex-none">
      <BuiltOnAzure
        data={{ backgroundColor: backgroundColor ?? "lightgray" }}
      />
    </Section>
  );
};
