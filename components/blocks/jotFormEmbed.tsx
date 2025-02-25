"use client";

import React, { PropsWithChildren, useState } from "react";
import Jotform from "react-jotform";
import { twMerge } from "tailwind-merge";
import { Template } from "tinacms";
import { UtilityButton } from "../button/utilityButton";
import Popup from "../popup/popup";

export interface JotFormEmbedProps extends PropsWithChildren {
  jotFormId: string;
  containerClass: string;
  buttonClass?: string;
  buttonText: string;
  animated?: boolean;
}

export const JotFormEmbed: React.FC<JotFormEmbedProps> = ({
  jotFormId,
  containerClass,
  buttonClass,
  buttonText,
  animated,
  children,
}) => {
  const [open, setOpen] = useState(false);

  if (!jotFormId) return <></>;

  return (
    <>
      <div
        className={twMerge("flex w-full flex-col items-center", containerClass)}
      >
        <UtilityButton
          className={buttonClass}
          buttonText={buttonText}
          animated={animated}
          onClick={() => setOpen(true)}
        />
        {children}
      </div>
      <Popup
        isVisible={open}
        showCloseIcon={true}
        onClose={() => setOpen(false)}
      >
        <Jotform src={`https://www.jotform.com/${jotFormId}`}></Jotform>
      </Popup>
    </>
  );
};

export const jotFormEmbedSchema: Template = {
  name: "JotFormEmbed",
  label: "JotForm Embed",
  ui: {
    previewSrc: "/images/thumbs/tina/jotform-embed.jpg",
  },
  fields: [
    {
      type: "string",
      name: "jotFormId",
      label: "JotForm Id",
      required: true,
    },
    {
      type: "string",
      label: "Button Text",
      name: "buttonText",
      // required: true,
    },
    {
      type: "string",
      name: "containerClass",
      label: "Container Class",
    },
    {
      type: "string",
      label: "Button Class",
      name: "buttonClass",
    },
    {
      type: "boolean",
      label: "Animated",
      name: "animated",
    },
  ],
};
