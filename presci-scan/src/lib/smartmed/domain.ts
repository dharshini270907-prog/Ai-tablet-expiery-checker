import type { Medicine, StockStatus } from "./types";

export const NEAR_EXPIRY_DAYS = 30;
export const GST_RATE = 0.12;

export function daysToExpiry(expiryDate: string, now = new Date()): number {
  const ms = new Date(expiryDate).getTime() - now.getTime();
  return Math.floor(ms / 86_400_000);
}

export function statusOf(med: Medicine, now = new Date()): StockStatus {
  const d = daysToExpiry(med.expiryDate, now);
  if (d < 0) return "expired";
  if (d <= NEAR_EXPIRY_DAYS) return "near";
  return "safe";
}

export function suggestedDiscount(days: number): number {
  if (days < 0) return 0;
  if (days <= 15) return 50;
  if (days <= NEAR_EXPIRY_DAYS) return 30;
  return 0;
}

export const inr = (n: number) =>
  "₹" + n.toLocaleString("en-IN", { maximumFractionDigits: 2, minimumFractionDigits: 2 });

export function formatStamp(iso: string) {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  let h = d.getHours();
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(h)}:${pad(d.getMinutes())} ${ampm}`;
}

export function formatDate(iso: string) {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
}

/** FEFO: earliest-expiring VALID batch of the same medicine name. */
export function findSubstituteBatch(inventory: Medicine[], name: string, excludeId: string) {
  return inventory
    .filter(
      (m) =>
        m.id !== excludeId &&
        m.name.toLowerCase() === name.toLowerCase() &&
        m.quantity > 0 &&
        statusOf(m) !== "expired",
    )
    .sort((a, b) => +new Date(a.expiryDate) - +new Date(b.expiryDate))[0];
}

export const statusLabel: Record<StockStatus, string> = {
  safe: "Safe",
  near: "Near-Expiry",
  expired: "Expired",
};