import {
  AlertTriangle,
  CheckCircle,
  Eye,
  EyeOff,
  FileText,
  Info,
  Key,
  Lock,
  Monitor,
  Share2,
  ShieldAlert,
  ShieldCheck,
  Wifi,
  X,
  XCircle,
} from "lucide-react";
import { useState } from "react";

type CyberTab = "overview" | "checklist" | "tips" | "sessions";

interface Alert {
  id: number;
  level: "HIGH" | "MEDIUM" | "LOW";
  title: string;
  desc: string;
  color: string;
  bg: string;
  border: string;
}

const INITIAL_ALERTS: Alert[] = [
  {
    id: 1,
    level: "HIGH",
    title: "Phishing Email Detected",
    desc: "Suspicious email from unknown sender with attachment detected in your inbox.",
    color: "#dc2626",
    bg: "#fef2f2",
    border: "#fca5a5",
  },
  {
    id: 2,
    level: "MEDIUM",
    title: "Weak Password Detected",
    desc: "Your account password does not meet the minimum security requirements.",
    color: "#ea580c",
    bg: "#fff7ed",
    border: "#fdba74",
  },
  {
    id: 3,
    level: "MEDIUM",
    title: "Unencrypted File Shared",
    desc: "A student data file was shared without encryption over public channel.",
    color: "#d97706",
    bg: "#fffbeb",
    border: "#fcd34d",
  },
  {
    id: 4,
    level: "LOW",
    title: "Login from New Device",
    desc: "Your account was accessed from a new device: Chrome on Windows 11.",
    color: "#2563eb",
    bg: "#eff6ff",
    border: "#93c5fd",
  },
];

const CHECKLIST_ITEMS = [
  {
    id: 1,
    category: "Account",
    text: "Enable two-factor authentication (2FA) on all accounts",
    icon: Key,
  },
  {
    id: 2,
    category: "Account",
    text: "Use a strong password (12+ characters, mixed)",
    icon: Lock,
  },
  {
    id: 3,
    category: "Data",
    text: "Encrypt sensitive student files before sharing",
    icon: FileText,
  },
  {
    id: 4,
    category: "Data",
    text: "Never share student data on personal devices",
    icon: ShieldAlert,
  },
  {
    id: 5,
    category: "Physical",
    text: "Lock your screen when leaving your desk",
    icon: Monitor,
  },
  {
    id: 6,
    category: "Physical",
    text: "Do not write passwords on sticky notes or visible areas",
    icon: Eye,
  },
  {
    id: 7,
    category: "Network",
    text: "Avoid using public Wi-Fi for institute work",
    icon: Wifi,
  },
  {
    id: 8,
    category: "Network",
    text: "Verify HTTPS before entering login credentials",
    icon: ShieldCheck,
  },
  {
    id: 9,
    category: "Device",
    text: "Keep your device OS and browser fully updated",
    icon: Monitor,
  },
  {
    id: 10,
    category: "Device",
    text: "Install and update antivirus software regularly",
    icon: ShieldCheck,
  },
];

const CYBER_TIPS = [
  {
    icon: Key,
    title: "Password Hygiene",
    desc: "Use a passphrase with 3+ random words, a number, and a symbol. Never reuse passwords. Consider a password manager like Bitwarden.",
    color: "#7c3aed",
  },
  {
    icon: Share2,
    title: "Safe Link Sharing",
    desc: 'Always verify the recipient before sharing Google Drive links. Set access to "View only" for student resources. Avoid sharing via personal email.',
    color: "#0891b2",
  },
  {
    icon: FileText,
    title: "Student Data Privacy",
    desc: "Student marks, attendance, and personal details are protected under India's IT Act. Never store them on personal cloud services without encryption.",
    color: "#059669",
  },
  {
    icon: Monitor,
    title: "Screen Sharing Safety",
    desc: "Before screen sharing in live classes, close personal tabs, notifications, and email. Use a dedicated browser profile for teaching sessions.",
    color: "#ea580c",
  },
  {
    icon: Wifi,
    title: "Public Wi-Fi Warning",
    desc: "Never access the NIRGRANTHA portal or mark attendance on public Wi-Fi. Use mobile data or a VPN if you must work remotely.",
    color: "#dc2626",
  },
  {
    icon: Lock,
    title: "File Encryption",
    desc: "Use 7-Zip (AES-256) or PDF password protection when sharing sensitive documents. Send the password through a separate channel.",
    color: "#2563eb",
  },
];

