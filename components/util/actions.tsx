import * as React from "react";
import { BiRightArrowAlt } from "@react-icons/all-files/bi/BiRightArrowAlt";
import { cn } from "@/lib/utils";
import { CustomLink } from "../customLink";
// import { useTheme } from "../layout";

export const Actions = ({
  parentColor = "default",
  parentField = "",
  className = "",
  actions,
}) => {
  // const theme = useTheme();
  // These were per-colour maps from the Tina starter, but only ever indexed
  // with .blue - so every button and link here rendered Tailwind blue.
  const buttonColorClasses =
    "text-white bg-sswRed hover:bg-sswDarkRed bg-gradient-to-r from-sswRed to-sswDarkRed hover:from-sswRed hover:to-sswRed";
  const invertedButtonColorClasses =
    "text-sswRed bg-white hover:bg-gray-50 bg-gradient-to-r from-gray-50 to-white hover:to-gray-100";
  const linkButtonColorClasses = "text-sswRed hover:text-sswDarkRed";

  return (
    <div className={`flex flex-wrap items-center gap-x-6 gap-y-4 ${className}`}>
      {actions &&
        actions.map(function (action, index) {
          let element = null;
          if (action.type === "button") {
            element = (
              <CustomLink key={index} href={action.link ? action.link : "/"}>
                <button
                  data-tinafield={`${parentField}.${index}`}
                  className={cn(
                    "focus:shadow-outline relative z-10 flex items-center whitespace-nowrap rounded-lg px-7 py-3 text-lg font-semibold ring-offset-2 ring-offset-current transition duration-150 ease-out focus:outline-none focus:ring-2",
                    parentColor === "primary"
                      ? invertedButtonColorClasses
                      : buttonColorClasses
                  )}
                >
                  {action.label}
                  {action.icon && (
                    <BiRightArrowAlt
                      className={"-mr-1 ml-1 size-6 opacity-80"}
                    />
                  )}
                </button>
              </CustomLink>
            );
          }
          if (action.type === "link" || action.type === "linkExternal") {
            element = (
              <CustomLink
                key={index}
                href={action.link ? action.link : "/"}
                data-tinafield={`${parentField}.${index}`}
                className={cn(
                  "group inline-flex items-center text-lg font-semibold transition duration-150 ease-out",
                  parentColor === "primary"
                    ? "text-white hover:text-gray-50"
                    : linkButtonColorClasses
                )}
              >
                {action.label}
                {action.icon && (
                  <BiRightArrowAlt className={"mx-0 size-6 opacity-80"} />
                )}
              </CustomLink>
            );
          }
          return element;
        })}
    </div>
  );
};
