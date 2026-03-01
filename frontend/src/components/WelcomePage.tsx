import { ArrowRight, BookOpen, Users, Zap, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WelcomePageProps {
  onEnter: () => void;
}

const features = [
  {
    icon: BookOpen,
    title: 'Academic Roadmap',
    description: 'Semester-by-semester syllabus, PYQs, and smart calendar from Day 1.',
  },
  {
    icon: Users,
    title: 'Hackathon Network',
    description: 'Find skill-matched teammates and compete with confidence.',
  },
  {
    icon: Zap,
    title: 'AI-Powered Tools',
    description: 'Smart notifications, dropout prediction, and adaptive learning.',
  },
  {
    icon: Award,
    title: 'Project Marketplace',
    description: 'Turn your hackathon projects into real assets that earn.',
  },
];

export default function WelcomePage({ onEnter }: WelcomePageProps) {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-nirgrantha-dark">
      {/* Hero background image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/assets/generated/nirgrantha-hero-bg.dim_1920x1080.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Deep overlay gradient */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            'linear-gradient(135deg, oklch(0.10 0.04 220 / 0.92) 0%, oklch(0.12 0.06 200 / 0.88) 40%, oklch(0.08 0.03 240 / 0.94) 100%)',
        }}
      />

      {/* Decorative radial glow top-left */}
      <div
        className="absolute top-0 left-0 w-[600px] h-[600px] z-10 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at top left, oklch(0.55 0.18 185 / 0.18) 0%, transparent 70%)',
        }}
      />

      {/* Decorative radial glow bottom-right */}
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] z-10 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at bottom right, oklch(0.65 0.20 55 / 0.14) 0%, transparent 70%)',
        }}
      />

      {/* Main content */}
      <div className="relative z-20 flex flex-col flex-1">
        {/* Top bar */}
        <header className="flex items-center justify-between px-6 sm:px-12 py-6">
          <div className="flex items-center gap-3">
            <img
              src="/assets/generated/nirgrantha-logo.dim_480x120.png"
              alt="NIRGRANTHA"
              className="h-9 w-auto"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          <button
            onClick={onEnter}
            className="text-sm font-semibold text-white/70 hover:text-white transition-colors duration-200 underline-offset-4 hover:underline"
          >
            Sign In
          </button>
        </header>

        {/* Hero section */}
        <main className="flex-1 flex flex-col items-center justify-center px-6 sm:px-12 py-16 text-center">
          {/* Eyebrow */}
          <span
            className="inline-block text-xs font-bold uppercase tracking-[0.25em] px-4 py-1.5 rounded-full mb-8 border"
            style={{
              background: 'oklch(0.55 0.18 185 / 0.15)',
              borderColor: 'oklch(0.55 0.18 185 / 0.35)',
              color: 'oklch(0.80 0.14 185)',
            }}
          >
            AI-Powered Campus Intelligence Platform
          </span>

          {/* Main heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight mb-4 font-display">
            Welcome to
          </h1>
          <h2
            className="text-5xl sm:text-6xl lg:text-8xl font-extrabold leading-tight tracking-tight mb-8"
            style={{
              background:
                'linear-gradient(90deg, oklch(0.82 0.18 185) 0%, oklch(0.78 0.20 165) 40%, oklch(0.80 0.22 55) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            NIRGRANTHA
          </h2>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-white/65 max-w-2xl mx-auto leading-relaxed mb-12">
            Bridging the gap between Tier-2 colleges and world-class outcomes. One platform for
            students, teachers, institutes, and parents — from Semester 1 to graduation.
          </p>

          {/* CTA button */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button
              onClick={onEnter}
              size="lg"
              className="group px-10 py-6 text-base font-bold rounded-full shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-nirgrantha-glow"
              style={{
                background:
                  'linear-gradient(135deg, oklch(0.52 0.18 185) 0%, oklch(0.48 0.20 165) 100%)',
                color: 'oklch(0.99 0 0)',
                border: 'none',
              }}
            >
              Enter Portal
              <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
            </Button>
            <span className="text-white/40 text-sm">
              Select your role to get started
            </span>
          </div>
        </main>

        {/* Feature cards */}
        <section className="px-6 sm:px-12 pb-16">
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="rounded-2xl p-5 border transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: 'oklch(1 0 0 / 0.05)',
                    borderColor: 'oklch(1 0 0 / 0.10)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: 'oklch(0.55 0.18 185 / 0.20)' }}
                  >
                    <Icon
                      className="w-5 h-5"
                      style={{ color: 'oklch(0.78 0.16 185)' }}
                    />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1.5">{feature.title}</h3>
                  <p className="text-xs text-white/55 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Footer */}
        <footer
          className="border-t px-6 sm:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderColor: 'oklch(1 0 0 / 0.10)' }}
        >
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} NIRGRANTHA. All rights reserved.
          </p>
          <p className="text-xs text-white/40 flex items-center gap-1">
            Built with{' '}
            <span style={{ color: 'oklch(0.65 0.20 25)' }}>♥</span>{' '}
            using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== 'undefined' ? window.location.hostname : 'nirgrantha'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:underline"
              style={{ color: 'oklch(0.75 0.16 185)' }}
            >
              caffeine.ai
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
