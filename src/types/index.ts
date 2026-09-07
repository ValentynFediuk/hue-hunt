export type ThemePreference = 'system' | 'light' | 'dark';

export interface HuntEntry {
  /** YYYY-MM-DD in local timezone */
  dateKey: string;
  colorId: string;
  colorName: string;
  colorHex: string;
  completedAt: string; // ISO
  photoDataUrl: string | null;
  photoSaved: boolean;
  isDemo?: boolean;
}

export interface AppStats {
  currentStreak: number;
  bestStreak: number;
  totalCompleted: number;
  lastCompletedDateKey: string | null;
}

export interface AppSettings {
  theme: ThemePreference;
  notificationsEnabled: boolean;
  onboardingCompleted: boolean;
  demoSeeded: boolean;
}

export interface AppState {
  version: number;
  settings: AppSettings;
  hunts: HuntEntry[];
  stats: AppStats;
  /** Cached today's challenge so refresh doesn't re-roll mid-day */
  todayChallenge: {
    dateKey: string;
    colorId: string;
  } | null;
}

export type AnalyticsEventName =
  | 'app_opened'
  | 'onboarding_started'
  | 'onboarding_completed'
  | 'onboarding_skipped'
  | 'hunt_viewed'
  | 'photo_added'
  | 'photo_save_failed'
  | 'hunt_completed'
  | 'collection_viewed'
  | 'history_viewed'
  | 'settings_viewed'
  | 'return_session'
  | 'data_reset'
  | 'theme_changed';

export type AnalyticsProperties = Record<
  string,
  string | number | boolean | null | undefined
>;
