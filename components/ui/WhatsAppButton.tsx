"use client";

import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/971501993213"
      target="_blank"
      rel="noopener noreferrer"
      className="w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-105"
      style={{ backgroundColor: "#25D366", color: "#fff" }}
      data-testid="button-whatsapp"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-5 h-5" />
    </a>
  );
}
