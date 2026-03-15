import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  ArrowRight,
  BookMarked,
  CheckCircle2,
  ChevronRight,
  Circle,
  Clock,
  Mic,
  MicOff,
  Monitor,
  Play,
  Save,
  Square,
  Upload,
  Wifi,
} from "lucide-react";
import { useState } from "react";

const branches = ["CSE", "IT", "ECE", "Mechanical", "Civil", "EEE"];
const divisions = ["A", "B", "C", "D"];
const subjectsByBranch: Record<string, string[]> = {
  CSE: [
    "Data Structures",
    "Algorithms",
    "DBMS",
    "Operating Systems",
    "Computer Networks",
    "Software Engineering",
  ],
  IT: [
    "Web Technologies",
    "Cloud Computing",
    "Cybersecurity",
    "Mobile App Dev",
    "Data Mining",
  ],
  ECE: [
    "Digital Electronics",
    "Signals & Systems",
    "VLSI Design",
    "Embedded Systems",
    "Communication Systems",
  ],
  Mechanical: [
    "Thermodynamics",
    "Fluid Mechanics",
    "Machine Design",
    "Manufacturing Processes",
    "CAD/CAM",
  ],
  Civil: [
    "Structural Analysis",
    "Geotechnical Engineering",
    "Surveying",
    "Concrete Technology",
    "Hydraulics",
  ],
  EEE: [
    "Power Systems",
    "Control Systems",
    "Electric Machines",
    "Power Electronics",
    "Renewable Energy",
  ],
};

const topicsBySubject: Record<string, { name: string; completed: boolean }[]> =
  {
    "Data Structures": [
      { name: "Arrays & Strings", completed: true },
      { name: "Linked Lists", completed: true },
      { name: "Stacks & Queues", completed: true },
      { name: "Trees & BST", completed: true },
      { name: "Graphs", completed: false },
      { name: "Hashing", completed: false },
      { name: "Heaps & Priority Queues", completed: false },
      { name: "Dynamic Programming", completed: false },
    ],
    Algorithms: [
      { name: "Sorting Algorithms", completed: true },
      { name: "Searching Algorithms", completed: true },
      { name: "Divide & Conquer", completed: true },
      { name: "Greedy Algorithms", completed: false },
      { name: "Graph Algorithms", completed: false },
      { name: "NP-Completeness", completed: false },
    ],
  };

const defaultTopics = [
  { name: "Introduction & Overview", completed: true },
  { name: "Core Concepts - Part I", completed: true },
  { name: "Core Concepts - Part II", completed: true },
  { name: "Advanced Topics - Part I", completed: false },
  { name: "Advanced Topics - Part II", completed: false },
  { name: "Case Studies & Applications", completed: false },
  { name: "Revision & Assessment", completed: false },
];

