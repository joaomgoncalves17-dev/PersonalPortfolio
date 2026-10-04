import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import { getDictionary } from "@/content";
import { hasLocale, locales } from "@/content/types";
import "../globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f7f7" },
    { media: "(prefers-color-scheme: dark)", color: "#111213" },
  ],
};

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { meta } = getDictionary(lang);
  return {
    title: meta.title,
    description: meta.description,
    alternates: { languages: { pt: "/pt", en: "/en" } },
    openGraph: {
      title: meta.title,
      description: meta.description,
      locale: lang === "pt" ? "pt_PT" : "en_GB",
      type: "website",
    },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html lang={lang} className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="min-h-[100dvh] font-sans">{children}</body>
    </html>
  );
}
