import { useState } from "react";
import { PageHeader } from "../docs/Blocks";
import { Button } from "../ui/Button";
import { Card, Chip, Progress } from "../ui/Display";
import { CompactButton, StatusBadge, Tag } from "../ui/Extra";
import { Modal, useToast } from "../ui/Overlay";
import {
  ActivityItem,
  CardGrid,
  DataCard,
  DataTable,
  EmptyState,
  ErrorState,
  FilterBar,
  FilterChip,
  LoadingState,
  PageHeader as ProductHeader,
  SearchBar,
  SettingsSection,
  SettingsToggle,
  SortMenu,
  StatGrid,
  TextField,
  type DataTableColumn,
} from "../ui/ProductPatterns";
import { cn } from "../utils/cn";
import { RiAddLine, RiEyeLine, RiFilterLine, RiInboxLine, RiMoreLine, RiSendPlaneLine, RiSparkling2Line } from "@remixicon/react";

interface UserRow {
  id: string;
  name: string;
  email: string;
  role: "Owner" | "Admin" | "Member";
  status: "active" | "invited" | "paused";
  lastActive: string;
  usage: number;
}

const SAMPLE_USERS: UserRow[] = [
  { id: "u1", name: "Olivia Rhye", email: "olivia@studio.design", role: "Owner", status: "active", lastActive: "2m ago", usage: 92 },
  { id: "u2", name: "Phoenix Baker", email: "phoenix@studio.design", role: "Admin", status: "active", lastActive: "14m ago", usage: 64 },
  { id: "u3", name: "Lana Steiner", email: "lana@studio.design", role: "Member", status: "paused", lastActive: "1d ago", usage: 22 },
  { id: "u4", name: "Alex Morgan", email: "alex@studio.design", role: "Member", status: "invited", lastActive: "Pending", usage: 0 },
  { id: "u5", name: "Aiden Park", email: "aiden@studio.design", role: "Member", status: "active", lastActive: "4h ago", usage: 51 },
  { id: "u6", name: "Mira Cho", email: "mira@studio.design", role: "Member", status: "paused", lastActive: "3d ago", usage: 17 },
];

const noop = () => {};

const TONE_STATUS: Record<UserRow["status"], "completed" | "pending" | "failed"> = {
  active: "completed",
  invited: "pending",
  paused: "failed",
};

const STATUS_LABEL: Record<UserRow["status"], string> = {
  active: "Active",
  invited: "Invited",
  paused: "Paused",
};

function DemoSection({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <div className="pattern-demo">
      <div className="pattern-demo-header">
        <div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
      <div className="pattern-demo-stage">{children}</div>
    </div>
  );
}

