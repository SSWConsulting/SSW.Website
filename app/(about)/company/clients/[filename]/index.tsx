"use client";

import { ClientStory } from "@/components/company/clientStory";

export default function CaseStudyPage({ tinaProps, props }) {
  const { data } = tinaProps;

  return (
    <ClientStory
      caseStudy={data.caseStudy}
      story={props.story ?? null}
      relatedStories={props.relatedStories ?? []}
      relativePath={props.variables.relativePath}
    />
  );
}
