import type { ReactNode } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import { useApp } from '@/context/AppContext';
import { HomePage } from '@/pages/HomePage';
import { HuntPage } from '@/pages/HuntPage';
import { CompletePage } from '@/pages/CompletePage';
import { CollectionPage } from '@/pages/CollectionPage';
import { HistoryPage } from '@/pages/HistoryPage';
import { HuntDetailPage } from '@/pages/HuntDetailPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { OnboardingPage } from '@/pages/OnboardingPage';
import { PrivacyPage } from '@/pages/PrivacyPage';
import { TermsPage } from '@/pages/TermsPage';

function RequireOnboarding({ children }: { children: ReactNode }) {
  const { ready, state } = useApp();
  if (!ready) {
    return (
      <div className="min-h-dvh flex items-center justify-center bg-[var(--color-canvas)] dark:bg-[var(--color-canvas-dark)]">
        <div className="w-10 h-10 rounded-2xl animate-shimmer bg-zinc-300 dark:bg-zinc-700" />
      </div>
    );
  }
  if (!state.settings.onboardingCompleted) {
    return <Navigate to="/onboarding" replace />;
  }
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route
        element={
          <RequireOnboarding>
            <AppShell />
          </RequireOnboarding>
        }
      >
        <Route index element={<HomePage />} />
        <Route path="hunt" element={<HuntPage />} />
        <Route path="complete" element={<CompletePage />} />
        <Route path="collection" element={<CollectionPage />} />
        <Route path="history" element={<HistoryPage />} />
        <Route path="history/:dateKey" element={<HuntDetailPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="privacy" element={<PrivacyPage />} />
        <Route path="terms" element={<TermsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
