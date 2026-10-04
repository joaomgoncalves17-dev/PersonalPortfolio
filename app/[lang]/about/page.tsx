import Link from "next/link";
import { notFound } from "next/navigation";
import { DownloadSimple } from "@phosphor-icons/react/dist/ssr";
import { ImageSlot } from "@/components/ImageSlot";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { buttonPrimary, buttonSecondary, container, href, label } from "@/components/ui";
import { getDictionary, pageMetadata } from "@/content";
import { site } from "@/content/site";
import { hasLocale } from "@/content/types";

export const generateMetadata = ({ params }: PageProps<"/[lang]/about">) =>
  pageMetadata(params, (d) => d.about);

export default async function About({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <>
      <PageHeader title={t.about.title} intro={t.about.intro} />

      <section className={`${container} grid gap-12 py-16 md:py-24 lg:grid-cols-12`}>
        <Reveal className="lg:col-span-7">
          <div className="grid max-w-[65ch] gap-6 text-base leading-relaxed md:text-lg">
            {t.about.paragraphs.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a href={site.cv[lang]} download className={buttonPrimary}>
              <DownloadSimple size={16} weight="bold" aria-hidden />
              {t.common.downloadCv}
            </a>
            <Link href={href(lang, "contact")} className={buttonSecondary}>
              {t.home.ctaContact}
            </Link>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-4 lg:col-start-9">
          <div className="max-w-sm lg:max-w-none">
            <ImageSlot
              src={site.photo}
              alt={t.home.photoAlt}
              ratio="aspect-[4/5]"
              pending={t.common.imagePending}
              sizes="(min-width: 1024px) 30vw, 384px"
            />
          </div>
          <dl className="mt-8 grid gap-5">
            {t.about.facts.map((f) => (
              <div key={f.label}>
                <dt className={label}>{f.label}</dt>
                <dd className="mt-1">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      <section className="border-t border-line bg-panel">
        <div className={`${container} py-16 md:py-24`}>
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{t.about.principlesTitle}</h2>
          </Reveal>
          <div className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2">
            {t.about.principles.map((p) => (
              <Reveal key={p.title} className="bg-panel p-6 md:p-8">
                <h3 className="text-lg font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-3 max-w-[45ch] leading-relaxed text-muted">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
