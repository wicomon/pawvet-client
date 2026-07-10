"use client";

import { useState } from "react";
import PawMark from "./PawMark";
import { MODULES } from "./content";

export default function Modules() {
  const [tab, setTab] = useState(0);
  const active = MODULES[tab];

  return (
    <section id="modulos" className="border-t border-wv-border bg-white">
      <div className="mx-auto max-w-[1160px] px-6 py-16 sm:px-8 md:py-20">
        <div className="mx-auto mb-11 flex max-w-[620px] flex-col items-center gap-3.5 text-center">
          <PawMark
            size={18}
            color="var(--color-wv-teal)"
            className="rotate-[-8deg]"
          />
          <h2 className="font-heading text-[32px] font-extrabold text-wv-navy sm:text-[38px]">
            Módulos que trabajan por ti
          </h2>
          <p className="text-lg leading-relaxed text-wv-muted">
            Empieza con lo que necesitas hoy y activa más módulos cuando tu
            clínica crezca.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Módulos de WicoVet"
          className="mb-9 flex flex-wrap justify-center gap-2.5"
        >
          {MODULES.map((mod, i) => {
            const isActive = i === tab;
            return (
              <button
                key={mod.label}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setTab(i)}
                className={`h-11 cursor-pointer rounded-[10px] border-[1.5px] px-5 text-[15px] font-bold outline-none transition-[background-color,color,border-color,transform] duration-200 ease-out focus-visible:shadow-focus active:scale-[0.97] ${
                  isActive
                    ? "border-wv-teal bg-wv-teal text-white"
                    : "border-wv-border bg-white text-wv-muted hover:border-wv-teal/50"
                }`}
              >
                {mod.label}
              </button>
            );
          })}
        </div>

        <p className="mx-auto mb-8 max-w-[560px] text-center text-sm font-semibold leading-relaxed text-wv-faint">
          Los recordatorios por WhatsApp y la facturación SUNAT son los
          últimos módulos del roadmap: llegan al final del desarrollo.
        </p>

        <div className="grid min-h-[300px] gap-11 rounded-[18px] border border-wv-border bg-wv-bg p-6 sm:p-11 md:grid-cols-2 md:items-center">
          <div
            key={active.label}
            className="flex flex-col gap-4 transition-opacity duration-200 ease-out"
          >
            <span className="w-fit rounded-full bg-wv-mint-soft px-3 py-1.5 text-xs font-extrabold uppercase tracking-wide text-wv-teal-hover">
              {active.tag}
            </span>
            <h3 className="font-heading text-[27px] font-bold text-wv-navy">
              {active.title}
            </h3>
            <p className="text-[16.5px] leading-relaxed text-wv-muted">
              {active.desc}
            </p>
            <div className="mt-1 flex flex-col gap-2.5">
              {active.points.map((point) => (
                <div key={point} className="flex items-center gap-2.5">
                  <span className="grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full bg-wv-mint text-[11px] font-extrabold text-white">
                    ✓
                  </span>
                  <span className="text-[15px] font-semibold text-wv-ink">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid h-[280px] place-items-center rounded-2xl border-[1.5px] border-dashed border-[#B9CFC7] [background:repeating-linear-gradient(45deg,#EAF2EF,#EAF2EF_10px,#E1ECE8_10px,#E1ECE8_20px)]">
            <span className="rounded-lg bg-white/85 px-3.5 py-2 font-mono text-[13px] text-wv-muted-2">
              {active.placeholder}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
