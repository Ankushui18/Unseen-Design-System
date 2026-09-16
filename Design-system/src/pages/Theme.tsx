import { useState } from "react";
import { Check, Download, Moon, RotateCcw, Sparkles, Sun, Wand2 } from "lucide-react";
import { PageHeader, Section } from "../docs/Blocks";
import { CodeBlock } from "../docs/CodeBlock";
import { Button } from "../ui/Button";
import { Avatar, Alert, Card, Chip, CircularProgress, Divider, Progress } from "../ui/Display";
import { Checkbox, Input, RadioGroup, Slider, Switch } from "../ui/Form";
import { Tabs } from "../ui/Navigation";
import { useToast } from "../ui/Overlay";
import { ACCENT_PRESETS, RADIUS_PRESETS, useTheme } from "../lib/theme";
import { useCopy } from "../lib/hooks";
import { cn } from "../utils/cn";

export function ThemePage() {
  const { mode, accentH, accentC, radiusScale, disabledOpacity, set, toggleMode, reset, cssExport } = useTheme();
  const { copied, copy } = useCopy();
  const { push } = useToast();
  const [tab, setTab] = useState("dashboard");
  const [plan, setPlan] = useState("pro");
  const [notify, setNotify] = useState(true);

  return (
    <>
      <PageHeader
        eyebrow="Theming"
        title="Theme Studio"
        description="Tune the system live. Every control below writes a CSS variable on :root — the same variables you would ship in production. Export the result when it feels right."
        tags={["Live", "Exportable", "Persisted locally"]}
      />

      <Section title="Controls" description="Brand, shape and state in one place.">
        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="space-y-5 p-5">
            <div>
              <p className="mb-2.5 text-subheading-xs uppercase text-subtle">Color mode</p>
              <div className="inline-flex rounded-lg border border-border bg-background p-0.5">
                {(["light", "dark"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => m !== mode && toggleMode()}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-paragraph-xs font-medium capitalize transition-colors",
                      mode === m ? "bg-surface text-foreground shadow-toggle ring-1 ring-border/60" : "text-muted hover:text-foreground",
                    )}
                  >
                    {m === "light" ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <Divider />

            <div>
              <p className="mb-2.5 text-subheading-xs uppercase text-subtle">Brand preset</p>
              <div className="grid grid-cols-6 gap-2 sm:grid-cols-12 lg:grid-cols-6">
                {ACCENT_PRESETS.map((p) => {
                  const active = Math.abs(accentH - p.h) < 2 && Math.abs(accentC - p.c) < 0.005;
                  return (
                    <button
                      key={p.name}
                      title={p.name}
                      onClick={() => set({ accentH: p.h, accentC: p.c })}
                      className={cn(
                        "relative flex aspect-square items-center justify-center rounded-lg ring-offset-2 ring-offset-surface transition-transform hover:scale-105",
                        active && "ring-2 ring-accent",
                      )}
                      style={{ background: `oklch(0.62 ${p.c} ${p.h})` }}
                    >
                      {active && <Check className="h-4 w-4 text-white" strokeWidth={3} />}
                    </button>
                  );
                })}
              </div>
            </div>

            <Slider label="Hue" value={accentH} onChange={(v) => set({ accentH: v })} min={0} max={360} formatValue={(v) => `${v}°`} />
            <Slider label="Chroma" value={accentC} onChange={(v) => set({ accentC: v })} min={0.02} max={0.3} step={0.005} formatValue={(v) => v.toFixed(3)} />
          </Card>

          <Card className="space-y-5 p-5">
            <div>
              <p className="mb-2.5 text-subheading-xs uppercase text-subtle">Corner radius</p>
              <div className="flex flex-wrap gap-1.5">
                {RADIUS_PRESETS.map((r) => (
                  <button
                    key={r.name}
                    onClick={() => set({ radiusScale: r.value })}
                    className={cn(
                      "rounded-lg border px-3 py-1.5 text-paragraph-xs font-medium transition-colors",
                      radiusScale === r.value ? "border-foreground bg-surface-secondary text-foreground" : "border-border text-muted hover:text-foreground",
                    )}
                  >
                    {r.name}
                  </button>
                ))}
              </div>
            </div>
            <Slider label="Radius scale" value={radiusScale} onChange={(v) => set({ radiusScale: v })} min={0} max={2.5} step={0.25} formatValue={(v) => `${v}×`} />

            <Divider />

            <Slider label="Disabled opacity" value={disabledOpacity} onChange={(v) => set({ disabledOpacity: v })} min={0.2} max={0.9} step={0.05} formatValue={(v) => v.toFixed(2)} />

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <Button size="sm" variant="outline" tone="default" startContent={<RotateCcw className="h-3.5 w-3.5" />} onClick={reset}>
                Reset
              </Button>
              <Button
                size="sm"
                startContent={copied ? <Check className="h-3.5 w-3.5" /> : <Download className="h-3.5 w-3.5" />}
                onClick={() => {
                  copy(cssExport);
                  push({ title: "Theme copied", description: "Paste it into your global stylesheet.", tone: "success" });
                }}
              >
                {copied ? "Copied" : "Export CSS"}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                tone="default"
                startContent={<Wand2 className="h-3.5 w-3.5" />}
                onClick={() => {
                  const p = ACCENT_PRESETS[Math.floor(Math.random() * ACCENT_PRESETS.length)];
                  const r = RADIUS_PRESETS[Math.floor(Math.random() * RADIUS_PRESETS.length)];
                  set({ accentH: p.h, accentC: p.c, radiusScale: r.value });
                  push({ title: `Rolled “${p.name}”`, description: `Radius set to ${r.name}.`, tone: "accent" });
                }}
              >
                Surprise me
              </Button>
            </div>
          </Card>
        </div>
      </Section>

      <Section title="Live preview" description="A realistic product surface rendered with your current token values.">
        <div className="overflow-hidden rounded-20 bg-background ring-1 ring-border shadow-sm">
          <div className="flex items-center gap-3 border-b border-separator bg-surface-secondary px-4 py-2.5">
            <Avatar name="Aperture" size="sm" tone="accent" square />
            <div className="min-w-0">
              <p className="text-paragraph-sm leading-tight font-medium">Acme Analytics</p>
              <p className="text-[11px] text-muted">workspace · production</p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <Chip size="sm" tone="success" dot>Live</Chip>
              <Button size="sm" variant="soft">Invite</Button>
            </div>
          </div>

          <div className="p-5">
            <Tabs
              value={tab}
              onChange={setTab}
              variant="underline"
              items={[
                { key: "dashboard", label: "Dashboard" },
                { key: "settings", label: "Settings" },
                { key: "billing", label: "Billing" },
              ]}
            />

            <div className="mt-5">
              {tab === "dashboard" && (
                <div className="grid gap-4 md:grid-cols-3">
                  {[
                    { l: "Active users", v: "14,205", d: "+3.4%", t: "success" as const },
                    { l: "Error rate", v: "0.42%", d: "-0.1%", t: "accent" as const },
                    { l: "Spend", v: "$3,128", d: "+11%", t: "warning" as const },
                  ].map((m) => (
                    <Card key={m.l} className="p-4">
                      <p className="text-paragraph-xs text-muted">{m.l}</p>
                      <p className="mt-1 font-mono text-[1.6rem] leading-none font-medium tracking-tight">{m.v}</p>
                      <Chip size="sm" tone={m.t} variant="soft" className="mt-2.5">{m.d}</Chip>
                    </Card>
                  ))}
                  <Card className="p-4 md:col-span-2">
                    <p className="mb-3 text-label-sm">Ingestion pipeline</p>
                    <div className="space-y-3">
                      <Progress label="Collector" value={92} showValue tone="success" size="sm" />
                      <Progress label="Transform" value={64} showValue tone="accent" size="sm" />
                      <Progress label="Warehouse" value={28} showValue tone="warning" size="sm" />
                    </div>
                  </Card>
                  <Card className="flex flex-col items-center justify-center gap-2 p-4">
                    <CircularProgress value={78} size={72} stroke={6} />
                    <p className="text-paragraph-xs text-muted">Quota used</p>
                  </Card>
                </div>
              )}

              {tab === "settings" && (
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-4">
                    <Input label="Workspace name" defaultValue="Acme Analytics" />
                    <Input label="Primary domain" defaultValue="acme.io" startContent={<Sparkles />} description="Used for SSO and invite matching." />
                    <Switch checked={notify} onChange={setNotify} label="Weekly digest" description="Every Monday at 09:00 local time." />
                  </div>
                  <div className="space-y-4">
                    <p className="text-paragraph-sm font-medium">Plan</p>
                    <RadioGroup
                      value={plan}
                      onChange={setPlan}
                      options={[
                        { value: "starter", label: "Starter", description: "$0 · 3 seats" },
                        { value: "pro", label: "Pro", description: "$9 / seat · unlimited events" },
                        { value: "enterprise", label: "Enterprise", description: "Custom · SSO + audit logs" },
                      ]}
                    />
                    <Divider />
                    <Checkbox checked label="Enable anonymous telemetry" />
                    <Alert tone="accent" title="Changes apply instantly">All members will see the new plan on their next sign-in.</Alert>
                  </div>
                </div>
              )}

              {tab === "billing" && (
                <div className="space-y-4">
                  <Alert tone="warning" title="Payment method expires soon" action={<Button size="sm" variant="soft" tone="warning">Update card</Button>}>
                    Visa ending 4242 expires next month.
                  </Alert>
                  <div className="flex flex-wrap items-center gap-2">
                    <Button>Pay invoice</Button>
                    <Button variant="soft">Download PDF</Button>
                    <Button variant="outline" tone="default">View history</Button>
                    <Button variant="ghost" tone="danger">Cancel plan</Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Section>

      <Section title="Export" description="Drop this into your global stylesheet after importing Aperture.">
        <CodeBlock filename="theme.css" code={cssExport} showLineNumbers />
      </Section>
    </>
  );
}
