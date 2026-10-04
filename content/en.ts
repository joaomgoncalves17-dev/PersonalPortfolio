import type { Dictionary } from "./types";

export const en: Dictionary = {
  meta: {
    title: "João Gonçalves | Junior Sysadmin and IT Support",
    description:
      "Portfolio of João Gonçalves, based in Viana do Castelo, Portugal. Windows and Linux systems administration, networking and IT support.",
  },
  nav: {
    about: "About",
    skills: "Skills",
    projects: "Projects",
    education: "Education",
    contact: "Contact",
    menu: "Open menu",
    close: "Close menu",
    switchLanguage: "Mudar para Português",
  },
  hero: {
    role: "Junior Sysadmin and IT Support",
    availability: "Available for an internship from January 2027",
    headline: ["Reliable infrastructure,", "clearly documented."],
    subtext:
      "Junior sysadmin in Viana do Castelo, Portugal. Windows Server, Linux, Active Directory and networking, with tested backups and clear documentation.",
    ctaProjects: "View projects",
    ctaCv: "Download CV",
    profile: [
      { label: "Location", value: "Viana do Castelo, Portugal" },
      { label: "Looking for", value: "Junior Sysadmin, IT Support, Help Desk" },
      { label: "Studying", value: "Networks and Computer Systems, IEFP" },
      { label: "Languages", value: "Portuguese (native), English" },
    ],
    photoAlt: "Photo of João Gonçalves",
  },
  about: {
    title: "About",
    paragraphs: [
      "I am finishing the Networks and Computer Systems course at IEFP and preparing for CompTIA Network+. I like understanding how the parts of a network fit together, and leaving every system set up so that someone else can maintain it.",
      "I work with Windows Server and Linux, Active Directory, Group Policy, and backup and recovery planning. When a problem needs its own tool, I write it in C#, PowerShell or Bash.",
    ],
  },
  skills: {
    title: "Skills",
    groups: [
      {
        id: "systems",
        title: "Systems",
        items: ["Windows Server", "Active Directory and GPO", "Debian and Ubuntu", "Virtualisation"],
      },
      {
        id: "networking",
        title: "Networking",
        items: ["TCP/IP and subnetting", "DNS and DHCP", "VLANs and switching", "Troubleshooting"],
      },
      {
        id: "operations",
        title: "Operations",
        items: ["Backup and recovery", "PowerShell and Bash", "Technical documentation", "User support"],
      },
      {
        id: "development",
        title: "Development",
        items: ["C# and ASP.NET Core", "React", "MySQL", "HTML, CSS and JavaScript"],
      },
    ],
  },
  projects: {
    title: "Projects",
    imagePending: "Image coming soon",
    items: [
      {
        title: "Hybrid Windows and Linux domain with disaster recovery",
        category: "Infrastructure",
        status: "Completed",
        summary:
          "A small-business network built from scratch: Active Directory, Group Policy, Linux file and web services, automated backups and a written, tested recovery plan.",
        stack: ["Windows Server", "Active Directory", "Linux", "Backups"],
        imageAlt: "Network diagram of the hybrid domain",
      },
      {
        title: "Equipment inventory app",
        category: "Development",
        status: "In progress",
        summary:
          "A web application for IT teams to register devices, assign them to staff and track their status from purchase to write-off.",
        stack: ["React", "ASP.NET Core", "C#", "MySQL"],
        imageAlt: "Screen of the inventory app",
      },
    ],
  },
  education: {
    title: "Education",
    items: [
      {
        period: "Current",
        title: "Networks and Computer Systems Technician",
        place: "IEFP, Viana do Castelo",
        detail: "Server administration, networking and technical support. Internship from January 2027.",
        state: "current",
      },
      {
        period: "In preparation",
        title: "CompTIA Network+ (N10-009)",
        place: "Certification",
        detail: "Networking fundamentals, operations, security and troubleshooting.",
        state: "planned",
      },
      {
        period: "Planned",
        title: "BSc in Computer Science",
        place: "Higher education",
        detail: "Next step after the internship.",
        state: "planned",
      },
    ],
  },
  contact: {
    title: "Get in touch",
    body: "I am looking for a first role in systems administration or IT support. Email is the fastest way to reach me.",
    copy: "Copy",
    copied: "Copied",
    copyError: "Could not copy",
    emailLabel: "Email",
  },
  footer: { rights: "Built with Next.js." },
};
