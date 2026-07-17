// app/loading.tsx — Suspense fallback UI, mostrado mientras un segmento carga.

export default function Loading() {
  return (
    <div className="min-h-screen bg-page flex justify-center p-10">
      <div className="w-240 max-w-full grid grid-cols-3 gap-4 content-start">
        <div className="col-span-2 h-45 rounded-card bg-card border border-subtle animate-pulse [animation-duration:1.4s]" />
        <div className="h-45 rounded-card bg-card border border-subtle animate-pulse [animation-duration:1.4s] [animation-delay:120ms]" />
        <div className="h-35 rounded-card bg-card border border-subtle animate-pulse [animation-duration:1.4s] [animation-delay:240ms]" />
        <div className="h-35 rounded-card bg-card border border-subtle animate-pulse [animation-duration:1.4s] [animation-delay:360ms]" />
        <div className="h-35 rounded-card bg-card border border-subtle animate-pulse [animation-duration:1.4s] [animation-delay:480ms]" />
      </div>
    </div>
  );
}
