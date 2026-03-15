import {
  ArrowRight,
  BrainCircuit,
  Building2,
  GraduationCap,
  HeartHandshake,
} from "lucide-react";
import type { UserRole } from "../contexts/AuthContext";

interface RoleCard {
  role: UserRole;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  bgColor: string;
  bgGradient: string;
  badgeText: string;
  badgeBg: string;
}

const roleCards: RoleCard[] = [
  {
    role: "student",
    label: "Student",
    description:
      "Access your academics, exams, goals, teams, marketplace, and feedback.",
    icon: GraduationCap,
    bgColor: "var(--student-header)",
    bgGradient:
      "linear-gradient(135deg, var(--student-header) 0%, oklch(0.42 0.21 160) 100%)",
    badgeText: "Academic Portal",
    badgeBg: "rgba(255,255,255,0.18)",
  },
  {
    role: "teacher",
    label: "Teacher",
    description:
      "Manage classes, AI teaching tools, student performance, and faculty resources.",
    icon: BrainCircuit,
    bgColor: "oklch(var(--fhub-header))",
    bgGradient:
      "linear-gradient(135deg, oklch(0.3 0.22 260) 0%, oklch(0.4 0.2 280) 100%)",
    badgeText: "Faculty Hub",
    badgeBg: "rgba(255,255,255,0.18)",
  },
  {
    role: "institute",
    label: "Institute",
    description:
      "Oversee campus governance, infrastructure, placements, and analytics.",
    icon: Building2,
    bgColor: "var(--iicc-header)",
    bgGradient:
      "linear-gradient(135deg, oklch(0.28 0.18 258) 0%, oklch(0.38 0.2 270) 100%)",
    badgeText: "Command Center",
    badgeBg: "rgba(255,255,255,0.18)",
  },
  {
    role: "parent",
    label: "Parents",
    description:
      "Track your child's progress, attendance, fees, and connect with teachers.",
    icon: HeartHandshake,
    bgColor: "var(--parent-header)",
    bgGradient:
      "linear-gradient(135deg, oklch(0.35 0.17 238) 0%, oklch(0.45 0.18 225) 100%)",
    badgeText: "Insight Portal",
    badgeBg: "rgba(255,255,255,0.18)",
  },
];

interface RoleSelectionLandingProps {
  onSelectRole: (role: UserRole) => void;
}

export default function RoleSelectionLanding({
  onSelectRole,
}: RoleSelectionLandingProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero Header */}
      <div
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.18 0.04 240) 0%, oklch(0.22 0.06 200) 50%, oklch(0.16 0.05 260) 100%)",
        }}
      >
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative max-w-5xl mx-auto px-6 py-16 text-center">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img
              src="/assets/generated/nirgrantha-logo.dim_512x512.png"
              alt="Nirgrantha"
              className="h-20 w-20 rounded-2xl shadow-2xl"
              onError={(e) => {
                const t = e.currentTarget;
                t.style.display = "none";
              }}
            />
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
            Welcome to{" "}
            <span
              style={{
                background:
                  "linear-gradient(90deg, oklch(0.75 0.16 165), oklch(0.72 0.14 200))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              NIRGRANTHA
            </span>
          </h1>
          <p className="text-lg text-white/70 max-w-xl mx-auto leading-relaxed">
            Your complete campus intelligence platform. Select your role to get
            started.
          </p>
        </div>
      </div>

      {/* Role Cards */}
      <div className="flex-1 max-w-5xl mx-auto w-full px-6 py-14">
        <p className="text-center text-muted-foreground text-sm font-medium uppercase tracking-widest mb-10">
          Choose your role to continue
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {roleCards.map((card) => {
            const Icon = card.icon;
            return (
              <button
                type="button"
                key={card.role}
                onClick={() => onSelectRole(card.role)}
                data-ocid={`role.${card.role}.button`}
                className="group relative flex flex-col items-start p-6 rounded-2xl text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 overflow-hidden"
                style={{
                  background: card.bgGradient,
                  boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
                }}
              >
                {/* Shimmer effect overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "rgba(255,255,255,0.07)" }}
                />

                {/* Icon */}
                <div
                  className="relative z-10 w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: "rgba(255,255,255,0.18)" }}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>

                {/* Badge */}
                <span
                  className="relative z-10 text-xs font-semibold px-2.5 py-1 rounded-full mb-3"
                  style={{
                    background: card.badgeBg,
                    color: "rgba(255,255,255,0.9)",
                  }}
                >
                  {card.badgeText}
                </span>

                {/* Label */}
                <h3 className="relative z-10 text-xl font-bold mb-2 text-white">
                  {card.label}
                </h3>

                {/* Description */}
                <p className="relative z-10 text-sm text-white/75 leading-relaxed flex-1">
                  {card.description}
                </p>

                {/* Arrow */}
                <div className="relative z-10 mt-5 flex items-center gap-1.5 text-sm font-semibold text-white transition-all duration-200 group-hover:gap-2.5">
                  Login
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="max-w-5xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} NIRGRANTHA. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Built with <span className="text-red-500">♥</span> using{" "}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "nirgrantha")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:underline"
              style={{ color: "var(--student-primary)" }}
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
