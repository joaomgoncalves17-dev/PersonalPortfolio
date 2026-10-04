import type { Locale, PageKey } from "@/content/types";

// Classes partilhadas. Cantos retos em todo o site.
export const container = "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8";

const buttonBase =
  "inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap px-5 text-sm font-medium transition-[transform,background-color,border-color,color] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98]";

export const buttonPrimary = `${buttonBase} bg-accent text-on-accent hover:bg-ink hover:text-bg`;
export const buttonSecondary = `${buttonBase} border border-ink/80 text-ink hover:bg-ink hover:text-bg`;

// Link de texto com seta, usado nos resumos da página inicial.
export const textLink =
  "group inline-flex min-h-11 items-center gap-2 text-sm font-medium underline decoration-line underline-offset-[6px] transition-colors duration-200 hover:decoration-accent";

export const label = "font-mono text-xs text-muted";

export const tag = "border border-line px-2 py-1 font-mono text-xs";

// Escala de z-index do projeto.
export const zIndex = { nav: "z-30", menu: "z-40" };

export const href = (lang: Locale, page?: PageKey, hash?: string) =>
  `/${lang}${page ? `/${page}` : ""}${hash ? `#${hash}` : ""}`;
