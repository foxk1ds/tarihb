# Қазақстан: әскери зауыттар мен Семей полигоны

A bilingual Kazakh and Russian educational website built with Next.js App Router, React, TypeScript, and Tailwind CSS.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Architecture

- `src/content/`: Kazakh and Russian copy, terms, cities, timeline, and consequences.
- `src/components/providers/LanguageContext.tsx`: global persisted language selection.
- `src/components/ui/`: navigation, footer, language selector, and reusable cards.
- `src/components/sections/`: page level interactive sections.
- `src/app/`: App Router pages for the home, glossary, factories, polygon, and consequences routes.

## Commands

```bash
npm run dev
npm run build
npm run start
npm run lint
```
