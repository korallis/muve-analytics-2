# Muve Analytics 2.0

AI-first assurance and operational intelligence for complex care and supported-living services. The canonical specification remains `/Users/leebarry/fusion-harness/plan.md`.

The checked-in application uses synthetic coded records only. Production source credentials and care data are not committed.

## Architecture

- Next.js App Router, React 19 and strict TypeScript on Vercel
- Tailwind CSS with shadcn/ui-compatible primitives
- Drizzle ORM and Neon serverless access across `app` and `marts` schemas
- Python `dlt` extraction from approved Birdie Snowflake fields
- SQLMesh curated dimensions, facts and reporting marts
- Governed metric registry with CQC quality-statement mapping and thresholds
- Vercel AI SDK and AI Gateway with allowlisted semantic tools
- Next.js Proxy auth boundary, role/scope checks and append-only audit events
- Vitest domain tests plus browser UAT through `chrome-devtools-axi`

## Commands

```bash
npm install
npm run dev
npm test
npm run validate
PYTHONPATH=pipeline python3 -m muve_pipeline.runner --dry-run
```

`npm run validate` prints one `[CHECK] ... PASS|FAIL` line per check to stdout. It runs lint, TypeScript, six test suites, Python syntax and pipeline-contract checks, a production build, 12 browser-facing route checks, health validation and a cited Ask Muve request.

## Environment

The web app accepts:

- `DATABASE_URL` — Neon pooled connection for Drizzle.
- `AI_GATEWAY_API_KEY` — optional locally; Vercel OIDC is used automatically in linked deployments.
- `AUTH_REQUIRED=true` and `MUVE_SESSION_TOKEN` — enables the deployment session gate.

The Python pipeline additionally requires the `SNOWFLAKE_*` variables listed in `pipeline/muve_pipeline/config.py`. Watermarks advance only after extraction, SQLMesh validation and promotion all succeed.

## Product routes

- `/today` — Command Centre, exception worklist and Ask Muve
- `/people-supported` and `/people-supported/clients/[id]` — Client 360
- `/quality-governance` — all 34 quality statements and assurance status
- `/operations`, `/workforce`, `/finance` — domain workspaces
- `/evidence-reports` — evidence and inspection snapshots
- `/actions` — assigned action lifecycle
- `/integration-health` — Snowflake, Neon, Xero, Spendesk and AI Gateway lineage
- `/api/health` and `/api/ai/ask` — runtime contracts

## Browser evidence

Real local and production AXI snapshots and the current UAT report are stored in [`artifacts/`](artifacts/). The production alias is <https://muve-analytics-2.vercel.app>.
