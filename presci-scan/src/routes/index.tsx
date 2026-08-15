import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BrainCircuit, PlayCircle, ShieldCheck, Siren, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DemoModal } from "@/components/smartmed/DemoModal";
import { useSmartMed } from "@/lib/smartmed/store";
import type { Role } from "@/lib/smartmed/types";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SmartMed AI — Sign in to Expiry Prevention" },
      {
        name: "description",
        content:
          "Sign in to SmartMed AI to predict medicine expiry losses, act with AI clearance discounts and block expired sales at the pharmacy counter.",
      },
      { property: "og:title", content: "SmartMed AI — Sign in to Expiry Prevention" },
      {
        property: "og:description",
        content: "Role-based pharmacy management powered by the Predict, Act, Block framework.",
      },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { user, ready, login, register, onboarded, markOnboarded } = useSmartMed();
  const navigate = useNavigate();
  const [demoOpen, setDemoOpen] = useState(false);
  const [role, setRole] = useState<Role>("owner");

  useEffect(() => {
    if (ready && user) void navigate({ to: user.role === "owner" ? "/dashboard" : "/billing" });
  }, [ready, user, navigate]);

  useEffect(() => {
    if (ready && !onboarded) {
      setDemoOpen(true);
      markOnboarded();
    }
  }, [ready, onboarded, markOnboarded]);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const res = login(String(f.get("email") ?? ""), String(f.get("password") ?? ""));
    if (!res.ok) toast.error(res.error ?? "Login failed");
    else toast.success("Welcome back to SmartMed AI");
  };

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const res = register({
      fullName: String(f.get("fullName") ?? "").trim(),
      email: String(f.get("email") ?? "").trim(),
      password: String(f.get("password") ?? ""),
      mobile: String(f.get("mobile") ?? "").trim(),
      pharmacyName: String(f.get("pharmacyName") ?? "").trim(),
      role,
    });
    if (!res.ok) toast.error(res.error ?? "Registration failed");
    else toast.success("Account created — welcome to SmartMed AI");
  };

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-2">
      <section className="hero-gradient relative flex flex-col justify-between overflow-hidden px-6 py-10 sm:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(6,182,212,0.25),transparent_55%)]" />
        <div className="relative z-10">
          <div className="flex items-center gap-2">
            <span className="bg-primary/25 text-accent grid size-10 place-items-center rounded-xl">
              <ShieldCheck className="size-5" />
            </span>
            <div>
              <p className="font-display text-lg font-bold">SmartMed AI</p>
              <p className="text-muted-foreground text-xs">Predict · Act · Block</p>
            </div>
          </div>

          <h1 className="mt-10 max-w-xl text-3xl leading-tight font-bold sm:text-4xl">
            AI-powered expiry prevention & sustainable pharmacy management
          </h1>
          <p className="text-muted-foreground mt-4 max-w-lg text-sm leading-relaxed">
            SmartMed forecasts unsold stock in rupees before it expires, auto-applies clearance
            discounts, and hard-blocks expired medicines at the billing counter — protecting patients
            and your margin at the same time.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              { icon: BrainCircuit, label: "Predict", text: "Loss forecast per batch" },
              { icon: Sparkles, label: "Act", text: "30% / 50% AI clearance" },
              { icon: Siren, label: "Block", text: "Expired sale blocked" },
            ].map((c) => (
              <div key={c.label} className="panel p-4">
                <c.icon className="text-accent size-4" />
                <p className="font-display mt-2 text-sm font-semibold">{c.label}</p>
                <p className="text-muted-foreground text-xs">{c.text}</p>
              </div>
            ))}
          </div>

          <Button variant="outline" className="mt-8" onClick={() => setDemoOpen(true)}>
            <PlayCircle className="size-4" /> Website Guide / Demo
          </Button>
        </div>

        <p className="text-muted-foreground relative z-10 mt-10 text-xs">
          Demo logins — Owner: owner@smartmed.in / owner123 · Staff: staff@smartmed.in / staff123
        </p>
      </section>

      <section className="flex items-center justify-center px-6 py-10 sm:px-10">
        <div className="panel w-full max-w-md p-6">
          <Tabs defaultValue="login">
            <TabsList className="w-full">
              <TabsTrigger value="login" className="flex-1">
                Login
              </TabsTrigger>
              <TabsTrigger value="register" className="flex-1">
                Register
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="mt-6">
              <form className="space-y-4" onSubmit={handleLogin}>
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input id="login-email" name="email" type="email" required defaultValue="owner@smartmed.in" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input id="login-password" name="password" type="password" required defaultValue="owner123" />
                </div>
                <Button type="submit" className="w-full">
                  Sign in
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register" className="mt-6">
              <form className="space-y-4" onSubmit={handleRegister}>
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full name</Label>
                  <Input id="fullName" name="fullName" required maxLength={80} />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="reg-email">Email</Label>
                    <Input id="reg-email" name="email" type="email" required maxLength={120} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mobile">Mobile (SMS alerts)</Label>
                    <Input id="mobile" name="mobile" required maxLength={20} placeholder="+91 …" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pharmacyName">Pharmacy name</Label>
                  <Input id="pharmacyName" name="pharmacyName" required maxLength={80} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-password">Password</Label>
                  <Input id="reg-password" name="password" type="password" required minLength={6} />
                </div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {(
                      [
                        ["owner", "👑 Shop Owner"],
                        ["keeper", "👨‍⚕️ Shop Keeper"],
                      ] as const
                    ).map(([value, label]) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setRole(value)}
                        className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                          role === value
                            ? "border-primary bg-primary/20 text-accent"
                            : "border-border text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  Create account
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <DemoModal open={demoOpen} onOpenChange={setDemoOpen} />
    </div>
  );
}
