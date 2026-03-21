import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  Bell,
  BookOpen,
  Calendar,
  CheckCircle2,
  ClipboardList,
  Clock,
  FileText,
  HelpCircle,
  Star,
  Upload,
} from "lucide-react";
import { useState } from "react";

const mockExams = [
  {
    name: "ISE-I Data Structures",
    date: "Feb 10, 2026",
    time: "10:00 AM",
    branch: "CSE",
    status: "Completed",
  },
  {
    name: "ISE-I Algorithms",
    date: "Feb 12, 2026",
    time: "10:00 AM",
    branch: "CSE",
    status: "Completed",
  },
  {
    name: "ISE-II DBMS",
    date: "Mar 05, 2026",
    time: "02:00 PM",
    branch: "IT",
    status: "Upcoming",
  },
  {
    name: "Semester Exam - Networks",
    date: "Apr 20, 2026",
    time: "09:00 AM",
    branch: "ECE",
    status: "Upcoming",
  },
  {
    name: "ISE-II Web Technologies",
    date: "Mar 08, 2026",
    time: "11:00 AM",
    branch: "IT",
    status: "Upcoming",
  },
];

const mockStudentsMarks = [
  { name: "Arjun Sharma", marks: "" },
  { name: "Priya Patel", marks: "" },
  { name: "Rahul Verma", marks: "" },
  { name: "Sneha Gupta", marks: "" },
  { name: "Karan Singh", marks: "" },
];

function StatusBadge({ status }: { status: string }) {
  if (status === "Completed")
    return (
      <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">
        <CheckCircle2 className="w-3 h-3 mr-1" />
        {status}
      </Badge>
    );
  if (status === "Ongoing")
    return (
      <Badge className="bg-blue-100 text-blue-700 border-blue-200 text-xs">
        <Clock className="w-3 h-3 mr-1" />
        {status}
      </Badge>
    );
  return (
    <Badge className="bg-orange-100 text-orange-700 border-orange-200 text-xs">
      <AlertCircle className="w-3 h-3 mr-1" />
      {status}
    </Badge>
  );
}

