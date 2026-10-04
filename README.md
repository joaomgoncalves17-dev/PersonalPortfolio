# João Gonçalves, portfolio

Personal portfolio of a junior systems administrator based in Viana do Castelo, Portugal. Available in Portuguese and English.

Pages: home (summary), about, skills, projects, education and contact.

## Stack

- [Next.js](https://nextjs.org) (App Router, static generation)
- Tailwind CSS v4
- IBM Plex Sans and IBM Plex Mono via `next/font`
- Phosphor Icons

## Running locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000. Visiting `/` redirects to `/pt` or `/en` based on the browser language.

## Where things live

| Path | Contents |
| --- | --- |
| `content/pt.ts`, `content/en.ts` | All page text, projects, skills and education, one file per language |
| `content/site.ts` | Shared data: email, social links, photo, CV and certificate files |
| `app/[lang]/` | One folder per page |
| `components/` | Header, footer and shared building blocks |
| `public/` | Photo, CVs and certificate images |

To change any text, edit the matching entry in both `content/pt.ts` and `content/en.ts`.
