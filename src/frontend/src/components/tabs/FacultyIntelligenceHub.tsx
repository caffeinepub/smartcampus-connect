import {
  BarChart3,
  BookOpen,
  Brain,
  BrainCircuit,
  Monitor,
  Network,
  Plug,
  Settings,
} from "lucide-react";
import { useState } from "react";
import AITeachingAssistant from "./faculty-hub/AITeachingAssistant";
import AcademicControl from "./faculty-hub/AcademicControl";
import ClassTopicTracking from "./faculty-hub/ClassTopicTracking";
import FacultyNetworking from "./faculty-hub/FacultyNetworking";
import Integrations from "./faculty-hub/Integrations";
import SmartboardTeaching from "./faculty-hub/SmartboardTeaching";
import StudentPerformance from "./faculty-hub/StudentPerformance";

type SubSection =
  | "smartboard"
  | "tracking"
  | "performance"
  | "networking"
  | "integrations"
  | "control"
  | "ai-assistant";

interface SubNav {
  id: SubSection;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const subNavItems: SubNav[] = [
  { id: "smartboard", label: "Smartboard Teaching", icon: Monitor },
  { id: "tracking", label: "Class & Topic Tracking", icon: BookOpen },
  { id: "performance", label: "Student Performance", icon: BarChart3 },
  { id: "networking", label: "Faculty Networking", icon: Network },
  { id: "integrations", label: "Integrations", icon: Plug },
  { id: "control", label: "Academic Control Panel", icon: Settings },
  {
    id: "ai-assistant",
    label: "AI Teaching Assistant",
    icon: Brain,
    badge: "AI",
  },
];

const subComponents: Record<SubSection, React.ComponentType> = {
  smartboard: SmartboardTeaching,
  tracking: ClassTopicTracking,
  performance: StudentPerformance,
  networking: FacultyNetworking,
  integrations: Integrations,
  control: AcademicControl,
  "ai-assistant": AITeachingAssistant,
};

export default function FacultyIntelligenceHub() {
  const [activeSection, setActiveSection] = useState<SubSection>("smartboard");

  const ActiveSubComponent = subComponents[activeSection];

  return (
    <div className="min-h-screen flex flex-col bg-fhub-bg">
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
      </div>

      {/* Body: Sidebar + Content */}
      <div className="flex flex-1 max-w-[1400px] mx-auto w-full">
        {/* Left Sidebar Navigation */}
        <aside className="w-56 flex-shrink-0 flex flex-col py-4 gap-1 bg-fhub-header border-r border-fhub-border">
          {subNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                data-ocid={`faculty.${item.id}.tab`}
                type="button"
                className={`flex items-center gap-3 px-4 py-3 mx-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer text-left ${
                  isActive
                    ? "text-fhub-accent bg-fhub-accent/10 border-l-[3px] border-fhub-accent"
                    : "text-fhub-muted border-l-[3px] border-transparent hover:text-fhub-heading"
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="ml-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-fhub-ai-badge text-white">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <div key={activeSection} className="animate-fade-in-up">
            <ActiveSubComponent />
          </div>
        </main>
      </div>
    </div>
  );
}
