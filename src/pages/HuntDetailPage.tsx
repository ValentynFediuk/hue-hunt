import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { formatLongDate } from '@/lib/dates';
import { Button } from '@/components/ui/Button';

export function HuntDetailPage() {
  const { dateKey = '' } = useParams();
  const navigate = useNavigate();
  const { getHuntByDate } = useApp();
  const hunt = getHuntByDate(dateKey);

  if (!hunt) {
    return (
      <div className="safe-pt min-h-full flex flex-col items-center justify-center gap-4 text-center site-container py-20">
        <p>Hunt not found.</p>
        <Button onClick={() => navigate('/history')}>Back to history</Button>
      </div>
    );
  }

  return (
    <div className="safe-pt pb-10 lg:pb-16 min-h-full">
      <div className="site-container pt-2 lg:pt-10">
        <header className="flex items-center gap-3 pb-4 lg:pb-8">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-11 h-11 rounded-full flex items-center justify-center bg-zinc-900/5 dark:bg-white/8"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <p className="text-xs lg:text-sm text-zinc-500">{formatLongDate(hunt.dateKey)}</p>
            <h1 className="text-lg lg:text-3xl font-semibold tracking-tight">
              {hunt.colorName}
            </h1>
          </div>
        </header>

        <div className="animate-fade-up lg:grid lg:grid-cols-2 lg:gap-12 lg:items-start max-w-5xl">
          <div className="rounded-[28px] overflow-hidden ring-1 ring-black/5 dark:ring-white/10">
            {hunt.photoDataUrl ? (
              <img
                src={hunt.photoDataUrl}
                alt={hunt.colorName}
                className="w-full aspect-[4/5] object-cover max-h-[min(70vh,640px)]"
              />
            ) : (
              <div
                className="w-full aspect-[4/5] max-h-[min(70vh,640px)]"
                style={{ backgroundColor: hunt.colorHex }}
              />
            )}
          </div>

          <div className="mt-5 lg:mt-0 flex flex-col">
            <div className="flex items-center gap-3">
              <span
                className="w-12 h-12 lg:w-16 lg:h-16 rounded-2xl ring-1 ring-black/10"
                style={{ backgroundColor: hunt.colorHex }}
              />
              <div>
                <p className="font-medium lg:text-xl">{hunt.colorName}</p>
                <p className="text-sm text-zinc-500">{hunt.colorHex}</p>
              </div>
            </div>

            {hunt.isDemo && (
              <p className="mt-4 text-sm text-zinc-500 rounded-2xl bg-zinc-900/5 dark:bg-white/8 px-4 py-3">
                Demo content — sample colors to show how your collection will look.
              </p>
            )}

            <div className="mt-8 lg:mt-10 space-y-3 lg:max-w-sm">
              <Button fullWidth variant="secondary" onClick={() => navigate('/collection')}>
                View collection
              </Button>
              <Button fullWidth variant="ghost" onClick={() => navigate('/history')}>
                Back to history
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
