# Muve Analytics 2.0

Phase-0 implementation of the AI-first assurance and operational intelligence platform described in the canonical [`../plan.md`](../plan.md).

## Stack

- Next.js App Router, React and strict TypeScript
- Tailwind CSS and shadcn/ui-compatible primitives
- Vercel deployment and health endpoint
- Vercel AI SDK dependency ready for AI Gateway features

The current UI uses clearly labelled synthetic demonstration data and contains no personal data.

## Commands

```bash
npm install
npm run dev
npm run validate
```

`npm run validate` prints one `[CHECK] ... PASS|FAIL` line per check to stdout. It runs lint, TypeScript, a production build, starts the production server, verifies every workspace route and validates `/api/health`.

## Routes

- `/` and `/today`
- `/people-supported`
- `/quality-governance`
- `/operations`
- `/workforce`
- `/finance`
- `/evidence-reports`
- `/api/health`

## Browser evidence

Real-browser AXI findings and screenshots are stored in [`artifacts/`](artifacts/).
