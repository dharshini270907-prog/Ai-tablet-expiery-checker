import { useState } from "react";
import {
  Camera,
  Keyboard,
  Layers,
  Lightbulb,
  PlayCircle,
  ShieldAlert,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const chapters = [
  {
    icon: Layers,
    title: "Chapter 1 — Navigating SmartMed AI",
    body: "The left rail is your control tower: Dashboard for health metrics, Inventory for every batch, Stock Entry to receive goods, Billing Counter for the POS, AI Predictions for loss forecasting, and Alerts for the audit trail. Owners see everything; shop keepers get a safety-first counter view.",
    bullets: [
      "Metric cards colour-code risk: emerald = safe, amber = near-expiry, crimson = expired.",
      "Every table supports live search, category and status filters.",
    ],
  },
  {
    icon: Sparkles,
    title: "Chapter 2 — How the PAB Framework works",
    body: "PAB is the engine behind SmartMed: Predict unsold stock and rupee loss before it happens, Act with AI clearance discounts and FEFO rotation, Block any expired sale at the counter — automatically.",
    bullets: [
      "Predict: Unsold Qty = Stock − (Avg Monthly Sales ÷ 30 × Days to Expiry).",
      "Act: 30 days → 30% off, 15 days → 50% clearance, applied in one click.",
      "Block: expired batches can never reach an invoice.",
    ],
  },
  {
    icon: Camera,
    title: "Chapter 3 — Barcode scanning vs manual type-to-bill",
    body: "Open Billing Counter and hold the strip barcode inside the teal viewfinder, then press Capture & Verify. If the pack is crumpled or the camera is unavailable, switch to Manual Search & Bill and type the medicine name or batch number instead.",
    bullets: [
      "Scanner path: fastest for clean, flat barcodes.",
      "Manual path: always available fallback — same PAB verification runs either way.",
    ],
  },
  {
    icon: ShieldAlert,
    title: "Chapter 4 — Automatic dual alerts",
    body: "The moment stock enters the 30-day window or an expired sale is blocked, SmartMed fires two alerts at once: a financial-loss SMS/email log for the shop owner, and a red on-screen banner with an 880Hz audio siren for the shop keeper at the counter.",
    bullets: [
      "Owner focus: rupee exposure and clearance strategy.",
      "Keeper focus: pull the batch off the shelf immediately.",
      "Every alert is timestamped in the Alert Logs audit trail.",
    ],
  },
];

export function DemoModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [step, setStep] = useState(0);
  const chapter = chapters[step] ?? chapters[0]!;
  const Icon = chapter.icon;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] w-full max-w-xl overflow-hidden p-6 sm:max-w-2xl">
        <DialogHeader className="pb-2">
          <DialogTitle className="font-display flex items-center gap-2 text-xl">
            <PlayCircle className="text-accent size-5 shrink-0" /> SmartMed AI — Platform Tour
          </DialogTitle>
          <DialogDescription>
            A guided 4-chapter walkthrough of the Predict · Act · Block workflow.
          </DialogDescription>
        </DialogHeader>

        {/* Outer scrollable wrapper for small screens */}
        <div className="flex flex-col gap-4 overflow-y-auto pr-1">
          {/* Hero Banner with fixed compact height */}
          <div className="hero-gradient relative flex h-36 w-full shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border sm:h-40">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.35),transparent_60%)]" />
            <div className="relative z-10 px-6 text-center">
              <Icon className="text-accent mx-auto size-8 sm:size-10" />
              <p className="font-display mt-2 text-base font-semibold sm:text-lg">{chapter.title}</p>
              <p className="text-muted-foreground mt-1 text-[10px] tracking-widest uppercase sm:text-xs">
                Interactive demo · chapter {step + 1} of {chapters.length}
              </p>
            </div>
          </div>

          {/* Body Section with min-height to prevent UI jumping */}
          <div className="min-h-[140px] space-y-3">
            <p className="text-sm leading-relaxed text-muted-foreground">{chapter.body}</p>
            <ul className="space-y-2 text-sm">
              {chapter.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <Lightbulb className="text-warn mt-0.5 size-4 shrink-0" />
                  <span className="leading-tight">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer controls - pinned at the bottom */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/50 pt-4">
          <div className="flex items-center gap-1.5">
            {chapters.map((c, i) => (
              <button
                key={c.title}
                aria-label={`Go to chapter ${i + 1}`}
                onClick={() => setStep(i)}
                className={`h-2 rounded-full transition-all ${
                  i === step ? "bg-accent w-6" : "bg-muted hover:bg-muted-foreground/30 w-2"
                }`}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={step === 0}
              onClick={() => setStep((s) => s - 1)}
            >
              Back
            </Button>
            {step < chapters.length - 1 ? (
              <Button size="sm" onClick={() => setStep((s) => s + 1)}>
                Next chapter
              </Button>
            ) : (
              <Button size="sm" onClick={() => onOpenChange(false)}>
                Start using SmartMed
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function ScanTutorialCard() {
  return (
    <div className="panel p-5">
      <h3 className="font-display flex items-center gap-2 text-base font-semibold">
        <Camera className="text-accent size-4 shrink-0" /> Scanning tutorial — get it right first time
      </h3>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {[
          {
            icon: Camera,
            title: "Camera alignment",
            text: "Hold the strip 15–20cm away, barcode flat and centred inside the teal frame, parallel to the lens.",
          },
          {
            icon: Lightbulb,
            title: "Lighting",
            text: "Use even overhead light. Avoid direct glare on foil — tilt the strip slightly if you see a white hotspot.",
          },
          {
            icon: Keyboard,
            title: "Manual fallback",
            text: "Crumpled or faded barcode? Type the batch number or medicine name — verification is identical.",
          },
        ].map((t) => (
          <div
            key={t.title}
            className="bg-secondary/40 flex flex-col justify-start rounded-lg border border-border p-4 transition-colors hover:bg-secondary/60"
          >
            <t.icon className="text-accent size-4 shrink-0" />
            <p className="mt-2 text-sm font-semibold">{t.title}</p>
            <p className="text-muted-foreground mt-1 text-xs leading-relaxed">{t.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}