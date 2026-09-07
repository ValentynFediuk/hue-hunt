import { Outlet, useLocation } from 'react-router-dom';
import { BottomNav } from './BottomNav';
import { DesktopNav } from './DesktopNav';
import { useApp } from '@/context/AppContext';

const hideNavPaths = ['/onboarding', '/hunt', '/complete'];

export function AppShell() {
  const { pathname } = useLocation();
  const { storageError, clearStorageError } = useApp();
  const hideNav = hideNavPaths.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );
  const isImmersive = hideNav;

  return (
    <div
      className={[
        'app-shell bg-[var(--color-canvas)] dark:bg-[var(--color-canvas-dark)] text-zinc-900 dark:text-zinc-50 flex flex-col',
        isImmersive ? 'app-shell--immersive' : '',
      ].join(' ')}
    >
      {!hideNav && <DesktopNav />}

      {storageError && (
        <div className="safe-pt safe-px pt-2 site-container w-full">
          <div className="rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-950 dark:text-amber-100 text-sm px-4 py-3 flex gap-3 items-start border border-amber-200/70 dark:border-amber-800/50">
            <p className="flex-1 leading-snug">{storageError}</p>
            <button
              type="button"
              className="text-xs font-semibold underline underline-offset-2"
              onClick={clearStorageError}
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      <main
        className={[
          'flex-1 min-h-0 w-full',
          hideNav ? '' : 'pb-[88px] lg:pb-10',
        ].join(' ')}
      >
        <Outlet />
      </main>

      {!hideNav && <BottomNav />}
    </div>
  );
}
