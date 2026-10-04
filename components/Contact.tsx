import { ArrowUpRight, DownloadSimple, GithubLogo, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";
import type { Dictionary } from "@/content/types";
import { CopyEmail } from "./CopyEmail";
import { Reveal } from "./Reveal";
import { buttonPrimary, container, sectionTitle } from "./ui";

type Props = {
  contact: Dictionary["contact"];
  ctaCv: string;
  email: string;
  linkedin: string;
  github: string;
  cv: string;
};

export function Contact({ contact, ctaCv, email, linkedin, github, cv }: Props) {
  const links = [
    { href: linkedin, label: "LinkedIn", icon: LinkedinLogo },
    { href: github, label: "GitHub", icon: GithubLogo },
  ];

  return (
    <section id="contacto" className="border-t border-border py-24 md:py-32">
      <Reveal className={container}>
        <h2 className={sectionTitle}>{contact.title}</h2>
        <p className="mt-6 max-w-[55ch] text-base leading-relaxed text-muted md:text-lg">{contact.body}</p>

        <div className="mt-12 rounded-[var(--radius-ui)] border border-border bg-surface p-6 sm:p-8">
          <p className="font-mono text-xs text-muted">{contact.emailLabel}</p>
          <a
            href={`mailto:${email}`}
            className="mt-2 block text-xl font-medium tracking-tight break-all underline-offset-4 hover:underline sm:text-3xl md:text-4xl"
          >
            {email}
          </a>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <CopyEmail email={email} labels={contact} />
            <a href={cv} download className={buttonPrimary}>
              <DownloadSimple size={16} weight="bold" aria-hidden />
              {ctaCv}
            </a>
          </div>
        </div>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {links.map(({ href, label, icon: LinkIcon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-14 items-center justify-between rounded-[var(--radius-ui)] border border-border px-5 transition-colors duration-200 hover:border-text"
              >
                <span className="flex items-center gap-3">
                  <LinkIcon size={20} weight="regular" aria-hidden />
                  {label}
                </span>
                <ArrowUpRight
                  size={16}
                  weight="bold"
                  className="text-muted transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden
                />
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
