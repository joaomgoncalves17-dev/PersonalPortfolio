import { notFound } from "next/navigation";
import { ArrowUpRight, DownloadSimple, GithubLogo, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";
import { CopyEmail } from "@/components/CopyEmail";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { buttonPrimary, container, label } from "@/components/ui";
import { getDictionary, pageMetadata } from "@/content";
import { site } from "@/content/site";
import { hasLocale } from "@/content/types";

export const generateMetadata = ({ params }: PageProps<"/[lang]/contact">) =>
  pageMetadata(params, (d) => d.contact);

export default async function Contact({ params }: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);

  const links = [
    { href: site.linkedin, name: "LinkedIn", icon: LinkedinLogo },
    { href: site.github, name: "GitHub", icon: GithubLogo },
  ];

  return (
    <>
      <PageHeader title={t.contact.title} intro={t.contact.intro} />

      <div className={`${container} grid gap-12 py-16 md:py-24 lg:grid-cols-12`}>
        <Reveal className="lg:col-span-8">
          <p className={label}>{t.contact.emailLabel}</p>
          <a
            href={`mailto:${site.email}`}
            className="mt-3 block text-2xl font-medium tracking-tight break-all underline decoration-line underline-offset-8 hover:decoration-accent sm:text-4xl"
          >
            {site.email}
          </a>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CopyEmail email={site.email} labels={t.common} />
            <a href={site.cv[lang]} download className={buttonPrimary}>
              <DownloadSimple size={16} weight="bold" aria-hidden />
              {t.common.downloadCv}
            </a>
          </div>

          <h2 className={`${label} mt-16`}>{t.contact.elsewhere}</h2>
          <ul className="mt-4 border-t border-line">
            {links.map(({ href, name, icon: LinkIcon }) => (
              <li key={name}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-16 items-center justify-between border-b border-line text-lg transition-colors duration-200 hover:text-accent"
                >
                  <span className="flex items-center gap-3">
                    <LinkIcon size={22} aria-hidden />
                    {name}
                  </span>
                  <ArrowUpRight
                    size={18}
                    className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden
                  />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="lg:col-span-3 lg:col-start-10">
          <div className="border border-line bg-panel p-6">
            <h2 className="font-semibold">{t.contact.availabilityTitle}</h2>
            <dl className="mt-5 grid gap-4">
              {t.contact.availability.map((a) => (
                <div key={a.label}>
                  <dt className={label}>{a.label}</dt>
                  <dd className="mt-1">{a.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </>
  );
}
