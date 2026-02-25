"use client";

import { CallButton } from "@/components/ui/CallButton";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { BackToTop } from "@/components/ui/BackToTop";

export function FloatingButtons() {
  return (
    <>
      <div className="fixed bottom-6 left-4 z-50 flex flex-col gap-3" data-testid="floating-contact">
        <CallButton />
        <WhatsAppButton />
      </div>
      <BackToTop />
    </>
  );
}
