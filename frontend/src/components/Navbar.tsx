import { useTheme } from 'next-themes';
import { Sun, Moon, GraduationCap, Trophy, Bell, Users, ShoppingBag, ShieldAlert, BrainCircuit, Building2, HeartHandshake } from 'lucide-react';
import { useTab, type TabId } from '../App';
import { Button } from '@/components/ui/button';

interface NavTab {
  id: TabId;
  label: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
}

const tabs: NavTab[] = [
  { id: 'academic', label: 'Personalized Academic Roadmaps', shortLabel: 'Academic', icon: GraduationCap },
  { id: 'exams', label: 'Competitive Exam Hub', shortLabel: 'Exam Hub', icon: Trophy },
  { id: 'notifications', label: 'Smart Notifications & Goals', shortLabel: 'Goals', icon: Bell },
  { id: 'teams', label: 'Skill-Based Team Selection', shortLabel: 'Teams', icon: Users },
  { id: 'marketplace', label: 'Sustainable Marketplace', shortLabel: 'Marketplace', icon: ShoppingBag },
  { id: 'feedback', label: 'Anti-Trap Feedback', shortLabel: 'Feedback', icon: ShieldAlert },
  { id: 'faculty-hub', label: 'Faculty Intelligence Hub', shortLabel: 'Faculty Hub', icon: BrainCircuit },
  { id: 'institute-command', label: 'Institute Intelligence Command Center', shortLabel: 'Command', icon: Building2 },
  { id: 'parent-insight-portal', label: 'Parent Insight Portal', shortLabel: 'Parents', icon: HeartHandshake },
];

export default function Navbar() {
  const { activeTab, setActiveTab } = useTab();
  const { theme, setTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-xs">
      <div className="max-w-[1600px] mx-auto px-3">
        <div className="flex items-center h-[72px] gap-2">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2 mr-2">
            <img
              src="/assets/generated/logo-smartcampus.dim_320x64.png"
              alt="SmartCampus Connect"
              className="h-8 w-auto"
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = 'none';
                const sibling = target.nextElementSibling as HTMLElement;
                if (sibling) sibling.style.display = 'flex';
              }}
            />
            <span
              className="hidden items-center gap-1.5 font-display font-bold text-lg"
              style={{ display: 'none' }}
            >
              <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-teal to-emerald flex items-center justify-center text-white text-sm font-bold">S</span>
              <span className="gradient-text">SmartCampus</span>
            </span>
          </div>

          {/* Nav Tabs */}
          <nav className="flex-1 flex items-end h-full overflow-x-auto scrollbar-none">
            <ul className="flex items-end h-full min-w-max">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                const isCommand = tab.id === 'institute-command';
                const isParent = tab.id === 'parent-insight-portal';
                return (
                  <li key={tab.id} className="flex-1">
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className={`
                        relative flex flex-col items-center justify-end gap-1 px-2.5 pb-3 pt-2 h-full
                        text-xs font-medium whitespace-nowrap transition-all duration-200
                        group cursor-pointer
                        ${isActive
                          ? isCommand
                            ? 'text-iicc-blue'
                            : isParent
                              ? 'text-parent-primary'
                              : 'text-teal'
                          : 'text-muted-foreground hover:text-foreground'
                        }
                      `}
                      title={tab.label}
                    >
                      <Icon className={`w-4 h-4 transition-transform duration-200 group-hover:scale-110 ${
                        isActive
                          ? isCommand
                            ? 'text-iicc-blue'
                            : isParent
                              ? 'text-parent-primary'
                              : 'text-teal'
                          : ''
                      }`} />
                      <span className="hidden sm:block xl:hidden">{tab.shortLabel}</span>
                      <span className="hidden xl:block text-center leading-tight">{tab.shortLabel}</span>
                      <span className="sm:hidden">{tab.shortLabel}</span>

                      {/* Active underline */}
                      <span
                        className={`
                          absolute bottom-0 left-0 right-0 h-0.5 rounded-full transition-all duration-300
                          ${isActive
                            ? isCommand
                              ? 'bg-iicc-blue opacity-100 scale-x-100'
                              : isParent
                                ? 'bg-parent-primary opacity-100 scale-x-100'
                                : 'bg-teal opacity-100 scale-x-100'
                            : 'opacity-0 scale-x-0'
                          }
                        `}
                      />
                      {/* Active background highlight */}
                      {isActive && (
                        <span className={`absolute inset-0 rounded-t-lg ${
                          isCommand
                            ? 'bg-iicc-blue/5'
                            : isParent
                              ? 'bg-parent-primary/5'
                              : 'bg-teal/5'
                        }`} />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Theme Toggle */}
          <div className="flex-shrink-0 ml-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="rounded-xl hover:bg-teal-light hover:text-teal"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