export default function SmartboardTeaching() {
  const [branch, setBranch] = useState("CSE");
  const [division, setDivision] = useState("A");
  const [subject, setSubject] = useState("Data Structures");
  const [classStarted, setClassStarted] = useState(false);
  const [recording, setRecording] = useState(false);
  const [autoUpload, setAutoUpload] = useState(true);
  const [topics, setTopics] = useState(
    topicsBySubject["Data Structures"] || defaultTopics,
  );
  const [lastSaved, setLastSaved] = useState("Just now");

  const handleBranchChange = (val: string) => {
    setBranch(val);
    const subs = subjectsByBranch[val] || [];
    const newSubject = subs[0] || "";
    setSubject(newSubject);
    setTopics(topicsBySubject[newSubject] || defaultTopics);
  };

  const handleSubjectChange = (val: string) => {
    setSubject(val);
    setTopics(topicsBySubject[val] || defaultTopics);
  };

  const toggleTopic = (index: number) => {
    setTopics((prev) =>
      prev.map((t, i) => (i === index ? { ...t, completed: !t.completed } : t)),
    );
    setLastSaved("Just now");
  };

  const completedCount = topics.filter((t) => t.completed).length;
  const lastCovered = [...topics].reverse().find((t) => t.completed);
  const nextTopic = topics.find((t) => !t.completed);
  const completionPct = Math.round((completedCount / topics.length) * 100);

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-8 space-y-6">
      {/* Top Row: Smartboard Status + Class Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Smartboard Panel */}
        <div className="lg:col-span-1 bg-white dark:bg-fhub-card rounded-2xl border border-fhub-border shadow-fhub p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-fhub-heading text-base flex items-center gap-2">
              <Monitor className="w-4 h-4 text-fhub-accent" />
              Smartboard Panel
            </h2>
            <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">
              <Wifi className="w-3 h-3 mr-1" /> Connected
            </Badge>
          </div>
          <div className="rounded-xl bg-fhub-bg border border-fhub-border p-4 mb-4 flex items-center justify-center min-h-[120px]">
            <div className="text-center">
              <Monitor className="w-10 h-10 text-fhub-accent mx-auto mb-2 opacity-60" />
              <p className="text-xs text-fhub-muted">SMART Board 7000 Pro</p>
              <p className="text-xs text-green-600 font-medium mt-1">
                ● Live Sync Active
              </p>
            </div>
          </div>
          <div className="space-y-2 text-xs text-fhub-muted">
            <div className="flex justify-between">
              <span>Resolution</span>
              <span className="font-medium text-fhub-heading">4K UHD</span>
            </div>
            <div className="flex justify-between">
              <span>Touch Points</span>
              <span className="font-medium text-fhub-heading">20-point</span>
            </div>
            <div className="flex justify-between">
              <span>Sync Status</span>
              <span className="font-medium text-green-600">Real-time</span>
            </div>
          </div>
        </div>

        {/* Class Setup */}
        <div className="lg:col-span-2 bg-white dark:bg-fhub-card rounded-2xl border border-fhub-border shadow-fhub p-6">
          <h2 className="font-display font-semibold text-fhub-heading text-base mb-4 flex items-center gap-2">
            <BookMarked className="w-4 h-4 text-fhub-accent" />
            Class Configuration
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div>
              <Label className="text-xs text-fhub-muted mb-1.5 block">
                Branch
              </Label>
              <Select value={branch} onValueChange={handleBranchChange}>
                <SelectTrigger className="border-fhub-border bg-fhub-bg text-fhub-heading">
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
            <div>
              <Label className="text-xs text-fhub-muted mb-1.5 block">
                Division
              </Label>
              <Select value={division} onValueChange={setDivision}>
                <SelectTrigger className="border-fhub-border bg-fhub-bg text-fhub-heading">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {divisions.map((d) => (
                    <SelectItem key={d} value={d}>
                      Division {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs text-fhub-muted mb-1.5 block">
                Subject
              </Label>
              <Select value={subject} onValueChange={handleSubjectChange}>
                <SelectTrigger className="border-fhub-border bg-fhub-bg text-fhub-heading">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(subjectsByBranch[branch] || []).map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Start Class Button */}
          <Button
            onClick={() => setClassStarted(!classStarted)}
            className={`w-full h-12 text-base font-semibold rounded-xl transition-all duration-300 ${
              classStarted
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-fhub-accent hover:bg-fhub-accent-dark text-white shadow-fhub"
            }`}
          >
            {classStarted ? (
              <>
                <Square className="w-5 h-5 mr-2" /> End Class
              </>
            ) : (
              <>
                <Play className="w-5 h-5 mr-2" /> Start Class
              </>
            )}
          </Button>

          {classStarted && (
            <div className="mt-3 flex items-center gap-2 text-xs text-green-600 font-medium">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Class in progress · {branch} Div {division} · {subject}
            </div>
          )}
        </div>
      </div>

      {/* Session Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Notes Auto-Save */}
        <div className="bg-white dark:bg-fhub-card rounded-2xl border border-fhub-border shadow-fhub p-5">
          <div className="flex items-center gap-2 mb-3">
            <Save className="w-4 h-4 text-fhub-accent" />
            <h3 className="font-semibold text-fhub-heading text-sm">
              Notes Auto-Save
            </h3>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            <span className="text-xs text-fhub-muted">Saved automatically</span>
          </div>
          <p className="text-xs text-fhub-muted">
            Last saved:{" "}
            <span className="text-fhub-heading font-medium">{lastSaved}</span>
          </p>
          <div className="mt-3 flex items-center justify-between">
            <Label className="text-xs text-fhub-muted">Auto-Save</Label>
            <Switch
              defaultChecked
              className="data-[state=checked]:bg-fhub-accent"
            />
          </div>
        </div>

        {/* Recording */}
        <div className="bg-white dark:bg-fhub-card rounded-2xl border border-fhub-border shadow-fhub p-5">
          <div className="flex items-center gap-2 mb-3">
            <Mic className="w-4 h-4 text-fhub-accent" />
            <h3 className="font-semibold text-fhub-heading text-sm">
              Lecture Recording
            </h3>
          </div>
          <Button
            variant="outline"
            onClick={() => setRecording(!recording)}
            className={`w-full text-xs h-9 rounded-lg border-fhub-border ${
              recording
                ? "bg-red-50 text-red-600 border-red-200"
                : "text-fhub-heading"
            }`}
          >
            {recording ? (
              <>
                <MicOff className="w-3.5 h-3.5 mr-1.5" /> Stop Recording
              </>
            ) : (
              <>
                <Mic className="w-3.5 h-3.5 mr-1.5" /> Start Recording
              </>
            )}
          </Button>
          {recording && (
            <div className="mt-2 flex items-center gap-1.5 text-xs text-red-500">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              Recording in progress...
            </div>
          )}
        </div>

        {/* Auto Upload */}
        <div className="bg-white dark:bg-fhub-card rounded-2xl border border-fhub-border shadow-fhub p-5">
          <div className="flex items-center gap-2 mb-3">
            <Upload className="w-4 h-4 text-fhub-accent" />
            <h3 className="font-semibold text-fhub-heading text-sm">
              Auto-Upload to Portal
            </h3>
          </div>
          <div className="flex items-center justify-between mb-2">
            <Label className="text-xs text-fhub-muted">Upload Notes</Label>
            <Switch
              checked={autoUpload}
              onCheckedChange={setAutoUpload}
              className="data-[state=checked]:bg-fhub-accent"
            />
          </div>
          <p className="text-xs text-fhub-muted">
            Status:{" "}
            <span
              className={`font-medium ${autoUpload ? "text-green-600" : "text-orange-500"}`}
            >
              {autoUpload ? "Enabled — uploads after class" : "Disabled"}
            </span>
          </p>
        </div>
      </div>

      {/* Topic Tracker + Resume Suggestion */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Topic Completion Tracker */}
        <div className="lg:col-span-2 bg-white dark:bg-fhub-card rounded-2xl border border-fhub-border shadow-fhub p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-fhub-heading text-base flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-fhub-accent" />
              Topic Completion Tracker
            </h3>
            <span className="text-xs text-fhub-muted">
              {completedCount}/{topics.length} completed
            </span>
          </div>
          <Progress
            value={completionPct}
            className="h-2 mb-4 bg-fhub-bg [&>div]:bg-fhub-accent"
          />
          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {topics.map((topic, i) => (
              <button
                type="button"
                // biome-ignore lint/suspicious/noArrayIndexKey: static list
                key={i}
                onClick={() => toggleTopic(i)}
                className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-fhub-bg transition-colors cursor-pointer text-left"
              >
                {topic.completed ? (
                  <CheckCircle2 className="w-4 h-4 text-fhub-accent flex-shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-fhub-border flex-shrink-0" />
                )}
                <span
                  className={`text-sm ${topic.completed ? "text-fhub-muted line-through" : "text-fhub-heading"}`}
                >
                  {topic.name}
                </span>
                {!topic.completed &&
                  i === topics.findIndex((t) => !t.completed) && (
                    <Badge className="ml-auto text-[10px] bg-fhub-badge-bg text-fhub-accent border-fhub-accent/30">
                      Next
                    </Badge>
                  )}
              </button>
            ))}
          </div>
        </div>

        {/* Last Covered + Resume */}
        <div className="space-y-4">
          {/* Last Topic Covered */}
          <div className="bg-white dark:bg-fhub-card rounded-2xl border border-fhub-border shadow-fhub p-5">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-fhub-accent" />
              <h3 className="font-semibold text-fhub-heading text-sm">
                Last Topic Covered
              </h3>
            </div>
            {lastCovered ? (
              <div className="px-3 py-2 rounded-lg bg-fhub-badge-bg border border-fhub-accent/20">
                <p className="text-sm font-medium text-fhub-accent">
                  {lastCovered.name}
                </p>
                <p className="text-xs text-fhub-muted mt-0.5">
                  Completed · {subject}
                </p>
              </div>
            ) : (
              <p className="text-xs text-fhub-muted">No topics covered yet</p>
            )}
          </div>

          {/* Resume From Here */}
          {nextTopic && (
            <div className="bg-fhub-accent/5 border border-fhub-accent/20 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <ArrowRight className="w-4 h-4 text-fhub-accent" />
                <h3 className="font-semibold text-fhub-heading text-sm">
                  Resume From Here
                </h3>
              </div>
              <p className="text-xs text-fhub-muted mb-3">
                Suggested next topic:
              </p>
              <p className="text-sm font-semibold text-fhub-accent mb-3">
                {nextTopic.name}
              </p>
              <Button
                size="sm"
                className="w-full bg-fhub-accent hover:bg-fhub-accent-dark text-white text-xs rounded-lg"
                onClick={() => setClassStarted(true)}
              >
                <ChevronRight className="w-3.5 h-3.5 mr-1" />
                Start This Topic
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
