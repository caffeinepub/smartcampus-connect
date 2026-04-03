import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookOpen, MessageCircle, Plus, Users, Zap } from "lucide-react";
import { useState } from "react";

const examOptions = [
  "All",
  "GATE",
  "MPSC",
  "CAT",
  "GRE",
  "Placements",
  "GSoC",
  "Coding",
];

const students = [
  {
    id: 1,
    name: "Arihant Mahajan",
    branch: "CSE",
    year: 3,
    exam: "GATE",
    avatar: "AM",
    score: "AIR ~3200 (Mock)",
    streak: 47,
    topics: ["DAA", "TOC", "DBMS"],
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: 2,
    name: "Priya Sharma",
    branch: "CSE",
    year: 4,
    exam: "Placements",
    avatar: "PS",
    score: "2 Offers (TCS, Infosys)",
    streak: 62,
    topics: ["DSA", "System Design", "SQL"],
    color: "from-purple-500 to-pink-600",
  },
  {
    id: 3,
    name: "Rohan Patil",
    branch: "Mechanical",
    year: 2,
    exam: "GATE",
    avatar: "RP",
    score: "AIR 890 (Mock)",
    streak: 31,
    topics: ["Thermodynamics", "FM", "SOM"],
    color: "from-teal-500 to-emerald-600",
  },
  {
    id: 4,
    name: "Sneha Kulkarni",
    branch: "IT",
    year: 3,
    exam: "CAT",
    avatar: "SK",
    score: "94.5 %ile (Mock)",
    streak: 44,
    topics: ["Quant", "VARC", "DILR"],
    color: "from-orange-500 to-red-500",
  },
  {
    id: 5,
    name: "Amit Desai",
    branch: "E&TC",
    year: 4,
    exam: "GATE",
    avatar: "AD",
    score: "AIR 540 (Mock)",
    streak: 38,
    topics: ["Signals", "VLSI", "EMT"],
    color: "from-cyan-500 to-blue-500",
  },
  {
    id: 6,
    name: "Rahul More",
    branch: "CSE",
    year: 4,
    exam: "GSoC",
    avatar: "RM",
    score: "Proposal Submitted",
    streak: 25,
    topics: ["React", "Python", "Open Source"],
    color: "from-rose-500 to-pink-500",
  },
  {
    id: 7,
    name: "Neha Jadhav",
    branch: "Civil",
    year: 2,
    exam: "MPSC",
    avatar: "NJ",
    score: "Prelims Prep",
    streak: 74,
    topics: ["Polity", "Geography", "Economy"],
    color: "from-amber-500 to-orange-500",
  },
  {
    id: 8,
    name: "Pooja Singh",
    branch: "IT",
    year: 3,
    exam: "Placements",
    avatar: "PS",
    score: "1 Offer (Persistent)",
    streak: 29,
    topics: ["Java", "Spring Boot", "SQL"],
    color: "from-green-500 to-teal-500",
  },
];

const studyGroups = [
  {
    name: "GATE CSE 2026 — WIT Solapur",
    members: 14,
    exam: "GATE",
    active: true,
  },
  {
    name: "WIT Placement Prep 2025–26",
    members: 22,
    exam: "Placements",
    active: true,
  },
  { name: "CAT 2025 Solapur Group", members: 8, exam: "CAT", active: true },
  { name: "GSoC Aspirants WIT", members: 6, exam: "GSoC", active: false },
];

