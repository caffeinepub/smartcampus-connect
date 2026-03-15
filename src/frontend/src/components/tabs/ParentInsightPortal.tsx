import {
  BookOpen,
  Building2,
  HeartHandshake,
  Printer,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useState } from "react";
import FacultyTeachingTransparency from "./parent-insight-portal/FacultyTeachingTransparency";
import InstituteDevelopmentEnvironmentReport from "./parent-insight-portal/InstituteDevelopmentEnvironmentReport";
import MonthlyParentConnectPanel from "./parent-insight-portal/MonthlyParentConnectPanel";
import StudentGrowthActivityReport from "./parent-insight-portal/StudentGrowthActivityReport";

type SubSection =
  | "student-growth"
  | "faculty-transparency"
  | "institute-development";

interface SubNav {
  id: SubSection;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const subNavItems: SubNav[] = [
  { id: "student-growth", label: "Student Growth & Activity", icon: BookOpen },
  { id: "faculty-transparency", label: "Faculty & Teaching", icon: Users },
  {
    id: "institute-development",
    label: "Institute Development",
    icon: Building2,
  },
];

const subComponents: Record<SubSection, React.ComponentType> = {
  "student-growth": StudentGrowthActivityReport,
  "faculty-transparency": FacultyTeachingTransparency,
  "institute-development": InstituteDevelopmentEnvironmentReport,
};

export default function ParentInsightPortal() {
  const [activeSection, setActiveSection] =
    useState<SubSection>("student-growth");

  const ActiveSubComponent = subComponents[activeSection];

  return (
    <div
      className="parent-portal-theme min-h-screen flex flex-col"
      style={{ background: "var(--parent-bg)" }}
    >
      {/* Portal Header */}
      <div
        className="no-print"
        style={{
          background: "var(--parent-header)",
          borderBottom: "1px solid var(--parent-border)",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 py-5">
          <div className="flex items-center gap-4 flex-wrap">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0"
              style={{
                background:
                  "linear-gradient(135deg, var(--parent-primary) 0%, var(--parent-primary-dark) 100%)",
              }}
            >
              <HeartHandshake className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h1
                className="text-xl font-display font-bold tracking-tight"
                style={{ color: "var(--parent-heading)" }}
              >
                Parent Insight Portal
              </h1>
              <p
                className="text-xs mt-0.5"
                style={{ color: "var(--parent-muted)" }}
              >
                Transparent Smart Education Window · Academic Year 2025–26
              </p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <div
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                style={{
                  background: "var(--parent-badge-bg)",
                  color: "var(--parent-primary)",
                }}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                SECURE PORTAL
              </div>
              <button
                onClick={() => window.print()}
                type="button"
                className="print-btn flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:opacity-90 cursor-pointer"
                style={{ background: "var(--parent-primary)", color: "white" }}
                title="Print / Download Monthly Report"
              >
                <Printer className="w-4 h-4" />
                <span className="hidden sm:inline">Print Report</span>
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Top Tab Navigation */}
        <div className="max-w-[1400px] mx-auto px-6 no-print">
          <div className="flex items-end gap-1 overflow-x-auto scrollbar-none">
            {subNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  data-ocid={`parent.${item.id}.tab`}
                  type="button"
                  className="flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-all duration-200 cursor-pointer rounded-t-xl border-b-2"
                  style={{
                    color: isActive
                      ? "var(--parent-primary)"
                      : "var(--parent-muted)",
                    borderBottomColor: isActive
                      ? "var(--parent-primary)"
                      : "transparent",
                    background: isActive
                      ? "var(--parent-accent-subtle)"
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
        <MonthlyParentConnectPanel />
      </main>
    </div>
  );
}
