import { useState, createContext, useContext } from 'react';
import { ThemeProvider } from 'next-themes';
import Navbar from './components/Navbar';
import StudentDashboard from './components/tabs/StudentDashboard';
import FacultyIntelligenceHub from './components/tabs/FacultyIntelligenceHub';
import InstituteCommandCenter from './components/tabs/InstituteCommandCenter';
import ParentInsightPortal from './components/tabs/ParentInsightPortal';
import RoleSelectionLanding from './components/RoleSelectionLanding';
import RoleLoginPage from './components/RoleLoginPage';
import { AuthProvider, useAuth, type UserRole } from './contexts/AuthContext';

export type TabId =
  | 'student-dashboard'
  | 'faculty-hub'
  | 'institute-command'
  | 'parent-insight-portal';

interface TabContextType {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
}

export const TabContext = createContext<TabContextType>({
  activeTab: 'student-dashboard',
  setActiveTab: () => {},
});

export const useTab = () => useContext(TabContext);

const roleToTab: Record<UserRole, TabId> = {
  student: 'student-dashboard',
  teacher: 'faculty-hub',
  institute: 'institute-command',
  parent: 'parent-insight-portal',
};

const tabComponents: Record<TabId, React.ComponentType> = {
  'student-dashboard': StudentDashboard,
  'faculty-hub': FacultyIntelligenceHub,
  'institute-command': InstituteCommandCenter,
  'parent-insight-portal': ParentInsightPortal,
};

type AppView = 'landing' | 'login' | 'dashboard';

function AppInner() {
  const { currentRole, login, logout } = useAuth();
  const [pendingRole, setPendingRole] = useState<UserRole | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>('student-dashboard');

  // Determine current view
  let view: AppView = 'landing';
  if (currentRole) {
    view = 'dashboard';
  } else if (pendingRole) {
    view = 'login';
  }

  const handleSelectRole = (role: UserRole) => {
    setPendingRole(role);
  };

  const handleLogin = (role: UserRole) => {
    login(role);
    setActiveTab(roleToTab[role]);
    setPendingRole(null);
  };

  const handleBack = () => {
    setPendingRole(null);
  };

  const handleLogout = () => {
    logout();
    setPendingRole(null);
  };

  // Landing page
  if (view === 'landing') {
    return (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <RoleSelectionLanding onSelectRole={handleSelectRole} />
      </ThemeProvider>
    );
  }

  // Login page for selected role
  if (view === 'login' && pendingRole) {
    return (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <RoleLoginPage
          role={pendingRole}
          onLogin={handleLogin}
          onBack={handleBack}
        />
      </ThemeProvider>
    );
  }

  // Dashboard (authenticated)
  const tabForRole = currentRole ? roleToTab[currentRole] : activeTab;
  const effectiveTab = tabForRole;
  const ActiveComponent = tabComponents[effectiveTab];

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <TabContext.Provider value={{ activeTab: effectiveTab, setActiveTab }}>
        <div className="min-h-screen bg-background text-foreground">
          <Navbar onLogout={handleLogout} />
          <main className="pt-[72px]">
            <div key={effectiveTab} className="animate-fade-in-up">
              <ActiveComponent />
            </div>
          </main>
          <footer className="border-t border-border bg-card mt-16">
            <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <img
                  src="/assets/generated/logo-smartcampus.dim_320x64.png"
                  alt="SmartCampus Connect"
                  className="h-7 w-auto opacity-80"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </div>
              <p className="text-sm text-muted-foreground text-center">
                © {new Date().getFullYear()} EduManage. All rights reserved.
              </p>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                Built with{' '}
                <span className="text-red-500">♥</span>{' '}
                using{' '}
                <a
                  href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'edumanage')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline font-medium"
                  style={{ color: 'var(--student-primary)' }}
                >
                  caffeine.ai
                </a>
              </p>
            </div>
          </footer>
        </div>
      </TabContext.Provider>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  );
}
