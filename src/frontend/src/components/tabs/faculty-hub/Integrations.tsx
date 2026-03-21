import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CheckCircle2,
  Clock,
  ExternalLink,
  FileOutput,
  FileText,
  Github,
  Linkedin,
  Loader2,
  Monitor,
  RefreshCw,
  XCircle,
} from "lucide-react";
import { useState } from "react";

function StatusBadge({
  status,
}: { status: "connected" | "disconnected" | "syncing" }) {
  if (status === "connected") {
    return (
      <Badge className="bg-green-100 text-green-700 border-green-200 text-xs flex items-center gap-1">
        <CheckCircle2 className="w-3 h-3" /> Connected
      </Badge>
    );
  }
  if (status === "syncing") {
    return (
      <Badge className="bg-blue-100 text-blue-700 border-blue-200 text-xs flex items-center gap-1">
        <RefreshCw className="w-3 h-3 animate-spin" /> Syncing
      </Badge>
    );
  }
  return (
    <Badge className="bg-gray-100 text-gray-600 border-gray-200 text-xs flex items-center gap-1">
      <XCircle className="w-3 h-3" /> Disconnected
    </Badge>
  );
}

interface GitHubStats {
  login: string;
  name: string;
  bio: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  top_languages: string[];
}

interface LeetCodeStats {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  ranking: number;
  acceptanceRate: number;
}

