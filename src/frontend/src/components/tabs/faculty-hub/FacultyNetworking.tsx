import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  Crown,
  Shield,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import { useState } from "react";

interface Faculty {
  id: number;
  name: string;
  department: string;
  designation: string;
  teachingScore: number;
  contributionIndex: number;
  researchCount: number;
  feedbackRating: number;
  overallScore: number;
  improvements: string[];
  avatar: string;
}

const mockFaculty: Faculty[] = [
  {
    id: 1,
    name: "Dr. Rajesh Kumar",
    department: "CSE",
    designation: "Professor",
    teachingScore: 94,
    contributionIndex: 88,
    researchCount: 12,
    feedbackRating: 4.8,
    overallScore: 92,
    avatar: "RK",
    improvements: [
      "Increase industry collaboration",
      "Mentor more student projects",
    ],
  },
  {
    id: 2,
    name: "Prof. Anita Sharma",
    department: "IT",
    designation: "Associate Professor",
    teachingScore: 89,
    contributionIndex: 82,
    researchCount: 8,
    feedbackRating: 4.6,
    overallScore: 87,
    avatar: "AS",
    improvements: [
      "Publish more research papers",
      "Attend national conferences",
    ],
  },
  {
    id: 3,
    name: "Dr. Suresh Nair",
    department: "ECE",
    designation: "Professor",
    teachingScore: 91,
    contributionIndex: 90,
    researchCount: 15,
    feedbackRating: 4.7,
    overallScore: 91,
    avatar: "SN",
    improvements: ["Improve student engagement scores", "Lead more workshops"],
  },
  {
    id: 4,
    name: "Prof. Meena Patel",
    department: "Mechanical",
    designation: "Assistant Professor",
    teachingScore: 78,
    contributionIndex: 65,
    researchCount: 4,
    feedbackRating: 4.2,
    overallScore: 72,
    avatar: "MP",
    improvements: [
      "Increase research publications",
      "Improve assignment feedback turnaround",
      "Participate in FDPs",
    ],
  },
  {
    id: 5,
    name: "Dr. Vikram Joshi",
    department: "Civil",
    designation: "Professor",
    teachingScore: 86,
    contributionIndex: 79,
    researchCount: 10,
    feedbackRating: 4.5,
    overallScore: 84,
    avatar: "VJ",
    improvements: [
      "Increase hackathon mentorship",
      "Contribute to curriculum design",
    ],
  },
  {
    id: 6,
    name: "Prof. Kavitha Reddy",
    department: "EEE",
    designation: "Associate Professor",
    teachingScore: 82,
    contributionIndex: 74,
    researchCount: 6,
    feedbackRating: 4.3,
    overallScore: 79,
    avatar: "KR",
    improvements: [
      "Publish in indexed journals",
      "Increase student project guidance",
    ],
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`w-3.5 h-3.5 ${s <= Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : s - 0.5 <= rating ? "text-yellow-400 fill-yellow-200" : "text-gray-300"}`}
        />
      ))}
      <span className="text-xs font-medium text-fhub-heading ml-1">
        {rating}
      </span>
    </div>
  );
}

