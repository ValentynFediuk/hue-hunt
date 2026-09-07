import type { AppState, AppSettings, AppStats, HuntEntry } from '@/types';
import { COLORS } from '@/data/colors';
import { addDays, toDateKey } from '@/lib/dates';

export const STORAGE_KEY = 'hue-hunt:v1';
export const APP_VERSION = 1;

export const defaultSettings: AppSettings = {
  theme: 'system',
  notificationsEnabled: false,
  onboardingCompleted: false,
  demoSeeded: false,
};

export const defaultStats: AppStats = {
  currentStreak: 0,
  bestStreak: 0,
  totalCompleted: 0,
  lastCompletedDateKey: null,
};

export function createEmptyState(): AppState {
  return {
    version: APP_VERSION,
    settings: { ...defaultSettings },
    hunts: [],
    stats: { ...defaultStats },
    todayChallenge: null,
  };
}

/** Solid-color SVG data URL placeholders for demo entries (no external images). */
function demoSwatchDataUrl(hex: string, label: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="800" viewBox="0 0 640 800">
  <rect width="640" height="800" fill="${hex}"/>
  <rect x="40" y="640" width="560" height="100" rx="20" fill="rgba(0,0,0,0.28)"/>
  <text x="320" y="705" text-anchor="middle" font-family="system-ui,sans-serif" font-size="36" fill="#fff" font-weight="600">${label}</text>
</svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export function createDemoHunts(todayKey: string = toDateKey()): HuntEntry[] {
  const picks = [
    COLORS.find((c) => c.id === 'saffron') ?? COLORS[0]!,
    COLORS.find((c) => c.id === 'teal') ?? COLORS[1]!,
    COLORS.find((c) => c.id === 'terracotta') ?? COLORS[2]!,
  ];

  return picks.map((color, i) => {
    const dateKey = addDays(todayKey, -(i + 1));
    return {
      dateKey,
      colorId: color.id,
      colorName: color.name,
      colorHex: color.hex,
      completedAt: new Date(`${dateKey}T12:00:00`).toISOString(),
      photoDataUrl: demoSwatchDataUrl(color.hex, color.name),
      photoSaved: true,
      isDemo: true,
    };
  });
}

export function seedDemoState(base: AppState = createEmptyState()): AppState {
  if (base.settings.demoSeeded || base.hunts.length > 0) return base;
  const today = toDateKey();
  const hunts = createDemoHunts(today);
  return {
    ...base,
    hunts,
    settings: { ...base.settings, demoSeeded: true },
    stats: {
      currentStreak: 0, // demo days are past; streak resumes when user completes today
      bestStreak: 3,
      totalCompleted: hunts.length,
      lastCompletedDateKey: hunts[0]?.dateKey ?? null,
    },
  };
}

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return seedDemoState(createEmptyState());
    }
    const parsed = JSON.parse(raw) as AppState;
    if (!parsed || typeof parsed !== 'object') {
      return seedDemoState(createEmptyState());
    }
    return {
      ...createEmptyState(),
      ...parsed,
      settings: { ...defaultSettings, ...parsed.settings },
      stats: { ...defaultStats, ...parsed.stats },
      hunts: Array.isArray(parsed.hunts) ? parsed.hunts : [],
    };
  } catch {
    return seedDemoState(createEmptyState());
  }
}

export function saveState(state: AppState): { ok: boolean; error?: string } {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return { ok: true };
  } catch (e) {
    const message =
      e instanceof DOMException && e.name === 'QuotaExceededError'
        ? 'Storage is full. Try completing without saving the photo, or clear old data in Settings.'
        : 'Could not save data on this device.';
    return { ok: false, error: message };
  }
}

export function clearState(): void {
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Recalculate streak from completed hunts + last completion.
 * Friendly: missing a day resets current streak; best is preserved.
 */
export function recomputeStats(hunts: HuntEntry[], todayKey: string = toDateKey()): AppStats {
  const completed = hunts
    .filter((h) => !h.isDemo || true)
    .slice()
    .sort((a, b) => (a.dateKey < b.dateKey ? 1 : -1));

  const uniqueDates = [...new Set(completed.map((h) => h.dateKey))].sort().reverse();
  const totalCompleted = uniqueDates.length;
  const lastCompletedDateKey = uniqueDates[0] ?? null;

  let currentStreak = 0;
  if (lastCompletedDateKey) {
    // Streak counts consecutive days ending at today or yesterday (grace until you open tomorrow)
    let cursor =
      lastCompletedDateKey === todayKey || lastCompletedDateKey === addDays(todayKey, -1)
        ? lastCompletedDateKey
        : null;

    if (cursor) {
      const set = new Set(uniqueDates);
      while (cursor && set.has(cursor)) {
        currentStreak += 1;
        cursor = addDays(cursor, -1);
      }
    }
  }

  // best streak: scan consecutive runs
  let bestStreak = 0;
  let run = 0;
  const ascending = [...uniqueDates].sort();
  for (let i = 0; i < ascending.length; i++) {
    if (i === 0) {
      run = 1;
    } else {
      const prev = ascending[i - 1]!;
      const cur = ascending[i]!;
      run = cur === addDays(prev, 1) ? run + 1 : 1;
    }
    bestStreak = Math.max(bestStreak, run);
  }
  bestStreak = Math.max(bestStreak, currentStreak);

  return {
    currentStreak,
    bestStreak,
    totalCompleted,
    lastCompletedDateKey,
  };
}
