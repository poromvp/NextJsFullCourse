import Link from "next/link";

interface ProductPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProductDetailPage({
  params,
  searchParams,
}: ProductPageProps) {
  // Await the asynchronous params & searchParams (Next.js 15+ standard)
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const id = resolvedParams.id;
  const discount = resolvedSearchParams.discount;
  const coupon = resolvedSearchParams.coupon;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Navigation breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <Link href="/" className="hover:text-emerald-400">Trang chủ</Link>
          <span>/</span>
          <Link href="/lessons/routing" className="hover:text-emerald-400">Demo Routing</Link>
          <span>/</span>
          <span className="text-slate-200 font-mono">products/[{id}]</span>
        </div>

        {/* Dynamic route card */}
        <div className="bg-slate-800/80 border border-slate-700 p-8 rounded-2xl shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-mono font-bold">
              Dynamic Segment: [id]
            </span>
            <span className="text-xs text-slate-400 font-mono">
              app/lessons/products/[id]/page.tsx
            </span>
          </div>

          <h1 className="text-3xl font-black text-white">
            Chi Tiết Sản Phẩm: <span className="text-emerald-400 font-mono">{id}</span>
          </h1>

          <p className="text-slate-300">
            Dữ liệu <code className="text-pink-400 font-mono">id = &quot;{id}&quot;</code> đã được trích xuất trực tiếp từ URL thông qua Server Component bất đồng bộ:
          </p>

          {/* Code snippet demonstration */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono text-emerald-300 overflow-x-auto">
            <p className="text-slate-500">{"// Next.js 15/16 async params syntax"}</p>
            <p>export default async function Page({`{ params }: { params: Promise<{ id: string }> }`}) {`{`}</p>
            <p className="pl-4">const {`{ id }`} = await params;</p>
            <p className="pl-4">return &lt;h1&gt;Product: {`{id}`}&lt;/h1&gt;;</p>
            <p>{`}`}</p>
          </div>

          {/* Search Params demonstration */}
          <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-700/60 space-y-3">
            <h3 className="font-bold text-slate-200 text-sm flex items-center gap-2">
              <span>🔎</span> Dữ liệu Search Query Params (URL Query String):
            </h3>
            {discount || coupon ? (
              <div className="space-y-1 text-sm">
                {discount && (
                  <p className="text-emerald-400">
                    • Giảm giá được kích hoạt: <strong>{discount}%</strong> (từ <code>?discount={discount}</code>)
                  </p>
                )}
                {coupon && (
                  <p className="text-amber-400">
                    • Mã khuyến mãi: <strong>{coupon}</strong> (từ <code>?coupon={coupon}</code>)
                  </p>
                )}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">
                Chưa có query param. Thử thêm <code>?discount=20&coupon=NEXTJS</code> vào cuối URL để xem kết quả!
              </p>
            )}
          </div>

          {/* Quick test buttons */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-700/60">
            <Link
              href="/lessons/products/dell-xps-15?discount=25&coupon=SUMMER2026"
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-xs font-medium text-slate-200 transition-colors"
            >
              Test với ID khác: <code>dell-xps-15</code>
            </Link>
            <Link
              href="/lessons/routing"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold transition-colors"
            >
              ← Quay lại danh sách Routing
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
