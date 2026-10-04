export const locales = ["pt", "en"] as const;
export type Locale = (typeof locales)[number];

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

export type SkillGroup = {
  id: "systems" | "networking" | "operations" | "development";
  title: string;
  items: string[];
};

export type Project = {
  title: string;
  category: string;
  status: string;
  summary: string;
  stack: string[];
  // Caminho em /public. Sem imagem, é mostrado um bloco reservado.
  image?: string;
  imageAlt: string;
};

export type EducationItem = {
  period: string;
  title: string;
  place: string;
  detail: string;
  state: "done" | "current" | "planned";
};

export type Dictionary = {
  meta: { title: string; description: string };
  nav: {
    about: string;
    skills: string;
    projects: string;
    education: string;
    contact: string;
    menu: string;
    close: string;
    switchLanguage: string;
  };
  hero: {
    availability: string;
    role: string;
    headline: [string, string];
    subtext: string;
    ctaProjects: string;
    ctaCv: string;
    profile: { label: string; value: string }[];
    photoAlt: string;
  };
  about: { title: string; paragraphs: string[] };
  skills: { title: string; groups: SkillGroup[] };
  projects: { title: string; items: Project[]; imagePending: string };
  education: { title: string; items: EducationItem[] };
  contact: {
    title: string;
    body: string;
    copy: string;
    copied: string;
    copyError: string;
    emailLabel: string;
  };
  footer: { rights: string };
};
