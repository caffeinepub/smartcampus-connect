import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertCircle,
  BookOpen,
  CheckCircle2,
  Clock,
  Code2,
  ExternalLink,
  Github,
  Linkedin,
  Phone,
} from "lucide-react";
import { useState } from "react";

const branches = [
  "CSE",
  "IT",
  "ECE",
  "Mechanical",
  "Civil",
  "EEE",
  "Chemical",
  "Aerospace",
];

const semesterData: Record<
  number,
  {
    subjects: {
      name: string;
      credits: number;
      progress: number;
      status: "completed" | "ongoing" | "upcoming";
    }[];
    teachers: {
      name: string;
      phone: string;
      qualification: string;
      subject: string;
      linkedin: string;
    }[];
  }
> = {
  1: {
    subjects: [
      {
        name: "Engineering Mathematics I",
        credits: 4,
        progress: 100,
        status: "completed",
      },
      {
        name: "Engineering Physics",
        credits: 3,
        progress: 100,
        status: "completed",
      },
      {
        name: "Programming Fundamentals",
        credits: 4,
        progress: 100,
        status: "completed",
      },
      {
        name: "Engineering Drawing",
        credits: 2,
        progress: 100,
        status: "completed",
      },
    ],
    teachers: [
      {
        name: "Dr. Priya Sharma",
        phone: "+91 98765 43210",
        qualification: "Ph.D Mathematics, IIT Delhi",
        subject: "Engineering Mathematics",
        linkedin: "https://linkedin.com",
      },
      {
        name: "Prof. Rajesh Kumar",
        phone: "+91 87654 32109",
        qualification: "M.Tech Physics, NIT Trichy",
        subject: "Engineering Physics",
        linkedin: "https://linkedin.com",
      },
    ],
  },
  2: {
    subjects: [
      {
        name: "Engineering Mathematics II",
        credits: 4,
        progress: 100,
        status: "completed",
      },
      {
        name: "Data Structures",
        credits: 4,
        progress: 100,
        status: "completed",
      },
      {
        name: "Digital Electronics",
        credits: 3,
        progress: 100,
        status: "completed",
      },
      {
        name: "Object Oriented Programming",
        credits: 4,
        progress: 100,
        status: "completed",
      },
    ],
    teachers: [
      {
        name: "Dr. Anita Verma",
        phone: "+91 76543 21098",
        qualification: "Ph.D CS, IISc Bangalore",
        subject: "Data Structures",
        linkedin: "https://linkedin.com",
      },
      {
        name: "Prof. Suresh Nair",
        phone: "+91 65432 10987",
        qualification: "M.Tech ECE, IIT Bombay",
        subject: "Digital Electronics",
        linkedin: "https://linkedin.com",
      },
    ],
  },
  3: {
    subjects: [
      {
        name: "Algorithms & Complexity",
        credits: 4,
        progress: 85,
        status: "ongoing",
      },
      {
        name: "Database Management",
        credits: 4,
        progress: 72,
        status: "ongoing",
      },
      {
        name: "Computer Networks",
        credits: 3,
        progress: 60,
        status: "ongoing",
      },
      {
        name: "Operating Systems",
        credits: 4,
        progress: 78,
        status: "ongoing",
      },
    ],
    teachers: [
      {
        name: "Dr. Kavitha Reddy",
        phone: "+91 54321 09876",
        qualification: "Ph.D Algorithms, IIT Madras",
        subject: "Algorithms",
        linkedin: "https://linkedin.com",
      },
      {
        name: "Prof. Mohan Das",
        phone: "+91 43210 98765",
        qualification: "M.Tech CS, BITS Pilani",
        subject: "DBMS",
        linkedin: "https://linkedin.com",
      },
    ],
  },
  4: {
    subjects: [
      {
        name: "Software Engineering",
        credits: 4,
        progress: 0,
        status: "upcoming",
      },
      { name: "Machine Learning", credits: 4, progress: 0, status: "upcoming" },
      { name: "Web Technologies", credits: 3, progress: 0, status: "upcoming" },
      {
        name: "Theory of Computation",
        credits: 3,
        progress: 0,
        status: "upcoming",
      },
    ],
    teachers: [
      {
        name: "Dr. Ravi Shankar",
        phone: "+91 32109 87654",
        qualification: "Ph.D SE, IIT Kharagpur",
        subject: "Software Engineering",
        linkedin: "https://linkedin.com",
      },
    ],
  },
  5: {
    subjects: [
      {
        name: "Artificial Intelligence",
        credits: 4,
        progress: 0,
        status: "upcoming",
      },
      { name: "Cloud Computing", credits: 3, progress: 0, status: "upcoming" },
      { name: "Compiler Design", credits: 4, progress: 0, status: "upcoming" },
      {
        name: "Computer Graphics",
        credits: 3,
        progress: 0,
        status: "upcoming",
      },
    ],
    teachers: [],
  },
  6: {
    subjects: [
      {
        name: "Distributed Systems",
        credits: 4,
        progress: 0,
        status: "upcoming",
      },
      {
        name: "Information Security",
        credits: 3,
        progress: 0,
        status: "upcoming",
      },
      { name: "Mobile Computing", credits: 3, progress: 0, status: "upcoming" },
      {
        name: "Big Data Analytics",
        credits: 4,
        progress: 0,
        status: "upcoming",
      },
    ],
    teachers: [],
  },
  7: {
    subjects: [
      { name: "Deep Learning", credits: 4, progress: 0, status: "upcoming" },
      {
        name: "Blockchain Technology",
        credits: 3,
        progress: 0,
        status: "upcoming",
      },
      { name: "IoT Systems", credits: 3, progress: 0, status: "upcoming" },
      { name: "Project Work I", credits: 6, progress: 0, status: "upcoming" },
    ],
    teachers: [],
  },
  8: {
    subjects: [
      { name: "Project Work II", credits: 8, progress: 0, status: "upcoming" },
      { name: "Elective I", credits: 3, progress: 0, status: "upcoming" },
      { name: "Elective II", credits: 3, progress: 0, status: "upcoming" },
      {
        name: "Industrial Training",
        credits: 4,
        progress: 0,
        status: "upcoming",
      },
    ],
    teachers: [],
  },
};

