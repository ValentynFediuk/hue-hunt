import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function PrivacyPage() {
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
        <h1 className="text-xl font-semibold tracking-tight">Privacy Policy</h1>
      </header>

      <article className="prose-sm space-y-4 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
        <p className="text-xs text-zinc-500">Last updated: September 7, 2026</p>
        <p>
          Hue Hunt is designed to work without accounts and without sending your
          personal content to a server.
        </p>
        <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50 pt-2">
          What we collect
        </h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>No account is required.</li>
          <li>No email address or phone number is required.</li>
          <li>
            Photos you choose for a hunt stay on your device (local storage). They
            are not uploaded to a Hue Hunt server.
          </li>
          <li>
            App preferences (theme, onboarding status) and hunt history are stored
            locally on your device.
          </li>
        </ul>
        <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50 pt-2">
          Analytics
        </h2>
        <p>
          This prototype does not send analytics to third parties. Events are logged
          only in development builds for debugging. If analytics (for example
          Firebase Analytics) are added in a future release, this policy will be
          updated before those services are enabled.
        </p>
        <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50 pt-2">
          Deleting your data
        </h2>
        <p>
          You can delete all local application data at any time from Settings →
          Reset all data.
        </p>
        <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50 pt-2">
          Children
        </h2>
        <p>
          Hue Hunt is a general-audience creative activity app. It does not knowingly
          collect personal information from children.
        </p>
        <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50 pt-2">
          Contact
        </h2>
        <p>
          For privacy questions about a production release, contact the publisher
          listed on the Google Play store listing.
        </p>
      </article>
    </div>
  );
}
