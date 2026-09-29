import Link from "next/link";

export default function RoutingLessonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Sub-navigation bar demonstration */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-md font-medium text-slate-300 transition-colors"
            >
              ← Về Trang Chủ Khóa Học
            </Link>
            <span className="text-slate-500">|</span>
            <span className="font-semibold text-emerald-400 text-sm">
              Demo: Bài 03 - Routing & Navigation
            </span>
          </div>

          <nav className="flex items-center gap-2 text-sm">
            <Link
              href="/lessons/routing"
              className="px-3 py-1.5 rounded-md hover:bg-slate-800 text-slate-200 transition-colors"
            >
              Tổng quan Route
            </Link>
            <Link
              href="/lessons/products/101?coupon=NEXTJS2026"
              className="px-3 py-1.5 rounded-md hover:bg-slate-800 text-slate-200 transition-colors"
            >
              Demo Dynamic Route [id]
            </Link>
          </nav>
        </div>
      </header>

      {/* Main content wrapped in layout */}
      <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
