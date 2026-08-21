export default function Loading() {
  return (
    <main className="min-h-screen bg-[#f5f1ea]">
      <section className="flex min-h-screen items-center justify-center px-6">
        <div className="w-full max-w-xl text-center">
          <div className="flex flex-col items-center gap-6">
            {/* Animated plant icon */}
            <div className="relative">
              <div className="h-20 w-20 rounded-full border-4 border-emerald-100 border-t-emerald-600 animate-spin" />
              <span className="absolute inset-0 flex items-center justify-center text-4xl">🪴</span>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-green-950 tracking-tight">
                Getting things ready…
              </h2>
              <p className="text-base text-green-800/60">
                Preparing your plant haven
              </p>
            </div>
            {/* Subtle shimmer bar */}
            <div className="w-48 h-1.5 rounded-full bg-emerald-100 overflow-hidden">
              <div
                className="h-full w-1/2 rounded-full bg-gradient-to-r from-emerald-300 to-emerald-500"
                style={{
                  animation: "loadingSlide 1.5s ease-in-out infinite",
                }}
              />
            </div>
          </div>
        </div>
      </section>
      <style>{`
        @keyframes loadingSlide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </main>
  );
}
