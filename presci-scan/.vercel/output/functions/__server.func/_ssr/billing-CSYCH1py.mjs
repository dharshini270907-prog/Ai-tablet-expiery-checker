import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as findSubstituteBatch, c as inr, d as suggestedDiscount, i as daysToExpiry, n as useSmartMed, o as formatDate, r as GST_RATE, u as statusOf } from "./router-DNXHUjnj.mjs";
import { R as Ban, a as Trash2, c as ShoppingCart, d as Search, m as Printer, r as TriangleAlert } from "../_libs/lucide-react.mjs";
import { a as DialogHeader, i as DialogContent, o as DialogTitle, r as Dialog, s as ScanTutorialCard, t as Button } from "./DemoModal-B7pTYoCn.mjs";
import { t as AppShell } from "./AppShell-B6tSKcW8.mjs";
import { i as playWarningAlert, n as playBlockAlert, r as playSuccessBeep, t as CameraScanner } from "./audio-DuQezuKq.mjs";
import { t as StatusBadge } from "./StatusBadge-BLx8RTuN.mjs";
import { t as Input } from "./input-DJ-55TZt.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/billing-CSYCH1py.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function BillingPage() {
	const { inventory, cart, addToCart, updateCartQty, removeFromCart, clearCart, checkout, logAlert, user } = useSmartMed();
	const [query, setQuery] = (0, import_react.useState)("");
	const [block, setBlock] = (0, import_react.useState)(null);
	const [banner, setBanner] = (0, import_react.useState)(null);
	const [invoiceOpen, setInvoiceOpen] = (0, import_react.useState)(false);
	const [lastInvoice, setLastInvoice] = (0, import_react.useState)([]);
	const matches = (0, import_react.useMemo)(() => {
		const term = query.trim().toLowerCase();
		if (!term) return [];
		return inventory.filter((m) => m.name.toLowerCase().includes(term) || m.batchNo.toLowerCase().includes(term) || m.barcode.includes(term)).slice(0, 6);
	}, [inventory, query]);
	const verifyAndAdd = (med) => {
		const status = statusOf(med);
		if (status === "expired") {
			playBlockAlert();
			const substitute = findSubstituteBatch(inventory, med.name, med.id);
			setBlock({
				medicine: med,
				substitute
			});
			setBanner(`🚫 EXPIRED BATCH AT COUNTER — ${med.name} (${med.batchNo}). Remove from shelf now.`);
			logAlert({
				audience: "keeper",
				channel: "Screen",
				severity: "critical",
				medicine: med.name,
				batchNo: med.batchNo,
				message: "Billing blocked: expired medicine scanned at POS. Pull the batch off the shelf."
			});
			logAlert({
				audience: "owner",
				channel: "SMS",
				severity: "critical",
				medicine: med.name,
				batchNo: med.batchNo,
				message: `Blocked expired sale · ${med.quantity} units (${inr(med.quantity * med.price)}) written off risk.`
			});
			return;
		}
		if (med.quantity <= 0) {
			toast.error(`${med.name} · ${med.batchNo} is out of stock.`);
			return;
		}
		const discount = status === "near" ? med.discount ?? suggestedDiscount(daysToExpiry(med.expiryDate)) : 0;
		if (status === "near") {
			playWarningAlert();
			setBanner(`⚠️ Near-expiry: ${med.name} (${med.batchNo}) expires in ${daysToExpiry(med.expiryDate)} days — ${discount}% AI clearance discount applied.`);
			logAlert({
				audience: "owner",
				channel: "Email",
				severity: "warning",
				medicine: med.name,
				batchNo: med.batchNo,
				message: `Near-expiry sale with ${discount}% AI clearance discount — loss mitigated at the counter.`
			});
		} else {
			playSuccessBeep();
			setBanner(null);
		}
		addToCart({
			medicineId: med.id,
			name: med.name,
			batchNo: med.batchNo,
			price: med.price,
			qty: 1,
			discount,
			status
		});
		toast.success(`${med.name} added to cart`);
		setQuery("");
	};
	const handleDecode = (value) => {
		if (!value) {
			toast.error("No barcode detected. Use Manual Search & Bill below.");
			return;
		}
		const med = inventory.find((m) => m.barcode === value);
		if (!med) {
			toast.error(`Barcode ${value} is not in inventory.`);
			return;
		}
		verifyAndAdd(med);
	};
	const totals = (0, import_react.useMemo)(() => {
		const gross = cart.reduce((s, l) => s + l.price * l.qty, 0);
		const discount = cart.reduce((s, l) => s + l.price * l.qty * l.discount / 100, 0);
		const subtotal = gross - discount;
		const gst = subtotal * GST_RATE;
		return {
			gross,
			discount,
			subtotal,
			gst,
			total: subtotal + gst
		};
	}, [cart]);
	const completeSale = () => {
		if (!cart.length) return;
		setLastInvoice(cart);
		checkout();
		setInvoiceOpen(true);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Billing Counter / POS",
		subtitle: "Hybrid entry: scan the barcode or type to bill. Every item passes PAB verification.",
		children: [
			banner && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `mb-4 flex items-start gap-3 rounded-xl border p-4 text-sm ${banner.startsWith("🚫") ? "border-destructive/50 bg-destructive/15 text-destructive" : "border-warn/50 bg-warn/15 text-warn"}`,
				role: "alert",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "mt-0.5 size-4 shrink-0" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium",
						children: banner
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "ml-auto text-xs underline",
						onClick: () => setBanner(null),
						children: "dismiss"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 xl:grid-cols-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4 xl:col-span-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "panel p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mb-4 text-base font-semibold",
								children: "Live optical barcode viewfinder"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CameraScanner, {
								onDecode: handleDecode,
								label: "Capture & Verify"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "panel p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-base font-semibold",
									children: "Manual Search & Bill"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-muted-foreground mt-1 text-xs",
									children: "Type a medicine name or batch number — identical PAB verification runs on every add."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative mt-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										className: "pl-9",
										placeholder: "e.g. Dolo 650 or AZT250-D02",
										value: query,
										onChange: (e) => setQuery(e.target.value),
										maxLength: 60
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
									className: "mt-3 space-y-2",
									children: [matches.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "bg-secondary/40 flex flex-wrap items-center gap-3 rounded-lg border border-border p-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "min-w-0 flex-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "truncate text-sm font-medium",
													children: m.name
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-muted-foreground text-xs",
													children: [
														m.batchNo,
														" · exp ",
														formatDate(m.expiryDate),
														" · ",
														m.quantity,
														" in stock · ",
														inr(m.price)
													]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: statusOf(m) }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												size: "sm",
												onClick: () => verifyAndAdd(m),
												children: "Add to bill"
											})
										]
									}, m.id)), query.trim() && matches.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "text-muted-foreground text-sm",
										children: [
											"No batch matches “",
											query,
											"”."
										]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScanTutorialCard, {})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel h-fit p-5 xl:col-span-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "flex items-center gap-2 text-base font-semibold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "text-accent size-4" }), " Active bill"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-4 space-y-2",
							children: [cart.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "rounded-lg border border-border p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate text-sm font-medium",
											children: l.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-muted-foreground text-xs",
											children: l.batchNo
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										size: "icon",
										"aria-label": `Remove ${l.name}`,
										onClick: () => removeFromCart(l.medicineId),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "text-destructive size-4" })
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "number",
										min: 1,
										className: "h-8 w-20",
										value: l.qty,
										onChange: (e) => updateCartQty(l.medicineId, Number(e.target.value))
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-sm",
										children: [inr(l.price * l.qty * (1 - l.discount / 100)), l.discount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-warn ml-2 text-xs",
											children: [
												"−",
												l.discount,
												"% AI"
											]
										})]
									})]
								})]
							}, l.medicineId)), cart.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "text-muted-foreground py-6 text-center text-sm",
								children: "Cart is empty — scan or search a medicine."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-4 space-y-1.5 border-t border-border pt-4 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-muted-foreground",
										children: "Gross"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: inr(totals.gross) })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-muted-foreground",
										children: "AI clearance discount"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
										className: "text-warn",
										children: ["−", inr(totals.discount)]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-muted-foreground",
										children: "Subtotal"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: inr(totals.subtotal) })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-muted-foreground",
										children: "GST (12%)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: inr(totals.gst) })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between border-t border-border pt-2 text-base font-semibold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Total payable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "text-safe",
										children: inr(totals.total)
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								className: "flex-1",
								disabled: !cart.length,
								onClick: completeSale,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "size-4" }), " Generate invoice"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								disabled: !cart.length,
								onClick: () => clearCart(),
								children: "Clear"
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: !!block,
				onOpenChange: (v) => !v && setBlock(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "border-destructive/60 sm:max-w-lg",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
							className: "text-destructive flex items-center gap-2 text-2xl",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, { className: "size-7" }), " BILLING BLOCKED!"]
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-destructive/15 border-destructive/40 rounded-xl border p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-destructive text-lg font-bold",
								children: "🚫 This medicine is EXPIRED. Sale Cannot Proceed."
							}), block && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-sm",
								children: [
									block.medicine.name,
									" · Batch ",
									block.medicine.batchNo,
									" · expired",
									" ",
									formatDate(block.medicine.expiryDate),
									" (",
									Math.abs(daysToExpiry(block.medicine.expiryDate)),
									" days ago)"
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "panel p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold tracking-wide uppercase text-muted-foreground",
								children: "FEFO auto-substitution"
							}), block?.substitute ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-sm",
								children: [
									"Recommended Alternate Batch: ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: block.substitute.batchNo }),
									" —",
									" ",
									block.substitute.quantity,
									" units available (expires",
									" ",
									formatDate(block.substitute.expiryDate),
									")."
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "mt-3",
								onClick: () => {
									const sub = block.substitute;
									setBlock(null);
									verifyAndAdd(sub);
								},
								children: "Bill alternate batch instead"
							})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: [
									"No valid alternate batch in stock. Reorder ",
									block?.medicine.name,
									" immediately."
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground text-xs",
							children: "Dual alert logged for Shop Owner (financial loss) and Shop Keeper (counter safety)."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => setBlock(null),
							children: "Acknowledge & remove from shelf"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: invoiceOpen,
				onOpenChange: setInvoiceOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "sm:max-w-md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, { children: ["Invoice — ", user?.pharmacyName] }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							id: "smartmed-invoice",
							className: "space-y-2 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-muted-foreground text-xs",
									children: [
										"Billed by ",
										user?.fullName,
										" · ",
										(/* @__PURE__ */ new Date()).toLocaleString("en-IN")
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "divide-y divide-border",
									children: lastInvoice.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex justify-between py-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											l.name,
											" × ",
											l.qty,
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground block text-xs",
												children: l.batchNo
											})
										] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: inr(l.price * l.qty * (1 - l.discount / 100)) })]
									}, l.medicineId))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between border-t border-border pt-2 font-semibold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total paid (incl. 12% GST)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-safe",
										children: inr(lastInvoice.reduce((s, l) => s + l.price * l.qty * (1 - l.discount / 100), 0) * (1 + GST_RATE))
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: () => window.print(),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "size-4" }), " Print invoice"]
						})
					]
				})
			})
		]
	});
}
//#endregion
export { BillingPage as component };
