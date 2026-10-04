import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getDictionary } from "@/content";
import { site } from "@/content/site";
import { hasLocale, locales } from "@/content/types";
import "../globals.css";

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f4f4" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1011" },
  ],
};

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { meta } = getDictionary(lang);
  return {
    title: { default: meta.title, template: `%s | ${site.name}` },
    description: meta.description,
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
  const dict = getDictionary(lang);

  return (
    <html lang={lang} className={`${plexSans.variable} ${plexMono.variable} antialiased`}>
      <body className="flex min-h-[100dvh] flex-col font-sans">
        <SiteHeader lang={lang} nav={dict.nav} name={site.name} />
        <main className="flex-1">{children}</main>
        <SiteFooter lang={lang} dict={dict} name={site.name} email={site.email} />
      </body>
    </html>
  );
}
