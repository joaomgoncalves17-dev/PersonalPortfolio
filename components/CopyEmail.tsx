"use client";

import { Check, Copy } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { buttonSecondary } from "./ui";

type Props = { email: string; labels: { copy: string; copied: string; copyError: string } };

export function CopyEmail({ email, labels }: Props) {
  const [state, setState] = useState<"idle" | "copied" | "error">("idle");

  useEffect(() => {
    if (state === "idle") return;
    const t = setTimeout(() => setState("idle"), 2000);
    return () => clearTimeout(t);
  }, [state]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
    } catch {
      setState("error");
    }
  };

  return (
    <button type="button" onClick={copy} className={buttonSecondary} aria-live="polite">
      {state === "copied" ? <Check size={16} weight="bold" aria-hidden /> : <Copy size={16} weight="bold" aria-hidden />}
      {state === "copied" ? labels.copied : state === "error" ? labels.copyError : labels.copy}
    </button>
  );
}
