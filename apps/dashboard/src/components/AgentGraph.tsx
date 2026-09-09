"use client";

import { useMemo } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  type Edge,
  type Node,
} from "reactflow";
import "reactflow/dist/style.css";
import { Plus } from "lucide-react";
import AgentNode, { type AgentNodeData } from "./AgentNode";
import type { Agent, Domain } from "@/lib/types";

const nodeTypes = { agent: AgentNode };

export default function AgentGraph({
  agents,
  selectedId,
  onSelect,
  onSimulate,
  onAddAgent,
  domainFilter,
}: {
  agents: Agent[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onSimulate: (id: string) => void;
  onAddAgent: () => void;
  domainFilter: Domain | "all";
}) {
  const visible = useMemo(
    () =>
      domainFilter === "all"
        ? agents
        : agents.filter((a) => a.domain === domainFilter),
    [agents, domainFilter]
  );

  const nodes: Node<AgentNodeData>[] = useMemo(() => {
    const companyAgents = visible.filter((a) => a.domain === "company");
    const personalAgents = visible.filter((a) => a.domain === "personal");

    const laid: Node<AgentNodeData>[] = [
      ...companyAgents.map((agent, i) => ({
        id: agent.id,
        type: "agent",
        position: { x: 40, y: 40 + i * 170 },
        data: { agent, onSimulate, onSelect, selected: agent.id === selectedId },
        draggable: true,
      })),
      ...personalAgents.map((agent, i) => ({
        id: agent.id,
        type: "agent",
        position: { x: 420, y: 40 + i * 170 },
        data: { agent, onSimulate, onSelect, selected: agent.id === selectedId },
        draggable: true,
      })),
    ];
    return laid;
  }, [visible, selectedId, onSimulate, onSelect]);

  const edges: Edge[] = useMemo(() => {
    // 中控核心 -> 各代理，用來表達「同一套系統」但資料域各自獨立
    return visible.map((a) => ({
      id: `core-${a.id}`,
      source: "core",
      target: a.id,
      animated: a.status === "processing",
      style: {
        stroke: a.domain === "company" ? "#22e5ff55" : "#d946ef55",
      },
    }));
  }, [visible]);

  const coreNode: Node = {
    id: "core",
    position: { x: -220, y: 140 },
    data: { label: "核心" },
    type: "input",
    style: {
      background: "radial-gradient(circle, #0d1420, #05070d)",
      border: "1px solid rgba(34,229,255,0.4)",
      color: "#22e5ff",
      borderRadius: 999,
      width: 90,
      height: 90,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 11,
      letterSpacing: "0.1em",
      boxShadow: "0 0 30px rgba(34,229,255,0.25)",
    },
  };

  return (
    <div className="relative h-full w-full">
      <ReactFlow
        nodes={[coreNode, ...nodes]}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        proOptions={{ hideAttribution: true }}
        minZoom={0.4}
      >
        <Background
          color="#22e5ff"
          gap={28}
          size={1}
          variant={BackgroundVariant.Dots}
          style={{ opacity: 0.15 }}
        />
        <Controls showInteractive={false} />
      </ReactFlow>

      <button
        onClick={onAddAgent}
        className="absolute bottom-4 right-4 flex items-center gap-2 rounded-lg hud-panel border-glow-cyan px-3 py-2 text-xs text-cyan-300 hover:bg-cyan-400/10"
      >
        <Plus size={14} />
        新增／串接代理
      </button>
    </div>
  );
}
