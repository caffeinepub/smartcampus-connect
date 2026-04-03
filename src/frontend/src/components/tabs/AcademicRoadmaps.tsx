import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertCircle,
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  Clock,
  Code2,
  ExternalLink,
  Github,
  GraduationCap,
  Linkedin,
  Loader2,
  Phone,
  RefreshCw,
  Star,
  Target,
  Trophy,
  XCircle,
  Zap,
} from "lucide-react";
import { useState } from "react";
import GradientProgress from "../GradientProgress";

const branches = ["CSE", "IT", "Mechanical", "Civil", "E&TC", "MBA"];

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
        name: "Programming Fundamentals (C)",
        credits: 4,
        progress: 100,
        status: "completed",
      },
      {
        name: "Engineering Drawing & Graphics",
        credits: 2,
        progress: 100,
        status: "completed",
      },
      {
        name: "Basic Electrical Engineering",
        credits: 3,
        progress: 100,
        status: "completed",
      },
    ],
    teachers: [
      {
        name: "Dr. P.D. Kulkarni",
        phone: "+91 94220 11234",
        qualification: "Ph.D Mathematics, Solapur University",
        subject: "Engineering Mathematics I",
        linkedin: "https://linkedin.com/in/pdkulkarni-wit",
      },
      {
        name: "Prof. S.B. Patil",
        phone: "+91 98221 34567",
        qualification: "M.Sc Physics, SPPU Pune",
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
        name: "Data Structures using C",
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
        name: "Object Oriented Programming (Java)",
        credits: 4,
        progress: 100,
        status: "completed",
      },
      {
        name: "Discrete Mathematics",
        credits: 3,
        progress: 100,
        status: "completed",
      },
    ],
    teachers: [
      {
        name: "Dr. A.V. Kulkarni",
        phone: "+91 94222 56789",
        qualification: "Ph.D CS, DBATU Lonere",
        subject: "Data Structures",
        linkedin: "https://linkedin.com/in/avkulkarni-wit",
      },
      {
        name: "Prof. R.B. Shinde",
        phone: "+91 96734 12345",
        qualification: "M.Tech ECE, NIT Nagpur",
        subject: "Digital Electronics",
        linkedin: "https://linkedin.com",
      },
    ],
  },
  3: {
    subjects: [
      {
        name: "Computer Organization & Architecture",
        credits: 4,
        progress: 100,
        status: "completed",
      },
      {
        name: "Database Management Systems",
        credits: 4,
        progress: 100,
        status: "completed",
      },
      {
        name: "Operating Systems",
        credits: 4,
        progress: 100,
        status: "completed",
      },
      {
        name: "Object Oriented Analysis & Design",
        credits: 3,
        progress: 100,
        status: "completed",
      },
      {
        name: "Python Programming",
        credits: 3,
        progress: 100,
        status: "completed",
      },
    ],
    teachers: [
      {
        name: "Prof. M.K. Desai",
        phone: "+91 98230 67890",
        qualification: "M.Tech CS, VJTI Mumbai",
        subject: "DBMS",
        linkedin: "https://linkedin.com/in/mkdesai-wit",
      },
      {
        name: "Prof. A.P. More",
        phone: "+91 94230 23456",
        qualification: "M.Tech CS, BATU Lonere",
        subject: "Operating Systems",
        linkedin: "https://linkedin.com",
      },
    ],
  },
  4: {
    subjects: [
      {
        name: "Analysis of Algorithms",
        credits: 4,
        progress: 100,
        status: "completed",
      },
      {
        name: "Computer Networks",
        credits: 4,
        progress: 100,
        status: "completed",
      },
      {
        name: "Microprocessors & Interfacing",
        credits: 3,
        progress: 100,
        status: "completed",
      },
      {
        name: "Software Engineering",
        credits: 4,
        progress: 100,
        status: "completed",
      },
      {
        name: "Web Technologies",
        credits: 3,
        progress: 100,
        status: "completed",
      },
    ],
    teachers: [
      {
        name: "Prof. R.S. Jadhav",
        phone: "+91 95232 78901",
        qualification: "M.Tech CS, SPPU Pune",
        subject: "Analysis of Algorithms",
        linkedin: "https://linkedin.com/in/rsjadhav-wit",
      },
      {
        name: "Prof. N.B. Shinde",
        phone: "+91 97234 89012",
        qualification: "M.Tech CS, BATU Lonere",
        subject: "Software Engineering",
        linkedin: "https://linkedin.com",
      },
    ],
  },
  5: {
    subjects: [
      {
        name: "Design & Analysis of Algorithms",
        credits: 3,
        progress: 72,
        status: "ongoing",
      },
      {
        name: "Database Management Systems (Advanced)",
        credits: 3,
        progress: 80,
        status: "ongoing",
      },
      {
        name: "Theory of Computation",
        credits: 3,
        progress: 65,
        status: "ongoing",
      },
      {
        name: "Microprocessors & Interfacing",
        credits: 3,
        progress: 58,
        status: "ongoing",
      },
      {
        name: "Software Engineering",
        credits: 3,
        progress: 74,
        status: "ongoing",
      },
      {
        name: "Open Elective I",
        credits: 2,
        progress: 60,
        status: "ongoing",
      },
    ],
    teachers: [
      {
        name: "Prof. S.R. Patil",
        phone: "+91 94221 45678",
        qualification: "M.Tech CS, IIT Hyderabad",
        subject: "Design & Analysis of Algorithms",
        linkedin: "https://linkedin.com/in/srpatil-wit",
      },
      {
        name: "Prof. M.K. Desai",
        phone: "+91 98230 67890",
        qualification: "M.Tech CS, VJTI Mumbai",
        subject: "Database Management Systems",
        linkedin: "https://linkedin.com/in/mkdesai-wit",
      },
      {
        name: "Dr. A.V. Kulkarni",
        phone: "+91 94222 56789",
        qualification: "Ph.D CS, DBATU Lonere",
        subject: "Theory of Computation",
        linkedin: "https://linkedin.com/in/avkulkarni-wit",
      },
      {
        name: "Prof. R.S. Jadhav",
        phone: "+91 95232 78901",
        qualification: "M.Tech ECE, SPPU Pune",
        subject: "Microprocessors & Interfacing",
        linkedin: "https://linkedin.com/in/rsjadhav-wit",
      },
      {
        name: "Prof. N.B. Shinde",
        phone: "+91 97234 89012",
        qualification: "M.Tech SE, BATU Lonere",
        subject: "Software Engineering",
        linkedin: "https://linkedin.com/in/nbshinde-wit",
      },
    ],
  },
  6: {
    subjects: [
      {
        name: "Compiler Design",
        credits: 3,
        progress: 0,
        status: "upcoming",
      },
      {
        name: "Computer Networks (Advanced)",
        credits: 3,
        progress: 0,
        status: "upcoming",
      },
      {
        name: "Distributed Systems",
        credits: 3,
        progress: 0,
        status: "upcoming",
      },
      {
        name: "Machine Learning",
        credits: 3,
        progress: 0,
        status: "upcoming",
      },
      {
        name: "Web Technologies (Advanced)",
        credits: 3,
        progress: 0,
        status: "upcoming",
      },
      {
        name: "Major Project Phase I",
        credits: 4,
        progress: 0,
        status: "upcoming",
      },
    ],
    teachers: [],
  },
  7: {
    subjects: [
      {
        name: "Information Security",
        credits: 3,
        progress: 0,
        status: "upcoming",
      },
      {
        name: "Cloud Computing & DevOps",
        credits: 3,
        progress: 0,
        status: "upcoming",
      },
      {
        name: "Big Data Analytics",
        credits: 3,
        progress: 0,
        status: "upcoming",
      },
      { name: "Open Elective II", credits: 3, progress: 0, status: "upcoming" },
      {
        name: "Major Project Phase II",
        credits: 6,
        progress: 0,
        status: "upcoming",
      },
    ],
    teachers: [],
  },
  8: {
    subjects: [
      {
        name: "Major Project Phase III",
        credits: 8,
        progress: 0,
        status: "upcoming",
      },
      {
        name: "Professional Elective I",
        credits: 3,
        progress: 0,
        status: "upcoming",
      },
      {
        name: "Professional Elective II",
        credits: 3,
        progress: 0,
        status: "upcoming",
      },
      {
        name: "Industrial Training / Internship",
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
    name: "Unit Test I",
    subject: "Design & Analysis of Algorithms",
    date: "Feb 10, 2026",
    status: "completed",
  },
  {
    name: "Unit Test I",
    subject: "Database Management Systems",
    date: "Feb 12, 2026",
    status: "completed",
  },
  {
    name: "Unit Test II",
    subject: "Theory of Computation",
    date: "Mar 18, 2026",
    status: "upcoming",
  },
  {
    name: "Lab Assessment",
    subject: "Microprocessors & Interfacing",
    date: "Mar 22, 2026",
    status: "upcoming",
  },
  {
    name: "End Semester Exam (DBATU)",
    subject: "All Sem V Subjects",
    date: "May 5, 2026",
    status: "scheduled",
  },
  {
    name: "NPTEL Quiz",
    subject: "Open Elective I",
    date: "Apr 15, 2026",
    status: "upcoming",
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

interface GitHubData {
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  login: string;
  avatar_url?: string;
  top_repos?: { name: string; stars: number; language: string }[];
  top_languages?: string[];
}

interface LeetCodeData {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  ranking: number;
  acceptanceRate: number;
  username?: string;
}

interface ExamReadiness {
  exam: string;
  score: number;
  color: string;
  icon: string;
  tip: string;
  gradient: string;
  border: string;
}

interface CareerPath {
  title: string;
  match: number;
  color: string;
  bar: string;
}

interface SkillMatchResult {
  detectedSkills: {
    label: string;
    type: "language" | "dsa" | "professional";
  }[];
  examReadiness: ExamReadiness[];
  careerPaths: CareerPath[];
  gaps: string[];
  recommendations: string[];
}

function computeSkillMatch(
  githubData: GitHubData | null,
  leetcodeData: LeetCodeData | null,
  linkedinSaved: boolean,
): SkillMatchResult {
  const langs = githubData?.top_languages ?? [];
  const hasLang = (l: string) =>
    langs.some((x) => x.toLowerCase() === l.toLowerCase());

  // Detected skills
  const detectedSkills: SkillMatchResult["detectedSkills"] = [];
  for (const lang of langs) {
    detectedSkills.push({ label: lang, type: "language" });
  }
  if (leetcodeData) {
    if (leetcodeData.totalSolved > 200)
      detectedSkills.push({ label: "DSA Expert", type: "dsa" });
    if (leetcodeData.hardSolved > 30)
      detectedSkills.push({ label: "Competitive Programming", type: "dsa" });
    if (leetcodeData.mediumSolved > 100)
      detectedSkills.push({ label: "Problem Solving", type: "dsa" });
  }
  if (linkedinSaved)
    detectedSkills.push({
      label: "Professional Profile",
      type: "professional",
    });

  // Exam readiness scores
  const gate = Math.min(
    95,
    20 +
      (hasLang("C") || hasLang("C++") || hasLang("Python") ? 20 : 0) +
      ((leetcodeData?.totalSolved ?? 0) > 100 ? 15 : 0) +
      ((leetcodeData?.hardSolved ?? 0) > 10 ? 10 : 0) +
      ((leetcodeData?.mediumSolved ?? 0) > 50 ? 10 : 0),
  );

  const placements = Math.min(
    95,
    25 +
      ((leetcodeData?.totalSolved ?? 0) > 150 ? 20 : 0) +
      ((githubData?.public_repos ?? 0) > 5 ? 15 : 0) +
      (linkedinSaved ? 15 : 0) +
      ((leetcodeData?.easySolved ?? 0) > 50 ? 10 : 0),
  );

  const gsoc = Math.min(
    95,
    15 +
      ((githubData?.public_repos ?? 0) > 10 ? 25 : 0) +
      ((githubData?.followers ?? 0) > 20 ? 20 : 0) +
      (hasLang("JavaScript") || hasLang("TypeScript") || hasLang("Python")
        ? 15
        : 0),
  );

  const hackathons = Math.min(
    95,
    20 +
      ((githubData?.public_repos ?? 0) > 3 ? 20 : 0) +
      ((leetcodeData?.totalSolved ?? 0) > 50 ? 15 : 0) +
      (hasLang("JavaScript") || hasLang("React") || hasLang("Python")
        ? 15
        : 0) +
      ((leetcodeData?.hardSolved ?? 0) > 5 ? 10 : 0),
  );

  const internships = Math.min(
    95,
    30 +
      (linkedinSaved ? 15 : 0) +
      ((githubData?.public_repos ?? 0) > 5 ? 20 : 0) +
      ((leetcodeData?.totalSolved ?? 0) > 100 ? 15 : 0),
  );

  const certifications = Math.min(
    95,
    10 +
      (hasLang("Python") || hasLang("JavaScript") ? 25 : 0) +
      ((githubData?.public_repos ?? 0) > 8 ? 20 : 0) +
      ((leetcodeData?.totalSolved ?? 0) > 80 ? 15 : 0),
  );

  const examReadiness: ExamReadiness[] = [
    {
      exam: "GATE CSE",
      score: gate,
      color: "#4f46e5",
      icon: "🎓",
      tip: "Strengthen C/C++, algorithms & OS concepts",
      gradient: "linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)",
      border: "#6366f1",
    },
    {
      exam: "Campus Placements",
      score: placements,
      color: "#059669",
      icon: "🏢",
      tip: "Solve 150+ LeetCode problems & build projects",
      gradient: "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)",
      border: "#10b981",
    },
    {
      exam: "Open Source / GSoC",
      score: gsoc,
      color: "#d97706",
      icon: "🌐",
      tip: "Contribute to open source & grow GitHub followers",
      gradient: "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)",
      border: "#f59e0b",
    },
    {
      exam: "Hackathons",
      score: hackathons,
      color: "#7c3aed",
      icon: "⚡",
      tip: "Build more projects and sharpen full-stack skills",
      gradient: "linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)",
      border: "#8b5cf6",
    },
    {
      exam: "Internships",
      score: internships,
      color: "#0284c7",
      icon: "💼",
      tip: "Optimize LinkedIn and add more repos",
      gradient: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
      border: "#0ea5e9",
    },
    {
      exam: "Certifications (AWS/GCP)",
      score: certifications,
      color: "#0d9488",
      icon: "🏅",
      tip: "Learn Python/JS cloud SDKs and build cloud projects",
      gradient: "linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%)",
      border: "#14b8a6",
    },
  ];

  // Career paths
  const careerPaths: CareerPath[] = [
    {
      title: "Software Engineer",
      match: Math.round((gate + placements) / 2),
      color: "#4f46e5",
      bar: "linear-gradient(90deg, #6366f1, #818cf8)",
    },
    {
      title: "Research / M.Tech",
      match: gate,
      color: "#059669",
      bar: "linear-gradient(90deg, #10b981, #34d399)",
    },
    {
      title: "Open Source Developer",
      match: gsoc,
      color: "#d97706",
      bar: "linear-gradient(90deg, #f59e0b, #fbbf24)",
    },
    {
      title: "Startup / Product",
      match: hackathons,
      color: "#7c3aed",
      bar: "linear-gradient(90deg, #8b5cf6, #a78bfa)",
    },
    {
      title: "DevOps / Cloud",
      match: certifications,
      color: "#0d9488",
      bar: "linear-gradient(90deg, #14b8a6, #2dd4bf)",
    },
  ];

  // Gaps
  const gaps: string[] = [];
  if (!githubData) gaps.push("Add GitHub profile to showcase projects");
  else if ((githubData.public_repos ?? 0) < 3)
    gaps.push("Create more public repositories");
  if (!leetcodeData) gaps.push("Link LeetCode to show DSA skills");
  else if (leetcodeData.totalSolved < 100)
    gaps.push("Solve 100+ LeetCode problems for placements");
  if (leetcodeData && leetcodeData.hardSolved < 10)
    gaps.push("Practice Hard problems to stand out");
  if (!linkedinSaved) gaps.push("Add LinkedIn for professional presence");
  if (!hasLang("Python") && !hasLang("JavaScript"))
    gaps.push("Learn Python or JavaScript for broader opportunities");

  // Recommendations
  const recommendations: string[] = [
    placements < 60
      ? "Solve 2 LeetCode problems daily to boost placement readiness"
      : "Keep solving LeetCode to maintain your DSA edge",
    gsoc < 50
      ? "Star and fork popular repos to grow your GitHub presence"
      : "Submit your first open source PR this week",
    !linkedinSaved
      ? "Create a LinkedIn profile and connect with alumni"
      : "Update your LinkedIn with latest projects and skills",
    gate < 50
      ? "Start GATE preparation with Engineering Mathematics and Algorithms"
      : "Practice GATE previous year papers for final polish",
    hackathons < 60
      ? "Register for your college's upcoming hackathon"
      : "Lead a team in a national-level hackathon this semester",
  ];

  return { detectedSkills, examReadiness, careerPaths, gaps, recommendations };
}

export default function AcademicRoadmaps() {
  const [selectedBranch, setSelectedBranch] = useState("CSE");
  const [selectedSem, setSelectedSem] = useState(3);
  // GitHub state
  const [githubInput, setGithubInput] = useState("");
  const [githubData, setGithubData] = useState<GitHubData | null>(null);
  const [githubLoading, setGithubLoading] = useState(false);
  const [githubError, setGithubError] = useState("");
  const [githubConnected, setGithubConnected] = useState(false);

  // LeetCode state
  const [leetcodeInput, setLeetcodeInput] = useState("");
  const [leetcodeData, setLeetcodeData] = useState<LeetCodeData | null>(null);
  const [leetcodeLoading, setLeetcodeLoading] = useState(false);
  const [leetcodeError, setLeetcodeError] = useState("");
  const [leetcodeConnected, setLeetcodeConnected] = useState(false);

  // LinkedIn state
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [linkedinName, setLinkedinName] = useState("");
  const [linkedinSaved, setLinkedinSaved] = useState(false);
  const [linkedinInputUrl, setLinkedinInputUrl] = useState("");
  const [linkedinInputName, setLinkedinInputName] = useState("");

  const semData = semesterData[selectedSem];

  const handleGitHubConnect = async () => {
    if (!githubInput.trim()) return;
    setGithubLoading(true);
    setGithubError("");
    try {
      const [userRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${githubInput.trim()}`),
        fetch(
          `https://api.github.com/users/${githubInput.trim()}/repos?sort=updated&per_page=20`,
        ),
      ]);
      if (!userRes.ok) throw new Error("User not found");
      const user = await userRes.json();
      const repos = reposRes.ok ? await reposRes.json() : [];
      const langs = [
        ...new Set(repos.map((r: any) => r.language).filter(Boolean)),
      ] as string[];
      const parsed: GitHubData = {
        login: user.login,
        name: user.name,
        bio: user.bio,
        avatar_url: user.avatar_url,
        public_repos: user.public_repos,
        followers: user.followers,
        following: user.following,
        top_languages: langs,
        top_repos: repos.slice(0, 6).map((r: any) => ({
          name: r.name,
          language: r.language,
          stargazers_count: r.stargazers_count,
          html_url: r.html_url,
          description: r.description,
        })),
      };
      setGithubData(parsed);
      setGithubConnected(true);
    } catch (_e) {
      setGithubError("Could not connect to GitHub. Please check the username.");
    } finally {
      setGithubLoading(false);
    }
  };

  const handleLeetCodeConnect = async () => {
    if (!leetcodeInput.trim()) return;
    setLeetcodeLoading(true);
    setLeetcodeError("");
    try {
      const username = leetcodeInput.trim();
      // Use CORS-friendly public LeetCode stats API
      let data: Record<string, unknown> | null = null;
      try {
        const res1 = await fetch(
          `https://leetcode-stats-api.herokuapp.com/${username}`,
          { headers: { Accept: "application/json" } },
        );
        if (res1.ok) {
          const j = await res1.json();
          if (j && j.status !== "error") data = j;
        }
      } catch (_) {
        /* try fallback */
      }
      if (!data) {
        const res2 = await fetch(
          `https://alfa-leetcode-api.onrender.com/${username}`,
          { headers: { Accept: "application/json" } },
        );
        if (!res2.ok) throw new Error("Username not found on LeetCode");
        const j2 = await res2.json();
        if (!j2 || j2.errors) throw new Error("Username not found on LeetCode");
        data = j2;
      }
      const d = data!;
      const parsed: LeetCodeData = {
        totalSolved:
          (d.totalSolved as number) ?? (d.solvedProblem as number) ?? 0,
        easySolved:
          (d.easySolved as number) ?? (d.easySolvedProblem as number) ?? 0,
        mediumSolved:
          (d.mediumSolved as number) ?? (d.mediumSolvedProblem as number) ?? 0,
        hardSolved:
          (d.hardSolved as number) ?? (d.hardSolvedProblem as number) ?? 0,
        ranking: (d.ranking as number) ?? 0,
        acceptanceRate: (d.acceptanceRate as number) ?? 0,
        username,
      };
      setLeetcodeData(parsed);
      setLeetcodeConnected(true);
    } catch (_e) {
      setLeetcodeError(
        "Could not connect to LeetCode. Please check the username.",
      );
    } finally {
      setLeetcodeLoading(false);
    }
  };

  const handleLinkedInSave = () => {
    if (!linkedinInputUrl.trim()) return;
    let url = linkedinInputUrl.trim();
    if (!/^https?:\/\//i.test(url)) url = `https://${url}`;
    setLinkedinUrl(url);
    setLinkedinName(linkedinInputName.trim() || "My LinkedIn Profile");
    setLinkedinSaved(true);
  };

  const skillMatch = computeSkillMatch(githubData, leetcodeData, linkedinSaved);
  const anyConnected = githubConnected || leetcodeConnected;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Module Hero Bar */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #065f46 0%, #047857 40%, #059669 70%, #10b981 100%)",
        }}
      >
        <div className="px-8 py-6 relative">
          <div
            className="absolute top-0 right-0 w-64 h-full opacity-10"
            style={{
              background:
                "radial-gradient(circle at right, oklch(0.8 0.15 165), transparent)",
            }}
          />
          <div className="relative z-10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <img
                src="/assets/generated/nirgrantha-logo-transparent.dim_400x80.png"
                alt="NIRGRANTHA"
                className="nirgrantha-section-logo mb-1"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
              <h1 className="font-bold text-2xl text-white mb-1">
                Academic Roadmaps
              </h1>
              <p className="text-white/75 text-sm">
                Track your subjects, progress, exams, and faculty details
              </p>
            </div>
            <div className="ml-auto">
              <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-white/15 text-white">
                Semester {selectedSem} Active
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Branch + Semester Selection */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-3">
          <label
            htmlFor="roadmap-branch"
            className="text-sm font-semibold"
            style={{ color: "var(--mod-academic)" }}
          >
            Branch:
          </label>
          <Select value={selectedBranch} onValueChange={setSelectedBranch}>
            <SelectTrigger className="w-40 rounded-xl" id="roadmap-branch">
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
          className="px-3 py-1 text-sm font-semibold"
          style={{
            color: "var(--mod-academic)",
            borderColor: "var(--mod-academic)",
            background: "var(--mod-academic-bg)",
          }}
        >
          {selectedBranch} — Semester {selectedSem}
        </Badge>
      </div>

      {/* Semester Timeline */}
      <Card
        className="rounded-2xl shadow-card module-border-academic"
        style={{
          background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
        }}
      >
        <CardHeader className="pb-2">
          <CardTitle
            className="text-base font-semibold"
            style={{ color: "var(--mod-academic)" }}
          >
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
                  className="flex flex-col items-center gap-1.5 px-3 py-2 rounded-xl transition-all duration-200"
                  style={{
                    background:
                      selectedSem === sem
                        ? "var(--mod-academic)"
                        : sem < selectedSem
                          ? "var(--mod-academic-bg)"
                          : "var(--muted)",
                    color:
                      selectedSem === sem
                        ? "white"
                        : sem < selectedSem
                          ? "var(--mod-academic)"
                          : "var(--muted-foreground)",
                    transform: selectedSem === sem ? "scale(1.05)" : "scale(1)",
                  }}
                >
                  <span className="text-xs font-bold">S{sem}</span>
                  <span className="text-[10px] opacity-80">Sem {sem}</span>
                </button>
                {idx < 7 && (
                  <div
                    className="h-0.5 w-6 flex-shrink-0"
                    style={{
                      background:
                        sem < selectedSem
                          ? "var(--mod-academic)"
                          : "var(--border)",
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Subjects Grid */}
      <div>
        <h2
          className="font-display font-semibold text-lg mb-4"
          style={{ color: "var(--mod-academic)" }}
        >
          Semester {selectedSem} Subjects
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {semData.subjects.map((subject) => {
            const cfg = statusConfig[subject.status];
            const Icon = cfg.icon;
            return (
              <Card
                key={subject.name}
                className="rounded-2xl shadow-card card-glow-hover module-border-academic"
                style={{
                  background:
                    "linear-gradient(135deg, #d1fae5 0%, #a7f3d0 60%, #6ee7b7 100%)",
                  borderLeft: "4px solid #10b981",
                }}
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <BookOpen
                      className="w-5 h-5 mt-0.5"
                      style={{ color: "var(--mod-academic)" }}
                    />
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${cfg.color}`}
                    >
                      <Icon className="w-3 h-3" />
                      {cfg.label}
                    </span>
                  </div>
                  <h3 className="font-semibold text-sm leading-snug mb-1 text-gray-900">
                    {subject.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-3">
                    {subject.credits} Credits
                  </p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Progress</span>
                      <span
                        className="font-semibold"
                        style={{ color: "var(--mod-academic)" }}
                      >
                        {subject.progress}%
                      </span>
                    </div>
                    <GradientProgress value={subject.progress} />
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
          <h2
            className="font-display font-semibold text-lg mb-4"
            style={{ color: "var(--mod-academic)" }}
          >
            Faculty Details
          </h2>
          {semData.teachers.length > 0 ? (
            <div className="space-y-3">
              {semData.teachers.map((teacher) => (
                <Card
                  key={teacher.name}
                  className="rounded-2xl shadow-card card-glow-hover module-border-academic"
                  style={{
                    background:
                      "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 60%, #a7f3d0 100%)",
                  }}
                >
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                        style={{
                          background:
                            "linear-gradient(135deg, var(--mod-academic), oklch(0.42 0.18 175))",
                        }}
                      >
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
                        <p
                          className="text-xs font-medium mt-0.5"
                          style={{ color: "var(--mod-academic)" }}
                        >
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
          <h2
            className="font-display font-semibold text-lg mb-4"
            style={{ color: "var(--mod-academic)" }}
          >
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
                  className="rounded-2xl shadow-card card-glow-hover module-border-academic"
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
        <h2
          className="font-display font-semibold text-lg mb-1"
          style={{ color: "var(--mod-academic)" }}
        >
          Integrations
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Connect your real profiles to build a skill showcase for placements,
          GATE, and competitive exams.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {/* GitHub Card */}
          <Card
            className="rounded-2xl shadow-card card-glow-hover border-l-4 border-l-gray-700"
            style={{
              background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
            }}
            data-ocid="github.card"
          >
            <CardHeader className="pb-2 pt-4 px-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center">
                    <Github className="w-4 h-4 text-white" />
                  </div>
                  <CardTitle className="text-sm font-bold text-gray-900">
                    GitHub
                  </CardTitle>
                </div>
                {githubConnected && (
                  <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 text-[10px] font-semibold px-2">
                    <CheckCircle2 className="w-3 h-3 mr-1" /> Connected
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              {!githubConnected ? (
                <div className="space-y-3">
                  <p className="text-xs text-muted-foreground">
                    Connect your GitHub to showcase repositories, languages, and
                    contributions.
                  </p>
                  <div className="space-y-2">
                    <Label
                      htmlFor="github-username"
                      className="text-xs font-semibold text-gray-700"
                    >
                      GitHub Username
                    </Label>
                    <Input
                      id="github-username"
                      placeholder="e.g. torvalds"
                      value={githubInput}
                      onChange={(e) => setGithubInput(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleGitHubConnect()
                      }
                      className="h-8 text-xs rounded-lg"
                      data-ocid="github.input"
                    />
                  </div>
                  {githubError && (
                    <div
                      className="flex items-center gap-1.5 text-xs text-red-600"
                      data-ocid="github.error_state"
                    >
                      <XCircle className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{githubError}</span>
                    </div>
                  )}
                  <Button
                    size="sm"
                    onClick={handleGitHubConnect}
                    disabled={githubLoading || !githubInput.trim()}
                    className="w-full h-8 text-xs rounded-lg bg-gray-900 hover:bg-gray-800 text-white"
                    data-ocid="github.primary_button"
                  >
                    {githubLoading ? (
                      <>
                        <Loader2 className="w-3 h-3 mr-1.5 animate-spin" />{" "}
                        Connecting...
                      </>
                    ) : (
                      <>
                        <Github className="w-3 h-3 mr-1.5" /> Connect GitHub
                      </>
                    )}
                  </Button>
                  {githubLoading && (
                    <p
                      className="text-[10px] text-muted-foreground text-center"
                      data-ocid="github.loading_state"
                    >
                      Fetching your GitHub profile…
                    </p>
                  )}
                </div>
              ) : (
                githubData && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      {githubData.avatar_url && (
                        <img
                          src={githubData.avatar_url}
                          alt="avatar"
                          className="w-8 h-8 rounded-full border-2 border-gray-200"
                        />
                      )}
                      <div className="min-w-0">
                        <p className="font-bold text-sm text-gray-900 truncate">
                          {githubData.name || githubData.login}
                        </p>
                        {githubData.bio && (
                          <p className="text-[10px] text-muted-foreground truncate">
                            {githubData.bio}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        {
                          label: "Repos",
                          value: githubData.public_repos ?? 0,
                          icon: BookOpen,
                        },
                        {
                          label: "Followers",
                          value: githubData.followers ?? 0,
                          icon: Trophy,
                        },
                        {
                          label: "Following",
                          value: githubData.following ?? 0,
                          icon: Star,
                        },
                      ].map((stat) => (
                        <div
                          key={stat.label}
                          className="bg-white rounded-lg p-1.5 text-center border border-gray-100"
                        >
                          <p className="font-bold text-sm text-gray-900">
                            {stat.value}
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            {stat.label}
                          </p>
                        </div>
                      ))}
                    </div>
                    {githubData.top_languages &&
                      githubData.top_languages.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {githubData.top_languages.slice(0, 4).map((lang) => (
                            <span
                              key={lang}
                              className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-gray-900 text-white"
                            >
                              {lang}
                            </span>
                          ))}
                        </div>
                      )}
                    <div className="flex gap-2">
                      <a
                        href={`https://github.com/${githubData.login || githubInput}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full h-7 text-[11px] rounded-lg"
                        >
                          <ExternalLink className="w-3 h-3 mr-1" /> View Profile
                        </Button>
                      </a>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 text-[11px] rounded-lg px-2 text-red-600 border-red-200 hover:bg-red-50"
                        onClick={() => {
                          setGithubConnected(false);
                          setGithubData(null);
                          setGithubInput("");
                          setGithubError("");
                        }}
                        data-ocid="github.secondary_button"
                      >
                        <RefreshCw className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                )
              )}
            </CardContent>
          </Card>

          {/* LeetCode Card */}
          <Card
            className="rounded-2xl shadow-card card-glow-hover border-l-4 border-l-orange-500"
            style={{
              background: "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)",
            }}
            data-ocid="leetcode.card"
          >
            <CardHeader className="pb-2 pt-4 px-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center">
                    <Code2 className="w-4 h-4 text-white" />
                  </div>
                  <CardTitle className="text-sm font-bold text-gray-900">
                    LeetCode
                  </CardTitle>
                </div>
                {leetcodeConnected && (
                  <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 text-[10px] font-semibold px-2">
                    <CheckCircle2 className="w-3 h-3 mr-1" /> Connected
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              {!leetcodeConnected ? (
                <div className="space-y-3">
                  <p className="text-xs text-muted-foreground">
                    Link your LeetCode to track easy/medium/hard problems and
                    ranking.
                  </p>
                  <div className="space-y-2">
                    <Label
                      htmlFor="leetcode-username"
                      className="text-xs font-semibold text-gray-700"
                    >
                      LeetCode Username
                    </Label>
                    <Input
                      id="leetcode-username"
                      placeholder="e.g. neal_wu"
                      value={leetcodeInput}
                      onChange={(e) => setLeetcodeInput(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleLeetCodeConnect()
                      }
                      className="h-8 text-xs rounded-lg"
                      data-ocid="leetcode.input"
                    />
                  </div>
                  {leetcodeError && (
                    <div
                      className="flex items-center gap-1.5 text-xs text-red-600"
                      data-ocid="leetcode.error_state"
                    >
                      <XCircle className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{leetcodeError}</span>
                    </div>
                  )}
                  <Button
                    size="sm"
                    onClick={handleLeetCodeConnect}
                    disabled={leetcodeLoading || !leetcodeInput.trim()}
                    className="w-full h-8 text-xs rounded-lg bg-orange-500 hover:bg-orange-600 text-white"
                    data-ocid="leetcode.primary_button"
                  >
                    {leetcodeLoading ? (
                      <>
                        <Loader2 className="w-3 h-3 mr-1.5 animate-spin" />{" "}
                        Connecting...
                      </>
                    ) : (
                      <>
                        <Code2 className="w-3 h-3 mr-1.5" /> Connect LeetCode
                      </>
                    )}
                  </Button>
                  {leetcodeLoading && (
                    <p
                      className="text-[10px] text-muted-foreground text-center"
                      data-ocid="leetcode.loading_state"
                    >
                      Fetching your LeetCode stats…
                    </p>
                  )}
                </div>
              ) : (
                leetcodeData && (
                  <div className="space-y-3">
                    <div>
                      <p className="font-bold text-sm text-gray-900">
                        @{leetcodeData.username}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        Global Rank: #{leetcodeData.ranking?.toLocaleString()}
                      </p>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        {
                          label: "Easy",
                          value: leetcodeData.easySolved,
                          color: "text-green-600",
                          bg: "bg-green-50",
                        },
                        {
                          label: "Medium",
                          value: leetcodeData.mediumSolved,
                          color: "text-yellow-600",
                          bg: "bg-yellow-50",
                        },
                        {
                          label: "Hard",
                          value: leetcodeData.hardSolved,
                          color: "text-red-600",
                          bg: "bg-red-50",
                        },
                      ].map((s) => (
                        <div
                          key={s.label}
                          className={`${s.bg} rounded-lg p-1.5 text-center border border-gray-100`}
                        >
                          <p className={`font-bold text-base ${s.color}`}>
                            {s.value}
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            {s.label}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        Total Solved
                      </span>
                      <span className="font-bold text-orange-600">
                        {leetcodeData.totalSolved}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        Acceptance Rate
                      </span>
                      <span className="font-bold text-orange-600">
                        {leetcodeData.acceptanceRate?.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <a
                        href={`https://leetcode.com/${leetcodeData.username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full h-7 text-[11px] rounded-lg"
                        >
                          <ExternalLink className="w-3 h-3 mr-1" /> View Profile
                        </Button>
                      </a>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 text-[11px] rounded-lg px-2 text-red-600 border-red-200 hover:bg-red-50"
                        onClick={() => {
                          setLeetcodeConnected(false);
                          setLeetcodeData(null);
                          setLeetcodeInput("");
                          setLeetcodeError("");
                        }}
                        data-ocid="leetcode.secondary_button"
                      >
                        <RefreshCw className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                )
              )}
            </CardContent>
          </Card>

          {/* LinkedIn Card */}
          <Card
            className="rounded-2xl shadow-card card-glow-hover border-l-4 border-l-blue-600"
            style={{
              background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
            }}
            data-ocid="linkedin.card"
          >
            <CardHeader className="pb-2 pt-4 px-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                    <Linkedin className="w-4 h-4 text-white" />
                  </div>
                  <CardTitle className="text-sm font-bold text-gray-900">
                    LinkedIn
                  </CardTitle>
                </div>
                {linkedinSaved && (
                  <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 text-[10px] font-semibold px-2">
                    <CheckCircle2 className="w-3 h-3 mr-1" /> Saved
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              {!linkedinSaved ? (
                <div className="space-y-3">
                  <p className="text-xs text-muted-foreground">
                    Add your LinkedIn profile URL to display it on your skill
                    profile card.
                  </p>
                  <div className="space-y-2">
                    <Label
                      htmlFor="linkedin-name"
                      className="text-xs font-semibold text-gray-700"
                    >
                      Display Name
                    </Label>
                    <Input
                      id="linkedin-name"
                      placeholder="Your full name"
                      value={linkedinInputName}
                      onChange={(e) => setLinkedinInputName(e.target.value)}
                      className="h-8 text-xs rounded-lg"
                      data-ocid="linkedin.input"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="linkedin-url"
                      className="text-xs font-semibold text-gray-700"
                    >
                      Profile URL
                    </Label>
                    <Input
                      id="linkedin-url"
                      placeholder="https://linkedin.com/in/yourname"
                      value={linkedinInputUrl}
                      onChange={(e) => setLinkedinInputUrl(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleLinkedInSave()
                      }
                      className="h-8 text-xs rounded-lg"
                    />
                  </div>
                  <Button
                    size="sm"
                    onClick={handleLinkedInSave}
                    disabled={!linkedinInputUrl.trim()}
                    className="w-full h-8 text-xs rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
                    data-ocid="linkedin.primary_button"
                  >
                    <Linkedin className="w-3 h-3 mr-1.5" /> Save LinkedIn
                    Profile
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="bg-white rounded-xl p-3 border border-blue-100">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
                        {linkedinName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-sm text-gray-900">
                          {linkedinName}
                        </p>
                        <p className="text-[10px] text-blue-600 truncate max-w-[140px]">
                          {linkedinUrl}
                        </p>
                      </div>
                    </div>
                    <a
                      href={linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        size="sm"
                        className="w-full h-7 text-[11px] rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <ExternalLink className="w-3 h-3 mr-1" /> Open Profile
                      </Button>
                    </a>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full h-7 text-[11px] rounded-lg text-red-600 border-red-200 hover:bg-red-50"
                    onClick={() => {
                      setLinkedinSaved(false);
                      setLinkedinUrl("");
                      setLinkedinName("");
                      setLinkedinInputUrl("");
                      setLinkedinInputName("");
                    }}
                    data-ocid="linkedin.secondary_button"
                  >
                    <RefreshCw className="w-3 h-3 mr-1" /> Change Profile
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Google Classroom Card */}
          <Card
            className="rounded-2xl shadow-card card-glow-hover border-l-4 border-l-blue-500"
            style={{
              background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
            }}
            data-ocid="classroom.card"
          >
            <CardHeader className="pb-2 pt-4 px-5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-white" />
                </div>
                <CardTitle className="text-sm font-bold text-gray-900">
                  Google Classroom
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="px-5 pb-5 space-y-3">
              <p className="text-xs text-muted-foreground">
                Open your Google Classroom to view assignments, announcements,
                and class materials from your teachers.
              </p>
              <div className="bg-blue-50 rounded-xl p-3 border border-blue-100">
                <p className="text-[11px] font-semibold text-blue-700 mb-1">
                  📋 How it works
                </p>
                <ul className="space-y-1">
                  {[
                    "Log in with your institute email",
                    "View classes assigned by teachers",
                    "Submit assignments and check grades",
                    "Assignments sync manually — open to refresh",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-1.5 text-[10px] text-blue-800"
                    >
                      <div className="w-1 h-1 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href="https://classroom.google.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="sm"
                  className="w-full h-8 text-xs rounded-lg bg-blue-500 hover:bg-blue-600 text-white"
                  data-ocid="classroom.primary_button"
                >
                  <ExternalLink className="w-3 h-3 mr-1.5" /> Open Google
                  Classroom
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ── Skill Match Analysis ── */}
      <div data-ocid="skillmatch.section">
        {/* Section Header */}
        <div
          className="rounded-2xl px-7 py-5 mb-6 flex items-center gap-4"
          style={{
            background:
              "linear-gradient(135deg, #3730a3 0%, #4f46e5 40%, #7c3aed 80%, #9333ea 100%)",
          }}
        >
          <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="font-bold text-xl text-white leading-tight">
              Skill Match Analysis
            </h2>
            <p className="text-white/70 text-sm mt-0.5">
              Based on your connected profiles
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            {githubConnected && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/15 text-white flex items-center gap-1.5">
                <Github className="w-3 h-3" /> GitHub
              </span>
            )}
            {leetcodeConnected && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/15 text-white flex items-center gap-1.5">
                <Code2 className="w-3 h-3" /> LeetCode
              </span>
            )}
            {linkedinSaved && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/15 text-white flex items-center gap-1.5">
                <Linkedin className="w-3 h-3" /> LinkedIn
              </span>
            )}
          </div>
        </div>

        {!anyConnected ? (
          /* Teaser card when nothing connected */
          <div
            className="rounded-2xl p-8 text-center border-2 border-dashed"
            style={{
              background: "linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)",
              borderColor: "#8b5cf6",
            }}
            data-ocid="skillmatch.empty_state"
          >
            <div className="w-16 h-16 rounded-2xl bg-violet-100 flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-violet-500" />
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-2">
              Unlock Your Skill Match
            </h3>
            <p className="text-sm text-gray-600 max-w-md mx-auto">
              Connect <strong>GitHub</strong> or <strong>LeetCode</strong> above
              to get a personalised analysis of your exam readiness, career path
              matches, and skill gaps.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* 1. Detected Skills */}
            <div
              className="rounded-2xl p-6"
              style={{
                background:
                  "linear-gradient(135deg, #faf5ff 0%, #ede9fe 60%, #ddd6fe 100%)",
                borderLeft: "4px solid #7c3aed",
              }}
            >
              <h3 className="font-bold text-base text-gray-900 mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4 text-violet-600" />
                Detected Skills
              </h3>
              {skillMatch.detectedSkills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {skillMatch.detectedSkills.map((skill) => (
                    <span
                      key={skill.label}
                      className="px-3 py-1 rounded-full text-xs font-bold shadow-sm"
                      style={{
                        background:
                          skill.type === "language"
                            ? "linear-gradient(135deg, #d1fae5, #6ee7b7)"
                            : skill.type === "dsa"
                              ? "linear-gradient(135deg, #fed7aa, #fb923c)"
                              : "linear-gradient(135deg, #bfdbfe, #60a5fa)",
                        color:
                          skill.type === "language"
                            ? "#065f46"
                            : skill.type === "dsa"
                              ? "#7c2d12"
                              : "#1e3a8a",
                        border: `1px solid ${
                          skill.type === "language"
                            ? "#10b981"
                            : skill.type === "dsa"
                              ? "#f97316"
                              : "#3b82f6"
                        }`,
                      }}
                    >
                      {skill.label}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  No skills detected yet — connect more platforms above.
                </p>
              )}
            </div>

            {/* 2. Exam Readiness Grid */}
            <div>
              <h3 className="font-bold text-base text-gray-900 mb-3 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-indigo-600" />
                Exam Readiness
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {skillMatch.examReadiness.map((item) => (
                  <div
                    key={item.exam}
                    className="rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
                    style={{
                      background: item.gradient,
                      borderLeft: `4px solid ${item.border}`,
                    }}
                    data-ocid="skillmatch.card"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <span className="text-xl">{item.icon}</span>
                        <h4 className="font-bold text-sm text-gray-900 mt-1">
                          {item.exam}
                        </h4>
                      </div>
                      <span
                        className="text-2xl font-black"
                        style={{ color: item.color }}
                      >
                        {item.score}%
                      </span>
                    </div>
                    <GradientProgress value={item.score} height="h-2.5" />
                    <p className="text-[11px] text-gray-600 mt-2 leading-relaxed">
                      {item.tip}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Career Path Matches */}
            <div
              className="rounded-2xl p-6"
              style={{
                background:
                  "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 60%, #bae6fd 100%)",
                borderLeft: "4px solid #0ea5e9",
              }}
            >
              <h3 className="font-bold text-base text-gray-900 mb-4 flex items-center gap-2">
                <Trophy className="w-4 h-4 text-sky-600" />
                Career Path Matches
              </h3>
              <div className="space-y-3">
                {skillMatch.careerPaths
                  .slice()
                  .sort((a, b) => b.match - a.match)
                  .map((path) => (
                    <div key={path.title}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-gray-800">
                          {path.title}
                        </span>
                        <span
                          className="text-sm font-black"
                          style={{ color: path.color }}
                        >
                          {path.match}%
                        </span>
                      </div>
                      <div className="h-3 rounded-full bg-gray-200 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${path.match}%`,
                            background: path.bar,
                          }}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* 4. Gap Analysis + Recommendations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Skill Gaps */}
              <div
                className="rounded-2xl p-6"
                style={{
                  background:
                    "linear-gradient(135deg, #fff1f2 0%, #ffe4e6 60%, #fecdd3 100%)",
                  borderLeft: "4px solid #f43f5e",
                }}
                data-ocid="skillmatch.panel"
              >
                <h3 className="font-bold text-base text-gray-900 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-500" />
                  Skill Gaps
                </h3>
                {skillMatch.gaps.length > 0 ? (
                  <ul className="space-y-2">
                    {skillMatch.gaps.map((gap) => (
                      <li
                        key={gap}
                        className="flex items-start gap-2.5 text-sm text-gray-800"
                      >
                        <div className="w-2 h-2 rounded-full bg-rose-400 mt-1.5 flex-shrink-0" />
                        <span className="font-medium">{gap}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-emerald-700 font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> No critical gaps
                    detected!
                  </p>
                )}
              </div>

              {/* Recommendations */}
              <div
                className="rounded-2xl p-6"
                style={{
                  background:
                    "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 60%, #bbf7d0 100%)",
                  borderLeft: "4px solid #22c55e",
                }}
                data-ocid="skillmatch.panel"
              >
                <h3 className="font-bold text-base text-gray-900 mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-emerald-600" />
                  Next Steps
                </h3>
                <ul className="space-y-2">
                  {skillMatch.recommendations.map((rec) => (
                    <li
                      key={rec}
                      className="flex items-start gap-2.5 text-sm text-gray-800"
                    >
                      <div className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                      <span className="font-medium">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
