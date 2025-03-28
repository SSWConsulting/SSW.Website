import {
  BuiltOnAzure,
  BuiltOnAzureProps,
} from "@/components/blocks/builtOnAzure";
import { Section } from "@/components/util/section";
export const PreFooter = ({ data }: BuiltOnAzureProps) => {
  return (
    <Section className="w-full flex-none">
      <BuiltOnAzure data={data} />
    </Section>
  );
};
