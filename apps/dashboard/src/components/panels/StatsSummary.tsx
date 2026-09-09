"use client";

import type { StatCard } from "@/lib/types";
import { domainMeta } from "@/lib/meta";

export default function StatsSummary({ stats }: { stats: StatCard[] }) {
  return (
    <div className="hud-panel p-4">
      <h3 className="hud-panel-title">統計摘要</h3>
      <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
        {stats.map((s) => {
          const accent =
            s.domain && s.domain !== "all" ? domainMeta[s.domain].accent : "#22e5ff";
          return (
            <div
              key={s.label}
              className="rounded-lg border border-white/5 bg-black/20 p-2.5 text-center"
            >
              <div
                className="font-mono text-lg font-semibold"
                style={{ color: accent }}
              >
                {s.value}
                {s.unit && (
                  <span className="ml-0.5 text-xs text-[var(--text-dim)]">
                    {s.unit}
                  </span>
                )}
              </div>
              <div className="mt-1 text-[10px] text-[var(--text-dim)]">{s.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
