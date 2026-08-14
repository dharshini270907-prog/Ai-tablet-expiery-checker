import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Download, FileSpreadsheet, ScanText, Upload } from "lucide-react";
import { toast } from "sonner";

import { AppShell } from "@/components/smartmed/AppShell";
import { CameraScanner } from "@/components/smartmed/CameraScanner";
import { ScanTutorialCard } from "@/components/smartmed/DemoModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { playSuccessBeep } from "@/lib/smartmed/audio";
import { formatStamp, statusOf } from "@/lib/smartmed/domain";
import { recognizeStrip, type StripScanResult } from "@/lib/smartmed/ocr";
import { useSmartMed } from "@/lib/smartmed/store";

export const Route = createFileRoute("/stock-entry")({
  head: () => ({
    meta: [
      { title: "Stock Entry — Scan, OCR & Bulk Upload | SmartMed AI" },
      {
        name: "description",
        content:
          "Receive pharmacy stock three ways: live barcode scanning, Tesseract.js OCR of medicine strips, or bulk CSV upload with auto timestamps.",
      },
      { property: "og:title", content: "Stock Entry — SmartMed AI" },
      {
        property: "og:description",
        content:
          "Barcode scan, AI OCR strip reading and CSV bulk import with automatic received timestamps.",
      },
    ],
  }),
  component: StockEntryPage,
});

const CSV_TEMPLATE =
  "name,batchNo,barcode,category,expiryDate,quantity,price,avgMonthlySales\n" +
  "Paracetamol 650mg,PC650-NEW1,8901234567,Analgesic,2027-06-30,200,2.40,180\n" +
  "Cetirizine 10mg,CTZ10-NEW2,8901234568,Antihistamine,2026-11-15,150,1.80,140\n";

interface DraftForm {
  name: string;
  batchNo: string;
  barcode: string;
  category: string;
  expiryDate: string;
  quantity: string;
  price: string;
  avgMonthlySales: string;
}

const emptyDraft: DraftForm = {
  name: "",
  batchNo: "",
  barcode: "",
  category: "",
  expiryDate: "",
  quantity: "",
  price: "",
  avgMonthlySales: "",
};

