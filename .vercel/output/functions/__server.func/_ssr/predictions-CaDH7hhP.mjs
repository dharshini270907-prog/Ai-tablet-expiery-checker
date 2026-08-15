import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { O as isRedirect, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { c as inr, n as useSmartMed } from "./router-DNXHUjnj.mjs";
import { F as BrainCircuit, i as TrendingDown, o as Sparkles } from "../_libs/lucide-react.mjs";
import { t as Button } from "./DemoModal-B7pTYoCn.mjs";
import { t as AppShell } from "./AppShell-B6tSKcW8.mjs";
import { i as getServerFnById, r as createServerFn, t as TSS_SERVER_FUNCTION } from "./server-ZT3gVTyp2.mjs";
import { i as stringType, n as numberType, r as objectType, t as arrayType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/predictions-CaDH7hhP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useServerFn(serverFn) {
	const router = useRouter();
	return import_react.useCallback(async (...args) => {
		try {
			const res = await serverFn(...args);
			if (isRedirect(res)) throw res;
			return res;
		} catch (err) {
			if (isRedirect(err)) {
				err.options._fromLocation = router.stores.location.get();
				return router.navigate(router.resolveRedirect(err).options);
			}
			throw err;
		}
	}, [router, serverFn]);
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var payloadSchema = objectType({ items: arrayType(objectType({
	id: stringType(),
	name: stringType(),
	batchNo: stringType(),
	quantity: numberType(),
	price: numberType(),
	avgMonthlySales: numberType(),
	expiryDate: stringType()
})).max(500) });
/**
* AI Expiry Prediction Engine (server-side).
*   Predicted Unsold Qty = Stock - ((Avg Monthly Sales / 30) * Days to Expiry)
*   Potential Loss (INR) = Predicted Unsold Qty * Price per Unit
*/
var predictExpiryRisk = createServerFn({ method: "POST" }).inputValidator((data) => payloadSchema.parse(data)).handler(createSsrRpc("f72b330b38ac789618e9f4713b98dbf37cbee40ae98763ad4bf5fc4980654083"));
function PredictionsPage() {
	const { inventory, applyDiscountStrategy, logAlert } = useSmartMed();
	const predict = useServerFn(predictExpiryRisk);
	const mutation = useMutation({ mutationFn: () => predict({ data: { items: inventory.map((m) => ({
		id: m.id,
		name: m.name,
		batchNo: m.batchNo,
		quantity: m.quantity,
		price: m.price,
		avgMonthlySales: m.avgMonthlySales,
		expiryDate: m.expiryDate
	})) } }) });
	(0, import_react.useEffect)(() => {
		if (inventory.length) mutation.mutate();
	}, [inventory.length]);
	const rows = mutation.data?.predictions ?? [];
	const atRisk = rows.filter((r) => r.suggestedDiscount > 0 || r.daysToExpiry < 0);
	const applyStrategy = () => {
		const count = applyDiscountStrategy();
		if (!count) {
			toast.info("No new discounts needed — every near-expiry batch is already marked down.");
			return;
		}
		logAlert({
			audience: "owner",
			channel: "Email",
			severity: "info",
			medicine: `${count} batches`,
			batchNo: "—",
			message: `AI discount strategy applied to ${count} near-expiry batches (30% / 50% clearance).`
		});
		toast.success(`AI discount strategy applied to ${count} batches.`);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		ownerOnly: true,
		title: "AI Expiry Prediction Engine",
		subtitle: "Predicted Unsold Qty = Stock − (Avg Monthly Sales ÷ 30 × Days to Expiry)",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 sm:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground text-xs font-semibold uppercase",
						children: "Total loss exposure"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-destructive font-display mt-2 flex items-center gap-2 text-2xl font-bold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingDown, { className: "size-5" }), mutation.data ? inr(mutation.data.totalExposure) : "—"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground text-xs font-semibold uppercase",
						children: "Batches needing action"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-warn font-display mt-2 text-2xl font-bold",
						children: atRisk.length
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel flex flex-col justify-between gap-3 p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground text-xs font-semibold uppercase",
						children: "Dynamic action engine"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: applyStrategy,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4" }), " Apply AI Discount Strategy"]
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "panel mt-6 overflow-x-auto",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3 p-5 pb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "flex items-center gap-2 text-base font-semibold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrainCircuit, { className: "text-accent size-4" }), " Batch-level forecast"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					size: "sm",
					onClick: () => mutation.mutate(),
					disabled: mutation.isPending,
					children: mutation.isPending ? "Recomputing…" : "Recompute forecast"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full min-w-[820px] text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "bg-secondary/40 text-muted-foreground text-xs uppercase",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 text-left",
							children: "Medicine"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 text-left",
							children: "Batch"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 text-right",
							children: "Days to expiry"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 text-right",
							children: "Predicted unsold"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 text-right",
							children: "Potential loss"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 text-left",
							children: "AI recommended action"
						})
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-t border-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 font-medium",
							children: r.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "text-muted-foreground px-4 py-3",
							children: r.batchNo
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 text-right",
							children: r.daysToExpiry
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 text-right",
							children: r.predictedUnsoldQty
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: `px-4 py-3 text-right font-semibold ${r.potentialLoss > 0 ? "text-destructive" : "text-safe"}`,
							children: inr(r.potentialLoss)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "px-4 py-3",
							children: [r.suggestedDiscount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "bg-warn/15 text-warn mr-2 rounded-full px-2 py-0.5 text-xs font-semibold",
								children: [r.suggestedDiscount, "% off"]
							}), r.action]
						})
					]
				}, r.id)), !rows.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					colSpan: 6,
					className: "text-muted-foreground px-4 py-10 text-center",
					children: mutation.isPending ? "Running AI forecast…" : "No forecast yet."
				}) })] })]
			})]
		})]
	});
}
//#endregion
export { PredictionsPage as component };
