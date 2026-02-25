"use client";
import { useTranslation } from "@/lib/language-context";

export default function T({ k }: { k: string }) {
  const { t } = useTranslation();
  return <>{t(k)}</>;
}
