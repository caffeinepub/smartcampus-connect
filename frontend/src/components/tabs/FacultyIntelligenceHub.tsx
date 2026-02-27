import { useState } from 'react';
import {
  Monitor,
  BookOpen,
  BarChart3,
  Network,
  Plug,
  Settings,
  Brain,
  BrainCircuit,
} from 'lucide-react';
import SmartboardTeaching from './faculty-hub/SmartboardTeaching';
import ClassTopicTracking from './faculty-hub/ClassTopicTracking';
import StudentPerformance from './faculty-hub/StudentPerformance';
import FacultyNetworking from './faculty-hub/FacultyNetworking';
import Integrations from './faculty-hub/Integrations';
import AcademicControl from './faculty-hub/AcademicControl';
import AITeachingAssistant from './faculty-hub/AITeachingAssistant';

type SubSection =
  | 'smartboard'
  | 'tracking'
  | 'performance'
  | 'networking'
  | 'integrations'
  | 'control'
  | 'ai-assistant';

interface SubNav {
  id: SubSection;
  label: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const subNavItems: SubNav[] = [
  { id: 'smartboard', label: 'Smartboard Teaching', shortLabel: 'Smartboard', icon: Monitor },
  { id: 'tracking', label: 'Class & Topic Tracking', shortLabel: 'Tracking', icon: BookOpen },
  { id: 'performance', label: 'Student Performance', shortLabel: 'Performance', icon: BarChart3 },
  { id: 'networking', label: 'Faculty Networking', shortLabel: 'Network', icon: Network },
  { id: 'integrations', label: 'Integrations', shortLabel: 'Integrations', icon: Plug },
  { id: 'control', label: 'Academic Control Panel', shortLabel: 'Control', icon: Settings },
  { id: 'ai-assistant', label: 'AI Teaching Assistant', shortLabel: 'AI Assistant', icon: Brain, badge: 'AI' },
];

const subComponents: Record<SubSection, React.ComponentType> = {
  smartboard: SmartboardTeaching,
  tracking: ClassTopicTracking,
  performance: StudentPerformance,
  networking: FacultyNetworking,
  integrations: Integrations,
  control: AcademicControl,
  'ai-assistant': AITeachingAssistant,
};

export default function FacultyIntelligenceHub() {
  const [activeSection, setActiveSection] = useState<SubSection>('smartboard');

  const ActiveSubComponent = subComponents[activeSection];

  return (
    <div className="min-h-screen bg-fhub-bg">
      {/* Hub Header */}
      <div className="bg-fhub-header border-b border-fhub-border">
        <div className="max-w-[1400px] mx-auto px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-fhub-accent flex items-center justify-center shadow-fhub">
              <BrainCircuit className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-display font-bold text-fhub-heading tracking-tight">
                Faculty Intelligence Hub
              </h1>
              <p className="text-xs text-fhub-muted mt-0.5">
                National Smart Education Control System · Academic Year 2025–26
              </p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-fhub-badge-bg text-fhub-accent border border-fhub-accent/30">
                LIVE SYSTEM
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
                  className={`
                    relative flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap
                    transition-all duration-200 border-b-2 cursor-pointer
                    ${isActive
                      ? 'text-fhub-accent border-fhub-accent bg-fhub-accent/5'
                      : 'text-fhub-muted border-transparent hover:text-fhub-heading hover:border-fhub-border'
                    }
                  `}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="hidden sm:block">{item.label}</span>
                  <span className="sm:hidden">{item.shortLabel}</span>
                  {item.badge && (
                    <span className="ml-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-fhub-ai-badge text-white">
                      {item.badge}
                    </span>
                  )}
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
