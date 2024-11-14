"use client";

import { useEffect } from "react";

const ErrorThrower = () => {
  useEffect(() => {
    throw new Error("Boundary error test");
  });
  return <></>;
};

export default ErrorThrower;
