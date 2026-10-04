export const locales = ["pt", "en"] as const;
export type Locale = (typeof locales)[number];

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

// Páginas do site. O slug é igual nas duas línguas (/pt/projects, /en/projects).
export const pages = ["about", "skills", "projects", "education", "contact"] as const;
export type PageKey = (typeof pages)[number];

export type Status = "done" | "current" | "planned";

export type SkillGroup = {
  id: "systems" | "networking" | "automation" | "operations";
  title: string;
  summary: string;
  items: { name: string; learning?: boolean }[];
};

export type Project = {
  id: string;
  title: string;
  status: Status;
  summary: string;
  goal: string;
  scope: string[];
  deliverables: string[];
  stack: string[];
};

export type Credential = {
  id: string;
  title: string;
  issuer: string;
  status: Status;
  detail: string;
  // Caminho em /public e URL de verificação. Vazios até existirem.
  image?: string;
  imageAlt?: string;
  url?: string;
};

export type Dictionary = {
  meta: { title: string; description: string };
  nav: Record<PageKey, string> & {
    home: string;
    menu: string;
    close: string;
    switchLanguage: string;
    main: string;
  };
  status: Record<Status, string>;
  common: {
    readMore: string;
    allProjects: string;
    allSkills: string;
    allEducation: string;
    learning: string;
    imagePending: string;
    verify: string;
    downloadCv: string;
    copy: string;
    copied: string;
    copyError: string;
    goal: string;
    scope: string;
    deliverables: string;
    stack: string;
    backHome: string;
  };
  home: {
    availability: string;
    headline: [string, string];
    subtext: string;
    ctaProjects: string;
    ctaContact: string;
    photoAlt: string;
    aboutLead: string;
    educationTitle: string;
    projectsTitle: string;
    skillsTitle: string;
    contactLead: string;
  };
  about: {
    title: string;
    intro: string;
    paragraphs: string[];
    principlesTitle: string;
    principles: { title: string; body: string }[];
    facts: { label: string; value: string }[];
  };
  skills: { title: string; intro: string; groups: SkillGroup[] };
  projects: { title: string; intro: string; items: Project[] };
  education: {
    title: string;
    intro: string;
    certificationsTitle: string;
    certifications: Credential[];
    learningTitle: string;
    learningItems: Credential[];
    trainingTitle: string;
    training: Credential[];
  };
  contact: {
    title: string;
    intro: string;
    emailLabel: string;
    elsewhere: string;
    availabilityTitle: string;
    availability: { label: string; value: string }[];
  };
  footer: { built: string };
};
