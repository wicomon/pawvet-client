// app/not-found.tsx — se renderiza en notFound() o cuando ninguna ruta coincide.

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-page flex items-center justify-center p-10">
      <div className="w-110 max-w-full bg-card border border-subtle rounded-card shadow-card px-9 py-11 flex flex-col items-center text-center gap-2.5">
        <div className="font-display text-[56px] font-extrabold text-brand leading-none">
          404
        </div>
        <h1 className="font-display text-xl font-bold text-ink mt-1.5">
          Página no encontrada
        </h1>
        <p className="text-[14.5px] leading-relaxed text-muted m-0">
          El curso, entrega o página que buscas no existe o fue movida.
        </p>
        <Link
          href="/"
          className="mt-3.5 h-11.5 px-6 rounded-field bg-brand hover:bg-brand-hover text-on-brand font-display font-bold text-sm flex items-center transition-[transform,background-color] duration-200 active:scale-[0.97]"
        >
          Volver al panel
        </Link>
      </div>
    </div>
  );
}
