# Supabase 資料庫規劃（尚未串接真實專案）

未來要建立的資料表（對應儀表板六大區塊）：

- `agent_status`：代理狀態（名稱、domain、狀態、目前任務）
- `approval_queue`：待核准佇列
- `activity_log`：處理記錄／歷史記錄
- `config`：規則／名單設定（如重要聊天室名單）

目前儀表板全部使用 `apps/dashboard/src/lib/mock-data.ts` 的假資料，等視覺化確認沒問題、
且完成 Supabase 專案建立教學（步驟 3）後，再實際建表並串接 Realtime。
