"use client";
import { Suspense } from "react";
import LandingPageCapture from "./landingPageCapture";

const LandingPageCaptureWrapper = () => {
  return (
    <Suspense fallback={null}>
      <LandingPageCapture />
    </Suspense>
  );
};

export default LandingPageCaptureWrapper;
