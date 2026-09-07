import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, ImagePlus, Loader2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/Button';
import { ColorSwatch } from '@/components/ColorSwatch';
import { compressImageFile } from '@/lib/image';
import { trackEvent } from '@/lib/analytics';

export function HuntPage() {
  const navigate = useNavigate();
  const { todayColor, isTodayComplete, completeHunt } = useApp();
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (isTodayComplete) {
    return (
      <div className="safe-pt safe-px px-5 min-h-full flex flex-col justify-center items-center text-center gap-4 page-narrow lg:py-20">
        <p className="text-lg font-medium">You’ve already completed today’s hunt.</p>
        <Button onClick={() => navigate('/')}>Back home</Button>
      </div>
    );
  }

  const onFile = async (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please choose an image file.');
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const dataUrl = await compressImageFile(file);
      setPreview(dataUrl);
      trackEvent('photo_added', { color: todayColor.id });
    } catch {
      setError('Could not process that photo. Try another one.');
    } finally {
      setBusy(false);
    }
  };

  const finish = (photo: string | null) => {
    const result = completeHunt(photo);
    if (!result.ok) {
      setError(result.error ?? 'Could not complete hunt.');
      return;
    }
    navigate('/complete', {
      state: {
        photoSaved: result.photoSaved,
        entryDateKey: result.entry?.dateKey,
      },
      replace: true,
    });
  };

  return (
    <div className="safe-pt safe-px px-5 pb-8 min-h-full flex flex-col page-flow lg:py-12">
      <header className="flex items-center gap-3 pt-2 pb-4 lg:pb-8">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="w-11 h-11 rounded-full flex items-center justify-center bg-zinc-900/5 dark:bg-white/8"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">Hunt</p>
          <h1 className="text-lg lg:text-2xl font-semibold tracking-tight truncate">
            {todayColor.name}
          </h1>
        </div>
      </header>

      {!preview ? (
        <div className="animate-fade-up flex-1 flex flex-col lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
          <ColorSwatch hex={todayColor.hex} size="hero" className="mb-6 lg:mb-0" />
          <div className="flex flex-col flex-1 lg:flex-none">
            <p className="text-[15px] lg:text-lg leading-relaxed text-zinc-600 dark:text-zinc-300 text-balance">
              {todayColor.description} {todayColor.hint}
            </p>
            <p className="mt-3 text-sm text-zinc-400 tabular-nums">{todayColor.hex}</p>

            <div className="mt-auto lg:mt-10 pt-8 space-y-3 lg:max-w-sm">
              {error && (
                <p className="text-sm text-red-600 dark:text-red-400 text-center lg:text-left">
                  {error}
                </p>
              )}
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                capture="environment"
                className="sr-only"
                onChange={(e) => void onFile(e.target.files?.[0])}
              />
              <Button
                fullWidth
                size="lg"
                disabled={busy}
                onClick={() => inputRef.current?.click()}
              >
                {busy ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Processing…
                  </>
                ) : (
                  <>
                    <Camera className="w-5 h-5" /> Add a photo
                  </>
                )}
              </Button>
              <Button
                fullWidth
                variant="secondary"
                disabled={busy}
                onClick={() => finish(null)}
              >
                Complete without photo
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="animate-scale-in flex-1 flex flex-col lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
          <div className="relative overflow-hidden rounded-[28px] ring-1 ring-black/5 dark:ring-white/10 bg-zinc-100 dark:bg-zinc-900">
            <img
              src={preview}
              alt="Selected find"
              className="w-full aspect-[4/5] object-cover max-h-[min(60vh,560px)] mx-auto"
            />
            <div
              className="absolute bottom-4 left-4 w-12 h-12 rounded-2xl ring-2 ring-white/80 shadow-lg"
              style={{ backgroundColor: todayColor.hex }}
            />
          </div>
          <div className="flex flex-col flex-1 lg:flex-none pt-4 lg:pt-0">
            <p className="text-sm lg:text-base text-zinc-500 lg:text-zinc-600 dark:lg:text-zinc-300 text-center lg:text-left">
              Looking good — use this photo for {todayColor.name}?
            </p>
            {error && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400 text-center lg:text-left">
                {error}
              </p>
            )}
            <div className="mt-auto lg:mt-10 pt-6 space-y-3 lg:max-w-sm">
              <Button fullWidth size="lg" onClick={() => finish(preview)}>
                Use this photo
              </Button>
              <Button
                fullWidth
                variant="secondary"
                onClick={() => {
                  setPreview(null);
                  if (inputRef.current) inputRef.current.value = '';
                  inputRef.current?.click();
                }}
              >
                <ImagePlus className="w-4 h-4" /> Choose another
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
