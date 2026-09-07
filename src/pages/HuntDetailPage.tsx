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
      <div className="safe-pt safe-px px-5 min-h-full flex flex-col items-center justify-center gap-4 text-center site-container">
        <p>Hunt not found.</p>
        <Button onClick={() => navigate('/history')}>Back to history</Button>
      </div>
    );
  }

  return (
    <div className="safe-pt safe-px px-5 lg:px-0 pb-10 lg:pb-16 min-h-full">
      <div className="site-container lg:pt-8 lg:max-w-xl flex flex-col min-h-full">
      <header className="flex items-center gap-3 pt-2 pb-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="w-11 h-11 rounded-full flex items-center justify-center bg-zinc-900/5 dark:bg-white/8"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <p className="text-xs text-zinc-500">{formatLongDate(hunt.dateKey)}</p>
          <h1 className="text-lg font-semibold tracking-tight">{hunt.colorName}</h1>
        </div>
      </header>

      <div className="rounded-[28px] overflow-hidden ring-1 ring-black/5 dark:ring-white/10 animate-fade-up">
        {hunt.photoDataUrl ? (
          <img
            src={hunt.photoDataUrl}
            alt={hunt.colorName}
            className="w-full aspect-[4/5] object-cover"
          />
        ) : (
          <div
            className="w-full aspect-[4/5]"
            style={{ backgroundColor: hunt.colorHex }}
          />
        )}
      </div>

      <div className="mt-5 flex items-center gap-3">
        <span
          className="w-12 h-12 rounded-2xl ring-1 ring-black/10"
          style={{ backgroundColor: hunt.colorHex }}
        />
        <div>
          <p className="font-medium">{hunt.colorName}</p>
          <p className="text-sm text-zinc-500">{hunt.colorHex}</p>
        </div>
      </div>

      {hunt.isDemo && (
        <p className="mt-4 text-sm text-zinc-500 rounded-2xl bg-zinc-900/5 dark:bg-white/8 px-4 py-3">
          Demo content — sample colors to show how your collection will look.
        </p>
      )}

      <div className="mt-auto pt-8">
        <Button fullWidth variant="secondary" onClick={() => navigate('/collection')}>
          View collection
        </Button>
      </div>
      </div>
    </div>
  );
}
