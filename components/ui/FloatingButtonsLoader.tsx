"use client";

import dynamic from "next/dynamic";

// ✅ `ssr: false` is only allowed inside a Client Component — layout.tsx is
// a Server Component, so the dynamic() call has to live here instead. This
// file itself renders nothing server-side (it's a client boundary), and
// layout.tsx just imports it like a normal component.
const FloatingButtonsInner = dynamic(
  () =>
    import("@/components/ui/FloatingButtons").then(
      (mod) => mod.FloatingButtons
    ),
  { ssr: false }
);

export default function FloatingButtonsLoader() {
  return <FloatingButtonsInner />;
}