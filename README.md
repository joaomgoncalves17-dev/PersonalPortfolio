# João Gonçalves, portfolio

Personal portfolio of a junior systems administrator based in Viana do Castelo, Portugal. Available in Portuguese and English.

Pages: home (summary), about, skills, projects (filterable by Linux, Windows and networking), education and contact.

## Stack

Plain HTML, CSS and JavaScript. No frameworks, no build step, no dependencies. Every page is complete static HTML; JavaScript only adds the mobile menu, the project filter and the copy-email button, and the site still reads fine without it. The only external request is IBM Plex Sans and IBM Plex Mono from Google Fonts (system fonts are used if it fails).

## Running locally

Any static file server works, for example:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000. The root `index.html` sends visitors to `/pt/` or `/en/`, using the last language they picked or the browser language.

## Where things live

| Path | Contents |
| --- | --- |
| `pt/*.html`, `en/*.html` | The pages, one file per page and language, with all the text in the HTML |
| `index.html` | Entry page that redirects to `pt/` or `en/` |
| `404.html` | Not-found page in both languages; uses absolute paths, so the site should be served from the domain root |
| `css/style.css` | All styles, with light and dark colours at the top |
| `js/main.js` | Mobile menu, project filter, copy-email button and remembering the chosen language |
| `assets/` | Favicon, share image, and the photo, CVs and certificate image once added |

## Editing

- **Text:** change it in the page in `pt/` and in the same page in `en/`.
- **Header, menu or footer:** they are repeated in all 12 pages, so change every file (a project-wide search and replace works well).
- **New project:** copy an `<article class="project">` block in `pt/projects.html` and `en/projects.html`, give it a new `id` and `data-tags` from `linux`, `windows` and `network`, update the counts on the filter buttons, and add a row to the projects list on both home pages.
- **Photo, certificate image, CV, LinkedIn and GitHub:** the placeholders are marked in the pages (`Imagem em breve` / `Image coming soon`, `linkedin.com/in/TODO`, `github.com/TODO`, `assets/cv-joao-goncalves-*.pdf`).
