import { useEffect } from "react";
import { useLocation } from "@tanstack/react-router";

type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  parqueAnalyticsPage?: string;
};

export function GoogleAnalytics({ measurementId }: { measurementId: string | null }) {
  const location = useLocation();

  useEffect(() => {
    if (!measurementId) return;
    const analyticsWindow = window as AnalyticsWindow;
    const page = `${location.pathname}${location.searchStr}`;
    if (analyticsWindow.parqueAnalyticsPage === page || !analyticsWindow.gtag) return;
    analyticsWindow.parqueAnalyticsPage = page;
    analyticsWindow.gtag("event", "page_view", {
      send_to: measurementId,
      page_path: page,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [measurementId, location.pathname, location.searchStr]);

  return null;
}