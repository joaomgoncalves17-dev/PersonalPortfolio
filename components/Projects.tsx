import Image from "next/image";
import type { Dictionary, Project } from "@/content/types";
import { Reveal } from "./Reveal";
import { container, sectionTitle } from "./ui";

function ProjectImage({ project, ratio, pending }: { project: Project; ratio: string; pending: string }) {
  return (
    <div className={`relative ${ratio} w-full overflow-hidden rounded-[var(--radius-ui)] border border-border bg-surface`}>
      {project.image ? (
        <Image src={project.image} alt={project.imageAlt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
      ) : (
        // TODO: substituir por imagem real em public/projects/.
        <div
          className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:16px_16px]"
          role="img"
          aria-label={project.imageAlt}
        >
          <span className="rounded-[var(--radius-ui)] bg-surface px-3 py-1.5 font-mono text-xs text-muted">{pending}</span>
        </div>
      )}
    </div>
  );
}

function ProjectText({ project }: { project: Project }) {
  return (
    <div>
      <p className="font-mono text-xs text-muted">
        {project.category}
        <span className="mx-2" aria-hidden>
          /
        </span>
        <span className="text-accent">{project.status}</span>
      </p>
      <h3 className="mt-3 text-2xl leading-tight font-semibold tracking-tight text-balance md:text-3xl">{project.title}</h3>
      <p className="mt-4 max-w-[60ch] leading-relaxed text-muted">{project.summary}</p>
      <ul className="mt-6 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <li key={tech} className="rounded-[var(--radius-ui)] border border-border px-2.5 py-1 font-mono text-xs">
            {tech}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Projects({ projects }: { projects: Dictionary["projects"] }) {
  const [featured, ...rest] = projects.items;
  return (
    <section id="projetos" className="border-t border-border py-24 md:py-32">
      <div className={container}>
        <Reveal>
          <h2 className={sectionTitle}>{projects.title}</h2>
        </Reveal>

        {/* Projeto principal: imagem larga + texto. */}
        <Reveal className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="lg:col-span-7">
            <ProjectImage project={featured} ratio="aspect-[16/10]" pending={projects.imagePending} />
          </div>
          <div className="lg:col-span-5">
            <ProjectText project={featured} />
          </div>
        </Reveal>

        {/* Restantes: texto primeiro e imagem mais pequena, deslocada para a direita. */}
        {rest.map((project) => (
          <Reveal key={project.title} className="mt-20 grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
            <div className="lg:order-2 lg:col-span-5 lg:col-start-8">
              <ProjectImage project={project} ratio="aspect-[4/3]" pending={projects.imagePending} />
            </div>
            <div className="lg:order-1 lg:col-span-6">
              <ProjectText project={project} />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
