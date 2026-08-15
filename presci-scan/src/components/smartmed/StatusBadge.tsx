import { cn } from "@/lib/utils";
import { statusLabel } from "@/lib/smartmed/domain";
import type { StockStatus } from "@/lib/smartmed/types";

const styles: Record<StockStatus, string> = {
  safe: "bg-safe/15 text-safe border-safe/40",
  near: "bg-warn/15 text-warn border-warn/40",
  expired: "bg-destructive/15 text-destructive border-destructive/40",
};

export function StatusBadge({ status, className }: { status: StockStatus; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap",
        styles[status],
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {statusLabel[status]}
    </span>
  );
}