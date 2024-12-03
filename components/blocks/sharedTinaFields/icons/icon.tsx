"use client";
import dynamic from "next/dynamic";
import React from "react";

const DynamicIconComponent = ({ name, className, tinaField }) => {
  const IconComponent = dynamic(() =>
    import("./iconOptions").then((mod) => {
      const Component = mod.getIcon(name);
      if (!Component) {
        throw new Error(`Icon with name "${name}" not found`);
      }
      Component.displayName = `Icon(${name})`;
      // eslint-disable-next-line react/display-name
      return (props) => <Component {...props} />;
    })
  );

  return <IconComponent className={className} data-tina-field={tinaField} />;
};

const Icon = ({ data, className = "", tinaField = "" }) => {
  if (!data?.name) {
    return null;
  }

  return (
    <DynamicIconComponent
      name={data.name}
      className={`${className} shrink-0`}
      tinaField={tinaField}
    />
  );
};

export default Icon;
