import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BellOff, ChevronRight, Info, Shield, FileText } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Dialog } from '@/components/ui/Dialog';
import { trackEvent } from '@/lib/analytics';
import type { ThemePreference } from '@/types';

const themes: { id: ThemePreference; label: string }[] = [
  { id: 'system', label: 'System' },
  { id: 'light', label: 'Light' },
  { id: 'dark', label: 'Dark' },
];

export function SettingsPage() {
  const { state, setTheme, resetAllData, stats } = useApp();
  const [confirmReset, setConfirmReset] = useState(false);

  useEffect(() => {
    trackEvent('settings_viewed');
  }, []);

  return (
    <div className="safe-pt safe-px px-5 pb-10 min-h-full">
      <header className="pt-4 pb-6">
        <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Preferences</p>
        <h1 className="text-3xl font-semibold tracking-tight mt-1">Settings</h1>
      </header>

      <section className="space-y-6 animate-fade-up">
        <div>
          <h2 className="text-xs uppercase tracking-[0.14em] text-zinc-500 mb-2 px-1">
            Theme
          </h2>
          <div className="grid grid-cols-3 gap-2 p-1 rounded-2xl bg-zinc-900/5 dark:bg-white/8">
            {themes.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTheme(t.id)}
                className={[
                  'h-11 rounded-xl text-sm font-medium transition',
                  state.settings.theme === t.id
                    ? 'bg-white dark:bg-zinc-800 shadow-sm'
                    : 'text-zinc-500',
                ].join(' ')}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xs uppercase tracking-[0.14em] text-zinc-500 mb-2 px-1">
            Notifications
          </h2>
          <div className="rounded-3xl bg-white dark:bg-zinc-900 ring-1 ring-black/5 dark:ring-white/10 p-4 flex gap-3">
            <BellOff className="w-5 h-5 text-zinc-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-sm">Daily reminders</p>
              <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                Notifications require native Android integration. They are disabled
                in this web prototype and will be available in the Play Store build.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xs uppercase tracking-[0.14em] text-zinc-500 mb-2 px-1">
            About
          </h2>
          <div className="rounded-3xl overflow-hidden bg-white dark:bg-zinc-900 ring-1 ring-black/5 dark:ring-white/10 divide-y divide-black/5 dark:divide-white/10">
            <div className="p-4 flex gap-3">
              <Info className="w-5 h-5 text-zinc-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-sm">About Hue Hunt</p>
                <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                  Hue Hunt turns ordinary days into tiny color adventures. Get one
                  color challenge each day, find it around you, and build a personal
                  collection. No account required.
                </p>
              </div>
            </div>
            <Link
              to="/privacy"
              className="flex items-center gap-3 p-4 active:bg-zinc-50 dark:active:bg-zinc-800/60"
            >
              <Shield className="w-5 h-5 text-zinc-400" />
              <span className="flex-1 text-sm font-medium">Privacy Policy</span>
              <ChevronRight className="w-4 h-4 text-zinc-400" />
            </Link>
            <Link
              to="/terms"
              className="flex items-center gap-3 p-4 active:bg-zinc-50 dark:active:bg-zinc-800/60"
            >
              <FileText className="w-5 h-5 text-zinc-400" />
              <span className="flex-1 text-sm font-medium">Terms</span>
              <ChevronRight className="w-4 h-4 text-zinc-400" />
            </Link>
            <div className="p-4 flex justify-between text-sm">
              <span className="text-zinc-500">App version</span>
              <span className="font-medium tabular-nums">1.0.0</span>
            </div>
            <div className="p-4 flex justify-between text-sm">
              <span className="text-zinc-500">Best streak</span>
              <span className="font-medium tabular-nums">{stats.bestStreak}</span>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xs uppercase tracking-[0.14em] text-zinc-500 mb-2 px-1">
            Data
          </h2>
          <button
            type="button"
            onClick={() => setConfirmReset(true)}
            className="w-full rounded-3xl bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300 ring-1 ring-red-200/60 dark:ring-red-900/50 p-4 text-sm font-medium text-left"
          >
            Reset all data
            <span className="block text-xs font-normal opacity-80 mt-1">
              Clears hunts, photos, streak, and onboarding on this device.
            </span>
          </button>
        </div>
      </section>

      <Dialog
        open={confirmReset}
        title="Reset all data?"
        description="This permanently deletes your local collection, photos, and streak on this device. This cannot be undone."
        confirmLabel="Reset everything"
        danger
        onCancel={() => setConfirmReset(false)}
        onConfirm={() => {
          resetAllData();
          setConfirmReset(false);
        }}
      />
    </div>
  );
}
