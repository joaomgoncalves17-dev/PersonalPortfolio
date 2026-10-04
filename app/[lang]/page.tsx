import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { ImageSlot } from "@/components/ImageSlot";
import { Reveal } from "@/components/Reveal";
import { StatusTag } from "@/components/StatusTag";
import { buttonPrimary, buttonSecondary, container, href, label, textLink } from "@/components/ui";
import { getCertifications, getDictionary } from "@/content";
import { site } from "@/content/site";
import { hasLocale } from "@/content/types";

// Cabeçalho de bloco da página inicial: título à esquerda, link para a página completa à direita.
function BlockHeader({ title, link, linkHref }: { title: string; link: string; linkHref: string }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
      <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h2>
      <Link href={linkHref} className={textLink}>
        {link}
        <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
      </Link>
    </div>
  );
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);
  const [google] = getCertifications(t);
  const learning = [...t.education.learningItems, t.education.training[0]];

  return (
    <>
      {/* Topo: texto à esquerda, foto à direita. */}
      <section className={`${container} grid gap-10 pt-12 pb-16 md:pt-20 md:pb-24 lg:grid-cols-12 lg:items-end lg:gap-12`}>
        <div className="lg:col-span-8">
          <Reveal on="load">
            <p className="font-mono text-xs text-accent">{t.home.availability}</p>
          </Reveal>
          <Reveal on="load" delay={0.08}>
            <h1 className="mt-6 text-[2.6rem] leading-[1.02] font-semibold tracking-tight sm:text-6xl lg:text-7xl">
              {t.home.headline[0]}
              <br />
              {t.home.headline[1]}
            </h1>
          </Reveal>
          <Reveal on="load" delay={0.16}>
            <p className="mt-6 max-w-[54ch] text-base leading-relaxed text-muted md:text-lg">{t.home.subtext}</p>
          </Reveal>
          <Reveal on="load" delay={0.24} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={href(lang, "projects")} className={buttonPrimary}>
              {t.home.ctaProjects}
            </Link>
            <Link href={href(lang, "contact")} className={buttonSecondary}>
              {t.home.ctaContact}
            </Link>
          </Reveal>
        </div>
        <Reveal on="load" delay={0.2} className="max-w-xs sm:max-w-sm lg:col-span-4 lg:max-w-none">
          <ImageSlot
            src={site.photo}
            alt={t.home.photoAlt}
            ratio="aspect-[4/5]"
            pending={t.common.imagePending}
            sizes="(min-width: 1024px) 33vw, 384px"
            priority
          />
        </Reveal>
      </section>

      {/* Resumo "sobre": uma frase grande. */}
      <section className="border-t border-line">
        <Reveal className={`${container} py-16 md:py-24`}>
          <p className="max-w-[34ch] text-2xl leading-snug font-medium tracking-tight md:text-4xl">{t.home.aboutLead}</p>
          <Link href={href(lang, "about")} className={`${textLink} mt-8`}>
            {t.common.readMore}
            <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </Reveal>
      </section>

      {/* Formação: diploma em destaque e o que está em curso. */}
      <section className="border-t border-line">
        <div className={`${container} py-16 md:py-24`}>
          <Reveal>
            <BlockHeader title={t.home.educationTitle} link={t.common.allEducation} linkHref={href(lang, "education")} />
          </Reveal>
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12">
            <Reveal className="lg:col-span-7">
              <ImageSlot
                src={google.image}
                alt={google.imageAlt ?? google.title}
                ratio="aspect-[4/3]"
                pending={t.common.imagePending}
                sizes="(min-width: 1024px) 55vw, 100vw"
              />
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <StatusTag status={google.status} label={t.status[google.status]} />
                <span className={label}>{google.issuer}</span>
              </div>
              <h3 className="mt-3 text-xl font-semibold tracking-tight md:text-2xl">{google.title}</h3>
              {google.url && (
                <a href={google.url} target="_blank" rel="noopener noreferrer" className={`${textLink} mt-2`}>
                  {t.common.verify}
                  <ArrowUpRight size={14} aria-hidden />
                </a>
              )}
            </Reveal>
            <Reveal className="lg:col-span-5">
              <h3 className={label}>{t.education.learningTitle}</h3>
              <ul className="mt-4 border-t border-line">
                {learning.map((item) => (
                  <li key={item.id} className="border-b border-line py-5">
                    <p className="font-medium">{item.title}</p>
                    <p className="mt-1 text-sm text-muted">{item.issuer}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Projetos: índice com ligação para cada projeto. */}
      <section className="border-t border-line">
        <div className={`${container} py-16 md:py-24`}>
          <Reveal>
            <BlockHeader title={t.home.projectsTitle} link={t.common.allProjects} linkHref={href(lang, "projects")} />
          </Reveal>
          <ol className="mt-10">
            {t.projects.items.map((p) => (
              <li key={p.id}>
                <Reveal>
                  <Link
                    href={href(lang, "projects", p.id)}
                    className="group grid gap-3 border-t border-line py-6 transition-colors duration-200 hover:bg-panel md:grid-cols-12 md:items-center md:gap-6 md:px-3"
                  >
                    <span className="md:col-span-2">
                      <StatusTag status={p.status} label={t.status[p.status]} />
                    </span>
                    <span className="text-lg font-medium tracking-tight md:col-span-6 md:text-xl">{p.title}</span>
                    <span className="flex items-center justify-between gap-4 md:col-span-4">
                      <span className={label}>{p.stack.slice(0, 3).join(", ")}</span>
                      <ArrowRight
                        size={16}
                        className="shrink-0 text-muted transition-transform duration-200 group-hover:translate-x-1 group-hover:text-accent"
                        aria-hidden
                      />
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Competências: quatro colunas curtas. */}
      <section className="border-t border-line">
        <div className={`${container} py-16 md:py-24`}>
          <Reveal>
            <BlockHeader title={t.home.skillsTitle} link={t.common.allSkills} linkHref={href(lang, "skills")} />
          </Reveal>
          <div className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {t.skills.groups.map((g) => (
              <Reveal key={g.id} className="border-t-2 border-ink pt-4">
                <h3 className="font-semibold">{g.title}</h3>
                <ul className="mt-4 grid gap-2">
                  {g.items
                    .filter((i) => !i.learning)
                    .slice(0, 4)
                    .map((i) => (
                      <li key={i.name} className="font-mono text-[13px] text-muted">
                        {i.name}
                      </li>
                    ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contacto: faixa final. */}
      <section className="border-t border-line bg-panel">
        <Reveal className={`${container} grid gap-8 py-16 md:grid-cols-12 md:items-end md:py-20`}>
          <div className="md:col-span-8">
            <p className="text-2xl font-medium tracking-tight md:text-4xl">{t.home.contactLead}</p>
            <a href={`mailto:${site.email}`} className="mt-4 inline-block font-mono text-sm break-all text-muted underline-offset-4 hover:text-ink hover:underline">
              {site.email}
            </a>
          </div>
          <div className="md:col-span-4 md:text-right">
            <Link href={href(lang, "contact")} className={buttonPrimary}>
              {t.home.ctaContact}
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
