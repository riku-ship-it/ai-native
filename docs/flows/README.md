# 流程圖（Mermaid）

這個資料夾的流程圖都用 [Mermaid](https://mermaid.js.org/) 寫成文字，跟程式碼一起用 git 管理。

## 看圖

- **VS Code**：安裝推薦擴充套件 *Markdown Preview Mermaid Support*（開專案時右下角會提示），打開 `.md` 後按 `Cmd+Shift+V`
- **GitHub**：推上去後直接在網頁點開 `.md`，會自動渲染成圖

## 用 AI 新增或修改

直接跟 Claude Code 說，指定檔案即可，例如：

> 在 `docs/flows/comm-agent-classify.md` 加一個「客戶來信 → 標記重要並通知」的分支

> 幫我在 `docs/flows/` 新增一張圖，畫出儀表板的「新增代理」流程（參考 `apps/dashboard/src/components/AddAgentModal.tsx`）

## 協作流程

1. `git pull` 取得最新版
2. 用 AI 修改（或手動改）
3. `git diff` 確認改了哪些節點
4. commit + push（或開 PR 讓對方看過）

## 規範

- 一張圖一個 `.md` 檔，檔名用英文 kebab-case
- 檔案開頭寫一行「來源」，說明這張圖根據哪份文件或哪段程式碼
- 需要精美排版的正式圖，可以到 draw.io「排列 → 插入 → 進階 → Mermaid」貼上後再手動美化
