import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  AlertTriangle,
  BarChart3,
  BookOpen,
  Calendar,
  TrendingUp,
} from "lucide-react";

const branchProgress = [
  {
    branch: "CSE",
    completion: 78,
    topics: 42,
    total: 54,
    color: "bg-blue-500",
  },
  {
    branch: "IT",
    completion: 65,
    topics: 35,
    total: 54,
    color: "bg-indigo-500",
  },
  {
    branch: "ECE",
    completion: 82,
    topics: 44,
    total: 54,
    color: "bg-cyan-500",
  },
  {
    branch: "Mechanical",
    completion: 55,
    topics: 30,
    total: 54,
    color: "bg-orange-500",
  },
  {
    branch: "Civil",
    completion: 70,
    topics: 38,
    total: 54,
    color: "bg-teal-500",
  },
  {
    branch: "EEE",
    completion: 60,
    topics: 32,
    total: 54,
    color: "bg-purple-500",
  },
];

const divisionProgress = [
  { div: "Division A", completion: 72, students: 60 },
  { div: "Division B", completion: 65, students: 58 },
  { div: "Division C", completion: 58, students: 55 },
  { div: "Division D", completion: 80, students: 52 },
];

const topicTimeline = [
  { name: "Arrays", covered: true },
  { name: "Linked Lists", covered: true },
  { name: "Stacks", covered: true },
  { name: "Queues", covered: true },
  { name: "Trees", covered: true },
  { name: "Graphs", covered: false },
  { name: "Hashing", covered: false },
  { name: "DP", covered: false },
  { name: "Sorting", covered: false },
  { name: "Searching", covered: false },
];

const pendingTopics = [
  {
    subject: "Data Structures",
    topic: "Graphs & BFS/DFS",
    daysOverdue: 3,
    branch: "CSE",
  },
  {
    subject: "Algorithms",
    topic: "NP-Completeness",
    daysOverdue: 1,
    branch: "CSE",
  },
  {
    subject: "DBMS",
    topic: "Transaction Management",
    daysOverdue: 5,
    branch: "IT",
  },
  {
    subject: "Networks",
    topic: "TCP/IP Protocol Suite",
    daysOverdue: 2,
    branch: "ECE",
  },
];

const heatmapData = [
  { subject: "Data Structures", weeks: [5, 4, 5, 3, 2, 1, 0, 0] },
  { subject: "Algorithms", weeks: [4, 5, 4, 4, 3, 2, 1, 0] },
  { subject: "DBMS", weeks: [3, 3, 4, 5, 4, 3, 2, 1] },
  { subject: "OS", weeks: [2, 3, 3, 4, 5, 4, 3, 2] },
  { subject: "Networks", weeks: [1, 2, 2, 3, 4, 5, 4, 3] },
];

const heatIntensity = (val: number) => {
  if (val === 0) return "bg-gray-100 dark:bg-gray-800";
  if (val === 1) return "bg-blue-100";
  if (val === 2) return "bg-blue-200";
  if (val === 3) return "bg-blue-300";
  if (val === 4) return "bg-blue-400";
  return "bg-blue-600";
};

