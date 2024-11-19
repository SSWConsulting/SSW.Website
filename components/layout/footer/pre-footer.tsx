import { BuiltOnAzure } from "@/components/blocks/builtOnAzure";
import { SectionColor } from "@/components/util/constants/styles";
import { Section } from "@/components/util/section";

export const PreFooter = ({
  backgroundColor = SectionColor.LightGray,
}: {
  backgroundColor: SectionColor;
}) => {
  return (
    <Section className="w-full flex-none">
      <BuiltOnAzure data={{ backgroundColor }} />
    </Section>
  );
};
