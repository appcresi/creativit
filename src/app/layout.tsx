import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Creativit - Diseño Web y Soluciones Digitales",
  description: "Transformamos ideas en experiencias digitales de alto impacto. Diseño web, desarrollo y branding para potenciar tu negocio.",
  keywords: ["diseño web", "desarrollo web", "marketing digital", "branding", "seo", "argentina", "buenos aires", "creativit"],
  authors: [{ name: "Synera Team" }],
  creator: "Creativit",
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://creativit.com.ar",
    title: "Creativit - Diseño Web y Soluciones Digitales",
    description: "Transformamos ideas en experiencias digitales de alto impacto.",
    siteName: "Creativit",
  },
  twitter: {
    card: "summary_large_image",
    title: "Creativit - Diseño Web y Soluciones Digitales",
    description: "Transformamos ideas en experiencias digitales de alto impacto.",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white selection:bg-cyan-500/30 selection:text-cyan-200`}
      >
        {children}
      </body>
    </html>
  );
}
