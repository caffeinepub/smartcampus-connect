import {
  ArrowRight,
  Brain,
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
  badgeText: string;
  iconBg: string;
  iconColor: string;
  titleColor: string;
  loginColor: string;
  badgeBg: string;
  badgeColor: string;
}

const roleCards: RoleCard[] = [
  {
    role: "student",
    label: "Student",
    description:
      "Access your academics, exams, goals, teams, marketplace, and feedback.",
    icon: GraduationCap,
    badgeText: "Academic Portal",
    iconBg: "#d1fae5",
    iconColor: "#059669",
    titleColor: "#059669",
    loginColor: "#059669",
    badgeBg: "#ecfdf5",
    badgeColor: "#065f46",
  },
  {
    role: "teacher",
    label: "Teacher",
    description:
      "Manage classes, AI teaching tools, student performance, and faculty resources.",
    icon: Brain,
    badgeText: "Faculty Hub",
    iconBg: "#dbeafe",
    iconColor: "#1e40af",
    titleColor: "#1e3a8a",
    loginColor: "#1e40af",
    badgeBg: "#eff6ff",
    badgeColor: "#1e3a8a",
  },
  {
    role: "institute",
    label: "Institute",
    description:
      "Oversee campus governance, infrastructure, placements, and analytics.",
    icon: Building2,
    badgeText: "Command Center",
    iconBg: "#dbeafe",
    iconColor: "#1e40af",
    titleColor: "#1e3a8a",
    loginColor: "#1e40af",
    badgeBg: "#eff6ff",
    badgeColor: "#1e3a8a",
  },
  {
    role: "parent",
    label: "Parents",
    description:
      "Track your child's progress, attendance, fees, and connect with teachers.",
    icon: HeartHandshake,
    badgeText: "Insight Portal",
    iconBg: "#dbeafe",
    iconColor: "#1e40af",
    titleColor: "#1e3a8a",
    loginColor: "#1e40af",
    badgeBg: "#eff6ff",
    badgeColor: "#1e3a8a",
  },
];

interface RoleSelectionLandingProps {
  onSelectRole: (role: UserRole) => void;
}

export default function RoleSelectionLanding({
  onSelectRole,
}: RoleSelectionLandingProps) {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e3a5f 20%, #065f46 45%, #1e40af 70%, #581c87 100%)",
      }}
    >
      {/* Header */}
      <header className="w-full py-5 px-6 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <img
            src="/assets/generated/nirgrantha-logo.dim_512x512.png"
            alt="NIRGRANTHA"
            className="h-10 w-10 rounded-xl object-cover shadow"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <span
            className="text-xl font-bold tracking-widest"
            style={{
              color: "#ffffff",
              textShadow: "0 0 20px rgba(255,255,255,0.3)",
            }}
          >
            NIRGRANTHA
          </span>
        </div>
      </header>

      {/* Foundation of Trust Tagline */}
      <div className="flex flex-col items-center px-6 pt-6 pb-2">
        <h2
          className="text-3xl font-bold text-center"
          style={{
            color: "#ffffff",
            textShadow:
              "0 0 30px rgba(255,255,255,0.5), 0 2px 8px rgba(0,0,0,0.4)",
            letterSpacing: "0.04em",
          }}
        >
          The Foundation of Trust
        </h2>
        <div
          className="mt-3 mb-3 max-w-xs w-full"
          style={{
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
          }}
        />
        <p
          className="text-sm text-center"
          style={{ color: "rgba(255,255,255,0.65)", letterSpacing: "0.05em" }}
        >
          Empowering Students · Teachers · Institutes · Parents
        </p>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-10">
        {/* Heading */}
        <p
          className="text-xs font-semibold uppercase tracking-[0.22em] mb-10"
          style={{ color: "rgba(255,255,255,0.6)" }}
        >
          Choose your role to continue
        </p>

        {/* Role Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full max-w-5xl">
          {roleCards.map((card) => {
            const Icon = card.icon;
            return (
              <button
                type="button"
                key={card.role}
                className="bg-white rounded-2xl border flex flex-col p-6 transition-all duration-200 hover:-translate-y-1 text-left w-full"
                style={{
                  borderColor: "rgba(255,255,255,0.15)",
                  boxShadow:
                    "0 8px 32px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.2)",
                }}
                onClick={() => onSelectRole(card.role)}
                data-ocid={`role.${card.role}.button`}
              >
                {/* Icon Box */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: card.iconBg }}
                >
                  <span style={{ color: card.iconColor }}>
                    <Icon className="w-6 h-6" />
                  </span>
                </div>

                {/* Badge */}
                <span
                  className="inline-block text-xs font-medium px-3 py-1 rounded-full mb-4 self-start"
                  style={{
                    backgroundColor: card.badgeBg,
                    color: card.badgeColor,
                    border: `1px solid ${card.iconBg}`,
                  }}
                >
                  {card.badgeText}
                </span>

                {/* Role Name */}
                <h3
                  className="text-2xl font-bold mb-2"
                  style={{ color: card.titleColor }}
                >
                  {card.label}
                </h3>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed flex-1"
                  style={{ color: "#64748b" }}
                >
                  {card.description}
                </p>

                {/* Login Link */}
                <div
                  className="mt-5 flex items-center gap-1.5 text-sm font-bold group"
                  style={{ color: card.loginColor }}
                >
                  Login
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-6 text-center">
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
          © {new Date().getFullYear()} NIRGRANTHA. Built with{" "}
          <span style={{ color: "#f87171" }}>♥</span> using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "nirgrantha")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:underline"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
