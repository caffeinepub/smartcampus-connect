import {
  ArrowRight,
  Brain,
  Building2,
  GraduationCap,
  HeartHandshake,
} from "lucide-react";
import { useEffect, useRef } from "react";
import type { UserRole } from "../contexts/AuthContext";

interface RoleCard {
  role: UserRole;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  badgeText: string;
  gradient: string;
  iconGlow: string;
  borderGlow: string;
  textColor: string;
  badgeStyle: React.CSSProperties;
}

const roleCards: RoleCard[] = [
  {
    role: "student",
    label: "Student",
    description:
      "Access your academics, exams, goals, teams, marketplace, and feedback.",
    icon: GraduationCap,
    badgeText: "Academic Portal",
    gradient: "linear-gradient(135deg, #d1fae5 0%, #a7f3d0 40%, #6ee7b7 100%)",
    iconGlow: "0 0 20px rgba(16,185,129,0.5)",
    borderGlow:
      "0 0 0 2px rgba(16,185,129,0.8), 0 16px 40px rgba(16,185,129,0.25)",
    textColor: "#065f46",
    badgeStyle: {
      background: "#dcfce7",
      color: "#15803d",
      border: "1px solid #bbf7d0",
    },
  },
  {
    role: "teacher",
    label: "Teacher",
    description:
      "Manage classes, AI teaching tools, student performance, and faculty resources.",
    icon: Brain,
    badgeText: "Faculty Hub",
    gradient: "linear-gradient(135deg, #ede9fe 0%, #ddd6fe 40%, #c4b5fd 100%)",
    iconGlow: "0 0 20px rgba(124,58,237,0.5)",
    borderGlow:
      "0 0 0 2px rgba(124,58,237,0.8), 0 16px 40px rgba(124,58,237,0.25)",
    textColor: "#3730a3",
    badgeStyle: {
      background: "#ede9fe",
      color: "#5b21b6",
      border: "1px solid #ddd6fe",
    },
  },
  {
    role: "institute",
    label: "Institute",
    description:
      "Oversee campus governance, infrastructure, placements, and analytics.",
    icon: Building2,
    badgeText: "Command Center",
    gradient: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 40%, #93c5fd 100%)",
    iconGlow: "0 0 20px rgba(37,99,235,0.5)",
    borderGlow:
      "0 0 0 2px rgba(37,99,235,0.8), 0 16px 40px rgba(37,99,235,0.25)",
    textColor: "#1e3a8a",
    badgeStyle: {
      background: "#dbeafe",
      color: "#1d4ed8",
      border: "1px solid #bfdbfe",
    },
  },
  {
    role: "parent",
    label: "Parents",
    description:
      "Track your child's progress, attendance, fees, and connect with teachers.",
    icon: HeartHandshake,
    badgeText: "Insight Portal",
    gradient: "linear-gradient(135deg, #e0f2fe 0%, #bae6fd 40%, #7dd3fc 100%)",
    iconGlow: "0 0 20px rgba(2,132,199,0.5)",
    borderGlow:
      "0 0 0 2px rgba(2,132,199,0.8), 0 16px 40px rgba(2,132,199,0.25)",
    textColor: "#0c4a6e",
    badgeStyle: {
      background: "#e0f2fe",
      color: "#0369a1",
      border: "1px solid #bae6fd",
    },
  },
];

