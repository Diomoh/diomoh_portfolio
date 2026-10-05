import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { DM_Mono, DM_Sans, Plus_Jakarta_Sans } from "next/font/google";
import { getContent } from "@/content";
import { hasLocale, locales } from "@/i18n/config";
import "./globals.css";

// Mêmes polices que Learn : DM Sans (texte), Plus Jakarta Sans (titres), DM Mono (chiffres).
const body = DM_Sans({ variable: "--font-body", subsets: ["latin"] });
const mono = DM_Mono({ variable: "--font-dm-mono", subsets: ["latin"], weight: "400" });
const display = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const generateStaticParams = () => locales.map((lang) => ({ lang }));

export const viewport: Viewport = { themeColor: "#0d0d0e" };

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { meta } = getContent(lang);
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
    title: meta.title,
    description: meta.description,
    icons: { icon: "/favicon.svg" },
    alternates: { languages: { fr: "/fr", en: "/en", "x-default": "/" } },
    openGraph: {
      title: meta.title,
      description: meta.description,
      images: ["/images/mohamed.jpg"],
      locale: lang === "fr" ? "fr_FR" : "en_US",
      type: "website",
    },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return (
    <html lang={lang} className={`${body.variable} ${display.variable} ${mono.variable}`}>
      {/* Certaines extensions (ColorZilla, Grammarly…) ajoutent des attributs au body avant React. */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
