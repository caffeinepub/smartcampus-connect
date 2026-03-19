import { BarChart2, BookOpen, Compass, Users, Zap } from "lucide-react";

interface WelcomePageProps {
  onEnter: () => void;
}

export default function WelcomePage({ onEnter }: WelcomePageProps) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative"
      style={{
        background:
          "radial-gradient(ellipse at center top, #1a2756 0%, #0d1535 50%, #080e28 100%)",
      }}
    >
      {/* Stars/dots background effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: decorative
            key={i}
            className="absolute rounded-full bg-white opacity-20"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-2xl w-full text-center">
        {/* Logo section */}
        <div className="flex flex-col items-center gap-3 mb-6">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #00c896 0%, #00a8cc 100%)",
            }}
          >
            <BookOpen className="w-8 h-8 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              <span className="text-white">NIR</span>
              <span style={{ color: "#00e5a0" }}>GRANTHA</span>
            </h1>
            <p
              className="text-xs tracking-[0.3em] uppercase mt-1"
              style={{ color: "#8899bb" }}
            >
              Educational Platform
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 w-48 mb-8">
          <div
            className="flex-1 h-px"
            style={{ background: "rgba(255,255,255,0.15)" }}
          />
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: "#00e5a0" }}
          />
          <div
            className="flex-1 h-px"
            style={{ background: "rgba(255,255,255,0.15)" }}
          />
        </div>

        {/* Main heading */}
        <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-10">
          Connecting Students, Teachers,
          <br />
          <span style={{ color: "#00e5a0" }}>Parents &amp; Institutes</span>
        </h2>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {[
            { icon: Zap, label: "Smart Learning" },
            { icon: Compass, label: "Career Guidance" },
            { icon: BarChart2, label: "Real-time Analytics" },
            { icon: Users, label: "Collaborative Tools" },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm text-white"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <Icon className="w-3.5 h-3.5" style={{ color: "#00e5a0" }} />
              {label}
            </div>
          ))}
        </div>

        {/* Enter button */}
        <button
          type="button"
          onClick={onEnter}
          data-ocid="welcome.primary_button"
          className="px-16 py-4 rounded-2xl text-lg font-bold text-white transition-all duration-200 hover:scale-105 active:scale-95 shadow-2xl mb-6"
          style={{
            background: "linear-gradient(135deg, #00c896 0%, #00a8cc 100%)",
            boxShadow: "0 8px 32px rgba(0, 200, 150, 0.35)",
          }}
        >
          Enter Platform
        </button>

        {/* Trust indicator */}
        <p className="text-sm" style={{ color: "#7788aa" }}>
          Trusted by <span className="text-white font-semibold">1,200+</span>{" "}
          students across India
        </p>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 text-xs" style={{ color: "#4455770" }}>
        <p style={{ color: "#556688" }}>
          © {new Date().getFullYear()} NIRGRANTHA. All rights reserved.
        </p>
      </div>
    </div>
  );
}
