import { en } from "./en";
import { pt } from "./pt";
import { site } from "./site";
import type { Dictionary, Locale } from "./types";

const dictionaries: Record<Locale, Dictionary> = { pt, en };

export const getDictionary = (locale: Locale) => dictionaries[locale];

// Junta os dados da imagem e do link do certificado Google (iguais nas duas línguas).
export const getCertifications = (dict: Dictionary) =>
  dict.education.certifications.map((c) =>
    c.id === "google-it-support" ? { ...c, ...site.googleCertificate } : c,
  );

// Metadados de cada página interior, a partir do dicionário.
export async function pageMetadata(params: Promise<{ lang: string }>, pick: (d: Dictionary) => { title: string; intro: string }) {
  const { lang } = await params;
  const dict = getDictionary(lang === "en" ? "en" : "pt");
  const { title, intro } = pick(dict);
  return { title, description: intro };
}
