import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Bell, Mail, MessageSquare, MonitorSmartphone } from "lucide-react";

import { AppShell } from "@/components/smartmed/AppShell";
import { Button } from "@/components/ui/button";
import { formatStamp } from "@/lib/smartmed/domain";
import { useSmartMed } from "@/lib/smartmed/store";

export const Route = createFileRoute("/alerts")({
  head: () => ({
    meta: [
      { title: "Alert Logs — Dual-Role Expiry Notifications | SmartMed AI" },
      {
        name: "description",
        content:
          "Timestamped audit trail of every SmartMed alert: owner SMS/email loss warnings and shop keeper counter-safety screen alerts.",
      },
      { property: "og:title", content: "Alert Logs — SmartMed AI" },
      {
        property: "og:description",
        content: "Automatic multi-role alerts for near-expiry stock and blocked expired sales.",
      },
    ],
  }),
  component: AlertsPage,
});

const channelIcon = { SMS: MessageSquare, Email: Mail, Screen: MonitorSmartphone } as const;
const severityStyle = {
  critical: "border-destructive/40 bg-destructive/10 text-destructive",
  warning: "border-warn/40 bg-warn/10 text-warn",
  info: "border-border bg-secondary/40 text-accent",
} as const;

function AlertsPage() {
  const { alerts, user } = useSmartMed();
  const [scope, setScope] = useState<"mine" | "all">("mine");

  const rows = useMemo(() => {
    if (scope === "all" && user?.role === "owner") return alerts;
    const audience = user?.role === "owner" ? "owner" : "keeper";
    return alerts.filter((a) => a.audience === audience);
  }, [alerts, scope, user]);

  return (
    <AppShell
      title="Alerts & Notifications"
      subtitle={
        user?.role === "owner"
          ? "Financial-loss mitigation alerts delivered by SMS and email."
          : "Counter safety alerts — clear flagged batches from the shelf immediately."
      }
    >
      {user?.role === "owner" && (
        <div className="mb-4 flex gap-2">
          <Button variant={scope === "mine" ? "default" : "outline"} size="sm" onClick={() => setScope("mine")}>
            Owner alerts
          </Button>
          <Button variant={scope === "all" ? "default" : "outline"} size="sm" onClick={() => setScope("all")}>
            All roles
          </Button>
        </div>
      )}

      <ul className="space-y-3">
        {rows.map((a) => {
          const Icon = channelIcon[a.channel];
          return (
            <li key={a.id} className={`rounded-xl border p-4 ${severityStyle[a.severity]}`}>
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase">
                <Icon className="size-4" />
                <span>{a.channel}</span>
                <span className="opacity-60">·</span>
                <span>{a.audience === "owner" ? "👑 Shop Owner" : "👨‍⚕️ Shop Keeper"}</span>
                <span className="ml-auto normal-case opacity-70">{formatStamp(a.createdAt)}</span>
              </div>
              <p className="text-foreground mt-2 text-sm font-semibold">
                {a.medicine} · {a.batchNo}
              </p>
              <p className="text-foreground/80 mt-1 text-sm">{a.message}</p>
            </li>
          );
        })}
        {!rows.length && (
          <li className="panel text-muted-foreground flex items-center gap-2 p-8 text-sm">
            <Bell className="size-4" /> No alerts yet — your shelves are clean.
          </li>
        )}
      </ul>
    </AppShell>
  );
}
