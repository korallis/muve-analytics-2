export type IntegrationHealth = {
  id: "snowflake" | "xero" | "spendesk" | "ai-gateway" | "neon";
  name: string;
  status: "healthy" | "stale" | "not-configured";
  last_success: string | null;
  lag_minutes: number | null;
  loaded_at: string | null;
  watermark: string | null;
  failedStep: string | null;
  retryState: string;
  affectedSurfaces: string[];
  detail: string;
};

const loadedAt = "2026-07-21T09:42:00.000Z";
const gatewayConfigured = Boolean(process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN || process.env.VERCEL);

export const integrationHealth: IntegrationHealth[] = [
  { id: "snowflake", name: "Birdie Snowflake", status: "healthy", last_success: loadedAt, lag_minutes: 8, loaded_at: loadedAt, watermark: "2026-07-21T09:34:00.000Z", failedStep: null, retryState: "No retry required", affectedSurfaces: ["Today", "Clients", "Operations", "Workforce"], detail: "Incremental source watermark promoted after reconciliation." },
  { id: "neon", name: "Neon serving marts", status: "healthy", last_success: loadedAt, lag_minutes: 0, loaded_at: loadedAt, watermark: "run_20260721_0942", failedStep: null, retryState: "Last-good dataset active", affectedSurfaces: ["All workspaces"], detail: "Typed Drizzle access to atomically promoted app and marts schemas." },
  { id: "xero", name: "Xero", status: "healthy", last_success: "2026-07-21T08:58:00.000Z", lag_minutes: 52, loaded_at: "2026-07-21T09:00:00.000Z", watermark: "xero_snapshot_20260721_0858", failedStep: null, retryState: "Nightly plus webhook", affectedSurfaces: ["Finance", "Board digest"], detail: "Accounting snapshot reconciled to source totals." },
  { id: "spendesk", name: "Spendesk", status: "stale", last_success: "2026-07-20T23:30:00.000Z", lag_minutes: 612, loaded_at: "2026-07-20T23:32:00.000Z", watermark: "spendesk_20260720_2330", failedStep: "Six low-confidence allocations await human approval", retryState: "Retry scheduled 23:30", affectedSurfaces: ["Package economics", "Expense allocations"], detail: "Last-good expense snapshot remains available with a staleness warning." },
  { id: "ai-gateway", name: "Vercel AI Gateway", status: gatewayConfigured ? "healthy" : "not-configured", last_success: gatewayConfigured ? loadedAt : null, lag_minutes: null, loaded_at: null, watermark: null, failedStep: gatewayConfigured ? null : "Gateway authentication unavailable", retryState: gatewayConfigured ? "No retry required" : "Deterministic safe fallback active", affectedSurfaces: ["Ask Muve", "Narratives", "Digests"], detail: gatewayConfigured ? "Approved model route available through Vercel OIDC or Gateway key authentication." : "Public demo uses cited deterministic responses until Gateway authentication is configured." },
];
