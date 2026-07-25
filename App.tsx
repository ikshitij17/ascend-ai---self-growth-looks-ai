import { useState } from 'react';
import { AuthProvider, useAuth } from '@/lib/auth';
import { ThemeProvider } from '@/lib/theme';
import { AuthScreen } from '@/screens/AuthScreen';
import { AppShell, type Tab } from '@/components/AppShell';
import { Dashboard } from '@/screens/Dashboard';
import { NexusAI } from '@/components/NexusAI';
import { FaceAnalysis } from '@/screens/FaceAnalysis';
import { BodyAnalysis } from '@/screens/BodyAnalysis';
import { Progress } from '@/screens/Progress';
import { DailyTracker } from '@/screens/DailyTracker';
import { RoutineGenerator } from '@/screens/RoutineGenerator';
import { TipsHub } from '@/screens/TipsHub';
import { Challenges } from '@/screens/Challenges';
import { Community } from '@/screens/Community';
import { Achievements } from '@/screens/Achievements';
import { Settings } from '@/screens/Settings';
import { AdminPanel } from '@/screens/AdminPanel';

function AppContent() {
  const { session, loading } = useAuth();
  const [tab, setTab] = useState<Tab>('dashboard');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
        <div className="flex flex-col items-center gap-3">
          <div className="h-12 w-12 rounded-2xl accent-bg flex items-center justify-center animate-pulse-glow">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <p className="text-sm text-muted">Loading Ascend...</p>
        </div>
      </div>
    );
  }

  if (!session) return <AuthScreen />;

  return (
    <AppShell tab={tab} setTab={setTab}>
      {tab === 'dashboard' && (
        <>
          <Dashboard setTab={setTab} />
          <div className="mt-6">
            <NexusAI />
          </div>
        </>
      )}
      {tab === 'face' && <FaceAnalysis />}
      {tab === 'body' && <BodyAnalysis />}
      {tab === 'progress' && <Progress />}
      {tab === 'tracker' && <DailyTracker />}
      {tab === 'routine' && <RoutineGenerator />}
      {tab === 'tips' && <TipsHub />}
      {tab === 'challenges' && <Challenges />}
      {tab === 'community' && <Community />}
      {tab === 'achievements' && <Achievements />}
      {tab === 'settings' && <Settings setTab={setTab} />}
      {tab === 'admin' && <AdminPanel />}
    </AppShell>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
