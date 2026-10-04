"use client";

import { List, X } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { pages, type Dictionary, type Locale } from "@/content/types";
import { container, href, zIndex } from "./ui";

type Props = { lang: Locale; nav: Dictionary["nav"]; name: string };

export function SiteHeader({ lang, nav, name }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const otherLang: Locale = lang === "pt" ? "en" : "pt";
  // Mantém a página atual ao trocar de língua.
  const switchHref = pathname.replace(/^\/(pt|en)/, `/${otherLang}`);
  const isActive = (path: string) => pathname === path;

  // Fecha o menu ao mudar de página.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const focusables = menuRef.current?.querySelectorAll<HTMLElement>("a, button");
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

  return (
    <header className={`sticky top-0 ${zIndex.nav} border-b border-line bg-bg/90 backdrop-blur-sm`}>
      <nav className={`${container} flex h-16 items-center justify-between gap-6`} aria-label={nav.main}>
        <Link href={href(lang)} className="flex flex-col leading-tight">
          <span className="text-sm font-semibold">{name}</span>
          <span className="font-mono text-[11px] text-muted">sysadmin</span>
        </Link>

        <div className="hidden items-center lg:flex">
          {pages.map((page) => {
            const path = href(lang, page);
            const active = isActive(path);
            return (
              <Link
                key={page}
                href={path}
                aria-current={active ? "page" : undefined}
                className={`relative px-3 py-2 text-sm transition-colors duration-200 hover:text-ink ${
                  active ? "text-ink after:absolute after:inset-x-3 after:-bottom-[13px] after:h-0.5 after:bg-accent" : "text-muted"
                }`}
              >
                {nav[page]}
              </Link>
            );
          })}
          <Link
            href={switchHref}
            hrefLang={otherLang}
            aria-label={nav.switchLanguage}
            className="ml-4 border border-line px-2.5 py-1.5 font-mono text-xs uppercase text-muted transition-colors duration-200 hover:border-ink hover:text-ink"
          >
            {otherLang}
          </Link>
        </div>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={nav.menu}
          className="-mr-2 inline-flex size-11 items-center justify-center lg:hidden"
        >
          <List size={22} />
        </button>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label={nav.menu}
          className={`fixed inset-0 ${zIndex.menu} flex flex-col bg-bg lg:hidden`}
        >
          <div className={`${container} flex h-16 items-center justify-between border-b border-line`}>
            <span className="text-sm font-semibold">{name}</span>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                toggleRef.current?.focus();
              }}
              aria-label={nav.close}
              className="-mr-2 inline-flex size-11 items-center justify-center"
            >
              <X size={22} />
            </button>
          </div>
          <div className={`${container} flex flex-1 flex-col py-4`}>
            {[undefined, ...pages].map((page) => {
              const path = href(lang, page);
              const active = isActive(path);
              return (
                <Link
                  key={path}
                  href={path}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center justify-between border-b border-line py-4 text-2xl font-medium tracking-tight ${
                    active ? "text-accent" : ""
                  }`}
                >
                  {page ? nav[page] : nav.home}
                </Link>
              );
            })}
            <Link href={switchHref} hrefLang={otherLang} className="mt-auto py-4 font-mono text-sm text-muted">
              {nav.switchLanguage}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
