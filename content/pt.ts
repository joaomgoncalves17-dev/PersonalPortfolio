import type { Dictionary } from "./types";

export const pt: Dictionary = {
  meta: {
    title: "João Gonçalves | Sysadmin Júnior e Suporte TI",
    description:
      "Portfolio de João Gonçalves, de Viana do Castelo. Administração de sistemas Windows e Linux, redes e suporte técnico.",
  },
  nav: {
    about: "Sobre mim",
    skills: "Competências",
    projects: "Projetos",
    education: "Formação",
    contact: "Contactar",
    menu: "Abrir menu",
    close: "Fechar menu",
    switchLanguage: "Switch to English",
  },
  hero: {
    role: "Sysadmin Júnior e Suporte TI",
    availability: "Disponível para estágio a partir de janeiro de 2027",
    headline: ["Infraestrutura fiável,", "bem documentada."],
    subtext:
      "Sysadmin júnior em Viana do Castelo. Windows Server, Linux, Active Directory e redes, com backups testados e documentação clara.",
    ctaProjects: "Ver projetos",
    ctaCv: "Descarregar CV",
    profile: [
      { label: "Local", value: "Viana do Castelo, Portugal" },
      { label: "Procuro", value: "Sysadmin Júnior, Suporte TI, Help Desk" },
      { label: "Formação", value: "Redes e Sistemas Informáticos, IEFP" },
      { label: "Línguas", value: "Português (nativo), Inglês" },
    ],
    photoAlt: "Fotografia de João Gonçalves",
  },
  about: {
    title: "Sobre mim",
    paragraphs: [
      "Estou a terminar o curso de Redes e Sistemas Informáticos no IEFP e a preparar a certificação CompTIA Network+. Gosto de perceber como as peças de uma rede encaixam e de deixar cada sistema configurado de forma a que outra pessoa o consiga manter.",
      "Trabalho com Windows Server e Linux, Active Directory, políticas de grupo e planos de backup e recuperação. Quando um problema pede uma ferramenta própria, escrevo-a: em C#, PowerShell ou Bash.",
    ],
  },
  skills: {
    title: "Competências",
    groups: [
      {
        id: "systems",
        title: "Sistemas",
        items: ["Windows Server", "Active Directory e GPO", "Debian e Ubuntu", "Virtualização"],
      },
      {
        id: "networking",
        title: "Redes",
        items: ["TCP/IP e subnetting", "DNS e DHCP", "VLANs e switching", "Diagnóstico de falhas"],
      },
      {
        id: "operations",
        title: "Operações",
        items: ["Backup e recuperação", "PowerShell e Bash", "Documentação técnica", "Suporte a utilizadores"],
      },
      {
        id: "development",
        title: "Desenvolvimento",
        items: ["C# e ASP.NET Core", "React", "MySQL", "HTML, CSS e JavaScript"],
      },
    ],
  },
  projects: {
    title: "Projetos",
    imagePending: "Imagem em breve",
    items: [
      {
        title: "Domínio híbrido Windows e Linux com recuperação de desastres",
        category: "Infraestrutura",
        status: "Concluído",
        summary:
          "Rede de uma pequena empresa montada de raiz: Active Directory, políticas de grupo, serviços de ficheiros e web em Linux, backups automáticos e um plano de recuperação escrito e testado.",
        stack: ["Windows Server", "Active Directory", "Linux", "Backups"],
        imageAlt: "Diagrama da rede do domínio híbrido",
      },
      {
        title: "Aplicação de inventário de equipamentos",
        category: "Desenvolvimento",
        status: "Em curso",
        summary:
          "Aplicação web para equipas de TI registarem equipamentos, atribuí-los a colaboradores e acompanharem o seu estado desde a compra até ao abate.",
        stack: ["React", "ASP.NET Core", "C#", "MySQL"],
        imageAlt: "Ecrã da aplicação de inventário",
      },
    ],
  },
  education: {
    title: "Formação",
    items: [
      {
        period: "Atual",
        title: "Técnico de Redes e Sistemas Informáticos",
        place: "IEFP, Viana do Castelo",
        detail: "Administração de servidores, redes e suporte técnico. Estágio a partir de janeiro de 2027.",
        state: "current",
      },
      {
        period: "Em preparação",
        title: "CompTIA Network+ (N10-009)",
        place: "Certificação",
        detail: "Fundamentos de redes, operações, segurança e diagnóstico.",
        state: "planned",
      },
      {
        period: "Planeado",
        title: "Licenciatura em Engenharia Informática",
        place: "Ensino superior",
        detail: "Próximo passo depois do estágio.",
        state: "planned",
      },
    ],
  },
  contact: {
    title: "Vamos falar",
    body: "Procuro uma primeira oportunidade em administração de sistemas ou suporte TI. A forma mais rápida de me contactar é por email.",
    copy: "Copiar",
    copied: "Copiado",
    copyError: "Não foi possível copiar",
    emailLabel: "Email",
  },
  footer: { rights: "Feito com Next.js." },
};
