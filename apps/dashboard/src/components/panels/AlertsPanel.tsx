"use client";

import { AlertTriangle } from "lucide-react";
import type { AlertItem } from "@/lib/types";
import { domainMeta } from "@/lib/meta";

export default function AlertsPanel({ alerts }: { alerts: AlertItem[] }) {
  if (alerts.length === 0) {
    return (
      <div className="hud-panel p-4">
        <h3 className="hud-panel-title">異常提示</h3>
        <p className="mt-3 text-xs text-[var(--text-dim)]">目前沒有異常</p>
      </div>
    );
  }

  return (
    <div className="hud-panel border-glow-cyan p-4" style={{ borderColor: "rgba(255,77,94,0.4)" }}>
      <h3 className="hud-panel-title">異常提示</h3>
      <div className="mt-3 space-y-2">
        {alerts.map((a) => {
          const dMeta = domainMeta[a.domain];
          return (
            <div
              key={a.id}
              className="flex items-start gap-2 rounded-lg border border-red-400/20 bg-red-500/5 p-2.5"
            >
              <AlertTriangle size={14} className="mt-0.5 shrink-0 text-red-400" />
              <div className="min-w-0 flex-1">
                <p className="text-xs text-red-200">{a.message}</p>
                <div className="mt-1 flex items-center gap-2">
                  <span
                    className="rounded px-1.5 py-0.5 text-[9px]"
                    style={{ color: dMeta.accent, background: `${dMeta.accent}1a` }}
                  >
                    {dMeta.label}
                  </span>
                  <span className="font-mono text-[10px] text-[var(--text-dim)]">
                    {a.timestamp}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
