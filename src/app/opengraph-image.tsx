// app/opengraph-image.tsx — OG image generada en el edge con next/og.
// Next la sirve automáticamente como <meta property="og:image">.
//
// Satori (el motor detrás de ImageResponse) no soporta className/Tailwind:
// no carga la hoja de estilos del app y solo entiende un subconjunto de CSS
// vía el prop `style`. Por eso este archivo se mantiene con estilos inline,
// reflejando en hex literal los mismos tokens de globals.css
// (brand #3d4ff0, accent #f5a524).

import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Plataforma educativa — tu ciclo, en un solo lugar";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#3d4ff0",
          padding: 72,
          fontFamily: "sans-serif",
          color: "#fff",
        }}
      >
        {/* Columna de texto */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 18,
                background: "rgba(255,255,255,0.16)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 28,
                fontWeight: 700,
              }}
            >
              V
            </div>
            <div style={{ fontSize: 32, fontWeight: 700 }}>Vdemia</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ fontSize: 58, fontWeight: 800, lineHeight: 1.15 }}>
              Tu ciclo, en un solo lugar.
            </div>
            <div style={{ fontSize: 26, color: "rgba(255,255,255,0.75)" }}>
              Cursos, entregas y progreso para alumnos y docentes.
            </div>
          </div>
        </div>

        {/* Motivo bento */}
        <div
          style={{
            width: 300,
            display: "flex",
            flexDirection: "column",
            gap: 16,
            justifyContent: "center",
          }}
        >
          <div
            style={{
              height: 150,
              borderRadius: 28,
              background: "rgba(255,255,255,0.14)",
              display: "flex",
              alignItems: "flex-end",
              padding: 20,
            }}
          >
            <div
              style={{
                width: "64%",
                height: 10,
                borderRadius: 99,
                background: "#fff",
              }}
            />
          </div>
          <div style={{ display: "flex", gap: 16 }}>
            <div
              style={{
                flex: 1,
                height: 110,
                borderRadius: 28,
                background: "#f5a524",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 34,
                fontWeight: 800,
              }}
            >
              88%
            </div>
            <div
              style={{
                flex: 1,
                height: 110,
                borderRadius: 28,
                background: "rgba(255,255,255,0.14)",
              }}
            />
          </div>
        </div>
      </div>
    ),
    size,
  );
}
