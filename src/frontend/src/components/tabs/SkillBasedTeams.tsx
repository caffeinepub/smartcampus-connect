import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Calendar,
  ExternalLink,
  Github,
  Linkedin,
  Search,
  UserPlus,
  Users,
} from "lucide-react";
import { useState } from "react";
import { SiGithub, SiLinkedin } from "react-icons/si";

type StudentType = "software" | "hardware";

interface Student {
  id: number;
  name: string;
  branch: string;
  year: number;
  type: StudentType;
  skills: string[];
  projects: number;
  github: string;
  linkedin: string;
  avatar: string;
  color: string;
  bio: string;
}

const students: Student[] = [
  {
    id: 1,
    name: "Arjun Mehta",
    branch: "CSE",
    year: 3,
    type: "software",
    skills: ["React", "Node.js", "Python", "ML"],
    projects: 8,
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    avatar: "AM",
    color: "from-blue-500 to-indigo-600",
    bio: "Full-stack dev passionate about AI",
  },
  {
    id: 2,
    name: "Priya Nair",
    branch: "IT",
    year: 4,
    type: "software",
    skills: ["Flutter", "Firebase", "Dart", "UI/UX"],
    projects: 6,
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    avatar: "PN",
    color: "from-purple-500 to-pink-600",
    bio: "Mobile app developer & designer",
  },
  {
    id: 3,
    name: "Rahul Singh",
    branch: "CSE",
    year: 3,
    type: "software",
    skills: ["Java", "Spring Boot", "AWS", "Docker"],
    projects: 11,
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    avatar: "RS",
    color: "from-teal-500 to-emerald-600",
    bio: "Backend engineer & cloud enthusiast",
  },
  {
    id: 4,
    name: "Sneha Patel",
    branch: "IT",
    year: 2,
    type: "software",
    skills: ["Python", "TensorFlow", "Data Science", "SQL"],
    projects: 5,
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    avatar: "SP",
    color: "from-orange-500 to-red-500",
    bio: "Data scientist in the making",
  },
  {
    id: 5,
    name: "Vikram Rao",
    branch: "ECE",
    year: 4,
    type: "hardware",
    skills: ["VLSI", "Verilog", "FPGA", "PCB Design"],
    projects: 7,
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    avatar: "VR",
    color: "from-cyan-500 to-blue-500",
    bio: "VLSI design & embedded systems",
  },
  {
    id: 6,
    name: "Ananya Krishnan",
    branch: "ECE",
    year: 3,
    type: "hardware",
    skills: ["Arduino", "Raspberry Pi", "IoT", "C++"],
    projects: 9,
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    avatar: "AK",
    color: "from-rose-500 to-pink-500",
    bio: "IoT & embedded systems developer",
  },
  {
    id: 7,
    name: "Karthik Iyer",
    branch: "EEE",
    year: 4,
    type: "hardware",
    skills: ["Power Electronics", "MATLAB", "Simulink", "PLC"],
    projects: 4,
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    avatar: "KI",
    color: "from-amber-500 to-orange-500",
    bio: "Power systems & automation engineer",
  },
  {
    id: 8,
    name: "Divya Menon",
    branch: "ECE",
    year: 2,
    type: "hardware",
    skills: ["Signal Processing", "MATLAB", "RF Design", "Antenna"],
    projects: 3,
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    avatar: "DM",
    color: "from-green-500 to-teal-500",
    bio: "RF & communication systems",
  },
];

const hackathons = [
  {
    name: "Smart India Hackathon 2026",
    date: "Mar 20–22, 2026",
    type: "National",
    prize: "₹1,00,000",
    tags: ["AI", "IoT", "Web"],
  },
  {
    name: "HackMIT India Edition",
    date: "Apr 5–6, 2026",
    type: "International",
    prize: "$5,000",
    tags: ["ML", "Blockchain", "Cloud"],
  },
  {
    name: "IIT Bombay Techfest Hackathon",
    date: "Apr 15–16, 2026",
    type: "National",
    prize: "₹50,000",
    tags: ["Hardware", "Robotics", "AI"],
  },
  {
    name: "Google Solution Challenge",
    date: "May 1, 2026",
    type: "Global",
    prize: "Mentorship + Prizes",
    tags: ["Android", "Firebase", "ML"],
  },
];

