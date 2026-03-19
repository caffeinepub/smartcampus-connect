import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Flame,
  Plus,
  Star,
  Target,
  Trophy,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";

const today = new Date(2026, 1, 27); // Feb 27, 2026

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

const upcomingExams = [
  {
    subject: "Algorithms & Complexity",
    date: new Date(2026, 2, 15),
    type: "Mid Sem",
  },
  { subject: "Database Management", date: new Date(2026, 2, 10), type: "Lab" },
  {
    subject: "Operating Systems",
    date: new Date(2026, 3, 20),
    type: "End Sem",
  },
];

const assignments = [
  {
    title: "DSA Assignment 3",
    subject: "Algorithms",
    due: new Date(2026, 1, 28),
    done: false,
  },
  {
    title: "ER Diagram Submission",
    subject: "DBMS",
    due: new Date(2026, 2, 2),
    done: false,
  },
  {
    title: "Network Topology Report",
    subject: "CN",
    due: new Date(2026, 2, 5),
    done: true,
  },
  {
    title: "OS Lab Report",
    subject: "OS",
    due: new Date(2026, 2, 8),
    done: false,
  },
];

const badges = [
  {
    icon: Flame,
    label: "30-Day Streak",
    color: "text-orange-500 bg-orange-100",
    earned: true,
  },
  {
    icon: Trophy,
    label: "Top Performer",
    color: "text-yellow-600 bg-yellow-100",
    earned: true,
  },
  {
    icon: Star,
    label: "Goal Crusher",
    color: "text-purple-600 bg-purple-100",
    earned: true,
  },
  {
    icon: Zap,
    label: "Speed Learner",
    color: "text-blue-600 bg-blue-100",
    earned: true,
  },
  {
    icon: BookOpen,
    label: "Bookworm",
    color: "text-teal bg-teal-light",
    earned: false,
  },
  {
    icon: CheckCircle2,
    label: "Perfect Week",
    color: "text-green-600 bg-green-100",
    earned: false,
  },
];

interface Goal {
  id: number;
  title: string;
  days: number;
  progress: number;
  created: Date;
}

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calc = () => {
      const diff = targetDate.getTime() - Date.now();
      if (diff <= 0)
        return setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return timeLeft;
}

