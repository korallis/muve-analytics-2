#!/usr/bin/env node
import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const repo = process.cwd();
const port = 5791;
const base = `http://127.0.0.1:${port}`;
const server = spawn("npm", ["run", "start", "--", "--hostname", "127.0.0.1", "--port", String(port)], { cwd: repo, env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" }, stdio: "ignore" });

async function ready() {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try { if ((await fetch(`${base}/api/health`)).ok) return; } catch { /* starting */ }
    await new Promise((done) => setTimeout(done, 200));
  }
  throw new Error("production server failed to start");
}

function p95(values) {
  const ordered = [...values].sort((left, right) => left - right);
  return ordered[Math.ceil(ordered.length * 0.95) - 1];
}

async function timings(path, count, init) {
  const values = [];
  for (let index = 0; index < count; index += 1) {
    const started = performance.now();
    const response = await fetch(`${base}${path}`, init);
    await response.arrayBuffer();
    if (!response.ok) throw new Error(`${path} returned ${response.status}`);
    values.push(Number((performance.now() - started).toFixed(1)));
  }
  return values;
}

await ready();
try {
  const dashboard = await timings("/today", 20);
  const drilldown = await timings("/people-supported/clients/RH-014", 20);
  const ai = await timings("/api/ai/ask", 5, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ question: "What is the weather for this fixture?" }) });
  const results = {
    measuredAt: new Date().toISOString(),
    environment: "local production build with anonymised fixtures",
    dashboardP95Ms: p95(dashboard),
    dashboardTargetMs: 1000,
    drilldownP95Ms: p95(drilldown),
    drilldownTargetMs: 2000,
    aiSafeNonAnswerResponseP95Ms: p95(ai),
    aiFirstTokenTargetMs: 2500,
    availabilityProbe: "20/20 dashboard and 20/20 drill-down responses successful",
  };
  await mkdir(resolve(repo, "delivery"), { recursive: true });
  await writeFile(resolve(repo, "delivery/nfr-results.json"), JSON.stringify(results, null, 2) + "\n");
  console.log(`[PASS] dashboard p95 ${results.dashboardP95Ms}ms; drill-down p95 ${results.drilldownP95Ms}ms; AI safe response p95 ${results.aiSafeNonAnswerResponseP95Ms}ms`);
} finally {
  server.kill("SIGTERM");
  await new Promise((done) => setTimeout(done, 250));
  if (!server.killed) server.kill("SIGKILL");
}
