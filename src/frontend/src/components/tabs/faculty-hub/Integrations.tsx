import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  Clock,
  FileOutput,
  FileText,
  Github,
  Linkedin,
  Monitor,
  RefreshCw,
  XCircle,
} from "lucide-react";
import { useState } from "react";

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  status: "connected" | "disconnected" | "syncing";
  detail: string;
  actionLabel: string;
  color: string;
}

const integrations: Integration[] = [
  {
    id: "google-classroom",
    name: "Google Classroom",
    description: "Assignment distribution & student management",
    icon: FileText,
    status: "connected",
    detail: "24 assignments distributed · 3 pending review",
    actionLabel: "Open Classroom",
    color: "text-green-600",
  },
  {
    id: "github",
    name: "GitHub",
    description: "Project tracking for practical subjects",
    icon: Github,
    status: "connected",
    detail: "18 student repos tracked · 5 active PRs",
    actionLabel: "View Repos",
    color: "text-gray-800",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    description: "Professional profile & networking",
    icon: Linkedin,
    status: "disconnected",
    detail: "Profile not linked yet",
    actionLabel: "Link Profile",
    color: "text-blue-600",
  },
  {
    id: "smartboard",
    name: "Smartboard Sync",
    description: "Real-time classroom board synchronization",
    icon: Monitor,
    status: "connected",
    detail: "Last synced: 2 hours ago",
    actionLabel: "Sync Now",
    color: "text-fhub-accent",
  },
  {
    id: "report-gen",
    name: "Report Generator",
    description: "Automated academic report generation",
    icon: FileOutput,
    status: "connected",
    detail: "Last generated: Jan 15, 2026",
    actionLabel: "Generate Now",
    color: "text-purple-600",
  },
];

function StatusBadge({ status }: { status: Integration["status"] }) {
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

export default function Integrations() {
  const [statuses, setStatuses] = useState<
    Record<string, Integration["status"]>
  >(Object.fromEntries(integrations.map((i) => [i.id, i.status])));
  const [details, setDetails] = useState<Record<string, string>>(
    Object.fromEntries(integrations.map((i) => [i.id, i.detail])),
  );

  const handleAction = (id: string) => {
    if (id === "smartboard") {
      setStatuses((prev) => ({ ...prev, [id]: "syncing" }));
      setTimeout(() => {
        setStatuses((prev) => ({ ...prev, [id]: "connected" }));
        setDetails((prev) => ({ ...prev, [id]: "Last synced: Just now" }));
      }, 2000);
    } else if (id === "linkedin") {
      setStatuses((prev) => ({ ...prev, [id]: "connected" }));
      setDetails((prev) => ({ ...prev, [id]: "Profile linked successfully" }));
    } else if (id === "report-gen") {
      setDetails((prev) => ({
        ...prev,
        [id]: `Last generated: ${new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}`,
      }));
    }
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
        {integrations.map((integration) => {
          const Icon = integration.icon;
          const currentStatus = statuses[integration.id];
          const currentDetail = details[integration.id];

          return (
            <div
              key={integration.id}
              className="bg-white dark:bg-fhub-card rounded-2xl border border-fhub-border shadow-fhub p-6 flex flex-col gap-4"
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-fhub-bg border border-fhub-border flex items-center justify-center">
                    <Icon className={`w-5 h-5 ${integration.color}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-fhub-heading text-sm">
                      {integration.name}
                    </h3>
                    <p className="text-xs text-fhub-muted leading-tight mt-0.5">
                      {integration.description}
                    </p>
                  </div>
                </div>
                <StatusBadge status={currentStatus} />
              </div>

              {/* Detail */}
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-fhub-bg border border-fhub-border">
                <Clock className="w-3.5 h-3.5 text-fhub-muted flex-shrink-0" />
                <span className="text-xs text-fhub-muted">{currentDetail}</span>
              </div>

              {/* Action */}
              <Button
                onClick={() => handleAction(integration.id)}
                variant={currentStatus === "connected" ? "outline" : "default"}
                className={`w-full text-sm rounded-xl ${
                  currentStatus === "connected"
                    ? "border-fhub-border text-fhub-heading hover:bg-fhub-bg"
                    : "bg-fhub-accent hover:bg-fhub-accent-dark text-white"
                }`}
              >
                {integration.actionLabel}
              </Button>
            </div>
          );
        })}
      </div>

      {/* Summary Stats */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            label: "Active Integrations",
            value: Object.values(statuses).filter((s) => s === "connected")
              .length,
            color: "text-green-600",
          },
          {
            label: "Pending Setup",
            value: Object.values(statuses).filter((s) => s === "disconnected")
              .length,
            color: "text-orange-500",
          },
          {
            label: "Total Platforms",
            value: integrations.length,
            color: "text-fhub-accent",
          },
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
