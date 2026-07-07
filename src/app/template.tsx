// app/template.tsx — a diferencia de layout.tsx, se re-monta en cada
// navegación, así que anima la entrada de cada página con el mismo motion
// del login (rise + easing definidos en globals.css).

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="animate-[rise_400ms_var(--ease-out-strong)_both]">
      {children}
    </div>
  );
}
