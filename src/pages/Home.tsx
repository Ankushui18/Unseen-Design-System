import React, { useState, useEffect } from "react";
import { Button, FancyButton } from "../ui/Button";
import { Avatar, AvatarGroupCompact, Card, Chip, Kbd, Progress, Snippet, User } from "../ui/Display";
import { Input, Switch } from "../ui/Form";
import { Accordion, Breadcrumbs, Tabs } from "../ui/Navigation";
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live";
import { useToast } from "../ui/Overlay";
import { BLOCKS } from "../blocks";
import { SiteFooter } from "../docs/Shell";
import { COMPONENT_GROUPS } from "../docs/nav";
import { PREVIEWS } from "../docs/previews";
import { useCopy } from "../lib/hooks";
import { DigitInput } from "../ui/Extra";
import {
  AiAssistantTemplate,
  AnalyticsDashboardTemplate,
  BillingPageTemplate,
  TeamPeopleTemplate,
  SettingsScreenTemplate,
} from "./Templates";
import { cn } from "../utils/cn";
import {
  RiAddLine,
  RiArrowRightLine,
  RiArrowRightUpLine,
  RiBankCardLine,
  RiBitCoinLine,
  RiChat1Line,
  RiCheckLine,
  RiCodeSSlashLine,
  RiCommandLine,
  RiDashboardLine,
  RiDiscLine,
  RiEqualizerLine,
  RiEyeLine,
  RiFileCopyLine,
  RiFolderUploadLine,
  RiHeartFill,
  RiHeartLine,
  RiLayoutGridLine,
  RiLineChartLine,
  RiLockPasswordLine,
  RiMailLine,
  RiMoneyDollarCircleLine,
  RiMoonLine,
  RiPaletteLine,
  RiPauseFill,
  RiPlayFill,
  RiPlugLine,
  RiRepeatLine,
  RiRestartLine,
  RiRobot2Line,
  RiRulerLine,
  RiSendPlane2Fill,
  RiSettingsLine,
  RiShieldCheckLine,
  RiShuffleLine,
  RiSkipBackLine,
  RiSkipForwardLine,
  RiSparkling2Line,
  RiStackLine,
  RiStarFill,
  RiSunLine,
  RiTeamLine,
  RiUserFollowLine,
  RiUserLine,
  RiWalletLine,
} from "@remixicon/react";

const COMPONENT_COUNT = COMPONENT_GROUPS.reduce((count, group) => count + group.items.length, 0);
const noop = () => {};

/* -------------------------------------------------------------------------- */
/*              1. INTERACTIVE BENTO MICRO-APPS                              */
/* -------------------------------------------------------------------------- */

function MusicPlayerShowcase() {
  const [playing, setPlaying] = useState(false);
  const [liked, setLiked] = useState(true);
  const [likes, setLikes] = useState(412);
  const [progress, setProgress] = useState(38);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(true);
  const { push } = useToast();

  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => {
      setProgress((p) => (p >= 100 ? 0 : p + 1));
    }, 400);
    return () => clearInterval(interval);
  }, [playing]);

  const handleLike = () => {
    setLiked(!liked);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
    push({
      title: liked ? "Removed from Favorites" : "Added to Favorites",
      description: liked ? "Track removed from your library." : "Track saved to Liked Songs.",
      tone: liked ? "default" : "accent",
    });
  };

  return (
    <Card elevation={2} className="border-glow p-5 space-y-4 text-left">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative flex h-12 w-12 items-center justify-center rounded-10 bg-gradient-to-tr from-accent to-accent-300 text-white shadow-sm ring-1 ring-white/20">
            <RiDiscLine size={24} className={cn("transition-transform duration-[var(--duration-slower)]", playing && "animate-spin-slow")} />
          </div>
          <div>
            <h4 className="text-label-sm font-medium text-foreground">Solitude in Bloom</h4>
            <p className="text-paragraph-xs text-subtle">Hyper & Unseen</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[11px] font-mono text-subtle">{likes}</span>
          <button
            type="button"
            aria-label={liked ? "Unlike song" : "Like song"}
            onClick={handleLike}
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted hover:text-danger transition-colors"
          >
            {liked ? <RiHeartFill size={18} className="text-danger" /> : <RiHeartLine size={18} />}
          </button>
        </div>
      </div>

      <div className="space-y-1.5">
        <div
          className="relative h-1.5 w-full cursor-pointer rounded-full bg-surface-secondary overflow-hidden"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            setProgress(Math.round((clickX / rect.width) * 100));
          }}
        >
          <div className="h-full bg-accent transition-all duration-[var(--duration-fast)]" style={{ width: `${progress}%` }} />
        </div>
        <div className="flex items-center justify-between text-[11px] font-mono text-subtle">
          <span>{Math.floor((progress * 2.1) / 60)}:{String(Math.floor((progress * 2.1) % 60)).padStart(2, "0")}</span>
          <span>3:30</span>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-separator pt-3">
        <button
          type="button"
          aria-label="Shuffle"
          onClick={() => setShuffle(!shuffle)}
          className={cn("text-muted hover:text-foreground transition-colors", shuffle && "text-accent font-medium")}
        >
          <RiShuffleLine size={16} />
        </button>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous track"
            onClick={() => { setProgress(0); push({ title: "Previous track", tone: "default" }); }}
            className="flex h-7 w-7 items-center justify-center rounded-full text-muted hover:text-foreground"
          >
            <RiSkipBackLine size={16} />
          </button>
          <button
            type="button"
            aria-label={playing ? "Pause" : "Play"}
            onClick={() => setPlaying(!playing)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-xs hover:scale-105 active:scale-95 transition-all"
          >
            {playing ? <RiPauseFill size={18} /> : <RiPlayFill size={18} className="ml-0.5" />}
          </button>
          <button
            type="button"
            aria-label="Next track"
            onClick={() => { setProgress(0); push({ title: "Next track", tone: "default" }); }}
            className="flex h-7 w-7 items-center justify-center rounded-full text-muted hover:text-foreground"
          >
            <RiSkipForwardLine size={16} />
          </button>
        </div>
        <button
          type="button"
          aria-label="Repeat"
          onClick={() => setRepeat(!repeat)}
          className={cn("text-muted hover:text-foreground transition-colors", repeat && "text-accent font-medium")}
        >
          <RiRepeatLine size={16} />
        </button>
      </div>
    </Card>
  );
}

