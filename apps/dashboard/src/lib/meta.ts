import type { AgentStatus, Domain, Severity } from "./types";

export const statusMeta: Record<
  AgentStatus,
  { label: string; color: string; dotClass: string; pulse: boolean }
> = {
  idle: { label: "閒置", color: "#6b8299", dotClass: "bg-[#6b8299]", pulse: false },
  processing: {
    label: "處理中",
    color: "#22e5ff",
    dotClass: "bg-[#22e5ff]",
    pulse: true,
  },
  error: { label: "異常", color: "#ff4d5e", dotClass: "bg-[#ff4d5e]", pulse: true },
  awaiting_approval: {
    label: "待核准",
    color: "#ffb020",
    dotClass: "bg-[#ffb020]",
    pulse: true,
  },
  disabled: {
    label: "未啟用",
    color: "#3a4a5c",
    dotClass: "bg-[#3a4a5c]",
    pulse: false,
  },
};

export const domainMeta: Record<
  Domain,
  { label: string; accent: string; borderClass: string; textClass: string; softBg: string }
> = {
  company: {
    label: "公司範疇",
    accent: "#22e5ff",
    borderClass: "border-glow-cyan",
    textClass: "glow-cyan",
    softBg: "bg-[#22e5ff]/10",
  },
  personal: {
    label: "個人範疇",
    accent: "#d946ef",
    borderClass: "border-glow-magenta",
    textClass: "glow-magenta",
    softBg: "bg-[#d946ef]/10",
  },
};

export const severityMeta: Record<
  Severity,
  { color: string; label: string }
> = {
  info: { color: "#6b8299", label: "資訊" },
  success: { color: "#35e29a", label: "成功" },
  warning: { color: "#ffb020", label: "注意" },
  error: { color: "#ff4d5e", label: "異常" },
};
