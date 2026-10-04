import Image from "next/image";
import { ArrowDown, DownloadSimple } from "@phosphor-icons/react/dist/ssr";
import type { Dictionary } from "@/content/types";
import { Reveal } from "./Reveal";
import { buttonPrimary, buttonSecondary, container } from "./ui";

type Props = { hero: Dictionary["hero"]; name: string; photo?: string; cv: string };

export function Hero({ hero, name, photo, cv }: Props) {
  return (
    <section id="top" className={`${container} grid gap-12 pt-14 pb-20 md:pt-20 lg:grid-cols-12 lg:items-center lg:gap-10 lg:pt-24 lg:pb-28`}>
      <div className="lg:col-span-7">
        <Reveal on="load">
          {/* Único ponto colorido da página: indica disponibilidade real. */}
          <p className="inline-flex items-center gap-2 text-sm text-muted">
            <span className="size-1.5 rounded-full bg-accent" aria-hidden />
            {hero.availability}
          </p>
        </Reveal>
        <Reveal on="load" delay={0.08}>
          <h1 className="mt-6 text-4xl leading-[1.05] font-semibold tracking-tighter text-balance md:text-5xl lg:text-6xl">
            {hero.headline[0]}
            <br />
            <span className="text-muted">{hero.headline[1]}</span>
          </h1>
        </Reveal>
        <Reveal on="load" delay={0.16}>
          <p className="mt-6 max-w-[52ch] text-base leading-relaxed text-muted md:text-lg">{hero.subtext}</p>
        </Reveal>
        <Reveal on="load" delay={0.24} className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="#projetos" className={buttonPrimary}>
            {hero.ctaProjects}
            <ArrowDown size={16} weight="bold" aria-hidden />
          </a>
          <a href={cv} download className={buttonSecondary}>
            <DownloadSimple size={16} weight="bold" aria-hidden />
            {hero.ctaCv}
          </a>
        </Reveal>
      </div>

      <Reveal on="load" delay={0.2} className="lg:col-span-5">
        <aside className="rounded-[var(--radius-ui)] border border-border bg-surface p-5 sm:p-6">
          <div className="flex items-center gap-4">
            {photo ? (
              <Image
                src={photo}
                alt={hero.photoAlt}
                width={72}
                height={72}
                priority
                className="size-[72px] rounded-[var(--radius-ui)] object-cover grayscale-[30%]"
              />
            ) : (
              <div
                className="flex size-[72px] items-center justify-center rounded-[var(--radius-ui)] border border-border bg-bg font-mono text-lg text-muted"
                aria-hidden
              >
                JG
              </div>
            )}
            <div>
              <p className="font-medium">{name}</p>
              <p className="text-sm text-muted">{hero.role}</p>
            </div>
          </div>
          <dl className="mt-6 grid gap-4">
            {hero.profile.map((row) => (
              <div key={row.label} className="grid grid-cols-[7rem_1fr] gap-3 text-sm">
                <dt className="font-mono text-xs leading-5 text-muted">{row.label}</dt>
                <dd className="leading-5">{row.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </Reveal>
    </section>
  );
}
