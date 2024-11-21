import React from "react";
type MenuWrapperProps = {
  children: React.ReactNode;
};
export const MenuWrapper = (props: MenuWrapperProps) => {
  return <div className="mx-auto max-w-9xl px-8">{props.children}</div>
};
