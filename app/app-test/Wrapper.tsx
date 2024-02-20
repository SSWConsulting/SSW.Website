"use client";

import { useTina } from "tinacms/dist/react";

export const TinaWrapper = ({ children, ...props }) => {
  const { data } = useTina({
    data: props.data,
    query: props.query,
    variables: props.variables,
  });

  return (
    <div>
      <p>wrapper here</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      {children}
    </div>
  );
};
