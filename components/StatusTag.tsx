import type { Status } from "@/content/types";

const styles: Record<Status, string> = {
  done: "border-ink text-ink",
  current: "border-accent text-accent",
  planned: "border-line text-muted",
};

export function StatusTag({ status, label }: { status: Status; label: string }) {
  return <span className={`inline-block border px-2 py-0.5 font-mono text-[11px] ${styles[status]}`}>{label}</span>;
}
