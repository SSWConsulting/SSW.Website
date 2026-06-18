import type { Template } from "tinacms";
import alternatingHeadingSchema from "../../../blocksSubtemplates/alternatingHeading.schema";
import { backgroundSchema } from "../../../layout/v2ComponentWrapper.schema";

export const V3LeadCaptureSchema: Template = {
  name: "v3LeadCapture",
  label: "<V3> Lead Capture",
  ui: {
    defaultItem: {
      heading: "Let's find the **right** starting point",
      leadJotFormId: "",
      emailFieldId: "",
      steps: [
        {
          heading: "What stage is your project at?",
          options: [
            "Starting something new",
            "Adding to an app we already run",
            "Fixing an app that's struggling",
            "Something else",
          ],
        },
      ],
      leadSubmitStep: {
        header: "Where should we contact you?",
        subheader:
          "Add your email and a senior React engineer will set up a time to walk you through where we would start.",
        emailPlaceholder: "you@company.com",
        submitButtonText: "Book my meeting",
        footnote: "No newsletter. Replies usually within one business day",
      },
    },
  },
  fields: [
    //@ts-expect-error – custom component typing won't be pinned down
    backgroundSchema,
    {
      type: "string",
      label: "Brow",
      name: "brow",
      description: "Small eyebrow text above the title.",
    },
    alternatingHeadingSchema,
    {
      type: "rich-text",
      label: "Description",
      name: "description",
      description: "Optional intro body text shown beneath the title.",
      toolbarOverride: ["bold", "italic", "link"],
    },
    {
      type: "string",
      label: "JotForm ID",
      name: "leadJotFormId",
      description:
        "The numeric ID of the JotForm that receives submissions (the form must have matching fields).",
    },
    {
      type: "string",
      label: "Email Field ID",
      name: "emailFieldId",
      description:
        "The JotForm question ID (qid) of the Email field, e.g. \"3\".",
    },
    {
      type: "string",
      label: "Notes Field ID",
      name: "notesFieldId",
      description:
        "The JotForm qid of the Notes field (receives the free-text/textarea answer).",
    },
    {
      type: "string",
      label: "Questions & Answers Field ID",
      name: "answersFieldId",
      description:
        "The JotForm qid of the Questions & Answers field (receives a text dump of every question and the answer given).",
    },
    {
      type: "object",
      label: "Questions",
      name: "steps",
      list: true,
      description: "The quiz questions, shown one per step before the contact step.",
      ui: {
        itemProps: (item) => ({ label: item?.heading ?? "Question" }),
        defaultItem: { heading: "New question?" },
      },
      fields: [
        {
          type: "string",
          label: "Question",
          name: "heading",
        },
        {
          type: "string",
          label: "Options",
          name: "options",
          list: true,
          description: "Up to 4 multiple-choice answers (leave empty if using a text area).",
          ui: {
            min: 0,
            max: 4,
          },
        },
        {
          type: "boolean",
          label: "Use a text area instead of options?",
          name: "showTextArea",
          description:
            "If true, this step shows a free-text area instead of multiple-choice options. Its answer goes into the Notes field.",
        },
      ],
    },
    {
      type: "object",
      label: "Contact Step",
      name: "leadSubmitStep",
      description: "The final step where the visitor enters their email.",
      fields: [
        {
          type: "string",
          label: "Header",
          name: "header",
        },
        {
          type: "string",
          label: "Subheader",
          name: "subheader",
          ui: { component: "textarea" },
        },
        {
          type: "string",
          label: "Email Placeholder",
          name: "emailPlaceholder",
        },
        {
          type: "string",
          label: "Submit Button Text",
          name: "submitButtonText",
        },
        {
          type: "string",
          label: "Footnote",
          name: "footnote",
          description: "Small reassurance text beneath the email field.",
        },
      ],
    },
  ],
};
