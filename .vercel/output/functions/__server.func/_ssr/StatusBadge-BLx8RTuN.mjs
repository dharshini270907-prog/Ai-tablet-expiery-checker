import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { l as statusLabel } from "./router-DNXHUjnj.mjs";
import { c as cn } from "./DemoModal-B7pTYoCn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/StatusBadge-BLx8RTuN.js
var import_jsx_runtime = require_jsx_runtime();
var styles = {
	safe: "bg-safe/15 text-safe border-safe/40",
	near: "bg-warn/15 text-warn border-warn/40",
	expired: "bg-destructive/15 text-destructive border-destructive/40"
};
function StatusBadge({ status, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap", styles[status], className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-current" }), statusLabel[status]]
	});
}
//#endregion
export { StatusBadge as t };
