import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as useSmartMed } from "./router-DNXHUjnj.mjs";
import { F as BrainCircuit, k as CirclePlay, l as ShieldCheck, o as Sparkles, s as Siren } from "../_libs/lucide-react.mjs";
import { n as DemoModal, t as Button } from "./DemoModal-B7pTYoCn.mjs";
import { t as Input } from "./input-DJ-55TZt.mjs";
import { a as TabsTrigger, i as TabsList, n as Tabs, r as TabsContent, t as Label } from "./tabs-Cq2pPm0t.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BUk6DKOh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AuthPage() {
	const { user, ready, login, register, onboarded, markOnboarded } = useSmartMed();
	const navigate = useNavigate();
	const [demoOpen, setDemoOpen] = (0, import_react.useState)(false);
	const [role, setRole] = (0, import_react.useState)("owner");
	(0, import_react.useEffect)(() => {
		if (ready && user) navigate({ to: user.role === "owner" ? "/dashboard" : "/billing" });
	}, [
		ready,
		user,
		navigate
	]);
	(0, import_react.useEffect)(() => {
		if (ready && !onboarded) {
			setDemoOpen(true);
			markOnboarded();
		}
	}, [
		ready,
		onboarded,
		markOnboarded
	]);
	const handleLogin = (e) => {
		e.preventDefault();
		const f = new FormData(e.currentTarget);
		const res = login(String(f.get("email") ?? ""), String(f.get("password") ?? ""));
		if (!res.ok) toast.error(res.error ?? "Login failed");
		else toast.success("Welcome back to SmartMed AI");
	};
	const handleRegister = (e) => {
		e.preventDefault();
		const f = new FormData(e.currentTarget);
		const res = register({
			fullName: String(f.get("fullName") ?? "").trim(),
			email: String(f.get("email") ?? "").trim(),
			password: String(f.get("password") ?? ""),
			mobile: String(f.get("mobile") ?? "").trim(),
			pharmacyName: String(f.get("pharmacyName") ?? "").trim(),
			role
		});
		if (!res.ok) toast.error(res.error ?? "Registration failed");
		else toast.success("Account created — welcome to SmartMed AI");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen lg:grid lg:grid-cols-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "hero-gradient relative flex flex-col justify-between overflow-hidden px-6 py-10 sm:px-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(6,182,212,0.25),transparent_55%)]" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative z-10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "bg-primary/25 text-accent grid size-10 place-items-center rounded-xl",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-lg font-bold",
									children: "SmartMed AI"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-muted-foreground text-xs",
									children: "Predict · Act · Block"
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-10 max-w-xl text-3xl leading-tight font-bold sm:text-4xl",
								children: "AI-powered expiry prevention & sustainable pharmacy management"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground mt-4 max-w-lg text-sm leading-relaxed",
								children: "SmartMed forecasts unsold stock in rupees before it expires, auto-applies clearance discounts, and hard-blocks expired medicines at the billing counter — protecting patients and your margin at the same time."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-8 grid gap-3 sm:grid-cols-3",
								children: [
									{
										icon: BrainCircuit,
										label: "Predict",
										text: "Loss forecast per batch"
									},
									{
										icon: Sparkles,
										label: "Act",
										text: "30% / 50% AI clearance"
									},
									{
										icon: Siren,
										label: "Block",
										text: "Expired sale blocked"
									}
								].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "panel p-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(c.icon, { className: "text-accent size-4" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-display mt-2 text-sm font-semibold",
											children: c.label
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-muted-foreground text-xs",
											children: c.text
										})
									]
								}, c.label))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								className: "mt-8",
								onClick: () => setDemoOpen(true),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlay, { className: "size-4" }), " Website Guide / Demo"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground relative z-10 mt-10 text-xs",
						children: "Demo logins — Owner: owner@smartmed.in / owner123 · Staff: staff@smartmed.in / staff123"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "flex items-center justify-center px-6 py-10 sm:px-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "panel w-full max-w-md p-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
						defaultValue: "login",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
								className: "w-full",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "login",
									className: "flex-1",
									children: "Login"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "register",
									className: "flex-1",
									children: "Register"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
								value: "login",
								className: "mt-6",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
									className: "space-y-4",
									onSubmit: handleLogin,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "login-email",
												children: "Email"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "login-email",
												name: "email",
												type: "email",
												required: true,
												defaultValue: "owner@smartmed.in"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "login-password",
												children: "Password"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "login-password",
												name: "password",
												type: "password",
												required: true,
												defaultValue: "owner123"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											type: "submit",
											className: "w-full",
											children: "Sign in"
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
								value: "register",
								className: "mt-6",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
									className: "space-y-4",
									onSubmit: handleRegister,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "fullName",
												children: "Full name"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "fullName",
												name: "fullName",
												required: true,
												maxLength: 80
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid gap-4 sm:grid-cols-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "reg-email",
													children: "Email"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													id: "reg-email",
													name: "email",
													type: "email",
													required: true,
													maxLength: 120
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "mobile",
													children: "Mobile (SMS alerts)"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													id: "mobile",
													name: "mobile",
													required: true,
													maxLength: 20,
													placeholder: "+91 …"
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "pharmacyName",
												children: "Pharmacy name"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "pharmacyName",
												name: "pharmacyName",
												required: true,
												maxLength: 80
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "reg-password",
												children: "Password"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "reg-password",
												name: "password",
												type: "password",
												required: true,
												minLength: 6
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Role" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "grid grid-cols-2 gap-2",
												children: [["owner", "👑 Shop Owner"], ["keeper", "👨‍⚕️ Shop Keeper"]].map(([value, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => setRole(value),
													className: `rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${role === value ? "border-primary bg-primary/20 text-accent" : "border-border text-muted-foreground hover:text-foreground"}`,
													children: label
												}, value))
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											type: "submit",
											className: "w-full",
											children: "Create account"
										})
									]
								})
							})
						]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoModal, {
				open: demoOpen,
				onOpenChange: setDemoOpen
			})
		]
	});
}
//#endregion
export { AuthPage as component };