export function PatternsPage() {
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "invited" | "paused">("all");
  const [sort, setSort] = useState("recent");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { push } = useToast();

  const filteredUsers = SAMPLE_USERS.filter((u) => {
    if (statusFilter !== "all" && u.status !== statusFilter) return false;
    if (q.trim() && !`${u.name} ${u.email}`.toLowerCase().includes(q.trim().toLowerCase())) return false;
    return true;
  });

  const userColumns: DataTableColumn<UserRow>[] = [
    {
      key: "name",
      header: "Name",
      sortable: true,
      sortKey: (u) => u.name,
      render: (u) => (
        <div className="flex items-center gap-3">
          <span className={cn("grid h-7 w-7 place-items-center rounded-full text-[11px] font-medium", u.role === "Owner" ? "bg-accent-soft text-accent-soft-foreground" : "bg-surface-secondary text-muted")}>{u.name.split(" ").map((p) => p[0]).join("")}</span>
          <div className="min-w-0">
            <p className="text-label-sm truncate">{u.name}</p>
            <p className="text-paragraph-xs text-subtle truncate">{u.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "role",
      header: "Role",
      render: (u) => <Tag variant="gray">{u.role}</Tag>,
    },
    {
      key: "status",
      header: "Status",
      render: (u) => <StatusBadge status={TONE_STATUS[u.status]} size="sm">{STATUS_LABEL[u.status]}</StatusBadge>,
    },
    {
      key: "usage",
      header: "Usage",
      alignNumeric: true,
      sortable: true,
      sortKey: (u) => u.usage,
      render: (u) => <Progress value={u.usage} size="sm" className="w-24" />,
    },
    {
      key: "lastActive",
      header: "Last active",
      render: (u) => <span className="text-paragraph-sm text-muted">{u.lastActive}</span>,
    },
  ];

  return (
    <div className="home-container pattern-page">
      <PageHeader
        eyebrow="Patterns"
        title="Compositions, not primitives"
        description="Individual components are a starting point. These patterns combine them into the information systems a real product needs: stat grids, data tables, settings sections, activity feeds, and command surfaces."
        tags={["10 product patterns", "Open source", "React 19"]}
      />

      <DemoSection title="01 · PageHeader" description="The header that anchors every list, detail, and settings page. Eyebrow for context, title for identity, description for scope, primary actions for the next decision.">
        <DemoSection title="Members" description="A real product page header, with a search action on the left and a single primary action on the right.">
          <ProductHeader
            eyebrow="Workspace"
            title="Members"
            description="Everyone who has access to Studio workspace, including pending invitations."
            secondary={<Button variant="outline" tone="default" startContent={<RiFilterLine size={14} />}>Filters</Button>}
            primary={<Button startContent={<RiAddLine size={14} />}>Invite member</Button>}
          />
        </DemoSection>
      </DemoSection>

      <DemoSection title="02 · SearchBar + FilterBar" description="The second-most important component after the data table. A real search bar knows about filters, command shortcuts, and clear states.">
        <DemoSection title="Search and filter" description="Type to search. Click a chip to filter by status.">
          <div className="space-y-3">
            <FilterBar
              leading={<SearchBar value={q} onChange={setQ} placeholder="Search members by name or email…" shortcut="⌘K" />}
              trailing={
                <SortMenu
                  value={sort}
                  onChange={setSort}
                  options={[{ value: "recent", label: "Most recent" }, { value: "name", label: "Name (A → Z)" }, { value: "usage", label: "Highest usage" }]}
                />
              }
            >
              {[
                { id: "all", label: "All", value: 12 },
                { id: "active", label: "Active", value: 8 },
                { id: "invited", label: "Invited", value: 3 },
                { id: "paused", label: "Paused", value: 1 },
              ].map((filter) => (
                <FilterChip key={filter.id} active={statusFilter === filter.id} onClick={() => setStatusFilter(filter.id as typeof statusFilter)} count={filter.value}>
                  {filter.label}
                </FilterChip>
              ))}
            </FilterBar>
          </div>
        </DemoSection>
      </DemoSection>

      <DemoSection title="03 · DataTable" description="A real table. Selection, sorting, loading state, empty state, bulk actions, pagination. The same component that runs production data apps.">
        <DemoSection title="Workspace members" description="Click the checkbox column header to select all, then use the bulk action bar. Sort by Name or Usage. There is no fake marketing data here.">
          <DataTable
            columns={userColumns}
            rows={filteredUsers}
            rowKey={(u) => u.id}
            selectable
            bulkActions={[
            { id: "resend", label: "Resend invite", icon: <RiSendPlaneLine size={14} />, onSelect: () => push({ title: "Invite resent", description: "Resent the selected invitation(s).", tone: "accent" }) },
            { id: "remove", label: "Remove", icon: <RiSparkling2Line size={14} />, tone: "danger", onSelect: () => push({ title: "Members removed", description: "In this preview, the action only confirms via toast.", tone: "danger" }) },
            ]}
            pagination={{ page: 1, totalPages: 3, onPageChange: noop }}
            emptyState={<EmptyState icon={<RiInboxLine size={20} />} title="No members match" description="Try a different search term or clear the active filters." actions={<Button variant="outline" tone="default" onClick={() => { setQ(""); setStatusFilter("all"); }}>Clear filters</Button>} />}
          />
        </DemoSection>
      </DemoSection>

      <DemoSection title="04 · StatGrid + DataCard" description="Information hierarchy. Primary number, supporting context, optional trend. Designed for repeated use across dashboards.">
        <DemoSection title="Monthly metrics" description="Four KPI cards, real shapes.">
          <StatGrid columns={4}>
            <DataCard
              label="Monthly revenue"
              value="$128,430"
              trend={{ value: 12.8, direction: "up", period: "vs last month" }}
              primary={<CompactButton variant="ghost" aria-label="View report"><RiEyeLine size={14} /></CompactButton>}
            />
            <DataCard
              label="Active users"
              value="14,205"
              trend={{ value: 4.2, direction: "up", period: "this week" }}
            />
            <DataCard
              label="Churn"
              value="2.3%"
              trend={{ value: 0.4, direction: "down", period: "vs last month" }}
            />
            <DataCard
              label="API calls"
              value="1.2M"
              trend={{ value: 0, direction: "flat", period: "this month" }}
            />
          </StatGrid>
        </DemoSection>
      </DemoSection>

      <DemoSection title="05 · SettingsSection + SettingsToggle" description="Forms used across settings, profile, billing, team. Each section divides visually with hairline rules and a primary action footer.">
        <DemoSection title="Workspace preferences" description="Click any toggle. Each section is a distinct settings unit.">
          <div className="space-y-4">
            <SettingsSection
              title="Notifications"
              description="Choose which updates you want to receive from your workspace."
            >
              <SettingsToggle label="Email activity digest" description="A summary of activity from this workspace, sent every Monday." checked onChange={noop} />
              <SettingsToggle label="Push notifications" description="Real-time updates in your browser and on mobile." checked={false} onChange={noop} />
              <SettingsToggle label="Mention alerts" description="Notify me when someone mentions me in a comment." checked onChange={noop} />
            </SettingsSection>
            <SettingsSection
              title="Privacy"
              description="Control who can see and mention you."
              footer={<><Button variant="outline" tone="default">Cancel</Button><Button onClick={noop}>Save changes</Button></>}
            >
              <SettingsToggle label="Show my activity status" description="Appear as online to other members." checked onChange={noop} />
              <SettingsToggle label="Allow mentions from anyone" description="Otherwise only people you work with can mention you." checked={false} onChange={noop} />
            </SettingsSection>
          </div>
        </DemoSection>
      </DemoSection>

      <DemoSection title="06 · EmptyState, LoadingState, ErrorState" description="Three different states, same shape. Customers experience whatever state they're in more often than the happy path.">
        <div className="space-y-5">
          <DemoSection title="Empty" description="The first time a user reaches this screen.">
            <EmptyState icon={<RiInboxLine size={20} />} title="No projects yet" description="Create your first project to start organizing your workspace." actions={<Button startContent={<RiAddLine size={14} />}>New project</Button>} />
          </DemoSection>
          <DemoSection title="Loading" description="A clean skeleton. The shape matches the eventual content.">
            <LoadingState rows={3} />
          </DemoSection>
          <DemoSection title="Error" description="What they see when something went wrong. One action to recover.">
            <ErrorState title="Couldn't load your projects" description="Check your connection, then try again. The data is safe." onRetry={noop} />
          </DemoSection>
        </div>
      </DemoSection>

      <DemoSection title="07 · ActivityItem" description="The shape of an event in a feed: who, what, when, why it matters.">
        <DemoSection title="Recent activity" description="Mix of user-driven events and system events, with tone-tinted backgrounds.">
          <div className="divide-y divide-separator-secondary">
            <ActivityItem item={{ id: "a1", actor: { name: "Olivia Rhye", tone: "accent" }, verb: "renamed the project", target: "Workspace redesign", time: "Just now", tone: "success" }} />
            <ActivityItem item={{ id: "a2", actor: { name: "Phoenix Baker" }, verb: "invited", target: "alex@studio.design", time: "2m ago" }} />
            <ActivityItem item={{ id: "a3", actor: { name: "Build pipeline" }, verb: "failed on", target: "main@4f21ac", time: "4m ago", tone: "danger", meta: "1 error" }} />
            <ActivityItem item={{ id: "a4", actor: { name: "Lana Steiner" }, verb: "completed", target: "Token migration", time: "12m ago", tone: "success" }} />
            <ActivityItem item={{ id: "a5", actor: { name: "Stripe" }, verb: "received a $248 payment", time: "1h ago" }} />
          </div>
        </DemoSection>
      </DemoSection>

      <DemoSection title="08 · Destructive confirmation" description="Destructive actions need a clear summary, a confirmation path, and an explicit cancel.">
        <DemoSection title="Delete workspace" description="A real destructive flow, not just a yes/no modal.">
          <Button tone="danger" onClick={() => setConfirmOpen(true)}>Delete workspace</Button>
        </DemoSection>
        <Modal open={confirmOpen} onClose={() => setConfirmOpen(false)} title="Delete this workspace?" description="This permanently removes the workspace, all 18 projects, 42 members, and the audit log for the last 90 days. This action cannot be undone." icon={<RiInboxLine size={20} />} iconTone="danger" footer={<><Button variant="outline" tone="default" onClick={() => setConfirmOpen(false)}>Cancel</Button><Button tone="danger" onClick={() => { setConfirmOpen(false); push({ title: "Workspace deleted", description: "In this preview, the action only confirms via toast.", tone: "danger" }); }}>Delete workspace</Button></>}>
          <TextField label="Workspace name" placeholder="Type the workspace name to confirm" />
        </Modal>
      </DemoSection>

      <DemoSection title="09 · CardGrid (idea index)" description="The first shape your users learn: a clean grid of related items with a clear primary action and a quick meta line.">
        <DemoSection title="API keys" description="The kind of grid a settings or developer page begins with.">
          <CardGrid columns={3}>
            {[
              { id: "live", label: "Live · production", value: "wk_live_4f21ac9e", tone: "success" as const, time: "Created 2 days ago" },
              { id: "staging", label: "Staging", value: "wk_test_92af10bc", tone: "warning" as const, time: "Last used 4h ago" },
              { id: "dev", label: "Development", value: "wk_dev_7e0b4e29", tone: "default" as const, time: "Never used" },
            ].map((key) => (
              <Card key={key.id} className="p-5">
                <div className="flex items-center justify-between gap-2">
                  <Chip tone={key.tone} variant="soft" dot size="sm">{key.label}</Chip>
                  <CompactButton variant="ghost" aria-label="Options"><RiMoreLine size={14} /></CompactButton>
                </div>
                <p className="mt-3 truncate font-mono text-paragraph-sm text-foreground">{key.value}</p>
                <p className="mt-1 text-paragraph-xs text-subtle">{key.time}</p>
                <div className="mt-4 flex gap-2">
                  <Button size="xs" variant="outline" tone="default" fullWidth>View usage</Button>
                  <Button size="xs" tone="default" fullWidth>Reveal</Button>
                </div>
              </Card>
            ))}
          </CardGrid>
        </DemoSection>
      </DemoSection>
    </div>
  );
}
