import type { Template } from "tinacms";
import alternatingHeadingSchema from "../../../blocksSubtemplates/alternatingHeading.schema";
import { backgroundSchema } from "../../../layout/v2ComponentWrapper.schema";

// Rich-text nested inside a list isn't coerced from a string, so its default
// must be a rich-text AST object (matching accordionSchema's accordionItems).
const answerDefault = (text: string) => ({
  type: "root",
  children: [{ type: "p", children: [{ type: "text", text }] }],
});

export const V3FaqSchema: Template = {
  name: "v3Faq",
  label: "<V3> FAQ",
  ui: {
    defaultItem: {
      heading: "Frequently asked questions",
      faqs: [
        {
          question: "How much does it cost?",
          answer: answerDefault(
            "Every engagement is scoped to your goals, so there's no single price. The Health Check and first session are free, and you'll get a clear, costed plan before you commit to anything."
          ),
        },
        {
          question: "Do you work with our existing team?",
          answer: answerDefault("Yes — we embed alongside your team."),
        },
        {
          question: "Can you rescue a project that's already in trouble?",
          answer: answerDefault("Absolutely. We start with a Health Check."),
        },
      ],
    },
  },
  fields: [
    //@ts-expect-error – custom component typing won't be pinned down
    backgroundSchema,
    alternatingHeadingSchema,
    {
      type: "object",
      label: "Questions",
      name: "faqs",
      list: true,
      description: "The list of question / answer pairs.",
      ui: {
        itemProps: (item) => ({ label: item?.question ?? "Question" }),
        defaultItem: {
          question: "New question?",
          answer: answerDefault("Answer goes here."),
        },
      },
      fields: [
        {
          type: "string",
          label: "Question",
          name: "question",
        },
        {
          type: "rich-text",
          label: "Answer",
          name: "answer",
          toolbarOverride: ["bold", "italic", "link"],
        },
        {
          type: "string",
          label: "Read More Link",
          name: "link",
          description:
            "Optional. If set, a 'Read More' link renders under the answer.",
        },
      ],
    },
  ],
};
