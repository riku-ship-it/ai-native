/**
 * ============================================================
 *  Claude API 串接位置（目前階段：全部使用假邏輯，不會產生費用）
 * ============================================================
 *
 * 這支檔案是整個系統中，「真正呼叫 AI 判斷」唯一的入口點。
 * 現階段 USE_MOCK_AI = true，所有呼叫都會走 mockClassify()，
 * 回傳固定/隨機的假結果，純粹用來讓儀表板「動起來」測試視覺效果。
 *
 * 之後要正式串接 Claude API 時：
 *   1. 把下面的 USE_MOCK_AI 改成 false
 *   2. 在 callClaudeApi() 內實作真正的呼叫
 *      - 建議模型：claude-haiku-4-5（成本最低，足夠應付分類任務）
 *      - 建議開啟 prompt caching，把固定的分類規則 system prompt 快取起來
 *      - API Key 建議放在 Vercel 環境變數，不要寫死在程式碼裡
 *   3. 不需要更動任何呼叫這支檔案的元件，介面（ClassifyInput / ClassifyResult）維持不變即可
 */

export const USE_MOCK_AI = true;

export const AI_CONFIG = {
  model: "claude-haiku-4-5",
  promptCaching: true,
} as const;

export interface ClassifyInput {
  subject: string;
  content: string;
  source: "gmail" | "chat";
}

export interface ClassifyResult {
  category: string;
  action: "略過" | "已讀+加星+列待辦" | "通知摘要" | "⚠ 需要手動讀取";
  needsApproval: boolean;
  summary: string;
}

export async function classifyMessage(
  input: ClassifyInput
): Promise<ClassifyResult> {
  if (USE_MOCK_AI) {
    return mockClassify(input);
  }
  return callClaudeApi(input);
}

// ---- 假邏輯（現階段使用） ----
function mockClassify(input: ClassifyInput): ClassifyResult {
  const text = `${input.subject} ${input.content}`.toLowerCase();

  if (/廣告|優惠|促銷|sale|discount/.test(text)) {
    return {
      category: "廣告／宣傳",
      action: "略過",
      needsApproval: false,
      summary: "偵測到宣傳性內容，已標記已讀略過。",
    };
  }
  if (/發票|invoice|訂閱|receipt/.test(text)) {
    return {
      category: "訂閱發票",
      action: "已讀+加星+列待辦",
      needsApproval: true,
      summary: "偵測到訂閱／發票類信件，已加星並列入待辦。",
    };
  }
  if (/token|pat|權限|permission|vercel|supabase|github/.test(text)) {
    return {
      category: "開發工具通知",
      action: "⚠ 需要手動讀取",
      needsApproval: true,
      summary: "涉及帳號權限變更，已標記需要手動閱讀。",
    };
  }
  return {
    category: "一般通知",
    action: "通知摘要",
    needsApproval: false,
    summary: "已產生摘要，不需要進一步動作。",
  };
}

// ---- 真正的 Claude API 呼叫（尚未實作） ----
async function callClaudeApi(_input: ClassifyInput): Promise<ClassifyResult> {
  throw new Error(
    "尚未串接 Claude API：請在 src/lib/ai-client.ts 的 callClaudeApi() 實作真正的呼叫（建議 model: claude-haiku-4-5 + prompt caching）"
  );
}
