import type { AnalyticsEventName, AnalyticsProperties } from '@/types';

/**
 * Analytics abstraction.
 *
 * Development: logs to the console.
 * Production later: wire Firebase Analytics, GA4, AppsFlyer, etc. here
 * without changing call sites.
 *
 * Example Firebase connection:
 *   import { getAnalytics, logEvent } from 'firebase/analytics';
 *   const analytics = getAnalytics(app);
 *   logEvent(analytics, name, properties);
 */
export function trackEvent(
  name: AnalyticsEventName,
  properties?: AnalyticsProperties,
): void {
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.info(`[analytics] ${name}`, properties ?? {});
  }
  // Production providers go here.
}

export function trackPageView(screen: string): void {
  trackEvent(
    screen === 'collection'
      ? 'collection_viewed'
      : screen === 'history'
        ? 'history_viewed'
        : screen === 'settings'
          ? 'settings_viewed'
          : 'hunt_viewed',
    { screen },
  );
}
