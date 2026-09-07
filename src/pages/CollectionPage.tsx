import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/Button';
import { formatDisplayDate } from '@/lib/dates';
import { trackEvent } from '@/lib/analytics';

export function CollectionPage() {
  const navigate = useNavigate();
  const { realHunts, stats, colorsThisWeek } = useApp();

  useEffect(() => {
    trackEvent('collection_viewed', { count: realHunts.length });
  }, [realHunts.length]);

  return (
    <div className="safe-pt safe-px px-5 pb-6 min-h-full">
      <header className="pt-4 pb-5">
        <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Gallery</p>
        <h1 className="text-3xl font-semibold tracking-tight mt-1">My colors</h1>
        <div className="mt-4 flex flex-wrap gap-2 text-sm text-zinc-600 dark:text-zinc-400">
          <span className="rounded-full bg-zinc-900/5 dark:bg-white/8 px-3 py-1">
            {stats.totalCompleted} discovered
          </span>
          <span className="rounded-full bg-zinc-900/5 dark:bg-white/8 px-3 py-1">
            {stats.currentStreak} day streak
          </span>
          <span className="rounded-full bg-zinc-900/5 dark:bg-white/8 px-3 py-1">
            {colorsThisWeek} this week
          </span>
        </div>
      </header>

      {realHunts.length === 0 ? (
        <div className="mt-16 text-center animate-fade-up px-4">
          <div className="mx-auto w-24 h-24 rounded-[28px] bg-gradient-to-br from-zinc-200 to-zinc-100 dark:from-zinc-800 dark:to-zinc-900 mb-6" />
          <h2 className="text-xl font-semibold tracking-tight">
            Your color collection is empty.
          </h2>
          <p className="mt-2 text-sm text-zinc-500 leading-relaxed text-balance">
            Complete your first hunt to start collecting.
          </p>
          <Button className="mt-8" size="lg" onClick={() => navigate('/')}>
            Find today’s color
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 animate-fade-up">
          {realHunts.map((hunt) => (
            <button
              key={hunt.dateKey}
              type="button"
              onClick={() => navigate(`/history/${hunt.dateKey}`)}
              className="text-left overflow-hidden rounded-3xl bg-white dark:bg-zinc-900 ring-1 ring-black/5 dark:ring-white/10 shadow-sm active:scale-[0.98] transition"
            >
              <div className="relative aspect-[4/5] bg-zinc-100 dark:bg-zinc-800">
                {hunt.photoDataUrl ? (
                  <img
                    src={hunt.photoDataUrl}
                    alt={hunt.colorName}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className="absolute inset-0"
                    style={{ backgroundColor: hunt.colorHex }}
                  />
                )}
                <span
                  className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full ring-2 ring-white/90 shadow"
                  style={{ backgroundColor: hunt.colorHex }}
                />
                {hunt.isDemo && (
                  <span className="absolute top-2.5 left-2.5 text-[10px] font-semibold uppercase tracking-wider bg-black/55 text-white px-2 py-0.5 rounded-full">
                    Demo
                  </span>
                )}
              </div>
              <div className="p-3">
                <p className="font-medium tracking-tight truncate">{hunt.colorName}</p>
                <p className="text-xs text-zinc-500 mt-0.5">
                  {formatDisplayDate(hunt.dateKey)}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
