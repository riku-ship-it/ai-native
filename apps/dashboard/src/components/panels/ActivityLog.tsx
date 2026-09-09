"use client";

import type { ActivityLogEntry } from "@/lib/types";
import { severityMeta, domainMeta } from "@/lib/meta";

export default function ActivityLog({ entries }: { entries: ActivityLogEntry[] }) {
  return (
    <div className="hud-panel flex h-full flex-col p-4">
      <h3 className="hud-panel-title">處理記錄</h3>
      <div className="mt-3 flex-1 space-y-0 overflow-y-auto pr-1">
        {entries.map((e, i) => {
          const sMeta = severityMeta[e.level];
          const dMeta = domainMeta[e.domain];
          return (
            <div
              key={e.id}
              className={`flex items-start gap-3 py-2 ${
                i !== entries.length - 1 ? "border-b border-white/5" : ""
              }`}
            >
              <span className="mt-1 font-mono text-[10px] text-[var(--text-dim)] shrink-0 w-10">
                {e.timestamp}
              </span>
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: sMeta.color }}
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-medium text-[var(--text-primary)]">
                    {e.action}
                  </span>
                  <span
                    className="rounded px-1 py-0 text-[9px]"
                    style={{ color: dMeta.accent, background: `${dMeta.accent}1a` }}
                  >
                    {dMeta.label}
                  </span>
                </div>
                <p className="text-[11px] text-[var(--text-dim)]">{e.detail}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
