import Link from "next/link";
import type { Dictionary, Locale } from "@/content/types";
import { container, href } from "./ui";

type Props = { lang: Locale; dict: Dictionary; name: string; email: string };

export function SiteFooter({ lang, dict, name, email }: Props) {
  return (
    <footer className="mt-auto border-t border-line">
      <div className={`${container} grid gap-6 py-10 text-sm md:grid-cols-[1fr_auto] md:items-end`}>
        <div>
          <p className="font-semibold">{name}</p>
          <a href={`mailto:${email}`} className="mt-1 inline-block text-muted underline-offset-4 hover:text-ink hover:underline">
            {email}
          </a>
        </div>
        <div className="flex flex-col gap-1 text-muted md:items-end">
          <Link href={href(lang, "contact")} className="hover:text-ink">
            {dict.nav.contact}
          </Link>
          <p>
            © {new Date().getFullYear()} {name}. {dict.footer.built}
          </p>
        </div>
      </div>
    </footer>
  );
}
