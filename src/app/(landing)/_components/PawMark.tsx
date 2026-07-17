// Paw-print mark built from plain divs (matches the design's approach —
// no emoji, so it scales cleanly and can be recolored via `color`).
// Reused in the nav logo, hero badge, section eyebrows and the footer.
type PawMarkProps = {
  size?: number;
  color?: string;
  className?: string;
};

export default function PawMark({
  size = 20,
  color = "currentColor",
  className = "",
}: PawMarkProps) {
  const pad = size / 20;

  return (
    <span
      className={`relative inline-block shrink-0 ${className}`}
      style={{ width: size, height: size * 0.9 }}
      aria-hidden="true"
    >
      <span
        className="absolute rounded-[50%/46%]"
        style={{
          left: pad * 4,
          top: pad * 8,
          width: pad * 12,
          height: pad * 9,
          background: color,
        }}
      />
      <span
        className="absolute rounded-full"
        style={{
          left: pad * 1,
          top: pad * 3,
          width: pad * 5,
          height: pad * 6,
          background: color,
        }}
      />
      <span
        className="absolute rounded-full"
        style={{
          left: pad * 7.5,
          top: 0,
          width: pad * 5,
          height: pad * 6,
          background: color,
        }}
      />
      <span
        className="absolute rounded-full"
        style={{
          left: pad * 14,
          top: pad * 3,
          width: pad * 5,
          height: pad * 6,
          background: color,
        }}
      />
    </span>
  );
}
