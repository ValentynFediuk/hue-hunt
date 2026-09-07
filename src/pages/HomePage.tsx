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
    <div className="safe-pt safe-px px-5 pb-6 min-h-full flex flex-col">
      <header className="flex items-center justify-between pt-3 pb-6">
        <div>
          <p className="text-[13px] uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
            Hue Hunt
          </p>
          <p className="text-sm text-zinc-400 dark:text-zinc-500 mt-0.5">
            {formatLongDate(todayKey)}
          </p>
        </div>
        <Link
          to="/settings"
          className="w-11 h-11 rounded-full flex items-center justify-center bg-zinc-900/5 dark:bg-white/8 active:scale-95 transition"
          aria-label="Settings"
        >
          <Settings className="w-5 h-5" strokeWidth={1.75} />
        </Link>
      </header>

      <section className="animate-fade-up flex-1 flex flex-col">
        <div
          className="relative overflow-hidden rounded-[28px] p-6 sm:p-7 shadow-[var(--shadow-soft)] min-h-[340px] flex flex-col"
          style={{
            background: `linear-gradient(160deg, ${todayColor.hex} 0%, ${todayColor.hex}dd 45%, ${todayColor.hex}99 100%)`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/25 pointer-events-none" />
          <div className="relative z-10 flex flex-col flex-1">
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-white/80">
              Today’s Hunt
            </p>
            <h1 className="mt-4 text-[clamp(2.6rem,11vw,3.5rem)] leading-[0.95] font-semibold tracking-tight text-white drop-shadow-sm">
              {todayColor.name}
            </h1>
            <p className="mt-3 text-sm font-medium text-white/85 tracking-wide">
              {todayColor.hex}
            </p>
            <p className="mt-6 text-[15px] leading-relaxed text-white/90 max-w-[18rem] text-balance">
              Find something around you that matches this color.
            </p>

            <div className="mt-auto pt-8">
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

        <div className="grid grid-cols-3 gap-2.5 mt-5">
          <div className="flex flex-col items-center justify-center min-w-0 px-2 py-3 rounded-2xl bg-zinc-900/[0.04] dark:bg-white/[0.06]">
            <span className="text-lg font-semibold tracking-tight tabular-nums inline-flex items-center gap-1">
              <Flame className="w-4 h-4 text-orange-500" aria-hidden />
              {stats.currentStreak}
            </span>
            <span className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
              Current streak
            </span>
          </div>
          <div className="flex flex-col items-center justify-center min-w-0 px-2 py-3 rounded-2xl bg-zinc-900/[0.04] dark:bg-white/[0.06]">
            <span className="text-lg font-semibold tracking-tight tabular-nums">
              {stats.totalCompleted}
            </span>
            <span className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
              Completed
            </span>
          </div>
          <div className="flex flex-col items-center justify-center min-w-0 px-2 py-3 rounded-2xl bg-zinc-900/[0.04] dark:bg-white/[0.06]">
            <span className="text-lg font-semibold tracking-tight tabular-nums">
              {realHunts.length}
            </span>
            <span className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
              Colors found
            </span>
          </div>
        </div>

        {isTodayComplete && todayEntry?.photoDataUrl && (
          <button
            type="button"
            onClick={() => navigate(`/history/${todayEntry.dateKey}`)}
            className="mt-5 w-full overflow-hidden rounded-3xl text-left ring-1 ring-black/5 dark:ring-white/10 active:scale-[0.99] transition"
          >
            <img
              src={todayEntry.photoDataUrl}
              alt={`Your ${todayColor.name} find`}
              className="w-full aspect-[16/10] object-cover"
            />
            <div className="px-4 py-3 bg-white dark:bg-zinc-900">
              <p className="text-sm font-medium">Today’s find</p>
              <p className="text-xs text-zinc-500 mt-0.5">Tap to open</p>
            </div>
          </button>
        )}
      </section>
    </div>
  );
}
