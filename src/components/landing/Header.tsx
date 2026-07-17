import Link from "next/link";
import BrandIcon from "@/components/brand/BrandIcon";
import { BRAND } from "./content";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-wv-border bg-wv-bg/90 backdrop-blur-md">
      <div className="mx-auto flex h-17 max-w-290 items-center justify-between gap-6 px-6 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="grid h-8.5 w-8.5 place-items-center rounded-[10px] bg-wv-navy">
            <BrandIcon size={20} tone="verde" />
          </span>
          <span className="font-heading text-base font-bold text-wv-navy sm:text-xl">
            {BRAND}
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-[15px] font-semibold md:flex">
          <a
            href="#modulos"
            className="text-wv-muted transition-colors duration-200 ease-out hover:text-wv-navy"
          >
            Módulos
          </a>
          <a
            href="#roi"
            className="text-wv-muted transition-colors duration-200 ease-out hover:text-wv-navy"
          >
            Retorno
          </a>
          <a
            href="#precios"
            className="text-wv-muted transition-colors duration-200 ease-out hover:text-wv-navy"
          >
            Precios
          </a>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Both links route to /login (no separate signup flow yet) — the
              secondary one is hidden below sm so the header never has to
              cram logo + 2 buttons into a ~360px viewport in one row. */}
          <Link
            href="/login"
            className="hidden h-11 items-center rounded-[10px] px-3.5 text-[15px] font-bold text-wv-navy outline-none transition-colors duration-200 ease-out focus-visible:shadow-focus sm:flex"
          >
            Iniciar sesión
          </Link>
          <Link
            href="/login"
            className="flex h-11 items-center rounded-[10px] bg-wv-navy px-4 text-[14px] font-bold text-white outline-none transition-[background-color,transform] duration-150 ease-out hover:bg-wv-navy-panel focus-visible:shadow-focus active:scale-[0.97] sm:px-5 sm:text-[15px]"
          >
            Prueba gratis
          </Link>
        </div>
      </div>
    </header>
  );
}
