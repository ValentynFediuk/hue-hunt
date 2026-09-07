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

  const colorsFound = realHunts.filter((h) => !h.isDemo).length;

  return (
    <div className="safe-pt pb-6 lg:pb-14 min-h-full">
      <div className="site-container pt-3 lg:pt-10">
        <header className="flex items-center justify-between pb-6 lg:pb-10">
          <div>
            <p className="text-[13px] uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400 lg:hidden">
              Hue Hunt
            </p>
            <p className="hidden lg:block text-sm font-medium text-zinc-500 dark:text-zinc-400 tracking-wide">
              Today&apos;s challenge
            </p>
            <p className="text-sm text-zinc-400 dark:text-zinc-500 mt-0.5 lg:mt-1.5 lg:text-lg lg:text-zinc-700 dark:lg:text-zinc-200">
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

        <section className="animate-fade-up grid lg:grid-cols-12 lg:gap-12 xl:gap-14 lg:items-stretch">
          <div className="lg:col-span-7 xl:col-span-8 flex">
            <div
              className="relative overflow-hidden rounded-[28px] lg:rounded-[36px] p-6 sm:p-7 lg:p-12 shadow-[var(--shadow-soft)] min-h-[340px] lg:min-h-[min(560px,70vh)] flex flex-col w-full"
              style={{
                background: `linear-gradient(160deg, ${todayColor.hex} 0%, ${todayColor.hex}dd 45%, ${todayColor.hex}99 100%)`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/25 pointer-events-none" />
              <div className="relative z-10 flex flex-col flex-1 max-w-2xl">
                <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-white/80">
                  Today’s Hunt
                </p>
                <h1 className="mt-4 text-[clamp(2.6rem,11vw,3.5rem)] lg:text-[clamp(3.5rem,5.5vw,5rem)] leading-[0.95] font-semibold tracking-tight text-white drop-shadow-sm">
                  {todayColor.name}
                </h1>
                <p className="mt-3 text-sm font-medium text-white/85 tracking-wide lg:text-lg">
                  {todayColor.hex}
                </p>
                <p className="mt-6 text-[15px] lg:text-lg leading-relaxed text-white/90 max-w-[18rem] lg:max-w-lg text-balance">
                  Find something around you that matches this color.
                </p>

                <div className="mt-auto pt-8 lg:pt-14 lg:max-w-xs">
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

          <aside className="mt-5 lg:mt-0 lg:col-span-5 xl:col-span-4 flex flex-col gap-3 lg:gap-4">
            <div className="grid grid-cols-3 lg:grid-cols-1 gap-2.5 lg:gap-3">
              <div className="flex flex-col lg:flex-row items-center lg:items-center justify-center lg:justify-start gap-0 lg:gap-4 min-w-0 px-2 py-3 lg:px-5 lg:py-5 rounded-2xl lg:rounded-3xl bg-zinc-900/[0.04] dark:bg-white/[0.06]">
                <span className="text-lg lg:text-3xl font-semibold tracking-tight tabular-nums inline-flex items-center gap-1">
                  <Flame className="w-4 h-4 lg:w-6 lg:h-6 text-orange-500" aria-hidden />
                  {stats.currentStreak}
                </span>
                <span className="text-[11px] lg:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5 lg:mt-0">
                  Current streak
                </span>
              </div>
              <div className="flex flex-col lg:flex-row items-center lg:items-center justify-center lg:justify-start gap-0 lg:gap-4 min-w-0 px-2 py-3 lg:px-5 lg:py-5 rounded-2xl lg:rounded-3xl bg-zinc-900/[0.04] dark:bg-white/[0.06]">
                <span className="text-lg lg:text-3xl font-semibold tracking-tight tabular-nums">
                  {stats.totalCompleted}
                </span>
                <span className="text-[11px] lg:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5 lg:mt-0">
                  Completed hunts
                </span>
              </div>
              <div className="flex flex-col lg:flex-row items-center lg:items-center justify-center lg:justify-start gap-0 lg:gap-4 min-w-0 px-2 py-3 lg:px-5 lg:py-5 rounded-2xl lg:rounded-3xl bg-zinc-900/[0.04] dark:bg-white/[0.06]">
                <span className="text-lg lg:text-3xl font-semibold tracking-tight tabular-nums">
                  {colorsFound}
                </span>
                <span className="text-[11px] lg:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5 lg:mt-0">
                  Colors found
                </span>
              </div>
            </div>

            <div className="hidden lg:block flex-1 rounded-3xl bg-white dark:bg-zinc-900 ring-1 ring-black/5 dark:ring-white/10 p-6">
              <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">How it works</p>
              <p className="mt-3 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-300">
                {todayColor.description} {todayColor.hint}
              </p>
              <p className="mt-5 text-sm text-zinc-400 leading-relaxed">
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
