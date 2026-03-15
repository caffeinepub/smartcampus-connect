import {
  BarChart3,
  Building2,
  GraduationCap,
  Shield,
  Upload,
  Users,
} from "lucide-react";
import { useState } from "react";
import BulkImportPanel from "./institute-command/BulkImportPanel";
import CampusGovernancePanel from "./institute-command/CampusGovernancePanel";
import FacultyStaffOptimization from "./institute-command/FacultyStaffOptimization";
import InfrastructurePlacementControl from "./institute-command/InfrastructurePlacementControl";
import InstitutionalPerformanceAnalytics from "./institute-command/InstitutionalPerformanceAnalytics";
import StudentGrowthTransformation from "./institute-command/StudentGrowthTransformation";

type SubSection =
  | "analytics"
  | "faculty"
  | "students"
  | "infrastructure"
  | "bulkimport";

interface SubNav {
  id: SubSection;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const subNavItems: SubNav[] = [
  { id: "analytics", label: "Performance Analytics", icon: BarChart3 },
  { id: "faculty", label: "Faculty & Staff Optimization", icon: Users },
  { id: "students", label: "Student Growth Engine", icon: GraduationCap },
  { id: "infrastructure", label: "Infra & Placement Control", icon: Building2 },
  { id: "bulkimport", label: "Bulk Data Import", icon: Upload },
];

const subComponents: Record<SubSection, React.ComponentType> = {
  analytics: InstitutionalPerformanceAnalytics,
  faculty: FacultyStaffOptimization,
  students: StudentGrowthTransformation,
  infrastructure: InfrastructurePlacementControl,
  bulkimport: BulkImportPanel,
};

export default function InstituteCommandCenter() {
  const [activeSection, setActiveSection] = useState<SubSection>("analytics");

  const ActiveSubComponent = subComponents[activeSection];

  return (
    <div
      className="iicc-theme min-h-screen flex flex-col"
      style={{ background: "var(--iicc-bg)" }}
    >
      {/* Command Center Header */}
      <div
        style={{
          background: "var(--iicc-header)",
          borderBottom: "1px solid var(--iicc-border)",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 py-5">
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
              style={{
                background:
                  "linear-gradient(135deg, var(--iicc-blue) 0%, var(--iicc-blue-dark) 100%)",
              }}
            >
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1
                className="text-xl font-display font-bold tracking-tight"
                style={{ color: "var(--iicc-heading)" }}
              >
                Institute Intelligence Command Center
              </h1>
              <p
                className="text-xs mt-0.5"
                style={{ color: "var(--iicc-muted)" }}
              >
                National Smart Education Monitoring Authority · Academic Year
                2025–26
              </p>
            </div>
            <div className="ml-auto flex items-center gap-3">
              <span
                className="px-3 py-1 rounded-full text-xs font-bold border"
                style={{
                  background: "var(--iicc-badge-bg)",
                  color: "var(--iicc-blue)",
                  borderColor: "var(--iicc-blue)",
                }}
              >
                COMMAND ACTIVE
              </span>
              <span
                className="px-3 py-1 rounded-full text-xs font-semibold"
                style={{
                  background: "oklch(0.45 0.15 145 / 0.15)",
                  color: "oklch(0.45 0.15 145)",
                }}
              >
                ● LIVE
              </span>
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
                  data-ocid={`institute.${item.id}.tab`}
                  type="button"
                  className="flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-all duration-200 cursor-pointer rounded-t-xl border-b-2"
                  style={{
                    color: isActive ? "var(--iicc-blue)" : "var(--iicc-muted)",
                    borderBottomColor: isActive
                      ? "var(--iicc-blue)"
                      : "transparent",
                    background: isActive
                      ? "var(--iicc-blue-subtle)"
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
        <CampusGovernancePanel />
      </main>
    </div>
  );
}