export default function Integrations() {
  // GitHub
  const [ghInput, setGhInput] = useState("");
  const [ghLoading, setGhLoading] = useState(false);
  const [ghError, setGhError] = useState("");
  const [ghData, setGhData] = useState<GitHubStats | null>(null);

  // LeetCode
  const [lcInput, setLcInput] = useState("");
  const [lcLoading, setLcLoading] = useState(false);
  const [lcError, setLcError] = useState("");
  const [lcData, setLcData] = useState<LeetCodeStats | null>(null);

  // LinkedIn
  const [liInput, setLiInput] = useState("");
  const [liSaved, setLiSaved] = useState(false);

  // Smartboard
  const [sbStatus, setSbStatus] = useState<
    "connected" | "disconnected" | "syncing"
  >("connected");
  const [sbDetail, setSbDetail] = useState("Last synced: 2 hours ago");

  const handleGitHubConnect = async () => {
    if (!ghInput.trim()) return;
    setGhLoading(true);
    setGhError("");
    setGhData(null);
    try {
      const [userRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${ghInput.trim()}`),
        fetch(
          `https://api.github.com/users/${ghInput.trim()}/repos?sort=updated&per_page=20`,
        ),
      ]);
      if (!userRes.ok) throw new Error("User not found");
      const user = await userRes.json();
      const repos = reposRes.ok ? await reposRes.json() : [];
      const langs = [
        ...new Set(repos.map((r: any) => r.language).filter(Boolean)),
      ] as string[];
      setGhData({
        login: user.login,
        name: user.name || user.login,
        bio: user.bio || "",
        avatar_url: user.avatar_url,
        public_repos: user.public_repos,
        followers: user.followers,
        following: user.following,
        top_languages: langs.slice(0, 6),
      });
    } catch (_e) {
      setGhError("Could not fetch GitHub profile. Check the username.");
    } finally {
      setGhLoading(false);
    }
  };

  const handleLeetCodeConnect = async () => {
    if (!lcInput.trim()) return;
    setLcLoading(true);
    setLcError("");
    setLcData(null);
    try {
      const username = lcInput.trim();
      let data: Record<string, unknown> | null = null;
      try {
        const res1 = await fetch(
          `https://leetcode-stats-api.herokuapp.com/${username}`,
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
        );
        if (!res2.ok) throw new Error("User not found");
        const j2 = await res2.json();
        if (!j2 || j2.errors) throw new Error("User not found");
        data = {
          ...j2,
          totalSolved: j2.solvedProblem ?? j2.totalSolved,
          easySolved: j2.easySolvedProblem ?? j2.easySolved,
          mediumSolved: j2.mediumSolvedProblem ?? j2.mediumSolved,
          hardSolved: j2.hardSolvedProblem ?? j2.hardSolved,
        };
      }
      const d = data!;
      setLcData({
        totalSolved: (d.totalSolved as number) ?? 0,
        easySolved: (d.easySolved as number) ?? 0,
        mediumSolved: (d.mediumSolved as number) ?? 0,
        hardSolved: (d.hardSolved as number) ?? 0,
        ranking: (d.ranking as number) ?? 0,
        acceptanceRate: (d.acceptanceRate as number) ?? 0,
      });
    } catch (_e) {
      setLcError("Could not fetch LeetCode stats. Check the username.");
    } finally {
      setLcLoading(false);
    }
  };

  const handleSmartboardSync = () => {
    setSbStatus("syncing");
    setTimeout(() => {
      setSbStatus("connected");
      setSbDetail("Last synced: Just now");
    }, 2000);
  };

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-8">
      <div className="mb-6">
        <h2 className="font-display font-bold text-fhub-heading text-xl">
          Connected Integrations
        </h2>
        <p className="text-sm text-fhub-muted mt-1">
          Manage your external tools and platform connections
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* GitHub Card */}
        <div className="bg-white dark:bg-fhub-card rounded-2xl border border-fhub-border shadow-fhub p-6 flex flex-col gap-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-fhub-bg border border-fhub-border flex items-center justify-center">
                <Github className="w-5 h-5 text-gray-800" />
              </div>
              <div>
                <h3 className="font-semibold text-fhub-heading text-sm">
                  GitHub
                </h3>
                <p className="text-xs text-fhub-muted leading-tight mt-0.5">
                  Live repo & language stats
                </p>
              </div>
            </div>
            <StatusBadge status={ghData ? "connected" : "disconnected"} />
          </div>

          {ghData ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <img
                  src={ghData.avatar_url}
                  alt={ghData.login}
                  className="w-8 h-8 rounded-full border"
                />
                <div>
                  <p className="text-xs font-semibold text-fhub-heading">
                    {ghData.name}
                  </p>
                  <p className="text-xs text-fhub-muted">@{ghData.login}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-fhub-bg rounded-lg p-2">
                  <p className="text-sm font-bold text-fhub-heading">
                    {ghData.public_repos}
                  </p>
                  <p className="text-[10px] text-fhub-muted">Repos</p>
                </div>
                <div className="bg-fhub-bg rounded-lg p-2">
                  <p className="text-sm font-bold text-fhub-heading">
                    {ghData.followers}
                  </p>
                  <p className="text-[10px] text-fhub-muted">Followers</p>
                </div>
                <div className="bg-fhub-bg rounded-lg p-2">
                  <p className="text-sm font-bold text-fhub-heading">
                    {ghData.following}
                  </p>
                  <p className="text-[10px] text-fhub-muted">Following</p>
                </div>
              </div>
              {ghData.top_languages.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {ghData.top_languages.map((l) => (
                    <span
                      key={l}
                      className="px-1.5 py-0.5 bg-indigo-50 text-indigo-700 rounded text-[10px] font-medium border border-indigo-100"
                    >
                      {l}
                    </span>
                  ))}
                </div>
              )}
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs border-fhub-border"
                onClick={() => {
                  setGhData(null);
                  setGhInput("");
                }}
              >
                Disconnect
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              {ghError && <p className="text-xs text-red-500">{ghError}</p>}
              <Label className="text-xs text-fhub-muted">
                Your GitHub username
              </Label>
              <Input
                placeholder="e.g., arihantmahajan"
                value={ghInput}
                onChange={(e) => setGhInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleGitHubConnect()}
                className="h-8 text-xs border-fhub-border bg-fhub-bg text-fhub-heading"
              />
              <Button
                onClick={handleGitHubConnect}
                disabled={ghLoading || !ghInput.trim()}
                className="w-full text-xs bg-fhub-accent hover:bg-fhub-accent-dark text-white rounded-xl h-8"
              >
                {ghLoading ? (
                  <>
                    <Loader2 className="w-3 h-3 mr-1 animate-spin" /> Fetching…
                  </>
                ) : (
                  <>
                    <Github className="w-3 h-3 mr-1" /> Connect GitHub
                  </>
                )}
              </Button>
            </div>
          )}
        </div>

        {/* LeetCode Card */}
        <div className="bg-white dark:bg-fhub-card rounded-2xl border border-fhub-border shadow-fhub p-6 flex flex-col gap-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center">
                <span className="text-orange-500 font-bold text-sm">LC</span>
              </div>
              <div>
                <h3 className="font-semibold text-fhub-heading text-sm">
                  LeetCode
                </h3>
                <p className="text-xs text-fhub-muted leading-tight mt-0.5">
                  DSA problem-solving stats
                </p>
              </div>
            </div>
            <StatusBadge status={lcData ? "connected" : "disconnected"} />
          </div>

          {lcData ? (
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-fhub-bg rounded-lg p-2 text-center">
                  <p className="text-lg font-bold text-fhub-heading">
                    {lcData.totalSolved}
                  </p>
                  <p className="text-[10px] text-fhub-muted">Total Solved</p>
                </div>
                <div className="bg-fhub-bg rounded-lg p-2 text-center">
                  <p className="text-lg font-bold text-fhub-heading">
                    #{lcData.ranking.toLocaleString()}
                  </p>
                  <p className="text-[10px] text-fhub-muted">Ranking</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <div className="bg-green-50 rounded-lg p-1.5 text-center">
                  <p className="text-sm font-bold text-green-700">
                    {lcData.easySolved}
                  </p>
                  <p className="text-[9px] text-green-600">Easy</p>
                </div>
                <div className="bg-yellow-50 rounded-lg p-1.5 text-center">
                  <p className="text-sm font-bold text-yellow-700">
                    {lcData.mediumSolved}
                  </p>
                  <p className="text-[9px] text-yellow-600">Medium</p>
                </div>
                <div className="bg-red-50 rounded-lg p-1.5 text-center">
                  <p className="text-sm font-bold text-red-700">
                    {lcData.hardSolved}
                  </p>
                  <p className="text-[9px] text-red-600">Hard</p>
                </div>
              </div>
              <p className="text-[10px] text-fhub-muted text-center">
                Acceptance Rate: {lcData.acceptanceRate.toFixed(1)}%
              </p>
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs border-fhub-border"
                onClick={() => {
                  setLcData(null);
                  setLcInput("");
                }}
              >
                Disconnect
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              {lcError && <p className="text-xs text-red-500">{lcError}</p>}
              <Label className="text-xs text-fhub-muted">
                Your LeetCode username
              </Label>
              <Input
                placeholder="e.g., arihant_coder"
                value={lcInput}
                onChange={(e) => setLcInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLeetCodeConnect()}
                className="h-8 text-xs border-fhub-border bg-fhub-bg text-fhub-heading"
              />
              <Button
                onClick={handleLeetCodeConnect}
                disabled={lcLoading || !lcInput.trim()}
                className="w-full text-xs bg-orange-500 hover:bg-orange-600 text-white rounded-xl h-8"
              >
                {lcLoading ? (
                  <>
                    <Loader2 className="w-3 h-3 mr-1 animate-spin" /> Fetching…
                  </>
                ) : (
                  <>Connect LeetCode</>
                )}
              </Button>
            </div>
          )}
        </div>

        {/* LinkedIn Card */}
        <div className="bg-white dark:bg-fhub-card rounded-2xl border border-fhub-border shadow-fhub p-6 flex flex-col gap-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                <Linkedin className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-fhub-heading text-sm">
                  LinkedIn
                </h3>
                <p className="text-xs text-fhub-muted leading-tight mt-0.5">
                  Professional profile card
                </p>
              </div>
            </div>
            <StatusBadge status={liSaved ? "connected" : "disconnected"} />
          </div>

          {liSaved ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2 p-3 rounded-xl bg-blue-50 border border-blue-100">
                <Linkedin className="w-4 h-4 text-blue-600" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-blue-800 truncate">
                    Profile linked
                  </p>
                  <p className="text-[10px] text-blue-600 truncate">
                    {liInput}
                  </p>
                </div>
              </div>
              <Button
                className="w-full text-xs rounded-xl h-8 bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => window.open(liInput, "_blank")}
              >
                <ExternalLink className="w-3 h-3 mr-1" /> Open Profile
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs border-fhub-border"
                onClick={() => {
                  setLiSaved(false);
                  setLiInput("");
                }}
              >
                Unlink
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              <Label className="text-xs text-fhub-muted">
                Your LinkedIn profile URL
              </Label>
              <Input
                placeholder="https://linkedin.com/in/yourname"
                value={liInput}
                onChange={(e) => setLiInput(e.target.value)}
                className="h-8 text-xs border-fhub-border bg-fhub-bg text-fhub-heading"
              />
              <Button
                onClick={() => {
                  if (liInput.trim()) setLiSaved(true);
                }}
                disabled={!liInput.trim()}
                className="w-full text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-8"
              >
                <Linkedin className="w-3 h-3 mr-1" /> Save Profile
              </Button>
            </div>
          )}
        </div>

        {/* Google Classroom Card */}
        <div className="bg-white dark:bg-fhub-card rounded-2xl border border-fhub-border shadow-fhub p-6 flex flex-col gap-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center">
                <FileText className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-fhub-heading text-sm">
                  Google Classroom
                </h3>
                <p className="text-xs text-fhub-muted leading-tight mt-0.5">
                  Assignment distribution & management
                </p>
              </div>
            </div>
            <StatusBadge status="connected" />
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-fhub-bg border border-fhub-border">
            <Clock className="w-3.5 h-3.5 text-fhub-muted flex-shrink-0" />
            <span className="text-xs text-fhub-muted">
              24 assignments distributed · 3 pending review
            </span>
          </div>
          <Button
            className="w-full text-sm rounded-xl bg-green-600 hover:bg-green-700 text-white"
            onClick={() =>
              window.open("https://classroom.google.com", "_blank")
            }
          >
            <ExternalLink className="w-3.5 h-3.5 mr-1.5" /> Open Google
            Classroom
          </Button>
        </div>

        {/* Smartboard Sync Card */}
        <div className="bg-white dark:bg-fhub-card rounded-2xl border border-fhub-border shadow-fhub p-6 flex flex-col gap-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-fhub-bg border border-fhub-border flex items-center justify-center">
                <Monitor className="w-5 h-5 text-fhub-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-fhub-heading text-sm">
                  Smartboard Sync
                </h3>
                <p className="text-xs text-fhub-muted leading-tight mt-0.5">
                  Real-time classroom board synchronization
                </p>
              </div>
            </div>
            <StatusBadge status={sbStatus} />
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-fhub-bg border border-fhub-border">
            <Clock className="w-3.5 h-3.5 text-fhub-muted flex-shrink-0" />
            <span className="text-xs text-fhub-muted">{sbDetail}</span>
          </div>
          <Button
            onClick={handleSmartboardSync}
            disabled={sbStatus === "syncing"}
            variant="outline"
            className="w-full text-sm rounded-xl border-fhub-border text-fhub-heading hover:bg-fhub-bg"
          >
            {sbStatus === "syncing" ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 mr-1.5 animate-spin" />{" "}
                Syncing…
              </>
            ) : (
              <>
                <RefreshCw className="w-3.5 h-3.5 mr-1.5" /> Sync Now
              </>
            )}
          </Button>
        </div>

        {/* Report Generator Card */}
        <div className="bg-white dark:bg-fhub-card rounded-2xl border border-fhub-border shadow-fhub p-6 flex flex-col gap-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center">
                <FileOutput className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-fhub-heading text-sm">
                  Report Generator
                </h3>
                <p className="text-xs text-fhub-muted leading-tight mt-0.5">
                  Automated academic report generation
                </p>
              </div>
            </div>
            <StatusBadge status="connected" />
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-fhub-bg border border-fhub-border">
            <Clock className="w-3.5 h-3.5 text-fhub-muted flex-shrink-0" />
            <span className="text-xs text-fhub-muted">
              Last generated: Jan 15, 2026
            </span>
          </div>
          <Button
            variant="outline"
            className="w-full text-sm rounded-xl border-fhub-border text-fhub-heading hover:bg-fhub-bg"
          >
            <FileOutput className="w-3.5 h-3.5 mr-1.5" /> Generate Now
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            label: "Active Integrations",
            value: 3 + (ghData ? 1 : 0) + (lcData ? 1 : 0) + (liSaved ? 1 : 0),
            color: "text-green-600",
          },
          {
            label: "Pending Setup",
            value: (!ghData ? 1 : 0) + (!lcData ? 1 : 0) + (!liSaved ? 1 : 0),
            color: "text-orange-500",
          },
          { label: "Total Platforms", value: 6, color: "text-fhub-accent" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white dark:bg-fhub-card rounded-2xl border border-fhub-border shadow-fhub p-4 text-center"
          >
            <p className={`text-3xl font-display font-bold ${stat.color}`}>
              {stat.value}
            </p>
            <p className="text-xs text-fhub-muted mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