function CryptoWalletShowcase() {
  const [balance, setBalance] = useState(48392.45);
  const [currency, setCurrency] = useState<"USD" | "ETH">("USD");
  const { push } = useToast();

  const handleDeposit = () => {
    setBalance((b) => b + 500);
    push({
      title: "Deposit Initiated",
      description: "+$500.00 USDC received in your Unseen Smart Vault.",
      tone: "success",
    });
  };

  const handleSend = () => {
    if (balance <= 50) return;
    setBalance((b) => b - 50);
    push({
      title: "Transfer Sent",
      description: "-$50.00 transferred to 0x71C...39aB.",
      tone: "default",
    });
  };

  return (
    <Card elevation={2} className="border-glow p-5 space-y-4 text-left">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/15 text-accent">
            <RiWalletLine size={15} />
          </div>
          <span className="text-label-xs font-medium text-foreground">Treasury Vault</span>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-surface-secondary p-0.5 text-[11px] font-medium">
          <button
            type="button"
            onClick={() => setCurrency("USD")}
            className={cn("rounded-full px-2 py-0.5 transition-colors", currency === "USD" ? "bg-surface text-foreground shadow-xs" : "text-muted")}
          >
            USD
          </button>
          <button
            type="button"
            onClick={() => setCurrency("ETH")}
            className={cn("rounded-full px-2 py-0.5 transition-colors", currency === "ETH" ? "bg-surface text-foreground shadow-xs" : "text-muted")}
          >
            ETH
          </button>
        </div>
      </div>

      <div>
        <span className="text-[11px] font-mono uppercase tracking-wider text-subtle">Portfolio Balance</span>
        <div className="mt-0.5 flex items-baseline gap-2">
          <h3 className="text-title-h4 font-mono font-medium tracking-tight text-foreground">
            {currency === "USD" ? `$${balance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : `${(balance / 3240).toFixed(4)} ETH`}
          </h3>
          <Chip tone="success" size="sm" variant="soft" dot>+14.2%</Chip>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 pt-1">
        <Button size="sm" variant="solid" tone="accent" fullWidth onClick={handleDeposit} startContent={<RiAddLine size={15} />}>
          Deposit
        </Button>
        <Button size="sm" variant="outline" tone="default" fullWidth onClick={handleSend} startContent={<RiArrowRightUpLine size={15} />}>
          Send
        </Button>
      </div>
    </Card>
  );
}

function SavingsTargetsCard() {
  const [savings, setSavings] = useState(14850);
  const target = 20000;
  const pct = Math.min(100, Math.round((savings / target) * 100));
  const { push } = useToast();

  return (
    <Card elevation={2} className="border-glow p-5 space-y-4 text-left">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-success/15 text-success">
            <RiMoneyDollarCircleLine size={16} />
          </div>
          <div>
            <h4 className="text-label-xs font-medium text-foreground">Savings Milestone</h4>
            <p className="text-[11px] text-subtle">Q3 Runway Goal</p>
          </div>
        </div>
        <Chip tone="success" size="sm" variant="soft">{pct}% Funded</Chip>
      </div>

      <div className="space-y-1.5">
        <div className="flex justify-between text-paragraph-xs">
          <span className="font-mono text-foreground font-medium">${savings.toLocaleString()}</span>
          <span className="font-mono text-subtle">${target.toLocaleString()}</span>
        </div>
        <Progress value={pct} size="sm" tone="accent" />
      </div>

      <div className="flex items-center justify-between border-t border-separator pt-3 text-[11px] text-subtle">
        <span>+$1,200 auto-deposit scheduled</span>
        <button
          type="button"
          onClick={() => {
            setSavings((s) => Math.min(target, s + 500));
            push({ title: "Boosted +$500", description: "Transferred $500 to your savings pool.", tone: "success" });
          }}
          className="font-medium text-accent hover:underline"
        >
          Boost +$500
        </button>
      </div>
    </Card>
  );
}

function ClaimableBalanceCard() {
  const [claimed, setClaimed] = useState(false);
  const { push } = useToast();

  const handleClaim = () => {
    setClaimed(true);
    push({
      title: "Payout Dispatched",
      description: "$3,420.00 will arrive in your linked bank account in 1-2 business days.",
      tone: "success",
    });
  };

  return (
    <Card elevation={2} className="border-glow p-5 space-y-4 text-left">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-mono uppercase tracking-wider text-subtle">Available for Payout</span>
        <Chip tone={claimed ? "default" : "success"} size="sm" variant="soft" dot>
          {claimed ? "Processing" : "Ready"}
        </Chip>
      </div>

      <div>
        <h3 className="text-title-h4 font-mono font-medium tracking-tight text-foreground">
          {claimed ? "$0.00" : "$3,420.00"}
        </h3>
        <p className="text-[11px] text-subtle mt-0.5">Automated settlement pool • Next cycle: Sept 24</p>
      </div>

      <Button
        size="sm"
        variant={claimed ? "outline" : "solid"}
        tone={claimed ? "default" : "accent"}
        fullWidth
        disabled={claimed}
        onClick={handleClaim}
        startContent={claimed ? <RiCheckLine size={15} /> : <RiBankCardLine size={15} />}
      >
        {claimed ? "Payout Dispatched" : "Instant Withdraw"}
      </Button>
    </Card>
  );
}

function AiPromptShowcase() {
  const [prompt, setPrompt] = useState("");
  const [model] = useState("Unseen Vision-4");
  const [tokensUsed, setTokensUsed] = useState(1284);
  const [streaming, setStreaming] = useState(false);
  const [response, setResponse] = useState("Ready to assist. Ask anything about your design tokens or API routes.");
  const { push } = useToast();

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setStreaming(true);
    setResponse("");
    const textToStream = `Analyzing: "${prompt}". Synthesizing response across design tokens, accessibility constraints, and React 19 hooks... Optimization complete.`;
    let idx = 0;
    const timer = setInterval(() => {
      idx += 3;
      setResponse(textToStream.slice(0, idx));
      if (idx >= textToStream.length) {
        clearInterval(timer);
        setStreaming(false);
        setTokensUsed((t) => t + 34);
        push({ title: "Tokens Processed", description: "Stream finished with 99.4% confidence score.", tone: "accent" });
      }
    }, 40);
  };

  return (
    <Card elevation={2} className="border-glow p-5 space-y-4 text-left">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/15 text-accent">
            <RiSparkling2Line size={16} />
          </div>
          <div>
            <h4 className="text-label-xs font-medium text-foreground">Neural Co-Pilot</h4>
            <p className="text-[11px] text-subtle">{model}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[11px] text-subtle">
          <span>{tokensUsed} tkn</span>
          <span className="h-2 w-2 rounded-full bg-success animate-pulse-soft" />
        </div>
      </div>

      <div className="relative rounded-10 bg-surface-secondary/70 p-3 min-h-[72px] text-paragraph-xs text-foreground leading-relaxed">
        {response}
        {streaming && <span className="inline-block h-3 w-1.5 ml-1 bg-accent animate-pulse-soft" />}
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <input
            id="ai-prompt-input-hero"
            aria-label="Ask neural co-pilot"
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
            placeholder="Generate color ramp tokens..."
            className="w-full rounded-10 border border-border bg-surface px-3 py-1.5 text-paragraph-xs text-foreground placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
        <Button
          size="sm"
          variant="solid"
          tone="accent"
          disabled={streaming || !prompt.trim()}
          onClick={handleGenerate}
          startContent={<RiSendPlane2Fill size={13} />}
        >
          Ask
        </Button>
      </div>
    </Card>
  );
}

function ProfileShowcaseCard() {
  const [following, setFollowing] = useState(false);
  const [followers, setFollowers] = useState(1420);
  const { push } = useToast();

  const handleToggle = () => {
    setFollowing(!following);
    setFollowers((prev) => (following ? prev - 1 : prev + 1));
    push({
      title: following ? "Unfollowed Elena" : "Following Elena Vance",
      description: following ? "You won't receive notifications." : "You will now receive design system updates.",
      tone: following ? "default" : "accent",
    });
  };

  return (
    <Card elevation={2} className="border-glow p-5 space-y-4 text-left">
      <div className="flex items-start justify-between">
        <User
          name="Elena Vance"
          description="Staff Design Technologist"
          avatarProps={{ tone: "accent", size: "md" }}
        />
        <Button
          size="sm"
          variant={following ? "outline" : "solid"}
          tone={following ? "default" : "accent"}
          onClick={handleToggle}
          startContent={following ? <RiCheckLine size={14} /> : <RiUserFollowLine size={14} />}
        >
          {following ? "Following" : "Follow"}
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-2 border-y border-separator py-2.5 text-center">
        <div>
          <span className="block text-label-xs font-mono font-medium text-foreground">{followers.toLocaleString()}</span>
          <span className="text-[10px] text-subtle uppercase">Followers</span>
        </div>
        <div>
          <span className="block text-label-xs font-mono font-medium text-foreground">384</span>
          <span className="text-[10px] text-subtle uppercase">Following</span>
        </div>
        <div>
          <span className="block text-label-xs font-mono font-medium text-foreground">98.8%</span>
          <span className="text-[10px] text-subtle uppercase">Rating</span>
        </div>
      </div>

      <div className="flex items-center gap-1.5 flex-wrap">
        <Chip size="sm" variant="soft" tone="accent">React 19</Chip>
        <Chip size="sm" variant="soft" tone="default">Interactive</Chip>
        <Chip size="sm" variant="soft" tone="success">OKLCH</Chip>
      </div>
    </Card>
  );
}

function OtpVerificationShowcase() {
  const [code, setCode] = useState("482910");
  const { push } = useToast();

  const handleVerify = () => {
    push({
      title: "Device Authorized",
      description: "2-Factor cryptographic handshake completed.",
      tone: "success",
    });
  };

  return (
    <Card elevation={2} className="border-glow p-5 space-y-4 text-left">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/15 text-accent">
            <RiShieldCheckLine size={15} />
          </div>
          <span className="text-label-xs font-medium text-foreground">2FA Verification</span>
        </div>
        <Chip tone="accent" size="sm" variant="soft">Secure Enclave</Chip>
      </div>

      <div className="space-y-2">
        <p className="text-[11px] text-subtle">Enter 6-digit confirmation code</p>
        <DigitInput length={6} value={code} onChange={setCode} />
      </div>

      <Button size="sm" variant="solid" tone="accent" fullWidth onClick={handleVerify} startContent={<RiCheckLine size={15} />}>
        Verify Session
      </Button>
    </Card>
  );
}

function CreditsUsageCard() {
  const [credits, setCredits] = useState(8420);
  const total = 10000;
  const pct = Math.round((credits / total) * 100);
  const { push } = useToast();

  return (
    <Card elevation={2} className="border-glow p-5 space-y-3.5 text-left">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-mono uppercase tracking-wider text-subtle">Compute Allocation</span>
        <Chip size="sm" tone={pct > 80 ? "warning" : "accent"} variant="soft">{pct}%</Chip>
      </div>

      <div className="space-y-1.5">
        <div className="flex justify-between text-paragraph-xs font-mono">
          <span className="text-foreground font-medium">{credits.toLocaleString()} ops</span>
          <span className="text-subtle">{total.toLocaleString()} limit</span>
        </div>
        <Progress value={pct} size="sm" tone={pct > 80 ? "warning" : "accent"} />
      </div>

      <div className="flex items-center justify-between border-t border-separator pt-2.5 text-[11px] text-subtle">
        <span>Resets in 11 days</span>
        <button
          type="button"
          onClick={() => {
            setCredits(1000);
            push({ title: "Quota Refreshed", description: "Added 10,000 monthly operational compute credits.", tone: "accent" });
          }}
          className="font-medium text-accent hover:underline"
        >
          Add Quota
        </button>
      </div>
    </Card>
  );
}

function QuickActionsCard() {
  const { push } = useToast();

  return (
    <Card elevation={2} className="border-glow p-5 space-y-3 text-left">
      <div className="flex items-center justify-between">
        <span className="text-label-xs font-medium text-foreground">Quick Actions</span>
        <Kbd>⌘K</Kbd>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => push({ title: "New API Key", description: "Created secret key sk_live_89...2f.", tone: "accent" })}
          className="flex items-center gap-2 rounded-10 border border-border bg-surface p-2 text-left hover:border-accent hover:bg-surface-secondary transition-all"
        >
          <RiAddLine size={15} className="text-accent" />
          <div className="min-w-0">
            <p className="text-[11px] font-medium text-foreground truncate">Create Key</p>
            <p className="text-[9px] text-subtle">Secret API</p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => push({ title: "Invite Modal", description: "Team invite link generated.", tone: "default" })}
          className="flex items-center gap-2 rounded-10 border border-border bg-surface p-2 text-left hover:border-accent hover:bg-surface-secondary transition-all"
        >
          <RiTeamLine size={15} className="text-accent" />
          <div className="min-w-0">
            <p className="text-[11px] font-medium text-foreground truncate">Invite Member</p>
            <p className="text-[9px] text-subtle">Role Access</p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => push({ title: "Settings Opened", description: "Preferences synced.", tone: "default" })}
          className="flex items-center gap-2 rounded-10 border border-border bg-surface p-2 text-left hover:border-accent hover:bg-surface-secondary transition-all"
        >
          <RiSettingsLine size={15} className="text-accent" />
          <div className="min-w-0">
            <p className="text-[11px] font-medium text-foreground truncate">Preferences</p>
            <p className="text-[9px] text-subtle">Global theme</p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => push({ title: "Cache Purged", description: "Edge CDN flushed in 18ms.", tone: "warning" })}
          className="flex items-center gap-2 rounded-10 border border-border bg-surface p-2 text-left hover:border-accent hover:bg-surface-secondary transition-all"
        >
          <RiRestartLine size={15} className="text-accent" />
          <div className="min-w-0">
            <p className="text-[11px] font-medium text-foreground truncate">Purge Cache</p>
            <p className="text-[9px] text-subtle">Edge CDN</p>
          </div>
        </button>
      </div>
    </Card>
  );
}

function ActionsDemo() {
  const [activeBtn, setActiveBtn] = useState<string>("default");
  const { push } = useToast();

  return (
    <Card elevation={2} className="border-glow p-5 space-y-4 text-left">
      <div className="flex items-center justify-between">
        <span className="text-label-xs font-medium text-foreground">Interactive Variants</span>
        <span className="text-[10px] font-mono text-muted">React 19 Hooks</span>
      </div>

      <div className="flex flex-wrap gap-2">
        <FancyButton
          size="sm"
          tone="accent"
          onClick={() => {
            setActiveBtn("fancy");
            push({ title: "Fancy Button Triggered", description: "Specular highlight shader active.", tone: "accent" });
          }}
        >
          Specular Fancy
        </FancyButton>
        <Button
          size="sm"
          variant="solid"
          tone="accent"
          onClick={() => {
            setActiveBtn("solid");
            push({ title: "Solid Primary Clicked", tone: "accent" });
          }}
        >
          Solid
        </Button>
        <Button
          size="sm"
          variant="soft"
          tone="accent"
          onClick={() => {
            setActiveBtn("soft");
            push({ title: "Soft Accent Clicked", tone: "default" });
          }}
        >
          Soft
        </Button>
        <Button
          size="sm"
          variant="outline"
          tone="default"
          onClick={() => {
            setActiveBtn("stroke");
            push({ title: "Stroke Outline Clicked", tone: "default" });
          }}
        >
          Stroke
        </Button>
        <Button
          size="sm"
          variant="ghost"
          tone="default"
          onClick={() => {
            setActiveBtn("ghost");
            push({ title: "Ghost Clicked", tone: "default" });
          }}
        >
          Ghost
        </Button>
      </div>

      <div className="flex items-center justify-between border-t border-separator pt-2.5 text-[11px] text-subtle">
        <span>Active variant: <code className="font-mono text-foreground font-medium">{activeBtn}</code></span>
        <span className="flex items-center gap-1 text-success"><RiCheckLine size={13} /> 0 runtime styles</span>
      </div>
    </Card>
  );
}

/* -------------------------------------------------------------------------- */
/*             2. FLAGSHIP INTERACTIVE PRODUCT WORKSPACE SHOWCASE            */
/* -------------------------------------------------------------------------- */

type ShowcaseTab = "mosaic" | "dashboard" | "ai" | "finances" | "team" | "settings";

function WorkspaceShowcase() {
  const [activeTab, setActiveTab] = useState<ShowcaseTab>("mosaic");

  const tabs: { id: ShowcaseTab; label: string; icon: typeof RiLayoutGridLine; badge?: string }[] = [
    { id: "mosaic", label: "Components Mosaic", icon: RiLayoutGridLine, badge: "Interactive" },
    { id: "dashboard", label: "Dashboard", icon: RiDashboardLine },
    { id: "ai", label: "AI Assistant", icon: RiSparkling2Line, badge: "New" },
    { id: "finances", label: "Finances & Billing", icon: RiBankCardLine },
    { id: "team", label: "Team & People", icon: RiTeamLine },
    { id: "settings", label: "Settings", icon: RiSettingsLine },
  ];

  return (
    <section className="home-section" aria-label="Interactive workspace preview">
      <div className="home-section-heading">
        <div>
          <span className="section-number">Live System Sandbox</span>
          <h2>Experience the system in action.</h2>
        </div>
        <p>
          Switch between micro-apps, financial dashboards, AI assistants, and enterprise templates. Everything rendered live with Unseen primitives.
        </p>
      </div>

      {/* Category switcher bar */}
      <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-2 mb-6 scrollbar-none">
        <div className="inline-flex items-center gap-1.5 rounded-14 border border-border bg-surface/80 p-1.5 backdrop-blur-md shadow-xs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 rounded-10 px-3.5 py-2 text-label-xs font-medium transition-all duration-[var(--duration-fast)] whitespace-nowrap",
                  isActive
                    ? "bg-accent text-accent-foreground shadow-xs"
                    : "text-muted hover:text-foreground hover:bg-surface-secondary"
                )}
              >
                <Icon size={15} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={cn(
                      "rounded-full px-1.5 py-0.2 text-[9px] font-mono uppercase tracking-wider",
                      isActive ? "bg-black/25 text-white" : "bg-surface text-muted"
                    )}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Panels */}
      <div className="transition-all duration-[var(--duration-slow)]">
        {activeTab === "mosaic" && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <MusicPlayerShowcase />
            <CryptoWalletShowcase />
            <AiPromptShowcase />
            <SavingsTargetsCard />
            <ProfileShowcaseCard />
            <OtpVerificationShowcase />
            <ClaimableBalanceCard />
            <CreditsUsageCard />
            <QuickActionsCard />
            <ActionsDemo />
          </div>
        )}

        {activeTab === "dashboard" && (
          <div className="rounded-14 border border-border bg-surface p-6 shadow-sm">
            <AnalyticsDashboardTemplate />
          </div>
        )}

        {activeTab === "ai" && (
          <div className="rounded-14 border border-border bg-surface p-6 shadow-sm">
            <AiAssistantTemplate />
          </div>
        )}

        {activeTab === "finances" && (
          <div className="rounded-14 border border-border bg-surface p-6 shadow-sm">
            <BillingPageTemplate />
          </div>
        )}

        {activeTab === "team" && (
          <div className="rounded-14 border border-border bg-surface p-6 shadow-sm">
            <TeamPeopleTemplate />
          </div>
        )}

        {activeTab === "settings" && (
          <div className="rounded-14 border border-border bg-surface p-6 shadow-sm">
            <SettingsScreenTemplate />
          </div>
        )}
      </div>

      <div className="workspace-caption mt-6">
        <span className="beta-status-dot" />
        <span>Real components, shared OKLCH tokens. No scaled screenshots.</span>
        <span>React 19 + TypeScript + Tailwind CSS v4</span>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                  3. HERO LIVE REACT CODE PLAYGROUND                        */
/* -------------------------------------------------------------------------- */

const HERO_SNIPPETS: Record<string, { filename: string; code: string; imports: string }> = {
  "workspace-card.tsx": {
    filename: "workspace-card.tsx",
    imports: `import { FancyButton } from "./ui/Button";\nimport { Input, Switch } from "./ui/Form";\nimport { Chip } from "./ui/Display";`,
    code: `function WorkspaceCard() {
  const [plan, setPlan] = React.useState(false);

  return (
    <div style={{ width: "100%", maxWidth: 340, textAlign: "left" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 14,
          padding: 22,
          border: "1px solid var(--border)",
          borderRadius: "calc(14px * var(--radius-scale))",
          background: "var(--surface)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Chip tone="accent" variant="soft" dot size="sm">Public beta</Chip>
        </div>
        <div style={{ textAlign: "center" }}>
          <h3 style={{ fontSize: 20, fontWeight: 500, letterSpacing: -0.5 }}>Your workspace</h3>
          <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>
            Create a workspace and start building.
          </p>
        </div>
        <Input
          size="md"
          label="Workspace name"
          placeholder="Acme, Inc."
          defaultValue="Acme"
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
          }}
        >
          <span style={{ fontSize: 13, color: "var(--muted)" }}>
            Annual billing
          </span>
          <Switch size="sm" checked={plan} onChange={setPlan} aria-label="Annual billing" />
        </div>
        <FancyButton tone="accent" size="lg" fullWidth>
          Create workspace
        </FancyButton>
      </div>
    </div>
  );
}`,
  },
  "button.tsx": {
    filename: "button.tsx",
    imports: `import { Button } from "./ui/Button";`,
    code: `function ButtonDemo() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "center", justifyContent: "center", padding: 24, width: "100%", maxWidth: 320 }}>
      <Button variant="solid" tone="accent" size="md" fullWidth>
        Primary Filled
      </Button>
      <Button variant="outline" tone="default" size="md" fullWidth>
        Stroke Outline
      </Button>
      <Button variant="soft" tone="accent" size="md" fullWidth>
        Soft Tinted
      </Button>
      <Button variant="ghost" tone="default" size="md" fullWidth>
        Ghost Action
      </Button>
    </div>
  );
}`,
  },
  "fancy-button.tsx": {
    filename: "fancy-button.tsx",
    imports: `import { FancyButton } from "./ui/Button";`,
    code: `function FancyDemo() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center", justifyContent: "center", padding: 24, width: "100%", maxWidth: 320 }}>
      <FancyButton tone="accent" size="lg" fullWidth>
        Specular Primary
      </FancyButton>
      <FancyButton tone="accent" size="md" fullWidth>
        Get Started Today
      </FancyButton>
      <FancyButton tone="default" size="sm" fullWidth>
        Compact Shiny
      </FancyButton>
    </div>
  );
}`,
  },
  "input.tsx": {
    filename: "input.tsx",
    imports: `import { Input } from "./ui/Form";`,
    code: `function InputDemo() {
  const [val, setVal] = React.useState("alex@unseen.design");
  return (
    <div style={{ width: "100%", maxWidth: 320, display: "flex", flexDirection: "column", gap: 14, padding: 20 }}>
      <Input
        label="Email Address"
        placeholder="alex@unseen.design"
        value={val}
        onChange={(e) => setVal(e.target.value)}
      />
      <Input
        label="Master Password"
        type="password"
        placeholder="••••••••••"
        defaultValue="unseen_2026"
      />
    </div>
  );
}`,
  },
  "switch.tsx": {
    filename: "switch.tsx",
    imports: `import { Switch } from "./ui/Form";`,
    code: `function SwitchDemo() {
  const [enabled, setEnabled] = React.useState(true);
  const [notify, setNotify] = React.useState(false);
  return (
    <div style={{ width: "100%", maxWidth: 320, display: "flex", flexDirection: "column", gap: 16, padding: 20 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 13, fontWeight: 500 }}>Push Notifications</span>
        <Switch size="sm" checked={enabled} onChange={setEnabled} aria-label="Push Notifications" />
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 13, fontWeight: 500 }}>Email Digests</span>
        <Switch size="sm" checked={notify} onChange={setNotify} aria-label="Email Digests" />
      </div>
    </div>
  );
}`,
  },
};

const HERO_SCOPE = { Button, FancyButton, Input, Switch, Chip, User, React };

function HeroEditor() {
  const [activeFile, setActiveFile] = useState<string>("workspace-card.tsx");
  const [view, setView] = useState<"preview" | "code">("preview");
  const [resetKey, setResetKey] = useState(0);
  const { copy, copied } = useCopy();

  const fileData = HERO_SNIPPETS[activeFile] ?? HERO_SNIPPETS["workspace-card.tsx"];
  const copySource = `import React from "react";\n${fileData.imports}\n\nexport default ${fileData.code}`;

  return (
    <div className="hero-editor" aria-label="Interactive hero editor">
      {/* Multi-file tab bar */}
      <div className="flex items-center justify-between border-b border-separator bg-surface-secondary/80 px-2 py-1 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1">
          {Object.keys(HERO_SNIPPETS).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => {
                setActiveFile(f);
                setResetKey((n) => n + 1);
              }}
              className={cn(
                "flex items-center gap-1.5 rounded-6 px-2.5 py-1 text-[11px] font-mono transition-all",
                activeFile === f
                  ? "bg-surface text-accent shadow-xs border border-border font-medium"
                  : "text-muted hover:text-foreground"
              )}
            >
              <RiCodeSSlashLine size={13} />
              <span>{f}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1 shrink-0 ml-2">
          <span className="hero-editor-tabs" role="tablist" aria-label="Hero editor view">
            <button role="tab" aria-selected={view === "preview"} onClick={() => setView("preview")}><RiEyeLine size={13} /> Preview</button>
            <button role="tab" aria-selected={view === "code"} onClick={() => setView("code")}><RiCodeSSlashLine size={13} /> Code</button>
          </span>
          <button className="hero-editor-iconbtn" title="Reset example" aria-label="Reset example" onClick={() => setResetKey((n) => n + 1)}><RiRestartLine size={13} /></button>
          <button className="hero-editor-iconbtn" title={copied ? "Copied" : "Copy source"} aria-label={copied ? "Copied" : "Copy source"} onClick={() => copy(copySource)}>{copied ? <RiCheckLine size={13} /> : <RiFileCopyLine size={13} />}</button>
        </div>
      </div>

      <LiveProvider key={`${activeFile}-${resetKey}`} code={fileData.code} scope={HERO_SCOPE} language="jsx" noInline={false}>
        <div className="hero-editor-body">
          {view === "preview" ? (
            <div className="hero-editor-preview"><LivePreview key={resetKey} /></div>
          ) : (
            <LiveEditor key={`code-${activeFile}-${resetKey}`} className="hero-editor-source" aria-label="Edit the component code" />
          )}
        </div>
        <div aria-live="polite"><LiveError className="hero-editor-error" /></div>
      </LiveProvider>
      <div className="hero-editor-footer">
        <span><span className="beta-status-dot" /> Live React Studio — edit any prop to see live updates</span>
        <span>React 19 · Tailwind CSS v4 · TypeScript</span>
      </div>
    </div>
  );
}

function CoverageStrip() {
  const coverage = [
    { icon: RiStackLine, label: `${COMPONENT_COUNT} docs pages`, note: "Components" },
    { icon: RiLayoutGridLine, label: `${BLOCKS.length} blocks`, note: "Composed examples" },
    { icon: RiRulerLine, label: "7 foundations", note: "Color to motion" },
    { icon: RiSunLine, label: "Light & dark", note: "One token graph" },
    { icon: RiShieldCheckLine, label: "Keyboard first", note: "ARIA + focus" },
    { icon: RiPlugLine, label: "Zero deps", note: "No runtime to pin" },
  ];

  return (
    <div className="coverage-strip" role="list" aria-label="What the system covers">
      {coverage.map((c) => (
        <div className="coverage-cell" role="listitem" key={c.label}>
          <c.icon size={18} aria-hidden />
          <span>
            <strong>{c.label}</strong>
            <em>{c.note}</em>
          </span>
        </div>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*           4. ALIGNUI LIVE CUSTOMIZATION & TOKEN PLAYGROUND                */
/* -------------------------------------------------------------------------- */

type CustomColor = "blue" | "emerald" | "purple" | "amber" | "rose" | "slate";
type CustomRadius = "sm" | "md" | "lg" | "full";

const COLOR_MAP: Record<CustomColor, { name: string; hex: string; oklch: string; alpha10: string; alpha24: string; dark: string; lightBg: string }> = {
  blue: { name: "Electric Blue", hex: "#3b82f6", oklch: "oklch(0.55 0.22 255)", alpha10: "rgba(59, 130, 246, 0.1)", alpha24: "rgba(59, 130, 246, 0.24)", dark: "#1d4ed8", lightBg: "#eff6ff" },
  emerald: { name: "Emerald Mint", hex: "#10b981", oklch: "oklch(0.65 0.19 155)", alpha10: "rgba(16, 185, 129, 0.1)", alpha24: "rgba(16, 185, 129, 0.24)", dark: "#047857", lightBg: "#ecfdf5" },
  purple: { name: "Royal Purple", hex: "#8b5cf6", oklch: "oklch(0.58 0.23 295)", alpha10: "rgba(139, 92, 246, 0.1)", alpha24: "rgba(139, 92, 246, 0.24)", dark: "#6d28d9", lightBg: "#f5f3ff" },
  amber: { name: "Amber Gold", hex: "#f59e0b", oklch: "oklch(0.75 0.18 75)", alpha10: "rgba(245, 158, 11, 0.1)", alpha24: "rgba(245, 158, 11, 0.24)", dark: "#b45309", lightBg: "#fffbeb" },
  rose: { name: "Crimson Rose", hex: "#f43f5e", oklch: "oklch(0.60 0.24 15)", alpha10: "rgba(244, 63, 94, 0.1)", alpha24: "rgba(244, 63, 94, 0.24)", dark: "#be123c", lightBg: "#fff1f2" },
  slate: { name: "Slate Gray", hex: "#64748b", oklch: "oklch(0.50 0.04 260)", alpha10: "rgba(100, 116, 139, 0.1)", alpha24: "rgba(100, 116, 139, 0.24)", dark: "#334155", lightBg: "#f8fafc" },
};

const RADIUS_MAP: Record<CustomRadius, { label: string; px: string; token: string }> = {
  sm: { label: "Small", px: "6px", token: "var(--radius-6)" },
  md: { label: "Medium", px: "10px", token: "var(--radius-10)" },
  lg: { label: "Large", px: "16px", token: "var(--radius-16)" },
  full: { label: "Pill", px: "9999px", token: "9999px" },
};

function TokenCustomizerSection() {
  const [color, setColor] = useState<CustomColor>("blue");
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [radius, setRadius] = useState<CustomRadius>("md");
  const [email, setEmail] = useState("alex@unseen.design");
  const [remember, setRemember] = useState(true);
  const { copy, copied } = useCopy();
  const { push } = useToast();

  const activeColor = COLOR_MAP[color];
  const activeRadius = RADIUS_MAP[radius];

  const generatedCss = `:root {
  /* Dynamic Palette Tokens */
  --primary-base: ${activeColor.hex};
  --primary-dark: ${activeColor.dark};
  --primary-alpha-10: ${activeColor.alpha10};
  --primary-alpha-24: ${activeColor.alpha24};

  /* Geometric Curvature */
  --radius-card: ${activeRadius.px};
  --radius-control: ${radius === "full" ? "9999px" : `calc(${activeRadius.px} - 2px)`};
}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    push({
      title: "Password Reset Link Dispatched",
      description: `Sent verification link to ${email} with active ${activeColor.name} theme tokens.`,
      tone: "accent",
    });
  };

  return (
    <section className="home-section home-container" aria-label="Unlimited Customization Playground">
      <div className="home-section-heading">
        <div>
          <span className="section-number">Customization & Flexibility</span>
          <h2>Unlimited customization options for your unique needs.</h2>
        </div>
        <p>
          Adapt the token layer in real time. Switch primary palettes, toggle light/dark modes, and adjust curvature scales with zero layout shifts.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-12 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-5 space-y-6">
          {/* 1. Primary Colors */}
          <div className="space-y-2.5">
            <span className="text-label-xs font-medium text-foreground flex items-center gap-1.5">
              <RiPaletteLine size={14} className="text-accent" /> Primary Brand Color
            </span>
            <div className="grid grid-cols-3 gap-2">
              {(Object.keys(COLOR_MAP) as CustomColor[]).map((c) => {
                const item = COLOR_MAP[c];
                const isSelected = color === c;
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    className={cn(
                      "flex items-center gap-2 rounded-10 border p-2 text-label-xs font-medium transition-all text-left",
                      isSelected
                        ? "border-accent bg-accent/10 text-foreground ring-1 ring-accent"
                        : "border-border bg-surface text-muted hover:border-border-strong hover:text-foreground"
                    )}
                  >
                    <span className="h-3.5 w-3.5 shrink-0 rounded-full shadow-xs" style={{ background: item.hex }} />
                    <span className="truncate">{item.name.split(" ")[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Theme Options */}
          <div className="space-y-2.5">
            <span className="text-label-xs font-medium text-foreground flex items-center gap-1.5">
              <RiSunLine size={14} className="text-accent" /> Theme Environment
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setTheme("light")}
                className={cn(
                  "flex items-center justify-center gap-2 rounded-10 border py-2 px-3 text-label-xs font-medium transition-all",
                  theme === "light"
                    ? "border-accent bg-accent/10 text-foreground ring-1 ring-accent"
                    : "border-border bg-surface text-muted hover:text-foreground"
                )}
              >
                <RiSunLine size={15} /> Light Mode
              </button>
              <button
                type="button"
                onClick={() => setTheme("dark")}
                className={cn(
                  "flex items-center justify-center gap-2 rounded-10 border py-2 px-3 text-label-xs font-medium transition-all",
                  theme === "dark"
                    ? "border-accent bg-accent/10 text-foreground ring-1 ring-accent"
                    : "border-border bg-surface text-muted hover:text-foreground"
                )}
              >
                <RiMoonLine size={15} /> Dark Mode
              </button>
            </div>
          </div>

          {/* 3. Corner Radius */}
          <div className="space-y-2.5">
            <span className="text-label-xs font-medium text-foreground flex items-center gap-1.5">
              <RiRulerLine size={14} className="text-accent" /> Corner Radius Scale
            </span>
            <div className="grid grid-cols-4 gap-2">
              {(Object.keys(RADIUS_MAP) as CustomRadius[]).map((r) => {
                const item = RADIUS_MAP[r];
                const isSelected = radius === r;
                return (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRadius(r)}
                    className={cn(
                      "flex flex-col items-center justify-center rounded-10 border py-1.5 px-2 text-center transition-all",
                      isSelected
                        ? "border-accent bg-accent/10 text-foreground ring-1 ring-accent"
                        : "border-border bg-surface text-muted hover:text-foreground"
                    )}
                  >
                    <span className="text-[11px] font-medium">{item.label}</span>
                    <span className="text-[9px] font-mono text-subtle">{item.px}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Live CSS Variables Inspector */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-subtle uppercase tracking-wider">Generated Token Variables</span>
              <button
                type="button"
                onClick={() => copy(generatedCss)}
                className="flex items-center gap-1 text-[11px] font-mono text-accent hover:underline"
              >
                {copied ? <RiCheckLine size={13} /> : <RiFileCopyLine size={13} />}
                {copied ? "Copied" : "Copy CSS"}
              </button>
            </div>
            <pre className="rounded-10 border border-border bg-surface-secondary/80 p-3 text-[11px] font-mono text-muted overflow-x-auto leading-relaxed">
              <code>{generatedCss}</code>
            </pre>
          </div>
        </div>

        {/* Live Interactive Specimen Preview Column */}
        <div className="lg:col-span-7">
          <div className={cn("specimen-frame", theme === "dark" && "dark")}>
            <div className="specimen-stage p-8 sm:p-12 transition-colors duration-[var(--duration-slow)] flex items-center justify-center min-h-[460px] text-foreground">
              {/* Dynamic Styled Card */}
              <div
                style={{
                  borderRadius: activeRadius.px,
                  boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(125, 125, 125, 0.15)",
                }}
                className="w-full max-w-sm p-6 space-y-5 transition-all duration-[var(--duration-base)] text-left border border-border bg-surface"
              >
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div
                    className="flex h-10 w-10 items-center justify-center shadow-xs"
                    style={{
                      borderRadius: radius === "full" ? "9999px" : `calc(${activeRadius.px} - 2px)`,
                      background: activeColor.alpha24,
                      color: activeColor.hex,
                    }}
                  >
                    <RiLockPasswordLine size={20} />
                  </div>
                  <span
                    className="px-2.5 py-0.5 text-[11px] font-mono uppercase font-medium"
                    style={{
                      borderRadius: radius === "full" ? "9999px" : "6px",
                      background: activeColor.alpha10,
                      color: "var(--foreground)",
                    }}
                  >
                    Security
                  </span>
                </div>

                <div>
                  <h3 className="text-label-lg font-medium tracking-tight text-foreground">Reset Password</h3>
                  <p className="text-paragraph-xs mt-1 text-muted">
                    Enter your email to receive recovery instructions.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label htmlFor="customizer-email" className="text-label-xs font-medium block text-foreground">
                      Email Address <span className="text-danger">*</span>
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <RiMailLine size={16} className="text-muted" />
                      </div>
                      <input
                        id="customizer-email"
                        aria-label="Email address"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex@unseen.design"
                        required
                        style={{
                          borderRadius: radius === "full" ? "9999px" : `calc(${activeRadius.px} - 2px)`,
                        }}
                        className="w-full pl-9 pr-3 py-2 text-paragraph-xs border border-border bg-surface text-foreground placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-accent transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={remember}
                        onChange={(e) => setRemember(e.target.checked)}
                        style={{ accentColor: activeColor.hex }}
                        className="h-4 w-4 rounded"
                      />
                      <span className="text-paragraph-xs text-muted">
                        Trust this device
                      </span>
                    </label>
                    <a href="#" onClick={(e) => e.preventDefault()} className="text-paragraph-xs font-medium text-accent hover:underline">
                      Need help?
                    </a>
                  </div>

                  <button
                    type="submit"
                    style={{
                      borderRadius: radius === "full" ? "9999px" : `calc(${activeRadius.px} - 2px)`,
                      background: `linear-gradient(180deg, ${activeColor.dark} 0%, color-mix(in srgb, ${activeColor.dark} 82%, #000) 100%)`,
                      boxShadow: `0 2px 10px -2px ${activeColor.alpha24}, inset 0 1px 0 rgba(255, 255, 255, 0.3)`,
                    }}
                    className="w-full py-2.5 px-4 text-label-xs font-medium text-white transition-all hover:brightness-110 active:scale-[0.99] flex items-center justify-center gap-2"
                  >
                    Send Recovery Code <RiArrowRightLine size={15} />
                  </button>
                </form>

                <div className="text-center text-paragraph-xs border-t border-separator pt-3.5 text-muted">
                  Don't have access anymore?{" "}
                  <button type="button" className="font-medium text-accent hover:underline">
                    Try another method
                  </button>
                </div>
              </div>
            </div>

            <div className="p-3 border-t border-separator bg-surface-secondary/50 flex items-center justify-between text-[11px] font-mono text-subtle">
              <span>Dynamic CSS variable binding</span>
              <span>Theme: {theme.toUpperCase()} · Radius: {activeRadius.label}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*             5. SECTOR-SPECIFIC SAAS TEMPLATES SHOWCASE                    */
/* -------------------------------------------------------------------------- */

type SectorKey = "ai" | "hr" | "finance" | "marketing" | "crypto";

interface SectorData {
  id: SectorKey;
  title: string;
  badge?: string;
  tagline: string;
  desc: string;
  icon: typeof RiRobot2Line;
  subviews: string[];
  metrics: { label: string; val: string; change?: string }[];
  templateHref: string;
}

const SECTOR_DATA: Record<SectorKey, SectorData> = {
  ai: {
    id: "ai",
    title: "AI & Neural Apps",
    badge: "NEW",
    tagline: "AI-powered real-time messaging, prompt engineering & token telemetry.",
    desc: "Complete production-ready multi-page flow for modern generative AI applications, streaming completions, context windows, and model parameter tuning.",
    icon: RiRobot2Line,
    subviews: ["Chat Stream", "Token Analytics", "Prompt Vault", "API Keys"],
    metrics: [
      { label: "Token Throughput", val: "4.2M / mo", change: "+24.5%" },
      { label: "Latency P99", val: "142ms", change: "-18ms" },
      { label: "Cache Hit Rate", val: "94.8%" },
    ],
    templateHref: "templates/ai",
  },
  hr: {
    id: "hr",
    title: "HR & People Ops",
    tagline: "Employee lifecycle, permission matrices & faceted directory.",
    desc: "A focused workspace for HR directors and team leads to manage global payroll, role-based access control, PTO approvals, and employee records.",
    icon: RiTeamLine,
    subviews: ["Directory", "Leave Requests", "Role Matrix", "Onboarding"],
    metrics: [
      { label: "Active Members", val: "148", change: "+12" },
      { label: "Pending Approvals", val: "4" },
      { label: "Retention Rate", val: "97.4%" },
    ],
    templateHref: "templates/team",
  },
  finance: {
    id: "finance",
    title: "Finance & Banking",
    tagline: "Multi-currency treasury, smart corporate cards & settlement.",
    desc: "Institutional financial interface with real-time liquidity pools, automated payroll disbursements, virtual card generation, and audit ledgers.",
    icon: RiBankCardLine,
    subviews: ["Treasury", "Smart Cards", "Invoices", "Disbursements"],
    metrics: [
      { label: "Net Liquidity", val: "$1,842,500", change: "+$140k" },
      { label: "Avg APY Yield", val: "5.14%" },
      { label: "Card Spend MTD", val: "$48,920" },
    ],
    templateHref: "templates/billing",
  },
  marketing: {
    id: "marketing",
    title: "Marketing & Growth",
    tagline: "Multi-touch attribution, conversion funnels & campaign ROI.",
    desc: "High-density analytics interface tailored for performance marketers, growth engineers, and acquisition teams tracking cohort retention.",
    icon: RiLineChartLine,
    subviews: ["Attribution", "Campaigns", "Conversion Funnels", "Cohort Retention"],
    metrics: [
      { label: "Blended CAC", val: "$42.10", change: "-12.4%" },
      { label: "Conversion Rate", val: "4.82%", change: "+0.6%" },
      { label: "Active Cohort ARR", val: "$640,000" },
    ],
    templateHref: "templates/analytics",
  },
  crypto: {
    id: "crypto",
    title: "Cryptocurrency",
    badge: "SOON",
    tagline: "Cross-chain swap terminal, yield staking & decentralized vaults.",
    desc: "Web3 native dashboard with hardware wallet signatures, automated market-maker routing, gas optimization gauges, and liquidity staking.",
    icon: RiBitCoinLine,
    subviews: ["Swap Terminal", "Staking Pool", "Bridge", "Hardware Vault"],
    metrics: [
      { label: "Total Value Locked", val: "$24.8M" },
      { label: "Staking APY", val: "8.4%" },
      { label: "Gas Saved", val: "38.2 ETH" },
    ],
    templateHref: "templates/billing",
  },
};

function SectorTemplatesSection({ navigate }: { navigate: (to: string) => void }) {
  const [activeSector, setActiveSector] = useState<SectorKey>("ai");
  const [activeSubview, setActiveSubview] = useState(0);
  const data = SECTOR_DATA[activeSector];

  return (
    <section className="home-section home-container" aria-label="Sector-specific Templates">
      <div className="home-section-heading">
        <div>
          <span className="section-number">Sector-Specific Templates</span>
          <h2>Ready-made multi-page user flows for apps.</h2>
        </div>
        <div>
          <p>
            Full-scale application templates designed for distinct industries. High-density, fully responsive, and accessible out of the box.
          </p>
          <a href="#/templates" className="text-action">Explore all templates <RiArrowRightLine size={16} /></a>
        </div>
      </div>

      {/* Sector Navigation Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
        {(Object.keys(SECTOR_DATA) as SectorKey[]).map((sec) => {
          const item = SECTOR_DATA[sec];
          const Icon = item.icon;
          const isSelected = activeSector === sec;
          return (
            <button
              key={sec}
              type="button"
              onClick={() => {
                setActiveSector(sec);
                setActiveSubview(0);
              }}
              className={cn(
                "flex flex-col items-start p-3.5 rounded-10 border text-left transition-all relative overflow-hidden",
                isSelected
                  ? "border-accent bg-accent/10 shadow-xs ring-1 ring-accent text-foreground"
                  : "border-border bg-surface text-muted hover:border-border-strong hover:text-foreground"
              )}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <div
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-8",
                    isSelected ? "bg-accent text-accent-foreground" : "bg-surface-secondary text-muted"
                  )}
                >
                  <Icon size={16} />
                </div>
                {item.badge && (
                  <span
                    className={cn(
                      "px-1.5 py-0.2 rounded-full text-[9px] font-mono font-medium uppercase",
                      item.badge === "NEW" ? "bg-accent text-accent-foreground" : "bg-surface-secondary text-subtle"
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-label-xs font-medium text-foreground">{item.title}</span>
            </button>
          );
        })}
      </div>

      {/* Sector Content Showcase Card */}
      <div className="specimen-frame p-6 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-12 items-center">
          <div className="lg:col-span-5 space-y-5 text-left">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Chip tone="accent" size="sm" variant="soft">{data.title}</Chip>
                <span className="text-[11px] font-mono text-subtle">Production Flow</span>
              </div>
              <h3 className="text-title-h4 font-medium tracking-tight text-foreground">{data.tagline}</h3>
              <p className="text-paragraph-xs text-muted leading-relaxed">{data.desc}</p>
            </div>

            {/* Subviews Pill Switcher */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono text-subtle uppercase tracking-wider">Flow Sub-pages</span>
              <div className="flex flex-wrap gap-1.5">
                {data.subviews.map((sv, idx) => (
                  <button
                    key={sv}
                    type="button"
                    onClick={() => setActiveSubview(idx)}
                    className={cn(
                      "rounded-full px-2.5 py-1 text-[11px] font-medium transition-all",
                      activeSubview === idx
                        ? "bg-accent text-accent-foreground shadow-xs"
                        : "bg-surface-secondary text-muted hover:text-foreground"
                    )}
                  >
                    {sv}
                  </button>
                ))}
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-3 gap-3 border-t border-separator pt-4">
              {data.metrics.map((m) => (
                <div key={m.label}>
                  <span className="block text-[10px] text-subtle uppercase">{m.label}</span>
                  <span className="text-label-sm font-mono font-medium text-foreground mt-0.5 block">{m.val}</span>
                  {m.change && <span className="text-[10px] text-success font-mono">{m.change}</span>}
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Button
                size="md"
                variant="solid"
                tone="accent"
                onClick={() => navigate(data.templateHref)}
                endContent={<RiArrowRightLine size={16} />}
              >
                Inspect {data.title} Flow
              </Button>
            </div>
          </div>

          {/* Interactive Sector Mockup Visual */}
          <div className="lg:col-span-7">
            <div className="rounded-10 border border-border bg-surface-secondary p-4 shadow-inner">
              <div className="flex items-center justify-between border-b border-separator pb-2 mb-3 text-[11px] font-mono text-subtle">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-danger/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-warning/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-success/80" />
                  <span className="ml-2 font-mono text-foreground font-medium">{data.title.toLowerCase().replace(/[^a-z]/g, "-")}-app.tsx</span>
                </div>
                <span>View: {data.subviews[activeSubview]}</span>
              </div>

              {activeSector === "ai" && (
                <div className="space-y-3">
                  <div className="rounded-8 border border-border bg-surface p-3 text-paragraph-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-foreground">GPT-4o Stream</span>
                      <span className="font-mono text-success text-[10px]">128 tok/sec</span>
                    </div>
                    <p className="text-muted text-[11px] font-mono">
                      {`{"status": "streaming", "model": "unseen-neural-v2", "context_tokens": 1284, "temperature": 0.7}`}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-8 border border-border bg-surface p-2.5">
                      <span className="text-[10px] text-subtle block">Prompt Cost</span>
                      <span className="font-mono text-foreground font-medium text-label-xs">$0.0024 / call</span>
                    </div>
                    <div className="rounded-8 border border-border bg-surface p-2.5">
                      <span className="text-[10px] text-subtle block">Grounding Vector</span>
                      <span className="font-mono text-foreground font-medium text-label-xs">Cosine 0.984</span>
                    </div>
                  </div>
                </div>
              )}

              {activeSector === "hr" && (
                <div className="space-y-2">
                  {[
                    { name: "Sophia Martinez", role: "VP Engineering", loc: "San Francisco", status: "Active" },
                    { name: "David Kim", role: "Lead Systems Architect", loc: "Seoul", status: "On Leave" },
                    { name: "Elena Vance", role: "Design Technologist", loc: "Berlin", status: "Active" },
                  ].map((p) => (
                    <div key={p.name} className="flex items-center justify-between rounded-8 border border-border bg-surface p-2.5 text-paragraph-xs">
                      <div className="flex items-center gap-2">
                        <Avatar name={p.name} size="xs" tone="accent" />
                        <div>
                          <p className="font-medium text-foreground text-[11px]">{p.name}</p>
                          <p className="text-[10px] text-subtle">{p.role} • {p.loc}</p>
                        </div>
                      </div>
                      <Chip size="sm" tone={p.status === "Active" ? "success" : "warning"} variant="soft">
                        {p.status}
                      </Chip>
                    </div>
                  ))}
                </div>
              )}

              {activeSector === "finance" && (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between rounded-8 border border-border bg-surface p-3">
                    <div>
                      <span className="text-[10px] text-subtle block uppercase">Corporate Visa Platinum</span>
                      <span className="font-mono text-foreground font-medium text-label-xs">•••• 8492</span>
                    </div>
                    <Chip size="sm" tone="success" variant="soft">Virtual Active</Chip>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-8 border border-border bg-surface p-2.5">
                      <span className="text-[10px] text-subtle block">Daily Limit</span>
                      <span className="font-mono text-foreground font-medium text-label-xs">$25,000</span>
                    </div>
                    <div className="rounded-8 border border-border bg-surface p-2.5">
                      <span className="text-[10px] text-subtle block">30d Cashback</span>
                      <span className="font-mono text-success font-medium text-label-xs">+$482.10</span>
                    </div>
                  </div>
                </div>
              )}

              {activeSector === "marketing" && (
                <div className="space-y-2.5">
                  <div className="rounded-8 border border-border bg-surface p-3 space-y-2">
                    <div className="flex justify-between text-[11px]">
                      <span className="font-medium text-foreground">Google Ads Attribution</span>
                      <span className="text-success font-mono">+38.4% ROI</span>
                    </div>
                    <Progress value={78} size="sm" tone="accent" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-8 border border-border bg-surface p-2.5">
                      <span className="text-[10px] text-subtle block">Clicks</span>
                      <span className="font-mono text-foreground font-medium text-label-xs">142,800</span>
                    </div>
                    <div className="rounded-8 border border-border bg-surface p-2.5">
                      <span className="text-[10px] text-subtle block">Conversion Rate</span>
                      <span className="font-mono text-foreground font-medium text-label-xs">4.82%</span>
                    </div>
                  </div>
                </div>
              )}

              {activeSector === "crypto" && (
                <div className="space-y-2.5">
                  <div className="rounded-8 border border-border bg-surface p-3 space-y-2">
                    <div className="flex justify-between text-[11px]">
                      <span className="font-medium text-foreground">ETH / USDC Swap</span>
                      <span className="text-success font-mono">0.05% Slippage</span>
                    </div>
                    <div className="flex items-center justify-between font-mono text-[11px] text-foreground">
                      <span>1.500 ETH</span>
                      <span>=</span>
                      <span>$4,860.00 USDC</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-8 border border-border bg-surface p-2.5 text-[10px] text-subtle">
                    <span>Route: Uniswap v3 Pool</span>
                    <span className="text-success font-mono">Gas: $1.42 (12 Gwei)</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*              6. COMPONENTS & BLOCKS GALLERY CATALOG GRID                  */
/* -------------------------------------------------------------------------- */

const BLOCK_GALLERY_CATEGORIES = [
  { id: "auth", title: "Auth & Onboarding", count: "8 Blocks", icon: RiLockPasswordLine, sample: "Sign in with Google, 2FA OTP, Reset password" },
  { id: "command", title: "Command Menus", count: "3 Blocks", icon: RiCommandLine, sample: "Faceted search, quick shortcuts ⌘K, navigation" },
  { id: "chat", title: "Chat & Prompts", count: "6 Blocks", icon: RiChat1Line, sample: "Streaming chat message bubbles, AI prompt toolbar" },
  { id: "finance", title: "Finances & Billing", count: "7 Blocks", icon: RiBankCardLine, sample: "Interactive payment card, savings targets, invoices" },
  { id: "upload", title: "File Uploaders", count: "3 Blocks", icon: RiFolderUploadLine, sample: "Drag & drop dropzone, upload progress meters" },
  { id: "modal", title: "Modals & Overlays", count: "7 Blocks", icon: RiLayoutGridLine, sample: "12-position Popovers, Drawers, Alert dialogs" },
  { id: "profile", title: "Profile Cards", count: "4 Blocks", icon: RiUserLine, sample: "Follow/following state, avatar pile, user statistics" },
  { id: "table", title: "Tables & Data", count: "5 Blocks", icon: RiStackLine, sample: "Sorting data tables, pagination, bulk selection" },
  { id: "settings", title: "Settings & Toggles", count: "6 Blocks", icon: RiSettingsLine, sample: "Toggle groups, danger zones, API key generation" },
  { id: "feedback", title: "Feedback & Rating", count: "4 Blocks", icon: RiStarFill, sample: "Interactive star ratings, toasts, alert banners" },
];

function BlocksCatalogSection({ navigate }: { navigate: (to: string) => void }) {
  return (
    <section className="home-section home-container" aria-label="Components and Blocks Catalog">
      <div className="home-section-heading">
        <div>
          <span className="section-number">Components & Blocks</span>
          <h2>Elevate your design with premium composed blocks.</h2>
        </div>
        <div>
          <p>
            Over 40+ production-grade component compositions ready to drop into your codebase. Fully typed, zero magic, effortlessly customizable.
          </p>
          <a href="#/blocks" className="text-action">Browse all blocks <RiArrowRightLine size={16} /></a>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {BLOCK_GALLERY_CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          return (
            <a
              key={cat.id}
              href="#/blocks"
              onClick={(e) => {
                e.preventDefault();
                navigate("blocks");
              }}
              className="group flex flex-col justify-between rounded-10 border border-border bg-surface p-4 transition-all duration-[var(--duration-base)] hover:-translate-y-1 hover:border-accent hover:shadow-md text-left"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-8 bg-surface-secondary text-muted group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                    <Icon size={18} />
                  </div>
                  <span className="rounded-full bg-surface-secondary px-2 py-0.5 text-[10px] font-mono font-medium text-subtle group-hover:text-foreground">
                    {cat.count}
                  </span>
                </div>
                <h4 className="text-label-xs font-medium text-foreground group-hover:text-accent transition-colors">
                  {cat.title}
                </h4>
                <p className="mt-1 text-[11px] text-subtle leading-relaxed line-clamp-2">
                  {cat.sample}
                </p>
              </div>

              <div className="mt-4 flex items-center gap-1 text-[11px] font-medium text-accent">
                <span>View Blocks</span>
                <RiArrowRightLine size={12} className="transition-transform group-hover:translate-x-0.5" />
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*              7. CORE FEATURES GRID (ALIGNUI BENCHMARK)                     */
/* -------------------------------------------------------------------------- */

const CORE_FEATURES = [
  { title: "76+ Components", desc: "Versatile, accessible primitives engineered for rapid development.", icon: RiStackLine },
  { title: "Production Ready", desc: "Pre-optimized React 19 code for instant project deployment.", icon: RiShieldCheckLine },
  { title: "Figma Synced", desc: "Mathematical OKLCH token kit for seamless design-to-code alignment.", icon: RiPaletteLine },
  { title: "Customizable", desc: "Highly flexible token system for unique brand expression.", icon: RiEqualizerLine },
  { title: "Responsive", desc: "Adaptive layouts and fluid viewports tested from 320px to 4K.", icon: RiLayoutGridLine },
  { title: "Easy for Devs", desc: "Intuitive compound components with zero runtime lock-in.", icon: RiCodeSSlashLine },
  { title: "Dark Mode", desc: "Effortless token shifts with high sub-pixel contrast.", icon: RiMoonLine },
  { title: "TypeScript Strict", desc: "Strong typing with generic props for enhanced code maintainability.", icon: RiCommandLine },
  { title: "Accessible (WCAG)", desc: "WCAG-compliant keyboard traps and ARIA roles for inclusive access.", icon: RiCheckLine },
];

function CoreFeaturesSection() {
  return (
    <section className="home-section home-container" aria-label="Core Features">
      <div className="home-section-heading">
        <div>
          <span className="section-number">Core Features</span>
          <h2>What's inside Unseen?</h2>
        </div>
        <div>
          <p>76+ flexible primitives, 40+ composed blocks, and 5 sectoral templates built for high-craft digital products.</p>
          <a href="#/docs/installation" className="text-action">Start building for free <RiArrowRightLine size={16} /></a>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CORE_FEATURES.map((f) => {
          const Icon = f.icon;
          return (
            <div key={f.title} className="p-5 rounded-10 border border-border bg-surface text-left space-y-2 card-specular-glow">
              <div className="flex h-8 w-8 items-center justify-center rounded-8 bg-surface-secondary text-accent">
                <Icon size={18} />
              </div>
              <h4 className="text-label-sm font-medium text-foreground">{f.title}</h4>
              <p className="text-paragraph-xs text-muted leading-relaxed">{f.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                           COMPONENT DIRECTORY                              */
/* -------------------------------------------------------------------------- */

function HomeDirectory({ navigate }: { navigate: (to: string) => void }) {
  const [group, setGroup] = useState(COMPONENT_GROUPS[0].title);
  const active = COMPONENT_GROUPS.find((g) => g.title === group) ?? COMPONENT_GROUPS[0];
  const items = active.items.slice(0, 8);
  return (
    <section className="home-section home-container" aria-label="Component directory">
      <div className="home-section-heading">
        <div>
          <span className="section-number">Library, at real size</span>
          <h2>Every component.<br />A working preview.</h2>
        </div>
        <div>
          <p>No scaled-down screenshots. Each tile renders the actual component at native size — filter by category, then open a page for the API and editable examples.</p>
          <a href="#/components" className="text-action">Browse the full library <RiArrowRightLine size={16} /></a>
        </div>
      </div>
      <div className="directory-tabs" role="tablist" aria-label="Component categories">
        {COMPONENT_GROUPS.map((g) => (
          <button key={g.title} role="tab" aria-selected={group === g.title} onClick={() => setGroup(g.title)}>
            {g.title}
            <span>{g.items.length}</span>
          </button>
        ))}
      </div>
      <div className="directory-grid" role="tabpanel" aria-label={`${active.title} components`}>
        {items.map((it) => (
          <a key={it.href} href={`#/${it.href}`} onClick={(e) => { e.preventDefault(); navigate(it.href); }} className="directory-tile">
            <span className="directory-tile-stage" inert aria-hidden="true">{PREVIEWS[it.href]?.() ?? <span className="text-paragraph-xs text-subtle">Open the interactive example</span>}</span>
            <span className="directory-tile-label">{it.title}<RiArrowRightLine size={14} /></span>
          </a>
        ))}
      </div>
      <div className="directory-more">
        <Button size="sm" variant="outline" tone="default" endContent={<RiArrowRightLine />} onClick={() => navigate("components")}>See all {COMPONENT_COUNT} components</Button>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                               HOMEPAGE ROOT                                */
/* -------------------------------------------------------------------------- */

export default function Home({ navigate }: { navigate: (to: string) => void }) {
  const [heroVariant, setHeroVariant] = useState<"solid" | "fancy" | "soft" | "outline" | "ghost">("fancy");

  return (
    <main id="main" tabIndex={-1} className="home-page relative">
      {/* Ambient glow and subtle grid layers */}
      <div className="hero-ambient-mesh" aria-hidden="true" />
      <div className="subtle-grid-pattern absolute inset-0 h-[680px] pointer-events-none" aria-hidden="true" />

      {/* Blueprint Coordinate Header Strip */}
      <div className="w-full border-b border-border bg-surface-secondary/40 py-1 px-4 text-center">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-[9px] font-mono text-muted tracking-widest overflow-hidden select-none">
          <span>000</span>
          <span className="hidden sm:inline">050</span>
          <span>100</span>
          <span className="hidden sm:inline">150</span>
          <span>200</span>
          <span className="hidden sm:inline">250</span>
          <span>300</span>
          <span className="hidden sm:inline">350</span>
          <span>400</span>
          <span className="hidden sm:inline">450</span>
          <span>500</span>
          <span className="hidden sm:inline">550</span>
          <span>600</span>
          <span className="hidden sm:inline">650</span>
          <span>700</span>
          <span className="hidden sm:inline">750</span>
        </div>
      </div>

      <section className="home-hero page-enter relative z-10 max-w-5xl mx-auto pt-8">
        {/* Top Feature Announcement Pill with Social Proof Pile */}
        <div className="inline-flex items-center gap-3 rounded-full bg-surface/85 py-1.5 pl-2 pr-4 ring-1 ring-border shadow-xs backdrop-blur-md transition hover:ring-border-strong hover:scale-[1.01] mb-6">
          <AvatarGroupCompact
            items={[
              { name: "Sarah Jenkins" },
              { name: "Marcus Chen" },
              { name: "Elena Vance" },
            ]}
            size="xs"
          />
          <span className="text-paragraph-xs font-medium text-foreground">
            Trusted by 2,400+ designers & engineers
          </span>
          <span className="h-3 w-px bg-separator" />
          <span className="text-paragraph-xs font-medium text-accent hover:underline flex items-center">
            Built with Unseen PRO <RiArrowRightLine size={12} className="inline ml-0.5" />
          </span>
        </div>

        {/* Master headline */}
        <h1 className="tracking-tight text-title-h3 sm:text-title-h1 text-foreground font-medium max-w-4xl mx-auto leading-[1.06]">
          Design & Development <span className="text-muted/30 font-light">|</span> <span className="text-gradient">perfectly aligned</span>.
        </h1>
        <p className="mt-5 max-w-2xl mx-auto text-paragraph-md sm:text-paragraph-lg text-muted leading-relaxed">
          The accessible React 19 component library: one OKLCH token layer behind every component, block and template — shipped as source you own.
        </p>

        {/* Interactive hero component switcher */}
        <div className="mt-8 flex flex-col items-center gap-3">
          <div className="inline-flex items-center gap-1 rounded-14 border border-border bg-surface-secondary/70 p-1 backdrop-blur-sm shadow-xs">
            {(["fancy", "solid", "soft", "outline", "ghost"] as const).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setHeroVariant(v)}
                className={cn(
                  "rounded-10 px-3 py-1 text-[11px] font-medium transition-all capitalize",
                  heroVariant === v
                    ? "bg-surface text-foreground shadow-xs border border-border font-medium"
                    : "text-muted hover:text-foreground"
                )}
              >
                {v}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
            {heroVariant === "fancy" && (
              <FancyButton size="lg" tone="accent" onClick={() => navigate("components")}>
                Get Started — It's free <RiArrowRightLine size={18} />
              </FancyButton>
            )}
            {heroVariant === "solid" && (
              <Button size="lg" variant="solid" tone="accent" onClick={() => navigate("components")}>
                Solid Primary Button <RiArrowRightLine size={18} />
              </Button>
            )}
            {heroVariant === "soft" && (
              <Button size="lg" variant="soft" tone="accent" onClick={() => navigate("components")}>
                Soft Tinted Button <RiArrowRightLine size={18} />
              </Button>
            )}
            {heroVariant === "outline" && (
              <Button size="lg" variant="outline" tone="default" onClick={() => navigate("components")}>
                Stroke Bordered Button <RiArrowRightLine size={18} />
              </Button>
            )}
            {heroVariant === "ghost" && (
              <Button size="lg" variant="ghost" tone="default" onClick={() => navigate("components")}>
                Ghost Action Button <RiArrowRightLine size={18} />
              </Button>
            )}

            <Button size="lg" variant="outline" tone="default" onClick={() => navigate("blocks")}>
              Browse 40+ blocks
            </Button>
            <Button size="lg" variant="ghost" tone="default" onClick={() => navigate("templates")}>
              Sectoral templates
            </Button>
          </div>
        </div>

        {/* Four pillars */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-12 text-left">
          <div className="p-4 rounded-10 border border-border bg-surface/70 backdrop-blur-sm card-specular-glow">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-label-xs font-medium text-foreground">Base Components</span>
              <span className="px-1.5 py-0.2 rounded-full bg-success/15 text-success text-[9px] font-mono font-medium">FREE</span>
            </div>
            <p className="text-[11px] text-muted">76+ open-source components with zero bundle lock-in.</p>
          </div>

          <div className="p-4 rounded-10 border border-border bg-surface/70 backdrop-blur-sm card-specular-glow">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-label-xs font-medium text-foreground">Components & Blocks</span>
              <span className="px-1.5 py-0.2 rounded-full bg-accent/15 text-accent text-[9px] font-mono font-medium">PRO</span>
            </div>
            <p className="text-[11px] text-muted">40+ ready-made compositions for lightning speed.</p>
          </div>

          <div className="p-4 rounded-10 border border-border bg-surface/70 backdrop-blur-sm card-specular-glow">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-label-xs font-medium text-foreground">Sectoral Templates</span>
              <span className="px-1.5 py-0.2 rounded-full bg-accent/15 text-accent text-[9px] font-mono font-medium">PRO</span>
            </div>
            <p className="text-[11px] text-muted">Multi-page flows for AI, HR, Finance, Crypto.</p>
          </div>

          <div className="p-4 rounded-10 border border-border bg-surface/70 backdrop-blur-sm card-specular-glow">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-label-xs font-medium text-foreground">Token Aligned</span>
              <span className="px-1.5 py-0.2 rounded-full bg-accent/15 text-accent text-[9px] font-mono font-medium">PRO</span>
            </div>
            <p className="text-[11px] text-muted">Mathematical OKLCH ramps and fluid typography.</p>
          </div>
        </div>
      </section>

      {/* Live Multi-File React Playground / Studio */}
      <div className="home-container relative z-10 mt-8">
        <div className="hero-showcase page-enter">
          <HeroEditor />
        </div>
        <CoverageStrip />
      </div>

      {/* Live token customizer */}
      <TokenCustomizerSection />

      {/* Flagship interactive workspace showcase */}
      <div className="home-container relative z-10">
        <WorkspaceShowcase />
      </div>

      {/* Sector templates showcase */}
      <SectorTemplatesSection navigate={navigate} />

      {/* Composed blocks gallery */}
      <BlocksCatalogSection navigate={navigate} />

      {/* Core features */}
      <CoreFeaturesSection />

      {/* Full Component Library Directory */}
      <HomeDirectory navigate={navigate} />

      {/* Foundations Links */}
      <section className="home-section home-container">
        <div className="home-section-heading">
          <div>
            <span className="section-number">Foundations Architecture</span>
            <h2>Consistency starts below the surface.</h2>
          </div>
          <p>Intentional spacing. A useful radius scale. Color that follows your brand. The small decisions, made once.</p>
        </div>
        <div className="foundation-link-grid">
          <a href="#/foundations/spacing" className="foundation-link">
            <div className="foundation-link-art spacing-art" aria-hidden>
              {[8, 16, 24, 32, 48, 64].map((n) => <span key={n} style={{ height: n }} />)}
            </div>
            <h3>Spacing & layout <RiArrowRightLine size={16} /></h3>
            <p>A rhythm for your entire interface.</p>
          </a>
          <a href="#/foundations/elevation" className="foundation-link">
            <div className="foundation-link-art radius-art" aria-hidden>
              {[4, 12, 24].map((n) => <span key={n} style={{ borderRadius: n }} />)}
            </div>
            <h3>Radius & elevation <RiArrowRightLine size={16} /></h3>
            <p>Character without the visual noise.</p>
          </a>
          <a href="#/foundations/color" className="foundation-link">
            <div className="foundation-link-art color-art" aria-hidden>
              {[100, 200, 400, 600, 800].map((n) => <span key={n} style={{ background: `var(--accent-${n})` }} />)}
            </div>
            <h3>Color system <RiArrowRightLine size={16} /></h3>
            <p>Semantic by default. Yours by design.</p>
          </a>
        </div>
      </section>

      {/* Visual Language Primitives */}
      <section className="home-section home-container">
        <div className="home-section-heading">
          <div>
            <span className="section-number">Visual Vocabulary</span>
            <h2>The primitives. All in one place.</h2>
          </div>
          <p>Buttons, chips, badges, inputs, and the interactions that bind them. One visual vocabulary across every surface.</p>
        </div>
        <div className="visual-language-grid">
          <div className="visual-language-panel">
            <p className="visual-language-label">Actions</p>
            <div className="visual-language-items">
              <Button size="sm">Primary</Button>
              <Button size="sm" variant="soft">Soft</Button>
              <Button size="sm" variant="outline" tone="default">Stroke</Button>
              <Button size="sm" variant="ghost" tone="default">Ghost</Button>
              <Button size="sm" tone="danger">Danger</Button>
            </div>
          </div>
          <div className="visual-language-panel">
            <p className="visual-language-label">Status</p>
            <div className="visual-language-items">
              <Chip tone="success" variant="soft" dot>Active</Chip>
              <Chip tone="warning" variant="soft" dot>In review</Chip>
              <Chip variant="outline" dot>Draft</Chip>
              <Chip tone="danger" variant="soft">Overdue</Chip>
            </div>
          </div>
          <div className="visual-language-panel">
            <p className="visual-language-label">Inputs</p>
            <div className="visual-language-items" style={{ maxWidth: 200 }}>
              <Input size="sm" placeholder="Workspace name" wrapperClassName="w-full" />
              <div className="flex items-center gap-2">
                <Switch checked onChange={() => {}} size="sm" aria-label="Enable" />
                <span className="text-paragraph-xs text-muted">Enable</span>
              </div>
            </div>
          </div>
          <div className="visual-language-panel">
            <p className="visual-language-label">Data</p>
            <div className="visual-language-items" style={{ maxWidth: 200 }}>
              <User name="Alex Morgan" description="Product Design" avatarProps={{ tone: "accent", size: "sm" }} />
              <div className="flex items-center gap-2.5">
                <Avatar name="B" size="xs" tone="success" square />
                <span className="text-paragraph-xs text-subtle">Payment Card</span>
              </div>
            </div>
          </div>
          <div className="visual-language-panel">
            <p className="visual-language-label">Navigation</p>
            <div className="visual-language-items">
              <Tabs size="sm" variant="segment" value="tab1" onChange={noop} items={[{ key: "tab1", label: "Overview" }, { key: "tab2", label: "Activity" }]} />
              <Breadcrumbs items={[{ label: "Home", href: "#" }, { label: "Settings", href: "#" }, { label: "General" }]} />
            </div>
          </div>
          <div className="visual-language-panel">
            <p className="visual-language-label">Feedback</p>
            <div className="visual-language-items">
              <Progress value={64} size="sm" />
              <Snippet className="w-full py-1.5 text-paragraph-xs">npm install @remixicon/react clsx tailwind-merge</Snippet>
            </div>
          </div>
        </div>
        <div className="visual-language-footer">
          <p>{COMPONENT_COUNT} components, {BLOCKS.length} blocks, and product patterns — all sharing the same tokens.</p>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" tone="default" onClick={() => navigate("patterns")} endContent={<RiArrowRightLine />}>
              Product patterns
            </Button>
            <Button size="sm" variant="ghost" tone="default" onClick={() => navigate("components")}>
              All components
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="home-section home-faq-section">
        <div className="home-container home-faq-grid">
          <div>
            <span className="section-number">Frequently Asked Questions</span>
            <h2>Clear answers.<br />From code to license.</h2>
            <p>Everything you need to know about Unseen Design System architecture, tokens, and commercial rights.</p>
          </div>
          <div className="space-y-6">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-accent block mb-2">// Code & Architecture</span>
              <Accordion
                variant="flush"
                multiple
                items={[
                  { key: "tailwind", title: "Which version of Tailwind CSS is used?", content: "Unseen is built natively on Tailwind CSS v4, utilizing CSS-first @theme variable mappings for zero-runtime styling overhead." },
                  { key: "react", title: "Which version of React is supported?", content: "Built for React 19 and modern TypeScript. Compatible with Next.js App Router, Remix, Vite, Astro, and React Server Components." },
                  { key: "npm", title: "Does Unseen require an npm runtime dependency?", content: "No. Unseen follows a copy-paste first architecture (copy-paste first). You copy only the components you need with zero dependency bloat." },
                  { key: "unique", title: "What sets Unseen apart from other component kits?", content: "Mathematically balanced OKLCH color spaces, 12-cardinal popover placements, built-in design-lint test suites, and sub-pixel tactile specular shaders." },
                ]}
              />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-accent block mb-2">// Licensing & Usage</span>
              <Accordion
                variant="flush"
                multiple
                items={[
                  { key: "free", title: "Is everything really 100% free and open-source?", content: "Yes. All 76+ primitives, 40+ composed blocks, and 5 sectoral templates are completely unlocked under the permissive MIT license." },
                  { key: "commercial", title: "Can I use Unseen components in client and commercial SaaS projects?", content: "Yes. You have full rights to build and deploy commercial SaaS products, client projects, internal dashboards, and open-source tools without royalties." },
                ]}
              />
            </div>
          </div>
        </div>
      </section>
      <SiteFooter navigate={navigate} />
    </main>
  );
}

export { SiteFooter } from "../docs/Shell";
