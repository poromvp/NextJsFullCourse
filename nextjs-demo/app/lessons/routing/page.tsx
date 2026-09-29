import Link from "next/link";

export default function RoutingOverviewPage() {
  const sampleProducts = [
    { id: "macbook-m4", name: "MacBook Pro M4 Max", category: "Laptop", price: "2,499 USD" },
    { id: "iphone-16-pro", name: "iPhone 16 Pro Max", category: "Smartphone", price: "1,199 USD" },
    { id: "ipad-pro-m4", name: "iPad Pro M4 OLED", category: "Tablet", price: "999 USD" },
  ];

  return (
    <div className="space-y-8">
      {/* Intro Header */}
      <div className="bg-slate-800/60 border border-slate-700/70 p-6 rounded-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold mb-3">
          <span>✨ Bài Thực Hành 03</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">
          Thử Nghiệm File-system Routing & Điều Hướng
        </h1>
        <p className="mt-2 text-slate-400 leading-relaxed">
          Trang này minh chứng cách Next.js tạo đường dẫn thông qua cây thư mục:{" "}
          <code className="bg-slate-900 px-2 py-0.5 rounded text-amber-400 font-mono text-sm">
            app/lessons/routing/page.tsx
          </code>
          . Layout thanh menu phía trên được định nghĩa tại{" "}
          <code className="bg-slate-900 px-2 py-0.5 rounded text-amber-400 font-mono text-sm">
            layout.tsx
          </code>{" "}
          và sẽ không bị reload khi chuyển sang các trang con!
        </p>
      </div>

      {/* Dynamic route demonstration cards */}
      <div>
        <h2 className="text-xl font-bold text-slate-200 mb-4 flex items-center gap-2">
          <span>📦</span>
          <span>Click thử nghiệm Dynamic Route: <code>/lessons/products/[id]</code></span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sampleProducts.map((item) => (
            <div
              key={item.id}
              className="bg-slate-800/40 border border-slate-700/50 p-5 rounded-xl flex flex-col justify-between hover:border-slate-600 transition-all hover:-translate-y-0.5"
            >
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">
                  {item.category}
                </span>
                <h3 className="text-lg font-bold text-white mt-1">{item.name}</h3>
                <p className="text-emerald-400 font-semibold mt-2">{item.price}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-700/40">
                <Link
                  href={`/lessons/products/${item.id}?from=routing-demo&discount=15`}
                  className="inline-flex items-center justify-center w-full px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-sm transition-colors"
                >
                  Xem chi tiết [id: {item.id}] →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Knowledge recap box */}
      <div className="bg-slate-950 border border-slate-800 p-6 rounded-xl space-y-3">
        <h3 className="font-bold text-amber-400 flex items-center gap-2">
          <span>💡</span> Quy ước cần nhớ:
        </h3>
        <ul className="text-sm text-slate-300 space-y-2 list-disc list-inside">
          <li>
            Thẻ <code className="text-emerald-400 font-mono">&lt;Link href=&quot;...&quot;&gt;</code> tự động nạp trước (prefetch) tài nguyên khi link lọt vào tầm nhìn.
          </li>
          <li>
            Đường dẫn động đặt tên thư mục trong ngoặc vuông:{" "}
            <code className="text-emerald-400 font-mono">app/lessons/products/[id]/page.tsx</code>.
          </li>
          <li>
            Từ Next.js 15+, <code className="text-emerald-400 font-mono">params</code> và{" "}
            <code className="text-emerald-400 font-mono">searchParams</code> phải được <code className="text-pink-400 font-mono">await</code>!
          </li>
        </ul>
      </div>
    </div>
  );
}
