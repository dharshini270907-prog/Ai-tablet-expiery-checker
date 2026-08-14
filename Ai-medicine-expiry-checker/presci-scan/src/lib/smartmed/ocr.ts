import { matchMedicineInText } from "./medicine-db";

interface OcrWorker {
  recognize(
    image: unknown,
    options?: Record<string, string | boolean>,
  ): Promise<{ data: { text: string; confidence: number } }>;
  terminate(): Promise<unknown>;
}

interface TesseractModule {
  createWorker(
    langs: string,
    oem: number,
    opts?: { logger?: (msg: unknown) => void },
  ): Promise<OcrWorker>;
}

export interface StripScanResult {
  rawText: string;
  confidence: string;
  medicineName: string | null;
  saltComposition: string | null;
  batchNumber: string | null;
  expiryDate: string | null;
  mfgDate: string | null;
  dosage: string | null;
  manufacturer: string | null;
}

const ALNUM_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789/._:- ";
const DATE_CHARS = "0123456789/.-: ";

const MAX_DIMENSION = 2400;
const TARGET_MIN_WIDTH = 1600;

let workerPromise: Promise<OcrWorker> | null = null;

async function getWorker(): Promise<OcrWorker> {
  if (!workerPromise) {
    workerPromise = (async () => {
      const { default: Tesseract } = (await import("tesseract.js")) as unknown as {
        default: TesseractModule;
      };
      return Tesseract.createWorker("eng", 1, {
        logger: (msg) => {
          const m = msg as { status?: string; progress?: number };
          if (m.status === "recognizing text") {
            const pct = Math.round((m.progress ?? 0) * 100);
            globalThis.dispatchEvent(new CustomEvent("smartmed:ocr-progress", { detail: pct }));
          }
        },
      });
    })();
  }
  return workerPromise;
}

interface ProcessedImage {
  gray: HTMLCanvasElement;
  bin: HTMLCanvasElement;
}

/** Integral images (sum + sum-of-squares) for O(1) local mean/variance queries. */
interface Integral {
  sum: Float64Array;
  sumSq: Float64Array;
  stride: number;
}

function buildIntegral(values: Float32Array, width: number, height: number): Integral {
  const stride = width + 1;
  const sum = new Float64Array(stride * (height + 1));
  const sumSq = new Float64Array(stride * (height + 1));
  for (let y = 0; y < height; y++) {
    let rowSum = 0;
    let rowSumSq = 0;
    const row = y * width;
    for (let x = 0; x < width; x++) {
      const v = values[row + x] ?? 0;
      rowSum += v;
      rowSumSq += v * v;
      const p = (y + 1) * stride + x + 1;
      sum[p] = (sum[p - stride] ?? 0) + rowSum;
      sumSq[p] = (sumSq[p - stride] ?? 0) + rowSumSq;
    }
  }
  return { sum, sumSq, stride };
}

function boxSum(
  int: Integral,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  square: boolean,
): number {
  const { stride, sum, sumSq } = int;
  const grid = square ? sumSq : sum;
  return (
    (grid[y1 * stride + x1] ?? 0) -
    (grid[y0 * stride + x1] ?? 0) -
    (grid[y1 * stride + x0] ?? 0) +
    (grid[y0 * stride + x0] ?? 0)
  );
}

/** Sauvola adaptive threshold — handles glare, shadows and uneven lighting far
 * better than a global Otsu threshold for photos of shiny medicine strips. */
function sauvolaThreshold(values: Float32Array, width: number, height: number): Uint8Array {
  const out = new Uint8Array(width * height);
  const integral = buildIntegral(values, width, height);
  const win = Math.min(40, Math.max(15, Math.round(Math.min(width, height) / 18)));
  const k = 0.22;
  const R = 128;

  for (let y = 0; y < height; y++) {
    const y0 = Math.max(0, y - win);
    const y1 = Math.min(height, y + win + 1);
    for (let x = 0; x < width; x++) {
      const x0 = Math.max(0, x - win);
      const x1 = Math.min(width, x + win + 1);
      const area = (x1 - x0) * (y1 - y0);
      const s = boxSum(integral, x0, y0, x1, y1, false);
      const sq = boxSum(integral, x0, y0, x1, y1, true);
      const mean = s / area;
      const variance = Math.max(0, sq / area - mean * mean);
      const std = Math.sqrt(variance);
      const threshold = mean * (1 + k * (std / R - 1));
      out[y * width + x] = (values[y * width + x] ?? 0) > threshold ? 255 : 0;
    }
  }
  return out;
}

