import Link from "next/link";
import InteractiveCounter from "./InteractiveCounter";

export default function ComponentsComparisonPage() {
  // Executed on the Server at render time!
  const serverRenderTime = new Date().toISOString();
  const nodeVersion = process.version;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Navigation breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-xs bg-slate-900 hover:bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-800 transition-colors"
          >
            ← Về Trang Chủ Khóa Học
          </Link>
          <span className="text-xs text-slate-400 font-mono">
            Demo Bài 04: Server vs Client Components
          </span>
        </div>

        {/* Header */}
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold mb-3">
            <span>⚡ Kiến Trúc React 19 & Next.js</span>
          </div>
          <h1 className="text-3xl font-black text-white">
            So Sánh Trực Quan: Server Component vs Client Component
          </h1>
          <p className="mt-3 text-slate-400 leading-relaxed max-w-3xl">
            Trong Next.js App Router, file <code className="text-cyan-400 font-mono">page.tsx</code> này là{" "}
            <strong>Server Component</strong>. Nó chạy trên Server và nhúng một{" "}
            <strong>Client Component</strong> nhỏ (<code className="text-indigo-400 font-mono">InteractiveCounter</code>) để xử lý tương tác nút bấm.
          </p>
        </div>

        {/* Side-by-side comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Server Component Side */}
          <div className="bg-slate-900/70 border border-emerald-500/30 p-6 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-mono font-bold">
                Mặc định: Server Component (RSC)
              </span>
              <span className="text-xs text-emerald-400 font-mono">page.tsx</span>
            </div>

            <div className="space-y-3 pt-2">
              <h2 className="text-xl font-bold text-white">Xử Lý Trên Máy Chủ (Server)</h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Được biên dịch trước trên Server. Không gửi bất kỳ mã JavaScript xử lý nào về trình duyệt người dùng!
              </p>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
                <div>
                  <span className="text-slate-500">Thời điểm render trên Server:</span>
                  <p className="text-emerald-400 font-bold break-all">{serverRenderTime}</p>
                </div>
                <div>
                  <span className="text-slate-500">Node Runtime Environment:</span>
                  <p className="text-slate-200 font-bold">{nodeVersion}</p>
                </div>
              </div>

              <div className="text-xs text-slate-400 space-y-1.5 pt-2">
                <p className="text-emerald-300 font-semibold">Ưu điểm vượt trội:</p>
                <p>✅ Truy cập trực tiếp CSDL (Database/ORM) mà không cần tạo REST API</p>
                <p>✅ 0 KB JavaScript gửi về client (tiết kiệm băng thông di động)</p>
                <p>✅ Giữ kín các API Keys, tokens bí mật phía server</p>
              </div>
            </div>
          </div>

          {/* Client Component Side */}
          <InteractiveCounter />
        </div>

        {/* Golden Rule Summary */}
        <div className="bg-gradient-to-r from-cyan-950/40 via-slate-900 to-indigo-950/40 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <span>🏆</span> Quy Tắc Thiết Kế Vàng (Mental Model)
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Luôn giữ các trang (<code className="text-cyan-400 font-mono">page.tsx</code>) và layout (<code className="text-cyan-400 font-mono">layout.tsx</code>) là{" "}
            <strong>Server Components</strong> để tối đa hóa tốc độ tải và SEO. Chỉ tách các nút bấm tương tác, form, hoặc dialog thành các{" "}
            <strong>Client Components nhỏ</strong> ở đầu cành của cây component.
          </p>
        </div>
      </div>
    </div>
  );
}
