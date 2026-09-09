"use client";

import { Radar } from "lucide-react";
import type { Domain } from "@/lib/types";

export default function TopBar({
  domainFilter,
  onDomainFilter,
  mockMode,
}: {
  domainFilter: Domain | "all";
  onDomainFilter: (d: Domain | "all") => void;
  mockMode: boolean;
}) {
  const now = new Date().toLocaleString("zh-TW", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <header className="relative z-10 flex items-center justify-between border-b border-white/5 px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-400/30 bg-cyan-400/10">
          <Radar size={18} className="text-cyan-300" />
        </div>
        <div>
          <h1 className="text-sm font-semibold tracking-wide glow-cyan">
            AI 原生分身系統
          </h1>
          <p className="text-[10px] text-[var(--text-dim)]">
            多代理人狀態控制台 · {now}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {mockMode && (
          <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-1 text-[10px] text-amber-300">
            模擬資料模式 · Claude API 尚未啟用
          </span>
        )}
        <div className="flex overflow-hidden rounded-lg border border-white/10">
          {(
            [
              { key: "all", label: "全部" },
              { key: "company", label: "公司範疇" },
              { key: "personal", label: "個人範疇" },
            ] as { key: Domain | "all"; label: string }[]
          ).map((opt) => (
            <button
              key={opt.key}
              onClick={() => onDomainFilter(opt.key)}
              className={`px-3 py-1.5 text-xs transition-colors ${
                domainFilter === opt.key
                  ? "bg-cyan-400/15 text-cyan-300"
                  : "text-[var(--text-dim)] hover:bg-white/5"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