export default function SkillBasedTeams() {
  const [activeType, setActiveType] = useState<StudentType>("software");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = students.filter((s) => {
    const matchType = s.type === activeType;
    const matchSearch =
      !searchQuery ||
      s.skills.some((sk) =>
        sk.toLowerCase().includes(searchQuery.toLowerCase()),
      ) ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchType && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="relative rounded-2xl overflow-hidden bg-pattern-dots">
        <div
          style={{
            background:
              "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 35%, #2563eb 65%, #3b82f6 100%)",
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
            <img
              src="/assets/generated/nirgrantha-logo-transparent.dim_400x80.png"
              alt="NIRGRANTHA"
              className="nirgrantha-section-logo mb-1"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
            <h1 className="font-display text-2xl font-bold text-white mb-1">
              Skill-Based Team Selection
            </h1>
            <p className="text-white/80 text-sm">
              Find the right teammates for your next big project or hackathon
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Toggle */}
        <div className="flex items-center bg-muted rounded-xl p-1 gap-1">
          <button
            type="button"
            onClick={() => setActiveType("software")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeType === "software" ? "bg-teal text-white shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
          >
            💻 Software Students
          </button>
          <button
            type="button"
            onClick={() => setActiveType("hardware")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeType === "hardware" ? "bg-teal text-white shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
          >
            🔧 Hardware Students
          </button>
        </div>

        {/* Search */}
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by skill..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 rounded-xl"
          />
        </div>

        <Badge variant="outline" className="text-muted-foreground">
          {filtered.length} students found
        </Badge>
      </div>

      {/* Student Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered.map((student) => (
          <Card
            key={student.id}
            className="rounded-2xl shadow-card card-hover overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 60%, #93c5fd 100%)",
              borderLeft: "4px solid #2563eb",
            }}
          >
            <div className={`h-1.5 bg-gradient-to-r ${student.color}`} />
            <CardContent className="p-5">
              <div className="flex items-start gap-3 mb-3">
                <div
                  className={`w-11 h-11 rounded-xl bg-gradient-to-br ${student.color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}
                >
                  {student.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm">{student.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {student.branch} · Year {student.year}
                  </p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                {student.bio}
              </p>
              <div className="flex flex-wrap gap-1 mb-3">
                {student.skills.map((skill) => (
                  <span key={skill} className="badge-skill">
                    {skill}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                <span className="flex items-center gap-1">
                  <Github className="w-3 h-3" /> {student.projects} projects
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href={student.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors"
                  >
                    <SiGithub className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={student.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600 transition-colors"
                  >
                    <SiLinkedin className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
              <Button
                size="sm"
                className="w-full h-8 text-xs rounded-lg bg-teal hover:bg-teal/90 text-white flex items-center gap-1.5"
              >
                <UserPlus className="w-3.5 h-3.5" /> Invite to Team
              </Button>
            </CardContent>
          </Card>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            <Users className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="text-sm">No students found matching your search.</p>
          </div>
        )}
      </div>

      {/* Hackathons */}
      <div>
        <h2 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-teal" /> Upcoming Hackathons
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {hackathons.map((h) => (
            <Card
              key={h.name}
              className="rounded-2xl shadow-card card-hover"
              style={{
                background:
                  "linear-gradient(135deg, #eff6ff 0%, #dbeafe 60%, #bfdbfe 100%)",
                borderLeft: "4px solid #3b82f6",
              }}
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-semibold text-sm">{h.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {h.date}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="text-[10px] flex-shrink-0"
                  >
                    {h.type}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {h.tags.map((tag) => (
                    <span key={tag} className="badge-skill">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-teal">
                    {h.prize}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 text-xs rounded-lg border-teal/30 text-teal hover:bg-teal-light flex items-center gap-1"
                  >
                    Register <ExternalLink className="w-3 h-3" />
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
