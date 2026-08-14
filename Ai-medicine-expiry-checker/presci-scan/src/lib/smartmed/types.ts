export type Role = "owner" | "keeper";

export type StockStatus = "safe" | "near" | "expired";

export interface Medicine {
  id: string;
  name: string;
  batchNo: string;
  barcode: string;
  category: string;
  expiryDate: string; // ISO
  receivedAt: string; // ISO
  quantity: number;
  price: number;
  avgMonthlySales: number;
  discount?: number; // percent applied by AI strategy
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  password: string;
  mobile: string;
  pharmacyName: string;
  role: Role;
}

export interface AlertLog {
  id: string;
  createdAt: string;
  audience: "owner" | "keeper";
  channel: "SMS" | "Email" | "Screen";
  severity: "critical" | "warning" | "info";
  medicine: string;
  batchNo: string;
  message: string;
}

export interface CartLine {
  medicineId: string;
  name: string;
  batchNo: string;
  price: number;
  qty: number;
  discount: number;
  status: StockStatus;
}

export interface Prediction {
  id: string;
  name: string;
  batchNo: string;
  daysToExpiry: number;
  predictedUnsoldQty: number;
  potentialLoss: number;
  suggestedDiscount: number;
  action: string;
}