export default function AcademicControl() {
  const [marks, setMarks] = useState(mockStudentsMarks.map((s) => ({ ...s })));
  const [notifMsg, setNotifMsg] = useState("");
  const [notifTarget, setNotifTarget] = useState("All");
  const [notifSent, setNotifSent] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);
  const [quizTitle, setQuizTitle] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [syllabusFile, setSyllabusFile] = useState<File | null>(null);
  const [syllabusUploading, setSyllabusUploading] = useState(false);
  const [syllabusUploaded, setSyllabusUploaded] = useState(false);
  const [syllabusError, setSyllabusError] = useState("");

  const handleSyllabusUpload = () => {
    if (!syllabusFile) {
      setSyllabusError("Please select a file first.");
      return;
    }
    setSyllabusError("");
    setSyllabusUploading(true);
    setTimeout(() => {
      setSyllabusUploading(false);
      setSyllabusUploaded(true);
    }, 1500);
  };

  const handleSendNotif = () => {
    if (notifMsg.trim()) {
      setNotifSent(true);
      setTimeout(() => setNotifSent(false), 3000);
      setNotifMsg("");
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-8">
      <div className="mb-6">
        <h2 className="font-display font-bold text-fhub-heading text-xl">
          Academic Control Panel
        </h2>
        <p className="text-sm text-fhub-muted mt-1">
          Manage all academic operations from a single dashboard
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* 1. Upload Syllabus */}
        <div className="bg-white dark:bg-fhub-card rounded-2xl border border-fhub-border shadow-fhub p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-fhub-badge-bg flex items-center justify-center">
              <Upload className="w-4 h-4 text-fhub-accent" />
            </div>
            <h3 className="font-semibold text-fhub-heading text-sm">
              Upload Syllabus
            </h3>
          </div>
          <div className="space-y-3">
            <div>
              <Label className="text-xs text-fhub-muted mb-1 block">
                Branch
              </Label>
              <Select defaultValue="CSE">
                <SelectTrigger className="border-fhub-border bg-fhub-bg text-fhub-heading text-sm h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["CSE", "IT", "ECE", "Mechanical", "Civil", "EEE"].map(
                    (b) => (
                      <SelectItem key={b} value={b}>
                        {b}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs text-fhub-muted mb-1 block">
                Semester
              </Label>
              <Select defaultValue="6">
                <SelectTrigger className="border-fhub-border bg-fhub-bg text-fhub-heading text-sm h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["1", "2", "3", "4", "5", "6", "7", "8"].map((s) => (
                    <SelectItem key={s} value={s}>
                      Semester {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs text-fhub-muted mb-1 block">
                Syllabus File
              </Label>
              <Input
                type="file"
                accept=".pdf,.doc,.docx"
                className="border-fhub-border bg-fhub-bg text-fhub-heading text-xs h-9 cursor-pointer"
                onChange={(e) => {
                  setSyllabusFile(e.target.files?.[0] ?? null);
                  setSyllabusUploaded(false);
                  setSyllabusError("");
                }}
              />
            </div>
            {syllabusError && (
              <p className="text-xs text-red-500">{syllabusError}</p>
            )}
            {syllabusUploaded ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2 p-2 rounded-lg bg-green-50 border border-green-200">
                  <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span className="text-xs text-green-700 font-medium truncate">
                    Uploaded: {syllabusFile?.name}
                  </span>
                </div>
                <Button
                  onClick={() => {
                    setSyllabusUploaded(false);
                    setSyllabusFile(null);
                  }}
                  variant="outline"
                  className="w-full text-sm rounded-xl h-9 border-fhub-border text-fhub-heading"
                >
                  Re-upload
                </Button>
              </div>
            ) : (
              <Button
                onClick={handleSyllabusUpload}
                disabled={syllabusUploading}
                className="w-full bg-fhub-accent hover:bg-fhub-accent-dark text-white text-sm rounded-xl h-9"
              >
                {syllabusUploading ? (
                  <>
                    <span className="w-3.5 h-3.5 mr-1.5 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" />{" "}
                    Uploading…
                  </>
                ) : (
                  <>
                    <Upload className="w-3.5 h-3.5 mr-1.5" /> Upload
                  </>
                )}
              </Button>
            )}
          </div>
        </div>

        {/* 2. Assign Tasks */}
        <div className="bg-white dark:bg-fhub-card rounded-2xl border border-fhub-border shadow-fhub p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-fhub-badge-bg flex items-center justify-center">
              <ClipboardList className="w-4 h-4 text-fhub-accent" />
            </div>
            <h3 className="font-semibold text-fhub-heading text-sm">
              Assign Tasks
            </h3>
          </div>
          <div className="space-y-3">
            <div>
              <Label className="text-xs text-fhub-muted mb-1 block">
                Task Title
              </Label>
              <Input
                placeholder="e.g., Assignment 3 - Graphs"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                className="border-fhub-border bg-fhub-bg text-fhub-heading text-sm h-9"
              />
            </div>
            <div>
              <Label className="text-xs text-fhub-muted mb-1 block">
                Due Date
              </Label>
              <Input
                type="date"
                className="border-fhub-border bg-fhub-bg text-fhub-heading text-sm h-9"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs text-fhub-muted mb-1 block">
                  Branch
                </Label>
                <Select defaultValue="CSE">
                  <SelectTrigger className="border-fhub-border bg-fhub-bg text-fhub-heading text-xs h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["CSE", "IT", "ECE"].map((b) => (
                      <SelectItem key={b} value={b}>
                        {b}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs text-fhub-muted mb-1 block">
                  Division
                </Label>
                <Select defaultValue="A">
                  <SelectTrigger className="border-fhub-border bg-fhub-bg text-fhub-heading text-xs h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["A", "B", "C"].map((d) => (
                      <SelectItem key={d} value={d}>
                        Div {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button className="w-full bg-fhub-accent hover:bg-fhub-accent-dark text-white text-sm rounded-xl h-9">
              <ClipboardList className="w-3.5 h-3.5 mr-1.5" /> Assign Task
            </Button>
          </div>
        </div>

        {/* 3. Create Quiz */}
        <div className="bg-white dark:bg-fhub-card rounded-2xl border border-fhub-border shadow-fhub p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-fhub-badge-bg flex items-center justify-center">
              <HelpCircle className="w-4 h-4 text-fhub-accent" />
            </div>
            <h3 className="font-semibold text-fhub-heading text-sm">
              Create Quiz
            </h3>
          </div>
          <div className="space-y-3">
            <div>
              <Label className="text-xs text-fhub-muted mb-1 block">
                Quiz Title
              </Label>
              <Input
                placeholder="e.g., Unit Test 2 - Trees"
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
                className="border-fhub-border bg-fhub-bg text-fhub-heading text-sm h-9"
              />
            </div>
            <div>
              <Label className="text-xs text-fhub-muted mb-1 block">
                Subject
              </Label>
              <Select defaultValue="Data Structures">
                <SelectTrigger className="border-fhub-border bg-fhub-bg text-fhub-heading text-sm h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["Data Structures", "Algorithms", "DBMS", "Networks"].map(
                    (s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs text-fhub-muted mb-1 block">
                No. of Questions
              </Label>
              <Input
                type="number"
                defaultValue={10}
                min={1}
                max={50}
                className="border-fhub-border bg-fhub-bg text-fhub-heading text-sm h-9"
              />
            </div>
            <Button className="w-full bg-fhub-accent hover:bg-fhub-accent-dark text-white text-sm rounded-xl h-9">
              <HelpCircle className="w-3.5 h-3.5 mr-1.5" /> Create Quiz
            </Button>
          </div>
        </div>

        {/* 4. Set Internal Marks */}
        <div className="bg-white dark:bg-fhub-card rounded-2xl border border-fhub-border shadow-fhub p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-fhub-badge-bg flex items-center justify-center">
              <Star className="w-4 h-4 text-fhub-accent" />
            </div>
            <h3 className="font-semibold text-fhub-heading text-sm">
              Set Internal Marks
            </h3>
          </div>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {marks.map((student, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: static list
              <div key={i} className="flex items-center gap-2">
                <span className="text-xs text-fhub-heading flex-1 truncate">
                  {student.name}
                </span>
                <Input
                  type="number"
                  placeholder="0-30"
                  min={0}
                  max={30}
                  value={student.marks}
                  onChange={(e) => {
                    const updated = [...marks];
                    updated[i] = { ...updated[i], marks: e.target.value };
                    setMarks(updated);
                  }}
                  className="w-20 border-fhub-border bg-fhub-bg text-fhub-heading text-xs h-8"
                />
              </div>
            ))}
          </div>
          <Button className="w-full mt-3 bg-fhub-accent hover:bg-fhub-accent-dark text-white text-sm rounded-xl h-9">
            <Star className="w-3.5 h-3.5 mr-1.5" /> Save Marks
          </Button>
        </div>

        {/* 5. Generate Report Cards */}
        <div className="bg-white dark:bg-fhub-card rounded-2xl border border-fhub-border shadow-fhub p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-fhub-badge-bg flex items-center justify-center">
              <FileText className="w-4 h-4 text-fhub-accent" />
            </div>
            <h3 className="font-semibold text-fhub-heading text-sm">
              Generate Report Cards
            </h3>
          </div>
          <div className="space-y-3">
            <div>
              <Label className="text-xs text-fhub-muted mb-1 block">
                Branch
              </Label>
              <Select defaultValue="CSE">
                <SelectTrigger className="border-fhub-border bg-fhub-bg text-fhub-heading text-sm h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["CSE", "IT", "ECE", "Mechanical", "Civil", "EEE"].map(
                    (b) => (
                      <SelectItem key={b} value={b}>
                        {b}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs text-fhub-muted mb-1 block">
                Semester
              </Label>
              <Select defaultValue="6">
                <SelectTrigger className="border-fhub-border bg-fhub-bg text-fhub-heading text-sm h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["1", "2", "3", "4", "5", "6", "7", "8"].map((s) => (
                    <SelectItem key={s} value={s}>
                      Semester {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {reportGenerated && (
              <div className="flex items-center gap-2 p-2 rounded-lg bg-green-50 border border-green-200">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span className="text-xs text-green-700 font-medium">
                  Report cards generated successfully!
                </span>
              </div>
            )}
            <Button
              onClick={() => {
                setReportGenerated(true);
                setTimeout(() => setReportGenerated(false), 4000);
              }}
              className="w-full bg-fhub-accent hover:bg-fhub-accent-dark text-white text-sm rounded-xl h-9"
            >
              <FileText className="w-3.5 h-3.5 mr-1.5" /> Generate Reports
            </Button>
          </div>
        </div>

        {/* 6. Send Notifications */}
        <div className="bg-white dark:bg-fhub-card rounded-2xl border border-fhub-border shadow-fhub p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-fhub-badge-bg flex items-center justify-center">
              <Bell className="w-4 h-4 text-fhub-accent" />
            </div>
            <h3 className="font-semibold text-fhub-heading text-sm">
              Send Notifications
            </h3>
          </div>
          <div className="space-y-3">
            <div>
              <Label className="text-xs text-fhub-muted mb-1 block">
                Target Audience
              </Label>
              <Select value={notifTarget} onValueChange={setNotifTarget}>
                <SelectTrigger className="border-fhub-border bg-fhub-bg text-fhub-heading text-sm h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[
                    "All",
                    "CSE",
                    "IT",
                    "ECE",
                    "Division A",
                    "Division B",
                    "Division C",
                  ].map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs text-fhub-muted mb-1 block">
                Message
              </Label>
              <Textarea
                placeholder="Type your notification message..."
                value={notifMsg}
                onChange={(e) => setNotifMsg(e.target.value)}
                className="border-fhub-border bg-fhub-bg text-fhub-heading text-sm resize-none h-20"
              />
            </div>
            {notifSent && (
              <div className="flex items-center gap-2 p-2 rounded-lg bg-green-50 border border-green-200">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span className="text-xs text-green-700 font-medium">
                  Notification sent to {notifTarget}!
                </span>
              </div>
            )}
            <Button
              onClick={handleSendNotif}
              className="w-full bg-fhub-accent hover:bg-fhub-accent-dark text-white text-sm rounded-xl h-9"
            >
              <Bell className="w-3.5 h-3.5 mr-1.5" /> Send Notification
            </Button>
          </div>
        </div>

        {/* 7. Schedule Exams */}
        <div className="bg-white dark:bg-fhub-card rounded-2xl border border-fhub-border shadow-fhub p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-fhub-badge-bg flex items-center justify-center">
              <Calendar className="w-4 h-4 text-fhub-accent" />
            </div>
            <h3 className="font-semibold text-fhub-heading text-sm">
              Schedule Exams
            </h3>
          </div>
          <div className="space-y-3">
            <div>
              <Label className="text-xs text-fhub-muted mb-1 block">
                Exam Name
              </Label>
              <Input
                placeholder="e.g., ISE-II Data Structures"
                className="border-fhub-border bg-fhub-bg text-fhub-heading text-sm h-9"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs text-fhub-muted mb-1 block">
                  Date
                </Label>
                <Input
                  type="date"
                  className="border-fhub-border bg-fhub-bg text-fhub-heading text-xs h-9"
                />
              </div>
              <div>
                <Label className="text-xs text-fhub-muted mb-1 block">
                  Time
                </Label>
                <Input
                  type="time"
                  className="border-fhub-border bg-fhub-bg text-fhub-heading text-xs h-9"
                />
              </div>
            </div>
            <div>
              <Label className="text-xs text-fhub-muted mb-1 block">
                Branch
              </Label>
              <Select defaultValue="CSE">
                <SelectTrigger className="border-fhub-border bg-fhub-bg text-fhub-heading text-sm h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["CSE", "IT", "ECE", "Mechanical", "Civil", "EEE"].map(
                    (b) => (
                      <SelectItem key={b} value={b}>
                        {b}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full bg-fhub-accent hover:bg-fhub-accent-dark text-white text-sm rounded-xl h-9">
              <Calendar className="w-3.5 h-3.5 mr-1.5" /> Schedule Exam
            </Button>
          </div>
        </div>

        {/* 8. Track ISE & Semester Exams */}
        <div className="bg-white dark:bg-fhub-card rounded-2xl border border-fhub-border shadow-fhub p-5 md:col-span-2 lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-fhub-badge-bg flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-fhub-accent" />
            </div>
            <h3 className="font-semibold text-fhub-heading text-sm">
              Track ISE & Semester Exams
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-fhub-border">
                  <th className="text-left text-xs text-fhub-muted font-medium pb-2 pr-4">
                    Exam Name
                  </th>
                  <th className="text-left text-xs text-fhub-muted font-medium pb-2 pr-4">
                    Date
                  </th>
                  <th className="text-left text-xs text-fhub-muted font-medium pb-2 pr-4">
                    Time
                  </th>
                  <th className="text-left text-xs text-fhub-muted font-medium pb-2 pr-4">
                    Branch
                  </th>
                  <th className="text-left text-xs text-fhub-muted font-medium pb-2">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockExams.map((exam, i) => (
                  <tr
                    // biome-ignore lint/suspicious/noArrayIndexKey: static list
                    key={i}
                    className="border-b border-fhub-border/50 last:border-0"
                  >
                    <td className="py-2.5 pr-4 text-xs font-medium text-fhub-heading">
                      {exam.name}
                    </td>
                    <td className="py-2.5 pr-4 text-xs text-fhub-muted">
                      {exam.date}
                    </td>
                    <td className="py-2.5 pr-4 text-xs text-fhub-muted">
                      {exam.time}
                    </td>
                    <td className="py-2.5 pr-4">
                      <Badge className="bg-fhub-badge-bg text-fhub-accent border-fhub-accent/20 text-[10px]">
                        {exam.branch}
                      </Badge>
                    </td>
                    <td className="py-2.5">
                      <StatusBadge status={exam.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
