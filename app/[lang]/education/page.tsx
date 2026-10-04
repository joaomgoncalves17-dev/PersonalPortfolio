import { notFound } from "next/navigation";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { ImageSlot } from "@/components/ImageSlot";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { StatusTag } from "@/components/StatusTag";
import { buttonSecondary, container, label } from "@/components/ui";
import { getCertifications, getDictionary, pageMetadata } from "@/content";
import { hasLocale, type Credential, type Dictionary } from "@/content/types";

export const generateMetadata = ({ params }: PageProps<"/[lang]/education">) =>
  pageMetadata(params, (d) => d.education);

function CredentialList({ title, items, t }: { title: string; items: Credential[]; t: Dictionary }) {
  return (
    <section className="grid gap-6 border-t border-line py-12 md:py-16 lg:grid-cols-12 lg:gap-12">
      <Reveal className="lg:col-span-4">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h2>
      </Reveal>
      <ol className="lg:col-span-8">
        {items.map((c) => (
          <li key={c.id} id={c.id} className="border-b border-line py-6 first:pt-0 last:border-b-0">
            <Reveal>
              <div className="flex flex-wrap items-center gap-3">
                <StatusTag status={c.status} label={t.status[c.status]} />
                <span className={label}>{c.issuer}</span>
              </div>
              <h3 className="mt-3 text-xl font-semibold tracking-tight">{c.title}</h3>
              <p className="mt-2 max-w-[60ch] leading-relaxed text-muted">{c.detail}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default async function Education({ params }: PageProps<"/[lang]/education">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);
  const certifications = getCertifications(t);

  return (
    <>
      <PageHeader title={t.education.title} intro={t.education.intro} />

      <div className={container}>
        {/* Certificações: diploma em destaque. */}
        <section className="py-12 md:py-16">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{t.education.certificationsTitle}</h2>
          </Reveal>
          {certifications.map((c) => (
            <Reveal key={c.id} className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
              <div id={c.id} className="lg:col-span-7">
                <ImageSlot
                  src={c.image}
                  alt={c.imageAlt ?? c.title}
                  ratio="aspect-[4/3]"
                  pending={t.common.imagePending}
                  sizes="(min-width: 1024px) 55vw, 100vw"
                />
              </div>
              <div className="lg:col-span-5">
                <div className="flex flex-wrap items-center gap-3">
                  <StatusTag status={c.status} label={t.status[c.status]} />
                  <span className={label}>{c.issuer}</span>
                </div>
                <h3 className="mt-4 text-2xl leading-tight font-semibold tracking-tight md:text-3xl">{c.title}</h3>
                <p className="mt-4 max-w-[50ch] leading-relaxed text-muted">{c.detail}</p>
                {c.url && (
                  <a href={c.url} target="_blank" rel="noopener noreferrer" className={`${buttonSecondary} mt-6`}>
                    {t.common.verify}
                    <ArrowUpRight size={16} aria-hidden />
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </section>

        <CredentialList title={t.education.learningTitle} items={t.education.learningItems} t={t} />
        <CredentialList title={t.education.trainingTitle} items={t.education.training} t={t} />
      </div>
    </>
  );
}
