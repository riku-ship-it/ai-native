"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { classifyMessage, AI_CONFIG, type ClassifyResult } from "@/lib/ai-client";

export default function ClassifierTester() {
  const [subject, setSubject] = useState("Vercel Pro Plan 續約通知");
  const [content, setContent] = useState(
    "Your invoice for Vercel Pro Plan is ready. Amount: $20.00"
  );
  const [result, setResult] = useState<ClassifyResult | null>(null);
  const [loading, setLoading] = useState(false);

  const run = async () => {
    setLoading(true);
    const r = await classifyMessage({ subject, content, source: "gmail" });
    setResult(r);
    setLoading(false);
  };

  return (
    <div className="hud-panel p-4">
      <div className="flex items-center justify-between">
        <h3 className="hud-panel-title">分類邏輯測試（串接點示範）</h3>
        <span className="font-mono text-[9px] text-[var(--text-dim)]">
          model: {AI_CONFIG.model} · cache: {AI_CONFIG.promptCaching ? "on" : "off"}
        </span>
      </div>
      <p className="mt-1 text-[10px] text-[var(--text-dim)]">
        目前用假邏輯示範分類流程，之後切換 USE_MOCK_AI 即可換成真正的 Claude API 呼叫。
      </p>

      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="信件主旨"
          className="rounded-md border border-white/10 bg-black/30 px-2.5 py-1.5 text-xs outline-none focus:border-cyan-400/50"
        />
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="內容片段"
          className="rounded-md border border-white/10 bg-black/30 px-2.5 py-1.5 text-xs outline-none focus:border-cyan-400/50"
        />
      </div>

      <button
        onClick={run}
        disabled={loading}
        className="mt-3 flex items-center gap-1.5 rounded-md border border-cyan-400/30 bg-cyan-400/10 px-3 py-1.5 text-xs text-cyan-300 hover:bg-cyan-400/20 disabled:opacity-50"
      >
        <Sparkles size={12} />
        {loading ? "分類中…" : "執行分類"}
      </button>

      {result && (
        <div className="mt-3 rounded-lg border border-white/10 bg-black/20 p-3 text-xs">
          <div className="flex flex-wrap gap-3">
            <span className="text-[var(--text-dim)]">
              分類：<span className="text-[var(--text-primary)]">{result.category}</span>
            </span>
            <span className="text-[var(--text-dim)]">
              動作：<span className="text-cyan-300">{result.action}</span>
            </span>
            <span className="text-[var(--text-dim)]">
              需人工核准：{result.needsApproval ? "是" : "否"}
            </span>
          </div>
          <p className="mt-1.5 text-[var(--text-dim)]">{result.summary}</p>
        </div>
      )}
    </div>
  );
}
