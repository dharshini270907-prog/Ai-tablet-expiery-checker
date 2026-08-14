import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const payloadSchema = z.object({
  items: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        batchNo: z.string(),
        quantity: z.number(),
        price: z.number(),
        avgMonthlySales: z.number(),
        expiryDate: z.string(),
      }),
    )
    .max(500),
});

/**
 * AI Expiry Prediction Engine (server-side).
 *   Predicted Unsold Qty = Stock - ((Avg Monthly Sales / 30) * Days to Expiry)
 *   Potential Loss (INR) = Predicted Unsold Qty * Price per Unit
 */
export const predictExpiryRisk = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => payloadSchema.parse(data))
  .handler(async ({ data }) => {
    const now = Date.now();
    const predictions = data.items.map((m) => {
      const daysToExpiry = Math.floor((new Date(m.expiryDate).getTime() - now) / 86_400_000);
      const projectedSales = (m.avgMonthlySales / 30) * Math.max(daysToExpiry, 0);
      const predictedUnsoldQty = Math.max(0, Math.round(m.quantity - projectedSales));
      const potentialLoss = Math.round(predictedUnsoldQty * m.price * 100) / 100;
      const suggestedDiscount =
        daysToExpiry < 0 ? 0 : daysToExpiry <= 15 ? 50 : daysToExpiry <= 30 ? 30 : 0;
      const action =
        daysToExpiry < 0
          ? "Block sale · initiate return/disposal"
          : daysToExpiry <= 15
            ? "Clearance Sale — apply 50% AI discount"
            : daysToExpiry <= 30
              ? "Apply 30% AI discount & push FEFO"
              : predictedUnsoldQty > 0
                ? "Monitor — slow mover, reduce reorder qty"
                : "Healthy — no action needed";
      return {
        id: m.id,
        name: m.name,
        batchNo: m.batchNo,
        daysToExpiry,
        predictedUnsoldQty,
        potentialLoss,
        suggestedDiscount,
        action,
      };
    });

    predictions.sort((a, b) => b.potentialLoss - a.potentialLoss);
    const totalExposure = Math.round(predictions.reduce((s, p) => s + p.potentialLoss, 0) * 100) / 100;
    return { predictions, totalExposure, generatedAt: new Date().toISOString() };
  });