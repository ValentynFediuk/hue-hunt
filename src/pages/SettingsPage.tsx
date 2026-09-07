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
    <div className="safe-pt pb-10 lg:pb-16 min-h-full">
      <div className="site-container pt-4 lg:pt-10 lg:max-w-2xl">
        <header className="pb-6 lg:pb-10">
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Preferences</p>
          <h1 className="text-3xl lg:text-5xl font-semibold tracking-tight mt-1">Settings</h1>
        </header>

        <section className="space-y-6 lg:space-y-8 animate-fade-up">
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
                    'h-11 lg:h-12 rounded-xl text-sm font-medium transition',
                    state.settings.theme === t.id
                      ? 'bg-white dark:bg-zinc-800 shadow-sm'
                      : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200',
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
            <div className="rounded-3xl bg-white dark:bg-zinc-900 ring-1 ring-black/5 dark:ring-white/10 p-4 lg:p-5 flex gap-3">
              <BellOff className="w-5 h-5 text-zinc-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-sm lg:text-base">Daily reminders</p>
                <p className="text-xs lg:text-sm text-zinc-500 mt-1 leading-relaxed">
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
              <div className="p-4 lg:p-5 flex gap-3">
                <Info className="w-5 h-5 text-zinc-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm lg:text-base">About Hue Hunt</p>
                  <p className="text-xs lg:text-sm text-zinc-500 mt-1 leading-relaxed">
                    Hue Hunt turns ordinary days into tiny color adventures. Get one
                    color challenge each day, find it around you, and build a personal
                    collection. No account required.
                  </p>
                </div>
              </div>
              <Link
                to="/privacy"
                className="flex items-center gap-3 p-4 lg:p-5 active:bg-zinc-50 dark:active:bg-zinc-800/60 hover:bg-zinc-50 dark:hover:bg-zinc-800/40"
              >
                <Shield className="w-5 h-5 text-zinc-400" />
                <span className="flex-1 text-sm lg:text-base font-medium">Privacy Policy</span>
                <ChevronRight className="w-4 h-4 text-zinc-400" />
              </Link>
              <Link
                to="/terms"
                className="flex items-center gap-3 p-4 lg:p-5 active:bg-zinc-50 dark:active:bg-zinc-800/60 hover:bg-zinc-50 dark:hover:bg-zinc-800/40"
              >
                <FileText className="w-5 h-5 text-zinc-400" />
                <span className="flex-1 text-sm lg:text-base font-medium">Terms</span>
                <ChevronRight className="w-4 h-4 text-zinc-400" />
              </Link>
              <div className="p-4 lg:p-5 flex justify-between text-sm lg:text-base">
                <span className="text-zinc-500">App version</span>
                <span className="font-medium tabular-nums">1.0.0</span>
              </div>
              <div className="p-4 lg:p-5 flex justify-between text-sm lg:text-base">
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
              className="w-full rounded-3xl bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300 ring-1 ring-red-200/60 dark:ring-red-900/50 p-4 lg:p-5 text-sm lg:text-base font-medium text-left hover:bg-red-100/80 dark:hover:bg-red-950/50 transition"
            >
              Reset all data
              <span className="block text-xs lg:text-sm font-normal opacity-80 mt-1">
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
    </div>
  );
}
