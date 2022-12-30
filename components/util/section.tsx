import React from "react";
import { useTheme } from "../layout";

export const Section = ({ children, color = "", className = "" }) => {
  const theme = useTheme();
  const sectionColor = {
    default:
      "text-gray-800 dark:text-gray-50",
    tint: "text-gray-900 dark:text-gray-100",
    primary: {
      blue: "text-white bg-blue-500",
      teal: "text-white bg-teal-500",
      green:
        "text-white bg-green-600",
      red: "text-white bg-red-500",
      pink: "text-white bg-pink-500",
      purple:
        "text-white bg-purple-500",
      orange:
        "text-white bg-orange-500",
      yellow:
        "text-white bg-yellow-500",
    },
  };
  const sectionColorCss =
    color === "primary"
      ? sectionColor.primary[theme.color]
      : sectionColor[color]
      ? sectionColor[color]
      : sectionColor.default;

  return (
    <section
      className={`flex-1 relative transition duration-150 ease-out body-font overflow-hidden ${sectionColorCss} ${className}`}
    >
      {children}
    </section>
  );
};
