import { Reveal } from "./Reveal";
import { container } from "./ui";

// Cabeçalho comum das páginas interiores.
export function PageHeader({ title, intro }: { title: string; intro: string }) {
  return (
    <header className="border-b border-line">
      <Reveal on="load" className={`${container} pt-14 pb-12 md:pt-20 md:pb-16`}>
        <h1 className="text-4xl leading-[1.05] font-semibold tracking-tight md:text-6xl">{title}</h1>
        <p className="mt-5 max-w-[60ch] text-base leading-relaxed text-muted md:text-lg">{intro}</p>
      </Reveal>
    </header>
  );
}
