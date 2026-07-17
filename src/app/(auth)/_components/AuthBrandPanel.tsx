import Link from "next/link";
import BrandIcon from "@/components/brand/BrandIcon";
import { BRAND } from "@/content/brand";
import { AUTH_IMAGE, BRAND_PANEL } from "./content";

// Left-hand image panel of the split-screen auth layout. Hidden below `lg`
// (the mock's `isMobile` breakpoint becomes a Tailwind breakpoint per the
// migrate-design-templates skill — no resize listener needed).
export default function AuthBrandPanel() {
  return (
    <aside className="relative hidden lg:flex w-full flex-1 min-w-0 shrink-0 overflow-hidden bg-wv-navy">
      {/* eslint-disable-next-line @next/next/no-img-element -- local static asset, no next/image config needed */}
      <img
        src={AUTH_IMAGE.src}
        alt={AUTH_IMAGE.alt}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-wv-navy/15 via-wv-navy/75 to-wv-navy-deep/90"
      />

      <div className="relative z-10 flex h-full w-full flex-col justify-between p-11">
        <Link
          href="/"
          className="inline-flex w-fit items-center gap-2.5 rounded-[10px] outline-none focus-visible:shadow-focus"
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-wv-mint">
            <BrandIcon size={20} tone="navy" />
          </span>
          <span className="font-heading text-[21px] font-bold text-white">
            {BRAND}
          </span>
        </Link>

        <div className="flex max-w-110 flex-col gap-4.5">
          <h2 className="font-heading text-[34px] font-extrabold leading-[1.2] text-white text-pretty m-0">
            {BRAND_PANEL.headline}
          </h2>
          <p className="m-0 text-base font-medium leading-relaxed text-white/82">
            {BRAND_PANEL.subhead}
          </p>
          <div className="mt-1.5 flex items-center gap-2.5">
            {BRAND_PANEL.badges.map((badge) => (
              <span
                key={badge.label}
                className={
                  badge.tone === "mint"
                    ? "rounded-full border border-wv-mint/50 bg-wv-mint/[0.18] px-3.25 py-1.5 text-[12.5px] font-extrabold text-wv-mint-light"
                    : "rounded-full border border-white/22 bg-white/10 px-3.25 py-1.5 text-[12.5px] font-bold text-white/85"
                }
              >
                {badge.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
