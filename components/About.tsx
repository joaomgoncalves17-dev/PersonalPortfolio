import type { Dictionary } from "@/content/types";
import { Reveal } from "./Reveal";
import { container, sectionTitle } from "./ui";

export function About({ about }: { about: Dictionary["about"] }) {
  return (
    <section id="sobre" className="border-t border-border py-24 md:py-32">
      <Reveal className={`${container} grid lg:grid-cols-12`}>
        <div className="lg:col-span-7 lg:col-start-4">
          <h2 className={sectionTitle}>{about.title}</h2>
          <div className="mt-8 grid max-w-[65ch] gap-5 text-base leading-relaxed text-muted md:text-lg">
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
