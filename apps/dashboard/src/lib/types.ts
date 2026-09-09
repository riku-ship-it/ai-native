// 共用型別定義
// 這裡的「domain」欄位是整個系統的核心分界：
// company = 工作／公司範疇（溝通Agent、財務Agent…）
// personal = 個人範疇（股票自動交易 Agent…）
// 之後不管是資料庫 schema 或 UI 顯示，都必須沿用同一套 domain 分類，不能混用。

export type Domain = "company" | "personal";

export type AgentStatus =
  | "idle" // 閒置
  | "processing" // 處理中
  | "error" // 異常
  | "awaiting_approval" // 等待人工核准
  | "disabled"; // 尚未啟用／規劃中

export interface AgentStats {
  processedToday: number;
  approvalRate: number; // 0-100
  avgResponseSec: number;
}

export interface Agent {
  id: string;
  name: string;
  subtitle: string;
  domain: Domain;
  status: AgentStatus;
  currentTask: string;
  description: string;
  icon: string; // lucide-react icon name
  stats: AgentStats;
  lastActive: string;
  connectedSince?: string;
}

export type Severity = "info" | "warning" | "error" | "success";

export interface ApprovalItem {
  id: string;
  agentId: string;
  title: string;
  summary: string;
  domain: Domain;
  createdAt: string;
  severity: "normal" | "warning";
}

export interface ActivityLogEntry {
  id: string;
  agentId: string;
  action: string;
  detail: string;
  domain: Domain;
  timestamp: string;
  level: Severity;
}

export interface AlertItem {
  id: string;
  agentId: string;
  message: string;
  domain: Domain;
  severity: "error" | "warning";
  timestamp: string;
}

export interface ChatRoomRule {
  id: string;
  name: string;
  important: boolean;
}

export interface StatCard {
  label: string;
  value: string;
  unit?: string;
  hint?: string;
  domain?: Domain | "all";
}
