# João Gonçalves, portfolio

Personal portfolio of a junior systems administrator based in Viana do Castelo, Portugal. Available in Portuguese and English.

Pages: home (summary), about, skills, projects (filterable by Linux, Windows and networking), education and contact.

## Stack

Plain HTML, CSS and JavaScript. No frameworks, no build step, no dependencies. The only external request is IBM Plex Sans and IBM Plex Mono from Google Fonts (system fonts are used if it fails).

## Running locally

Any static file server works, for example:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000. Opening `index.html` straight from disk also works, except for the 404 page.

The language is chosen from `?lang=pt` / `?lang=en`, then the last choice saved in the browser, then the browser language.

## Where things live

| Path | Contents |
| --- | --- |
| `js/content.js` | All page text, projects, skills and education (`CONTENT.pt` and `CONTENT.en`), plus shared data in `SITE`: email, social links, photo, CV and certificate files |
| `js/main.js` | Renders the pages from the content, the header and menu, the language switch, the project filter and the copy-email button |
| `css/style.css` | All styles, with light and dark colours at the top |
| `*.html` | One small shell per page; `404.html` uses absolute paths so the site should be served from the domain root |
| `assets/` | Favicon, share image, and the photo, CVs and certificate image once added |

To change any text, edit the matching entry in both `CONTENT.pt` and `CONTENT.en`. To add a project, add it to both `projects.items` lists with `tags` from `linux`, `windows` and `network`.
