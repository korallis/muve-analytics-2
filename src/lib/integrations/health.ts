export type IntegrationHealth = {
  id: "snowflake" | "xero" | "spendesk" | "ai-gateway" | "neon";
  name: string;
  status: "healthy" | "stale" | "not-configured";
  last_success: string | null;
  lag_minutes: number | null;
  loaded_at: string | null;
  watermark: string | null;
  detail: string;
};

const loadedAt = "2026-07-21T09:42:00.000Z";

export const integrationHealth: IntegrationHealth[] = [
  {
    id: "snowflake",
    name: "Birdie Snowflake",
    status: "healthy",
    last_success: loadedAt,
    lag_minutes: 8,
    loaded_at: loadedAt,
    watermark: "2026-07-21T09:34:00.000Z",
    detail: "Incremental source watermark promoted after reconciliation.",
  },
  {
    id: "neon",
    name: "Neon serving marts",
    status: "healthy",
    last_success: loadedAt,
    lag_minutes: 0,
    loaded_at: loadedAt,
    watermark: "run_20260721_0942",
    detail: "Last-good mart run available; typed access through Drizzle.",
  },
  {
    id: "xero",
    name: "Xero",
    status: "healthy",
    last_success: "2026-07-21T08:58:00.000Z",
    lag_minutes: 52,
    loaded_at: "2026-07-21T09:00:00.000Z",
    watermark: "xero_snapshot_20260721_0858",
    detail: "Accounting snapshot reconciled to source totals.",
  },
  {
    id: "spendesk",
    name: "Spendesk",
    status: "stale",
    last_success: "2026-07-20T23:30:00.000Z",
    lag_minutes: 612,
    loaded_at: "2026-07-20T23:32:00.000Z",
    watermark: "spendesk_20260720_2330",
    detail: "Nightly data is available; six allocations await approval.",
  },
  {
    id: "ai-gateway",
    name: "Vercel AI Gateway",
    status: process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN || process.env.VERCEL ? "healthy" : "not-configured",
    last_success: null,
    lag_minutes: null,
    loaded_at: null,
    watermark: null,
    detail: process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN || process.env.VERCEL
      ? "Approved model route available through Vercel OIDC or Gateway key authentication."
      : "Public demo uses cited deterministic responses until a Gateway key is configured.",
  },
];
