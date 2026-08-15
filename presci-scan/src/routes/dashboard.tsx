import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { AlertTriangle, Boxes, IndianRupee, XCircle } from "lucide-react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import { AppShell } from "@/components/smartmed/AppShell";
import { StatusBadge } from "@/components/smartmed/StatusBadge";
import { daysToExpiry, formatDate, inr, statusOf } from "@/lib/smartmed/domain";
import { useSmartMed } from "@/lib/smartmed/store";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — SmartMed AI Pharmacy Control Tower" },
      {
        name: "description",
        content:
          "Live pharmacy health: SKU count, inventory value in rupees, near-expiry and expired counts, stock breakdown and the FEFO urgency queue.",
      },
      { property: "og:title", content: "Dashboard — SmartMed AI" },
      {
        property: "og:description",
        content: "Inventory value, expiry risk breakdown and the top FEFO urgency items at a glance.",
      },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const { inventory } = useSmartMed();

  const stats = useMemo(() => {
    const counts = { safe: 0, near: 0, expired: 0 };
    let value = 0;
    for (const m of inventory) {
      counts[statusOf(m)] += 1;
      value += m.quantity * m.price;
    }
    const urgency = inventory
      .filter((m) => statusOf(m) !== "safe" && m.quantity > 0)
      .sort((a, b) => daysToExpiry(a.expiryDate) - daysToExpiry(b.expiryDate))
      .slice(0, 5);
    return { counts, value, urgency };
  }, [inventory]);

  const chartData = [
    { name: "Safe", value: stats.counts.safe, color: "var(--safe)" },
    { name: "Near-Expiry", value: stats.counts.near, color: "var(--warn)" },
    { name: "Expired", value: stats.counts.expired, color: "var(--destructive)" },
  ];

  const cards = [
    { label: "Total SKUs", value: String(inventory.length), icon: Boxes, tone: "text-accent" },
    { label: "Inventory Value", value: inr(stats.value), icon: IndianRupee, tone: "text-safe" },
    { label: "Near-Expiry", value: String(stats.counts.near), icon: AlertTriangle, tone: "text-warn" },
    { label: "Expired", value: String(stats.counts.expired), icon: XCircle, tone: "text-destructive" },
  ];

  return (
    <AppShell
      ownerOnly
      title="Dashboard"
      subtitle="PAB health snapshot across every batch in your pharmacy."
    >
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((c) => (
            <div key={c.label} className="panel p-5">
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
                  {c.label}
                </p>
                <c.icon className={`size-4 ${c.tone}`} />
              </div>
              <p className={`font-display mt-3 text-2xl font-bold ${c.tone}`}>{c.value}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-5">
          <div className="panel p-5 lg:col-span-2">
            <h2 className="text-base font-semibold">Stock breakdown</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={chartData} dataKey="value" innerRadius={55} outerRadius={85} paddingAngle={3}>
                    {chartData.map((d) => (
                      <Cell key={d.name} fill={d.color} stroke="transparent" />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: 12,
                      color: "var(--foreground)",
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="panel overflow-hidden lg:col-span-3">
            <div className="p-5 pb-3">
              <h2 className="text-base font-semibold">High-risk FEFO urgency queue</h2>
              <p className="text-muted-foreground text-xs">Clear these batches first — first expiry, first out.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-secondary/40 text-muted-foreground text-xs uppercase">
                  <tr>
                    <th className="px-5 py-2 text-left">Medicine</th>
                    <th className="px-5 py-2 text-left">Batch</th>
                    <th className="px-5 py-2 text-left">Expiry</th>
                    <th className="px-5 py-2 text-right">Qty</th>
                    <th className="px-5 py-2 text-right">Value</th>
                    <th className="px-5 py-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.urgency.map((m) => (
                    <tr key={m.id} className="border-t border-border">
                      <td className="px-5 py-3 font-medium">{m.name}</td>
                      <td className="text-muted-foreground px-5 py-3">{m.batchNo}</td>
                      <td className="px-5 py-3">
                        {formatDate(m.expiryDate)}
                        <span className="text-muted-foreground block text-xs">
                          {daysToExpiry(m.expiryDate) < 0
                            ? `${Math.abs(daysToExpiry(m.expiryDate))} days ago`
                            : `in ${daysToExpiry(m.expiryDate)} days`}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-right">{m.quantity}</td>
                      <td className="px-5 py-3 text-right">{inr(m.quantity * m.price)}</td>
                      <td className="px-5 py-3">
                        <StatusBadge status={statusOf(m)} />
                      </td>
                    </tr>
                  ))}
                  {stats.urgency.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-muted-foreground px-5 py-8 text-center">
                        No at-risk batches. Every SKU is safe.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}