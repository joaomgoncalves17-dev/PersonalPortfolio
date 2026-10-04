import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { container } from "@/components/ui";
import { getDictionary, pageMetadata } from "@/content";
import { hasLocale } from "@/content/types";

export const generateMetadata = ({ params }: PageProps<"/[lang]/skills">) =>
  pageMetadata(params, (d) => d.skills);

export default async function Skills({ params }: PageProps<"/[lang]/skills">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <>
      <PageHeader title={t.skills.title} intro={t.skills.intro} />

      <div className={`${container} py-8 md:py-12`}>
        {t.skills.groups.map((g) => (
          <section key={g.id} id={g.id} className="grid gap-6 border-b border-line py-10 last:border-b-0 md:py-14 lg:grid-cols-12 lg:gap-12">
            <Reveal className="lg:col-span-4">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{g.title}</h2>
              <p className="mt-3 max-w-[40ch] leading-relaxed text-muted">{g.summary}</p>
            </Reveal>
            <Reveal className="lg:col-span-8">
              <ul className="grid gap-x-8 sm:grid-cols-2">
                {g.items.map((i) => (
                  <li key={i.name} className="flex items-baseline justify-between gap-4 border-t border-line py-3">
                    <span className={i.learning ? "text-muted" : ""}>{i.name}</span>
                    {i.learning && <span className="shrink-0 font-mono text-[11px] text-accent">{t.common.learning}</span>}
                  </li>
                ))}
              </ul>
            </Reveal>
          </section>
        ))}
      </div>
    </>
  );
}
