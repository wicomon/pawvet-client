export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex items-center justify-center p-10 bg-page">
      <div className="w-[980px] max-w-full flex rounded-card overflow-hidden bg-card shadow-card border border-subtle">
        {/* ===== Panel de marca ===== */}
        <div className="w-[420px] shrink-0 bg-brand py-11 px-10 flex-col text-on-brand hidden md:flex">
          <div className="flex items-center gap-2.5 animate-[rise_400ms_var(--ease-out-strong)_both]">
            <div className="w-9 h-9 rounded-xl bg-on-brand-faint flex items-center justify-center font-display font-bold text-[17px]">
              V
            </div>
            <span className="font-display font-bold text-[19px]">Vdemia</span>
          </div>

          {/* motivo bento */}
          <div className="flex-1 flex items-center justify-center py-[30px]">
            <div className="w-60 grid grid-cols-[1.4fr_1fr] auto-rows-[72px] gap-3 animate-[rise_400ms_var(--ease-out-strong)_80ms_both]">
              <div className="row-span-2 rounded-[20px] bg-on-brand-faint flex items-end p-3.5">
                <div className="w-full h-1.5 rounded-full bg-on-brand-line">
                  <div className="w-[64%] h-full rounded-full bg-on-brand" />
                </div>
              </div>
              <div className="rounded-[20px] bg-accent flex items-center justify-center font-display font-extrabold text-[22px] text-accent-ink">
                88%
              </div>
              <div className="rounded-[20px] bg-on-brand-faint flex items-center justify-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-on-brand-line" />
                <span className="w-2 h-2 rounded-full bg-on-brand" />
                <span className="w-2 h-2 rounded-full bg-on-brand-line" />
              </div>
            </div>
          </div>

          <div className="animate-[rise_400ms_var(--ease-out-strong)_140ms_both]">
            <div className="font-display font-bold text-2xl leading-[1.3] mb-2.5">
              Tu ciclo, en un solo lugar.
            </div>
            <div className="text-sm leading-relaxed text-on-brand-muted">
              Cursos, entregas y progreso para alumnos y docentes.
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