function CountdownTimer({ exam }: { exam: (typeof upcomingExams)[0] }) {
  const t = useCountdown(exam.date);
  return (
    <Card className="rounded-2xl shadow-card card-hover">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="font-semibold text-sm">{exam.subject}</p>
          <Badge variant="outline" className="text-[10px]">
            {exam.type}
          </Badge>
        </div>
        <div className="grid grid-cols-4 gap-1">
          {[
            { v: t.days, l: "Days" },
            { v: t.hours, l: "Hrs" },
            { v: t.minutes, l: "Min" },
            { v: t.seconds, l: "Sec" },
          ].map(({ v, l }) => (
            <div key={l} className="text-center bg-muted rounded-lg py-1.5">
              <p className="font-bold text-base text-teal">
                {String(v).padStart(2, "0")}
              </p>
              <p className="text-[9px] text-muted-foreground">{l}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function SmartNotifications() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: 1,
      title: "Complete Java Basics",
      days: 10,
      progress: 60,
      created: new Date(),
    },
    {
      id: 2,
      title: "Solve 50 LeetCode Problems",
      days: 14,
      progress: 34,
      created: new Date(),
    },
  ]);
  const [newGoalTitle, setNewGoalTitle] = useState("");
  const [newGoalDays, setNewGoalDays] = useState("");

  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const monthName = today.toLocaleString("default", { month: "long" });

  const examDates = new Set(upcomingExams.map((e) => e.date.getDate()));
  const assignmentDates = new Set(
    assignments.filter((a) => !a.done).map((a) => a.due.getDate()),
  );

  const addGoal = () => {
    if (!newGoalTitle.trim() || !newGoalDays) return;
    setGoals((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: newGoalTitle.trim(),
        days: Number.parseInt(newGoalDays),
        progress: 0,
        created: new Date(),
      },
    ]);
    setNewGoalTitle("");
    setNewGoalDays("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="relative rounded-2xl overflow-hidden">
        <div
          style={{
            background:
              "linear-gradient(135deg, oklch(0.35 0.22 290), oklch(0.45 0.2 280))",
          }}
          className="absolute inset-0"
        />
        <img
          src="/assets/generated/hero-bg.dim_1920x400.png"
          alt=""
          className="w-full h-40 object-cover opacity-20"
        />
        <div className="absolute inset-0 flex items-center px-8">
          <div>
            <h1 className="font-display text-2xl font-bold text-white mb-1">
              Smart Notifications & Goals
            </h1>
            <p className="text-white/80 text-sm">
              Stay on track with your academic schedule and personal goals
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="rounded-2xl shadow-card lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Calendar className="w-4 h-4 text-teal" />
              {monthName} {year}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="grid grid-cols-7 gap-0.5 mb-1">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                <div
                  key={d}
                  className="text-center text-[10px] font-semibold text-muted-foreground py-1"
                >
                  {d}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-0.5">
              {Array.from({ length: firstDay }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: static calendar padding
                <div key={`e-${i}`} />
              ))}
              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(
                (day) => {
                  const isToday = day === today.getDate();
                  const hasExam = examDates.has(day);
                  const hasAssignment = assignmentDates.has(day);
                  return (
                    <div
                      key={day}
                      className={`
                      relative text-center text-xs py-1.5 rounded-lg cursor-pointer transition-colors
                      ${isToday ? "bg-teal text-white font-bold" : "hover:bg-muted"}
                      ${hasExam && !isToday ? "font-semibold text-red-600" : ""}
                    `}
                    >
                      {day}
                      {hasExam && !isToday && (
                        <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-red-500" />
                      )}
                      {hasAssignment && !isToday && (
                        <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-orange-400" />
                      )}
                    </div>
                  );
                },
              )}
            </div>
            <div className="flex items-center gap-4 mt-3 text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />{" "}
                Exam
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-orange-400 inline-block" />{" "}
                Assignment
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-teal inline-block" />{" "}
                Today
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Countdowns */}
          <div>
            <h2 className="font-display font-semibold text-base mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-teal" /> Countdown Timers
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {upcomingExams.slice(0, 3).map((exam) => (
                <CountdownTimer key={exam.subject} exam={exam} />
              ))}
            </div>
          </div>

          {/* Upcoming Exams + Assignments */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card
              className="rounded-2xl shadow-card"
              style={{
                background:
                  "linear-gradient(135deg, #ede9fe 0%, #ddd6fe 60%, #c4b5fd 100%)",
                borderLeft: "4px solid #7c3aed",
              }}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-purple-900">
                  Upcoming Exams
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 space-y-2">
                {upcomingExams.map((exam) => (
                  <div
                    key={exam.subject}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-muted transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-4 h-4 text-red-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold truncate">
                        {exam.subject}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {exam.date.toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                        })}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className="text-[10px] flex-shrink-0"
                    >
                      {exam.type}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold">
                  Assignment Reminders
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 space-y-2">
                {assignments.map((a) => (
                  <div
                    key={a.title}
                    className={`flex items-center gap-3 p-2 rounded-xl transition-colors ${a.done ? "opacity-50" : "hover:bg-muted"}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${a.done ? "bg-green-100" : "bg-orange-100"}`}
                    >
                      <CheckCircle2
                        className={`w-4 h-4 ${a.done ? "text-green-600" : "text-orange-600"}`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-xs font-semibold truncate ${a.done ? "line-through" : ""}`}
                      >
                        {a.title}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {a.subject} · Due{" "}
                        {a.due.toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Goals + Streak + Badges */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Goal Creation */}
        <div className="lg:col-span-2">
          <h2 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-teal" /> Goals
          </h2>
          <Card className="rounded-2xl shadow-card mb-4">
            <CardContent className="p-5">
              <p className="text-sm font-medium mb-3">Create New Goal</p>
              <div className="flex gap-3">
                <Input
                  placeholder="e.g., Complete Java in 10 days"
                  value={newGoalTitle}
                  onChange={(e) => setNewGoalTitle(e.target.value)}
                  className="flex-1 rounded-xl"
                  onKeyDown={(e) => e.key === "Enter" && addGoal()}
                />
                <Input
                  type="number"
                  placeholder="Days"
                  value={newGoalDays}
                  onChange={(e) => setNewGoalDays(e.target.value)}
                  className="w-24 rounded-xl"
                  min={1}
                />
                <Button
                  onClick={addGoal}
                  className="bg-teal hover:bg-teal/90 text-white rounded-xl flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Add
                </Button>
              </div>
            </CardContent>
          </Card>
          <div className="space-y-3">
            {goals.map((goal) => (
              <Card
                key={goal.id}
                className="rounded-2xl shadow-card card-hover"
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-sm">{goal.title}</p>
                    <span className="text-xs text-muted-foreground">
                      {goal.days} days
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress value={goal.progress} className="flex-1 h-2" />
                    <span className="text-xs font-semibold text-teal w-10 text-right">
                      {goal.progress}%
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Streak + Badges */}
        <div className="space-y-4">
          <Card className="rounded-2xl shadow-card">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <Flame className="w-5 h-5 text-orange-500" />
                <h3 className="font-semibold text-base">Streak Tracker</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-orange-50 dark:bg-orange-950/30 rounded-xl">
                  <p className="text-3xl font-bold text-orange-500">47</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Current Streak
                  </p>
                </div>
                <div className="text-center p-3 bg-muted rounded-xl">
                  <p className="text-3xl font-bold text-foreground">89</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Best Streak
                  </p>
                </div>
              </div>
              <div className="flex gap-1 mt-3">
                {Array.from({ length: 14 }, (_, i) => (
                  <div
                    // biome-ignore lint/suspicious/noArrayIndexKey: static list
                    key={i}
                    className={`flex-1 h-5 rounded-sm ${i < 11 ? "bg-orange-400" : "bg-muted"}`}
                  />
                ))}
              </div>
              <p className="text-[10px] text-muted-foreground mt-1 text-center">
                Last 14 days
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-card">
            <CardContent className="p-5">
              <h3 className="font-semibold text-base mb-3 flex items-center gap-2">
                <Trophy className="w-4 h-4 text-yellow-500" /> Achievements
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {badges.map((badge) => {
                  const Icon = badge.icon;
                  return (
                    <div
                      key={badge.label}
                      className={`flex flex-col items-center gap-1.5 p-2 rounded-xl ${badge.earned ? badge.color : "bg-muted opacity-40"}`}
                    >
                      <Icon
                        className={`w-5 h-5 ${badge.earned ? "" : "text-muted-foreground"}`}
                      />
                      <p className="text-[9px] font-medium text-center leading-tight">
                        {badge.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
