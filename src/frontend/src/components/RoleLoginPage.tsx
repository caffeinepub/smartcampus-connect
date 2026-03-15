import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  BrainCircuit,
  Building2,
  Eye,
  EyeOff,
  GraduationCap,
  HeartHandshake,
  LogIn,
} from "lucide-react";
import { useState } from "react";
import type { UserRole } from "../contexts/AuthContext";

interface RoleConfig {
  label: string;
  fullLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  subtleColor: string;
  borderColor: string;
  bgGradient: string;
  placeholder: { username: string; password: string };
  welcomeText: string;
}

const roleConfigs: Record<UserRole, RoleConfig> = {
  student: {
    label: "Student",
    fullLabel: "Student Portal",
    icon: GraduationCap,
    accentColor: "var(--student-primary)",
    subtleColor: "var(--student-accent-subtle)",
    borderColor: "var(--student-border)",
    bgGradient:
      "linear-gradient(135deg, oklch(0.18 0.05 165) 0%, oklch(0.22 0.07 180) 100%)",
    placeholder: { username: "student@school.edu", password: "Enter password" },
    welcomeText: "Access your academic dashboard, exams, goals, and more.",
  },
  teacher: {
    label: "Teacher",
    fullLabel: "Faculty Hub",
    icon: BrainCircuit,
    accentColor: "oklch(var(--fhub-accent))",
    subtleColor: "oklch(var(--fhub-badge-bg))",
    borderColor: "oklch(var(--fhub-border))",
    bgGradient:
      "linear-gradient(135deg, oklch(0.18 0.04 240) 0%, oklch(0.22 0.06 260) 100%)",
    placeholder: { username: "teacher@school.edu", password: "Enter password" },
    welcomeText:
      "Manage your classes, AI tools, and student performance insights.",
  },
  institute: {
    label: "Institute",
    fullLabel: "Command Center",
    icon: Building2,
    accentColor: "var(--iicc-blue)",
    subtleColor: "var(--iicc-blue-subtle)",
    borderColor: "var(--iicc-border)",
    bgGradient:
      "linear-gradient(135deg, oklch(0.16 0.04 255) 0%, oklch(0.20 0.06 240) 100%)",
    placeholder: {
      username: "admin@institute.edu",
      password: "Enter password",
    },
    welcomeText:
      "Oversee campus governance, infrastructure, and institutional analytics.",
  },
  parent: {
    label: "Parent",
    fullLabel: "Parent Insight Portal",
    icon: HeartHandshake,
    accentColor: "var(--parent-primary)",
    subtleColor: "var(--parent-accent-subtle)",
    borderColor: "var(--parent-border)",
    bgGradient:
      "linear-gradient(135deg, oklch(0.18 0.04 235) 0%, oklch(0.22 0.06 220) 100%)",
    placeholder: { username: "parent@email.com", password: "Enter password" },
    welcomeText:
      "Track your child's progress, attendance, fees, and connect with teachers.",
  },
};

interface RoleLoginPageProps {
  role: UserRole;
  onLogin: (role: UserRole) => void;
  onBack: () => void;
}

export default function RoleLoginPage({
  role,
  onLogin,
  onBack,
}: RoleLoginPageProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const config = roleConfigs[role];
  const Icon = config.icon;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Please enter your username and password.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin(role);
    }, 800);
  };

  const handleQuickEnter = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin(role);
    }, 600);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Panel - Branding */}
      <div
        className="lg:w-2/5 flex flex-col justify-between p-10 text-white relative overflow-hidden"
        style={{ background: config.bgGradient }}
      >
        {/* Background decoration */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Top: Logo + Back */}
        <div className="relative z-10">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm mb-10 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to role selection
          </button>

          <div className="flex items-center gap-4 mb-8">
            <img
              src="/assets/generated/nirgrantha-logo.dim_512x512.png"
              alt="NIRGRANTHA"
              className="h-14 w-14 rounded-xl shadow-lg object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <div>
              <p className="text-white/60 text-xs uppercase tracking-widest">
                NIRGRANTHA
              </p>
              <h2 className="text-xl font-bold text-white">
                {config.fullLabel}
              </h2>
            </div>
          </div>

          {/* Role icon */}
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
            style={{ background: "rgba(255,255,255,0.12)" }}
          >
            <Icon className="w-10 h-10 text-white" />
          </div>

          <h1 className="text-3xl font-bold text-white mb-3">
            {config.label} Login
          </h1>
          <p className="text-white/65 leading-relaxed text-sm max-w-xs">
            {config.welcomeText}
          </p>
        </div>

        {/* Bottom: Footer note */}
        <div className="relative z-10">
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} NIRGRANTHA. Secure access portal.
          </p>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-1">
              Sign in as {config.label}
            </h2>
            <p className="text-muted-foreground text-sm">
              Enter your credentials to access the {config.fullLabel}.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium">
                Username / Email
              </Label>
              <Input
                id="username"
                type="text"
                placeholder={config.placeholder.username}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-11 rounded-xl"
                style={{
                  borderColor: username ? config.borderColor : undefined,
                }}
                autoComplete="username"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={config.placeholder.password}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 rounded-xl pr-11"
                  style={{
                    borderColor: password ? config.borderColor : undefined,
                  }}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-lg">
                {error}
              </p>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 rounded-xl font-semibold text-sm gap-2"
              style={{
                background: config.accentColor,
                color: "white",
                border: "none",
              }}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in…
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <LogIn className="w-4 h-4" />
                  Sign In
                </span>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Quick Enter — icon wrapped in span to avoid passing style to ComponentType */}
          <Button
            variant="outline"
            onClick={handleQuickEnter}
            disabled={isLoading}
            className="w-full h-11 rounded-xl font-medium text-sm gap-2"
            style={{ borderColor: config.borderColor }}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-muted-foreground/30 border-t-muted-foreground rounded-full animate-spin" />
                Loading…
              </span>
            ) : (
              <>
                <span style={{ color: config.accentColor }}>
                  <Icon className="w-4 h-4" />
                </span>
                Quick Enter as {config.label}
              </>
            )}
          </Button>

          <p className="text-center text-xs text-muted-foreground mt-6">
            Wrong role?{" "}
            <button
              type="button"
              onClick={onBack}
              className="font-medium hover:underline"
              style={{ color: config.accentColor }}
            >
              Go back to role selection
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
