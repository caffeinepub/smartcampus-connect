import { useState } from 'react';
import { BarChart3, Users, GraduationCap, Building2, Shield } from 'lucide-react';
import InstitutionalPerformanceAnalytics from './institute-command/InstitutionalPerformanceAnalytics';
import FacultyStaffOptimization from './institute-command/FacultyStaffOptimization';
import StudentGrowthTransformation from './institute-command/StudentGrowthTransformation';
import InfrastructurePlacementControl from './institute-command/InfrastructurePlacementControl';
import CampusGovernancePanel from './institute-command/CampusGovernancePanel';

type SubSection = 'analytics' | 'faculty' | 'students' | 'infrastructure';

interface SubNav {
  id: SubSection;
  label: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
}

const subNavItems: SubNav[] = [
  { id: 'analytics', label: 'Institutional Performance Analytics', shortLabel: 'Performance', icon: BarChart3 },
  { id: 'faculty', label: 'Faculty & Staff Optimization System', shortLabel: 'Faculty Ops', icon: Users },
  { id: 'students', label: 'Student Growth & Transformation Engine', shortLabel: 'Student Growth', icon: GraduationCap },
  { id: 'infrastructure', label: 'Infrastructure, Technology & Placement Control', shortLabel: 'Infra & Placement', icon: Building2 },
];

const subComponents: Record<SubSection, React.ComponentType> = {
  analytics: InstitutionalPerformanceAnalytics,
  faculty: FacultyStaffOptimization,
  students: StudentGrowthTransformation,
  infrastructure: InfrastructurePlacementControl,
};

export default function InstituteCommandCenter() {
  const [activeSection, setActiveSection] = useState<SubSection>('analytics');

  const ActiveSubComponent = subComponents[activeSection];

  return (
    <div className="iicc-theme min-h-screen" style={{ background: 'var(--iicc-bg)' }}>
      {/* Command Center Header */}
      <div style={{ background: 'var(--iicc-header)', borderBottom: '1px solid var(--iicc-border)' }}>
        <div className="max-w-[1400px] mx-auto px-6 py-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(135deg, var(--iicc-blue) 0%, var(--iicc-blue-dark) 100%)' }}>
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-display font-bold tracking-tight" style={{ color: 'var(--iicc-heading)' }}>
                Institute Intelligence Command Center
              </h1>
              <p className="text-xs mt-0.5" style={{ color: 'var(--iicc-muted)' }}>
                National Smart Education Monitoring Authority · Academic Year 2025–26
              </p>
            </div>
            <div className="ml-auto flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold border" style={{ background: 'var(--iicc-badge-bg)', color: 'var(--iicc-blue)', borderColor: 'var(--iicc-blue)' }}>
                COMMAND ACTIVE
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: 'oklch(0.45 0.15 145 / 0.15)', color: 'oklch(0.45 0.15 145)' }}>
                ● LIVE
              </span>
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
                    color: isActive ? 'var(--iicc-blue)' : 'var(--iicc-muted)',
                    borderBottom: isActive ? '2px solid var(--iicc-blue)' : '2px solid transparent',
                    background: isActive ? 'var(--iicc-blue-subtle)' : 'transparent',
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

      {/* Persistent Campus Governance Panel */}
      <CampusGovernancePanel />
    </div>
  );
}