function StockEntryPage() {
  const { addMedicine, inventory, logAlert } = useSmartMed();
  const [draft, setDraft] = useState<DraftForm>(emptyDraft);
  const [ocrBusy, setOcrBusy] = useState(false);
  const [ocrResult, setOcrResult] = useState<StripScanResult | null>(null);
  const [ocrProgress, setOcrProgress] = useState(0);

  const set = (k: keyof DraftForm, v: string) => setDraft((d) => ({ ...d, [k]: v }));

  const handleDecode = (value: string | null) => {
    if (!value) {
      toast.error("No barcode detected. Improve lighting or use manual entry below.");
      return;
    }
    playSuccessBeep();
    const known = inventory.find((m) => m.barcode === value);
    if (known) {
      setDraft({
        name: known.name,
        batchNo: "",
        barcode: known.barcode,
        category: known.category,
        expiryDate: "",
        quantity: "",
        price: String(known.price),
        avgMonthlySales: String(known.avgMonthlySales),
      });
      toast.success(`Matched ${known.name} — enter the new batch & expiry.`);
    } else {
      set("barcode", value);
      toast.success(`Barcode ${value} captured — complete the details.`);
    }
  };

  const runOcr = async (file: File) => {
    setOcrBusy(true);
    setOcrResult(null);
    setOcrProgress(0);
    const listener = (e: Event) => {
      const detail = (e as CustomEvent<number>).detail;
      if (typeof detail === "number") setOcrProgress(detail);
    };
    globalThis.addEventListener("smartmed:ocr-progress", listener);
    try {
      const result = await recognizeStrip(file);
      setOcrResult(result);
      const draftUpdate: Partial<DraftForm> = {};
      if (result.medicineName) draftUpdate.name = result.medicineName;
      if (result.batchNumber) draftUpdate.batchNo = result.batchNumber;
      if (result.expiryDate) draftUpdate.expiryDate = result.expiryDate;
      setDraft((d) => ({ ...d, ...draftUpdate }));
      if (!result.batchNumber && !result.expiryDate) {
        toast.warning("No batch/expiry detected — check the image or enter manually.");
      } else {
        toast.success(`OCR complete · ${result.confidence} confidence — verify the fields.`);
      }
    } catch {
      toast.error("OCR failed on this image. Try a sharper, well-lit photo.");
    } finally {
      globalThis.removeEventListener("smartmed:ocr-progress", listener);
      setOcrBusy(false);
    }
  };

  const saveDraft = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const created = addMedicine({
      name: draft.name.trim(),
      batchNo: draft.batchNo.trim(),
      barcode:
        draft.barcode.trim() || String(Math.floor(8_900_000_000 + Math.random() * 99_999_999)),
      category: draft.category.trim() || "General",
      expiryDate: new Date(draft.expiryDate).toISOString(),
      quantity: Number(draft.quantity),
      price: Number(draft.price),
      avgMonthlySales: Number(draft.avgMonthlySales || 0),
    });
    const st = statusOf(created);
    if (st !== "safe") {
      logAlert({
        audience: "owner",
        channel: "SMS",
        severity: st === "expired" ? "critical" : "warning",
        medicine: created.name,
        batchNo: created.batchNo,
        message:
          st === "expired"
            ? "Expired batch received into stock — quarantine and raise a supplier return."
            : "Received batch already inside the 30-day expiry window — clearance strategy advised.",
      });
    }
    toast.success(`${created.name} saved · received ${formatStamp(created.receivedAt)}`);
    setDraft(emptyDraft);
  };

  const importCsv = async (file: File) => {
    const text = await file.text();
    const lines = text.split(/\r?\n/).filter((l) => l.trim());
    const [, ...body] = lines;
    let ok = 0;
    for (const line of body) {
      const [name, batchNo, barcode, category, expiryDate, quantity, price, avg] = line.split(",");
      if (!name || !batchNo || !expiryDate) continue;
      const parsed = new Date(expiryDate.trim());
      if (Number.isNaN(parsed.getTime())) continue;
      addMedicine({
        name: name.trim(),
        batchNo: batchNo.trim(),
        barcode: (barcode ?? "").trim(),
        category: (category ?? "General").trim(),
        expiryDate: parsed.toISOString(),
        quantity: Number(quantity ?? 0),
        price: Number(price ?? 0),
        avgMonthlySales: Number(avg ?? 0),
      });
      ok += 1;
    }
    toast[ok ? "success" : "error"](
      ok ? `${ok} batches imported with live timestamps.` : "No valid rows found in this CSV.",
    );
  };

  const downloadTemplate = () => {
    const url = URL.createObjectURL(new Blob([CSV_TEMPLATE], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "smartmed-stock-template.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AppShell
      ownerOnly
      title="Stock Entry"
      subtitle="Three input methods — every save stamps an automatic stock-received timestamp."
    >
      <div className="grid gap-4 xl:grid-cols-5">
        <div className="panel p-5 xl:col-span-3">
          <Tabs defaultValue="scan">
            <TabsList className="w-full">
              <TabsTrigger value="scan" className="flex-1">
                Barcode Scanner
              </TabsTrigger>
              <TabsTrigger value="ocr" className="flex-1">
                AI OCR Upload
              </TabsTrigger>
              <TabsTrigger value="csv" className="flex-1">
                Bulk CSV
              </TabsTrigger>
            </TabsList>

            <TabsContent value="scan" className="mt-5">
              <CameraScanner onDecode={handleDecode} />
            </TabsContent>

            <TabsContent value="ocr" className="mt-5 space-y-3">
              <p className="text-muted-foreground text-sm">
                Upload a photo of the medicine strip. Multi-pass client-side OCR (Tesseract.js)
                auto-enhances the image and extracts the medicine name, batch number, expiry date,
                dosage and manufacturer.
              </p>
              <Label
                htmlFor="ocr-file"
                className="hover:bg-secondary/40 flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-dashed border-border p-8 text-center transition-colors"
              >
                <ScanText className="text-accent size-6" />
                <span className="text-sm font-medium">
                  {ocrBusy ? `Reading strip… ${ocrProgress}%` : "Click to upload strip image"}
                </span>
                <span className="text-muted-foreground text-xs">PNG / JPG · sharp, glare-free</span>
              </Label>
              <Input
                id="ocr-file"
                type="file"
                accept="image/*"
                className="hidden"
                disabled={ocrBusy}
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) void runOcr(f);
                  e.target.value = "";
                }}
              />
              {ocrBusy && (
                <div className="bg-secondary/40 h-1.5 overflow-hidden rounded-full border border-border">
                  <div
                    className="bg-accent h-full rounded-full transition-[width] duration-200"
                    style={{ width: `${Math.max(8, ocrProgress)}%` }}
                  />
                </div>
              )}
              {ocrResult && (
                <div className="bg-secondary/40 space-y-2 rounded-lg border border-border p-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Extracted fields</span>
                    <span
                      className={`rounded-full px-2 py-0.5 font-semibold uppercase ${
                        ocrResult.confidence === "High"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : ocrResult.confidence === "Medium"
                            ? "bg-amber-500/20 text-amber-400"
                            : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {ocrResult.confidence}
                    </span>
                  </div>
                  {(
                    [
                      ["Medicine", ocrResult.medicineName],
                      ["Composition", ocrResult.saltComposition],
                      ["Dosage", ocrResult.dosage],
                      ["Batch No.", ocrResult.batchNumber],
                      ["Expiry", ocrResult.expiryDate],
                      ["Mfg date", ocrResult.mfgDate],
                      ["Manufacturer", ocrResult.manufacturer],
                    ] as const
                  ).map(([label, value]) => (
                    <div key={label} className="flex justify-between gap-3">
                      <span className="text-muted-foreground shrink-0">{label}</span>
                      <span className="text-right font-medium break-all">{value ?? "—"}</span>
                    </div>
                  ))}
                  <details className="group">
                    <summary className="text-muted-foreground cursor-pointer select-none">
                      Raw OCR text
                    </summary>
                    <pre className="mt-1 max-h-40 overflow-auto rounded-md bg-black/20 p-2 whitespace-pre-wrap">
                      {ocrResult.rawText}
                    </pre>
                  </details>
                </div>
              )}
            </TabsContent>

            <TabsContent value="csv" className="mt-5 space-y-3">
              <p className="text-muted-foreground text-sm">
                Import a supplier invoice sheet. Columns: name, batchNo, barcode, category,
                expiryDate (YYYY-MM-DD), quantity, price, avgMonthlySales.
              </p>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" onClick={downloadTemplate}>
                  <Download className="size-4" /> Download sample template
                </Button>
                <Label htmlFor="csv-file">
                  <span className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-9 cursor-pointer items-center gap-2 rounded-md px-4 text-sm font-medium">
                    <Upload className="size-4" /> Upload CSV
                  </span>
                </Label>
                <Input
                  id="csv-file"
                  type="file"
                  accept=".csv,text/csv"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) void importCsv(f);
                  }}
                />
              </div>
              <div className="text-muted-foreground flex items-center gap-2 text-xs">
                <FileSpreadsheet className="size-4" /> Rows with an invalid expiry date are skipped.
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <form className="panel space-y-4 p-5 xl:col-span-2" onSubmit={saveDraft}>
          <h2 className="text-base font-semibold">Confirm & save batch</h2>
          {(
            [
              ["name", "Medicine name", "text"],
              ["batchNo", "Batch number", "text"],
              ["barcode", "Barcode", "text"],
              ["category", "Category", "text"],
              ["expiryDate", "Expiry date", "date"],
              ["quantity", "Quantity", "number"],
              ["price", "Price per unit (₹)", "number"],
              ["avgMonthlySales", "Avg monthly sales", "number"],
            ] as const
          ).map(([key, label, type]) => (
            <div key={key} className="space-y-1.5">
              <Label htmlFor={`f-${key}`}>{label}</Label>
              <Input
                id={`f-${key}`}
                type={type}
                step={type === "number" ? "any" : undefined}
                required={key !== "barcode" && key !== "avgMonthlySales" && key !== "category"}
                value={draft[key]}
                onChange={(e) => set(key, e.target.value)}
                maxLength={80}
              />
            </div>
          ))}
          <Button type="submit" className="w-full">
            Save to inventory
          </Button>
          <p className="text-muted-foreground text-xs">
            Saved at: {formatStamp(new Date().toISOString())} (auto-stamped on submit)
          </p>
        </form>
      </div>

      <div className="mt-4">
        <ScanTutorialCard />
      </div>
    </AppShell>
  );
}
