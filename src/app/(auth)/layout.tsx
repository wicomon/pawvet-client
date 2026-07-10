import Link from "next/link";
import PawMark from "@/components/landing/PawMark";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-screen flex items-center justify-center p-10 bg-wv-bg">
      <Link
        href="/"
        className="absolute left-6 top-6 inline-flex items-center gap-1.5 rounded-[10px] px-2.5 py-2 text-[14px] font-bold text-wv-navy outline-none transition-colors duration-200 ease-out hover:text-wv-teal focus-visible:shadow-focus"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M19 12H5" />
          <path d="M12 19l-7-7 7-7" />
        </svg>
        Volver al inicio
      </Link>

      <div className="w-[980px] max-w-full flex rounded-card overflow-hidden bg-white shadow-card border border-wv-border">
        {/* ===== Panel de marca ===== */}
        <div className="w-[420px] shrink-0 bg-wv-navy py-11 px-10 flex-col text-white hidden md:flex">
          <div className="flex items-center gap-2.5 animate-[rise_400ms_var(--ease-out-strong)_both]">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-wv-navy-panel">
              <PawMark size={20} color="var(--color-wv-mint)" />
            </span>
            <span className="font-heading text-[19px] font-bold text-white">
              WicoVet
            </span>
          </div>

          {/* motivo bento */}
          <div className="flex-1 flex items-center justify-center py-[30px]">
            <div className="w-60 grid grid-cols-[1.4fr_1fr] auto-rows-[72px] gap-3 animate-[rise_400ms_var(--ease-out-strong)_80ms_both]">
              <div className="row-span-2 rounded-[20px] bg-wv-navy-panel flex items-end p-3.5">
                <div className="w-full h-1.5 rounded-full bg-white/25">
                  <div className="w-[64%] h-full rounded-full bg-wv-mint" />
                </div>
              </div>
              <div className="rounded-[20px] bg-wv-mint flex items-center justify-center font-heading font-extrabold text-[22px] text-wv-navy">
                88%
              </div>
              <div className="rounded-[20px] bg-wv-navy-panel flex items-center justify-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-white/25" />
                <span className="w-2 h-2 rounded-full bg-wv-mint" />
                <span className="w-2 h-2 rounded-full bg-white/25" />
              </div>
            </div>
          </div>

          <div className="animate-[rise_400ms_var(--ease-out-strong)_140ms_both]">
            <div className="font-heading font-bold text-2xl leading-[1.3] mb-2.5">
              Toda tu clínica, en un solo lugar.
            </div>
            <div className="text-sm leading-relaxed text-white/70">
              Historias clínicas, citas y facturación para tu equipo
              veterinario.
            </div>
          </div>
        </div>

        {/* ===== Contenido ===== */}
        <div className="flex-1 py-11 px-8 sm:px-12 flex flex-col justify-center">
          {children}
        </div>
      </div>
    </div>
  );
}
