import { createServerFn } from "@tanstack/react-start";

// A measurement ID is public browser configuration, never an API credential.
export const getAnalyticsConfig = createServerFn({ method: "GET" }).handler(() => {
  const value = process.env["GOOGLE_ANALYTICS_MEASUREMENT_ID"]?.trim();
  return { measurementId: value && /^G-[A-Z0-9]+$/i.test(value) ? value : null };
});