import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { c as inr, i as daysToExpiry, n as useSmartMed, o as formatDate, u as statusOf } from "./router-DNXHUjnj.mjs";
import { I as Boxes, O as CircleX, T as IndianRupee, r as TriangleAlert } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-B6tSKcW8.mjs";
import { t as StatusBadge } from "./StatusBadge-BLx8RTuN.mjs";
import { a as Tooltip, i as ResponsiveContainer, n as Pie, o as Legend, r as Cell, t as PieChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-DSjznO4D.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DashboardPage() {
	const { inventory } = useSmartMed();
	const stats = (0, import_react.useMemo)(() => {
		const counts = {
			safe: 0,
			near: 0,
			expired: 0
		};
		let value = 0;
		for (const m of inventory) {
			counts[statusOf(m)] += 1;
			value += m.quantity * m.price;
		}
		const urgency = inventory.filter((m) => statusOf(m) !== "safe" && m.quantity > 0).sort((a, b) => daysToExpiry(a.expiryDate) - daysToExpiry(b.expiryDate)).slice(0, 5);
		return {
			counts,
			value,
			urgency
		};
	}, [inventory]);
	const chartData = [
		{
			name: "Safe",
			value: stats.counts.safe,
			color: "var(--safe)"
		},
		{
			name: "Near-Expiry",
			value: stats.counts.near,
			color: "var(--warn)"
		},
		{
			name: "Expired",
			value: stats.counts.expired,
			color: "var(--destructive)"
		}
	];
	const cards = [
		{
			label: "Total SKUs",
			value: String(inventory.length),
			icon: Boxes,
			tone: "text-accent"
		},
		{
			label: "Inventory Value",
			value: inr(stats.value),
			icon: IndianRupee,
			tone: "text-safe"
		},
		{
			label: "Near-Expiry",
			value: String(stats.counts.near),
			icon: TriangleAlert,
			tone: "text-warn"
		},
		{
			label: "Expired",
			value: String(stats.counts.expired),
			icon: CircleX,
			tone: "text-destructive"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		ownerOnly: true,
		title: "Dashboard",
		subtitle: "PAB health snapshot across every batch in your pharmacy.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
				children: cards.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground text-xs font-semibold tracking-wide uppercase",
							children: c.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(c.icon, { className: `size-4 ${c.tone}` })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: `font-display mt-3 text-2xl font-bold ${c.tone}`,
						children: c.value
					})]
				}, c.label))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel p-5 lg:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-base font-semibold",
						children: "Stock breakdown"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-64",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
									data: chartData,
									dataKey: "value",
									innerRadius: 55,
									outerRadius: 85,
									paddingAngle: 3,
									children: chartData.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
										fill: d.color,
										stroke: "transparent"
									}, d.name))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
									background: "var(--card)",
									border: "1px solid var(--border)",
									borderRadius: 12,
									color: "var(--foreground)"
								} }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {})
							] })
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel overflow-hidden lg:col-span-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-5 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-base font-semibold",
							children: "High-risk FEFO urgency queue"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground text-xs",
							children: "Clear these batches first — first expiry, first out."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
								className: "bg-secondary/40 text-muted-foreground text-xs uppercase",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-5 py-2 text-left",
										children: "Medicine"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-5 py-2 text-left",
										children: "Batch"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-5 py-2 text-left",
										children: "Expiry"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-5 py-2 text-right",
										children: "Qty"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-5 py-2 text-right",
										children: "Value"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-5 py-2 text-left",
										children: "Status"
									})
								] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [stats.urgency.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-t border-border",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-5 py-3 font-medium",
										children: m.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "text-muted-foreground px-5 py-3",
										children: m.batchNo
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "px-5 py-3",
										children: [formatDate(m.expiryDate), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground block text-xs",
											children: daysToExpiry(m.expiryDate) < 0 ? `${Math.abs(daysToExpiry(m.expiryDate))} days ago` : `in ${daysToExpiry(m.expiryDate)} days`
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-5 py-3 text-right",
										children: m.quantity
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-5 py-3 text-right",
										children: inr(m.quantity * m.price)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-5 py-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: statusOf(m) })
									})
								]
							}, m.id)), stats.urgency.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								colSpan: 6,
								className: "text-muted-foreground px-5 py-8 text-center",
								children: "No at-risk batches. Every SKU is safe."
							}) })] })]
						})
					})]
				})]
			})]
		})
	});
}
//#endregion
export { DashboardPage as component };
