"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-4 z-[9999] w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
      style={{ backgroundColor: "#1E2A38", color: "#fff" }}
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
