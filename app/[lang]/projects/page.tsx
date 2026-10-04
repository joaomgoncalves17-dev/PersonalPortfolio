import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { StatusTag } from "@/components/StatusTag";
import { container, label, tag } from "@/components/ui";
import { getDictionary, pageMetadata } from "@/content";
import { hasLocale } from "@/content/types";

export const generateMetadata = ({ params }: PageProps<"/[lang]/projects">) =>
  pageMetadata(params, (d) => d.projects);

function Detail({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className={label}>{title}</h3>
      <ul className="mt-3 grid gap-2">
        {items.map((item) => (
          <li key={item} className="grid grid-cols-[0.75rem_1fr] leading-relaxed">
            <span className="text-accent" aria-hidden>
              -
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function Projects({ params }: PageProps<"/[lang]/projects">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <>
      <PageHeader title={t.projects.title} intro={t.projects.intro} />

      <div className={container}>
        {t.projects.items.map((p, i) => (
          <article key={p.id} id={p.id} className="grid gap-8 border-b border-line py-14 last:border-b-0 md:py-20 lg:grid-cols-12 lg:gap-12">
            <Reveal className="lg:col-span-5">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-muted" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <StatusTag status={p.status} label={t.status[p.status]} />
              </div>
              <h2 className="mt-4 text-2xl leading-tight font-semibold tracking-tight text-balance md:text-4xl">{p.title}</h2>
              <p className="mt-4 max-w-[50ch] leading-relaxed text-muted">{p.summary}</p>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label={t.common.stack}>
                {p.stack.map((s) => (
                  <li key={s} className={tag}>
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal className="grid gap-8 lg:col-span-6 lg:col-start-7">
              <div className="border-l-2 border-accent pl-4">
                <h3 className={label}>{t.common.goal}</h3>
                <p className="mt-2 text-lg leading-snug font-medium">{p.goal}</p>
              </div>
              <Detail title={t.common.scope} items={p.scope} />
              <Detail title={t.common.deliverables} items={p.deliverables} />
            </Reveal>
          </article>
        ))}
      </div>
    </>
  );
}
