"use client";

import classNames from "classnames";
import { JSX } from "react";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import type { Template } from "tinacms";
import { CustomLink } from "../customLink";
import Button from "./rippleButton";

const sizes = {
  small: "px-4 py-2 text-sm",
  medium: "px-10 py-3",
} as const;

// Secondary is an outlined button for light backgrounds, for a link that sits
// beside or below the main content rather than a call to action.
const variants = {
  primary: "bg-sswRed text-white rounded",
  secondary:
    "rounded border-1.5 border-stroke-strong bg-transparent text-foreground hover:border-brand hover:text-brand",
} as const;

type UtilityButtonProps = {
  buttonText?: string | JSX.Element;
  onClick?: () => void;
  className?: string;
  link?: string;
  size?: keyof typeof sizes;
  btnIcon?: keyof typeof utilIcons;
  animated?: boolean;
  uncentered?: boolean;
  removeTopMargin?: boolean;
  openInNewTab?: boolean;
  disabled?: boolean;
  variant?: keyof typeof variants;
};

const utilIcons = {
  BsArrowRightCircle: () => <BsArrowRightCircle className="ml-1 inline" />,
  BsArrowLeftCircle: () => <BsArrowLeftCircle className="ml-1 inline" />,
} as const;

const iconMapper = (icon: keyof typeof utilIcons) => {
  const Icon = utilIcons[icon];
  if (!Icon) return <></>;
  return <Icon />;
};

// Any change on this component requires a thorough testing on all the places it's used
export const UtilityButton = ({
  buttonText,
  onClick,
  className,
  link,
  size,
  btnIcon,
  animated,
  uncentered,
  removeTopMargin,
  openInNewTab,
  disabled,
  variant,
}: UtilityButtonProps) => {
  const baseComponent = (
    <Button
      ripple
      defaultClass={variants[variant ?? "primary"]}
      className={classNames(
        "h-auto",
        sizes[size ?? "medium"],
        uncentered ? "" : "mx-auto max-w-full",
        removeTopMargin ? "" : "mt-8",
        className
      )}
      onClick={() => !disabled && onClick?.()}
      data-aos={animated ? "fade-up" : undefined}
    >
      {buttonText}
      {btnIcon && iconMapper(btnIcon)}
    </Button>
  );

  if (link) {
    return (
      <CustomLink
        href={link}
        target={openInNewTab ? "_blank" : ""}
        className="unstyled block no-underline"
      >
        {baseComponent}
      </CustomLink>
    );
  }

  return baseComponent;
};

export const utilityButtonSchema: Template = {
  name: "UtilityButton",
  label: "Utility Button",
  ui: {
    previewSrc: "/images/thumbs/tina/utility-button.jpg",
    itemProps: (item) => ({ label: item?.btnText }),
  },
  fields: [
    {
      type: "string",
      label: "Button Text",
      name: "buttonText",
      required: false,
      isBody: true,
    },
    {
      type: "string",
      label: "Link",
      name: "link",
      required: false,
    },
    {
      type: "string",
      label: "Size",
      name: "size",
      required: false,
      options: Object.keys(sizes),
    },
    {
      type: "string",
      label: "Style",
      name: "variant",
      required: false,
      description:
        "Primary is the red call-to-action button (default). Secondary is an outlined button for links like a photo album.",
      options: [
        { label: "Primary", value: "primary" },
        { label: "Secondary", value: "secondary" },
      ],
    },
    {
      type: "string",
      label: "Icon",
      name: "btnIcon",
      required: false,
      options: Object.keys(utilIcons),
    },
    {
      type: "boolean",
      label: "Animated",
      name: "animated",
      required: false,
    },
    {
      type: "boolean",
      label: "Uncentered",
      name: "uncentered",
      required: false,
    },
    {
      type: "boolean",
      label: "Remove top margin",
      name: "removeTopMargin",
      required: false,
    },
    {
      type: "boolean",
      label: "Open in new tab",
      name: "openInNewTab",
      required: false,
    },
  ],
};
