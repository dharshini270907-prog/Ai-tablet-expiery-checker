import { r as createServerFn, t as TSS_SERVER_FUNCTION } from "./server-ZT3gVTyp2.mjs";
import { i as stringType, n as numberType, r as objectType, t as arrayType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/predict.functions-sYu_BrUz.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
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
var predictExpiryRisk_createServerFn_handler = createServerRpc({
	id: "f72b330b38ac789618e9f4713b98dbf37cbee40ae98763ad4bf5fc4980654083",
	name: "predictExpiryRisk",
	filename: "src/lib/predict.functions.ts"
}, (opts) => predictExpiryRisk.__executeServer(opts));
var predictExpiryRisk = createServerFn({ method: "POST" }).inputValidator((data) => payloadSchema.parse(data)).handler(predictExpiryRisk_createServerFn_handler, async ({ data }) => {
	const now = Date.now();
	const predictions = data.items.map((m) => {
		const daysToExpiry = Math.floor((new Date(m.expiryDate).getTime() - now) / 864e5);
		const projectedSales = m.avgMonthlySales / 30 * Math.max(daysToExpiry, 0);
		const predictedUnsoldQty = Math.max(0, Math.round(m.quantity - projectedSales));
		const potentialLoss = Math.round(predictedUnsoldQty * m.price * 100) / 100;
		const suggestedDiscount = daysToExpiry < 0 ? 0 : daysToExpiry <= 15 ? 50 : daysToExpiry <= 30 ? 30 : 0;
		const action = daysToExpiry < 0 ? "Block sale · initiate return/disposal" : daysToExpiry <= 15 ? "Clearance Sale — apply 50% AI discount" : daysToExpiry <= 30 ? "Apply 30% AI discount & push FEFO" : predictedUnsoldQty > 0 ? "Monitor — slow mover, reduce reorder qty" : "Healthy — no action needed";
		return {
			id: m.id,
			name: m.name,
			batchNo: m.batchNo,
			daysToExpiry,
			predictedUnsoldQty,
			potentialLoss,
			suggestedDiscount,
			action
		};
	});
	predictions.sort((a, b) => b.potentialLoss - a.potentialLoss);
	return {
		predictions,
		totalExposure: Math.round(predictions.reduce((s, p) => s + p.potentialLoss, 0) * 100) / 100,
		generatedAt: (/* @__PURE__ */ new Date()).toISOString()
	};
});
//#endregion
export { predictExpiryRisk_createServerFn_handler };
