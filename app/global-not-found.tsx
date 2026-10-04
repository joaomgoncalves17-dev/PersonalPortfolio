import type { Metadata } from "next";
import Link from "next/link";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

// 404 para qualquer endereço que não exista. Fica fora do layout de [lang],
// por isso mostra as duas línguas e repete o essencial do cabeçalho.
const plexSans = IBM_Plex_Sans({ variable: "--font-plex-sans", subsets: ["latin"], weight: ["400", "500", "600"] });
const plexMono = IBM_Plex_Mono({ variable: "--font-plex-mono", subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "404 | João Gonçalves",
};

const container = "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8";
const button =
  "inline-flex min-h-11 items-center justify-center px-5 text-sm font-medium transition-colors duration-200";

export default function GlobalNotFound() {
  return (
    <html lang="pt" className={`${plexSans.variable} ${plexMono.variable} antialiased`}>
      <body className="flex min-h-[100dvh] flex-col font-sans">
        <header className="border-b border-line">
          <div className={`${container} flex h-16 items-center`}>
            <Link href="/pt" className="flex flex-col leading-tight">
              <span className="text-sm font-semibold">João Gonçalves</span>
              <span className="font-mono text-[11px] text-muted">sysadmin</span>
            </Link>
          </div>
        </header>
        <main className={`${container} flex flex-1 flex-col justify-center py-20`}>
          <p className="font-mono text-sm text-accent">404</p>
          <h1 className="mt-4 text-4xl leading-[1.05] font-semibold tracking-tight md:text-6xl">Página não encontrada.</h1>
          <p className="mt-3 text-xl text-muted md:text-2xl">Page not found.</p>
          <p className="mt-8 max-w-[55ch] leading-relaxed text-muted">
            O endereço pode estar errado ou a página já não existir.
            <br />
            The address may be wrong or the page no longer exists.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/pt" className={`${button} bg-accent text-on-accent hover:bg-ink hover:text-bg`}>
              Voltar ao início
            </Link>
            <Link href="/en" lang="en" className={`${button} border border-ink/80 hover:bg-ink hover:text-bg`}>
              Back to home
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
