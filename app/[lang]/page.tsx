import { notFound } from "next/navigation";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Education } from "@/components/Education";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { container } from "@/components/ui";
import { getDictionary } from "@/content";
import { site } from "@/content/site";
import { hasLocale } from "@/content/types";

export default async function Page({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);
  const cv = site.cv[lang];

  return (
    <>
      <Nav lang={lang} nav={t.nav} name={site.name} />
      <main>
        <Hero hero={t.hero} name={site.name} photo={site.photo} cv={cv} />
        <About about={t.about} />
        <Skills skills={t.skills} />
        <Projects projects={t.projects} />
        <Education education={t.education} />
        <Contact
          contact={t.contact}
          ctaCv={t.hero.ctaCv}
          email={site.email}
          linkedin={site.linkedin}
          github={site.github}
          cv={cv}
        />
      </main>
      <footer className="border-t border-border py-8">
        <div className={`${container} flex flex-col gap-2 text-sm text-muted sm:flex-row sm:justify-between`}>
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <p>{t.footer.rights}</p>
        </div>
      </footer>
    </>
  );
}
