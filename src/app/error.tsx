"use client";

// app/error.tsx — error boundary de segmento (obligatoriamente Client Component).

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Reportar a tu servicio de observabilidad
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-page flex items-center justify-center p-10">
      <div className="w-[440px] max-w-full bg-card border border-subtle rounded-card shadow-card px-9 py-10 flex flex-col items-start gap-3">
        <div className="w-11 h-11 rounded-2xl bg-danger-bg text-danger flex items-center justify-center font-extrabold text-xl">
          !
        </div>
        <h1 className="font-display text-2xl font-bold text-ink mt-1">
          Algo salió mal
        </h1>
        <p className="text-[14.5px] leading-relaxed text-muted m-0">
          Ocurrió un error al cargar esta sección. Puedes reintentar o volver
          al inicio.
        </p>
        {error.digest && (
          <code className="text-xs text-placeholder">Ref: {error.digest}</code>
        )}
        <div className="flex gap-3 mt-3">
          <button
            type="button"
            onClick={reset}
            className="h-[46px] px-[22px] rounded-field bg-brand hover:bg-brand-hover text-on-brand font-display font-bold text-sm cursor-pointer transition-[transform,background-color] duration-200 active:scale-[0.97]"
          >
            Reintentar
          </button>
          <Link
            href="/"
            className="h-[46px] px-[22px] rounded-field border-[1.5px] border-subtle text-ink font-semibold text-sm flex items-center transition-transform duration-200 active:scale-[0.97]"
          >
            Ir al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
