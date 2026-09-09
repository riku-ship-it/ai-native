# 溝通分身 Agent（Comm Agent）

目前狀態：分類規則 v1 已定案，尚未接上真正的 Gmail / Google Chat API 與 Claude API。

分類規則、system prompt 草稿等內容目前存放在 Riku 的個人筆記中；等技術串接階段（步驟 3-4）開始時，
會把 system prompt、規則設定檔實際放進這個資料夾（例如 `system-prompt.md`、`rules.json`）。

對應的假資料 / UI 展示邏輯目前在 `apps/dashboard/src/lib/mock-data.ts` 與 `apps/dashboard/src/lib/ai-client.ts`。
