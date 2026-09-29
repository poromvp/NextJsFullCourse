import Link from "next/link";

interface Post {
  id: number;
  title: string;
  body: string;
}

async function getDemoPosts(): Promise<Post[]> {
  try {
    // Simulated delay of 600ms so you can observe loading.tsx in action
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Server-side fetch with caching strategy
    const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=4", {
      next: { revalidate: 60 }, // ISR: Revalidate cache every 60 seconds
    });

    if (!res.ok) {
      throw new Error("Không thể tải danh sách bài viết từ server");
    }

    return await res.json();
  } catch (err) {
    console.error("Lỗi fetch posts:", err);
    // Fallback data in case user has no internet access
    return [
      {
        id: 1,
        title: "Tối ưu hóa Server-Side Rendering với Turbopack",
        body: "Khám phá cách Next.js 16 tối ưu thời gian biên dịch ứng dụng với Turbopack engine viết bằng Rust.",
      },
      {
        id: 2,
        title: "Tự động hóa Caching và Revalidation",
        body: "Tìm hiểu cơ chế ISR giúp website vừa đạt tốc độ của file tĩnh vừa luôn cập nhật dữ liệu mới.",
      },
      {
        id: 3,
        title: "Zero-bundle Client với Server Components",
        body: "Giảm kích thước JavaScript gửi về trình duyệt xuống mức tối đa nhờ React Server Components.",
      },
      {
        id: 4,
        title: "Làm chủ Server Actions trong Next.js",
        body: "Đột phá trong cách tương tác với cơ sở dữ liệu trực tiếp từ các hàm server an toàn.",
      },
    ];
  }
}

export default async function DataFetchingLessonPage() {
  const posts = await getDemoPosts();
  const fetchedAt = new Date().toLocaleTimeString("vi-VN");

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-xs bg-slate-900 hover:bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-800 transition-colors"
          >
            ← Về Trang Chủ Khóa Học
          </Link>
          <span className="text-xs text-slate-400 font-mono">
            Demo Bài 05: Data Fetching & Caching
          </span>
        </div>

        {/* Lesson Intro Banner */}
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold mb-3">
            <span>🚀 Server-Side Data Fetching</span>
          </div>
          <h1 className="text-3xl font-black text-white">
            Lấy Dữ Liệu Phía Server & Tự Động Streaming
          </h1>
          <p className="mt-3 text-slate-400 leading-relaxed">
            Dữ liệu bên dưới được lấy trực tiếp trên Server bằng hàm <code className="text-amber-400 font-mono">async/await</code>. Trong khi dữ liệu đang được tải, Next.js tự động kích hoạt giao diện khung xương từ tệp <code className="text-pink-400 font-mono">loading.tsx</code>.
          </p>
        </div>

        {/* Cache status badge */}
        <div className="flex items-center justify-between bg-slate-900/60 border border-slate-800 px-5 py-3 rounded-xl text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-slate-300">
              Chiến lược Cache: <strong className="text-emerald-400">ISR (next: &#123; revalidate: 60 &#125;)</strong>
            </span>
          </div>
          <div className="text-slate-400">
            Render lúc: <span className="text-slate-200 font-mono">{fetchedAt}</span>
          </div>
        </div>

        {/* Rendered Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-slate-900/80 border border-slate-800 p-5 rounded-xl hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-mono text-amber-400 font-bold">
                  Bài viết #{post.id}
                </span>
                <h3 className="text-lg font-bold text-white mt-1 capitalize leading-snug">
                  {post.title}
                </h3>
                <p className="text-sm text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                  {post.body}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs text-slate-500 font-mono flex items-center justify-between">
                <span>Fetched on Server</span>
                <span className="text-emerald-400">Status 200 OK</span>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Box */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-2">
          <h4 className="font-bold text-white text-sm">💡 Điểm nổi bật bạn vừa trải nghiệm:</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            - Không cần dùng <code className="text-amber-400 font-mono">useEffect</code> hay quản lý cờ <code className="text-amber-400 font-mono">isLoading</code> thủ công trên client.<br />
            - Trình duyệt nhận được mã HTML hoàn chỉnh có sẵn dữ liệu, tối ưu hóa 100% cho các cỗ máy tìm kiếm (SEO).<br />
            - Thử nhấn F5 (Refresh) để trải nghiệm màn hình skeleton từ <code className="text-pink-400 font-mono">loading.tsx</code> xuất hiện chớp nhoáng trước khi trang nạp xong!
          </p>
        </div>
      </div>
    </div>
  );
}
