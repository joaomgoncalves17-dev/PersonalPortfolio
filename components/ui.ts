// Classes partilhadas para manter botões e contentores consistentes.
export const container = "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8";

const buttonBase =
  "inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-ui)] px-4 text-sm font-medium transition-[transform,background-color,border-color,color] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98]";

export const buttonPrimary = `${buttonBase} bg-accent text-on-accent hover:bg-text hover:text-bg`;
export const buttonSecondary = `${buttonBase} border border-border text-text hover:border-text`;

export const sectionTitle = "text-3xl font-semibold tracking-tight md:text-4xl";

// Escala de z-index do projeto.
export const zIndex = { nav: "z-30", menu: "z-40" };
