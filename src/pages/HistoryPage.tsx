import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Circle } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { formatDisplayDate } from '@/lib/dates';
import { trackEvent } from '@/lib/analytics';

export function HistoryPage() {
  const navigate = useNavigate();
  const { realHunts, todayKey, isTodayComplete, todayColor } = useApp();

  useEffect(() => {
    trackEvent('history_viewed', { count: realHunts.length });
  }, [realHunts.length]);

  return (
    <div className="safe-pt safe-px px-5 lg:px-0 pb-6 lg:pb-12 min-h-full">
      <div className="site-container lg:pt-8 lg:max-w-3xl">
        <header className="pt-4 pb-5 lg:pt-0 lg:pb-8">
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Timeline</p>
          <h1 className="text-3xl lg:text-4xl font-semibold tracking-tight mt-1">History</h1>
          <p className="mt-2 text-sm text-zinc-500">
            Every completed hunt, newest first.
          </p>
        </header>

        <ul className="space-y-3 animate-fade-up">
          <li>
            <button
              type="button"
              onClick={() =>
                isTodayComplete
                  ? navigate(`/history/${todayKey}`)
                  : navigate('/hunt')
              }
              className="w-full flex items-center gap-3 p-3 lg:p-4 rounded-3xl bg-white dark:bg-zinc-900 ring-1 ring-black/5 dark:ring-white/10 text-left active:scale-[0.99] hover:ring-black/10 dark:hover:ring-white/15 transition"
            >
              <div
                className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl overflow-hidden shrink-0"
                style={{ backgroundColor: todayColor.hex }}
              >
                {isTodayComplete &&
                  realHunts.find((h) => h.dateKey === todayKey)?.photoDataUrl && (
                    <img
                      src={
                        realHunts.find((h) => h.dateKey === todayKey)!.photoDataUrl!
                      }
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-zinc-500">{formatDisplayDate(todayKey)} · Today</p>
                <p className="font-medium truncate lg:text-lg">{todayColor.name}</p>
                <p className="text-xs text-zinc-500 mt-0.5">
                  {isTodayComplete ? 'Completed' : 'In progress'}
                </p>
              </div>
              {isTodayComplete ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
              ) : (
                <Circle className="w-5 h-5 text-zinc-300 dark:text-zinc-600 shrink-0" />
              )}
            </button>
          </li>

          {realHunts
            .filter((h) => h.dateKey !== todayKey)
            .map((hunt) => (
              <li key={hunt.dateKey}>
                <button
                  type="button"
                  onClick={() => navigate(`/history/${hunt.dateKey}`)}
                  className="w-full flex items-center gap-3 p-3 lg:p-4 rounded-3xl bg-white dark:bg-zinc-900 ring-1 ring-black/5 dark:ring-white/10 text-left active:scale-[0.99] hover:ring-black/10 dark:hover:ring-white/15 transition"
                >
                  <div
                    className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl overflow-hidden shrink-0"
                    style={{ backgroundColor: hunt.colorHex }}
                  >
                    {hunt.photoDataUrl && (
                      <img
                        src={hunt.photoDataUrl}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-zinc-500">
                      {formatDisplayDate(hunt.dateKey)}
                      {hunt.isDemo ? ' · Demo' : ''}
                    </p>
                    <p className="font-medium truncate lg:text-lg">{hunt.colorName}</p>
                    <p className="text-xs text-zinc-500 mt-0.5">Completed</p>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                </button>
              </li>
            ))}
        </ul>

        {realHunts.length === 0 && !isTodayComplete && (
          <p className="mt-10 text-center text-sm text-zinc-500">
            No past hunts yet. Complete today’s color to begin your history.
          </p>
        )}
      </div>
    </div>
  );
}