function TiltCard({
  card,
  index,
  onSelectRole,
}: { card: RoleCard; index: number; onSelectRole: (r: UserRole) => void }) {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transition =
      "transform 0.12s ease-out, box-shadow 0.3s ease, opacity 0.6s ease, translateY 0.6s ease";

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(700px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) translateZ(12px) scale(1.03)`;
      el.style.boxShadow = card.borderGlow;
    };
    const onLeave = () => {
      el.style.transform =
        "perspective(700px) rotateY(0) rotateX(0) translateZ(0) scale(1)";
      el.style.boxShadow =
        "0 8px 32px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.2)";
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [card.borderGlow]);

  const Icon = card.icon;
  return (
    <button
      ref={ref}
      type="button"
      className="rounded-2xl flex flex-col p-6 text-left w-full cursor-pointer"
      style={{
        background: card.gradient,
        boxShadow: "0 8px 32px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.2)",
        border: "1px solid rgba(255,255,255,0.3)",
        opacity: 0,
        animation: `card-slide-in 0.6s ease ${100 + index * 120}ms forwards`,
      }}
      onClick={() => onSelectRole(card.role)}
      data-ocid={`role.${card.role}.button`}
    >
      {/* Icon */}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
        style={{
          background: "rgba(255,255,255,0.5)",
          boxShadow: card.iconGlow,
          backdropFilter: "blur(8px)",
          animation: `bob-float 2.5s ease-in-out infinite ${index * 200}ms`,
        }}
      >
        <span style={{ color: card.textColor }}>
          <Icon className="w-7 h-7" />
        </span>
      </div>
      <span
        className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 self-start"
        style={card.badgeStyle}
      >
        {card.badgeText}
      </span>
      <h3 className="text-2xl font-bold mb-2" style={{ color: card.textColor }}>
        {card.label}
      </h3>
      <p
        className="text-sm leading-relaxed flex-1"
        style={{ color: card.textColor, opacity: 0.8 }}
      >
        {card.description}
      </p>
      <div
        className="mt-5 flex items-center gap-1.5 text-sm font-bold group"
        style={{ color: card.textColor }}
      >
        Login
        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
      </div>
    </button>
  );
}

interface RoleSelectionLandingProps {
  onSelectRole: (role: UserRole) => void;
}

export default function RoleSelectionLanding({
  onSelectRole,
}: RoleSelectionLandingProps) {
  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e3a5f 20%, #065f46 45%, #1e40af 70%, #581c87 100%)",
      }}
    >
      {/* Animated mesh gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          animation: "gradient-morph 15s ease-in-out infinite alternate",
          background:
            "linear-gradient(45deg,rgba(0,200,150,0.06) 0%,rgba(99,102,241,0.06) 50%,rgba(14,165,233,0.06) 100%)",
        }}
      />

      {/* Morphing blob shapes */}
      <div
        className="absolute top-[-10%] left-[-5%] w-96 h-96 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle,rgba(5,150,105,0.25) 0%,transparent 70%)",
          animation: "blob-morph 18s ease-in-out infinite",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute bottom-[-10%] right-[-5%] w-80 h-80 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle,rgba(99,102,241,0.2) 0%,transparent 70%)",
          animation: "blob-morph 22s ease-in-out infinite reverse",
          filter: "blur(40px)",
        }}
      />

      {/* Floating orbs */}
      <div
        className="orb animate-float-slow"
        style={{
          width: 500,
          height: 500,
          top: "-15%",
          right: "-10%",
          background: "radial-gradient(circle,#059669 0%,transparent 70%)",
          opacity: 0.18,
        }}
      />
      <div
        className="orb animate-float-mid"
        style={{
          width: 400,
          height: 400,
          bottom: "-10%",
          left: "-10%",
          background: "radial-gradient(circle,#6366f1 0%,transparent 70%)",
          opacity: 0.18,
          animationDelay: "2s",
        }}
      />

      {/* Header */}
      <header
        className="relative z-10 w-full py-5 px-6 flex items-center justify-center"
        style={{
          opacity: 0,
          animation: "card-slide-in 0.6s ease 0ms forwards",
        }}
      >
        <div className="flex items-center gap-3">
          <img
            src="/assets/generated/nirgrantha-logo.dim_512x512.png"
            alt="NIRGRANTHA"
            className="h-10 w-10 rounded-xl object-cover shadow-lg"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <span
            className="text-2xl font-bold tracking-widest"
            style={{
              color: "#ffffff",
              textShadow: "0 0 20px rgba(255,255,255,0.3)",
            }}
          >
            NIR<span style={{ color: "#00e5a0" }}>GRANTHA</span>
          </span>
        </div>
      </header>

      {/* Foundation of Trust */}
      <div
        className="relative z-10 flex flex-col items-center px-6 pt-6 pb-2"
        style={{
          opacity: 0,
          animation: "card-slide-in 0.6s ease 150ms forwards",
        }}
      >
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
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-10">
        <p
          className="text-xs font-semibold uppercase tracking-[0.22em] mb-10"
          style={{
            color: "rgba(255,255,255,0.6)",
            opacity: 0,
            animation: "card-slide-in 0.6s ease 200ms forwards",
          }}
        >
          Choose your role to continue
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl">
          {roleCards.map((card, i) => (
            <TiltCard
              key={card.role}
              card={card}
              index={i}
              onSelectRole={onSelectRole}
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 px-6 text-center">
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
