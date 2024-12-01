import React from "react";

export const TinaInfo = ({ children }): React.ReactNode => {
  return (
    <span className="mt-2 block whitespace-normal font-sans text-xs text-gray-400">
      {children}
    </span>
  );
};
