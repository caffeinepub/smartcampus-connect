import { Button } from "@/components/ui/button";
import {
  BrainCircuit,
  Building2,
  GraduationCap,
  HeartHandshake,
  LogOut,
  Moon,
  Sun,
  User,
} from "lucide-react";
import { useTheme } from "next-themes";
import { type TabId, useTab } from "../App";
import { type UserRole, useAuth } from "../contexts/AuthContext";

interface NavTab {
  id: TabId;
  label: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  forRole: UserRole;
}

const tabs: NavTab[] = [
  {
    id: "student-dashboard",
    label: "Student Dashboard",
    shortLabel: "Student",
    icon: GraduationCap,
    forRole: "student",
  },
  {
    id: "faculty-hub",
    label: "Faculty Intelligence Hub",
    shortLabel: "Faculty Hub",
    icon: BrainCircuit,
    forRole: "teacher",
  },
  {
    id: "institute-command",
    label: "Institute Intelligence Command Center",
    shortLabel: "Command",
    icon: Building2,
    forRole: "institute",
  },
  {
    id: "parent-insight-portal",
    label: "Parent Insight Portal",
    shortLabel: "Parents",
    icon: HeartHandshake,
    forRole: "parent",
  },
];

const roleLabels: Record<UserRole, string> = {
  student: "Student",
  teacher: "Teacher",
  institute: "Institute",
  parent: "Parent",
};

interface NavbarProps {
  onLogout: () => void;
}

export default function Navbar({ onLogout }: NavbarProps) {
  const { activeTab, setActiveTab } = useTab();
  const { theme, setTheme } = useTheme();
  const { currentRole } = useAuth();

  // Only show the tab that matches the current role
  const visibleTabs = tabs.filter((tab) => tab.forRole === currentRole);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-xs">
      <div className="max-w-[1600px] mx-auto px-3">
        <div className="flex items-center h-[72px] gap-2">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2 mr-4">
            <img
              src="/assets/generated/logo-smartcampus.dim_320x64.png"
              alt="SmartCampus Connect"
              className="h-8 w-auto"
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = "none";
                const sibling = target.nextElementSibling as HTMLElement;
                if (sibling) sibling.style.display = "flex";
              }}
            />
            <span
              className="hidden items-center gap-1.5 font-display font-bold text-lg"
              style={{ display: "none" }}
            >
              <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-teal to-emerald flex items-center justify-center text-white text-sm font-bold">
                S
              </span>
              <span className="gradient-text">EduManage</span>
            </span>
          </div>

          {/* Nav Tabs — only the role-specific tab */}
          <nav className="flex-1 flex items-end h-full overflow-x-auto scrollbar-none">
            <ul className="flex items-end h-full min-w-max gap-1">
              {visibleTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                const isCommand = tab.id === "institute-command";
                const isParent = tab.id === "parent-insight-portal";
                const isStudent = tab.id === "student-dashboard";

                const activeColor = isCommand
                  ? "var(--iicc-blue)"
                  : isParent
                    ? "var(--parent-primary)"
                    : isStudent
                      ? "var(--student-primary)"
                      : "oklch(var(--fhub-accent))";

                const activeBg = isCommand
                  ? "var(--iicc-blue-subtle)"
                  : isParent
                    ? "var(--parent-accent-subtle)"
                    : isStudent
                      ? "var(--student-accent-subtle)"
                      : "oklch(var(--fhub-badge-bg))";

                return (
                  <li key={tab.id}>
                    <button
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`
                        relative flex flex-col items-center justify-end gap-1.5 px-5 pb-3 pt-2 h-[72px]
                        text-sm font-medium whitespace-nowrap transition-all duration-200
                        group cursor-pointer rounded-t-xl
                        ${isActive ? "font-semibold" : "text-muted-foreground hover:text-foreground"}
                      `}
                      style={isActive ? { color: activeColor } : {}}
                      title={tab.label}
                    >
                      {/* Active background highlight */}
                      {isActive && (
                        <span
                          className="absolute inset-0 rounded-t-xl"
                          style={{ background: activeBg, opacity: 0.6 }}
                        />
                      )}

                      {/* Icon */}
                      <span
                        className="relative z-10 flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
                        style={isActive ? { color: activeColor } : {}}
                      >
                        <Icon className="w-5 h-5" />
                      </span>

                      <span className="relative z-10 text-xs sm:text-sm">
                        {tab.shortLabel}
                      </span>

                      {/* Active underline */}
                      <span
                        className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full transition-all duration-300"
                        style={
                          isActive
                            ? {
                                background: activeColor,
                                opacity: 1,
                                transform: "scaleX(1)",
                              }
                            : { opacity: 0, transform: "scaleX(0)" }
                        }
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right side: Role badge + Theme Toggle + Logout */}
          <div className="flex-shrink-0 flex items-center gap-2 ml-2">
            {/* Role badge */}
            {currentRole && (
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-muted-foreground text-xs font-medium">
                <User className="w-3.5 h-3.5" />
                {roleLabels[currentRole]}
              </div>
            )}

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-xl hover:bg-muted"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </Button>

            {/* Logout Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={onLogout}
              className="rounded-xl gap-1.5 text-xs font-medium h-8 px-3"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
