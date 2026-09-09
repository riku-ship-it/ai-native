"use client";

import { useState } from "react";
import { X } from "lucide-react";
import type { Agent, Domain } from "@/lib/types";

const ICON_OPTIONS = ["Bot", "MailCheck", "Landmark", "TrendingUp", "LineChart", "Wallet"];

export default function AddAgentModal({
  onClose,
  onCreate,
}: {
  onClose: () => void;
  onCreate: (agent: Agent) => void;
}) {
  const [name, setName] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [domain, setDomain] = useState<Domain>("personal");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState(ICON_OPTIONS[0]);

  const submit = () => {
    if (!name.trim()) return;
    onCreate({
      id: `agent-${Date.now()}`,
      name: name.trim(),
      subtitle: subtitle.trim() || "New Agent",
      domain,
      status: "disabled",
      currentTask: "尚未啟用，等待串接",
      description: description.trim() || "尚未填寫說明",
      icon,
      stats: { processedToday: 0, approvalRate: 0, avgResponseSec: 0 },
      lastActive: "—",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="hud-panel border-glow-cyan w-full max-w-md p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold glow-cyan">新增／串接代理</h3>
          <button onClick={onClose} className="text-[var(--text-dim)] hover:text-white">
            <X size={16} />
          </button>
        </div>

        <div className="mt-4 space-y-3">
          <div>
            <label className="text-[10px] uppercase tracking-wider text-[var(--text-dim)]">
              代理名稱
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="例如：個人股票代理"
              className="mt-1 w-full rounded-md border border-white/10 bg-black/30 px-2.5 py-1.5 text-sm outline-none focus:border-cyan-400/50"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-wider text-[var(--text-dim)]">
              英文代稱
            </label>
            <input
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="例如：Stock Agent"
              className="mt-1 w-full rounded-md border border-white/10 bg-black/30 px-2.5 py-1.5 text-sm outline-none focus:border-cyan-400/50"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-wider text-[var(--text-dim)]">
              所屬範疇
            </label>
            <div className="mt-1 flex gap-2">
              {(["company", "personal"] as Domain[]).map((d) => (
                <button
                  key={d}
                  onClick={() => setDomain(d)}
                  className={`flex-1 rounded-md border px-2.5 py-1.5 text-xs ${
                    domain === d
                      ? d === "company"
                        ? "border-cyan-400/50 bg-cyan-400/10 text-cyan-300"
                        : "border-fuchsia-400/50 bg-fuchsia-400/10 text-fuchsia-300"
                      : "border-white/10 text-[var(--text-dim)]"
                  }`}
                >
                  {d === "company" ? "公司範疇" : "個人範疇"}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-wider text-[var(--text-dim)]">
              圖示
            </label>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {ICON_OPTIONS.map((i) => (
                <button
                  key={i}
                  onClick={() => setIcon(i)}
                  className={`rounded-md border px-2 py-1 text-[10px] ${
                    icon === i
                      ? "border-cyan-400/50 text-cyan-300"
                      : "border-white/10 text-[var(--text-dim)]"
                  }`}
                >
                  {i}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-wider text-[var(--text-dim)]">
              說明
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              placeholder="這個代理負責什麼？"
              className="mt-1 w-full resize-none rounded-md border border-white/10 bg-black/30 px-2.5 py-1.5 text-sm outline-none focus:border-cyan-400/50"
            />
          </div>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-md border border-white/10 px-3 py-1.5 text-xs text-[var(--text-dim)]"
          >
            取消
          </button>
          <button
            onClick={submit}
            className="rounded-md border border-cyan-400/40 bg-cyan-400/10 px-3 py-1.5 text-xs text-cyan-300 hover:bg-cyan-400/20"
          >
            建立節點
          </button>
        </div>
      </div>
    </div>
  );
}
