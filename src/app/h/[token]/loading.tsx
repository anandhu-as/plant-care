export default function Loading() {
  return (
    <main className="min-h-screen bg-[#f5f1ea] p-5 sm:p-10">
      <div className="mx-auto max-w-2xl space-y-8 animate-pulse">
        {/* Header skeleton */}
        <div className="p-6 rounded-3xl bg-[#ebe3d5]">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="space-y-3">
              <div className="h-8 w-48 rounded-xl bg-stone-300/50" />
              <div className="h-6 w-24 rounded-full bg-emerald-200/40" />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="h-10 w-24 rounded-full bg-stone-300/40" />
              <div className="h-10 w-10 rounded-full bg-stone-300/40" />
              <div className="h-10 w-10 rounded-full bg-stone-300/40" />
              <div className="h-10 w-28 rounded-full bg-emerald-300/40" />
              <div className="h-10 w-10 rounded-full bg-stone-300/40" />
            </div>
          </div>
        </div>

        {/* "My Plants" section divider */}
        <div className="flex items-center gap-2 px-2">
          <div className="h-6 w-28 rounded-lg bg-stone-300/40" />
          <div className="h-px flex-grow ml-4 bg-stone-200" />
        </div>

        {/* Plant card skeletons */}
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="py-6 px-4 rounded-2xl border border-stone-200"
            style={{ opacity: 1 - i * 0.2 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="h-16 w-16 md:h-20 md:w-20 rounded-full bg-stone-200/60" />
              <div className="flex-1 space-y-2.5">
                <div className="h-6 w-40 rounded-lg bg-stone-300/50" />
                <div className="h-4 w-28 rounded-md bg-stone-200/50" />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
              <div className="space-y-2">
                <div className="h-5 w-36 rounded-md bg-stone-300/40" />
                <div className="h-4 w-48 rounded-md bg-stone-200/40" />
              </div>
              <div className="flex items-center gap-2">
                <div className="h-10 w-36 rounded-full bg-blue-200/40" />
                <div className="h-10 w-10 rounded-full bg-stone-200/40" />
                <div className="h-10 w-10 rounded-full bg-stone-200/40" />
              </div>
            </div>
          </div>
        ))}

        {/* Loading indicator */}
        <div className="flex flex-col items-center justify-center py-8 gap-4">
          <div className="relative">
            <div className="h-12 w-12 rounded-full border-3 border-emerald-200 border-t-emerald-600 animate-spin" />
            <span className="absolute inset-0 flex items-center justify-center text-lg">🌱</span>
          </div>
          <p className="text-sm font-medium text-stone-500 tracking-wide">
            Getting things ready…
          </p>
        </div>
      </div>
    </main>
  );
}
