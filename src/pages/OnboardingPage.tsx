import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/Button';
import { trackEvent } from '@/lib/analytics';

const slides = [
  {
    title: 'Notice more color.',
    body: 'Ordinary days hide extraordinary hues. Hue Hunt helps you slow down and see them.',
    accent: '#F4C430',
  },
  {
    title: 'Get one color challenge every day.',
    body: 'A single, calm prompt — never a flood of tasks. Find today’s color in the world around you.',
    accent: '#008080',
  },
  {
    title: 'Find it. Capture it. Keep it.',
    body: 'Add a photo if you like, complete the hunt, and grow a personal collection of everyday beauty.',
    accent: '#E2725B',
  },
];

export function OnboardingPage() {
  const [index, setIndex] = useState(0);
  const { completeOnboarding } = useApp();
  const navigate = useNavigate();
  const slide = slides[index]!;

  useEffect(() => {
    trackEvent('onboarding_started');
  }, []);

  const finish = (skipped: boolean) => {
    completeOnboarding(skipped);
    navigate('/', { replace: true });
  };

  return (
    <div className="app-shell bg-[var(--color-canvas)] dark:bg-[var(--color-canvas-dark)] text-zinc-900 dark:text-zinc-50 safe-pt safe-px px-6 pb-10 min-h-dvh flex flex-col">
      <div className="flex justify-end pt-3">
        <button
          type="button"
          className="text-sm text-zinc-500 font-medium px-2 py-2"
          onClick={() => finish(true)}
        >
          Skip
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-center animate-fade-up" key={index}>
        <div
          className="w-full aspect-square max-h-[42vh] rounded-[36px] mb-10 shadow-[var(--shadow-soft)]"
          style={{
            background: `linear-gradient(145deg, ${slide.accent}, ${slide.accent}88)`,
          }}
        />
        <h1 className="text-[1.85rem] leading-tight font-semibold tracking-tight text-balance">
          {slide.title}
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400 text-balance">
          {slide.body}
        </p>
      </div>

      <div className="flex items-center justify-center gap-2 py-6">
        {slides.map((_, i) => (
          <span
            key={i}
            className={[
              'h-1.5 rounded-full transition-all',
              i === index ? 'w-6 bg-zinc-900 dark:bg-white' : 'w-1.5 bg-zinc-300 dark:bg-zinc-700',
            ].join(' ')}
          />
        ))}
      </div>

      {index < slides.length - 1 ? (
        <Button fullWidth size="lg" onClick={() => setIndex((i) => i + 1)}>
          Continue
        </Button>
      ) : (
        <Button fullWidth size="lg" onClick={() => finish(false)}>
          Start hunting
        </Button>
      )}
    </div>
  );
}