const SESSION_LOGS = [
  {
    action: "Login",
    device: "Chrome 121, Windows 11",
    ip: "192.168.1.45",
    time: "Today, 9:12 AM",
    badge: "SAFE",
    badgeColor: "#059669",
    badgeBg: "#d1fae5",
  },
  {
    action: "File Upload",
    device: "Chrome 121, Windows 11",
    ip: "192.168.1.45",
    time: "Today, 10:05 AM",
    badge: "SAFE",
    badgeColor: "#059669",
    badgeBg: "#d1fae5",
  },
  {
    action: "Login Attempt (Failed)",
    device: "Firefox, Android 14",
    ip: "103.45.67.89",
    time: "Today, 11:30 AM",
    badge: "REVIEW",
    badgeColor: "#dc2626",
    badgeBg: "#fef2f2",
  },
  {
    action: "Shared Resource",
    device: "Chrome 121, Windows 11",
    ip: "192.168.1.45",
    time: "Today, 2:15 PM",
    badge: "SAFE",
    badgeColor: "#059669",
    badgeBg: "#d1fae5",
  },
  {
    action: "Password Changed",
    device: "Chrome 121, Windows 11",
    ip: "192.168.1.45",
    time: "Yesterday, 4:00 PM",
    badge: "SAFE",
    badgeColor: "#059669",
    badgeBg: "#d1fae5",
  },
];

function SecurityGauge({ score }: { score: number }) {
  const r = 54;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - score / 100);
  const color = score >= 75 ? "#22c55e" : score >= 50 ? "#f59e0b" : "#ef4444";
  return (
    <div className="flex flex-col items-center">
      <svg
        width="140"
        height="140"
        viewBox="0 0 140 140"
        aria-label="Security Score Gauge"
        role="img"
      >
        <circle
          cx="70"
          cy="70"
          r={r}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="12"
        />
        <circle
          cx="70"
          cy="70"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{
            transform: "rotate(-90deg)",
            transformOrigin: "70px 70px",
            transition: "stroke-dashoffset 1s ease",
          }}
        />
        <text
          x="70"
          y="65"
          textAnchor="middle"
          fontSize="28"
          fontWeight="bold"
          fill={color}
        >
          {score}
        </text>
        <text x="70" y="85" textAnchor="middle" fontSize="11" fill="#64748b">
          Security Score
        </text>
      </svg>
      <p className="text-sm font-bold mt-1" style={{ color }}>
        {score >= 75 ? "Excellent" : score >= 50 ? "Moderate" : "At Risk"}
      </p>
    </div>
  );
}

