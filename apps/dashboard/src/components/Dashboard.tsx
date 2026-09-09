"use client";

import { useState, useCallback } from "react";
import {
  initialAgents,
  initialApprovalQueue,
  initialActivityLog,
  initialAlerts,
  initialChatRoomRules,
  statCards,
} from "@/lib/mock-data";
import type { Agent, AgentStatus, ApprovalItem, Domain } from "@/lib/types";
import TopBar from "./TopBar";
import AgentGraph from "./AgentGraph";
import ApprovalQueue from "./panels/ApprovalQueue";
import AlertsPanel from "./panels/AlertsPanel";
import ActivityLog from "./panels/ActivityLog";
import StatsSummary from "./panels/StatsSummary";
import RulesEditor from "./panels/RulesEditor";
import AddAgentModal from "./AddAgentModal";
import ClassifierTester from "./ClassifierTester";
import { domainMeta, statusMeta } from "@/lib/meta";

const CYCLE: AgentStatus[] = ["idle", "processing", "awaiting_approval", "error", "idle"];

export default function Dashboard() {
  const [agents, setAgents] = useState<Agent[]>(initialAgents);
  const [approvals, setApprovals] = useState<ApprovalItem[]>(initialApprovalQueue);
  const [activity, setActivity] = useState(initialActivityLog);
  const [alerts, setAlerts] = useState(initialAlerts);
  const [rooms, setRooms] = useState(initialChatRoomRules);
  const [domainFilter, setDomainFilter] = useState<Domain | "all">("all");
  const [selectedId, setSelectedId] = useState<string | null>("comm-agent");
  const [showAddAgent, setShowAddAgent] = useState(false);

  const selectedAgent = agents.find((a) => a.id === selectedId) ?? null;

  const pushActivity = useCallback(
    (agent: Agent, action: string, detail: string, level: "info" | "warning" | "error" | "success") => {
      setActivity((prev) => [
        {
          id: `log-${Date.now()}`,
          agentId: agent.id,
          action,
          detail,
          domain: agent.domain,
          timestamp: new Date().toLocaleTimeString("zh-TW", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          level,
        },
        ...prev,
      ].slice(0, 30));
    },
    []
  );

  const handleSimulate = useCallback(
    (id: string) => {
      setAgents((prev) =>
        prev.map((a) => {
          if (a.id !== id) return a;
          if (a.status === "disabled") return a; // 未啟用的代理不模擬
          const idx = CYCLE.indexOf(a.status);
          const next = CYCLE[(idx + 1) % CYCLE.length];
          const taskByStatus: Record<AgentStatus, string> = {
            idle: "等待下一批任務",
            processing: "正在處理新一批訊息…",
            awaiting_approval: "有項目需要人工核准",
            error: "偵測到異常，請檢查",
            disabled: "尚未啟用",
          };
          const updated = {
            ...a,
            status: next,
            currentTask: taskByStatus[next],
            lastActive: "剛剛",
            stats:
              next === "processing"
                ? { ...a.stats, processedToday: a.stats.processedToday + 1 }
                : a.stats,
          };
          pushActivity(
            updated,
            "狀態變化（模擬）",
            `${statusMeta[a.status].label} → ${statusMeta[next].label}`,
            next === "error" ? "error" : next === "awaiting_approval" ? "warning" : "info"
          );
          if (next === "error") {
            setAlerts((prevAlerts) => [
              {
                id: `alert-${Date.now()}`,
                agentId: updated.id,
                message: `${updated.name} 觸發模擬異常，請檢查任務狀態`,
                domain: updated.domain,
                severity: "error",
                timestamp: new Date().toLocaleTimeString("zh-TW", {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              },
              ...prevAlerts,
            ]);
          }
          return updated;
        })
      );
    },
    [pushActivity]
  );

  const handleResolveApproval = useCallback(
    (id: string, approved: boolean) => {
      const item = approvals.find((a) => a.id === id);
      setApprovals((prev) => prev.filter((a) => a.id !== id));
      if (item) {
        const agent = agents.find((a) => a.id === item.agentId);
        if (agent) {
          pushActivity(
            agent,
            approved ? "已核准" : "已駁回",
            item.title,
            approved ? "success" : "warning"
          );
        }
      }
    },
    [approvals, agents, pushActivity]
  );

  const handleAddAgent = useCallback((agent: Agent) => {
    setAgents((prev) => [...prev, agent]);
  }, []);

  return (
    <div className="relative flex h-full min-h-screen flex-col">
      <div className="hud-grid-bg" />
      <div className="hud-vignette" />
      <div className="hud-scanline" />

      <div className="relative z-10 flex h-full min-h-screen flex-col">
        <TopBar domainFilter={domainFilter} onDomainFilter={setDomainFilter} mockMode />

        <main className="grid flex-1 grid-cols-1 gap-4 p-4 lg:grid-cols-[1.6fr_1fr]">
          {/* 左側：代理狀態對應（區塊 1）*/}
          <div className="flex min-h-[420px] flex-col gap-4">
            <div className="hud-panel h-[420px] overflow-hidden lg:h-[480px]">
              <AgentGraph
                agents={agents}
                selectedId={selectedId}
                onSelect={setSelectedId}
                onSimulate={handleSimulate}
                onAddAgent={() => setShowAddAgent(true)}
                domainFilter={domainFilter}
              />
            </div>

            {selectedAgent && (
              <div className="hud-panel p-4">
                <div className="flex items-center justify-between">
                  <h3 className="hud-panel-title">代理詳情</h3>
                  <span
                    className="rounded-full px-2 py-0.5 text-[10px]"
                    style={{
                      color: domainMeta[selectedAgent.domain].accent,
                      background: `${domainMeta[selectedAgent.domain].accent}1a`,
                    }}
                  >
                    {domainMeta[selectedAgent.domain].label}
                  </span>
                </div>
                <p className="mt-2 text-sm font-medium text-[var(--text-primary)]">
                  {selectedAgent.name}（{selectedAgent.subtitle}）
                </p>
                <p className="mt-1 text-xs leading-relaxed text-[var(--text-dim)]">
                  {selectedAgent.description}
                </p>
                <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-md bg-black/20 p-2">
                    <div className="font-mono text-sm text-cyan-300">
                      {selectedAgent.stats.processedToday}
                    </div>
                    <div className="text-[9px] text-[var(--text-dim)]">今日處理</div>
                  </div>
                  <div className="rounded-md bg-black/20 p-2">
                    <div className="font-mono text-sm text-cyan-300">
                      {selectedAgent.stats.approvalRate}%
                    </div>
                    <div className="text-[9px] text-[var(--text-dim)]">核准率</div>
                  </div>
                  <div className="rounded-md bg-black/20 p-2">
                    <div className="font-mono text-sm text-cyan-300">
                      {selectedAgent.stats.avgResponseSec}s
                    </div>
                    <div className="text-[9px] text-[var(--text-dim)]">平均回應</div>
                  </div>
                </div>
              </div>
            )}

            <StatsSummary stats={statCards} />
            <ClassifierTester />
          </div>

          {/* 右側：待核准／異常／記錄／規則（區塊 2-4, 6）*/}
          <div className="flex flex-col gap-4">
            <AlertsPanel alerts={alerts} />
            <div className="h-64">
              <ApprovalQueue items={approvals} onResolve={handleResolveApproval} />
            </div>
            <div className="h-64">
              <ActivityLog entries={activity} />
            </div>
            <div className="h-64">
              <RulesEditor rooms={rooms} onChange={setRooms} />
            </div>
          </div>
        </main>
      </div>

      {showAddAgent && (
        <AddAgentModal onClose={() => setShowAddAgent(false)} onCreate={handleAddAgent} />
      )}
    </div>
  );
}
