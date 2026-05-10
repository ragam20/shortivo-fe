import { env } from "@/config/env";

const isDebugMode = env.MODE_ENV === "development";

type AnalyticsEventParamValue = string | number | boolean | null | undefined;

export type AnalyticsEventParams = Record<
  string,
  AnalyticsEventParamValue | readonly AnalyticsEventParamValue[]
>;

type GtagCommand =
  | ["js", Date]
  | ["config", string, AnalyticsEventParams?]
  | ["event", string, AnalyticsEventParams?];

type Gtag = (...args: GtagCommand) => void;

declare global {
  interface Window {
    dataLayer?: GtagCommand[];
    gtag?: Gtag;
  }
}

const canUseDOM = () =>
  typeof window !== "undefined" && typeof document !== "undefined";

const getMeasurementId = () => env.GOOGLE_ANALYTICS.trim();

const ensureGtag = () => {
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function (...args: GtagCommand) {
      window.dataLayer?.push(args);
    };

  return window.gtag;
};

const removeUndefinedParams = (params?: AnalyticsEventParams) => {
  if (!params) {
    return undefined;
  }

  return Object.entries(params).reduce<AnalyticsEventParams>(
    (acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = value;
      }

      return acc;
    },
    {},
  );
};

export const initGA = () => {
  if (!canUseDOM()) {
    return;
  }

  const measurementId = getMeasurementId();

  if (!measurementId) {
    return;
  }

  if (document.getElementById("google-analytics")) {
    return;
  }

  const script = document.createElement("script");

  script.id = "google-analytics";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;

  const gtag = ensureGtag();

  script.onload = () => {
    gtag("js", new Date());
    gtag("config", measurementId, {
      send_page_view: false,
      debug_mode: isDebugMode,
    });
  };

  document.head.appendChild(script);
};

export const trackPageView = (params?: AnalyticsEventParams) => {
  if (!canUseDOM()) {
    return;
  }

  const measurementId = getMeasurementId();

  if (!measurementId) {
    return;
  }

  const gtag = ensureGtag();
  const pageParams = removeUndefinedParams({
    page_title: document.title,
    page_location: window.location.href,
    page_path: `${window.location.pathname}${window.location.search}${window.location.hash}`,
    debug_mode: isDebugMode,
    ...params,
  });

  gtag("config", measurementId, pageParams);
};

export const trackEvent = (
  eventName: string,
  params?: AnalyticsEventParams,
) => {
  if (!canUseDOM()) {
    return;
  }

  const measurementId = getMeasurementId();
  const normalizedEventName = eventName.trim();

  if (!measurementId || !normalizedEventName) {
    return;
  }

  const gtag = ensureGtag();

  gtag("event", normalizedEventName, {
    ...removeUndefinedParams(params),
    send_to: measurementId,
    transport_type: "beacon",

    debug_mode: isDebugMode,
  });
};
