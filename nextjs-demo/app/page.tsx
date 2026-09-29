import Link from "next/link";

export default function Home() {
  const lessons = [
    {
      id: "01",
      title: "Bài 01: Tổng Quan & Kiến Trúc Server-First",
      tag: "Nền tảng",
      tagColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      description:
        "Tìm hiểu Next.js là gì, so sánh React SPA thuần (CSR) với SSR, SSG, ISR. Nắm bắt tư duy Server-First và khởi tạo dự án chuẩn công nghiệp.",
      keyPoints: ["Next.js vs React SPA", "4 mô hình Render (CSR/SSR/SSG/ISR)", "Khởi tạo với create-next-app"],
      docFile: "lessons/bai-01-tong-quan-va-kien-truc.md",
      demoUrl: null,
    },
    {
      id: "02",
      title: "Bài 02: Cấu Trúc Dự Án & Special Files trong App Router",
      tag: "Cấu trúc thư mục",
      tagColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      description:
        "Làm chủ các tệp tin quy ước đặc biệt: page.tsx, layout.tsx, loading.tsx, error.tsx, not-found.tsx. Gom nhóm route thông minh với Route Groups (auth).",
      keyPoints: ["Special Files trong app/", "Layout lồng nhau & Template", "Route Groups & Private folders"],
      docFile: "lessons/bai-02-cau-truc-du-an-app-router.md",
      demoUrl: null,
    },
    {
      id: "03",
      title: "Bài 03: Hệ Thống Routing & Điều Hướng (Navigation)",
      tag: "Thực hành có Demo",
      tagColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      description:
        "Hệ thống định tuyến File-based Routing, Static & Nested Routes, Dynamic Routes [id], Catch-all [...slug]. Cú pháp async params chuẩn Next.js 15+.",
      keyPoints: ["Dynamic Routes [id]", "Thẻ <Link> và Prefetching", "Async params & searchParams"],
      docFile: "lessons/bai-03-routing-va-navigation.md",
      demoUrl: "/lessons/routing",
    },
    {
      id: "04",
      title: "Bài 04: Server Components (RSC) vs Client Components",
      tag: "Thực hành có Demo",
      tagColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
      description:
        "Trọng tâm cốt lõi của React 19 & Next.js: Phân biệt Server Component (0 KB JS bundle) và Client Component ('use client'). Mô hình Composition qua children.",
      keyPoints: ["Triết lý mặc định là Server Component", "Khi nào dùng 'use client'", "Component Composition (children)"],
      docFile: "lessons/bai-04-server-va-client-components.md",
      demoUrl: "/lessons/components-demo",
    },
    {
      id: "05",
      title: "Bài 05: Data Fetching, Caching & Server Actions",
      tag: "Thực hành có Demo",
      tagColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      description:
        "Lấy dữ liệu tự nhiên bằng async/await ngay trong Server Component. Chiến lược Caching & Revalidation (ISR). Streaming UI và Server Actions ('use server').",
      keyPoints: ["Async Server Fetching", "Caching & Revalidation (ISR)", "Tự động Streaming với loading.tsx"],
      docFile: "lessons/bai-05-data-fetching-va-server-actions.md",
      demoUrl: "/lessons/data-fetching",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-slate-950 font-sans">
      {/* Background Glow Accents */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-500/20 rounded-full blur-[128px]"></div>
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-cyan-500/15 rounded-full blur-[128px]"></div>
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-indigo-500/20 rounded-full blur-[128px]"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-12 lg:py-16 space-y-12">
        {/* Header Hero Section */}
        <header className="text-center space-y-5 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Khóa Học Toàn Diện: Next.js App Router & React 19</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            Làm Chủ <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-400">Next.js</span> Từ Cơ Bản Đến Nâng Cao
          </h1>

          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Hệ thống bài học nhập môn chuẩn xác, cập nhật cú pháp mới nhất (Next.js 15 & 16, async params, Turbopack, React 19 RSC) kèm các trang demo tương tác trực tiếp.
          </p>

          {/* Technology Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
            <span className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-emerald-400">
              Next.js 16 (App Router)
            </span>
            <span className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-cyan-400">
              React 19 RSC
            </span>
            <span className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-amber-400">
              Turbopack Engine
            </span>
            <span className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-indigo-400">
              Tailwind CSS v4
            </span>
            <span className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-pink-400">
              TypeScript
            </span>
          </div>
        </header>

        {/* Quick Launch & Terminal Box */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl backdrop-blur">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>⚡</span> Khởi Chạy Server Phát Triển (Localhost)
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Dự án mẫu <code className="text-emerald-400">nextjs-demo</code> đã sẵn sàng để bạn chạy thử nghiệm mọi lúc.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-mono bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                Port: 3000
              </span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80">
              <span className="text-slate-500"># Chạy dev server</span>
              <p className="text-emerald-400 font-bold mt-1">npm run dev</p>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80">
              <span className="text-slate-500"># Kiểm tra build Turbopack</span>
              <p className="text-cyan-400 font-bold mt-1">npm run build</p>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80">
              <span className="text-slate-500"># Kiểm tra lỗi cú pháp</span>
              <p className="text-amber-400 font-bold mt-1">npm run lint</p>
            </div>
          </div>
        </div>

        {/* Lessons List Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black text-white">Danh Sách 5 Bài Học Nhập Môn</h2>
              <p className="text-sm text-slate-400 mt-1">
                Lý thuyết nằm trong thư mục <code className="text-amber-400 font-mono">NextJsFullCourse/lessons/</code>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5">
            {lessons.map((lesson) => (
              <div
                key={lesson.id}
                className="group bg-slate-900/60 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-6 transition-all duration-200 hover:bg-slate-900/90 hover:shadow-xl hover:shadow-emerald-500/5"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-slate-800 text-slate-300 font-mono text-xs font-black flex items-center justify-center border border-slate-700">
                        {lesson.id}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${lesson.tagColor}`}>
                        {lesson.tag}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {lesson.title}
                    </h3>

                    <p className="text-sm text-slate-400 leading-relaxed">
                      {lesson.description}
                    </p>

                    {/* Key points checklist */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {lesson.keyPoints.map((point, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-slate-950/70 border border-slate-800/80 text-slate-300 px-2.5 py-1 rounded-md flex items-center gap-1.5"
                        >
                          <span className="text-emerald-400">✓</span> {point}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions / Links */}
                  <div className="flex lg:flex-col items-center lg:items-end justify-between gap-3 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-800">
                    {lesson.demoUrl ? (
                      <Link
                        href={lesson.demoUrl}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors shadow-lg shadow-emerald-500/20"
                      >
                        <span>Trải Nghiệm Live Demo</span>
                        <span>→</span>
                      </Link>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 text-slate-400 text-xs font-medium">
                        <span>📖 Lý thuyết & Kiến trúc</span>
                      </span>
                    )}

                    <div className="text-right">
                      <span className="text-xs font-mono text-slate-500 block">Tệp tài liệu:</span>
                      <span className="text-xs font-mono text-slate-300">{lesson.docFile}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="pt-8 border-t border-slate-800/80 text-center text-xs text-slate-500 space-y-2">
          <p>© 2026 Next.js Full Course - Xây dựng với Next.js 16, React 19 & Tailwind CSS</p>
          <p>
            Vui lòng xem các file hướng dẫn chi tiết trong thư mục{" "}
            <code className="text-slate-400 font-mono">NextJsFullCourse/lessons/</code>
          </p>
        </footer>
      </div>
    </div>
  );
}