async function preprocessImage(file: File): Promise<ProcessedImage> {
  const bitmap = await createImageBitmap(file);
  try {
    const scale = Math.min(
      MAX_DIMENSION / bitmap.width,
      Math.max(1, TARGET_MIN_WIDTH / bitmap.width),
      3,
    );
    const width = Math.max(1, Math.round(bitmap.width * scale));
    const height = Math.max(1, Math.round(bitmap.height * scale));

    const gray = document.createElement("canvas");
    gray.width = width;
    gray.height = height;
    const gctx = gray.getContext("2d", { willReadFrequently: true });
    if (!gctx) throw new Error("Canvas 2D context unavailable");
    gctx.imageSmoothingEnabled = true;
    gctx.imageSmoothingQuality = "high";
    gctx.drawImage(bitmap, 0, 0, width, height);

    const imageData = gctx.getImageData(0, 0, width, height);
    const px = imageData.data;
    const luminance = new Float32Array(width * height);

    let min = 255;
    let max = 0;
    for (let i = 0; i < width * height; i++) {
      const r = px[i * 4] ?? 0;
      const g = px[i * 4 + 1] ?? 0;
      const b = px[i * 4 + 2] ?? 0;
      const v = 0.299 * r + 0.587 * g + 0.114 * b;
      luminance[i] = v;
      if (v < min) min = v;
      if (v > max) max = v;
    }

    const range = Math.max(max - min, 1);
    const stretched = new Float32Array(width * height);
    for (let i = 0; i < width * height; i++) {
      stretched[i] = (((luminance[i] ?? 0) - min) / range) * 255;
    }

    // Unsharp mask: sharpen = original + amount * (original - blur)
    const sharp = new Float32Array(width * height);
    const amount = 1.1;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = y * width + x;
        const c = stretched[i] ?? 0;
        const up = stretched[y > 0 ? i - width : i] ?? c;
        const down = stretched[y < height - 1 ? i + width : i] ?? c;
        const left = stretched[x > 0 ? i - 1 : i] ?? c;
        const right = stretched[x < width - 1 ? i + 1 : i] ?? c;
        const blur = (up + down + left + right + c * 4) / 8;
        sharp[i] = Math.max(0, Math.min(255, c + amount * (c - blur)));
      }
    }

    for (let i = 0; i < width * height; i++) {
      const v = sharp[i] ?? 0;
      px[i * 4] = px[i * 4 + 1] = px[i * 4 + 2] = v;
      px[i * 4 + 3] = 255;
    }
    gctx.putImageData(imageData, 0, 0);

    const bin = document.createElement("canvas");
    bin.width = width;
    bin.height = height;
    const bctx = bin.getContext("2d", { willReadFrequently: true });
    if (!bctx) throw new Error("Canvas 2D context unavailable");

    let binary = sauvolaThreshold(stretched, width, height);

    // Detect inverted (light-on-dark) strips and normalize to dark-on-light.
    let dark = 0;
    for (let i = 0; i < binary.length; i++) if ((binary[i] ?? 0) < 128) dark++;
    if (dark > binary.length * 0.5) {
      const flipped = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) flipped[i] = 255 - (binary[i] ?? 0);
      binary = flipped;
    }

    const bdata = bctx.createImageData(width, height);
    const bpx = bdata.data;
    for (let i = 0; i < width * height; i++) {
      const v = binary[i] ?? 255;
      bpx[i * 4] = bpx[i * 4 + 1] = bpx[i * 4 + 2] = v;
      bpx[i * 4 + 3] = 255;
    }
    bctx.putImageData(bdata, 0, 0);

    return { gray, bin };
  } finally {
    bitmap.close();
  }
}

interface PassResult {
  text: string;
  confidence: number;
}

async function runPass(
  worker: OcrWorker,
  image: unknown,
  options: Record<string, string | boolean>,
): Promise<PassResult> {
  const { data } = await worker.recognize(image, options);
  return { text: data.text ?? "", confidence: data.confidence ?? 0 };
}

async function recognizeStrip(file: File): Promise<StripScanResult> {
  const { gray, bin } = await preprocessImage(file);
  const worker = await getWorker();

  const [fullPass, fullBinPass, codePass, datePass] = await Promise.all([
    runPass(worker, gray, {
      psm: "6",
      preserve_interword_spaces: "1",
      rotateAuto: true,
    }),
    runPass(worker, bin, {
      psm: "6",
      preserve_interword_spaces: "1",
      rotateAuto: true,
    }),
    runPass(worker, bin, {
      psm: "11",
      tessedit_char_whitelist: ALNUM_CHARS,
    }),
    runPass(worker, bin, {
      psm: "11",
      tessedit_char_whitelist: DATE_CHARS,
    }),
  ]);

  return parseStripResult(fullPass, fullBinPass, codePass, datePass);
}

