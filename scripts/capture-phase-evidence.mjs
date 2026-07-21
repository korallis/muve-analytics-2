#!/usr/bin/env node
import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const repo = process.cwd();
const evidenceRoot = process.env.PHASE_EVIDENCE_ROOT ? resolve(process.env.PHASE_EVIDENCE_ROOT) : resolve(repo, "delivery/evidence");
const port = 5400 + (process.pid % 400);
const baseUrl = process.env.STORY_BROWSER_BASE_URL ?? `http://127.0.0.1:${port}`;
const server = process.env.STORY_BROWSER_BASE_URL ? null : spawn("npm", ["run", "dev", "--", "--hostname", "127.0.0.1", "--port", String(port)], {
  cwd: repo,
  env: { ...process.env, AUTH_REQUIRED: "true", MUVE_SESSION_TOKEN: "phase-fixture-session", NEXT_TELEMETRY_DISABLED: "1" },
  stdio: ["ignore", "pipe", "pipe"],
});

const journeys = {
  0: [["/security-audit", "admin"]],
  1: [["/integration-health", "admin"], ["/delivery-readiness", "admin"]],
  2: [["/today", "registered_manager"], ["/metric-glossary", "quality_lead"], ["/quality-governance", "quality_lead"], ["/people-supported/clients/RH-014", "registered_manager"], ["/ai-governance", "registered_manager"], ["/actions", "registered_manager"]],
  3: [["/quality-governance", "quality_lead"], ["/people-supported/clients/RH-014", "registered_manager"], ["/workforce", "workforce_lead"], ["/finance", "finance_director"]],
  4: [["/people-supported/clients/RH-014", "registered_manager"], ["/ai-governance", "registered_manager"], ["/actions", "registered_manager"], ["/delivery-readiness", "admin"]],
  5: [["/delivery-readiness", "admin"], ["/today", "registered_manager"]],
};

async function waitForServer() {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    try { if ((await fetch(`${baseUrl}/api/health`)).status === 200) return; } catch { /* starting */ }
    await new Promise((done) => setTimeout(done, 200));
  }
  throw new Error("phase evidence server failed to start");
}

await waitForServer();
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  for (const [phase, routes] of Object.entries(journeys)) {
    const dir = resolve(evidenceRoot, `phase-${phase}`);
    await mkdir(dir, { recursive: true });
    const context = await browser.newContext({ viewport: { width: 1365, height: 850 } });
    await context.tracing.start({ screenshots: true, snapshots: true });
    const page = await context.newPage();
    try {
      for (let index = 0; index < routes.length; index += 1) {
        const [route, role] = routes[index];
        await page.goto(`${baseUrl}/sign-in?callbackUrl=${encodeURIComponent(route)}`, { waitUntil: "networkidle" });
        await page.locator("#persona").selectOption(role);
        await page.getByRole("button", { name: "Continue securely" }).click();
        await page.waitForURL((url) => url.pathname === route);
        const axe = await new AxeBuilder({ page }).analyze();
        const blocking = axe.violations.filter((item) => item.impact === "serious" || item.impact === "critical");
        if (blocking.length) throw new Error(`phase ${phase} axe failure on ${route}: ${blocking.map((item) => item.id).join(",")}`);
        await page.screenshot({ path: resolve(dir, `phase-exit-${String(index + 1).padStart(2, "0")}-${route.replaceAll("/", "-").replace(/^-|-$/g, "")}.png`), fullPage: true });
      }
      const denied = await context.request.get(`${baseUrl}/api/clients/OUT-OF-SCOPE`);
      if (denied.status() !== 404) throw new Error(`phase ${phase} scope denial returned ${denied.status()}`);
      console.log(`[PASS] phase ${phase} exit journey — ${routes.length} workspaces, axe and scope denial`);
    } finally {
      await context.tracing.stop({ path: resolve(dir, "phase-exit-trace.zip") });
      await context.close();
    }
  }
} finally {
  await browser.close();
  if (server) {
    server.kill("SIGTERM");
    await new Promise((done) => setTimeout(done, 300));
    if (!server.killed) server.kill("SIGKILL");
  }
}
