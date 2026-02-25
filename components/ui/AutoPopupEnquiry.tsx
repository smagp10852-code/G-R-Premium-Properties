"use client";

import { useState, useEffect } from "react";
import EnquiryModal from "@/components/ui/EnquiryModal";

export default function AutoPopupEnquiry() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <EnquiryModal
      open={open}
      onClose={() => setOpen(false)}
    />
  );
}
