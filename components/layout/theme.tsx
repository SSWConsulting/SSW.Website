"use client";

import * as React from "react";

const ThemeContext = React.createContext({});

export const useTheme = () => React.useContext(ThemeContext);

// const updateRenderColorMode = (themeMode: "dark" | "light") => {
//   if (typeof window !== "undefined") {
//     const root = window.document.documentElement;
//     root.classList.remove("dark");
//     root.classList.remove("light");
//     root.classList.add(themeMode);
//   }
// };

const getUserSystemDarkMode = () => {
  if (typeof window !== "undefined") {
    const userMedia = window.matchMedia("(prefers-color-scheme: dark)");

    if (userMedia.matches) {
      return "dark";
    }
  }

  return "light";
};

export const Theme = ({ children }) => {
  const [systemDarkMode, setSystemDarkMode] = React.useState(
    getUserSystemDarkMode()
  );

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const userMedia = window.matchMedia("(prefers-color-scheme: dark)");

      const updateSystemMediaPreference = (event) => {
        setSystemDarkMode(event.matches ? "dark" : "light");
      };

      userMedia.addEventListener("change", updateSystemMediaPreference);

      return () =>
        userMedia.removeEventListener("change", updateSystemMediaPreference);
    }
    return;
  }, [setSystemDarkMode]);

  return (
    <ThemeContext.Provider
      value={{
        darkMode: systemDarkMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
