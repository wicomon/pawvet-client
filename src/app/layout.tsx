import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Self-hosted (next/font/local) instead of next/font/google: the google
// loader fetches each family from fonts.googleapis.com at compile time with
// no timeout, which can hang `next dev`/`next build` indefinitely on a flaky
// or restricted connection. Local files remove that network dependency
// entirely. The file is the variable-font woff2 (latin subset), so a single
// file covers the whole weight range used across the app (200–800: body
// text renders at the default weight 400, headings go up to 800).
//
// Single family for the whole app (landing + dashboard) — see
// docs/fuentes-y-cuelgue-de-dev.md. globals.css maps all four semantic
// tokens (--font-display/sans/heading/body) to this one variable so
// existing component classNames don't need to change.
const jakarta = localFont({
  src: "../assets/fonts/PlusJakartaSans-Variable.woff2",
  variable: "--font-jakarta",
  weight: "200 800",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vdemia",
  description: "Cursos, entregas y progreso para alumnos y docentes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
