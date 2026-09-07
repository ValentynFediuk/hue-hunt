import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { getColorById, pickDailyColor, type ColorDefinition } from '@/data/colors';
import { trackEvent } from '@/lib/analytics';
import { isSameOrAfter, startOfWeekKey, toDateKey } from '@/lib/dates';
import {
  clearState,
  createEmptyState,
  loadState,
  recomputeStats,
  saveState,
  seedDemoState,
} from '@/lib/storage';
import type {
  AppSettings,
  AppState,
  AppStats,
  HuntEntry,
  ThemePreference,
} from '@/types';

interface CompleteHuntResult {
  ok: boolean;
  error?: string;
  entry?: HuntEntry;
  photoSaved: boolean;
}

interface AppContextValue {
  ready: boolean;
  state: AppState;
  todayKey: string;
  todayColor: ColorDefinition;
  todayEntry: HuntEntry | undefined;
  isTodayComplete: boolean;
  stats: AppStats;
  realHunts: HuntEntry[];
  colorsThisWeek: number;
  completeHunt: (photoDataUrl: string | null) => CompleteHuntResult;
  updateSettings: (partial: Partial<AppSettings>) => void;
  setTheme: (theme: ThemePreference) => void;
  completeOnboarding: (skipped?: boolean) => void;
  resetAllData: () => void;
  getHuntByDate: (dateKey: string) => HuntEntry | undefined;
  storageError: string | null;
  clearStorageError: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

function applyTheme(theme: ThemePreference) {
  const root = document.documentElement;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const dark = theme === 'dark' || (theme === 'system' && prefersDark);
  root.classList.toggle('dark', dark);
  root.style.colorScheme = dark ? 'dark' : 'light';
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', dark ? '#0f0f10' : '#f7f5f2');
}

function ensureTodayChallenge(state: AppState, todayKey: string): AppState {
  if (state.todayChallenge?.dateKey === todayKey) {
    const color = getColorById(state.todayChallenge.colorId);
    if (color) return state;
  }
  const color = pickDailyColor(todayKey);
  return {
    ...state,
    todayChallenge: { dateKey: todayKey, colorId: color.id },
  };
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(() => createEmptyState());
  const [ready, setReady] = useState(false);
  const [storageError, setStorageError] = useState<string | null>(null);
  const [todayKey] = useState(() => toDateKey());
  const openedRef = useRef(false);

  useEffect(() => {
    let next = loadState();
    next = ensureTodayChallenge(next, todayKey);
    next = {
      ...next,
      stats: recomputeStats(next.hunts, todayKey),
    };
    setState(next);
    applyTheme(next.settings.theme);
    const result = saveState(next);
    if (!result.ok) setStorageError(result.error ?? 'Save failed');
    setReady(true);

    if (!openedRef.current) {
      openedRef.current = true;
      trackEvent('app_opened', {
        has_hunts: next.hunts.length > 0,
        onboarding_done: next.settings.onboardingCompleted,
      });
      if (next.stats.totalCompleted > 0) {
        trackEvent('return_session', {
          streak: next.stats.currentStreak,
          total: next.stats.totalCompleted,
        });
      }
    }
  }, [todayKey]);

  useEffect(() => {
    if (!ready) return;
    applyTheme(state.settings.theme);
  }, [ready, state.settings.theme]);

  useEffect(() => {
    if (!ready) return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      if (state.settings.theme === 'system') applyTheme('system');
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [ready, state.settings.theme]);

  const persist = useCallback((next: AppState) => {
    const result = saveState(next);
    if (!result.ok) {
      setStorageError(result.error ?? 'Save failed');
      return false;
    }
    setStorageError(null);
    return true;
  }, []);

  const todayColor = useMemo(() => {
    const id = state.todayChallenge?.colorId;
    return (id && getColorById(id)) || pickDailyColor(todayKey);
  }, [state.todayChallenge, todayKey]);

  const todayEntry = useMemo(
    () => state.hunts.find((h) => h.dateKey === todayKey && !h.isDemo),
    [state.hunts, todayKey],
  );

  const realHunts = useMemo(
    () =>
      state.hunts
        .slice()
        .sort((a, b) => (a.dateKey < b.dateKey ? 1 : -1)),
    [state.hunts],
  );

  const colorsThisWeek = useMemo(() => {
    const start = startOfWeekKey(todayKey);
    return state.hunts.filter((h) => isSameOrAfter(h.dateKey, start)).length;
  }, [state.hunts, todayKey]);

  const completeHunt = useCallback(
    (photoDataUrl: string | null): CompleteHuntResult => {
      if (state.hunts.some((h) => h.dateKey === todayKey && !h.isDemo)) {
        return { ok: false, error: 'Today’s hunt is already complete.', photoSaved: false };
      }

      const baseEntry: HuntEntry = {
        dateKey: todayKey,
        colorId: todayColor.id,
        colorName: todayColor.name,
        colorHex: todayColor.hex,
        completedAt: new Date().toISOString(),
        photoDataUrl,
        photoSaved: Boolean(photoDataUrl),
        isDemo: false,
      };

      const tryPersist = (entry: HuntEntry): { ok: boolean; next?: AppState; error?: string } => {
        const hunts = [entry, ...state.hunts.filter((h) => h.dateKey !== todayKey)];
        const next: AppState = {
          ...state,
          hunts,
          stats: recomputeStats(hunts, todayKey),
        };
        const result = saveState(next);
        if (!result.ok) {
          setStorageError(result.error ?? 'Save failed');
          return { ok: false, error: result.error };
        }
        setStorageError(null);
        return { ok: true, next };
      };

      let entry = baseEntry;
      let photoSaved = Boolean(photoDataUrl);
      let attempt = tryPersist(entry);

      if (!attempt.ok && photoDataUrl) {
        trackEvent('photo_save_failed', { color: todayColor.id });
        entry = { ...baseEntry, photoDataUrl: null, photoSaved: false };
        photoSaved = false;
        attempt = tryPersist(entry);
      }

      if (!attempt.ok || !attempt.next) {
        return {
          ok: false,
          error: attempt.error ?? 'Could not save hunt.',
          photoSaved: false,
        };
      }

      setState(attempt.next);
      trackEvent('hunt_completed', {
        color: todayColor.id,
        photo: photoSaved,
        streak: attempt.next.stats.currentStreak,
      });
      return { ok: true, entry, photoSaved };
    },
    [state, todayColor, todayKey],
  );

  const updateSettings = useCallback(
    (partial: Partial<AppSettings>) => {
      setState((prev) => {
        const next = {
          ...prev,
          settings: { ...prev.settings, ...partial },
        };
        persist(next);
        return next;
      });
    },
    [persist],
  );

  const setTheme = useCallback(
    (theme: ThemePreference) => {
      trackEvent('theme_changed', { theme });
      updateSettings({ theme });
      applyTheme(theme);
    },
    [updateSettings],
  );

  const completeOnboarding = useCallback(
    (skipped = false) => {
      trackEvent(skipped ? 'onboarding_skipped' : 'onboarding_completed');
      updateSettings({ onboardingCompleted: true });
    },
    [updateSettings],
  );

  const resetAllData = useCallback(() => {
    clearState();
    trackEvent('data_reset');
    let next = seedDemoState(createEmptyState());
    next = ensureTodayChallenge(next, todayKey);
    next = { ...next, stats: recomputeStats(next.hunts, todayKey) };
    // Fresh start: clear demo too if user wants empty? Spec says reset all — empty + onboarding
    next = {
      ...createEmptyState(),
      todayChallenge: { dateKey: todayKey, colorId: pickDailyColor(todayKey).id },
    };
    setState(next);
    persist(next);
    applyTheme(next.settings.theme);
  }, [persist, todayKey]);

  const getHuntByDate = useCallback(
    (dateKey: string) => state.hunts.find((h) => h.dateKey === dateKey),
    [state.hunts],
  );

  const value: AppContextValue = {
    ready,
    state,
    todayKey,
    todayColor,
    todayEntry,
    isTodayComplete: Boolean(todayEntry),
    stats: state.stats,
    realHunts,
    colorsThisWeek,
    completeHunt,
    updateSettings,
    setTheme,
    completeOnboarding,
    resetAllData,
    getHuntByDate,
    storageError,
    clearStorageError: () => setStorageError(null),
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
