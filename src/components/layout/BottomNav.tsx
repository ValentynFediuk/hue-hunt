import { NavLink } from 'react-router-dom';
import { Clock3, Compass, Settings, Sparkles } from 'lucide-react';

const items: {
  to: string;
  label: string;
  icon: typeof Compass;
  end?: boolean;
}[] = [
  { to: '/', label: 'Today', icon: Compass, end: true },
  { to: '/collection', label: 'Collection', icon: Sparkles },
  { to: '/history', label: 'History', icon: Clock3 },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export function BottomNav() {
  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-40 border-t border-black/5 dark:border-white/10 bg-[color-mix(in_srgb,var(--color-canvas)_88%,transparent)] dark:bg-[color-mix(in_srgb,var(--color-canvas-dark)_88%,transparent)] backdrop-blur-xl safe-pb"
      aria-label="Main"
    >
      <ul className="grid grid-cols-4 h-[64px] px-1">
        {items.map(({ to, label, icon: Icon, end }) => (
          <li key={to} className="min-w-0">
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                [
                  'flex flex-col items-center justify-center gap-1 h-full rounded-xl mx-0.5 transition-colors',
                  isActive
                    ? 'text-zinc-900 dark:text-white'
                    : 'text-zinc-400 dark:text-zinc-500',
                ].join(' ')
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={[
                      'flex items-center justify-center w-10 h-8 rounded-full transition-colors',
                      isActive ? 'bg-zinc-900/8 dark:bg-white/10' : '',
                    ].join(' ')}
                  >
                    <Icon
                      className="w-[22px] h-[22px]"
                      strokeWidth={isActive ? 2.25 : 1.75}
                    />
                  </span>
                  <span className="text-[11px] font-medium tracking-wide">{label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
