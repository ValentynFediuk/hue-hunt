import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function TermsPage() {
  return (
    <div className="safe-pt safe-px px-5 pb-12 min-h-full page-narrow lg:py-10">
      <header className="flex items-center gap-3 pt-2 pb-6">
        <Link
          to="/settings"
          className="w-11 h-11 rounded-full flex items-center justify-center bg-zinc-900/5 dark:bg-white/8"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-xl font-semibold tracking-tight">Terms of Use</h1>
      </header>

      <article className="space-y-4 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
        <p className="text-xs text-zinc-500">Last updated: September 7, 2026</p>
        <p>
          Hue Hunt is provided as a personal creative tool. By using the app you
          agree to these simple terms.
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Use the app for lawful, personal, non-commercial enjoyment.</li>
          <li>
            You are responsible for photos you capture. Only photograph subjects you
            have the right to capture.
          </li>
          <li>
            The app stores data locally. Clearing app storage or using Reset all data
            permanently removes your collection on that device.
          </li>
          <li>
            The service is provided “as is” without warranties of uninterrupted
            availability.
          </li>
          <li>
            Hue Hunt does not involve gambling, betting, cash prizes, or financial
            products.
          </li>
        </ul>
      </article>
    </div>
  );
}
