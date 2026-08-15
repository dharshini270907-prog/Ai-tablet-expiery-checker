import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useSmartMed, s as formatStamp } from "./router-DNXHUjnj.mjs";
import { L as Bell, _ as MessageSquare, g as MonitorSmartphone, y as Mail } from "../_libs/lucide-react.mjs";
import { t as Button } from "./DemoModal-B7pTYoCn.mjs";
import { t as AppShell } from "./AppShell-B6tSKcW8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/alerts-ChxGGVHx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var channelIcon = {
	SMS: MessageSquare,
	Email: Mail,
	Screen: MonitorSmartphone
};
var severityStyle = {
	critical: "border-destructive/40 bg-destructive/10 text-destructive",
	warning: "border-warn/40 bg-warn/10 text-warn",
	info: "border-border bg-secondary/40 text-accent"
};
function AlertsPage() {
	const { alerts, user } = useSmartMed();
	const [scope, setScope] = (0, import_react.useState)("mine");
	const rows = (0, import_react.useMemo)(() => {
		if (scope === "all" && user?.role === "owner") return alerts;
		const audience = user?.role === "owner" ? "owner" : "keeper";
		return alerts.filter((a) => a.audience === audience);
	}, [
		alerts,
		scope,
		user
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Alerts & Notifications",
		subtitle: user?.role === "owner" ? "Financial-loss mitigation alerts delivered by SMS and email." : "Counter safety alerts — clear flagged batches from the shelf immediately.",
		children: [user?.role === "owner" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: scope === "mine" ? "default" : "outline",
				size: "sm",
				onClick: () => setScope("mine"),
				children: "Owner alerts"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: scope === "all" ? "default" : "outline",
				size: "sm",
				onClick: () => setScope("all"),
				children: "All roles"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
			className: "space-y-3",
			children: [rows.map((a) => {
				const Icon = channelIcon[a.channel];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: `rounded-xl border p-4 ${severityStyle[a.severity]}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2 text-xs font-semibold uppercase",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: a.channel }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "opacity-60",
									children: "·"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: a.audience === "owner" ? "👑 Shop Owner" : "👨‍⚕️ Shop Keeper" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-auto normal-case opacity-70",
									children: formatStamp(a.createdAt)
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-foreground mt-2 text-sm font-semibold",
							children: [
								a.medicine,
								" · ",
								a.batchNo
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-foreground/80 mt-1 text-sm",
							children: a.message
						})
					]
				}, a.id);
			}), !rows.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "panel text-muted-foreground flex items-center gap-2 p-8 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-4" }), " No alerts yet — your shelves are clean."]
			})]
		})]
	});
}
//#endregion
export { AlertsPage as component };
