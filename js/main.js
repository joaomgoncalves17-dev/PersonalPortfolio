// Comportamentos da página. Todo o conteúdo está no HTML; isto só trata do menu móvel,
// do filtro de projetos, do botão de copiar o email e de guardar a língua escolhida.
(() => {
  "use strict";

  const storage = {
    set(key, value) {
      try {
        localStorage.setItem(key, value);
      } catch {
        /* sem armazenamento: a escolha não fica guardada */
      }
    },
  };

  // Guarda a língua escolhida, para a página de entrada (/) abrir nela da próxima vez.
  document.querySelectorAll("[data-lang]").forEach((link) => {
    link.addEventListener("click", () => storage.set("lang", link.dataset.lang));
  });

  /* ---------- Menu móvel: abre em ecrã inteiro, prende o foco e fecha com Escape. ---------- */

  const toggle = document.querySelector(".menu-toggle");
  const menu = document.getElementById("mobile-menu");

  if (toggle && menu) {
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
      document.addEventListener("keydown", onKey);
      closeBtn.focus();
    }

    function close() {
      menu.hidden = true;
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      toggle.focus();
    }

    toggle.addEventListener("click", open);
    closeBtn.addEventListener("click", close);
    // Fecha também se o ecrã crescer para o layout de desktop.
    matchMedia("(min-width: 1024px)").addEventListener("change", (e) => {
      if (e.matches && !menu.hidden) close();
    });
  }

  /* ---------- Copiar o email. Os textos vêm dos atributos data-* do botão. ---------- */

  const copyButton = document.querySelector(".copy-email");

  if (copyButton) {
    const label = copyButton.querySelector("span");
    const icon = copyButton.querySelector("svg");
    const copyIcon = icon.innerHTML;
    const checkIcon = '<path d="m4 12 5 5L20 6"/>';
    const email = document.querySelector(".contact__email").textContent.trim();
    let timer;

    copyButton.addEventListener("click", async () => {
      let ok = true;
      try {
        await navigator.clipboard.writeText(email);
      } catch {
        ok = false;
      }
      label.textContent = ok ? copyButton.dataset.copied : copyButton.dataset.error;
      icon.innerHTML = ok ? checkIcon : copyIcon;
      clearTimeout(timer);
      timer = setTimeout(() => {
        label.textContent = copyButton.dataset.copy;
        icon.innerHTML = copyIcon;
      }, 2000);
    });
  }

  /* ---------- Filtro de projetos. A escolha fica no endereço (?tag=linux) para se poder partilhar. ---------- */

  const filters = document.querySelector(".filters");

  if (filters) {
    const buttons = filters.querySelectorAll(".filter");
    const projects = document.querySelectorAll(".project");
    const empty = document.querySelector(".filters__empty");
    const valid = [...buttons].map((b) => b.dataset.filter);

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

    // Sem JavaScript o filtro não funciona, por isso só aparece aqui.
    filters.hidden = false;
    buttons.forEach((b) => b.addEventListener("click", () => apply(b.dataset.filter, true)));
    const fromUrl = new URLSearchParams(location.search).get("tag");
    // Um link direto para um projeto (#id) mostra sempre todos.
    if (!location.hash && valid.includes(fromUrl)) apply(fromUrl, false);
  }
})();
