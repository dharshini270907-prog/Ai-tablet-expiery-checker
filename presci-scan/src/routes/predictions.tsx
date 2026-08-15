import { createFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect } from "react";
import { BrainCircuit, Sparkles, TrendingDown } from "lucide-react";
import { toast } from "sonner";

import { AppShell } from "@/components/smartmed/AppShell";
import { Button } from "@/components/ui/button";
import { predictExpiryRisk } from "@/lib/predict.functions";
import { inr } from "@/lib/smartmed/domain";
import { useSmartMed } from "@/lib/smartmed/store";

export const Route = createFileRoute("/predictions")({
  head: () => ({
    meta: [
      { title: "AI Expiry Predictions — Financial Loss Forecast | SmartMed AI" },
      {
        name: "description",
        content:
          "Server-side AI forecasts predicted unsold quantity and rupee loss per batch, then suggests 30% or 50% clearance discounts you can apply in one click.",
      },
      { property: "og:title", content: "AI Expiry Predictions — SmartMed AI" },
      {
        property: "og:description",
        content: "Predicted unsold stock, potential financial loss and one-click AI discount strategy.",
      },
    ],
  }),
  component: PredictionsPage,
});

function PredictionsPage() {
  const { inventory, applyDiscountStrategy, logAlert } = useSmartMed();
  const predict = useServerFn(predictExpiryRisk);

  const mutation = useMutation({
    mutationFn: () =>
      predict({
        data: {
          items: inventory.map((m) => ({
            id: m.id,
            name: m.name,
            batchNo: m.batchNo,
            quantity: m.quantity,
            price: m.price,
            avgMonthlySales: m.avgMonthlySales,
            expiryDate: m.expiryDate,
          })),
        },
      }),
  });

  useEffect(() => {
    if (inventory.length) mutation.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inventory.length]);

  const rows = mutation.data?.predictions ?? [];
  const atRisk = rows.filter((r) => r.suggestedDiscount > 0 || r.daysToExpiry < 0);

  const applyStrategy = () => {
    const count = applyDiscountStrategy();
    if (!count) {
      toast.info("No new discounts needed — every near-expiry batch is already marked down.");
      return;
    }
    logAlert({
      audience: "owner",
      channel: "Email",
      severity: "info",
      medicine: `${count} batches`,
      batchNo: "—",
      message: `AI discount strategy applied to ${count} near-expiry batches (30% / 50% clearance).`,
    });
    toast.success(`AI discount strategy applied to ${count} batches.`);
  };

  return (
    <AppShell
      ownerOnly
      title="AI Expiry Prediction Engine"
      subtitle="Predicted Unsold Qty = Stock − (Avg Monthly Sales ÷ 30 × Days to Expiry)"
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="panel p-5">
          <p className="text-muted-foreground text-xs font-semibold uppercase">Total loss exposure</p>
          <p className="text-destructive font-display mt-2 flex items-center gap-2 text-2xl font-bold">
            <TrendingDown className="size-5" />
            {mutation.data ? inr(mutation.data.totalExposure) : "—"}
          </p>
        </div>
        <div className="panel p-5">
          <p className="text-muted-foreground text-xs font-semibold uppercase">Batches needing action</p>
          <p className="text-warn font-display mt-2 text-2xl font-bold">{atRisk.length}</p>
        </div>
        <div className="panel flex flex-col justify-between gap-3 p-5">
          <p className="text-muted-foreground text-xs font-semibold uppercase">Dynamic action engine</p>
          <Button onClick={applyStrategy}>
            <Sparkles className="size-4" /> Apply AI Discount Strategy
          </Button>
        </div>
      </div>

      <div className="panel mt-6 overflow-x-auto">
        <div className="flex flex-wrap items-center justify-between gap-3 p-5 pb-3">
          <h2 className="flex items-center gap-2 text-base font-semibold">
            <BrainCircuit className="text-accent size-4" /> Batch-level forecast
          </h2>
          <Button variant="outline" size="sm" onClick={() => mutation.mutate()} disabled={mutation.isPending}>
            {mutation.isPending ? "Recomputing…" : "Recompute forecast"}
          </Button>
        </div>
        <table className="w-full min-w-[820px] text-sm">
          <thead className="bg-secondary/40 text-muted-foreground text-xs uppercase">
            <tr>
              <th className="px-4 py-3 text-left">Medicine</th>
              <th className="px-4 py-3 text-left">Batch</th>
              <th className="px-4 py-3 text-right">Days to expiry</th>
              <th className="px-4 py-3 text-right">Predicted unsold</th>
              <th className="px-4 py-3 text-right">Potential loss</th>
              <th className="px-4 py-3 text-left">AI recommended action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-border">
                <td className="px-4 py-3 font-medium">{r.name}</td>
                <td className="text-muted-foreground px-4 py-3">{r.batchNo}</td>
                <td className="px-4 py-3 text-right">{r.daysToExpiry}</td>
                <td className="px-4 py-3 text-right">{r.predictedUnsoldQty}</td>
                <td
                  className={`px-4 py-3 text-right font-semibold ${r.potentialLoss > 0 ? "text-destructive" : "text-safe"}`}
                >
                  {inr(r.potentialLoss)}
                </td>
                <td className="px-4 py-3">
                  {r.suggestedDiscount > 0 && (
                    <span className="bg-warn/15 text-warn mr-2 rounded-full px-2 py-0.5 text-xs font-semibold">
                      {r.suggestedDiscount}% off
                    </span>
                  )}
                  {r.action}
                </td>
              </tr>
            ))}
            {!rows.length && (
              <tr>
                <td colSpan={6} className="text-muted-foreground px-4 py-10 text-center">
                  {mutation.isPending ? "Running AI forecast…" : "No forecast yet."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}