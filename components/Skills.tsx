import {
  ClockCounterClockwise,
  Code,
  HardDrives,
  Network,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import type { Dictionary, SkillGroup } from "@/content/types";
import { Reveal } from "./Reveal";
import { container, sectionTitle } from "./ui";

const icons: Record<SkillGroup["id"], Icon> = {
  systems: HardDrives,
  networking: Network,
  operations: ClockCounterClockwise,
  development: Code,
};

export function Skills({ skills }: { skills: Dictionary["skills"] }) {
  return (
    <section id="competencias" className="border-t border-border py-24 md:py-32">
      <div className={container}>
        <Reveal>
          <h2 className={sectionTitle}>{skills.title}</h2>
        </Reveal>
        {/* Grelha 2x2 com linhas de 1px; o primeiro grupo (área principal) tem fundo tingido. */}
        <div className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-ui)] border border-border bg-border md:grid-cols-2">
          {skills.groups.map((group, i) => {
            const GroupIcon = icons[group.id];
            const featured = i === 0;
            return (
              <Reveal
                key={group.id}
                delay={i * 0.06}
                className={`${featured ? "bg-accent-soft" : "bg-bg"} p-6 sm:p-8`}
              >
                <div className="flex items-center gap-3">
                  <GroupIcon size={22} weight="regular" className={featured ? "text-accent" : "text-muted"} aria-hidden />
                  <h3 className="text-lg font-medium">{group.title}</h3>
                </div>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-[var(--radius-ui)] border border-border bg-bg/60 px-2.5 py-1 font-mono text-xs text-text"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
