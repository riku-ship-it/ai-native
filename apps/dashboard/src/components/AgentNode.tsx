"use client";

import { Handle, Position, type NodeProps } from "reactflow";
import * as Icons from "lucide-react";
import { Zap } from "lucide-react";
import { statusMeta, domainMeta } from "@/lib/meta";
import type { Agent } from "@/lib/types";

export interface AgentNodeData {
  agent: Agent;
  onSimulate: (id: string) => void;
  onSelect: (id: string) => void;
  selected: boolean;
}

export default function AgentNode({ data }: NodeProps<AgentNodeData>) {
  const { agent, onSimulate, onSelect, selected } = data;
  const sMeta = statusMeta[agent.status];
  const dMeta = domainMeta[agent.domain];
  const IconComp =
    (Icons as unknown as Record<string, Icons.LucideIcon>)[agent.icon] ??
    Icons.Bot;

  return (
    <div
      onClick={() => onSelect(agent.id)}
      className={`w-64 cursor-pointer rounded-xl hud-panel px-4 py-3 transition-all ${
        selected ? dMeta.borderClass : ""
      } ${agent.status === "disabled" ? "opacity-60" : ""}`}
      style={{ borderColor: selected ? dMeta.accent : undefined }}
    >
      <Handle type="target" position={Position.Left} className="!bg-cyan-400/40 !border-0" />
      <Handle type="source" position={Position.Right} className="!bg-cyan-400/40 !border-0" />

      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-lg"
            style={{ background: `${dMeta.accent}1a`, color: dMeta.accent }}
          >
            <IconComp size={18} />
          </div>
          <div>
            <div className="text-sm font-semibold text-[var(--text-primary)]">
              {agent.name}
            </div>
            <div className="text-[10px] uppercase tracking-wider text-[var(--text-dim)]">
              {agent.subtitle}
            </div>
          </div>
        </div>
        <span
          className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${dMeta.softBg}`}
          style={{ color: dMeta.accent }}
        >
          {dMeta.label}
        </span>
      </div>

      <div className="mt-3 flex items-center gap-1.5">
        <span
          className={`h-2 w-2 rounded-full ${sMeta.dotClass} ${
            sMeta.pulse ? "status-pulse" : ""
          }`}
        />
        <span className="text-xs" style={{ color: sMeta.color }}>
          {sMeta.label}
        </span>
      </div>

      <p className="mt-1.5 line-clamp-2 text-xs text-[var(--text-dim)]">
        {agent.currentTask}
      </p>

      <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-2">
        <span className="font-mono text-[10px] text-[var(--text-dim)]">
          今日 {agent.stats.processedToday} 件
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSimulate(agent.id);
          }}
          className="flex items-center gap-1 rounded-md border border-white/10 px-2 py-1 text-[10px] text-[var(--text-dim)] hover:border-cyan-400/40 hover:text-cyan-300"
        >
          <Zap size={11} />
          模擬觸發
        </button>
      </div>
    </div>
  );
}
