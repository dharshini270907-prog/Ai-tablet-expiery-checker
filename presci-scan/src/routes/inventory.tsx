import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import { AppShell } from "@/components/smartmed/AppShell";
import { StatusBadge } from "@/components/smartmed/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDate, formatStamp, inr, statusOf } from "@/lib/smartmed/domain";
import { useSmartMed } from "@/lib/smartmed/store";

export const Route = createFileRoute("/inventory")({
  head: () => ({
    meta: [
      { title: "Inventory — Batch-Level Stock Register | SmartMed AI" },
      {
        name: "description",
        content:
          "Search, filter and sort every medicine batch with received timestamps, expiry dates, quantity, price and PAB status badges.",
      },
      { property: "og:title", content: "Inventory — SmartMed AI" },
      {
        property: "og:description",
        content: "Batch-level pharmacy stock register with live expiry status and FEFO sorting.",
      },
    ],
  }),
  component: InventoryPage,
});

function InventoryPage() {
  const { inventory, user, removeMedicine } = useSmartMed();
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("received-desc");

  const categories = useMemo(
    () => Array.from(new Set(inventory.map((m) => m.category))).sort(),
    [inventory],
  );

  const rows = useMemo(() => {
    const term = q.trim().toLowerCase();
    const list = inventory.filter((m) => {
      const matchQ =
        !term ||
        m.name.toLowerCase().includes(term) ||
        m.batchNo.toLowerCase().includes(term) ||
        m.barcode.includes(term);
      const matchC = category === "all" || m.category === category;
      const matchS = status === "all" || statusOf(m) === status;
      return matchQ && matchC && matchS;
    });
    const sorters: Record<string, (a: typeof list[number], b: typeof list[number]) => number> = {
      "received-desc": (a, b) => +new Date(b.receivedAt) - +new Date(a.receivedAt),
      "received-asc": (a, b) => +new Date(a.receivedAt) - +new Date(b.receivedAt),
      "expiry-asc": (a, b) => +new Date(a.expiryDate) - +new Date(b.expiryDate),
      "name-asc": (a, b) => a.name.localeCompare(b.name),
      "value-desc": (a, b) => b.quantity * b.price - a.quantity * a.price,
    };
    return [...list].sort(sorters[sort] ?? sorters["received-desc"]!);
  }, [inventory, q, category, status, sort]);

  const readOnly = user?.role !== "owner";

  return (
    <AppShell
      title="Inventory Management"
      subtitle={
        readOnly
          ? "Read-only view — shop keepers can browse stock but not edit it."
          : "Every batch, timestamped on arrival and scored for expiry risk."
      }
    >
      <div className="panel mb-4 grid gap-3 p-4 md:grid-cols-4">
        <Input
          placeholder="Search name, batch or barcode…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          maxLength={60}
        />
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {categories.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="safe">Safe</SelectItem>
            <SelectItem value="near">Near-Expiry</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger>
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="received-desc">Recently received first</SelectItem>
            <SelectItem value="received-asc">Oldest received first</SelectItem>
            <SelectItem value="expiry-asc">Nearest expiry (FEFO)</SelectItem>
            <SelectItem value="name-asc">Name A–Z</SelectItem>
            <SelectItem value="value-desc">Highest stock value</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="panel overflow-x-auto">
        <table className="w-full min-w-[900px] text-sm">
          <thead className="bg-secondary/40 text-muted-foreground text-xs uppercase">
            <tr>
              <th className="px-4 py-3 text-left">Medicine</th>
              <th className="px-4 py-3 text-left">Batch No</th>
              <th className="px-4 py-3 text-left">Stock received</th>
              <th className="px-4 py-3 text-left">Expiry</th>
              <th className="px-4 py-3 text-right">Qty</th>
              <th className="px-4 py-3 text-right">Price</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((m) => (
              <tr key={m.id} className="border-t border-border">
                <td className="px-4 py-3">
                  <span className="font-medium">{m.name}</span>
                  <span className="text-muted-foreground block text-xs">{m.category}</span>
                </td>
                <td className="text-muted-foreground px-4 py-3">{m.batchNo}</td>
                <td className="px-4 py-3 whitespace-nowrap">{formatStamp(m.receivedAt)}</td>
                <td className="px-4 py-3 whitespace-nowrap">{formatDate(m.expiryDate)}</td>
                <td className="px-4 py-3 text-right">{m.quantity}</td>
                <td className="px-4 py-3 text-right">
                  {inr(m.price)}
                  {m.discount ? (
                    <span className="text-warn block text-xs">{m.discount}% AI off</span>
                  ) : null}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={statusOf(m)} />
                </td>
                <td className="px-4 py-3 text-right">
                  {readOnly ? (
                    <span className="text-muted-foreground text-xs">Read-only</span>
                  ) : (
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={`Remove ${m.name} ${m.batchNo}`}
                      onClick={() => {
                        removeMedicine(m.id);
                        toast.success(`${m.name} · ${m.batchNo} removed`);
                      }}
                    >
                      <Trash2 className="text-destructive size-4" />
                    </Button>
                  )}
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={8} className="text-muted-foreground px-4 py-10 text-center">
                  No batches match these filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="text-muted-foreground mt-3 text-xs">
        Showing {rows.length} of {inventory.length} batches.
      </p>
    </AppShell>
  );
}