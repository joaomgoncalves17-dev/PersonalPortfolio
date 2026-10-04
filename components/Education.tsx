import type { Dictionary, EducationItem } from "@/content/types";
import { Reveal } from "./Reveal";
import { container, sectionTitle } from "./ui";

const marker: Record<EducationItem["state"], string> = {
  done: "border-text bg-text",
  current: "border-accent bg-accent",
  planned: "border-muted bg-bg",
};

export function Education({ education }: { education: Dictionary["education"] }) {
  return (
    <section id="formacao" className="border-t border-border py-24 md:py-32">
      <div className={`${container} grid gap-12 lg:grid-cols-12`}>
        <Reveal className="lg:col-span-4">
          <h2 className={`${sectionTitle}`}>{education.title}</h2>
        </Reveal>
        {/* A linha vertical da cronologia é o ::before da lista. */}
        <ol className="relative before:absolute before:top-2 before:bottom-2 before:left-[5px] before:w-px before:bg-border lg:col-span-7 lg:col-start-6">
          {education.items.map((item, i) => (
            <li key={item.title} className="relative pb-12 pl-8 last:pb-0">
              <Reveal delay={i * 0.08} className="grid gap-2">
                <span
                  className={`absolute top-1.5 left-0 size-[11px] rounded-full border-2 ${marker[item.state]}`}
                  aria-hidden
                />
                <p className="font-mono text-xs text-muted">{item.period}</p>
                <h3 className="text-xl font-medium tracking-tight">{item.title}</h3>
                <p className="text-sm text-muted">{item.place}</p>
                <p className="max-w-[55ch] leading-relaxed text-muted">{item.detail}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
