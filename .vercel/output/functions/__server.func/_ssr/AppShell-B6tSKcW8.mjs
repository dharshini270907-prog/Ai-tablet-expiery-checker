import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as useNavigate, g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useSmartMed } from "./router-DNXHUjnj.mjs";
import { F as BrainCircuit, I as Boxes, L as Bell, S as LayoutDashboard, b as LogOut, h as PackagePlus, k as CirclePlay, l as ShieldCheck, p as ScanBarcode, v as Menu } from "../_libs/lucide-react.mjs";
import { c as cn, n as DemoModal, t as Button } from "./DemoModal-B7pTYoCn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AppShell-B6tSKcW8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var nav = [
	{
		to: "/dashboard",
		label: "Dashboard",
		icon: LayoutDashboard,
		ownerOnly: true
	},
	{
		to: "/inventory",
		label: "Inventory",
		icon: Boxes,
		ownerOnly: false
	},
	{
		to: "/stock-entry",
		label: "Stock Entry",
		icon: PackagePlus,
		ownerOnly: true
	},
	{
		to: "/billing",
		label: "Billing Counter",
		icon: ScanBarcode,
		ownerOnly: false
	},
	{
		to: "/predictions",
		label: "AI Predictions",
		icon: BrainCircuit,
		ownerOnly: true
	},
	{
		to: "/alerts",
		label: "Alerts",
		icon: Bell,
		ownerOnly: false
	}
];
function AppShell({ children, ownerOnly = false, title, subtitle }) {
	const { user, ready, logout } = useSmartMed();
	const navigate = useNavigate();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [demoOpen, setDemoOpen] = (0, import_react.useState)(false);
	const [menuOpen, setMenuOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!ready) return;
		if (!user) navigate({ to: "/" });
		else if (ownerOnly && user.role !== "owner") navigate({ to: "/billing" });
	}, [
		ready,
		user,
		ownerOnly,
		navigate
	]);
	(0, import_react.useEffect)(() => {
		setDemoOpen(false);
	}, [pathname]);
	if (!ready || !user || ownerOnly && user.role !== "owner") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted-foreground text-sm",
			children: "Verifying access…"
		})
	});
	const items = nav.filter((n) => !n.ownerOnly || user.role === "owner");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-screen flex-col lg:flex-row",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: cn("bg-sidebar border-sidebar-border lg:sticky lg:top-0 lg:h-screen lg:w-64 lg:shrink-0 lg:border-r", "border-b"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-2 p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: user.role === "owner" ? "/dashboard" : "/billing",
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "bg-primary/20 text-accent grid size-9 place-items-center rounded-lg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display block text-sm leading-tight font-bold",
							children: "SmartMed AI"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground block text-[11px]",
							children: "Predict · Act · Block"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						className: "lg:hidden",
						"aria-label": "Toggle navigation",
						onClick: () => setMenuOpen((v) => !v),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: cn("px-3 pb-4 lg:block", menuOpen ? "block" : "hidden"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-1",
						children: items.map((item) => {
							const active = pathname === item.to;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								onClick: () => setMenuOpen(false),
								className: cn("flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors", active ? "bg-primary/20 text-accent" : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-4" }), item.label]
							}) }, item.to);
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 space-y-3 border-t border-sidebar-border pt-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								className: "w-full flex items-center",
								onClick: () => setDemoOpen(true),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlay, { className: "size-4" }), " Website Guide / Demo"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-secondary/40 rounded-lg border border-border p-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate text-sm font-semibold",
										children: user.fullName
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-muted-foreground truncate text-xs",
										children: user.pharmacyName
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-accent mt-1 text-[11px] font-semibold tracking-wide uppercase",
										children: user.role === "owner" ? "👑 Shop Owner (Admin)" : "👨‍⚕️ Shop Keeper (Staff)"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "ghost",
								className: "w-full justify-start",
								onClick: () => logout(),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" }), " Sign out"]
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "min-w-0 flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "mb-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-bold sm:text-3xl",
						children: title
					}), subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground mt-1 text-sm",
						children: subtitle
					})]
				}), children]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoModal, {
				open: demoOpen,
				onOpenChange: setDemoOpen
			})
		]
	});
}
//#endregion
export { AppShell as t };
