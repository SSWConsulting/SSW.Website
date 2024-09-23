import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import React from "react";
export const ParamsProvider = ({ setQueryParams, children }) => {
  const params: ReadonlyURLSearchParams = useSearchParams();
  setQueryParams(params);
  return <React.Fragment>{children};</React.Fragment>;
};
