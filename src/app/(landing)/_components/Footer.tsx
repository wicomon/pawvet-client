import BrandIcon from "@/components/brand/BrandIcon";
import { BRAND, SALES_EMAIL, whatsappUrl } from "@/content/brand";

export default function Footer() {
  return (
    <footer className="bg-wv-navy-deep text-[#9FB6C9]">
      <div className="mx-auto flex max-w-290 flex-col gap-10 px-6 py-14 pb-10 sm:px-8">
        <div className="flex flex-wrap items-start justify-between gap-10">
          <div className="flex max-w-75 flex-col gap-3.5">
            <div className="flex items-center gap-2.5">
              <span className="grid h-7.5 w-7.5 place-items-center rounded-[9px] bg-wv-mint">
                <BrandIcon size={16} tone="navy" />
              </span>
              <span className="font-heading text-lg font-bold text-white">
                {BRAND}
              </span>
            </div>
            <p className="text-[14.5px] leading-relaxed">
              El sistema de gestión en la nube para clínicas veterinarias y
              pet shops del Perú.
            </p>
          </div>

          <div className="flex flex-wrap gap-16">
            <div className="flex flex-col gap-3">
              <span className="text-[13px] font-extrabold uppercase tracking-wide text-white">
                Producto
              </span>
              <a
                href="#modulos"
                className="text-[14.5px] transition-colors duration-200 ease-out hover:text-white"
              >
                Módulos
              </a>
              <a
                href="#precios"
                className="text-[14.5px] transition-colors duration-200 ease-out hover:text-white"
              >
                Precios
              </a>
              <a
                href="#roi"
                className="text-[14.5px] transition-colors duration-200 ease-out hover:text-white"
              >
                Retorno de inversión
              </a>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-[13px] font-extrabold uppercase tracking-wide text-white">
                Contacto
              </span>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14.5px] transition-colors duration-200 ease-out hover:text-white"
              >
                WhatsApp ventas
              </a>
              <a
                href={`mailto:${SALES_EMAIL}`}
                className="text-[14.5px] transition-colors duration-200 ease-out hover:text-white"
              >
                {SALES_EMAIL}
              </a>
              <span className="text-[14.5px]">Lima, Perú</span>
            </div>
          </div>

          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-2xl border border-wv-mint bg-[#0E3A2F] px-5 py-4 text-white outline-none transition-colors duration-200 ease-out hover:bg-[#114536] focus-visible:shadow-focus"
          >
            <div className="grid h-10 w-10 place-items-center rounded-full bg-wv-mint font-heading text-[13px] font-extrabold text-[#06231B]">
              WA
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[15px] font-extrabold">
                Habla con ventas
              </span>
              <span className="text-[13px] text-[#9FD9C7]">
                Respuesta en menos de 5 min
              </span>
            </div>
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2.5 border-t border-[#12344F] pt-5 text-[13px]">
          <span>© 2026 {BRAND}. Todos los derechos reservados.</span>
          <div className="flex gap-5">
            <a
              href="#"
              className="transition-colors duration-200 ease-out hover:text-white"
            >
              Términos
            </a>
            <a
              href="#"
              className="transition-colors duration-200 ease-out hover:text-white"
            >
              Privacidad
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
