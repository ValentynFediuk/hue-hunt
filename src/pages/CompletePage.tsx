import { useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/Button';

export function CompletePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { todayColor, todayEntry, stats, isTodayComplete } = useApp();
  const photoSaved = (location.state as { photoSaved?: boolean } | null)?.photoSaved;

  useEffect(() => {
    if (!isTodayComplete) navigate('/', { replace: true });
  }, [isTodayComplete, navigate]);

  const confetti = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: `${6 + ((i * 17) % 88)}%`,
        delay: `${(i % 7) * 0.08}s`,
        duration: `${1.6 + (i % 5) * 0.25}s`,
        color: [todayColor.hex, '#ffffff', '#111111', '#f4c430', '#93e9be'][i % 5]!,
      })),
    [todayColor.hex],
  );

  if (!isTodayComplete || !todayEntry) return null;

  return (
    <div className="relative safe-pt safe-px px-5 pb-10 min-h-full overflow-hidden flex flex-col page-flow lg:py-12">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {confetti.map((c) => (
          <span
            key={c.id}
            className="confetti-piece"
            style={{
              left: c.left,
              backgroundColor: c.color,
              animationDelay: c.delay,
              animationDuration: c.duration,
            }}
          />
        ))}
      </div>

      <div className="animate-celebrate relative z-10 flex-1 flex flex-col pt-6 lg:pt-2 lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
        <div className="order-2 lg:order-1 mt-6 lg:mt-0 flex flex-col">
          <p className="text-center lg:text-left text-xs uppercase tracking-[0.22em] text-zinc-500">
            Color found
          </p>
          <h1 className="mt-2 text-center lg:text-left text-3xl lg:text-5xl font-semibold tracking-tight">
            {todayColor.name}
          </h1>
          <p className="mt-2 text-center lg:text-left text-sm lg:text-base text-zinc-500">
            Day complete · {stats.currentStreak} day streak
          </p>

          <div className="mt-5 flex items-center justify-center lg:justify-start gap-3">
            <span
              className="w-10 h-10 lg:w-12 lg:h-12 rounded-2xl ring-1 ring-black/10"
              style={{ backgroundColor: todayColor.hex }}
            />
            <div>
              <p className="font-medium leading-tight lg:text-lg">{todayColor.name}</p>
              <p className="text-xs lg:text-sm text-zinc-500">{todayColor.hex}</p>
            </div>
          </div>

          {photoSaved === false && (
            <p className="mt-4 text-center lg:text-left text-xs text-amber-700 dark:text-amber-300">
              Hunt saved without the photo — storage was limited on this device.
            </p>
          )}

          <div className="mt-auto lg:mt-10 pt-8 space-y-3 lg:max-w-sm">
            <Button fullWidth size="lg" onClick={() => navigate('/collection')}>
              View collection
            </Button>
            <Button fullWidth variant="secondary" onClick={() => navigate('/')}>
              Back to today’s hunt
            </Button>
          </div>
        </div>

        <div className="order-1 lg:order-2 rounded-[28px] overflow-hidden ring-1 ring-black/5 dark:ring-white/10 bg-zinc-100 dark:bg-zinc-900 shadow-[var(--shadow-card)]">
          {todayEntry.photoDataUrl ? (
            <img
              src={todayEntry.photoDataUrl}
              alt={todayColor.name}
              className="w-full aspect-[4/5] object-cover max-h-[min(60vh,560px)] mx-auto"
            />
          ) : (
            <div
              className="w-full aspect-[4/5] max-h-[min(60vh,560px)]"
              style={{ backgroundColor: todayColor.hex }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
