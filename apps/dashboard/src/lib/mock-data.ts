import type {
  Agent,
  ApprovalItem,
  ActivityLogEntry,
  AlertItem,
  ChatRoomRule,
  StatCard,
} from "./types";

// ⚠ 全部都是假資料，只是為了讓畫面「動起來」。
// 之後接上 Supabase 之後，這個檔案可以整個換成從資料庫抓資料的 hook。

export const initialAgents: Agent[] = [
  {
    id: "comm-agent",
    name: "溝通分身",
    subtitle: "Comm Agent",
    domain: "company",
    status: "processing",
    currentTask: "正在分類 Gmail 收件匣（12 封待處理）",
    description:
      "處理 Gmail 信件與 Google Chat 訊息的分類、摘要與已讀/加星判斷，非中文內容會先翻譯成繁體中文再分類。",
    icon: "MailCheck",
    stats: { processedToday: 84, approvalRate: 96, avgResponseSec: 2.4 },
    lastActive: "剛剛",
    connectedSince: "2026-08",
  },
  {
    id: "finance-agent",
    name: "財務 Agent",
    subtitle: "Finance Agent",
    domain: "company",
    status: "idle",
    currentTask: "等待與 bci-finance 資金分配系統串接",
    description:
      "未來對應公司 bci-finance 專案，處理資金分配相關的判斷與異常提示。",
    icon: "Landmark",
    stats: { processedToday: 0, approvalRate: 0, avgResponseSec: 0 },
    lastActive: "尚未啟用",
  },
  {
    id: "stock-agent",
    name: "個人股票代理",
    subtitle: "Stock Agent",
    domain: "personal",
    status: "disabled",
    currentTask: "規劃中，尚未開發",
    description:
      "未來的個人股票自動交易代理，屬於「個人」範疇，資料與邏輯會與公司範疇的 Agent 完全分開。",
    icon: "TrendingUp",
    stats: { processedToday: 0, approvalRate: 0, avgResponseSec: 0 },
    lastActive: "—",
  },
];

export const initialApprovalQueue: ApprovalItem[] = [
  {
    id: "ap-1",
    agentId: "comm-agent",
    title: "GitHub 新增 Personal Access Token",
    summary: "偵測到帳號權限變更通知，需要你確認是否為本人操作。",
    domain: "company",
    createdAt: "10 分鐘前",
    severity: "warning",
  },
  {
    id: "ap-2",
    agentId: "comm-agent",
    title: "Vercel Pro Plan 續約發票",
    summary: "訂閱發票類別，已加星並列入待辦，等待你確認金額無誤。",
    domain: "company",
    createdAt: "42 分鐘前",
    severity: "normal",
  },
  {
    id: "ap-3",
    agentId: "comm-agent",
    title: "Supabase 專案角色權限異動",
    summary: "開發工具通知涉及專案權限變更，已標記為需要手動閱讀。",
    domain: "company",
    createdAt: "1 小時前",
    severity: "warning",
  },
];

export const initialActivityLog: ActivityLogEntry[] = [
  {
    id: "log-1",
    agentId: "comm-agent",
    action: "分類完成",
    detail: "廣告信件 6 封 → 標記已讀略過",
    domain: "company",
    timestamp: "13:52",
    level: "info",
  },
  {
    id: "log-2",
    agentId: "comm-agent",
    action: "翻譯＋分類",
    detail: "1 封英文開發工具通知 → 已翻譯並摘要",
    domain: "company",
    timestamp: "13:47",
    level: "info",
  },
  {
    id: "log-3",
    agentId: "comm-agent",
    action: "即時訊息提醒",
    detail: "1 對 1 訊息 3 小時未回，已提醒",
    domain: "company",
    timestamp: "13:20",
    level: "warning",
  },
  {
    id: "log-4",
    agentId: "comm-agent",
    action: "重要聊天室訊息",
    detail: "D3XD7 財務自動化討論 有新訊息",
    domain: "company",
    timestamp: "12:58",
    level: "success",
  },
  {
    id: "log-5",
    agentId: "finance-agent",
    action: "等待啟用",
    detail: "尚未與 bci-finance 系統串接",
    domain: "company",
    timestamp: "09:00",
    level: "info",
  },
];

export const initialAlerts: AlertItem[] = [
  {
    id: "alert-1",
    agentId: "comm-agent",
    message: "帳號安全通知出現異常登入位置，已跳過自動略過規則",
    domain: "company",
    severity: "error",
    timestamp: "08:14",
  },
];

export const initialChatRoomRules: ChatRoomRule[] = [
  { id: "room-1", name: "D3XD7 財務自動化討論", important: true },
  { id: "room-2", name: "BBP 平台對接群組", important: false },
  { id: "room-3", name: "團隊日常閒聊", important: false },
];

export const statCards: StatCard[] = [
  { label: "今日總處理量", value: "84", unit: "件", domain: "all" },
  { label: "核准率", value: "96", unit: "%", domain: "company" },
  { label: "平均回應時間", value: "2.4", unit: "秒", domain: "company" },
  { label: "待核准佇列", value: "3", unit: "件", domain: "all" },
  { label: "啟用中代理", value: "1", unit: "/ 3", domain: "all" },
  { label: "個人代理進度", value: "規劃中", domain: "personal" },
];
