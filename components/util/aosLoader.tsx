"use client";

import "aos/dist/aos.css";
import { useEffect } from "react";

// Loads and initialises AOS only where a component actually renders data-aos
// elements, instead of on every page. Renders nothing.
let initialised = false;

export const AosLoader = () => {
  useEffect(() => {
    let cancelled = false;

    void import("aos").then((mod) => {
      if (cancelled) return;
      const AOS = mod.default;
      if (!initialised) {
        AOS.init({ duration: 1200, once: true });
        initialised = true;
      }
      AOS.refresh();
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
};

export default AosLoader;
