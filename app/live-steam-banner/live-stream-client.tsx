"use client";

import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import { PropsWithChildren } from "react";

interface LiveStreamClientProps extends PropsWithChildren {
  param: string;
}
export const LiveStreamClient = ({
  param,
  children,
}: LiveStreamClientProps) => {
  const params: ReadonlyURLSearchParams = useSearchParams();
  return <>{params?.get(param) && children}</>;
};
