import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Ban, Printer, Search, ShoppingCart, Trash2, TriangleAlert } from "lucide-react";
import { toast } from "sonner";

import { AppShell } from "@/components/smartmed/AppShell";
import { CameraScanner } from "@/components/smartmed/CameraScanner";
import { ScanTutorialCard } from "@/components/smartmed/DemoModal";
import { StatusBadge } from "@/components/smartmed/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { playBlockAlert, playSuccessBeep, playWarningAlert } from "@/lib/smartmed/audio";
import {
  GST_RATE,
  daysToExpiry,
  findSubstituteBatch,
  formatDate,
  inr,
  statusOf,
  suggestedDiscount,
} from "@/lib/smartmed/domain";
import { useSmartMed } from "@/lib/smartmed/store";
import type { Medicine } from "@/lib/smartmed/types";

export const Route = createFileRoute("/billing")({
  head: () => ({
    meta: [
      { title: "Billing Counter — Expired Sale Blocking POS | SmartMed AI" },
      {
        name: "description",
        content:
          "Hybrid POS with barcode scanning and manual type-to-bill. Expired batches are blocked with audio alerts and FEFO substitute suggestions.",
      },
      { property: "og:title", content: "Billing Counter — SmartMed AI" },
      {
        property: "og:description",
        content: "Scan or type to bill, with real-time PAB verification, AI clearance discounts and GST invoicing.",
      },
    ],
  }),
  component: BillingPage,
});

interface BlockInfo {
  medicine: Medicine;
  substitute?: Medicine | undefined;
}

