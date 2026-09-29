export default function DataFetchingLoading() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Skeleton Header */}
        <div className="h-8 w-48 bg-slate-800 animate-pulse rounded-lg"></div>
        <div className="h-24 w-full bg-slate-900 border border-slate-800 animate-pulse rounded-2xl"></div>

        {/* Skeleton Post Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-3 animate-pulse"
            >
              <div className="h-5 w-3/4 bg-slate-800 rounded"></div>
              <div className="h-4 w-full bg-slate-850 rounded"></div>
              <div className="h-4 w-5/6 bg-slate-850 rounded"></div>
              <div className="h-3 w-1/4 bg-slate-800 rounded mt-4"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
