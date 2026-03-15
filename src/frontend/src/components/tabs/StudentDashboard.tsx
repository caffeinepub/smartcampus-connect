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
}

const subNavItems: SubNav[] = [
  { id: "academic", label: "Academic Roadmaps", icon: GraduationCap },
  { id: "exam-hub", label: "Competitive Exam Hub", icon: Trophy },
  { id: "goals", label: "Goals & Notifications", icon: Target },
  { id: "teams", label: "Skill-Based Teams", icon: Users },
  { id: "marketplace", label: "Marketplace", icon: ShoppingBag },
  { id: "feedback", label: "Anti-Trap Feedback", icon: ShieldAlert },
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

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "var(--student-bg)" }}
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

        {/* Horizontal Top Tab Navigation */}
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
                    color: isActive
                      ? "var(--student-primary)"
                      : "var(--student-muted)",
                    borderBottomColor: isActive
                      ? "var(--student-primary)"
                      : "transparent",
                    background: isActive
                      ? "var(--student-accent-subtle)"
                      : "transparent",
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

      {/* Main Content */}
      <main className="flex-1">
        <div key={activeSection} className="animate-fade-in-up">
          <ActiveSubComponent />
        </div>
      </main>
    </div>
  );
}
