// PawControl "orbit + paw" mark, ported from the Brand Kit's icon-verde.svg
// (brand/kit/icon-{verde,navy,blanco}.svg in the design project — see
// src/assets/brand/kit/ for the source exports). Inline SVG, no raw hex:
// every fill/stroke goes through a `wv-*` token so recoloring stays
// consistent with the rest of the app. Reused in the real logo lockups
// (nav, auth panel, footer, dashboard sidebar) — see PawMark for the
// decorative paw-only mark used in eyebrows/floats.
type BrandIconTone = "verde" | "navy" | "white";

type BrandIconProps = {
  size?: number;
  tone?: BrandIconTone;
  className?: string;
};

const TONE_CLASSES: Record<BrandIconTone, { ring: string; paw: string; satellite: string }> = {
  verde: { ring: "stroke-wv-mint", paw: "fill-wv-mint", satellite: "fill-wv-navy" },
  navy: { ring: "stroke-wv-navy", paw: "fill-wv-navy", satellite: "fill-wv-mint" },
  white: { ring: "stroke-white", paw: "fill-white", satellite: "fill-wv-mint" },
};

export default function BrandIcon({
  size = 20,
  tone = "verde",
  className = "",
}: BrandIconProps) {
  const { ring, paw, satellite } = TONE_CLASSES[tone];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
    >
      <circle cx="32" cy="32" r="26" className={ring} strokeWidth="6" />
      <circle cx="53" cy="16" r="6.8" className={satellite} />
      <ellipse cx="32" cy="38" rx="9.2" ry="8.2" className={paw} />
      <ellipse cx="21" cy="25" rx="3.8" ry="4.6" className={paw} />
      <ellipse cx="32" cy="21" rx="3.8" ry="4.6" className={paw} />
      <ellipse cx="43" cy="25" rx="3.8" ry="4.6" className={paw} />
    </svg>
  );
}