const exams = [
  {
    name: "Mid Semester Exam",
    subject: "Algorithms & Complexity",
    date: "Mar 15, 2026",
    status: "upcoming",
  },
  {
    name: "Lab Assessment",
    subject: "Database Management",
    date: "Mar 10, 2026",
    status: "upcoming",
  },
  {
    name: "End Semester Exam",
    subject: "Operating Systems",
    date: "Apr 20, 2026",
    status: "scheduled",
  },
  {
    name: "Quiz 2",
    subject: "Computer Networks",
    date: "Feb 28, 2026",
    status: "completed",
  },
];

const statusConfig = {
  completed: {
    label: "Completed",
    color: "bg-emerald-100 text-emerald-700",
    icon: CheckCircle2,
  },
  ongoing: {
    label: "Ongoing",
    color: "bg-blue-100 text-blue-700",
    icon: Clock,
  },
  upcoming: {
    label: "Upcoming",
    color: "bg-orange-100 text-orange-700",
    icon: AlertCircle,
  },
  scheduled: {
    label: "Scheduled",
    color: "bg-purple-100 text-purple-700",
    icon: Clock,
  },
};

export default function AcademicRoadmaps() {
  const [selectedBranch, setSelectedBranch] = useState("CSE");
  const [selectedSem, setSelectedSem] = useState(3);

  const semData = semesterData[selectedSem];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="relative rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal/90 to-emerald/80" />
        <img
          src="/assets/generated/hero-bg.dim_1920x400.png"
          alt=""
          className="w-full h-40 object-cover opacity-20"
        />
        <div className="absolute inset-0 flex items-center px-8">
          <div>
            <h1 className="font-display text-2xl font-bold text-white mb-1">
              Personalized Academic Roadmaps
            </h1>
            <p className="text-white/80 text-sm">
              Track your academic journey, subjects, and progress
            </p>
          </div>
        </div>
      </div>

      {/* Branch + Semester Selection */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-3">
          <label
            htmlFor="roadmap-branch"
            className="text-sm font-medium text-muted-foreground"
          >
            Branch:
          </label>
          <Select value={selectedBranch} onValueChange={setSelectedBranch}>
            <SelectTrigger className="w-40 rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {branches.map((b) => (
                <SelectItem key={b} value={b}>
                  {b}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Badge
          variant="outline"
          className="text-teal border-teal/30 bg-teal-light px-3 py-1"
        >
          {selectedBranch} — Semester {selectedSem}
        </Badge>
      </div>

      {/* Semester Timeline */}
      <Card className="rounded-2xl shadow-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">
            Semester Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-0 overflow-x-auto pb-2">
            {Array.from({ length: 8 }, (_, i) => i + 1).map((sem, idx) => (
              <div key={sem} className="flex items-center flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setSelectedSem(sem)}
                  className={`
                    flex flex-col items-center gap-1.5 px-3 py-2 rounded-xl transition-all duration-200
                    ${
                      selectedSem === sem
                        ? "bg-teal text-white shadow-teal scale-105"
                        : sem < selectedSem
                          ? "bg-emerald-light text-emerald hover:bg-emerald/20"
                          : "bg-muted text-muted-foreground hover:bg-accent"
                    }
                  `}
                >
                  <span className="text-xs font-bold">S{sem}</span>
                  <span className="text-[10px] opacity-80">Sem {sem}</span>
                </button>
                {idx < 7 && (
                  <div
                    className={`h-0.5 w-6 flex-shrink-0 ${sem < selectedSem ? "bg-emerald" : "bg-border"}`}
                  />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Subjects Grid */}
      <div>
        <h2 className="font-display font-semibold text-lg mb-4">
          Semester {selectedSem} Subjects
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {semData.subjects.map((subject) => {
            const cfg = statusConfig[subject.status];
            const Icon = cfg.icon;
            return (
              <Card
                key={subject.name}
                className="rounded-2xl shadow-card card-hover"
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <BookOpen className="w-5 h-5 text-teal mt-0.5" />
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${cfg.color}`}
                    >
                      <Icon className="w-3 h-3" />
                      {cfg.label}
                    </span>
                  </div>
                  <h3 className="font-semibold text-sm leading-snug mb-1">
                    {subject.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-3">
                    {subject.credits} Credits
                  </p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Progress</span>
                      <span>{subject.progress}%</span>
                    </div>
                    <Progress value={subject.progress} className="h-1.5" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Teachers + Exam Tracker */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Teachers */}
        <div>
          <h2 className="font-display font-semibold text-lg mb-4">
            Faculty Details
          </h2>
          {semData.teachers.length > 0 ? (
            <div className="space-y-3">
              {semData.teachers.map((teacher) => (
                <Card
                  key={teacher.name}
                  className="rounded-2xl shadow-card card-hover"
                >
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal to-emerald flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {teacher.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-semibold text-sm">
                            {teacher.name}
                          </h3>
                          <a
                            href={teacher.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-700 flex-shrink-0"
                          >
                            <Linkedin className="w-4 h-4" />
                          </a>
                        </div>
                        <p className="text-xs text-teal font-medium mt-0.5">
                          {teacher.subject}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {teacher.qualification}
                        </p>
                        <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
                          <Phone className="w-3 h-3" />
                          <span>{teacher.phone}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="rounded-2xl shadow-card">
              <CardContent className="p-8 text-center text-muted-foreground text-sm">
                Faculty details will be available when the semester begins.
              </CardContent>
            </Card>
          )}
        </div>

        {/* Exam Tracker */}
        <div>
          <h2 className="font-display font-semibold text-lg mb-4">
            Exam Tracker
          </h2>
          <div className="space-y-3">
            {exams.map((exam) => {
              const cfg =
                statusConfig[exam.status as keyof typeof statusConfig];
              const Icon = cfg.icon;
              return (
                <Card
                  key={exam.name}
                  className="rounded-2xl shadow-card card-hover"
                >
                  <CardContent className="p-4 flex items-center gap-4">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${cfg.color}`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm">{exam.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {exam.subject}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs font-medium">{exam.date}</p>
                      <span
                        className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${cfg.color}`}
                      >
                        {cfg.label}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Integrations */}
      <div>
        <h2 className="font-display font-semibold text-lg mb-4">
          Integrations
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Google Classroom */}
          <Card className="rounded-2xl shadow-card card-hover border-l-4 border-l-blue-500">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Google Classroom</p>
                  <p className="text-xs text-muted-foreground">
                    3 Active Classes
                  </p>
                </div>
              </div>
              <div className="space-y-1.5">
                {[
                  "Algorithms — Assignment 3 due",
                  "DBMS — Lab Report pending",
                  "OS — Quiz tomorrow",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 text-xs text-muted-foreground"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="mt-3 flex items-center gap-1 text-xs text-blue-600 hover:underline font-medium"
              >
                Open Classroom <ExternalLink className="w-3 h-3" />
              </button>
            </CardContent>
          </Card>

          {/* LeetCode */}
          <Card className="rounded-2xl shadow-card card-hover border-l-4 border-l-orange-500">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-orange-100 flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="font-semibold text-sm">LeetCode</p>
                  <p className="text-xs text-muted-foreground">@student_dev</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {[
                  { label: "Easy", count: 87, color: "text-green-600" },
                  { label: "Medium", count: 43, color: "text-yellow-600" },
                  { label: "Hard", count: 12, color: "text-red-600" },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <p className={`font-bold text-lg ${s.color}`}>{s.count}</p>
                    <p className="text-[10px] text-muted-foreground">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="font-medium text-foreground">Rank:</span>{" "}
                #42,891
              </div>
            </CardContent>
          </Card>

          {/* GitHub */}
          <Card className="rounded-2xl shadow-card card-hover border-l-4 border-l-gray-700">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <Github className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                </div>
                <div>
                  <p className="font-semibold text-sm">GitHub</p>
                  <p className="text-xs text-muted-foreground">@student_dev</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {[
                  { label: "Repos", count: 24 },
                  { label: "Stars", count: 156 },
                  { label: "Commits", count: 847 },
                  { label: "PRs", count: 38 },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="flex items-center justify-between text-xs"
                  >
                    <span className="text-muted-foreground">{s.label}</span>
                    <span className="font-semibold">{s.count}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1 text-xs text-green-600 font-medium">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                47 day streak
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