export default function FacultyNetworking() {
  const [deptFilter, setDeptFilter] = useState("All");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const departments = ["All", "CSE", "IT", "ECE", "Mechanical", "Civil", "EEE"];

  const filtered =
    deptFilter === "All"
      ? mockFaculty
      : mockFaculty.filter((f) => f.department === deptFilter);

  const ranked = [...mockFaculty].sort(
    (a, b) => b.overallScore - a.overallScore,
  );

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-8 space-y-6">
      {/* Header Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <Select value={deptFilter} onValueChange={setDeptFilter}>
          <SelectTrigger className="w-40 border-fhub-border bg-white dark:bg-fhub-card text-fhub-heading text-sm">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            {departments.map((d) => (
              <SelectItem key={d} value={d}>
                {d === "All" ? "All Departments" : d}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button className="ml-auto bg-fhub-accent hover:bg-fhub-accent-dark text-white text-sm rounded-xl flex items-center gap-2">
          <Shield className="w-4 h-4" /> HOD Dashboard Access
        </Button>
      </div>

      {/* Ranking Leaderboard */}
      <div className="bg-white dark:bg-fhub-card rounded-2xl border border-fhub-border shadow-fhub p-6">
        <h3 className="font-display font-semibold text-fhub-heading text-base mb-4 flex items-center gap-2">
          <Crown className="w-4 h-4 text-yellow-500" />
          Faculty Performance Leaderboard
        </h3>
        <div className="space-y-2">
          {ranked.map((f, i) => (
            <div
              key={f.id}
              className={`flex items-center gap-4 p-3 rounded-xl transition-colors ${
                i === 0
                  ? "bg-yellow-50 border border-yellow-200"
                  : i === 1
                    ? "bg-gray-50 border border-gray-200"
                    : i === 2
                      ? "bg-orange-50 border border-orange-200"
                      : "bg-fhub-bg border border-fhub-border"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                  i === 0
                    ? "bg-yellow-400 text-white"
                    : i === 1
                      ? "bg-gray-400 text-white"
                      : i === 2
                        ? "bg-orange-400 text-white"
                        : "bg-fhub-badge-bg text-fhub-accent"
                }`}
              >
                {i + 1}
              </div>
              <div className="w-9 h-9 rounded-full bg-fhub-accent flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {f.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-fhub-heading truncate">
                  {f.name}
                </p>
                <p className="text-xs text-fhub-muted">
                  {f.department} · {f.designation}
                </p>
              </div>
              <div className="flex items-center gap-4 flex-shrink-0">
                <div className="text-right hidden sm:block">
                  <p className="text-xs text-fhub-muted">Teaching</p>
                  <p className="text-sm font-bold text-fhub-accent">
                    {f.teachingScore}
                  </p>
                </div>
                <div className="text-right hidden md:block">
                  <p className="text-xs text-fhub-muted">Research</p>
                  <p className="text-sm font-bold text-fhub-accent">
                    {f.researchCount} papers
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-fhub-muted">Overall</p>
                  <p className="text-lg font-display font-bold text-fhub-accent">
                    {f.overallScore}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Faculty Profile Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((faculty) => {
          const rank = ranked.findIndex((f) => f.id === faculty.id) + 1;
          const isExpanded = expandedId === faculty.id;
          return (
            <div
              key={faculty.id}
              className="bg-white dark:bg-fhub-card rounded-2xl border border-fhub-border shadow-fhub overflow-hidden"
            >
              {/* Card Header */}
              <div className="bg-gradient-to-r from-fhub-accent to-blue-600 p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center text-white font-bold text-base">
                    {faculty.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white text-sm truncate">
                      {faculty.name}
                    </p>
                    <p className="text-xs text-blue-100">
                      {faculty.designation}
                    </p>
                    <Badge className="mt-1 bg-white/20 text-white border-white/30 text-[10px]">
                      {faculty.department}
                    </Badge>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs text-blue-100">Rank</p>
                    <p className="text-2xl font-display font-bold text-white">
                      #{rank}
                    </p>
                  </div>
                </div>
              </div>

              {/* Metrics */}
              <div className="p-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-2.5 rounded-xl bg-fhub-bg">
                    <div className="flex items-center gap-1.5 mb-1">
                      <TrendingUp className="w-3.5 h-3.5 text-fhub-accent" />
                      <span className="text-[10px] text-fhub-muted">
                        Teaching Score
                      </span>
                    </div>
                    <p className="text-lg font-bold text-fhub-accent">
                      {faculty.teachingScore}
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-fhub-bg">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Users className="w-3.5 h-3.5 text-fhub-accent" />
                      <span className="text-[10px] text-fhub-muted">
                        Contribution
                      </span>
                    </div>
                    <p className="text-lg font-bold text-fhub-accent">
                      {faculty.contributionIndex}
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-fhub-bg">
                    <div className="flex items-center gap-1.5 mb-1">
                      <BookOpen className="w-3.5 h-3.5 text-fhub-accent" />
                      <span className="text-[10px] text-fhub-muted">
                        Research Papers
                      </span>
                    </div>
                    <p className="text-lg font-bold text-fhub-accent">
                      {faculty.researchCount}
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-fhub-bg">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] text-fhub-muted">
                        Student Feedback
                      </span>
                      <StarRating rating={faculty.feedbackRating} />
                    </div>
                  </div>
                </div>

                {/* Overall Score Bar */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-fhub-muted">
                      Overall Score
                    </span>
                    <span className="text-xs font-bold text-fhub-accent">
                      {faculty.overallScore}/100
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-fhub-bg overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-fhub-accent to-blue-500 transition-all duration-700"
                      style={{ width: `${faculty.overallScore}%` }}
                    />
                  </div>
                </div>

                {/* Suggestions Toggle */}
                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? null : faculty.id)}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl bg-fhub-bg hover:bg-fhub-badge-bg transition-colors cursor-pointer"
                >
                  <span className="text-xs font-medium text-fhub-heading">
                    Suggestions to Improve
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-fhub-muted" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-fhub-muted" />
                  )}
                </button>

                {isExpanded && (
                  <div className="space-y-1.5 animate-fade-in-up">
                    {faculty.improvements.map((imp, i) => (
                      <div
                        // biome-ignore lint/suspicious/noArrayIndexKey: static list
                        key={i}
                        className="flex items-start gap-2 p-2 rounded-lg bg-orange-50 border border-orange-100"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 flex-shrink-0" />
                        <span className="text-xs text-orange-700">{imp}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
