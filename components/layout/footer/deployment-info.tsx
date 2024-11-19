import { CustomLink } from "@/components/customLink";
import React from "react";

export const DeploymentInfo = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  return (
    <div className="text-center sm:text-left">
      This website is under{" "}
      <CustomLink href="https://www.ssw.com.au/rules/rules-to-better-websites-deployment">
        CONSTANT CONTINUOUS DEPLOYMENT
      </CustomLink>
      {children && <>.&nbsp;{children}</>}
    </div>
  );
};