export default function CompetitiveExamHub() {
  const [selectedExam, setSelectedExam] = useState("All");
  const [showCreateProfile, setShowCreateProfile] = useState(false);

  const filtered =
    selectedExam === "All"
      ? students
      : students.filter((s) => s.exam === selectedExam);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="relative rounded-2xl overflow-hidden bg-pattern-lines">
        <div
          style={{
            background:
              "linear-gradient(135deg, #92400e 0%, #b45309 35%, #d97706 65%, #f59e0b 100%)",
          }}
          className="absolute inset-0"
        />
        <img
          src="/assets/generated/hero-bg.dim_1920x400.png"
          alt=""
          className="w-full h-40 object-cover opacity-20"
        />
        <div className="absolute inset-0 flex items-center justify-between px-8">
          <div>
            <img
              src="/assets/generated/nirgrantha-logo-transparent.dim_400x80.png"
              alt="NIRGRANTHA"
              className="nirgrantha-section-logo mb-1"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
            <h1 className="font-display text-2xl font-bold text-white mb-1">
              Competitive Exam Hub
            </h1>
            <p className="text-white/80 text-sm">
              Connect with peers, form study groups, and ace your exams
            </p>
          </div>
          <Button
            onClick={() => setShowCreateProfile(!showCreateProfile)}
            className="bg-white text-indigo-700 hover:bg-white/90 font-semibold rounded-xl shadow-lg flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Create Exam Profile
          </Button>
        </div>
      </div>

      {/* Create Profile Panel */}
      {showCreateProfile && (
        <Card className="rounded-2xl shadow-card border-indigo-200 dark:border-indigo-800 animate-fade-in-up">
          <CardContent className="p-6">
            <h3 className="font-semibold text-base mb-4 flex items-center gap-2">
              <Zap className="w-4 h-4 text-indigo-500" />
              Create Your Exam Profile
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="exam-target"
                  className="text-xs font-medium text-muted-foreground mb-1.5 block"
                >
                  Target Exam
                </label>
                <select
                  id="exam-target"
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal/50"
                >
                  {examOptions.slice(1).map((e) => (
                    <option key={e}>{e}</option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="exam-year"
                  className="text-xs font-medium text-muted-foreground mb-1.5 block"
                >
                  Target Year
                </label>
                <select
                  id="exam-year"
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal/50"
                >
                  <option>2026</option>
                  <option>2027</option>
                  <option>2028</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="exam-hours"
                  className="text-xs font-medium text-muted-foreground mb-1.5 block"
                >
                  Study Hours/Day
                </label>
                <select
                  id="exam-hours"
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal/50"
                >
                  <option>2-4 hours</option>
                  <option>4-6 hours</option>
                  <option>6-8 hours</option>
                  <option>8+ hours</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <Button className="bg-teal hover:bg-teal/90 text-white rounded-xl">
                Create Profile
              </Button>
              <Button
                variant="outline"
                className="rounded-xl"
                onClick={() => setShowCreateProfile(false)}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filter + Study Groups Row */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <label
            htmlFor="exam-filter"
            className="text-sm font-medium text-muted-foreground"
          >
            Filter by Exam:
          </label>
          <Select value={selectedExam} onValueChange={setSelectedExam}>
            <SelectTrigger className="w-40 rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {examOptions.map((e) => (
                <SelectItem key={e} value={e}>
                  {e}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Badge variant="outline" className="text-muted-foreground">
            {filtered.length} students
          </Badge>
        </div>
        <Button
          variant="outline"
          className="rounded-xl flex items-center gap-2 border-teal/30 text-teal hover:bg-teal-light"
        >
          <Users className="w-4 h-4" />
          Create Study Group
        </Button>
      </div>

      {/* Student Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered.map((student) => {
          const matchCount = students.filter(
            (s) => s.id !== student.id && s.exam === student.exam,
          ).length;
          return (
            <Card
              key={student.id}
              className="rounded-2xl shadow-card card-hover overflow-hidden"
            >
              <div className={`h-1.5 bg-gradient-to-r ${student.color}`} />
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div
                    className={`w-11 h-11 rounded-xl bg-gradient-to-br ${student.color} flex items-center justify-center text-white font-bold text-sm`}
                  >
                    {student.avatar}
                  </div>
                  {matchCount > 0 && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-teal-light text-teal">
                      <Zap className="w-2.5 h-2.5" />
                      {matchCount} match{matchCount > 1 ? "es" : ""}
                    </span>
                  )}
                </div>
                <h3 className="font-semibold text-sm">{student.name}</h3>
                <p className="text-xs text-muted-foreground">
                  {student.branch} · Year {student.year}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className="text-[10px] px-2 py-0.5 bg-indigo-100 text-indigo-700 hover:bg-indigo-100 border-0">
                    {student.exam}
                  </Badge>
                  <span className="text-[10px] text-muted-foreground">
                    🔥 {student.streak}d streak
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1.5">
                  {student.score}
                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {student.topics.map((t) => (
                    <span key={t} className="badge-skill">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2 mt-4">
                  <Button
                    size="sm"
                    className="flex-1 h-8 text-xs rounded-lg bg-teal hover:bg-teal/90 text-white"
                  >
                    Connect
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-8 w-8 rounded-lg flex-shrink-0"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Study Groups */}
      <div>
        <h2 className="font-display font-semibold text-lg mb-4">
          Active Study Groups
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {studyGroups.map((group) => (
            <Card
              key={group.name}
              className="rounded-2xl shadow-card card-hover"
            >
              <CardContent className="p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal to-emerald flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm">{group.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {group.members} members · {group.exam}
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  <div
                    className={`w-2 h-2 rounded-full ${group.active ? "bg-green-500 animate-pulse" : "bg-gray-400"}`}
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 text-xs rounded-lg"
                  >
                    Join
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