function PasswordChecker() {
  const [pwd, setPwd] = useState("");
  const [show, setShow] = useState(false);

  const rules = [
    { label: "At least 8 characters", ok: pwd.length >= 8 },
    { label: "At least 12 characters (recommended)", ok: pwd.length >= 12 },
    { label: "Contains uppercase letter", ok: /[A-Z]/.test(pwd) },
    { label: "Contains a number", ok: /[0-9]/.test(pwd) },
    { label: "Contains special symbol (!@#$)", ok: /[^a-zA-Z0-9]/.test(pwd) },
    {
      label: "Not a common password",
      ok:
        pwd.length > 0 &&
        !["password", "123456", "qwerty", "admin"].includes(pwd.toLowerCase()),
    },
  ];

  const strength = rules.filter((r) => r.ok).length;
  const strengthPct = (strength / rules.length) * 100;
  const strengthColor =
    strengthPct >= 85 ? "#22c55e" : strengthPct >= 50 ? "#f59e0b" : "#ef4444";
  const strengthLabel =
    strengthPct >= 85 ? "Strong" : strengthPct >= 50 ? "Moderate" : "Weak";

  return (
    <div
      className="rounded-xl p-5"
      style={{ background: "white", border: "1px solid #e2e8f0" }}
    >
      <p className="font-bold text-gray-900 mb-3">
        🔐 Password Strength Checker
      </p>
      <div className="flex gap-2 mb-4">
        <input
          type={show ? "text" : "password"}
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          data-ocid="cyber.password.input"
          placeholder="Type a password to check..."
          className="flex-1 px-3 py-2 rounded-lg border-2 text-sm outline-none"
          style={{
            borderColor: pwd ? strengthColor : "#e2e8f0",
            color: "#111827",
          }}
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          className="px-3 py-2 rounded-lg border border-gray-200 text-gray-500 hover:text-gray-900 transition-colors"
        >
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
      {pwd && (
        <div className="mb-4">
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span style={{ color: strengthColor }}>
              Strength: {strengthLabel}
            </span>
            <span className="text-gray-500">
              {strength}/{rules.length} rules
            </span>
          </div>
          <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${strengthPct}%`, background: strengthColor }}
            />
          </div>
        </div>
      )}
      <div className="space-y-1.5">
        {rules.map((rule) => (
          <div key={rule.label} className="flex items-center gap-2">
            {rule.ok ? (
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
            ) : (
              <XCircle className="w-4 h-4 text-gray-300 flex-shrink-0" />
            )}
            <span
              className="text-xs"
              style={{
                color: rule.ok ? "#111827" : "#9ca3af",
                textDecoration: rule.ok ? "none" : "none",
                fontWeight: rule.ok ? 600 : 400,
              }}
            >
              {rule.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CybersecurityCommand() {
  const [activeTab, setActiveTab] = useState<CyberTab>("overview");
  const [alerts, setAlerts] = useState<Alert[]>(INITIAL_ALERTS);
  const [checked, setChecked] = useState<number[]>([3, 5, 8]);

  const score = Math.round(
    (checked.length / CHECKLIST_ITEMS.length) * 100 +
      (alerts.length === 0 ? 10 : 0) +
      10,
  );
  const clampedScore = Math.min(100, score);

  function dismissAlert(id: number) {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  }

  function toggleCheck(id: number) {
    setChecked((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  const INNER_TABS: { id: CyberTab; label: string }[] = [
    { id: "overview", label: "Security Overview" },
    { id: "checklist", label: "Security Checklist" },
    { id: "tips", label: "Cyber Tips" },
    { id: "sessions", label: "Session Activity" },
  ];

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div
        className="rounded-2xl p-6 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f4c75 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 80% 20%, #3b82f6 0%, transparent 50%), radial-gradient(circle at 20% 80%, #22c55e 0%, transparent 40%)",
          }}
        />
        <div className="relative flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #1d4ed8, #1e40af)",
              }}
            >
              <ShieldCheck className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                Cybersecurity Command
              </h2>
              <p className="text-white/70 text-sm">
                NIRGRANTHA Security Operations Center · Faculty Portal
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span
              className="px-3 py-1 rounded-full text-xs font-bold"
              style={{
                background: "rgba(34,197,94,0.2)",
                color: "#4ade80",
                border: "1px solid #4ade80",
              }}
            >
              🛡️ PROTECTED
            </span>
            <div className="text-right">
              <p className="text-white/60 text-xs">Security Score</p>
              <p
                className="text-2xl font-bold"
                style={{
                  color:
                    clampedScore >= 75
                      ? "#4ade80"
                      : clampedScore >= 50
                        ? "#fbbf24"
                        : "#f87171",
                }}
              >
                {clampedScore}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Active Alerts */}
      {alerts.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-bold text-red-600 uppercase tracking-wider px-1">
            ⚠ Active Security Alerts ({alerts.length})
          </p>
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="rounded-xl px-4 py-3 flex items-start justify-between gap-3"
              style={{
                background: alert.bg,
                border: `1px solid ${alert.border}`,
              }}
            >
              <div className="flex items-start gap-3">
                <AlertTriangle
                  className="w-5 h-5 flex-shrink-0 mt-0.5"
                  style={{ color: alert.color }}
                />
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded"
                      style={{ background: alert.color, color: "white" }}
                    >
                      {alert.level}
                    </span>
                    <p
                      className="font-bold text-sm"
                      style={{ color: alert.color }}
                    >
                      {alert.title}
                    </p>
                  </div>
                  <p className="text-xs text-gray-700">{alert.desc}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => dismissAlert(alert.id)}
                data-ocid={`cyber.alert.${alert.id}.close_button`}
                className="p-1 rounded hover:bg-black/10 transition-colors flex-shrink-0"
              >
                <X className="w-4 h-4" style={{ color: alert.color }} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Inner Tab Navigation */}
      <div className="flex gap-2 flex-wrap">
        {INNER_TABS.map((tab) => (
          <button
            type="button"
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            data-ocid={`cyber.${tab.id}.tab`}
            className="px-4 py-2 rounded-xl text-sm font-bold transition-all"
            style={{
              background:
                activeTab === tab.id
                  ? "linear-gradient(135deg, #0f172a, #1e40af)"
                  : "rgba(255,255,255,0.9)",
              color: activeTab === tab.id ? "white" : "#374151",
              border: activeTab === tab.id ? "none" : "1px solid #e2e8f0",
              boxShadow:
                activeTab === tab.id
                  ? "0 4px 15px rgba(30,64,175,0.4)"
                  : "none",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Gauge */}
            <div
              className="rounded-xl p-5 flex flex-col items-center justify-center"
              style={{
                background: "white",
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 15px rgba(30,64,175,0.1)",
              }}
            >
              <SecurityGauge score={clampedScore} />
            </div>
            {/* Stat Boxes */}
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  label: "Active Alerts",
                  value: alerts.length,
                  color: alerts.length > 2 ? "#dc2626" : "#f59e0b",
                  bg: "#fef2f2",
                },
                {
                  label: "Checks Passed",
                  value: checked.length,
                  color: "#059669",
                  bg: "#d1fae5",
                },
                {
                  label: "Session Duration",
                  value: "2h 34m",
                  color: "#2563eb",
                  bg: "#eff6ff",
                },
                {
                  label: "Last Login",
                  value: "Today 9:12",
                  color: "#7c3aed",
                  bg: "#f5f3ff",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl p-4 flex flex-col justify-center"
                  style={{
                    background: stat.bg,
                    border: `1px solid ${stat.color}30`,
                  }}
                >
                  <p
                    className="text-2xl font-bold"
                    style={{ color: stat.color }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-xs font-semibold text-gray-700 mt-0.5">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <PasswordChecker />
        </div>
      )}

      {activeTab === "checklist" && (
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <p className="text-sm font-bold text-gray-700">
              {checked.length}/{CHECKLIST_ITEMS.length} items completed
            </p>
            <div className="h-2 w-48 rounded-full bg-gray-200 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${(checked.length / CHECKLIST_ITEMS.length) * 100}%`,
                  background: "linear-gradient(90deg, #22c55e, #16a34a)",
                }}
              />
            </div>
          </div>
          {["Account", "Data", "Physical", "Network", "Device"].map((cat) => (
            <div key={cat}>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                {cat} Security
              </p>
              <div className="space-y-2">
                {CHECKLIST_ITEMS.filter((item) => item.category === cat).map(
                  (item) => {
                    const isChecked = checked.includes(item.id);
                    const Icon = item.icon;
                    return (
                      <button
                        type="button"
                        key={item.id}
                        onClick={() => toggleCheck(item.id)}
                        data-ocid={`cyber.checklist.${item.id}.checkbox`}
                        className="w-full flex items-center gap-3 rounded-xl px-4 py-3 cursor-pointer transition-all text-left"
                        style={{
                          background: isChecked ? "#d1fae5" : "white",
                          border: `1px solid ${isChecked ? "#86efac" : "#e2e8f0"}`,
                        }}
                      >
                        <div
                          className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0"
                          style={{
                            background: isChecked ? "#22c55e" : "#e2e8f0",
                          }}
                        >
                          {isChecked && (
                            <CheckCircle className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <Icon
                          className="w-4 h-4 flex-shrink-0"
                          style={{ color: isChecked ? "#16a34a" : "#6b7280" }}
                        />
                        <p
                          className="text-sm font-semibold"
                          style={{
                            color: isChecked ? "#15803d" : "#374151",
                            textDecoration: isChecked ? "line-through" : "none",
                          }}
                        >
                          {item.text}
                        </p>
                      </button>
                    );
                  },
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "tips" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CYBER_TIPS.map((tip) => {
              const TipIcon = tip.icon;
              return (
                <div
                  key={tip.title}
                  className="rounded-xl p-5"
                  style={{
                    background: "white",
                    border: `1px solid ${tip.color}25`,
                    boxShadow: `0 4px 15px ${tip.color}15`,
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                    style={{ background: `${tip.color}15` }}
                  >
                    <TipIcon className="w-5 h-5" style={{ color: tip.color }} />
                  </div>
                  <p className="font-bold text-gray-900 mb-2">{tip.title}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {tip.desc}
                  </p>
                </div>
              );
            })}
          </div>
          {/* National Policy Banner */}
          <div
            className="rounded-xl p-5 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #0f172a, #1e1b4b, #312e81)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <div className="absolute right-4 top-4 opacity-10">
              <ShieldCheck className="w-24 h-24 text-white" />
            </div>
            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🇮🇳</span>
                <p className="font-bold text-white text-lg">
                  National Cyber Security Policy 2020
                </p>
              </div>
              <p className="text-white/80 text-sm leading-relaxed max-w-2xl">
                As an educator handling student data, you are bound by India's
                National Cyber Security Policy 2020 and the IT Act (Section
                43A). Always ensure student data is stored securely, shared only
                through authorized channels, and never disclosed to third
                parties without consent.
              </p>
              <a
                href="https://www.cert-in.org.in"
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-3 px-4 py-2 rounded-lg text-sm font-bold transition-colors"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  color: "white",
                  border: "1px solid rgba(255,255,255,0.3)",
                }}
              >
                Learn More at CERT-In →
              </a>
            </div>
          </div>
        </div>
      )}

      {activeTab === "sessions" && (
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: "1px solid #e2e8f0" }}
        >
          <div
            className="px-4 py-3"
            style={{ background: "linear-gradient(135deg, #0f172a, #1e293b)" }}
          >
            <p className="text-white font-bold text-sm">
              Recent Session Activity
            </p>
          </div>
          <div className="divide-y divide-gray-100">
            {SESSION_LOGS.map((session, i) => (
              <div
                key={session.time}
                data-ocid={`cyber.sessions.item.${i + 1}`}
                className="px-4 py-3 flex items-center justify-between gap-4"
                style={{ background: i % 2 === 0 ? "white" : "#f8fafc" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{
                      background:
                        session.badge === "SAFE" ? "#d1fae5" : "#fef2f2",
                    }}
                  >
                    {session.badge === "SAFE" ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-900">
                      {session.action}
                    </p>
                    <p className="text-xs text-gray-500">{session.device}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold text-gray-700">
                    {session.ip}
                  </p>
                  <p className="text-xs text-gray-400">{session.time}</p>
                </div>
                <span
                  className="px-2.5 py-1 rounded-full text-xs font-bold flex-shrink-0"
                  style={{
                    background: session.badgeBg,
                    color: session.badgeColor,
                  }}
                >
                  {session.badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
