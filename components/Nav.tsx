"use client";

import { List, X } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import type { Dictionary, Locale } from "@/content/types";
import { buttonPrimary, container, zIndex } from "./ui";

type Props = { lang: Locale; nav: Dictionary["nav"]; name: string };

export function Nav({ lang, nav, name }: Props) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const otherLang: Locale = lang === "pt" ? "en" : "pt";

  const links = [
    { href: "#sobre", label: nav.about },
    { href: "#competencias", label: nav.skills },
    { href: "#projetos", label: nav.projects },
    { href: "#formacao", label: nav.education },
  ];

  useEffect(() => {
    if (!open) return;
    const menu = menuRef.current;
    const focusables = menu?.querySelectorAll<HTMLElement>("a, button");
    focusables?.[0]?.focus();
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      // Mantém o foco dentro do menu.
      if (e.key === "Tab" && focusables && focusables.length > 0) {
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={`sticky top-0 ${zIndex.nav} border-b border-border bg-bg/85 backdrop-blur supports-[backdrop-filter]:bg-bg/75`}
    >
      <nav className={`${container} flex h-16 items-center justify-between gap-6`} aria-label={lang === "pt" ? "Principal" : "Main"}>
        <a href="#top" className="font-mono text-sm font-medium tracking-tight">
          {name}
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-[var(--radius-ui)] px-3 py-2 text-sm text-muted transition-colors duration-200 hover:text-text"
            >
              {l.label}
            </a>
          ))}
          <a
            href={`/${otherLang}`}
            hrefLang={otherLang}
            aria-label={nav.switchLanguage}
            className="ml-2 rounded-[var(--radius-ui)] border border-border px-2.5 py-1.5 font-mono text-xs uppercase text-muted transition-colors duration-200 hover:border-text hover:text-text"
          >
            {otherLang}
          </a>
          <a href="#contacto" className={`${buttonPrimary} ml-3 min-h-9`}>
            {nav.contact}
          </a>
        </div>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={nav.menu}
          className="-mr-2 inline-flex size-11 items-center justify-center rounded-[var(--radius-ui)] md:hidden"
        >
          <List size={22} weight="regular" />
        </button>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label={nav.menu}
          className={`fixed inset-0 ${zIndex.menu} flex flex-col bg-bg md:hidden`}
        >
          <div className={`${container} flex h-16 items-center justify-between border-b border-border`}>
            <span className="font-mono text-sm font-medium">{name}</span>
            <button
              type="button"
              onClick={() => {
                close();
                toggleRef.current?.focus();
              }}
              aria-label={nav.close}
              className="-mr-2 inline-flex size-11 items-center justify-center rounded-[var(--radius-ui)]"
            >
              <X size={22} weight="regular" />
            </button>
          </div>
          <div className={`${container} flex flex-1 flex-col gap-1 py-6`}>
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={close} className="py-3 text-2xl font-medium tracking-tight">
                {l.label}
              </a>
            ))}
            <a href="#contacto" onClick={close} className={`${buttonPrimary} mt-6 w-full`}>
              {nav.contact}
            </a>
            <a
              href={`/${otherLang}`}
              hrefLang={otherLang}
              className="mt-auto py-3 font-mono text-sm text-muted"
            >
              {nav.switchLanguage}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
