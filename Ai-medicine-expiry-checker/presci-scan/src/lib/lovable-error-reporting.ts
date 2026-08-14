/**
 * Generic client-side error reporter.
 * Logs boundary-caught React errors to console for debugging.
 * No external telemetry dependency.
 */
export function reportError(error: unknown, context: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;

  const message =
    error instanceof Response
      ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}`
      : error instanceof Error
        ? error.message
        : String(error);
  const stack = error instanceof Error ? error.stack : undefined;

  console.error("[SmartMed Error]", {
    message,
    route: window.location.pathname,
    ...context,
    ...(stack && { stack }),
  });
}
