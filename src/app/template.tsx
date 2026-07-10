// app/template.tsx — a diferencia de layout.tsx, se re-monta en cada
// navegación, así que anima la entrada de cada página.
//
// Usa `fade-in` (solo opacity), NO `rise` (opacity + transform): este wrapper
// envuelve TODA la página en cualquier ruta, así que cualquier elemento
// `fixed` dentro de él (p. ej. WhatsAppFab en el landing) queda atrapado por
// el `transform` como su "containing block" en vez de la ventana — el botón
// deja de comportarse como flotante y solo se ve al hacer scroll hasta el
// final del documento. Ver docs/whatsapp-fab-fixed-position.md.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="animate-[fade-in_400ms_var(--ease-out-strong)_both]">
      {children}
    </div>
  );
}
