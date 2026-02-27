import { useState, createContext, useContext } from 'react';
import { ThemeProvider } from 'next-themes';
import Navbar from './components/Navbar';
import AcademicRoadmaps from './components/tabs/AcademicRoadmaps';
import CompetitiveExamHub from './components/tabs/CompetitiveExamHub';
import SmartNotifications from './components/tabs/SmartNotifications';
import SkillBasedTeams from './components/tabs/SkillBasedTeams';
import SustainableMarketplace from './components/tabs/SustainableMarketplace';
import AntiTrapFeedback from './components/tabs/AntiTrapFeedback';
import FacultyIntelligenceHub from './components/tabs/FacultyIntelligenceHub';
import InstituteCommandCenter from './components/tabs/InstituteCommandCenter';
import ParentInsightPortal from './components/tabs/ParentInsightPortal';

export type TabId =
  | 'academic'
  | 'exams'
  | 'notifications'
  | 'teams'
  | 'marketplace'
  | 'feedback'
  | 'faculty-hub'
  | 'institute-command'
  | 'parent-insight-portal';

interface TabContextType {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
}

export const TabContext = createContext<TabContextType>({
  activeTab: 'academic',
  setActiveTab: () => {},
});

export const useTab = () => useContext(TabContext);

const tabComponents: Record<TabId, React.ComponentType> = {
  academic: AcademicRoadmaps,
  exams: CompetitiveExamHub,
  notifications: SmartNotifications,
  teams: SkillBasedTeams,
  marketplace: SustainableMarketplace,
  feedback: AntiTrapFeedback,
  'faculty-hub': FacultyIntelligenceHub,
  'institute-command': InstituteCommandCenter,
  'parent-insight-portal': ParentInsightPortal,
};

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('academic');

  const ActiveComponent = tabComponents[activeTab];

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <TabContext.Provider value={{ activeTab, setActiveTab }}>
        <div className="min-h-screen bg-background text-foreground">
          <Navbar />
          <main className="pt-[72px]">
            <div key={activeTab} className="animate-fade-in-up">
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
                />
              </div>
              <p className="text-sm text-muted-foreground text-center">
                © {new Date().getFullYear()} SmartCampus Connect. All rights reserved.
              </p>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                Built with{' '}
                <span className="text-red-500">♥</span>{' '}
                using{' '}
                <a
                  href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'smartcampus-connect')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal hover:underline font-medium"
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
