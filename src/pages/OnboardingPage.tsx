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
    <div className="min-h-dvh w-full bg-[var(--color-canvas)] dark:bg-[var(--color-canvas-dark)] text-zinc-900 dark:text-zinc-50">
      <div className="site-container safe-pt safe-pb min-h-dvh flex flex-col lg:justify-center lg:py-16">
        <div className="flex justify-between items-center pt-3 lg:pt-0 px-1">
          <p className="text-sm font-semibold tracking-tight hidden sm:block">Hue Hunt</p>
          <button
            type="button"
            className="text-sm text-zinc-500 font-medium px-2 py-2 ml-auto"
            onClick={() => finish(true)}
          >
            Skip
          </button>
        </div>

        <div
          className="flex-1 flex flex-col justify-center py-6 lg:py-10 lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center animate-fade-up"
          key={index}
        >
          <div
            className="w-full aspect-square max-h-[42vh] lg:max-h-none lg:aspect-[4/5] rounded-[36px] lg:rounded-[40px] mb-10 lg:mb-0 shadow-[var(--shadow-soft)]"
            style={{
              background: `linear-gradient(145deg, ${slide.accent}, ${slide.accent}88)`,
            }}
          />
          <div className="max-w-lg lg:max-w-none">
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500 mb-3 hidden lg:block">
              Welcome · {index + 1} of {slides.length}
            </p>
            <h1 className="text-[1.85rem] lg:text-4xl xl:text-5xl leading-tight font-semibold tracking-tight text-balance">
              {slide.title}
            </h1>
            <p className="mt-4 lg:mt-6 text-[15px] lg:text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 text-balance">
              {slide.body}
            </p>

            <div className="flex items-center justify-center lg:justify-start gap-2 py-6 lg:pt-10 lg:pb-8">
              {slides.map((_, i) => (
                <span
                  key={i}
                  className={[
                    'h-1.5 rounded-full transition-all',
                    i === index
                      ? 'w-6 bg-zinc-900 dark:bg-white'
                      : 'w-1.5 bg-zinc-300 dark:bg-zinc-700',
                  ].join(' ')}
                />
              ))}
            </div>

            <div className="lg:max-w-xs">
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
          </div>
        </div>
      </div>
    </div>
  );
}
