# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project layout

All application code lives under `fesapade-web/`. Run every command from inside that directory.

## Commands

```bash
cd fesapade-web

npm run dev       # start dev server at http://localhost:3000
npm run build     # production build
npm run lint      # ESLint (flat config, eslint.config.mjs)
```

No test suite is configured yet.

## Stack

- **Next.js 16** (App Router) — this is a newer version with potential breaking changes; read `node_modules/next/dist/docs/` before assuming APIs match prior versions
- **React 19**
- **TypeScript 5**
- **Tailwind CSS v4** (PostCSS plugin, no `tailwind.config.*` file — configuration is done in CSS)
- **lucide-react** for icons
- **Strapi** as headless CMS (separate backend, not in this repo)

## Architecture

### Data layer

`src/lib/strapi.ts` is the single entry point for all CMS data:
- `fetchStrapi<T>(endpoint, options?)` — wraps `fetch` with ISR revalidation (60 s) and the base URL from `NEXT_PUBLIC_STRAPI_URL`
- `getStrapiImageUrl(url)` — resolves relative Strapi paths to absolute URLs

All Strapi content types are typed in `src/types/strapi.ts` (`Course`, `NewsItem`, `GalleryItem`, `SiteConfig`, `StrapiResponse<T>`, `StrapiImage`).

### Pages (App Router)

Pages are server components that call `fetchStrapi` directly — no client-side data fetching. Routes:

| Route | File |
|---|---|
| `/` | `src/app/page.tsx` |
| `/cursos` | `src/app/cursos/page.tsx` |
| `/noticias` | `src/app/noticias/page.tsx` |
| `/historia` | `src/app/historia/page.tsx` |
| `/quienes-somos` | `src/app/quienes-somos/page.tsx` |
| `/contacto` | `src/app/contacto/page.tsx` |

The root layout (`src/app/layout.tsx`) wraps every page with `<Navbar>` and `<Footer>`.

### Components

- `src/components/layout/` — `Navbar` and `Footer` (shared shell)
- `src/components/sections/` — full-width page sections used on the homepage (`Hero`, `Highlights`, `CoursesPreview`, `SocialCTA`)
- `src/components/ui/` — small reusable pieces (`SocialIcons`)

### Environment

Copy `.env.example` to `.env.local` and set:
```
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337   # dev
# production points to Railway: https://<app>.up.railway.app
```

Images are allowed from `localhost:1337`, `*.up.railway.app`, and `res.cloudinary.com` (configured in `next.config.ts`).
