'use client';

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

export interface AnalyticsPayload {
  [key: string]: string | number | boolean | null | undefined;
}

export function trackEvent(event: string, payload: AnalyticsPayload = {}) {
  if (typeof window === 'undefined') return;

  const cleanPayload = Object.fromEntries(
    Object.entries(payload).filter(([, value]) => value !== undefined),
  );

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event,
    ...cleanPayload,
  });

  if (typeof window.gtag === 'function') {
    window.gtag('event', event, cleanPayload);
  }
}
