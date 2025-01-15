import { BuiltOnAzure, BuiltOnAzureProps } from "@/components/blocks/builtOnAzure";
import { SectionColor } from "@/components/util/constants/styles";
import { Section } from "@/components/util/section";
import { headers } from "next/headers";
export const PreFooter = ({
  data
}: BuiltOnAzureProps) => {
  return (
    <Section className="w-full flex-none">
      <BuiltOnAzure data={data} />
    </Section>
  );
};
