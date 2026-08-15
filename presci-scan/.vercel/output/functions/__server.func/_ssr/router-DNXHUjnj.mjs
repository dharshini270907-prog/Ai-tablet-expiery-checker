import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { n as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { i as __exportAll } from "./server-ZT3gVTyp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DNXHUjnj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-BaWA6JCB.css";
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
var DAY = 864e5;
var iso = (offsetDays) => new Date(Date.now() + offsetDays * DAY).toISOString();
var rows = [
	[
		"Paracetamol 650mg",
		"PC650-A21",
		"Analgesic",
		240,
		-12,
		320,
		2.4,
		180
	],
	[
		"Dolo 650",
		"DL650-B07",
		"Analgesic",
		18,
		-95,
		140,
		3.1,
		90
	],
	[
		"Amoxicillin 500mg",
		"AMX500-C13",
		"Antibiotic",
		6,
		-140,
		60,
		9.5,
		40
	],
	[
		"Azithromycin 250mg",
		"AZT250-D02",
		"Antibiotic",
		-9,
		-220,
		45,
		14.2,
		25
	],
	[
		"Cetirizine 10mg",
		"CTZ10-E44",
		"Antihistamine",
		27,
		-70,
		210,
		1.8,
		150
	],
	[
		"Vitamin D3 60K",
		"VD3-F19",
		"Supplement",
		410,
		-20,
		96,
		32,
		30
	],
	[
		"Metformin 500mg",
		"MET500-G05",
		"Antidiabetic",
		150,
		-40,
		260,
		4.6,
		200
	],
	[
		"Atorvastatin 10mg",
		"ATR10-H88",
		"Cardiac",
		12,
		-180,
		88,
		7.4,
		60
	],
	[
		"Pantoprazole 40mg",
		"PAN40-I31",
		"Gastro",
		90,
		-30,
		175,
		5.2,
		110
	],
	[
		"Cough Syrup 100ml",
		"CSY-J12",
		"Syrup",
		22,
		-120,
		40,
		88,
		22
	],
	[
		"Paracetamol Syrup 60ml",
		"PSY-K56",
		"Syrup",
		-3,
		-300,
		18,
		52,
		30
	],
	[
		"ORS Powder Sachet",
		"ORS-L77",
		"Rehydration",
		310,
		-8,
		500,
		22,
		260
	],
	[
		"Ibuprofen 400mg",
		"IBU400-M09",
		"Analgesic",
		65,
		-60,
		130,
		3.6,
		95
	],
	[
		"Amlodipine 5mg",
		"AML5-N24",
		"Cardiac",
		14,
		-200,
		74,
		4.1,
		48
	],
	[
		"Levocetirizine 5mg",
		"LVC5-O61",
		"Antihistamine",
		29,
		-85,
		160,
		2.9,
		120
	],
	[
		"Insulin Glargine Pen",
		"INS-P03",
		"Antidiabetic",
		40,
		-15,
		26,
		720,
		12
	],
	[
		"Vitamin B-Complex",
		"VBC-Q45",
		"Supplement",
		200,
		-25,
		180,
		6.4,
		70
	],
	[
		"Calcium + D3 Tablets",
		"CAL-R18",
		"Supplement",
		8,
		-170,
		92,
		5.8,
		55
	],
	[
		"Ondansetron 4mg",
		"OND4-S37",
		"Antiemetic",
		120,
		-35,
		84,
		6.9,
		44
	],
	[
		"Ranitidine 150mg",
		"RAN150-T90",
		"Gastro",
		-21,
		-400,
		55,
		2.2,
		20
	],
	[
		"Cefixime 200mg",
		"CFX200-U02",
		"Antibiotic",
		25,
		-110,
		68,
		16.5,
		38
	],
	[
		"Montelukast 10mg",
		"MON10-V56",
		"Respiratory",
		175,
		-18,
		110,
		9.2,
		52
	],
	[
		"Salbutamol Inhaler",
		"SAL-W71",
		"Respiratory",
		11,
		-190,
		34,
		245,
		18
	],
	[
		"Diclofenac Gel 30g",
		"DIC-X23",
		"Topical",
		95,
		-45,
		76,
		118,
		40
	],
	[
		"Betadine Solution 100ml",
		"BET-Y64",
		"Antiseptic",
		260,
		-22,
		62,
		145,
		25
	],
	[
		"Thyroxine 50mcg",
		"THY50-Z11",
		"Hormonal",
		19,
		-130,
		145,
		3.4,
		105
	],
	[
		"Multivitamin Gummies",
		"MVG-A99",
		"Supplement",
		-35,
		-420,
		30,
		380,
		15
	],
	[
		"Zincovit Tablets",
		"ZNC-B34",
		"Supplement",
		330,
		-10,
		240,
		7.1,
		130
	],
	[
		"Paracetamol 650mg",
		"PC650-C77",
		"Analgesic",
		520,
		-3,
		400,
		2.4,
		180
	],
	[
		"Amoxicillin 500mg",
		"AMX500-D91",
		"Antibiotic",
		300,
		-5,
		150,
		9.5,
		40
	]
];
function seedInventory() {
	return rows.map((r, i) => ({
		id: `MED-${String(i + 1).padStart(3, "0")}`,
		name: r[0],
		batchNo: r[1],
		barcode: `890${String(1e5 + i * 137)}`,
		category: r[2],
		expiryDate: iso(r[3]),
		receivedAt: iso(r[4]),
		quantity: r[5],
		price: r[6],
		avgMonthlySales: r[7]
	}));
}
var seedUsers = [{
	id: "USR-OWNER",
	fullName: "Dr. Anitha Rao",
	email: "owner@smartmed.in",
	password: "owner123",
	mobile: "+91 98450 11223",
	pharmacyName: "SmartMed Family Pharmacy",
	role: "owner"
}, {
	id: "USR-KEEPER",
	fullName: "Ravi Kumar",
	email: "staff@smartmed.in",
	password: "staff123",
	mobile: "+91 90080 44556",
	pharmacyName: "SmartMed Family Pharmacy",
	role: "keeper"
}];
var seedAlerts = [{
	id: "ALT-SEED-1",
	createdAt: iso(-1),
	audience: "owner",
	channel: "SMS",
	severity: "warning",
	medicine: "Amoxicillin 500mg",
	batchNo: "AMX500-C13",
	message: "6 days to expiry · 60 units at risk. Apply clearance strategy to limit financial loss."
}, {
	id: "ALT-SEED-2",
	createdAt: iso(-.4),
	audience: "keeper",
	channel: "Screen",
	severity: "critical",
	medicine: "Azithromycin 250mg",
	batchNo: "AZT250-D02",
	message: "Expired batch detected at counter. Remove from shelf immediately."
}];
var GST_RATE = .12;
function daysToExpiry(expiryDate, now = /* @__PURE__ */ new Date()) {
	const ms = new Date(expiryDate).getTime() - now.getTime();
	return Math.floor(ms / 864e5);
}
function statusOf(med, now = /* @__PURE__ */ new Date()) {
	const d = daysToExpiry(med.expiryDate, now);
	if (d < 0) return "expired";
	if (d <= 30) return "near";
	return "safe";
}
function suggestedDiscount(days) {
	if (days < 0) return 0;
	if (days <= 15) return 50;
	if (days <= 30) return 30;
	return 0;
}
var inr = (n) => "₹" + n.toLocaleString("en-IN", {
	maximumFractionDigits: 2,
	minimumFractionDigits: 2
});
function formatStamp(iso) {
	const d = new Date(iso);
	const pad = (n) => String(n).padStart(2, "0");
	let h = d.getHours();
	const ampm = h >= 12 ? "PM" : "AM";
	h = h % 12 || 12;
	return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(h)}:${pad(d.getMinutes())} ${ampm}`;
}
function formatDate(iso) {
	const d = new Date(iso);
	const pad = (n) => String(n).padStart(2, "0");
	return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
}
/** FEFO: earliest-expiring VALID batch of the same medicine name. */
function findSubstituteBatch(inventory, name, excludeId) {
	return inventory.filter((m) => m.id !== excludeId && m.name.toLowerCase() === name.toLowerCase() && m.quantity > 0 && statusOf(m) !== "expired").sort((a, b) => +new Date(a.expiryDate) - +new Date(b.expiryDate))[0];
}
var statusLabel = {
	safe: "Safe",
	near: "Near-Expiry",
	expired: "Expired"
};
var KEY = "smartmed.state.v1";
var StoreContext = (0, import_react.createContext)(null);
function initialState() {
	return {
		inventory: seedInventory(),
		users: seedUsers,
		alerts: seedAlerts,
		currentUserId: null,
		onboarded: false
	};
}
var uid = (p) => `${p}-${Math.random().toString(36).slice(2, 9).toUpperCase()}`;
function SmartMedProvider({ children }) {
	const [state, setState] = (0, import_react.useState)(initialState);
	const [cart, setCart] = (0, import_react.useState)([]);
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		try {
			const raw = localStorage.getItem(KEY);
			if (raw) setState({
				...initialState(),
				...JSON.parse(raw)
			});
		} catch {}
		setReady(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!ready) return;
		localStorage.setItem(KEY, JSON.stringify(state));
	}, [state, ready]);
	const user = (0, import_react.useMemo)(() => state.users.find((u) => u.id === state.currentUserId) ?? null, [state.users, state.currentUserId]);
	const logAlert = (0, import_react.useCallback)((input) => {
		setState((s) => ({
			...s,
			alerts: [{
				...input,
				id: uid("ALT"),
				createdAt: (/* @__PURE__ */ new Date()).toISOString()
			}, ...s.alerts].slice(0, 200)
		}));
	}, []);
	const value = {
		...state,
		ready,
		user,
		cart,
		login: (email, password) => {
			const found = state.users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password);
			if (!found) return {
				ok: false,
				error: "Invalid email or password."
			};
			setState((s) => ({
				...s,
				currentUserId: found.id
			}));
			return { ok: true };
		},
		register: (input) => {
			if (state.users.some((u) => u.email.toLowerCase() === input.email.trim().toLowerCase())) return {
				ok: false,
				error: "An account with this email already exists."
			};
			const created = {
				...input,
				email: input.email.trim(),
				id: uid("USR")
			};
			setState((s) => ({
				...s,
				users: [...s.users, created],
				currentUserId: created.id
			}));
			return { ok: true };
		},
		logout: () => {
			setCart([]);
			setState((s) => ({
				...s,
				currentUserId: null
			}));
		},
		markOnboarded: () => setState((s) => ({
			...s,
			onboarded: true
		})),
		addMedicine: (input) => {
			const created = {
				...input,
				id: uid("MED"),
				receivedAt: (/* @__PURE__ */ new Date()).toISOString()
			};
			setState((s) => ({
				...s,
				inventory: [created, ...s.inventory]
			}));
			return created;
		},
		updateMedicine: (id, patch) => setState((s) => ({
			...s,
			inventory: s.inventory.map((m) => m.id === id ? {
				...m,
				...patch
			} : m)
		})),
		removeMedicine: (id) => setState((s) => ({
			...s,
			inventory: s.inventory.filter((m) => m.id !== id)
		})),
		applyDiscountStrategy: () => {
			let count = 0;
			setState((s) => ({
				...s,
				inventory: s.inventory.map((m) => {
					if (statusOf(m) !== "near") return m;
					const d = Math.floor((new Date(m.expiryDate).getTime() - Date.now()) / 864e5) <= 15 ? 50 : 30;
					if (m.discount === d) return m;
					count += 1;
					return {
						...m,
						discount: d
					};
				})
			}));
			return count;
		},
		logAlert,
		addToCart: (line) => setCart((c) => {
			if (c.find((l) => l.medicineId === line.medicineId)) return c.map((l) => l.medicineId === line.medicineId ? {
				...l,
				qty: l.qty + line.qty
			} : l);
			return [...c, line];
		}),
		updateCartQty: (medicineId, qty) => setCart((c) => c.map((l) => l.medicineId === medicineId ? {
			...l,
			qty: Math.max(1, qty)
		} : l)),
		removeFromCart: (medicineId) => setCart((c) => c.filter((l) => l.medicineId !== medicineId)),
		clearCart: () => setCart([]),
		checkout: () => {
			setState((s) => ({
				...s,
				inventory: s.inventory.map((m) => {
					const line = cart.find((l) => l.medicineId === m.id);
					return line ? {
						...m,
						quantity: Math.max(0, m.quantity - line.qty)
					} : m;
				})
			}));
			setCart([]);
		},
		resetDemoData: () => {
			setCart([]);
			setState((s) => ({
				...initialState(),
				currentUserId: s.currentUserId,
				onboarded: true
			}));
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoreContext.Provider, {
		value,
		children
	});
}
function useSmartMed() {
	const ctx = (0, import_react.useContext)(StoreContext);
	if (!ctx) throw new Error("useSmartMed must be used inside SmartMedProvider");
	return ctx;
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$7 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "SmartMed AI — Pharmacy Expiry Prevention" },
			{
				name: "description",
				content: "SmartMed AI prevents medicine expiry losses with the Predict, Act, Block framework: AI forecasting, FEFO rotation and blocked expired sales."
			},
			{
				name: "author",
				content: "SmartMed AI"
			},
			{
				property: "og:title",
				content: "SmartMed AI — Pharmacy Expiry Prevention"
			},
			{
				property: "og:description",
				content: "AI-powered expiry prediction, POS blocking and sustainable pharmacy management."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:site",
				content: "@SmartMedAI"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=DM+Sans:wght@400;500;600&display=swap"
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$7.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SmartMedProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {})] })
	});
}
var $$splitComponentImporter$6 = () => import("./routes-BUk6DKOh.mjs");
var Route$6 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "SmartMed AI — Sign in to Expiry Prevention" },
		{
			name: "description",
			content: "Sign in to SmartMed AI to predict medicine expiry losses, act with AI clearance discounts and block expired sales at the pharmacy counter."
		},
		{
			property: "og:title",
			content: "SmartMed AI — Sign in to Expiry Prevention"
		},
		{
			property: "og:description",
			content: "Role-based pharmacy management powered by the Predict, Act, Block framework."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./alerts-ChxGGVHx.mjs");
var Route$5 = createFileRoute("/alerts")({
	head: () => ({ meta: [
		{ title: "Alert Logs — Dual-Role Expiry Notifications | SmartMed AI" },
		{
			name: "description",
			content: "Timestamped audit trail of every SmartMed alert: owner SMS/email loss warnings and shop keeper counter-safety screen alerts."
		},
		{
			property: "og:title",
			content: "Alert Logs — SmartMed AI"
		},
		{
			property: "og:description",
			content: "Automatic multi-role alerts for near-expiry stock and blocked expired sales."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./billing-CSYCH1py.mjs");
var Route$4 = createFileRoute("/billing")({
	head: () => ({ meta: [
		{ title: "Billing Counter — Expired Sale Blocking POS | SmartMed AI" },
		{
			name: "description",
			content: "Hybrid POS with barcode scanning and manual type-to-bill. Expired batches are blocked with audio alerts and FEFO substitute suggestions."
		},
		{
			property: "og:title",
			content: "Billing Counter — SmartMed AI"
		},
		{
			property: "og:description",
			content: "Scan or type to bill, with real-time PAB verification, AI clearance discounts and GST invoicing."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./dashboard-DSjznO4D.mjs");
var Route$3 = createFileRoute("/dashboard")({
	head: () => ({ meta: [
		{ title: "Dashboard — SmartMed AI Pharmacy Control Tower" },
		{
			name: "description",
			content: "Live pharmacy health: SKU count, inventory value in rupees, near-expiry and expired counts, stock breakdown and the FEFO urgency queue."
		},
		{
			property: "og:title",
			content: "Dashboard — SmartMed AI"
		},
		{
			property: "og:description",
			content: "Inventory value, expiry risk breakdown and the top FEFO urgency items at a glance."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./inventory-CVYvvdpi.mjs");
var Route$2 = createFileRoute("/inventory")({
	head: () => ({ meta: [
		{ title: "Inventory — Batch-Level Stock Register | SmartMed AI" },
		{
			name: "description",
			content: "Search, filter and sort every medicine batch with received timestamps, expiry dates, quantity, price and PAB status badges."
		},
		{
			property: "og:title",
			content: "Inventory — SmartMed AI"
		},
		{
			property: "og:description",
			content: "Batch-level pharmacy stock register with live expiry status and FEFO sorting."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./predictions-CaDH7hhP.mjs");
var Route$1 = createFileRoute("/predictions")({
	head: () => ({ meta: [
		{ title: "AI Expiry Predictions — Financial Loss Forecast | SmartMed AI" },
		{
			name: "description",
			content: "Server-side AI forecasts predicted unsold quantity and rupee loss per batch, then suggests 30% or 50% clearance discounts you can apply in one click."
		},
		{
			property: "og:title",
			content: "AI Expiry Predictions — SmartMed AI"
		},
		{
			property: "og:description",
			content: "Predicted unsold stock, potential financial loss and one-click AI discount strategy."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./stock-entry-D1OIPCY4.mjs");
var Route = createFileRoute("/stock-entry")({
	head: () => ({ meta: [
		{ title: "Stock Entry — Scan, OCR & Bulk Upload | SmartMed AI" },
		{
			name: "description",
			content: "Receive pharmacy stock three ways: live barcode scanning, Tesseract.js OCR of medicine strips, or bulk CSV upload with auto timestamps."
		},
		{
			property: "og:title",
			content: "Stock Entry — SmartMed AI"
		},
		{
			property: "og:description",
			content: "Barcode scan, AI OCR strip reading and CSV bulk import with automatic received timestamps."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var rootRouteChildren = {
	IndexRoute: Route$6.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$7
	}),
	AlertsRoute: Route$5.update({
		id: "/alerts",
		path: "/alerts",
		getParentRoute: () => Route$7
	}),
	BillingRoute: Route$4.update({
		id: "/billing",
		path: "/billing",
		getParentRoute: () => Route$7
	}),
	DashboardRoute: Route$3.update({
		id: "/dashboard",
		path: "/dashboard",
		getParentRoute: () => Route$7
	}),
	InventoryRoute: Route$2.update({
		id: "/inventory",
		path: "/inventory",
		getParentRoute: () => Route$7
	}),
	PredictionsRoute: Route$1.update({
		id: "/predictions",
		path: "/predictions",
		getParentRoute: () => Route$7
	}),
	StockEntryRoute: Route.update({
		id: "/stock-entry",
		path: "/stock-entry",
		getParentRoute: () => Route$7
	})
};
var routeTree = Route$7._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { findSubstituteBatch as a, inr as c, suggestedDiscount as d, daysToExpiry as i, statusLabel as l, useSmartMed as n, formatDate as o, GST_RATE as r, formatStamp as s, router_exports as t, statusOf as u };
