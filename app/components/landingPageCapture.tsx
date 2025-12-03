"use client";

import {
  PROD_BASE_URL,
  SESSION_STORAGE_KEYS,
} from "@/components/util/constants";
import { usePathname, useSearchParams } from "next/navigation";

import { useEffect } from "react";
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
  const setValue = useSessionStorage<string>(
    SESSION_STORAGE_KEYS.LANDING_PAGE,
    ""
  )[1];
  const pathname = usePathname();
  const search = useSearchParams();

  useEffect(() => {
    const qs = search?.toString();
    setValue(`${PROD_BASE_URL}${pathname}${qs ? `?${qs}` : ""}`);
  }, [pathname, search, setValue]);

  return null;
};

export default LandingPageCapture;