const EXP_LABEL_RE = /(?:exp(?:iry)?)\s*[:.-]?\s*(\d{1,2})\s*[/.-]\s*(\d{2}|\d{4})\b/i;
const PLAIN_DATE_RE = /\b(\d{1,2})\s*[/.-]\s*(\d{2}|\d{4})\b/g;
const MFG_LABEL_RE =
  /(?:mfg|mfd|manufactured|manuf\.?)\s*[:.-]?\s*(\d{1,2})\s*[/.-]\s*(\d{2}|\d{4})\b/i;

const BATCH_LABEL_RE =
  /(?:^|[|;\s])(?:m\.?\s*b\.?|b(?:atch)?)\s*\.?\s*n[o°№.]?\s*\.?\s*[:=]?\s*([A-Z0-9][A-Z0-9/._-]{2,19})/i;

const DOSAGE_RE =
  /\b(\d{1,4}(?:\.\d+)?)\s*(mg|mcg|µg|g|gm|ml|iu|units?|tablets?|tabs?|capsules?|caps?)\b/i;

const MFG_NAME_RE =
  /(?:mfd|mfg|manufactured|made)\s*(?:by|at)?\s*[:.]?\s*([A-Za-z][A-Za-z0-9&.'\- ]{3,}?)(?=\s+(?:pvt|private|limited|ltd|india)|$)/i;

const NAME_TAIL_RE =
  /\s*(?:tablets?|tabs?|capsules?|caps?|ip|bp|usp|strip|pack|film[- ]?coated|sugar[- ]?coated|drops|syrup|injection|gel|cream|ointment|solution|suspension|infusion)\s*$/i;

const STRONG_SKIP_RE =
  /^(?:batch|b\.?\s*n[o°]?\.?|mfg|mfd|exp|mrp|price|lic|gst|reg|ph\.?|n[o°]?\.?)\b/i;

function normalizeDate(month: string, year: string): string | null {
  const m = Number(month);
  if (!Number.isInteger(m) || m < 1 || m > 12) return null;
  const y = year.length === 2 ? 2000 + Number(year) : Number(year);
  if (!Number.isInteger(y) || y < 2000 || y > 2100) return null;
  const lastDay = new Date(y, m, 0).getDate();
  return `${y}-${String(m).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`;
}

function collectDates(text: string): string[] {
  const out: string[] = [];
  for (const match of text.matchAll(PLAIN_DATE_RE)) {
    const normalized = normalizeDate(match[1] ?? "", match[2] ?? "");
    if (normalized) out.push(normalized);
  }
  return out;
}

function cleanName(line: string): string {
  let s = line;
  const dosage = DOSAGE_RE.exec(s);
  if (dosage?.index) s = s.slice(0, dosage.index);
  s = s.replace(NAME_TAIL_RE, "");
  s = s
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^[^\w]+|[^\w]+$/g, "");
  return s;
}

function guessMedicineName(lines: string[]): string | null {
  let best: { score: number; line: string } | null = null;
  for (const line of lines) {
    if (line.length < 4 || line.length > 60) continue;
    if (STRONG_SKIP_RE.test(line)) continue;
    if (DOSAGE_RE.test(line)) continue;
    if (/^\d+$/.test(line) || !/[a-z]/i.test(line)) continue;
    if (PLAIN_DATE_RE.test(line)) continue;
    const words = line.split(/\s+/);
    const upperWords = words.filter((w) => /^[A-Z][A-Za-z0-9]*$/.test(w) && w.length > 1).length;
    const score = upperWords + (words.length >= 2 ? 1 : 0);
    if (!best || score > best.score) best = { score, line };
  }
  return best?.line ?? null;
}

function extractManufacturer(text: string): string | null {
  const m = MFG_NAME_RE.exec(text);
  if (!m?.[1]) return null;
  const raw = m[1].replace(/^[\s:.-]+/, "").replace(/[\s:.-]+$/, "");
  const cut = raw.split(/\s+(?:regd|regd\.|country|imported|plot|address|website|www|ph|tel)/i)[0];
  return cut ? cut.trim().replace(/[.\s]+$/, "") : null;
}

function parseStripResult(
  full: PassResult,
  fullBin: PassResult,
  code: PassResult,
  dates: PassResult,
): StripScanResult {
  const fullText = full.text.trim();
  const fullBinText = fullBin.text.trim();
  const codeText = code.text.trim();
  const dateText = dates.text.trim();

  const allText = [fullText, fullBinText, codeText, dateText]
    .filter((t) => t.length > 0)
    .join("\n");

  let batchNumber: string | null = null;
  for (const source of [codeText, fullText, fullBinText]) {
    const m = BATCH_LABEL_RE.exec(source);
    if (m?.[1]) {
      batchNumber = m[1].trim().replace(/[.:]+$/, "");
      break;
    }
  }
  if (!batchNumber) {
    const fallback = /\b([A-Z][A-Z0-9]{2,}-[0-9]{2,}|[A-Z0-9]{3,}[0-9]{2,}[A-Z0-9]*)\b/.exec(
      codeText,
    );
    if (fallback?.[1] && /[0-9]/.test(fallback[1])) {
      batchNumber = fallback[1];
    }
  }

  let expiryDate: string | null = null;
  const expMatch = EXP_LABEL_RE.exec(`${dateText}\n${fullText}\n${fullBinText}`);
  if (expMatch) {
    expiryDate = normalizeDate(expMatch[1] ?? "", expMatch[2] ?? "");
  }
  if (!expiryDate) {
    const candidates = [
      ...new Set(collectDates(`${dateText}\n${fullText}\n${fullBinText}`)),
    ].sort();
    expiryDate = candidates[candidates.length - 1] ?? null;
  }

  let mfgDate: string | null = null;
  const mfgMatch = MFG_LABEL_RE.exec(`${fullText}\n${fullBinText}`);
  if (mfgMatch) {
    mfgDate = normalizeDate(mfgMatch[1] ?? "", mfgMatch[2] ?? "");
  }

  let dosage: string | null = null;
  const dosageMatch = DOSAGE_RE.exec(`${fullText}\n${fullBinText}`);
  if (dosageMatch) {
    dosage = `${dosageMatch[1]}${(dosageMatch[2] ?? "").toLowerCase()}`;
  }

  const lines = (fullText.length >= fullBinText.length ? fullText : fullBinText)
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  let medicineName: string | null = null;
  let saltComposition: string | null = null;

  const dosageLineIdx = lines.findIndex((l) => DOSAGE_RE.test(l));
  if (dosageLineIdx >= 0) {
    medicineName = cleanName(lines[dosageLineIdx] ?? "");
    if (medicineName) {
      const compLine = lines.find(
        (l, i) =>
          i !== dosageLineIdx &&
          (/(?:each|composition|contains|comp\.|salt)/i.test(l) || DOSAGE_RE.test(l)),
      );
      if (compLine) {
        const cleaned = cleanName(compLine);
        saltComposition = cleaned || null;
      }
    }
  }
  if (!medicineName) {
    medicineName = guessMedicineName(lines);
  }

  // Spell-correct against a known medicine dictionary — fixes OCR letter
  // confusions (e.g. "Amoxidlin 500mg" -> "Amoxicillin 500mg") and enriches
  // salt / dosage from canonical data. The already-extracted name line is used
  // as focus text so a printed brand name wins over its generic equivalent.
  const focusText = [medicineName, saltComposition].filter(Boolean).join(" ");
  const dictionaryHit = matchMedicineInText(allText, focusText || undefined);
  if (dictionaryHit) {
    medicineName = dictionaryHit.name;
    saltComposition = dictionaryHit.salt ?? saltComposition;
    dosage = dictionaryHit.dosage ?? dosage;
  }

  const manufacturer = extractManufacturer(`${fullText}\n${fullBinText}`);

  const foundScore = (batchNumber ? 1 : 0) + (expiryDate ? 1 : 0) + (medicineName ? 1 : 0);
  const base = Math.max(full.confidence, fullBin.confidence, code.confidence);
  const adjusted = base + (foundScore >= 2 ? 15 : 0) + (batchNumber && expiryDate ? 15 : 0);

  const confidence =
    adjusted >= 70 && batchNumber && expiryDate
      ? "High"
      : adjusted >= 45 || batchNumber || expiryDate
        ? "Medium"
        : "Low";

  return {
    rawText: fullText || fullBinText || codeText || dateText,
    confidence,
    medicineName,
    saltComposition,
    batchNumber,
    expiryDate,
    mfgDate,
    dosage,
    manufacturer,
  };
}

export { recognizeStrip };
