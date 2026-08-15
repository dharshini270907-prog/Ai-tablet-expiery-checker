import type { AlertLog, Medicine, UserProfile } from "./types";

const DAY = 86_400_000;
const iso = (offsetDays: number) => new Date(Date.now() + offsetDays * DAY).toISOString();

type Row = [string, string, string, number, number, number, number, number];
// name, batch, category, expiryOffsetDays, receivedOffsetDays, qty, price, avgMonthlySales
const rows: Row[] = [
  ["Paracetamol 650mg", "PC650-A21", "Analgesic", 240, -12, 320, 2.4, 180],
  ["Dolo 650", "DL650-B07", "Analgesic", 18, -95, 140, 3.1, 90],
  ["Amoxicillin 500mg", "AMX500-C13", "Antibiotic", 6, -140, 60, 9.5, 40],
  ["Azithromycin 250mg", "AZT250-D02", "Antibiotic", -9, -220, 45, 14.2, 25],
  ["Cetirizine 10mg", "CTZ10-E44", "Antihistamine", 27, -70, 210, 1.8, 150],
  ["Vitamin D3 60K", "VD3-F19", "Supplement", 410, -20, 96, 32, 30],
  ["Metformin 500mg", "MET500-G05", "Antidiabetic", 150, -40, 260, 4.6, 200],
  ["Atorvastatin 10mg", "ATR10-H88", "Cardiac", 12, -180, 88, 7.4, 60],
  ["Pantoprazole 40mg", "PAN40-I31", "Gastro", 90, -30, 175, 5.2, 110],
  ["Cough Syrup 100ml", "CSY-J12", "Syrup", 22, -120, 40, 88, 22],
  ["Paracetamol Syrup 60ml", "PSY-K56", "Syrup", -3, -300, 18, 52, 30],
  ["ORS Powder Sachet", "ORS-L77", "Rehydration", 310, -8, 500, 22, 260],
  ["Ibuprofen 400mg", "IBU400-M09", "Analgesic", 65, -60, 130, 3.6, 95],
  ["Amlodipine 5mg", "AML5-N24", "Cardiac", 14, -200, 74, 4.1, 48],
  ["Levocetirizine 5mg", "LVC5-O61", "Antihistamine", 29, -85, 160, 2.9, 120],
  ["Insulin Glargine Pen", "INS-P03", "Antidiabetic", 40, -15, 26, 720, 12],
  ["Vitamin B-Complex", "VBC-Q45", "Supplement", 200, -25, 180, 6.4, 70],
  ["Calcium + D3 Tablets", "CAL-R18", "Supplement", 8, -170, 92, 5.8, 55],
  ["Ondansetron 4mg", "OND4-S37", "Antiemetic", 120, -35, 84, 6.9, 44],
  ["Ranitidine 150mg", "RAN150-T90", "Gastro", -21, -400, 55, 2.2, 20],
  ["Cefixime 200mg", "CFX200-U02", "Antibiotic", 25, -110, 68, 16.5, 38],
  ["Montelukast 10mg", "MON10-V56", "Respiratory", 175, -18, 110, 9.2, 52],
  ["Salbutamol Inhaler", "SAL-W71", "Respiratory", 11, -190, 34, 245, 18],
  ["Diclofenac Gel 30g", "DIC-X23", "Topical", 95, -45, 76, 118, 40],
  ["Betadine Solution 100ml", "BET-Y64", "Antiseptic", 260, -22, 62, 145, 25],
  ["Thyroxine 50mcg", "THY50-Z11", "Hormonal", 19, -130, 145, 3.4, 105],
  ["Multivitamin Gummies", "MVG-A99", "Supplement", -35, -420, 30, 380, 15],
  ["Zincovit Tablets", "ZNC-B34", "Supplement", 330, -10, 240, 7.1, 130],
  ["Paracetamol 650mg", "PC650-C77", "Analgesic", 520, -3, 400, 2.4, 180],
  ["Amoxicillin 500mg", "AMX500-D91", "Antibiotic", 300, -5, 150, 9.5, 40],
];

export function seedInventory(): Medicine[] {
  return rows.map((r, i) => ({
    id: `MED-${String(i + 1).padStart(3, "0")}`,
    name: r[0],
    batchNo: r[1],
    barcode: `890${String(100000 + i * 137)}`,
    category: r[2],
    expiryDate: iso(r[3]),
    receivedAt: iso(r[4]),
    quantity: r[5],
    price: r[6],
    avgMonthlySales: r[7],
  }));
}

export const seedUsers: UserProfile[] = [
  {
    id: "USR-OWNER",
    fullName: "Dr. Anitha Rao",
    email: "owner@smartmed.in",
    password: "owner123",
    mobile: "+91 98450 11223",
    pharmacyName: "SmartMed Family Pharmacy",
    role: "owner",
  },
  {
    id: "USR-KEEPER",
    fullName: "Ravi Kumar",
    email: "staff@smartmed.in",
    password: "staff123",
    mobile: "+91 90080 44556",
    pharmacyName: "SmartMed Family Pharmacy",
    role: "keeper",
  },
];

export const seedAlerts: AlertLog[] = [
  {
    id: "ALT-SEED-1",
    createdAt: iso(-1),
    audience: "owner",
    channel: "SMS",
    severity: "warning",
    medicine: "Amoxicillin 500mg",
    batchNo: "AMX500-C13",
    message: "6 days to expiry · 60 units at risk. Apply clearance strategy to limit financial loss.",
  },
  {
    id: "ALT-SEED-2",
    createdAt: iso(-0.4),
    audience: "keeper",
    channel: "Screen",
    severity: "critical",
    medicine: "Azithromycin 250mg",
    batchNo: "AZT250-D02",
    message: "Expired batch detected at counter. Remove from shelf immediately.",
  },
];