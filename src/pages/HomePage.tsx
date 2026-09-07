import { Link, useNavigate } from 'react-router-dom';
import { Check, Flame, Settings } from 'lucide-react';
import { useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/Button';
import { formatLongDate } from '@/lib/dates';
import { trackEvent } from '@/lib/analytics';

export function HomePage() {
  const navigate = useNavigate();
  const {
    todayColor,
    todayKey,
    isTodayComplete,
    todayEntry,
    stats,
    realHunts,
  } = useApp();

  useEffect(() => {
    trackEvent('hunt_viewed', { color: todayColor.id, complete: isTodayComplete });
  }, [todayColor.id, isTodayComplete]);

  return (
    <div className="safe-pt safe-px px-5 lg:px-0 pb-6 lg:pb-12 min-h-full">
      <div className="site-container lg:pt-8">
        <header className="flex items-center justify-between pt-3 pb-6 lg:pb-8 lg:pt-0">
          <div>
            <p className="text-[13px] uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400 lg:hidden">
              Hue Hunt
            </p>
            <p className="hidden lg:block text-sm text-zinc-500 dark:text-zinc-400">
              Today&apos;s challenge
            </p>
            <p className="text-sm text-zinc-400 dark:text-zinc-500 mt-0.5 lg:mt-1 lg:text-base lg:text-zinc-600 dark:lg:text-zinc-300">
              {formatLongDate(todayKey)}
            </p>
          </div>
          <Link
            to="/settings"
            className="w-11 h-11 rounded-full flex items-center justify-center bg-zinc-900/5 dark:bg-white/8 active:scale-95 transition lg:hidden"
            aria-label="Settings"
          >
            <Settings className="w-5 h-5" strokeWidth={1.75} />
          </Link>
        </header>

        <section className="animate-fade-up grid lg:grid-cols-12 lg:gap-10 lg:items-start">
          <div className="lg:col-span-7 xl:col-span-8">
            <div
              className="relative overflow-hidden rounded-[28px] lg:rounded-[32px] p-6 sm:p-7 lg:p-10 shadow-[var(--shadow-soft)] min-h-[340px] lg:min-h-[420px] flex flex-col"
              style={{
                background: `linear-gradient(160deg, ${todayColor.hex} 0%, ${todayColor.hex}dd 45%, ${todayColor.hex}99 100%)`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/25 pointer-events-none" />
              <div className="relative z-10 flex flex-col flex-1 max-w-xl">
                <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-white/80">
                  Today’s Hunt
                </p>
                <h1 className="mt-4 text-[clamp(2.6rem,11vw,3.5rem)] lg:text-[clamp(3.2rem,5vw,4.5rem)] leading-[0.95] font-semibold tracking-tight text-white drop-shadow-sm">
                  {todayColor.name}
                </h1>
                <p className="mt-3 text-sm font-medium text-white/85 tracking-wide lg:text-base">
                  {todayColor.hex}
                </p>
                <p className="mt-6 text-[15px] lg:text-base leading-relaxed text-white/90 max-w-[18rem] lg:max-w-md text-balance">
                  Find something around you that matches this color.
                </p>

                <div className="mt-auto pt-8 lg:pt-12 lg:max-w-sm">
                  {isTodayComplete ? (
                    <div className="space-y-3">
                      <div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur px-3 py-1.5 text-sm text-white font-medium">
                        <Check className="w-4 h-4" />
                        Found today
                      </div>
                      <Button
                        fullWidth
                        size="lg"
                        className="bg-white text-zinc-900 hover:bg-white/95"
                        onClick={() => navigate('/collection')}
                      >
                        View collection
                      </Button>
                    </div>
                  ) : (
                    <Button
                      fullWidth
                      size="lg"
                      className="bg-white text-zinc-900 hover:bg-white/95"
                      onClick={() => navigate('/hunt')}
                    >
                      Start the hunt
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <aside className="mt-5 lg:mt-0 lg:col-span-5 xl:col-span-4 space-y-4">
            <div className="grid grid-cols-3 lg:grid-cols-1 gap-2.5 lg:gap-3">
              <div className="flex flex-col lg:flex-row items-center lg:items-center justify-center lg:justify-start gap-0 lg:gap-4 min-w-0 px-2 py-3 lg:px-5 lg:py-4 rounded-2xl lg:rounded-3xl bg-zinc-900/[0.04] dark:bg-white/[0.06]">
                <span className="text-lg lg:text-2xl font-semibold tracking-tight tabular-nums inline-flex items-center gap-1">
                  <Flame className="w-4 h-4 lg:w-5 lg:h-5 text-orange-500" aria-hidden />
                  {stats.currentStreak}
                </span>
                <span className="text-[11px] lg:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5 lg:mt-0">
                  Current streak
                </span>
              </div>
              <div className="flex flex-col lg:flex-row items-center lg:items-center justify-center lg:justify-start gap-0 lg:gap-4 min-w-0 px-2 py-3 lg:px-5 lg:py-4 rounded-2xl lg:rounded-3xl bg-zinc-900/[0.04] dark:bg-white/[0.06]">
                <span className="text-lg lg:text-2xl font-semibold tracking-tight tabular-nums">
                  {stats.totalCompleted}
                </span>
                <span className="text-[11px] lg:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5 lg:mt-0">
                  Completed hunts
                </span>
              </div>
              <div className="flex flex-col lg:flex-row items-center lg:items-center justify-center lg:justify-start gap-0 lg:gap-4 min-w-0 px-2 py-3 lg:px-5 lg:py-4 rounded-2xl lg:rounded-3xl bg-zinc-900/[0.04] dark:bg-white/[0.06]">
                <span className="text-lg lg:text-2xl font-semibold tracking-tight tabular-nums">
                  {realHunts.length}
                </span>
                <span className="text-[11px] lg:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5 lg:mt-0">
                  Colors found
                </span>
              </div>
            </div>

            <div className="hidden lg:block rounded-3xl bg-white dark:bg-zinc-900 ring-1 ring-black/5 dark:ring-white/10 p-5">
              <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">How it works</p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                {todayColor.description} {todayColor.hint}
              </p>
              <p className="mt-4 text-xs text-zinc-400 leading-relaxed">
                Same color all day. Complete once, keep it in your collection, come back tomorrow.
              </p>
            </div>

            {isTodayComplete && todayEntry?.photoDataUrl && (
              <button
                type="button"
                onClick={() => navigate(`/history/${todayEntry.dateKey}`)}
                className="w-full overflow-hidden rounded-3xl text-left ring-1 ring-black/5 dark:ring-white/10 active:scale-[0.99] transition hover:ring-black/10 dark:hover:ring-white/20"
              >
                <img
                  src={todayEntry.photoDataUrl}
                  alt={`Your ${todayColor.name} find`}
                  className="w-full aspect-[16/10] object-cover"
                />
                <div className="px-4 py-3 bg-white dark:bg-zinc-900">
                  <p className="text-sm font-medium">Today’s find</p>
                  <p className="text-xs text-zinc-500 mt-0.5">Open details</p>
                </div>
              </button>
            )}
          </aside>
        </section>
      </div>
    </div>
  );
}