export default function ClassTopicTracking() {
  const overallCompletion = Math.round(
    branchProgress.reduce((sum, b) => sum + b.completion, 0) /
      branchProgress.length,
  );

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-8 space-y-6">
      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: "Overall Completion",
            value: `${overallCompletion}%`,
            icon: TrendingUp,
            color: "text-blue-600",
          },
          {
            label: "Topics Covered",
            value: "221",
            icon: BookOpen,
            color: "text-indigo-600",
          },
          {
            label: "Pending Topics",
            value: "103",
            icon: AlertTriangle,
            color: "text-orange-500",
          },
          {
            label: "Weeks Remaining",
            value: "8",
            icon: Calendar,
            color: "text-teal-600",
          },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white dark:bg-fhub-card rounded-2xl border border-fhub-border shadow-fhub p-4"
            >
              <div className="flex items-center gap-2 mb-1">
                <Icon className={`w-4 h-4 ${stat.color}`} />
                <span className="text-xs text-fhub-muted">{stat.label}</span>
              </div>
              <p className={`text-2xl font-display font-bold ${stat.color}`}>
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Branch Progress + Semester Tracker */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Branch-wise Progress */}
        <div className="lg:col-span-2 bg-white dark:bg-fhub-card rounded-2xl border border-fhub-border shadow-fhub p-6">
          <h3 className="font-display font-semibold text-fhub-heading text-base mb-4 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-fhub-accent" />
            Branch-wise Syllabus Progress
          </h3>
          <div className="space-y-4">
            {branchProgress.map((b) => (
              <div key={b.branch}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-fhub-heading">
                    {b.branch}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-fhub-muted">
                      {b.topics}/{b.total} topics
                    </span>
                    <span className="text-sm font-bold text-fhub-accent">
                      {b.completion}%
                    </span>
                  </div>
                </div>
                <div className="h-2.5 rounded-full bg-fhub-bg overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${b.color}`}
                    style={{ width: `${b.completion}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Semester Completion Tracker */}
        <div className="bg-white dark:bg-fhub-card rounded-2xl border border-fhub-border shadow-fhub p-6 flex flex-col items-center justify-center">
          <h3 className="font-display font-semibold text-fhub-heading text-base mb-4">
            Semester Completion
          </h3>
          <div className="relative w-36 h-36">
            <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
              <title>Semester Completion</title>
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="10"
              />
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="10"
                strokeDasharray={`${2 * Math.PI * 50}`}
                strokeDashoffset={`${2 * Math.PI * 50 * (1 - overallCompletion / 100)}`}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-display font-bold text-fhub-accent">
                {overallCompletion}%
              </span>
              <span className="text-xs text-fhub-muted">Complete</span>
            </div>
          </div>
          <p className="text-xs text-fhub-muted mt-4 text-center">
            Semester VI · Academic Year 2025–26
          </p>
          <div className="mt-3 w-full space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-fhub-muted">Weeks elapsed</span>
              <span className="font-medium text-fhub-heading">10 / 18</span>
            </div>
            <Progress
              value={55}
              className="h-1.5 bg-fhub-bg [&>div]:bg-blue-400"
            />
          </div>
        </div>
      </div>

      {/* Division Progress */}
      <div className="bg-white dark:bg-fhub-card rounded-2xl border border-fhub-border shadow-fhub p-6">
        <h3 className="font-display font-semibold text-fhub-heading text-base mb-4">
          Division-wise Syllabus Completion
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {divisionProgress.map((d) => (
            <div
              key={d.div}
              className="p-4 rounded-xl bg-fhub-bg border border-fhub-border"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-fhub-heading">
                  {d.div}
                </span>
                <span className="text-sm font-bold text-fhub-accent">
                  {d.completion}%
                </span>
              </div>
              <Progress
                value={d.completion}
                className="h-2 mb-2 bg-white [&>div]:bg-fhub-accent"
              />
              <p className="text-xs text-fhub-muted">{d.students} students</p>
            </div>
          ))}
        </div>
      </div>

      {/* Topic Timeline */}
      <div className="bg-white dark:bg-fhub-card rounded-2xl border border-fhub-border shadow-fhub p-6">
        <h3 className="font-display font-semibold text-fhub-heading text-base mb-4">
          Topic Timeline · Data Structures (CSE)
        </h3>
        <div className="flex items-center gap-0 overflow-x-auto pb-2">
          {topicTimeline.map((topic, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: static list
            <div key={i} className="flex items-center flex-shrink-0">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                    topic.covered
                      ? "bg-fhub-accent border-fhub-accent text-white"
                      : "bg-white border-gray-300 text-gray-400"
                  }`}
                >
                  {i + 1}
                </div>
                <span
                  className={`text-[10px] mt-1.5 text-center max-w-[56px] leading-tight ${
                    topic.covered
                      ? "text-fhub-accent font-medium"
                      : "text-fhub-muted"
                  }`}
                >
                  {topic.name}
                </span>
              </div>
              {i < topicTimeline.length - 1 && (
                <div
                  className={`w-8 h-0.5 flex-shrink-0 mb-5 ${topic.covered ? "bg-fhub-accent" : "bg-gray-200"}`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Pending Syllabus + Heatmap */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Syllabus */}
        <div className="bg-white dark:bg-fhub-card rounded-2xl border border-fhub-border shadow-fhub p-6">
          <h3 className="font-display font-semibold text-fhub-heading text-base mb-4 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-orange-500" />
            Pending Syllabus Alerts
          </h3>
          <div className="space-y-3">
            {pendingTopics.map((p, i) => (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: static list
                key={i}
                className="flex items-center gap-3 p-3 rounded-xl bg-orange-50 border border-orange-100"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium text-fhub-heading">
                    {p.topic}
                  </p>
                  <p className="text-xs text-fhub-muted">
                    {p.subject} · {p.branch}
                  </p>
                </div>
                <Badge className="bg-orange-100 text-orange-700 border-orange-200 text-xs whitespace-nowrap">
                  {p.daysOverdue}d overdue
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Subject Coverage Heatmap */}
        <div className="bg-white dark:bg-fhub-card rounded-2xl border border-fhub-border shadow-fhub p-6">
          <h3 className="font-display font-semibold text-fhub-heading text-base mb-4">
            Subject Coverage Heatmap
          </h3>
          <div className="overflow-x-auto">
            <div className="min-w-[320px]">
              <div className="flex gap-1 mb-1 ml-28">
                {["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"].map((w) => (
                  <div
                    key={w}
                    className="w-8 text-center text-[10px] text-fhub-muted"
                  >
                    {w}
                  </div>
                ))}
              </div>
              {heatmapData.map((row) => (
                <div key={row.subject} className="flex items-center gap-1 mb-1">
                  <span className="w-28 text-xs text-fhub-muted text-right pr-2 truncate">
                    {row.subject}
                  </span>
                  {row.weeks.map((val, wi) => (
                    <div
                      // biome-ignore lint/suspicious/noArrayIndexKey: static list
                      key={wi}
                      className={`w-8 h-8 rounded-md ${heatIntensity(val)} transition-all`}
                      title={`${row.subject} W${wi + 1}: ${val} topics`}
                    />
                  ))}
                </div>
              ))}
              <div className="flex items-center gap-2 mt-3 ml-28">
                <span className="text-[10px] text-fhub-muted">Low</span>
                {[0, 1, 2, 3, 4, 5].map((v) => (
                  <div
                    key={v}
                    className={`w-4 h-4 rounded ${heatIntensity(v)}`}
                  />
                ))}
                <span className="text-[10px] text-fhub-muted">High</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
