# ai-native-agent-hub

Riku 的個人 AI 原生分身系統 — 多代理人管理平台。

## 專案結構

- `apps/dashboard/` — Next.js 前端，視覺化多代理人狀態儀表板（Jarvis 風格 HUD）
- `agents/` — 各個 Agent 的規則、system prompt（comm-agent / finance-agent / stock-agent）
- `supabase/` — 資料庫 schema 規劃（尚未串接真實 Supabase 專案）
- `docs/` — 規格文件與完整情境說明

## 目前進度

- [x] 步驟 1：本地專案資料夾結構
- [x] 步驟 2：Jarvis 風格儀表板（假資料，可手動模擬狀態變化）
- [ ] 步驟 3：GitHub / Vercel / Supabase 串接教學
- [ ] 步驟 4：真正串接 Claude API（Haiku 4.5 + prompt caching）

詳見 `docs/AI原生分身系統_完整情境_複製至Cowork.md`。

## 本機開發

```bash
cd apps/dashboard
npm install
npm run dev
```
