"use client";

import { useState } from "react";

export default function InteractiveCounter() {
  const [count, setCount] = useState(0);
  const [lastClicked, setLastClicked] = useState<string | null>(null);

  const handleIncrement = () => {
    setCount((prev) => prev + 1);
    setLastClicked(new Date().toLocaleTimeString("vi-VN"));
  };

  const handleDecrement = () => {
    setCount((prev) => prev - 1);
    setLastClicked(new Date().toLocaleTimeString("vi-VN"));
  };

  const handleReset = () => {
    setCount(0);
    setLastClicked(null);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-950/60 to-purple-950/40 border border-indigo-500/30 p-6 rounded-2xl space-y-4">
      <div className="flex items-center justify-between">
        <span className="px-2.5 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full text-xs font-mono font-bold">
          &apos;use client&apos; - Client Component
        </span>
        <span className="text-xs text-indigo-400 font-mono">InteractiveCounter.tsx</span>
      </div>

      <div className="text-center py-4">
        <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold">
          Giá trị State trên Client
        </span>
        <div className="text-5xl font-black text-indigo-400 font-mono my-2">{count}</div>
        {lastClicked && (
          <p className="text-xs text-slate-400">
            Lần click gần nhất: <span className="text-indigo-300 font-mono">{lastClicked}</span>
          </p>
        )}
      </div>

      <div className="flex items-center justify-center gap-3">
        <button
          onClick={handleDecrement}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg text-sm transition-colors border border-slate-700 active:scale-95"
        >
          - Giảm 1
        </button>
        <button
          onClick={handleReset}
          className="px-3 py-2 bg-slate-800/60 hover:bg-slate-700/60 text-slate-300 rounded-lg text-xs transition-colors"
        >
          Reset
        </button>
        <button
          onClick={handleIncrement}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg text-sm transition-colors shadow-lg shadow-indigo-600/30 active:scale-95"
        >
          + Tăng 1
        </button>
      </div>

      <div className="text-xs text-slate-400 bg-slate-950/50 p-3 rounded-lg border border-indigo-900/40">
        💡 <strong>Vì sao đây phải là Client Component?</strong> Vì nó sử dụng{" "}
        <code className="text-indigo-300 font-mono">useState()</code> và sự kiện{" "}
        <code className="text-indigo-300 font-mono">onClick</code>. Server không thể lưu trạng thái tương tác của người dùng trên trình duyệt.
      </div>
    </div>
  );
}