function BillingPage() {
  const {
    inventory,
    cart,
    addToCart,
    updateCartQty,
    removeFromCart,
    clearCart,
    checkout,
    logAlert,
    user,
  } = useSmartMed();
  const [query, setQuery] = useState("");
  const [block, setBlock] = useState<BlockInfo | null>(null);
  const [banner, setBanner] = useState<string | null>(null);
  const [invoiceOpen, setInvoiceOpen] = useState(false);
  const [lastInvoice, setLastInvoice] = useState<typeof cart>([]);

  const matches = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return [];
    return inventory
      .filter(
        (m) =>
          m.name.toLowerCase().includes(term) ||
          m.batchNo.toLowerCase().includes(term) ||
          m.barcode.includes(term),
      )
      .slice(0, 6);
  }, [inventory, query]);

  const verifyAndAdd = (med: Medicine) => {
    const status = statusOf(med);

    if (status === "expired") {
      playBlockAlert();
      const substitute = findSubstituteBatch(inventory, med.name, med.id);
      setBlock({ medicine: med, substitute });
      setBanner(`🚫 EXPIRED BATCH AT COUNTER — ${med.name} (${med.batchNo}). Remove from shelf now.`);
      logAlert({
        audience: "keeper",
        channel: "Screen",
        severity: "critical",
        medicine: med.name,
        batchNo: med.batchNo,
        message: "Billing blocked: expired medicine scanned at POS. Pull the batch off the shelf.",
      });
      logAlert({
        audience: "owner",
        channel: "SMS",
        severity: "critical",
        medicine: med.name,
        batchNo: med.batchNo,
        message: `Blocked expired sale · ${med.quantity} units (${inr(med.quantity * med.price)}) written off risk.`,
      });
      return;
    }

    if (med.quantity <= 0) {
      toast.error(`${med.name} · ${med.batchNo} is out of stock.`);
      return;
    }

    const discount = status === "near" ? (med.discount ?? suggestedDiscount(daysToExpiry(med.expiryDate))) : 0;

    if (status === "near") {
      playWarningAlert();
      setBanner(
        `⚠️ Near-expiry: ${med.name} (${med.batchNo}) expires in ${daysToExpiry(med.expiryDate)} days — ${discount}% AI clearance discount applied.`,
      );
      logAlert({
        audience: "owner",
        channel: "Email",
        severity: "warning",
        medicine: med.name,
        batchNo: med.batchNo,
        message: `Near-expiry sale with ${discount}% AI clearance discount — loss mitigated at the counter.`,
      });
    } else {
      playSuccessBeep();
      setBanner(null);
    }

    addToCart({
      medicineId: med.id,
      name: med.name,
      batchNo: med.batchNo,
      price: med.price,
      qty: 1,
      discount,
      status,
    });
    toast.success(`${med.name} added to cart`);
    setQuery("");
  };

  const handleDecode = (value: string | null) => {
    if (!value) {
      toast.error("No barcode detected. Use Manual Search & Bill below.");
      return;
    }
    const med = inventory.find((m) => m.barcode === value);
    if (!med) {
      toast.error(`Barcode ${value} is not in inventory.`);
      return;
    }
    verifyAndAdd(med);
  };

  const totals = useMemo(() => {
    const gross = cart.reduce((s, l) => s + l.price * l.qty, 0);
    const discount = cart.reduce((s, l) => s + (l.price * l.qty * l.discount) / 100, 0);
    const subtotal = gross - discount;
    const gst = subtotal * GST_RATE;
    return { gross, discount, subtotal, gst, total: subtotal + gst };
  }, [cart]);

  const completeSale = () => {
    if (!cart.length) return;
    setLastInvoice(cart);
    checkout();
    setInvoiceOpen(true);
  };

  return (
    <AppShell
      title="Billing Counter / POS"
      subtitle="Hybrid entry: scan the barcode or type to bill. Every item passes PAB verification."
    >
      {banner && (
        <div
          className={`mb-4 flex items-start gap-3 rounded-xl border p-4 text-sm ${
            banner.startsWith("🚫")
              ? "border-destructive/50 bg-destructive/15 text-destructive"
              : "border-warn/50 bg-warn/15 text-warn"
          }`}
          role="alert"
        >
          <TriangleAlert className="mt-0.5 size-4 shrink-0" />
          <span className="font-medium">{banner}</span>
          <button className="ml-auto text-xs underline" onClick={() => setBanner(null)}>
            dismiss
          </button>
        </div>
      )}

      <div className="grid gap-4 xl:grid-cols-5">
        <div className="space-y-4 xl:col-span-3">
          <div className="panel p-5">
            <h2 className="mb-4 text-base font-semibold">Live optical barcode viewfinder</h2>
            <CameraScanner onDecode={handleDecode} label="Capture & Verify" />
          </div>

          <div className="panel p-5">
            <h2 className="text-base font-semibold">Manual Search &amp; Bill</h2>
            <p className="text-muted-foreground mt-1 text-xs">
              Type a medicine name or batch number — identical PAB verification runs on every add.
            </p>
            <div className="relative mt-3">
              <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
              <Input
                className="pl-9"
                placeholder="e.g. Dolo 650 or AZT250-D02"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                maxLength={60}
              />
            </div>
            <ul className="mt-3 space-y-2">
              {matches.map((m) => (
                <li
                  key={m.id}
                  className="bg-secondary/40 flex flex-wrap items-center gap-3 rounded-lg border border-border p-3"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{m.name}</p>
                    <p className="text-muted-foreground text-xs">
                      {m.batchNo} · exp {formatDate(m.expiryDate)} · {m.quantity} in stock · {inr(m.price)}
                    </p>
                  </div>
                  <StatusBadge status={statusOf(m)} />
                  <Button size="sm" onClick={() => verifyAndAdd(m)}>
                    Add to bill
                  </Button>
                </li>
              ))}
              {query.trim() && matches.length === 0 && (
                <li className="text-muted-foreground text-sm">No batch matches “{query}”.</li>
              )}
            </ul>
          </div>

          <ScanTutorialCard />
        </div>

        <div className="panel h-fit p-5 xl:col-span-2">
          <h2 className="flex items-center gap-2 text-base font-semibold">
            <ShoppingCart className="text-accent size-4" /> Active bill
          </h2>

          <ul className="mt-4 space-y-2">
            {cart.map((l) => (
              <li key={l.medicineId} className="rounded-lg border border-border p-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{l.name}</p>
                    <p className="text-muted-foreground text-xs">{l.batchNo}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={`Remove ${l.name}`}
                    onClick={() => removeFromCart(l.medicineId)}
                  >
                    <Trash2 className="text-destructive size-4" />
                  </Button>
                </div>
                <div className="mt-2 flex items-center justify-between gap-2">
                  <Input
                    type="number"
                    min={1}
                    className="h-8 w-20"
                    value={l.qty}
                    onChange={(e) => updateCartQty(l.medicineId, Number(e.target.value))}
                  />
                  <span className="text-sm">
                    {inr(l.price * l.qty * (1 - l.discount / 100))}
                    {l.discount > 0 && (
                      <span className="text-warn ml-2 text-xs">−{l.discount}% AI</span>
                    )}
                  </span>
                </div>
              </li>
            ))}
            {cart.length === 0 && (
              <li className="text-muted-foreground py-6 text-center text-sm">
                Cart is empty — scan or search a medicine.
              </li>
            )}
          </ul>

          <dl className="mt-4 space-y-1.5 border-t border-border pt-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Gross</dt>
              <dd>{inr(totals.gross)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">AI clearance discount</dt>
              <dd className="text-warn">−{inr(totals.discount)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd>{inr(totals.subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">GST (12%)</dt>
              <dd>{inr(totals.gst)}</dd>
            </div>
            <div className="flex justify-between border-t border-border pt-2 text-base font-semibold">
              <dt>Total payable</dt>
              <dd className="text-safe">{inr(totals.total)}</dd>
            </div>
          </dl>

          <div className="mt-4 flex flex-wrap gap-2">
            <Button className="flex-1" disabled={!cart.length} onClick={completeSale}>
              <Printer className="size-4" /> Generate invoice
            </Button>
            <Button variant="outline" disabled={!cart.length} onClick={() => clearCart()}>
              Clear
            </Button>
          </div>
        </div>
      </div>

      {/* BLOCK MODAL */}
      <Dialog open={!!block} onOpenChange={(v) => !v && setBlock(null)}>
        <DialogContent className="border-destructive/60 sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-destructive flex items-center gap-2 text-2xl">
              <Ban className="size-7" /> BILLING BLOCKED!
            </DialogTitle>
          </DialogHeader>
          <div className="bg-destructive/15 border-destructive/40 rounded-xl border p-4">
            <p className="text-destructive text-lg font-bold">
              🚫 This medicine is EXPIRED. Sale Cannot Proceed.
            </p>
            {block && (
              <p className="mt-2 text-sm">
                {block.medicine.name} · Batch {block.medicine.batchNo} · expired{" "}
                {formatDate(block.medicine.expiryDate)} (
                {Math.abs(daysToExpiry(block.medicine.expiryDate))} days ago)
              </p>
            )}
          </div>
          <div className="panel p-4">
            <p className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">
              FEFO auto-substitution
            </p>
            {block?.substitute ? (
              <>
                <p className="mt-2 text-sm">
                  Recommended Alternate Batch: <strong>{block.substitute.batchNo}</strong> —{" "}
                  {block.substitute.quantity} units available (expires{" "}
                  {formatDate(block.substitute.expiryDate)}).
                </p>
                <Button
                  className="mt-3"
                  onClick={() => {
                    const sub = block.substitute!;
                    setBlock(null);
                    verifyAndAdd(sub);
                  }}
                >
                  Bill alternate batch instead
                </Button>
              </>
            ) : (
              <p className="mt-2 text-sm text-muted-foreground">
                No valid alternate batch in stock. Reorder {block?.medicine.name} immediately.
              </p>
            )}
          </div>
          <p className="text-muted-foreground text-xs">
            Dual alert logged for Shop Owner (financial loss) and Shop Keeper (counter safety).
          </p>
          <Button variant="outline" onClick={() => setBlock(null)}>
            Acknowledge &amp; remove from shelf
          </Button>
        </DialogContent>
      </Dialog>

      {/* INVOICE */}
      <Dialog open={invoiceOpen} onOpenChange={setInvoiceOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Invoice — {user?.pharmacyName}</DialogTitle>
          </DialogHeader>
          <div id="smartmed-invoice" className="space-y-2 text-sm">
            <p className="text-muted-foreground text-xs">
              Billed by {user?.fullName} · {new Date().toLocaleString("en-IN")}
            </p>
            <ul className="divide-y divide-border">
              {lastInvoice.map((l) => (
                <li key={l.medicineId} className="flex justify-between py-2">
                  <span>
                    {l.name} × {l.qty}
                    <span className="text-muted-foreground block text-xs">{l.batchNo}</span>
                  </span>
                  <span>{inr(l.price * l.qty * (1 - l.discount / 100))}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between border-t border-border pt-2 font-semibold">
              <span>Total paid (incl. 12% GST)</span>
              <span className="text-safe">
                {inr(
                  lastInvoice.reduce((s, l) => s + l.price * l.qty * (1 - l.discount / 100), 0) *
                    (1 + GST_RATE),
                )}
              </span>
            </div>
          </div>
          <Button onClick={() => window.print()}>
            <Printer className="size-4" /> Print invoice
          </Button>
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}
