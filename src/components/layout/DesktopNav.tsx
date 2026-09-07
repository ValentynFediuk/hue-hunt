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

export function DesktopNav() {
  return (
    <header className="hidden lg:block sticky top-0 z-40 border-b border-black/5 dark:border-white/10 bg-[color-mix(in_srgb,var(--color-canvas)_92%,transparent)] dark:bg-[color-mix(in_srgb,var(--color-canvas-dark)_92%,transparent)] backdrop-blur-xl">
      <div className="site-container flex items-center justify-between h-16 gap-6">
        <NavLink to="/" className="flex items-baseline gap-2 shrink-0 group">
          <span className="text-lg font-semibold tracking-tight">Hue Hunt</span>
          <span className="text-xs text-zinc-500 dark:text-zinc-400 hidden xl:inline group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
            Find today&apos;s color.
          </span>
        </NavLink>

        <nav aria-label="Main" className="flex-1 flex justify-center">
          <ul className="flex items-center gap-1 rounded-full p-1 bg-zinc-900/5 dark:bg-white/8">
            {items.map(({ to, label, icon: Icon, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    [
                      'flex items-center gap-2 h-9 px-4 rounded-full text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm'
                        : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200',
                    ].join(' ')
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        className="w-4 h-4"
                        strokeWidth={isActive ? 2.25 : 1.75}
                        aria-hidden
                      />
                      {label}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <p className="text-xs text-zinc-400 dark:text-zinc-500 shrink-0 hidden xl:block tabular-nums">
          Web · later Android
        </p>
      </div>
    </header>
  );
}
