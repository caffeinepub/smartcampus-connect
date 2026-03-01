import { useState } from 'react';
import {
  GraduationCap,
  Trophy,
  Target,
  Users,
  ShoppingBag,
  ShieldAlert,
} from 'lucide-react';
import AcademicRoadmaps from './AcademicRoadmaps';
import CompetitiveExamHub from './CompetitiveExamHub';
import SmartNotifications from './SmartNotifications';
import SkillBasedTeams from './SkillBasedTeams';
import SustainableMarketplace from './SustainableMarketplace';
import AntiTrapFeedback from './AntiTrapFeedback';

type SubSection =
  | 'academic'
  | 'exam-hub'
  | 'goals'
  | 'teams'
  | 'marketplace'
  | 'feedback';

interface SubNav {
  id: SubSection;
  label: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
}

const subNavItems: SubNav[] = [
  { id: 'academic', label: 'Personalized Academic Roadmaps', shortLabel: 'Academic', icon: GraduationCap },
  { id: 'exam-hub', label: 'Competitive Exam Hub', shortLabel: 'Exam Hub', icon: Trophy },
  { id: 'goals', label: 'Smart Goals & Notifications', shortLabel: 'Goals', icon: Target },
  { id: 'teams', label: 'Skill-Based Team Selection', shortLabel: 'Teams', icon: Users },
  { id: 'marketplace', label: 'Sustainable Marketplace', shortLabel: 'Marketplace', icon: ShoppingBag },
  { id: 'feedback', label: 'Anti-Trap Feedback', shortLabel: 'Feedback', icon: ShieldAlert },
];

const subComponents: Record<SubSection, React.ComponentType> = {
  academic: AcademicRoadmaps,
  'exam-hub': CompetitiveExamHub,
  goals: SmartNotifications,
  teams: SkillBasedTeams,
  marketplace: SustainableMarketplace,
  feedback: AntiTrapFeedback,
};

export default function StudentDashboard() {
  const [activeSection, setActiveSection] = useState<SubSection>('academic');

  const ActiveSubComponent = subComponents[activeSection];

  return (
    <div className="min-h-screen" style={{ background: 'var(--student-bg)' }}>
      {/* Dashboard Header */}
      <div style={{ background: 'var(--student-header)', borderBottom: '1px solid var(--student-border)' }}>
        <div className="max-w-[1400px] mx-auto px-6 py-5">
          <div className="flex items-center gap-4 flex-wrap">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, var(--student-primary) 0%, var(--student-primary-dark) 100%)' }}
            >
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h1
                className="text-xl font-display font-bold tracking-tight"
                style={{ color: 'var(--student-heading)' }}
              >
                Student Dashboard
              </h1>
              <p className="text-xs mt-0.5" style={{ color: 'var(--student-muted)' }}>
                Smart Learning & Growth Portal · Academic Year 2025–26
              </p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <div
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                style={{ background: 'var(--student-badge-bg)', color: 'var(--student-primary)' }}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                STUDENT PORTAL
              </div>
            </div>
          </div>
        </div>

        {/* Sub Navigation */}
        <div className="max-w-[1400px] mx-auto px-6">
          <nav className="flex overflow-x-auto scrollbar-none gap-0">
            {subNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className="relative flex items-center gap-2 px-5 py-3.5 text-sm font-medium whitespace-nowrap transition-all duration-200 cursor-pointer"
                  style={{
                    color: isActive ? 'var(--student-primary)' : 'var(--student-muted)',
                    borderBottom: isActive
                      ? '2px solid var(--student-primary)'
                      : '2px solid transparent',
                    background: isActive ? 'var(--student-accent-subtle)' : 'transparent',
                  }}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="hidden md:block">{item.label}</span>
                  <span className="md:hidden">{item.shortLabel}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Sub Section Content */}
      <div key={activeSection} className="animate-fade-in-up">
        <ActiveSubComponent />
      </div>
    </div>
  );
}
