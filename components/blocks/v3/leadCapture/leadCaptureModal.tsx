"use client";

import AlternatingText from "@/components/alternating-text";
import Popup from "@/components/popup/popup";
import { LeadCaptureForm } from "./leadCaptureForm";

type LeadCaptureModalProps = {
  isVisible: boolean;
  onClose: () => void;
};

export function LeadCaptureModal({
  isVisible,
  onClose,
}: LeadCaptureModalProps) {
  return (
    <Popup isVisible={isVisible} showCloseIcon={true} onClose={onClose}>
      {/* `dark` re-scopes the theme tokens (--background etc.) inside the
          portal, which renders outside the page's dark wrapper. */}
      <div className="dark rounded-2xl border-0.5 border-white/10 bg-black p-4 text-foreground sm:p-8">
        <div className="mx-auto mb-8 max-w-xl text-center">
          <h2 className="text-3xl text-white">
            <AlternatingText text="Tell us about **your** project" />
          </h2>
          <p className="mt-3 text-base font-light text-gray-300">
            Answer a few quick questions. We&apos;ll set up an initial meeting
            and show you where we&apos;d start
          </p>
        </div>
        <LeadCaptureForm />
      </div>
    </Popup>
  );
}
