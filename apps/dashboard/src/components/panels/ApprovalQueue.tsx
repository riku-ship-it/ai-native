"use client";

import { Check, X, ShieldAlert } from "lucide-react";
import type { ApprovalItem } from "@/lib/types";
import { domainMeta } from "@/lib/meta";

export default function ApprovalQueue({
  items,
  onResolve,
}: {
  items: ApprovalItem[];
  onResolve: (id: string, approved: boolean) => void;
}) {
  return (
    <div className="hud-panel flex h-full flex-col p-4">
      <div className="flex items-center justify-between">
        <h3 className="hud-panel-title">待核准佇列</h3>
        <span className="rounded-full bg-amber-400/10 px-2 py-0.5 text-[10px] font-mono text-amber-300">
          {items.length}
        </span>
      </div>

      <div className="mt-3 flex-1 space-y-2 overflow-y-auto pr-1">
        {items.length === 0 && (
          <p className="mt-6 text-center text-xs text-[var(--text-dim)]">
            目前沒有需要人工核准的項目
          </p>
        )}
        {items.map((item) => {
          const dMeta = domainMeta[item.domain];
          return (
            <div
              key={item.id}
              className="rounded-lg border border-white/5 bg-black/20 p-2.5"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  {item.severity === "warning" && (
                    <ShieldAlert size={13} className="text-amber-400 shrink-0" />
                  )}
                  <span className="text-xs font-medium text-[var(--text-primary)]">
                    {item.title}
                  </span>
                </div>
                <span
                  className="shrink-0 rounded px-1.5 py-0.5 text-[9px]"
                  style={{ color: dMeta.accent, background: `${dMeta.accent}1a` }}
                >
                  {dMeta.label}
                </span>
              </div>
              <p className="mt-1 text-[11px] leading-relaxed text-[var(--text-dim)]">
                {item.summary}
              </p>
              <div className="mt-2 flex items-center justify-between">
                <span className="font-mono text-[10px] text-[var(--text-dim)]">
                  {item.createdAt}
                </span>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => onResolve(item.id, true)}
                    className="flex items-center gap-1 rounded-md border border-emerald-400/30 px-2 py-1 text-[10px] text-emerald-300 hover:bg-emerald-400/10"
                  >
                    <Check size={11} /> 核准
                  </button>
                  <button
                    onClick={() => onResolve(item.id, false)}
                    className="flex items-center gap-1 rounded-md border border-red-400/30 px-2 py-1 text-[10px] text-red-300 hover:bg-red-400/10"
                  >
                    <X size={11} /> 駁回
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
