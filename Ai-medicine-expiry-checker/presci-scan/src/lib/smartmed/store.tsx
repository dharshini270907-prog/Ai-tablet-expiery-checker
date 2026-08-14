import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { seedAlerts, seedInventory, seedUsers } from "./seed";
import { statusOf } from "./domain";
import type { AlertLog, CartLine, Medicine, Role, UserProfile } from "./types";

const KEY = "smartmed.state.v1";

interface PersistedState {
  inventory: Medicine[];
  users: UserProfile[];
  alerts: AlertLog[];
  currentUserId: string | null;
  onboarded: boolean;
}

interface StoreValue extends PersistedState {
  ready: boolean;
  user: UserProfile | null;
  cart: CartLine[];
  login: (email: string, password: string) => { ok: boolean; error?: string };
  register: (input: Omit<UserProfile, "id">) => { ok: boolean; error?: string };
  logout: () => void;
  markOnboarded: () => void;
  addMedicine: (input: Omit<Medicine, "id" | "receivedAt">) => Medicine;
  updateMedicine: (id: string, patch: Partial<Medicine>) => void;
  removeMedicine: (id: string) => void;
  applyDiscountStrategy: () => number;
  logAlert: (input: Omit<AlertLog, "id" | "createdAt">) => void;
  addToCart: (line: CartLine) => void;
  updateCartQty: (medicineId: string, qty: number) => void;
  removeFromCart: (medicineId: string) => void;
  clearCart: () => void;
  checkout: () => void;
  resetDemoData: () => void;
}

const StoreContext = createContext<StoreValue | null>(null);

function initialState(): PersistedState {
  return {
    inventory: seedInventory(),
    users: seedUsers,
    alerts: seedAlerts,
    currentUserId: null,
    onboarded: false,
  };
}

const uid = (p: string) => `${p}-${Math.random().toString(36).slice(2, 9).toUpperCase()}`;

export function SmartMedProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PersistedState>(initialState);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setState({ ...initialState(), ...(JSON.parse(raw) as PersistedState) });
    } catch {
      /* ignore corrupted state */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(KEY, JSON.stringify(state));
  }, [state, ready]);

  const user = useMemo(
    () => state.users.find((u) => u.id === state.currentUserId) ?? null,
    [state.users, state.currentUserId],
  );

  const logAlert = useCallback((input: Omit<AlertLog, "id" | "createdAt">) => {
    setState((s) => ({
      ...s,
      alerts: [{ ...input, id: uid("ALT"), createdAt: new Date().toISOString() }, ...s.alerts].slice(0, 200),
    }));
  }, []);

  const value: StoreValue = {
    ...state,
    ready,
    user,
    cart,
    login: (email, password) => {
      const found = state.users.find(
        (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password,
      );
      if (!found) return { ok: false, error: "Invalid email or password." };
      setState((s) => ({ ...s, currentUserId: found.id }));
      return { ok: true };
    },
    register: (input) => {
      if (state.users.some((u) => u.email.toLowerCase() === input.email.trim().toLowerCase())) {
        return { ok: false, error: "An account with this email already exists." };
      }
      const created: UserProfile = { ...input, email: input.email.trim(), id: uid("USR") };
      setState((s) => ({ ...s, users: [...s.users, created], currentUserId: created.id }));
      return { ok: true };
    },
    logout: () => {
      setCart([]);
      setState((s) => ({ ...s, currentUserId: null }));
    },
    markOnboarded: () => setState((s) => ({ ...s, onboarded: true })),
    addMedicine: (input) => {
      const created: Medicine = { ...input, id: uid("MED"), receivedAt: new Date().toISOString() };
      setState((s) => ({ ...s, inventory: [created, ...s.inventory] }));
      return created;
    },
    updateMedicine: (id, patch) =>
      setState((s) => ({
        ...s,
        inventory: s.inventory.map((m) => (m.id === id ? { ...m, ...patch } : m)),
      })),
    removeMedicine: (id) =>
      setState((s) => ({ ...s, inventory: s.inventory.filter((m) => m.id !== id) })),
    applyDiscountStrategy: () => {
      let count = 0;
      setState((s) => ({
        ...s,
        inventory: s.inventory.map((m) => {
          const st = statusOf(m);
          if (st !== "near") return m;
          const days = Math.floor((new Date(m.expiryDate).getTime() - Date.now()) / 86_400_000);
          const d = days <= 15 ? 50 : 30;
          if (m.discount === d) return m;
          count += 1;
          return { ...m, discount: d };
        }),
      }));
      return count;
    },
    logAlert,
    addToCart: (line) =>
      setCart((c) => {
        const existing = c.find((l) => l.medicineId === line.medicineId);
        if (existing) {
          return c.map((l) => (l.medicineId === line.medicineId ? { ...l, qty: l.qty + line.qty } : l));
        }
        return [...c, line];
      }),
    updateCartQty: (medicineId, qty) =>
      setCart((c) => c.map((l) => (l.medicineId === medicineId ? { ...l, qty: Math.max(1, qty) } : l))),
    removeFromCart: (medicineId) => setCart((c) => c.filter((l) => l.medicineId !== medicineId)),
    clearCart: () => setCart([]),
    checkout: () => {
      setState((s) => ({
        ...s,
        inventory: s.inventory.map((m) => {
          const line = cart.find((l) => l.medicineId === m.id);
          return line ? { ...m, quantity: Math.max(0, m.quantity - line.qty) } : m;
        }),
      }));
      setCart([]);
    },
    resetDemoData: () => {
      setCart([]);
      setState((s) => ({ ...initialState(), currentUserId: s.currentUserId, onboarded: true }));
    },
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useSmartMed() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useSmartMed must be used inside SmartMedProvider");
  return ctx;
}

export const ownerOnly = (role: Role | undefined) => role === "owner";