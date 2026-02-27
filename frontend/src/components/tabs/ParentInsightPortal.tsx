import { useState } from 'react';
import { BookOpen, Users, Building2, Printer, HeartHandshake, ShieldCheck } from 'lucide-react';
import StudentGrowthActivityReport from './parent-insight-portal/StudentGrowthActivityReport';
import FacultyTeachingTransparency from './parent-insight-portal/FacultyTeachingTransparency';
import InstituteDevelopmentEnvironmentReport from './parent-insight-portal/InstituteDevelopmentEnvironmentReport';
import MonthlyParentConnectPanel from './parent-insight-portal/MonthlyParentConnectPanel';

type SubSection = 'student-growth' | 'faculty-transparency' | 'institute-development';

interface SubNav {
  id: SubSection;
  label: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  emoji: string;
}

const subNavItems: SubNav[] = [
  { id: 'student-growth', label: 'Student Growth & Activity Report', shortLabel: 'Student Growth', icon: BookOpen, emoji: '📘' },
  { id: 'faculty-transparency', label: 'Faculty & Teaching Transparency', shortLabel: 'Faculty', icon: Users, emoji: '👩‍🏫' },
  { id: 'institute-development', label: 'Institute Development & Environment Report', shortLabel: 'Institute', icon: Building2, emoji: '🏛' },
];

const subComponents: Record<SubSection, React.ComponentType> = {
  'student-growth': StudentGrowthActivityReport,
  'faculty-transparency': FacultyTeachingTransparency,
  'institute-development': InstituteDevelopmentEnvironmentReport,
};

export default function ParentInsightPortal() {
  const [activeSection, setActiveSection] = useState<SubSection>('student-growth');

  const ActiveSubComponent = subComponents[activeSection];

  return (
    <div className="parent-portal-theme min-h-screen" style={{ background: 'var(--parent-bg)' }}>
      {/* Portal Header */}
      <div
        className="no-print"
        style={{ background: 'var(--parent-header)', borderBottom: '1px solid var(--parent-border)' }}
      >
        <div className="max-w-[1400px] mx-auto px-6 py-5">
          <div className="flex items-center gap-4 flex-wrap">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, var(--parent-primary) 0%, var(--parent-primary-dark) 100%)' }}
            >
              <HeartHandshake className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-display font-bold tracking-tight" style={{ color: 'var(--parent-heading)' }}>
                Parent Insight Portal
              </h1>
              <p className="text-xs mt-0.5" style={{ color: 'var(--parent-muted)' }}>
                Transparent Smart Education Window · Academic Year 2025–26
              </p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: 'var(--parent-badge-bg)', color: 'var(--parent-primary)' }}>
                <ShieldCheck className="w-3.5 h-3.5" />
                SECURE PORTAL
              </div>
              <button
                onClick={() => window.print()}
                className="print-btn flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:opacity-90 cursor-pointer"
                style={{ background: 'var(--parent-primary)', color: 'white' }}
                title="Print / Download Monthly Report"
              >
                <Printer className="w-4 h-4" />
                <span className="hidden sm:inline">Print Report</span>
              </button>
            </div>
          </div>
        </div>

        {/* Sub Navigation */}
        <div className="max-w-[1400px] mx-auto px-6">
          <nav className="parent-subnav flex overflow-x-auto scrollbar-none gap-0">
            {subNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className="relative flex items-center gap-2 px-5 py-3.5 text-sm font-medium whitespace-nowrap transition-all duration-200 cursor-pointer"
                  style={{
                    color: isActive ? 'var(--parent-primary)' : 'var(--parent-muted)',
                    borderBottom: isActive ? '2px solid var(--parent-primary)' : '2px solid transparent',
                    background: isActive ? 'var(--parent-accent-subtle)' : 'transparent',
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

      {/* Persistent Monthly Parent Connect Panel */}
      <MonthlyParentConnectPanel />
    </div>
  );
}
