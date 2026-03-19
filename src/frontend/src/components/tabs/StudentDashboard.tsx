import {
  GraduationCap,
  ShieldAlert,
  ShoppingBag,
  Target,
  Trophy,
  Users,
} from "lucide-react";
import { useState } from "react";
import AcademicRoadmaps from "./AcademicRoadmaps";
import AntiTrapFeedback from "./AntiTrapFeedback";
import CompetitiveExamHub from "./CompetitiveExamHub";
import SkillBasedTeams from "./SkillBasedTeams";
import SmartNotifications from "./SmartNotifications";
import SustainableMarketplace from "./SustainableMarketplace";

type SubSection =
  | "academic"
  | "exam-hub"
  | "goals"
  | "teams"
  | "marketplace"
  | "feedback";

interface SubNav {
  id: SubSection;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  moduleColor: string;
  moduleBg: string;
}

// Per-module accent colors matching semantic system
const subNavItems: SubNav[] = [
  {
    id: "academic",
    label: "Academic Roadmaps",
    icon: GraduationCap,
    moduleColor: "oklch(0.52 0.18 165)",
    moduleBg: "oklch(0.92 0.07 165 / 0.5)",
  },
  {
    id: "exam-hub",
    label: "Competitive Exam Hub",
    icon: Trophy,
    moduleColor: "oklch(0.62 0.18 55)",
    moduleBg: "oklch(0.95 0.06 60 / 0.5)",
  },
  {
    id: "goals",
    label: "Goals & Notifications",
    icon: Target,
    moduleColor: "oklch(0.55 0.22 290)",
    moduleBg: "oklch(0.93 0.06 290 / 0.5)",
  },
  {
    id: "teams",
    label: "Skill-Based Teams",
    icon: Users,
    moduleColor: "oklch(0.6 0.18 220)",
    moduleBg: "oklch(0.93 0.06 220 / 0.5)",
  },
  {
    id: "marketplace",
    label: "Marketplace",
    icon: ShoppingBag,
    moduleColor: "oklch(0.6 0.2 20)",
    moduleBg: "oklch(0.95 0.05 20 / 0.5)",
  },
  {
    id: "feedback",
    label: "Anti-Trap Feedback",
    icon: ShieldAlert,
    moduleColor: "oklch(0.58 0.22 27)",
    moduleBg: "oklch(0.95 0.04 27 / 0.5)",
  },
];

const subComponents: Record<SubSection, React.ComponentType> = {
  academic: AcademicRoadmaps,
  "exam-hub": CompetitiveExamHub,
  goals: SmartNotifications,
  teams: SkillBasedTeams,
  marketplace: SustainableMarketplace,
  feedback: AntiTrapFeedback,
};

export default function StudentDashboard() {
  const [activeSection, setActiveSection] = useState<SubSection>("academic");

  const ActiveSubComponent = subComponents[activeSection];
  const activeNav = subNavItems.find((n) => n.id === activeSection)!;

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background:
          "linear-gradient(160deg, var(--student-bg) 0%, oklch(0.90 0.07 175) 50%, var(--student-bg) 100%)",
      }}
    >
      {/* Dashboard Header */}
      <div
        style={{
          background: "var(--student-header)",
          borderBottom: "1px solid var(--student-border)",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 py-5">
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0"
              style={{
                background:
                  "linear-gradient(135deg, var(--student-primary) 0%, var(--student-primary-dark) 100%)",
              }}
            >
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h1
                className="text-xl font-display font-bold tracking-tight"
                style={{ color: "var(--student-heading)" }}
              >
                Student Dashboard
              </h1>
              <p
                className="text-xs mt-0.5"
                style={{ color: "var(--student-muted)" }}
              >
                Smart Learning & Growth Portal · Academic Year 2025–26
              </p>
            </div>
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{
                background: "var(--student-badge-bg)",
                color: "var(--student-primary)",
              }}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              STUDENT PORTAL
            </div>
          </div>
        </div>

        {/* Horizontal Top Tab Navigation — per-module accent colors */}
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-end gap-1 overflow-x-auto scrollbar-none">
            {subNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  data-ocid={`student.${item.id}.tab`}
                  type="button"
                  className="flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-all duration-200 cursor-pointer rounded-t-xl border-b-2"
                  style={{
                    color: isActive ? item.moduleColor : "var(--student-muted)",
                    borderBottomColor: isActive
                      ? item.moduleColor
                      : "transparent",
                    background: isActive ? item.moduleBg : "transparent",
                    boxShadow: isActive
                      ? `0 -1px 8px ${item.moduleColor}30`
                      : "none",
                  }}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Active module color bar */}
      <div
        className="h-1"
        style={{
          background: `linear-gradient(90deg, ${activeNav.moduleColor}, transparent)`,
        }}
      />

      {/* Main Content */}
      <main className="flex-1">
        <div key={activeSection} className="animate-fade-in-up">
          <ActiveSubComponent />
        </div>
      </main>
    </div>
  );
}
