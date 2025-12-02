"use client";

import { LOCAL_STORAGE_KEYS } from "@/components/util/constants";
import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

const LandingPageCapture = () => {
  const setValue = useLocalStorage(LOCAL_STORAGE_KEYS.LANDING_PAGE, null)[1];

  useEffect(() => {
    const entries = window.performance.getEntriesByType("navigation");
    const entry = entries[0] as PerformanceNavigationTiming | undefined;

    // prevent local storage from being reset during a refresh
    if (entry?.type !== "reload") {
      setValue(window.location.href);
    }
  }, [setValue]);
  return <></>;
};

export default LandingPageCapture;
