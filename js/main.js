// Monta cada página a partir de content.js. Sem bibliotecas: só DOM e template strings.
(() => {
  "use strict";

  const LANGS = ["pt", "en"];
  const PAGES = ["about", "skills", "projects", "education", "contact"];
  const STORAGE_KEY = "lang";
  const page = document.body.dataset.page || "home";

  /* ---------- Língua ---------- */

  const storage = {
    get() {
      try {
        return localStorage.getItem(STORAGE_KEY);
      } catch {
        return null;
      }
    },
    set(value) {
      try {
        localStorage.setItem(STORAGE_KEY, value);
      } catch {
        /* sem armazenamento: a língua só dura até sair da página */
      }
    },
  };

  // ?lang=en tem prioridade, depois a escolha guardada, depois a língua do browser.
  function detectLang() {
    const fromUrl = new URLSearchParams(location.search).get("lang");
    if (LANGS.includes(fromUrl)) {
      storage.set(fromUrl);
      return fromUrl;
    }
    const saved = storage.get();
    if (LANGS.includes(saved)) return saved;
    const browser = (navigator.language || "").toLowerCase();
    return browser === "" || browser.startsWith("pt") ? "pt" : "en";
  }

  let lang = detectLang();
  let t = CONTENT[lang];

  /* ---------- Utilitários ---------- */

  const escapeMap = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  const esc = (value) => String(value).replace(/[&<>"']/g, (c) => escapeMap[c]);

  const href = (target, hash) => `${target ? `${target}.html` : "index.html"}${hash ? `#${hash}` : ""}`;

  const svg = (body, { size = 16, fill = false } = {}) =>
    `<svg class="icon" width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true" focusable="false" ${
      fill
        ? 'fill="currentColor"'
        : 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" stroke-linejoin="miter"'
    }>${body}</svg>`;

  const icons = {
    arrowRight: (s) => svg('<path d="M4 12h15M13 6l6 6-6 6"/>', { size: s }),
    arrowUpRight: (s) => svg('<path d="M7 17 17 7M8 7h9v9"/>', { size: s }),
    menu: (s) => svg('<path d="M3 6h18M3 12h18M3 18h18"/>', { size: s }),
    close: (s) => svg('<path d="m5 5 14 14M19 5 5 19"/>', { size: s }),
    download: (s) => svg('<path d="M12 3v12M6 10l6 6 6-6M4 21h16"/>', { size: s }),
    copy: (s) => svg('<path d="M8 8h13v13H8z"/><path d="M16 8V3H3v13h5"/>', { size: s }),
    check: (s) => svg('<path d="m4 12 5 5L20 6"/>', { size: s }),
    github: (s) =>
      svg(
        '<path d="M12 .3a12 12 0 0 0-3.8 23.38c.6.12.83-.26.83-.57L9 21.07c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.08-.74.09-.73.09-.73 1.2.09 1.83 1.24 1.83 1.24 1.07 1.83 2.81 1.3 3.5 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18a4.65 4.65 0 0 1 1.23 3.22c0 4.61-2.8 5.63-5.48 5.92.42.36.81 1.1.81 2.22l-.01 3.29c0 .31.2.69.82.57A12 12 0 0 0 12 .3"/>',
        { size: s, fill: true },
      ),
    linkedin: (s) =>
      svg(
        '<path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/>',
        { size: s, fill: true },
      ),
  };

  const statusTag = (status) => `<span class="status status--${status}">${esc(t.status[status])}</span>`;

  // Imagem com proporção reservada. Sem src mostra uma grelha provisória.
  const imageSlot = (src, alt, ratio, eager = false) =>
    `<div class="image-slot" style="aspect-ratio:${ratio}">${
      src
        ? `<img src="${esc(src)}" alt="${esc(alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`
        : `<div class="image-slot__pending" role="img" aria-label="${esc(alt)}"><span>${esc(t.common.imagePending)}</span></div>`
    }</div>`;

  const textLink = (url, label, icon = icons.arrowRight(14), extra = "") =>
    `<a class="text-link ${extra}" href="${url}">${esc(label)}${icon}</a>`;

  const delay = (seconds) => `style="--reveal-delay:${seconds}s"`;

  const pageHeader = (title, intro) => `
    <header class="page-header">
      <div class="container reveal-load">
        <h1 class="page-title">${esc(title)}</h1>
        <p class="lead">${esc(intro)}</p>
      </div>
    </header>`;

  const certifications = () =>
    t.education.certifications.map((c) => (c.id === "google-it-support" ? { ...c, ...SITE.googleCertificate } : c));

  /* ---------- Cabeçalho e rodapé ---------- */

  function renderHeader() {
    const other = lang === "pt" ? "en" : "pt";
    const link = (key, cls) => {
      const active = key === page;
      return `<a href="${href(key === "home" ? null : key)}" class="${cls}${active ? " is-active" : ""}"${
        active ? ' aria-current="page"' : ""
      }>${esc(t.nav[key])}</a>`;
    };

    document.getElementById("site-header").innerHTML = `
      <nav class="container nav" aria-label="${esc(t.nav.main)}">
        <a href="${href()}" class="brand">
          <span class="brand__name">${esc(SITE.name)}</span>
          <span class="brand__role">sysadmin</span>
        </a>
        <div class="nav__links">
          ${PAGES.map((p) => link(p, "nav__link")).join("")}
          <button type="button" class="lang-switch" data-lang="${other}" aria-label="${esc(t.nav.switchLanguage)}">${other}</button>
        </div>
        <button type="button" class="menu-toggle" aria-expanded="false" aria-controls="mobile-menu" aria-label="${esc(t.nav.menu)}">
          ${icons.menu(22)}
        </button>
      </nav>
      <div id="mobile-menu" class="mobile-menu" role="dialog" aria-modal="true" aria-label="${esc(t.nav.menu)}" hidden>
        <div class="container mobile-menu__bar">
          <span class="brand__name">${esc(SITE.name)}</span>
          <button type="button" class="menu-close" aria-label="${esc(t.nav.close)}">${icons.close(22)}</button>
        </div>
        <div class="container mobile-menu__body">
          ${["home", ...PAGES].map((p) => link(p, "mobile-menu__link")).join("")}
          <button type="button" class="mobile-menu__lang" data-lang="${other}">${esc(t.nav.switchLanguage)}</button>
        </div>
      </div>`;

    setupMenu();
  }

  function renderFooter() {
    document.getElementById("site-footer").innerHTML = `
      <div class="container footer">
        <div>
          <p class="footer__name">${esc(SITE.name)}</p>
          <a class="footer__email" href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a>
        </div>
        <div class="footer__meta">
          <a href="${href("contact")}">${esc(t.nav.contact)}</a>
          <p>© ${new Date().getFullYear()} ${esc(SITE.name)}. ${esc(t.footer.built)}</p>
        </div>
      </div>`;
  }

  // Menu móvel: abre em ecrã inteiro, prende o foco e fecha com Escape.
  let menuKeyHandler = null;

  function setupMenu() {
    // Ao trocar de língua o cabeçalho é recriado; o atalho de teclado antigo tem de sair.
    if (menuKeyHandler) document.removeEventListener("keydown", menuKeyHandler);
    menuKeyHandler = null;

    const toggle = document.querySelector(".menu-toggle");
    const menu = document.getElementById("mobile-menu");
    const closeBtn = menu.querySelector(".menu-close");

    const onKey = (e) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key !== "Tab") return;
      const focusables = menu.querySelectorAll("a, button");
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    function open() {
      menu.hidden = false;
      toggle.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
      menuKeyHandler = onKey;
      document.addEventListener("keydown", onKey);
      closeBtn.focus();
    }

    function close() {
      menu.hidden = true;
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      menuKeyHandler = null;
      toggle.focus();
    }

    toggle.addEventListener("click", open);
    closeBtn.addEventListener("click", close);
    closeMenu = () => {
      if (!menu.hidden) close();
    };
  }

  let closeMenu = () => {};
  // O menu também tem de fechar se o ecrã crescer para o layout de desktop.
  matchMedia("(min-width: 1024px)").addEventListener("change", (e) => {
    if (e.matches) closeMenu();
  });

  /* ---------- Páginas ---------- */

  function blockHeader(title, linkLabel, url) {
    return `
      <div class="block-header reveal-view">
        <h2 class="section-title">${esc(title)}</h2>
        ${textLink(url, linkLabel)}
      </div>`;
  }

  function projectRow(p) {
    return `
      <li class="reveal-view">
        <a class="project-row" href="${href("projects", p.id)}">
          <span class="project-row__status">${statusTag(p.status)}</span>
          <span class="project-row__title">${esc(p.title)}</span>
          <span class="project-row__meta">
            <span class="label">${esc(p.stack.slice(0, 3).join(", "))}</span>
            ${icons.arrowRight(16)}
          </span>
        </a>
      </li>`;
  }

  const pages = {
    home() {
      const h = t.home;
      const [google] = certifications();
      const learning = [...t.education.learningItems, t.education.training[0]];

      return `
        <section class="container hero">
          <div class="hero__text">
            <p class="eyebrow reveal-load">${esc(h.availability)}</p>
            <h1 class="hero__title reveal-load" ${delay(0.08)}>${esc(h.headline[0])}<br>${esc(h.headline[1])}</h1>
            <p class="hero__sub reveal-load" ${delay(0.16)}>${esc(h.subtext)}</p>
            <div class="button-row reveal-load" ${delay(0.24)}>
              <a class="button button--primary" href="${href("projects")}">${esc(h.ctaProjects)}</a>
              <a class="button button--secondary" href="${href("contact")}">${esc(h.ctaContact)}</a>
            </div>
          </div>
          <div class="hero__photo reveal-load" ${delay(0.2)}>${imageSlot(SITE.photo, h.photoAlt, "4 / 5", true)}</div>
        </section>

        <section class="band">
          <div class="container section reveal-view">
            <p class="big-quote">${esc(h.aboutLead)}</p>
            ${textLink(href("about"), t.common.readMore, undefined, "mt-8")}
          </div>
        </section>

        <section class="band">
          <div class="container section">
            ${blockHeader(h.educationTitle, t.common.allEducation, href("education"))}
            <div class="split">
              <div class="split__main reveal-view">
                ${imageSlot(google.image, google.imageAlt || google.title, "4 / 3")}
                <div class="meta-row mt-5">${statusTag(google.status)}<span class="label">${esc(google.issuer)}</span></div>
                <h3 class="card-title">${esc(google.title)}</h3>
                ${
                  google.url
                    ? `<a class="text-link" href="${esc(google.url)}" target="_blank" rel="noopener noreferrer">${esc(t.common.verify)}${icons.arrowUpRight(14)}</a>`
                    : ""
                }
              </div>
              <div class="split__side reveal-view">
                <h3 class="label">${esc(t.education.learningTitle)}</h3>
                <ul class="rule-list">
                  ${learning
                    .map((i) => `<li><p class="strong">${esc(i.title)}</p><p class="small muted">${esc(i.issuer)}</p></li>`)
                    .join("")}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section class="band">
          <div class="container section">
            ${blockHeader(h.projectsTitle, t.common.allProjects, href("projects"))}
            <ol class="project-index">${t.projects.items.map(projectRow).join("")}</ol>
          </div>
        </section>

        <section class="band">
          <div class="container section">
            ${blockHeader(h.skillsTitle, t.common.allSkills, href("skills"))}
            <div class="skill-columns">
              ${t.skills.groups
                .map(
                  (g) => `
                <div class="skill-column reveal-view">
                  <h3 class="strong">${esc(g.title)}</h3>
                  <ul>${g.items
                    .filter((i) => !i.learning)
                    .slice(0, 4)
                    .map((i) => `<li>${esc(i.name)}</li>`)
                    .join("")}</ul>
                </div>`,
                )
                .join("")}
            </div>
          </div>
        </section>

        <section class="band band--panel">
          <div class="container section cta reveal-view">
            <div>
              <p class="big-quote">${esc(h.contactLead)}</p>
              <a class="cta__email" href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a>
            </div>
            <div class="cta__action"><a class="button button--primary" href="${href("contact")}">${esc(h.ctaContact)}</a></div>
          </div>
        </section>`;
    },

    about() {
      const a = t.about;
      return `
        ${pageHeader(a.title, a.intro)}
        <div class="container section split">
          <div class="split__main prose reveal-view">
            ${a.paragraphs.map((p) => `<p>${esc(p)}</p>`).join("")}
          </div>
          <aside class="split__side reveal-view">
            <dl class="facts">
              ${a.facts.map((f) => `<div><dt class="label">${esc(f.label)}</dt><dd>${esc(f.value)}</dd></div>`).join("")}
            </dl>
          </aside>
        </div>
        <section class="band">
          <div class="container section">
            <h2 class="section-title reveal-view">${esc(a.principlesTitle)}</h2>
            <ol class="principles">
              ${a.principles
                .map(
                  (p, i) => `
                <li class="reveal-view">
                  <span class="label">${String(i + 1).padStart(2, "0")}</span>
                  <h3 class="card-title">${esc(p.title)}</h3>
                  <p class="muted">${esc(p.body)}</p>
                </li>`,
                )
                .join("")}
            </ol>
          </div>
        </section>`;
    },

    skills() {
      const s = t.skills;
      return `
        ${pageHeader(s.title, s.intro)}
        <div class="container">
          ${s.groups
            .map(
              (g) => `
            <section id="${g.id}" class="skill-group">
              <div class="skill-group__head reveal-view">
                <h2 class="section-title">${esc(g.title)}</h2>
                <p class="muted">${esc(g.summary)}</p>
              </div>
              <ul class="skill-list reveal-view">
                ${g.items
                  .map(
                    (i) => `
                  <li class="${i.learning ? "is-learning" : ""}">
                    <span>${esc(i.name)}</span>
                    ${i.learning ? `<span class="learning">${esc(t.common.learning)}</span>` : ""}
                  </li>`,
                  )
                  .join("")}
              </ul>
            </section>`,
            )
            .join("")}
        </div>`;
    },

    projects() {
      const p = t.projects;
      const detail = (title, items) => `
        <div>
          <h3 class="label">${esc(title)}</h3>
          <ul class="dash-list">${items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>
        </div>`;

      return `
        ${pageHeader(p.title, p.intro)}
        <div class="container">
          <div class="filters" role="group" aria-label="${esc(p.filterLabel)}">
            ${Object.entries(p.filters)
              .map(([key, label]) => {
                const count = key === "all" ? p.items.length : p.items.filter((i) => i.tags.includes(key)).length;
                return `<button type="button" class="filter" data-filter="${key}" aria-pressed="false">${esc(label)} <span class="filter__count">${count}</span></button>`;
              })
              .join("")}
          </div>
          <p class="filters__empty muted" hidden>${esc(p.empty)}</p>
          ${p.items
            .map(
              (item, i) => `
            <article id="${item.id}" class="project" data-tags="${item.tags.join(" ")}">
              <div class="project__intro reveal-view">
                <div class="meta-row">
                  <span class="label" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span>
                  ${statusTag(item.status)}
                </div>
                <h2 class="project__title">${esc(item.title)}</h2>
                <p class="muted measure">${esc(item.summary)}</p>
                <ul class="tags" aria-label="${esc(t.common.stack)}">${item.stack.map((s) => `<li class="tag">${esc(s)}</li>`).join("")}</ul>
              </div>
              <div class="project__detail reveal-view">
                <div class="goal">
                  <h3 class="label">${esc(t.common.goal)}</h3>
                  <p>${esc(item.goal)}</p>
                </div>
                ${detail(t.common.scope, item.scope)}
                ${detail(t.common.deliverables, item.deliverables)}
              </div>
            </article>`,
            )
            .join("")}
        </div>`;
    },

    education() {
      const e = t.education;
      const list = (title, items) => `
        <section class="credential-list">
          <h2 class="section-title reveal-view">${esc(title)}</h2>
          <ol>
            ${items
              .map(
                (c) => `
              <li id="${c.id}" class="reveal-view">
                <div class="meta-row">${statusTag(c.status)}<span class="label">${esc(c.issuer)}</span></div>
                <h3 class="card-title">${esc(c.title)}</h3>
                <p class="muted measure">${esc(c.detail)}</p>
              </li>`,
              )
              .join("")}
          </ol>
        </section>`;

      return `
        ${pageHeader(e.title, e.intro)}
        <div class="container">
          <section class="section">
            <h2 class="section-title reveal-view">${esc(e.certificationsTitle)}</h2>
            ${certifications()
              .map(
                (c) => `
              <div class="split split--center reveal-view">
                <div id="${c.id}" class="split__main">${imageSlot(c.image, c.imageAlt || c.title, "4 / 3")}</div>
                <div class="split__side">
                  <div class="meta-row">${statusTag(c.status)}<span class="label">${esc(c.issuer)}</span></div>
                  <h3 class="project__title">${esc(c.title)}</h3>
                  <p class="muted measure">${esc(c.detail)}</p>
                  ${
                    c.url
                      ? `<a class="button button--secondary mt-6" href="${esc(c.url)}" target="_blank" rel="noopener noreferrer">${esc(t.common.verify)}${icons.arrowUpRight(16)}</a>`
                      : ""
                  }
                </div>
              </div>`,
              )
              .join("")}
          </section>
          ${list(e.learningTitle, e.learningItems)}
          ${list(e.trainingTitle, e.training)}
        </div>`;
    },

    contact() {
      const c = t.contact;
      const links = [
        { url: SITE.linkedin, name: "LinkedIn", icon: icons.linkedin },
        { url: SITE.github, name: "GitHub", icon: icons.github },
      ];

      return `
        ${pageHeader(c.title, c.intro)}
        <div class="container section contact">
          <div class="contact__main reveal-view">
            <p class="label">${esc(c.emailLabel)}</p>
            <a class="contact__email" href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a>
            <div class="button-row mt-8">
              <button type="button" class="button button--secondary copy-email" aria-live="polite">${icons.copy(16)}<span>${esc(t.common.copy)}</span></button>
              <a class="button button--primary" href="${esc(SITE.cv[lang])}" download>${icons.download(16)}${esc(t.common.downloadCv)}</a>
            </div>
            <h2 class="label mt-16">${esc(c.elsewhere)}</h2>
            <ul class="link-list">
              ${links
                .map(
                  (l) => `
                <li><a href="${esc(l.url)}" target="_blank" rel="noopener noreferrer">
                  <span>${l.icon(22)}${esc(l.name)}</span>${icons.arrowUpRight(18)}
                </a></li>`,
                )
                .join("")}
            </ul>
          </div>
          <aside class="contact__side reveal-view">
            <div class="panel">
              <h2 class="strong">${esc(c.availabilityTitle)}</h2>
              <dl class="facts">
                ${c.availability.map((a) => `<div><dt class="label">${esc(a.label)}</dt><dd>${esc(a.value)}</dd></div>`).join("")}
              </dl>
            </div>
          </aside>
        </div>`;
    },
  };

  /* ---------- Comportamentos por página ---------- */

  function setupCopyEmail() {
    const button = document.querySelector(".copy-email");
    if (!button) return;
    const label = button.querySelector("span");
    let timer;
    button.addEventListener("click", async () => {
      let ok = false;
      try {
        await navigator.clipboard.writeText(SITE.email);
        ok = true;
      } catch {
        ok = false;
      }
      label.textContent = ok ? t.common.copied : t.common.copyError;
      button.querySelector("svg").outerHTML = ok ? icons.check(16) : icons.copy(16);
      clearTimeout(timer);
      timer = setTimeout(() => {
        label.textContent = t.common.copy;
        button.querySelector("svg").outerHTML = icons.copy(16);
      }, 2000);
    });
  }

  // Filtro de projetos. A escolha fica no endereço (?tag=linux) para se poder partilhar.
  function setupFilters() {
    const buttons = document.querySelectorAll(".filter");
    if (!buttons.length) return;
    const projects = document.querySelectorAll(".project");
    const empty = document.querySelector(".filters__empty");
    const valid = Object.keys(t.projects.filters);

    function apply(tag, updateUrl) {
      buttons.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.filter === tag)));
      let visible = 0;
      projects.forEach((p) => {
        const show = tag === "all" || p.dataset.tags.split(" ").includes(tag);
        p.hidden = !show;
        if (show) visible++;
      });
      empty.hidden = visible > 0;
      if (updateUrl) {
        const url = new URL(location.href);
        if (tag === "all") url.searchParams.delete("tag");
        else url.searchParams.set("tag", tag);
        url.hash = "";
        history.replaceState(null, "", url);
      }
    }

    buttons.forEach((b) => b.addEventListener("click", () => apply(b.dataset.filter, true)));
    const fromUrl = new URLSearchParams(location.search).get("tag");
    // Um link direto para um projeto (#id) mostra sempre todos.
    apply(!location.hash && valid.includes(fromUrl) ? fromUrl : "all", false);
  }

  /* ---------- Montagem ---------- */

  function setMeta() {
    document.documentElement.lang = lang;
    const section = t[page];
    const isHome = page === "home";
    document.title = isHome ? t.meta.title : `${section.title} | ${SITE.name}`;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = isHome ? t.meta.description : section.intro;
    document.querySelector(".skip-link").textContent = t.nav.skip;
  }

  function render() {
    t = CONTENT[lang];
    setMeta();
    renderHeader();
    document.getElementById("main").innerHTML = (pages[page] || pages.home)();
    renderFooter();
    setupCopyEmail();
    setupFilters();
  }

  // Troca de língua sem recarregar. Mantém o foco no botão equivalente.
  document.addEventListener("click", (e) => {
    const button = e.target.closest("[data-lang]");
    if (!button) return;
    const fromMenu = button.classList.contains("mobile-menu__lang");
    lang = button.dataset.lang;
    storage.set(lang);
    document.body.style.overflow = "";
    const url = new URL(location.href);
    if (url.searchParams.has("lang")) {
      url.searchParams.set("lang", lang);
      history.replaceState(null, "", url);
    }
    render();
    (fromMenu ? document.querySelector(".menu-toggle") : document.querySelector(".lang-switch")).focus();
  });

  render();

  // O conteúdo é criado depois de a página carregar, por isso o salto para #id é feito aqui.
  if (location.hash) {
    const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (target) target.scrollIntoView();
  }
})();
