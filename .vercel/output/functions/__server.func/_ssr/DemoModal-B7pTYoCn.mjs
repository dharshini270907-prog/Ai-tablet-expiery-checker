import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime, r as Slot } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { C as Layers, N as Camera, k as CirclePlay, o as Sparkles, t as X, u as ShieldAlert, w as Keyboard, x as Lightbulb } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { a as DialogOverlay$1, i as DialogDescription$1, n as DialogClose, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/DemoModal-B7pTYoCn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "h-9 w-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 pointer-events-none data-[state=open]:pointer-events-auto", className),
	...props
}));
DialogOverlay.displayName = DialogOverlay$1.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = DialogContent$1.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
});
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
DialogFooter.displayName = "DialogFooter";
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DialogTitle.displayName = DialogTitle$1.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = DialogDescription$1.displayName;
var chapters = [
	{
		icon: Layers,
		title: "Chapter 1 — Navigating SmartMed AI",
		body: "The left rail is your control tower: Dashboard for health metrics, Inventory for every batch, Stock Entry to receive goods, Billing Counter for the POS, AI Predictions for loss forecasting, and Alerts for the audit trail. Owners see everything; shop keepers get a safety-first counter view.",
		bullets: ["Metric cards colour-code risk: emerald = safe, amber = near-expiry, crimson = expired.", "Every table supports live search, category and status filters."]
	},
	{
		icon: Sparkles,
		title: "Chapter 2 — How the PAB Framework works",
		body: "PAB is the engine behind SmartMed: Predict unsold stock and rupee loss before it happens, Act with AI clearance discounts and FEFO rotation, Block any expired sale at the counter — automatically.",
		bullets: [
			"Predict: Unsold Qty = Stock − (Avg Monthly Sales ÷ 30 × Days to Expiry).",
			"Act: 30 days → 30% off, 15 days → 50% clearance, applied in one click.",
			"Block: expired batches can never reach an invoice."
		]
	},
	{
		icon: Camera,
		title: "Chapter 3 — Barcode scanning vs manual type-to-bill",
		body: "Open Billing Counter and hold the strip barcode inside the teal viewfinder, then press Capture & Verify. If the pack is crumpled or the camera is unavailable, switch to Manual Search & Bill and type the medicine name or batch number instead.",
		bullets: ["Scanner path: fastest for clean, flat barcodes.", "Manual path: always available fallback — same PAB verification runs either way."]
	},
	{
		icon: ShieldAlert,
		title: "Chapter 4 — Automatic dual alerts",
		body: "The moment stock enters the 30-day window or an expired sale is blocked, SmartMed fires two alerts at once: a financial-loss SMS/email log for the shop owner, and a red on-screen banner with an 880Hz audio siren for the shop keeper at the counter.",
		bullets: [
			"Owner focus: rupee exposure and clearance strategy.",
			"Keeper focus: pull the batch off the shelf immediately.",
			"Every alert is timestamped in the Alert Logs audit trail."
		]
	}
];
function DemoModal({ open, onOpenChange }) {
	const [step, setStep] = (0, import_react.useState)(0);
	const chapter = chapters[step] ?? chapters[0];
	const Icon = chapter.icon;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-h-[85vh] w-full max-w-xl overflow-hidden p-6 sm:max-w-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
					className: "pb-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
						className: "font-display flex items-center gap-2 text-xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlay, { className: "text-accent size-5 shrink-0" }), " SmartMed AI — Platform Tour"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "A guided 4-chapter walkthrough of the Predict · Act · Block workflow." })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-4 overflow-y-auto pr-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hero-gradient relative flex h-36 w-full shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border sm:h-40",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.35),transparent_60%)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative z-10 px-6 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "text-accent mx-auto size-8 sm:size-10" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display mt-2 text-base font-semibold sm:text-lg",
									children: chapter.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-muted-foreground mt-1 text-[10px] tracking-widest uppercase sm:text-xs",
									children: [
										"Interactive demo · chapter ",
										step + 1,
										" of ",
										chapters.length
									]
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-h-[140px] space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-relaxed text-muted-foreground",
							children: chapter.body
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-2 text-sm",
							children: chapter.bullets.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-start gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightbulb, { className: "text-warn mt-0.5 size-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "leading-tight",
									children: b
								})]
							}, b))
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-3 border-t border-border/50 pt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-1.5",
						children: chapters.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							"aria-label": `Go to chapter ${i + 1}`,
							onClick: () => setStep(i),
							className: `h-2 rounded-full transition-all ${i === step ? "bg-accent w-6" : "bg-muted hover:bg-muted-foreground/30 w-2"}`
						}, c.title))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "sm",
							disabled: step === 0,
							onClick: () => setStep((s) => s - 1),
							children: "Back"
						}), step < chapters.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							onClick: () => setStep((s) => s + 1),
							children: "Next chapter"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							onClick: () => onOpenChange(false),
							children: "Start using SmartMed"
						})]
					})]
				})
			]
		})
	});
}
function ScanTutorialCard() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "panel p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
			className: "font-display flex items-center gap-2 text-base font-semibold",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "text-accent size-4 shrink-0" }), " Scanning tutorial — get it right first time"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 grid gap-4 sm:grid-cols-3",
			children: [
				{
					icon: Camera,
					title: "Camera alignment",
					text: "Hold the strip 15–20cm away, barcode flat and centred inside the teal frame, parallel to the lens."
				},
				{
					icon: Lightbulb,
					title: "Lighting",
					text: "Use even overhead light. Avoid direct glare on foil — tilt the strip slightly if you see a white hotspot."
				},
				{
					icon: Keyboard,
					title: "Manual fallback",
					text: "Crumpled or faded barcode? Type the batch number or medicine name — verification is identical."
				}
			].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-secondary/40 flex flex-col justify-start rounded-lg border border-border p-4 transition-colors hover:bg-secondary/60",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(t.icon, { className: "text-accent size-4 shrink-0" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm font-semibold",
						children: t.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground mt-1 text-xs leading-relaxed",
						children: t.text
					})
				]
			}, t.title))
		})]
	});
}
//#endregion
export { DialogHeader as a, cn as c, DialogContent as i, DemoModal as n, DialogTitle as o, Dialog as r, ScanTutorialCard as s, Button as t };
