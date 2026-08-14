import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  Bell,
  Boxes,
  BrainCircuit,
  LayoutDashboard,
  LogOut,
  Menu,
  PackagePlus,
  PlayCircle,
  ScanBarcode,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { DemoModal } from "@/components/smartmed/DemoModal";
import { useSmartMed } from "@/lib/smartmed/store";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, ownerOnly: true },
  { to: "/inventory", label: "Inventory", icon: Boxes, ownerOnly: false },
  { to: "/stock-entry", label: "Stock Entry", icon: PackagePlus, ownerOnly: true },
  { to: "/billing", label: "Billing Counter", icon: ScanBarcode, ownerOnly: false },
  { to: "/predictions", label: "AI Predictions", icon: BrainCircuit, ownerOnly: true },
  { to: "/alerts", label: "Alerts", icon: Bell, ownerOnly: false },
] as const;

export function AppShell({
  children,
  ownerOnly = false,
  title,
  subtitle,
}: {
  children: ReactNode;
  ownerOnly?: boolean;
  title: string;
  subtitle?: string;
}) {
  const { user, ready, logout } = useSmartMed();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [demoOpen, setDemoOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!ready) return;
    if (!user) void navigate({ to: "/" });
    else if (ownerOnly && user.role !== "owner") void navigate({ to: "/billing" });
  }, [ready, user, ownerOnly, navigate]);

  // Close demo modal when navigating between routes
  useEffect(() => {
    setDemoOpen(false);
  }, [pathname]);

  if (!ready || !user || (ownerOnly && user.role !== "owner")) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground text-sm">Verifying access…</p>
      </div>
    );
  }

  const items = nav.filter((n) => !n.ownerOnly || user.role === "owner");

  return (
    <div className="flex h-screen flex-col lg:flex-row">
      <aside
        className={cn(
          "bg-sidebar border-sidebar-border lg:sticky lg:top-0 lg:h-screen lg:w-64 lg:shrink-0 lg:border-r",
          "border-b",
        )}
      >
        <div className="flex items-center justify-between gap-2 p-4">
          <Link to={user.role === "owner" ? "/dashboard" : "/billing"} className="flex items-center gap-2">
            <span className="bg-primary/20 text-accent grid size-9 place-items-center rounded-lg">
              <ShieldCheck className="size-5" />
            </span>
            <span>
              <span className="font-display block text-sm leading-tight font-bold">SmartMed AI</span>
              <span className="text-muted-foreground block text-[11px]">Predict · Act · Block</span>
            </span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <Menu className="size-5" />
          </Button>
        </div>

        <nav className={cn("px-3 pb-4 lg:block", menuOpen ? "block" : "hidden")}>
          <ul className="space-y-1">
            {items.map((item) => {
              const active = pathname === item.to;
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      active
                        ? "bg-primary/20 text-accent"
                        : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground",
                    )}
                  >
                    <item.icon className="size-4" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 space-y-3 border-t border-sidebar-border pt-4">
            <Button variant="outline" className="w-full flex items-center" onClick={() => setDemoOpen(true)}>
              <PlayCircle className="size-4" /> Website Guide / Demo
            </Button>
            <div className="bg-secondary/40 rounded-lg border border-border p-3">
              <p className="truncate text-sm font-semibold">{user.fullName}</p>
              <p className="text-muted-foreground truncate text-xs">{user.pharmacyName}</p>
              <p className="text-accent mt-1 text-[11px] font-semibold tracking-wide uppercase">
                {user.role === "owner" ? "👑 Shop Owner (Admin)" : "👨‍⚕️ Shop Keeper (Staff)"}
              </p>
            </div>
            <Button variant="ghost" className="w-full justify-start" onClick={() => logout()}>
              <LogOut className="size-4" /> Sign out
            </Button>
          </div>
        </nav>
      </aside>

      <main className="min-w-0 flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-6">
          <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>
          {subtitle && <p className="text-muted-foreground mt-1 text-sm">{subtitle}</p>}
        </header>
        {children}
      </main>

      <DemoModal open={demoOpen} onOpenChange={setDemoOpen} />
    </div>
  );
}