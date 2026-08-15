import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { N as Camera, P as CameraOff, p as ScanBarcode } from "../_libs/lucide-react.mjs";
import { t as Button } from "./DemoModal-B7pTYoCn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/audio-DuQezuKq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* WebRTC viewfinder with an explicit "Capture & Scan" trigger.
* Decoding uses the platform BarcodeDetector when available.
*/
function CameraScanner({ onDecode, label = "Capture & Scan" }) {
	const videoRef = (0, import_react.useRef)(null);
	const streamRef = (0, import_react.useRef)(null);
	const [active, setActive] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const stop = (0, import_react.useCallback)(() => {
		streamRef.current?.getTracks().forEach((t) => t.stop());
		streamRef.current = null;
		setActive(false);
	}, []);
	(0, import_react.useEffect)(() => () => stop(), [stop]);
	const start = async () => {
		setError(null);
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
			streamRef.current = stream;
			if (videoRef.current) {
				videoRef.current.srcObject = stream;
				await videoRef.current.play();
			}
			setActive(true);
		} catch {
			setError("Camera unavailable or permission denied. Use the manual fallback below.");
		}
	};
	const capture = async () => {
		const video = videoRef.current;
		if (!video) return;
		setBusy(true);
		try {
			const canvas = document.createElement("canvas");
			canvas.width = video.videoWidth || 640;
			canvas.height = video.videoHeight || 480;
			canvas.getContext("2d")?.drawImage(video, 0, 0, canvas.width, canvas.height);
			const Ctor = window.BarcodeDetector;
			if (Ctor) onDecode((await new Ctor().detect(canvas))[0]?.rawValue ?? null);
			else onDecode(null);
		} catch {
			onDecode(null);
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative aspect-video overflow-hidden rounded-xl border border-border bg-black/60",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
						ref: videoRef,
						muted: true,
						playsInline: true,
						className: "h-full w-full object-cover"
					}),
					!active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0 grid place-items-center text-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScanBarcode, { className: "text-accent mx-auto size-8" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground mt-2 text-xs",
							children: "Camera off — start the viewfinder"
						})] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-x-[12%] inset-y-[28%] rounded-lg border-2 border-accent/80" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: active ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => void capture(),
					disabled: busy,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScanBarcode, { className: "size-4" }),
						" ",
						busy ? "Scanning…" : label
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					onClick: stop,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CameraOff, { className: "size-4" }), " Stop camera"]
				})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => void start(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "size-4" }), " Start camera"]
				})
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-destructive text-xs",
				children: error
			})
		]
	});
}
var ctx = null;
function getCtx() {
	if (typeof window === "undefined") return null;
	const AC = window.AudioContext ?? window.webkitAudioContext;
	if (!AC) return null;
	ctx ??= new AC();
	return ctx;
}
function tone(freq, duration, gain, delay = 0) {
	const ac = getCtx();
	if (!ac) return;
	const osc = ac.createOscillator();
	const g = ac.createGain();
	osc.type = "square";
	osc.frequency.value = freq;
	osc.connect(g).connect(ac.destination);
	const start = ac.currentTime + delay;
	g.gain.setValueAtTime(gain, start);
	g.gain.exponentialRampToValueAtTime(1e-4, start + duration);
	osc.start(start);
	osc.stop(start + duration);
}
/** Loud 880Hz block alert (triple burst). */
var playBlockAlert = () => {
	tone(880, .28, .28);
	tone(880, .28, .28, .34);
	tone(880, .4, .28, .68);
};
/** Soft near-expiry warning. */
var playWarningAlert = () => tone(520, .18, .09);
/** Successful scan beep. */
var playSuccessBeep = () => tone(1180, .09, .06);
//#endregion
export { playWarningAlert as i, playBlockAlert as n, playSuccessBeep as r, CameraScanner as t };
