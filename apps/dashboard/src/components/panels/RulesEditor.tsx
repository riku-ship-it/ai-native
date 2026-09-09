"use client";

import { useState } from "react";
import { Star, Trash2, Plus } from "lucide-react";
import type { ChatRoomRule } from "@/lib/types";

export default function RulesEditor({
  rooms,
  onChange,
}: {
  rooms: ChatRoomRule[];
  onChange: (rooms: ChatRoomRule[]) => void;
}) {
  const [draft, setDraft] = useState("");

  const toggleImportant = (id: string) => {
    onChange(
      rooms.map((r) => (r.id === id ? { ...r, important: !r.important } : r))
    );
  };

  const remove = (id: string) => {
    onChange(rooms.filter((r) => r.id !== id));
  };

  const add = () => {
    if (!draft.trim()) return;
    onChange([
      ...rooms,
      { id: `room-${Date.now()}`, name: draft.trim(), important: true },
    ]);
    setDraft("");
  };

  return (
    <div className="hud-panel flex h-full flex-col p-4">
      <div className="flex items-center justify-between">
        <h3 className="hud-panel-title">重要聊天室名單</h3>
        <span className="text-[10px] text-[var(--text-dim)]">
          溝通分身分類規則使用
        </span>
      </div>

      <div className="mt-3 flex-1 space-y-1.5 overflow-y-auto pr-1">
        {rooms.map((r) => (
          <div
            key={r.id}
            className="flex items-center justify-between rounded-md border border-white/5 bg-black/20 px-2.5 py-1.5"
          >
            <button
              onClick={() => toggleImportant(r.id)}
              className="flex items-center gap-2 text-xs"
            >
              <Star
                size={13}
                className={r.important ? "fill-amber-400 text-amber-400" : "text-[var(--text-dim)]"}
              />
              <span className={r.important ? "text-[var(--text-primary)]" : "text-[var(--text-dim)]"}>
                {r.name}
              </span>
            </button>
            <button
              onClick={() => remove(r.id)}
              className="text-[var(--text-dim)] hover:text-red-400"
            >
              <Trash2 size={13} />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-3 flex gap-2 border-t border-white/5 pt-3">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
          placeholder="新增聊天室名稱…"
          className="min-w-0 flex-1 rounded-md border border-white/10 bg-black/30 px-2 py-1.5 text-xs outline-none focus:border-cyan-400/50"
        />
        <button
          onClick={add}
          className="flex items-center gap-1 rounded-md border border-cyan-400/30 px-2 py-1.5 text-xs text-cyan-300 hover:bg-cyan-400/10"
        >
          <Plus size={12} />
        </button>
      </div>
    </div>
  );
}
