"use client";

import { LOCAL_STORAGE_KEYS, PROD_BASE_URL } from "@/components/util/constants";
import { usePathname } from "next/navigation";

import { useEffect, useRef } from "react";
import { useSessionStorage } from "usehooks-ts";

/**
 * LandingPageCapture
 * Stores the initial page URL (origin + pathname) that the user lands on (i.e https://ssw.com.au/ )in sessionStorage.
 *
 * Notes:
 * - Uses NEXT_PUBLIC_SITE_URL (PROD_BASE_URL) for origin (no window usage).
 * - Runs once on mount; does not update on client-side navigations.
 */
const LandingPageCapture = () => {
  const setValue = useSessionStorage<string | null>(
    LOCAL_STORAGE_KEYS.LANDING_PAGE,
    null
  )[1];

  const pathname = usePathname();

  const langingPage = useRef(pathname);

  useEffect(() => {
    setValue(`${PROD_BASE_URL}${langingPage.current}`);
  }, [setValue, langingPage]);

  return <></>;
};

export default LandingPageCapture;
