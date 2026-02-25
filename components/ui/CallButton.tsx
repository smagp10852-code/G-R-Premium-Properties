"use client";

import { Phone } from "lucide-react";

export function CallButton() {
  return (
    <a
      href="tel:+971501993213"
      className="w-11 h-11 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
      style={{ backgroundColor: "#D4A843", color: "#fff" }}
    >
      <Phone className="w-5 h-5" />
    </a>
  );
}
